# Theme System Documentation

## Overview

The Mentorium landing page now includes a comprehensive theme system that allows for easy customization of fonts, colors, and visual styles without rebuilding the application.

## Features

### 🎨 Font Customization
- **Google Fonts Integration**: Dynamically load any Google Font
- **Font Combinations**: Pre-configured popular font pairings
- **Runtime Switching**: Change fonts without rebuilding
- **Performance Optimized**: Smart loading and caching

### 🌈 Color Customization  
- **Brand Color Management**: Easy brand color updates
- **Automatic Palette Generation**: Full color ranges from base colors
- **Real-time Preview**: See changes instantly
- **Accessibility Validation**: Built-in contrast checking

### ⚡ Performance
- **CSS Custom Properties**: Efficient theme switching
- **Smart Loading**: Only load fonts when needed
- **Minimal Bundle Impact**: Theme system adds <5KB
- **Optimized Rendering**: Prevents layout shifts

## Quick Start

### 1. Basic Usage

The theme system is automatically active. In development mode, you'll see a floating theme button in the bottom-right corner.

### 2. Programmatic Usage

```typescript
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { theme, updateFonts, updateColors } = useTheme()
  
  // Change font combination
  updateFonts({
    primary: { family: 'Open Sans', weights: [400, 600] },
    heading: { family: 'Playfair Display', weights: [400, 700] }
  })
  
  // Update brand colors
  updateColors({
    brand: {
      'primary-color': '#ff6b35',
      'secondary-color': '#004e92'
    }
  })
}
```

### 3. CSS Custom Properties

All theme values are available as CSS custom properties:

```css
.my-element {
  font-family: var(--font-family-primary);
  color: var(--color-brand-primary-color);
  font-size: var(--font-size-fluid-lg);
}
```

## Font System

### Available Font Combinations

1. **Modern** (Inter + Inter)
2. **Elegant** (Open Sans + Playfair Display)  
3. **Clean** (Roboto + Montserrat)
4. **Friendly** (Open Sans + Poppins)
5. **System** (System fonts for performance)

### Adding Custom Fonts

```typescript
import { updateFonts } from '@/context/ThemeContext'

// Add a custom Google Font
updateFonts({
  primary: {
    family: 'Nunito',
    weights: [300, 400, 600, 700],
    display: 'swap',
    subsets: ['latin']
  }
})
```

### Font Configuration Options

```typescript
interface FontConfig {
  family: string           // Font family name
  weights: number[]        // Available weights
  display?: string         // Font display strategy
  preload?: boolean        // Preload font
  subsets?: string[]       // Font subsets
  fallback?: string[]      // Fallback fonts
}
```

## Color System

### Brand Colors

The system includes 7 brand colors that automatically generate full palettes:

- `dark-green` - Primary dark green
- `brunswick-green` - Main brand green  
- `isabelline` - Light background color
- `brandeis-blue` - Primary blue accent
- `sunglow` - Yellow accent
- `dark-moss-green` - Success color
- `orange-pantone` - Warning/CTA color

### Color Palettes

Each brand color generates a full 50-950 palette:

```css
--color-primary-50   /* Lightest */
--color-primary-100
...
--color-primary-500  /* Base color */
...
--color-primary-950  /* Darkest */
```

### Updating Colors

```typescript
// Update individual brand colors
updateColors({
  brand: {
    'brunswick-green': '#2d5a4a',
    'brandeis-blue': '#1e40af'
  }
})

// Colors will automatically generate new palettes
```

## Theme Configuration

### Complete Theme Object

```typescript
interface ThemeConfig {
  name: string
  fonts: {
    primary: FontConfig
    heading: FontConfig
    mono?: FontConfig
  }
  colors: {
    brand: BrandColors
    primary: ColorPalette
    secondary: ColorPalette
    accent: ColorPalette
    success: ColorPalette
    warning: ColorPalette
    neutral: ColorPalette
  }
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
```

### Export/Import Themes

```typescript
import { useTheme } from '@/context/ThemeContext'

function ThemeManager() {
  const { exportConfig, importConfig } = useTheme()
  
  // Export current theme
  const config = exportConfig()
  console.log(config) // JSON string
  
  // Import theme
  const newTheme = '{"name": "My Theme", ...}'
  importConfig(newTheme)
}
```

## CSS Architecture

### File Structure

```
src/
├── styles/
│   └── theme-variables.css    # CSS custom properties
├── config/
│   ├── theme.ts              # Theme configuration
│   ├── fonts.ts              # Font definitions  
│   └── colors.ts             # Color utilities
├── context/
│   └── ThemeContext.tsx      # React context
└── types/
    └── theme.ts              # TypeScript interfaces
```

### CSS Custom Properties

All theme values are available as CSS variables:

