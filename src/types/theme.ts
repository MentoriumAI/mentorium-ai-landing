export interface FontConfig {
  family: string
  weights: readonly number[]
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional'
  preload?: boolean
  subsets?: readonly string[]
  fallback?: readonly string[]
}

export interface FontSystem {
  primary: FontConfig    // Main text font (Inter)
  heading: FontConfig    // Heading font (can be different)
  mono?: FontConfig      // Monospace font (optional)
}

export interface ColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface BrandColors {
  'dark-green': string
  'brunswick-green': string
  'isabelline': string
  'brandeis-blue': string
  'sunglow': string
  'dark-moss-green': string
  'orange-pantone': string
}

export interface ThemeColors {
  brand: BrandColors
  primary: ColorPalette
  secondary: ColorPalette
  accent: ColorPalette
  success: ColorPalette
  warning: ColorPalette
  neutral: ColorPalette
}

export interface AnimationConfig {
  duration: number
  delay?: number
  easing?: string
  iterations?: number | 'infinite'
}

export interface ThemeConfig {
  name: string
  fonts: FontSystem
  colors: ThemeColors
  animations: {
    reduceMotion: boolean
    defaultDuration: number
    defaultEasing: string
  }
  spacing: {
    scale: number
    baseUnit: number
  }
  borderRadius: {
    scale: number
  }
}

export interface ThemeContextType {
  theme: ThemeConfig
  setTheme: (theme: Partial<ThemeConfig>) => void
  updateFonts: (fonts: Partial<FontSystem>) => void
  updateColors: (colors: Partial<ThemeColors>) => void
  resetToDefault: () => void
  exportConfig: () => string
  importConfig: (config: string) => void
}

export type ColorVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'neutral'
export type ColorShade = keyof ColorPalette
export type FontVariant = 'primary' | 'heading' | 'mono'

export interface ComponentThemeProps {
  colorVariant?: ColorVariant
  colorShade?: ColorShade
  fontVariant?: FontVariant
  className?: string
}