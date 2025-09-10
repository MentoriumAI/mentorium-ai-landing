// Card dimensions constants for consistent sizing
export const CARD_DIMENSIONS = {
  // Fixed height for all feature cards (in pixels)
  HEIGHT: 320,
  
  // Width constants
  WIDTH: {
    MOBILE: 320,    // w-80 equivalent
    DESKTOP: 384    // w-96 equivalent
  },
  
  // Gap between cards (in pixels)
  GAP: 24, // gap-6 equivalent
  
  // Padding inside cards
  PADDING: {
    MOBILE: 24,     // p-6 equivalent
    DESKTOP: 32     // p-8 equivalent
  }
} as const

// CSS custom property for easy theming
export const CARD_HEIGHT_CSS = `${CARD_DIMENSIONS.HEIGHT}px`