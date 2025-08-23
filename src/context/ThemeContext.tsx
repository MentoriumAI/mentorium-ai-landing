'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ThemeConfig, ThemeContextType, FontSystem, ThemeColors } from '@/types/theme'
import { defaultTheme, mergeTheme, generateThemeCSS } from '@/config/theme'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: React.ReactNode
  initialTheme?: Partial<ThemeConfig>
  storageKey?: string
}

export function ThemeProvider({ 
  children, 
  initialTheme,
  storageKey = 'mentorium-theme'
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeConfig>(() => {
    if (initialTheme) {
      return mergeTheme(defaultTheme, initialTheme)
    }
    return defaultTheme
  })

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsedTheme = JSON.parse(stored) as Partial<ThemeConfig>
        setThemeState(mergeTheme(defaultTheme, parsedTheme))
      }
    } catch (error) {
      console.warn('Failed to load theme from storage:', error)
    }
  }, [storageKey])

  // Apply theme CSS variables to document
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    const css = generateThemeCSS(theme)
    
    // Remove existing theme style element
    const existingStyle = document.getElementById('theme-variables')
    if (existingStyle) {
      existingStyle.remove()
    }
    
    // Create and insert new theme style element
    const styleElement = document.createElement('style')
    styleElement.id = 'theme-variables'
    styleElement.textContent = css
    document.head.appendChild(styleElement)
    
    // Apply font loading
    loadThemeFonts(theme.fonts)
    
    // Apply reduced motion preference
    if (theme.animations.reduceMotion) {
      root.style.setProperty('--animation-duration-default', '0.01ms')
    }
    
  }, [theme])

  // Persist theme to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(theme))
    } catch (error) {
      console.warn('Failed to save theme to storage:', error)
    }
  }, [theme, storageKey])

  const setTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setThemeState(current => mergeTheme(current, updates))
  }, [])

  const updateFonts = useCallback((fonts: Partial<FontSystem>) => {
    setThemeState(current => ({
      ...current,
      fonts: { ...current.fonts, ...fonts }
    }))
  }, [])

  const updateColors = useCallback((colors: Partial<ThemeColors>) => {
    setThemeState(current => ({
      ...current,
      colors: { ...current.colors, ...colors }
    }))
  }, [])

  const resetToDefault = useCallback(() => {
    setThemeState(defaultTheme)
  }, [])

  const exportConfig = useCallback(() => {
    return JSON.stringify(theme, null, 2)
  }, [theme])

  const importConfig = useCallback((config: string) => {
    try {
      const parsedConfig = JSON.parse(config) as Partial<ThemeConfig>
      setTheme(parsedConfig)
    } catch (error) {
      console.error('Failed to import theme config:', error)
      throw new Error('Invalid theme configuration')
    }
  }, [setTheme])

  const contextValue: ThemeContextType = {
    theme,
    setTheme,
    updateFonts,
    updateColors,
    resetToDefault,
    exportConfig,
    importConfig,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Font loading utility
async function loadThemeFonts(fonts: FontSystem): Promise<void> {
  if (typeof window === 'undefined') return

  const fontPromises: Promise<void>[] = []

  Object.values(fonts).forEach(font => {
    if (!font) return

    // Check if it's a Google Font (has a specific URL pattern)
    const isGoogleFont = font.family !== 'System Sans' && 
                        font.family !== 'System Serif' && 
                        font.family !== 'System Mono'

    if (isGoogleFont) {
      fontPromises.push(loadGoogleFont(font.family, font.weights))
    }
  })

  try {
    await Promise.all(fontPromises)
  } catch (error) {
    console.warn('Some fonts failed to load:', error)
  }
}

// Google Fonts dynamic loading
async function loadGoogleFont(family: string, weights: number[]): Promise<void> {
  if (typeof window === 'undefined') return

  const fontId = `font-${family.replace(/\s+/g, '-').toLowerCase()}`
  
  // Check if font is already loaded
  if (document.getElementById(fontId)) return

  // Create font link element
  const link = document.createElement('link')
  link.id = fontId
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, '+')}:wght@${weights.join(';')}&display=swap`
  
  return new Promise((resolve, reject) => {
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load font: ${family}`))
    document.head.appendChild(link)
    
    // Timeout after 3 seconds
    setTimeout(() => reject(new Error(`Font loading timeout: ${family}`)), 3000)
  })
}

// Hook for accessing specific theme utilities
export function useThemeUtils() {
  const { theme } = useTheme()
  
  return {
    // Color utilities
    getColorValue: (palette: keyof ThemeColors, shade?: string) => {
      if (palette === 'brand') {
        return theme.colors.brand
      }
      const paletteColors = theme.colors[palette] as unknown as Record<string, string>
      return shade ? paletteColors[shade] : paletteColors
    },
    
    // Font utilities
    getFontFamily: (variant: keyof FontSystem) => {
      const font = theme.fonts[variant]
      if (!font) return 'inherit'
      const fallbacks = font.fallback ? `, ${font.fallback.join(', ')}` : ''
      return `'${font.family}'${fallbacks}`
    },
    
    // Animation utilities
    getAnimationDuration: (multiplier: number = 1) => {
      return `${theme.animations.defaultDuration * multiplier}ms`
    },
    
    // CSS custom property references
    cssVar: {
      color: (palette: string, shade?: string) => 
        shade ? `var(--color-${palette}-${shade})` : `var(--color-${palette})`,
      font: (variant: string) => `var(--font-family-${variant})`,
      animation: (property: string) => `var(--animation-${property})`,
    }
  }
}