/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors:{
        secondary:"#002856",
        heading:"#09090B",
        secondaryText:"#71717A",
        inputBorder:"#E4E4E7"
      }
    },
  },
  plugins: [require("daisyui")],
};
