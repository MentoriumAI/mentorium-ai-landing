import type { ThemeColors, ColorPalette, BrandColors } from '@/types/theme'

// Utility to generate color palette from a base color
export function generateColorPalette(baseColor: string): ColorPalette {
  // This is a simplified version - in production, you'd use a proper color manipulation library
  // For now, we'll return the existing palette structure
  return {
    50: `color-mix(in srgb, ${baseColor} 5%, white 95%)`,
    100: `color-mix(in srgb, ${baseColor} 10%, white 90%)`,
    200: `color-mix(in srgb, ${baseColor} 20%, white 80%)`,
    300: `color-mix(in srgb, ${baseColor} 30%, white 70%)`,
    400: `color-mix(in srgb, ${baseColor} 40%, white 60%)`,
    500: baseColor,
    600: `color-mix(in srgb, ${baseColor} 80%, black 20%)`,
    700: `color-mix(in srgb, ${baseColor} 70%, black 30%)`,
    800: `color-mix(in srgb, ${baseColor} 60%, black 40%)`,
    900: `color-mix(in srgb, ${baseColor} 50%, black 50%)`,
    950: `color-mix(in srgb, ${baseColor} 40%, black 60%)`,
  }
}

// Default brand colors
export const defaultBrandColors: BrandColors = {
  'dark-green': '#093b2c',
  'brunswick-green': '#0f4c38',
  'isabelline': '#f7f4ef',
  'brandeis-blue': '#006fea',
  'sunglow': '#fac827',
  'dark-moss-green': '#536c03',
  'orange-pantone': '#fb6113',
}

// Default color palettes
export const defaultColors: ThemeColors = {
  brand: defaultBrandColors,
  primary: {
    50: '#f0fdf6',
    100: '#dcfce9',
    200: '#bbf7d2',
    300: '#86efac',
    400: '#4ade80',
    500: '#0f4c38', // brunswick-green
    600: '#093b2c', // dark-green
    700: '#065f3c',
    800: '#064e2f',
    900: '#053d26',
    950: '#022a1a',
  },
  secondary: {
    50: '#eff7ff',
    100: '#deeeff',
    200: '#b4ddff',
    300: '#72c3ff',
    400: '#26a5ff',
    500: '#006fea', // brandeis-blue
    600: '#0058c7',
    700: '#0047a1',
    800: '#003d85',
    900: '#06366e',
    950: '#04244a',
  },
  accent: {
    50: '#fffaeb',
    100: '#fef3c7',
    200: '#fee68a',
    300: '#fdd347',
    400: '#fac827', // sunglow
    500: '#f4b817',
    600: '#d8950a',
    700: '#b3720c',
    800: '#915912',
    900: '#784713',
    950: '#452505',
  },
  success: {
    50: '#f7fee7',
    100: '#ecfccb',
    200: '#d9f99d',
    300: '#bef264',
    400: '#a3e635',
    500: '#84cc16',
    600: '#536c03', // dark-moss-green
    700: '#4d7c0f',
    800: '#3f6212',
    900: '#365314',
    950: '#1a2e05',
  },
  warning: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#fb6113', // orange-pantone
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
}

// Utility functions for color manipulation
export function generateThemeFromBrandColors(brandColors: Partial<BrandColors>): ThemeColors {
  const colors = { ...defaultBrandColors, ...brandColors }
  
  return {
    brand: colors,
    primary: generateColorPalette(colors['brunswick-green']),
    secondary: generateColorPalette(colors['brandeis-blue']),
    accent: generateColorPalette(colors.sunglow),
    success: generateColorPalette(colors['dark-moss-green']),
    warning: generateColorPalette(colors['orange-pantone']),
    neutral: defaultColors.neutral, // Keep neutral colors consistent
  }
}

// Color accessibility utilities
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getContrastRatio(_: string, __: string): number {
  // Simplified contrast calculation - in production, use a proper library
  // This is a placeholder for now
  return 4.5 // WCAG AA minimum
}

export function isColorAccessible(foreground: string, background: string): boolean {
  return getContrastRatio(foreground, background) >= 4.5
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function suggestAccessibleColor(baseColor: string, _: string): string {
  // Logic to suggest an accessible color variant
  return baseColor // Placeholder
}

// CSS custom properties generation
export function generateCSSVariables(colors: ThemeColors): Record<string, string> {
  const variables: Record<string, string> = {}
  
  // Brand colors
  Object.entries(colors.brand).forEach(([key, value]) => {
    variables[`--color-brand-${key}`] = value
  })
  
  // Palette colors
  Object.entries(colors).forEach(([paletteKey, palette]) => {
    if (paletteKey === 'brand') return
    
    Object.entries(palette as ColorPalette).forEach(([shade, value]) => {
      variables[`--color-${paletteKey}-${shade}`] = value
    })
  })
  
  return variables
}