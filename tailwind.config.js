/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#04B45F',
        'primary-dark': '#026636',
        'turquoise': '#1ABC9C',
        'blue-light': '#62BFE6',
        'background-light': '#F9F9FC',
        'gray-dark': '#303030',
        'gray-medium': '#8A8A8A',
        'yellow-alert': '#FFF500',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
