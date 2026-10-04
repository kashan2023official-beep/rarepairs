export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4F1EA',
        navy: '#1A2B42',
        'navy-card': '#23364F',
        available: '#2D6A4F',
        'available-dark': '#6EE7B7',
        sold: '#9B2226',
        'sold-dark': '#FCA5A5',
        rare: '#B45309',
        'rare-dark': '#FCD34D',
      },
      fontFamily: {
        logo: ['Pacifico', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.2s ease-out',
      }
    },
  },
}
