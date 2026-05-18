/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7c6af7',
        'primary-2': '#9d8fff',
        secondary: '#8b5cf6',
        success: '#4eca8b',
        warning: '#f5a623',
        error: '#f55c5c',
        info: '#5baef7',
        teal: '#2dd4bf',
        pink: '#f472b6',
        bg: '#0f0f11',
        'bg-2': '#16161a',
        'bg-3': '#1e1e24',
        'bg-4': '#26262e',
        'bg-5': '#2e2e38',
        ink: '#f0eff4',
        'ink-2': '#9997a8',
        'ink-3': '#5e5c72',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', '"Fira Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '10px',
        sm: '6px',
        lg: '14px',
      },
    },
  },
  plugins: [],
}