```css
/* Fonts */
--font-family-primary
--font-family-heading
--font-family-mono

/* Colors */
--color-brand-{colorName}
--color-{palette}-{shade}

/* Typography */
--font-size-fluid-{size}
--font-size-section-title

/* Animation */
--animation-duration-default
--animation-easing-default

/* Layout */
--border-radius-{size}
--shadow-{variant}
```

## Component Integration

### Theme-Aware Components

Components automatically use theme values:

```typescript
function MyButton() {
  return (
    <button className="btn-primary font-heading">
      Click me
    </button>
  )
}
```

### Custom Styling with Theme

```typescript
import { useThemeUtils } from '@/context/ThemeContext'

function ThemedComponent() {
  const { getFontFamily, getColorValue, cssVar } = useThemeUtils()
  
  const style = {
    fontFamily: getFontFamily('heading'),
    color: getColorValue('primary', '600'),
    fontSize: cssVar.font('fluid-lg')
  }
  
  return <div style={style}>Themed content</div>
}
```

## Performance Considerations

### Font Loading Strategy

1. **Primary fonts** are preloaded for immediate display
2. **Secondary fonts** are lazy-loaded when needed
3. **System fonts** are used as fallbacks
4. **Font display: swap** prevents invisible text

### CSS Optimization

1. **CSS custom properties** for efficient updates
2. **Minimal specificity** for better performance  
3. **Scoped updates** only affect changed properties
4. **GPU acceleration** for animations

### Bundle Size

- Theme system core: ~4KB gzipped
- Font configurations: ~1KB per font family
- Color utilities: ~2KB gzipped
- Total overhead: <8KB for full system

## Browser Support

- **Modern browsers**: Full support (Chrome 49+, Firefox 31+, Safari 9.1+)
- **CSS custom properties**: Required for theme switching
- **Font loading API**: Graceful fallback for older browsers
- **Color manipulation**: Uses modern CSS `color-mix()` where available

## Development Tools

### Theme Editor (Development Only)

Access the visual theme editor via the floating button in development mode:

- **Font picker** with live preview
- **Color customizer** with accessibility checking
- **Export/import** theme configurations
- **Reset to defaults** functionality

### Debug Utilities

```typescript
// Log current theme
console.log(theme)

// Validate theme structure
import { validateTheme } from '@/config/theme'
console.log(validateTheme(theme))

// Export for external tools
const cssVariables = generateThemeCSS(theme)
```

## Migration Guide

### From Hardcoded Values

```css
/* Before */
.my-component {
  font-family: 'Inter', sans-serif;
  color: #0f4c38;
  font-size: 1.125rem;
}

/* After */  
.my-component {
  font-family: var(--font-family-primary);
  color: var(--color-brand-brunswick-green);
  font-size: var(--font-size-fluid-lg);
}
```

### Component Updates

```typescript
// Before
<button className="font-inter text-brand-brunswick-green">

// After  
<button className="font-primary text-brand-brunswick-green">
```

## Best Practices

### 1. Use Semantic Variables

```css
/* Good */
--color-text-primary: var(--color-brand-dark-green);
--color-surface: var(--color-brand-isabelline);

/* Avoid */
color: #093b2c;
```

### 2. Font Loading

```typescript
// Preload critical fonts
{
  family: 'Inter',
  preload: true,  // Only for primary fonts
  display: 'swap'
}
```

### 3. Color Accessibility

```typescript
// Check contrast ratios
import { isColorAccessible } from '@/config/colors'
const accessible = isColorAccessible(textColor, backgroundColor)
```

### 4. Performance

- Limit simultaneous font families to 3-4
- Use system fonts for maximum performance
- Test theme switches on slower devices
- Monitor CLS (Cumulative Layout Shift)

## Troubleshooting

### Common Issues

1. **Fonts not loading**: Check network tab for font requests
2. **Colors not updating**: Verify CSS custom properties in DevTools  
3. **Layout shifts**: Ensure proper font fallbacks
4. **Performance issues**: Reduce active font families

### Debug Commands

```typescript
// Check theme state
console.log(useTheme())

// Validate font loading
document.fonts.ready.then(() => console.log('Fonts loaded'))

// Monitor CSS variables
getComputedStyle(document.documentElement).getPropertyValue('--font-family-primary')
```

## Changelog

### v2.0.0
- Initial theme system implementation
- Google Fonts integration
- Dynamic color generation
- Theme editor interface
- CSS custom properties migration
- Performance optimizations

## Contributing

To contribute to the theme system:

1. Follow TypeScript interfaces in `/types/theme.ts`
2. Add tests for new font/color utilities
3. Update documentation for new features
4. Ensure backward compatibility
5. Test performance impact

For questions or issues, please refer to the main project documentation or create an issue in the repository.