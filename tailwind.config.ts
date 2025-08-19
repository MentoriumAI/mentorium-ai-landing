import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['ui-serif', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
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
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'orbit': 'orbit 40s linear infinite',
        'orbit-reverse': 'orbit-reverse 50s linear infinite',
        'orbit-slow': 'orbit 60s linear infinite',
        'orbit-ellipse-1': 'orbitEllipse1 45s linear infinite',
        'orbit-ellipse-2': 'orbitEllipse2 50s linear infinite',
        'orbit-ellipse-3': 'orbitEllipse3 55s linear infinite',
        'subtle-float': 'subtleFloat 3s ease-in-out infinite',
        'subtle-float-delayed': 'subtleFloat 3s ease-in-out infinite 1.5s',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'entrance-float': 'entrance-float 1s ease-out',
        'sparkle': 'sparkle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        'orbit-reverse': {
          '0%': { transform: 'rotate(0deg) translateX(90px) rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg) translateX(90px) rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(251, 97, 19, 0.3), 0 0 40px rgba(15, 76, 56, 0.1)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(251, 97, 19, 0.5), 0 0 60px rgba(15, 76, 56, 0.2)',
            transform: 'scale(1.05)' 
          },
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
        'entrance-float': {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(30px) scale(0.8)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0) scale(1)' 
          },
        },
        sparkle: {
          '0%, 100%': { 
            opacity: '0.7',
            transform: 'scale(1) rotate(0deg)' 
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.1) rotate(180deg)' 
          },
        },
        breathe1: {
          '0%, 100%': { 
            transform: 'scale(1) translateY(0px)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.02) translateY(-3px)',
            opacity: '0.95'
          },
        },
        breathe2: {
          '0%, 100%': { 
            transform: 'scale(1) translateY(0px)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(0.98) translateY(-5px)',
            opacity: '0.9'
          },
        },
        breathe3: {
          '0%, 100%': { 
            transform: 'scale(1) translateY(0px)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.03) translateY(-4px)',
            opacity: '0.93'
          },
        },
        breathe4: {
          '0%, 100%': { 
            transform: 'scale(1) translateY(0px)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(0.99) translateY(-6px)',
            opacity: '0.88'
          },
        },
        orbitEllipse1: {
          '0%': { transform: 'rotate(0deg) translateX(130px) translateY(-20px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(130px) translateY(-20px) rotate(-360deg)' },
        },
        orbitEllipse2: {
          '0%': { transform: 'rotate(0deg) translateX(140px) translateY(-10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(140px) translateY(-10px) rotate(-360deg)' },
        },
        orbitEllipse3: {
          '0%': { transform: 'rotate(0deg) translateX(120px) translateY(-15px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) translateY(-15px) rotate(-360deg)' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      boxShadow: {
        'elegant': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'floating': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(250, 200, 39, 0.3)',
        'glow-green': '0 0 20px rgba(15, 76, 56, 0.4), 0 0 40px rgba(15, 76, 56, 0.1)',
        'glow-orange': '0 0 20px rgba(251, 97, 19, 0.4), 0 0 40px rgba(251, 97, 19, 0.1)',
        'glow-strong': '0 0 30px rgba(251, 97, 19, 0.5), 0 0 60px rgba(15, 76, 56, 0.2)',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/3': '5 / 3',
        '16/10': '16 / 10',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
export default config