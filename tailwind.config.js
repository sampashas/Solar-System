/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      ampersand: ['Playfair Display'],
    },
    extend: {
      colors: {
        primary: '#FF7A00',
        secondary: '#393D86',
        bg: '#ffffff',
        w10: '#ffffff10',
        w30: '#ffffff30',
        b15: '#00000015',
        b30: '#00000030',
      },
      animation: {
        zoom: 'zoom linear 14s infinite',
        ticker: 'ticker linear 30s infinite',
      },
      keyframes: {
        zoom: {
          '0%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-1000px)' },
        },
      },
    },
  },
  plugins: [],
}
