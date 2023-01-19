/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat : ['"Montserrat"'],
        subrayada : ['"Montserrat Subrayada"']
      },
    },
  },
  plugins: [],
}
