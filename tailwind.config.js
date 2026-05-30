/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        gold: '#D4AF37',
        'gold-dark': '#B8941F',
        'light-gray': '#F5F7FA',
        dark: '#1A1A1A',
      },
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
