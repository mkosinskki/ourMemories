/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    //  colors: {
    //     whiteBlue: 'DAF0FF',
    //     color1: 'B5E2FF',
    //     color2: '8FD3FE',
    //     color3: '6AC5FE',
    //     color4: '45B6FE',
    //   },
    },
  },
  plugins: ["@tailwindcss/postcss"],
}