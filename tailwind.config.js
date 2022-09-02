/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#000000",
          grey: "#474747",
          pink: "#ffba9d",
        },
        neutral: {
          darkGrey: "#777777",
          grey: "#dfdfdf",
          lightGrey: "#f4f4f4",
          white: "#ffffff",
        },
        semantic: {
          errorState: "#891900",
        },
      },
    },
  },
  plugins: [],
};
