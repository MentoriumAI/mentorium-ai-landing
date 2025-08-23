import type { ThemeConfig } from '@/types/theme'
import { defaultColors } from './colors'
import { defaultFontSystem } from './fonts'

export const defaultTheme: ThemeConfig = {
  name: 'Mentorium Default',
  fonts: defaultFontSystem,
  colors: defaultColors,
  animations: {
    reduceMotion: false,
    defaultDuration: 300,
    defaultEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  spacing: {
    scale: 1,
    baseUnit: 4, // 1rem = 16px, base unit = 4px
  },
  borderRadius: {
    scale: 1,
  },
}

// Alternative theme configurations
export const themes = {
  default: defaultTheme,
  minimal: {
    ...defaultTheme,
    name: 'Minimal',
    animations: {
      ...defaultTheme.animations,
      defaultDuration: 200,
    },
  },
  vibrant: {
    ...defaultTheme,
    name: 'Vibrant',
    colors: {
      ...defaultColors,
      // Override with more vibrant colors
      primary: {
        ...defaultColors.primary,
        500: '#10b981', // More vibrant green
      },
      secondary: {
        ...defaultColors.secondary,
        500: '#3b82f6', // More vibrant blue
      },
    },
  },
} as const

export type ThemeName = keyof typeof themes

// Theme validation utilities
export function validateTheme(theme: Partial<ThemeConfig>): boolean {
  // Basic validation - in production, add comprehensive validation
  return !!(theme.name && theme.fonts && theme.colors)
}

// Theme merging utilities
export function mergeTheme(base: ThemeConfig, override: Partial<ThemeConfig>): ThemeConfig {
  return {
    ...base,
    ...override,
    fonts: override.fonts ? { ...base.fonts, ...override.fonts } : base.fonts,
    colors: override.colors ? { ...base.colors, ...override.colors } : base.colors,
    animations: override.animations ? { ...base.animations, ...override.animations } : base.animations,
    spacing: override.spacing ? { ...base.spacing, ...override.spacing } : base.spacing,
    borderRadius: override.borderRadius ? { ...base.borderRadius, ...override.borderRadius } : base.borderRadius,
  }
}

// Export utilities for theme system
export function exportThemeConfig(theme: ThemeConfig): string {
  return JSON.stringify(theme, null, 2)
}

export function importThemeConfig(configString: string): ThemeConfig | null {
  try {
    const parsed = JSON.parse(configString) as Partial<ThemeConfig>
    if (validateTheme(parsed)) {
      return mergeTheme(defaultTheme, parsed)
    }
    return null
  } catch {
    return null
  }
}

// CSS generation utilities
export function generateThemeCSS(theme: ThemeConfig): string {
  const cssVariables: string[] = []
  
  // Generate color variables
  Object.entries(theme.colors.brand).forEach(([key, value]) => {
    cssVariables.push(`  --color-brand-${key}: ${value};`)
  })
  
  Object.entries(theme.colors).forEach(([paletteKey, palette]) => {
    if (paletteKey === 'brand') return
    
    Object.entries(palette).forEach(([shade, value]) => {
      cssVariables.push(`  --color-${paletteKey}-${shade}: ${value};`)
    })
  })
  
  // Generate font variables
  Object.entries(theme.fonts).forEach(([variant, font]) => {
    if (font) {
      const fallbacks = font.fallback ? `, ${font.fallback.join(', ')}` : ''
      cssVariables.push(`  --font-family-${variant}: '${font.family}'${fallbacks};`)
    }
  })
  
  // Generate animation variables
  cssVariables.push(`  --animation-duration-default: ${theme.animations.defaultDuration}ms;`)
  cssVariables.push(`  --animation-easing-default: ${theme.animations.defaultEasing};`)
  
  // Generate spacing variables
  cssVariables.push(`  --spacing-scale: ${theme.spacing.scale};`)
  cssVariables.push(`  --spacing-base: ${theme.spacing.baseUnit}px;`)
  
  // Generate border radius variables
  cssVariables.push(`  --border-radius-scale: ${theme.borderRadius.scale};`)
  
  return `:root {\n${cssVariables.join('\n')}\n}`
}