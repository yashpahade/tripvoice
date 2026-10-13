/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488',
        primaryDark: '#0F766E',
        primaryLight: '#2DD4BF',
        accent: '#F97316',
        accentDark: '#EA580C',
        navy: '#0F172A',
        navyLight: '#1E293B',
        success: '#10B981',
        successLight: '#34D399',
        danger: '#EF4444',
        warning: '#F59E0B',
        pageBg: '#F8FAFC',
        cardBorder: '#E2E8F0',
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        button: '24px',
      },
      boxShadow: {
        card: '0 1px 6px rgba(0,0,0,0.1)',
        cardHover: '0 4px 16px rgba(0,0,0,0.16)',
        header: '0 2px 8px rgba(0,0,0,0.08)',
      },
      maxWidth: {
        container: '1200px',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      }
    },
  },
  plugins: [],
}
