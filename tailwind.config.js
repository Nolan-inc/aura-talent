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
          50: '#e6f7f9',
          100: '#b8e6ec',
          200: '#8ad5dd',
          300: '#5cc4ce',
          400: '#2eb3bf',
          500: '#4BA3A3', // Main Turquoise Blue
          600: '#3d8585',
          700: '#2f6767',
          800: '#214949',
          900: '#132b2b',
          950: '#0a1616',
        }
      }
    },
  },
  plugins: [],
}