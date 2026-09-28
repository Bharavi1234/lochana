/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          950: '#12040b',
          900: '#1a0710',
          800: '#2c0d1c',
          700: '#42142b',
        },
        rose: {
          light: '#ff8fab',
          DEFAULT: '#fb6f92',
          deep: '#e05780',
          dark: '#b23b68',
        },
        gold: {
          DEFAULT: '#f0c9a0',
          light: '#fde8d0',
          dark: '#d49b6a',
        },
        cream: {
          DEFAULT: '#fff0f5',
          soft: '#fae1eb',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Quicksand"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-hearts': 'float-up 12s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'blob-drift': 'blob-drift 18s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 25px rgba(251, 111, 146, 0.45), 0 0 50px rgba(224, 87, 128, 0.25)',
          },
          '50%': {
            transform: 'scale(1.03)',
            boxShadow: '0 0 40px rgba(251, 111, 146, 0.75), 0 0 80px rgba(240, 201, 160, 0.45)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(3deg)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(105vh) scale(0.6) rotate(-10deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '85%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-15vh) scale(1.1) rotate(15deg)', opacity: '0' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.9', transform: 'scale(1.2)' },
        },
        'blob-drift': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -45px) scale(1.1)' },
          '66%': { transform: 'translate(-35px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(20px, 35px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
