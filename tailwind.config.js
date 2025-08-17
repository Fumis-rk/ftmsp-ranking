/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ftmsp: {
          red: "#c62828",
          gray: "#424242",
          light: "#f5f5f5"
        }
      }
    }
  },
  plugins: []
}