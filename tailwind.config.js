/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tiffany: {
          50: '#e6fbfb',
          100: '#c3f4f4',
          200: '#8aeaea',
          300: '#4fdede',
          400: '#20cfcf',
          500: '#0ABAB5', // Main Tiffany Blue
          600: '#099e9a',
          700: '#087c79',
          800: '#066361',
          900: '#044a48',
          950: '#023332',
        }
      }
    },
  },
  plugins: [],
}