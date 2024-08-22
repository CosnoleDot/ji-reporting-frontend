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
        primary:"#002856",
        heading:"#09090B",
        secondaryText:"#71717A",
        inputBorder:"#E4E4E7",
        accentForeground:"#18181B",
        innerAlignment:"#94A3B8",
        destructive:"#EF4343",
        green:"#08AE51",
        blue:"#138DFE"
      },
      screens: { 
        'md': '768px',  
      },
    },
  },
  plugins: [require("daisyui")],
};
