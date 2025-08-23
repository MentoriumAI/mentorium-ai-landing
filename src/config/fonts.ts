import type { FontSystem, FontConfig } from '@/types/theme'

// Google Fonts configurations
export const googleFonts = {
  inter: {
    family: 'Inter',
    weights: [300, 400, 500, 600, 700, 800],
    display: 'swap' as const,
    preload: true,
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
    url: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
  },
  poppins: {
    family: 'Poppins',
    weights: [300, 400, 500, 600, 700, 800, 900],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    url: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
  },
  montserrat: {
    family: 'Montserrat',
    weights: [300, 400, 500, 600, 700, 800, 900],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    url: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap'
  },
  playfairDisplay: {
    family: 'Playfair Display',
    weights: [400, 500, 600, 700, 800, 900],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-serif', 'Georgia', 'Times', 'serif'],
    url: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap'
  },
  roboto: {
    family: 'Roboto',
    weights: [300, 400, 500, 700, 900],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap'
  },
  openSans: {
    family: 'Open Sans',
    weights: [300, 400, 500, 600, 700, 800],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
    url: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap'
  },
  sourceCodePro: {
    family: 'Source Code Pro',
    weights: [300, 400, 500, 600, 700],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
    url: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;400;500;600;700&display=swap'
  },
  facultyGlyphic: {
    family: 'Faculty Glyphic',
    weights: [400],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-serif', 'Georgia', 'Times', 'serif'],
    url: 'https://fonts.googleapis.com/css2?family=Faculty+Glyphic&display=swap'
  }
} as const

// System fonts as fallback options
export const systemFonts = {
  sansSerif: {
    family: 'System Sans',
    weights: [400, 500, 600, 700],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  },
  serif: {
    family: 'System Serif',
    weights: [400, 500, 600, 700],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
  },
  mono: {
    family: 'System Mono',
    weights: [400, 500, 600, 700],
    display: 'swap' as const,
    preload: false,
    subsets: ['latin'],
    fallback: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace'],
  }
} as const

// Default font system configuration
export const defaultFontSystem: FontSystem = {
  primary: { ...googleFonts.inter } as FontConfig,
  heading: { ...googleFonts.inter } as FontConfig, // Same as primary by default
  mono: { ...systemFonts.mono } as FontConfig,
}

// Popular font combinations
export const fontCombinations = {
  modern: {
    primary: { ...googleFonts.inter } as FontConfig,
    heading: { ...googleFonts.inter } as FontConfig,
    mono: { ...systemFonts.mono } as FontConfig,
  },
  elegant: {
    primary: { ...googleFonts.openSans } as FontConfig,
    heading: { ...googleFonts.playfairDisplay } as FontConfig,
    mono: { ...systemFonts.mono } as FontConfig,
  },
  clean: {
    primary: { ...googleFonts.roboto } as FontConfig,
    heading: { ...googleFonts.montserrat } as FontConfig,
    mono: { ...systemFonts.mono } as FontConfig,
  },
  friendly: {
    primary: { ...googleFonts.openSans } as FontConfig,
    heading: { ...googleFonts.poppins } as FontConfig,
    mono: { ...systemFonts.mono } as FontConfig,
  },
  system: {
    primary: { ...systemFonts.sansSerif } as FontConfig,
    heading: { ...systemFonts.sansSerif } as FontConfig,
    mono: { ...systemFonts.mono } as FontConfig,
  }
} as const

// Font loading utilities
export function generateFontFaceCSS(font: FontConfig & { url?: string }): string {
  if (!font.url) return ''
  
  return `@import url('${font.url}');`
}

export function generateFontFamilyCSS(font: FontConfig): string {
  const fallbacks = font.fallback ? `, ${font.fallback.join(', ')}` : ''
  return `'${font.family}'${fallbacks}`
}

export function getFontDisplayValue(font: FontConfig): string {
  return font.display || 'swap'
}

// Font metrics and sizing utilities
export const fontSizeScale = {
  xs: { fontSize: '0.75rem', lineHeight: '1rem' },
  sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
  base: { fontSize: '1rem', lineHeight: '1.5rem' },
  lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
  xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
  '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
  '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
  '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
  '5xl': { fontSize: '3rem', lineHeight: '1' },
  '6xl': { fontSize: '3.75rem', lineHeight: '1' },
  '7xl': { fontSize: '4.5rem', lineHeight: '1' },
  '8xl': { fontSize: '6rem', lineHeight: '1' },
  '9xl': { fontSize: '8rem', lineHeight: '1' },
} as const

// Responsive font utilities
export const fluidTypography = {
  'fluid-sm': 'clamp(0.875rem, 2vw, 1rem)',
  'fluid-base': 'clamp(1rem, 2.5vw, 1.125rem)',
  'fluid-lg': 'clamp(1.125rem, 3vw, 1.5rem)',
  'fluid-xl': 'clamp(1.25rem, 3.5vw, 1.875rem)',
  'fluid-2xl': 'clamp(1.5rem, 4vw, 2.25rem)',
  'fluid-3xl': 'clamp(1.875rem, 5vw, 3rem)',
  'fluid-4xl': 'clamp(2.25rem, 6vw, 3.75rem)',
  'section-title': 'clamp(1.75rem, 4vw, 3rem)',
  'section-subtitle': 'clamp(1rem, 2.5vw, 1.25rem)',
} as const

// CSS custom properties generation for fonts
export function generateFontCSSVariables(fontSystem: FontSystem): Record<string, string> {
  const variables: Record<string, string> = {}
  
  Object.entries(fontSystem).forEach(([variant, font]) => {
    if (font) {
      variables[`--font-family-${variant}`] = generateFontFamilyCSS(font)
      variables[`--font-display-${variant}`] = getFontDisplayValue(font)
    }
  })
  
  // Add fluid typography variables
  Object.entries(fluidTypography).forEach(([key, value]) => {
    variables[`--font-size-${key}`] = value
  })
  
  return variables
}