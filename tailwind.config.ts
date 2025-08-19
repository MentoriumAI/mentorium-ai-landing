import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        // Exact Brand Colors
        brand: {
          'dark-green': '#093b2c',
          'brunswick-green': '#0f4c38',
          'isabelline': '#f7f4ef',
          'brandeis-blue': '#006fea',
          'sunglow': '#fac827',
          'dark-moss-green': '#536c03',
          'orange-pantone': '#fb6113',
        },
        // Primary palette (greens) - based on brand greens
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
        // Secondary palette (blues) - based on brandeis-blue
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
        // Accent palette (yellows) - based on sunglow
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
        // Success palette - based on dark-moss-green
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
        // CTA/Warning palette - based on orange-pantone
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
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f4c38, #093b2c)',
        'gradient-cta': 'linear-gradient(135deg, #fb6113, #536c03)',
        'gradient-subtle': 'linear-gradient(135deg, #f7f4ef, #f0fdf6)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'elegant': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(250, 200, 39, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config