/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/**"],
  theme: {
    screens: {
      sm: { min: "340px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }
      //   xs: "420px",
      //   sm: "620px",
      //   md: "728px",
      //   lg: "1024px",
      //   xl: "1280px",
      //   "2xl": "1536px",
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      white: "#fff",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    // spacing: {
    //   px: "1px",
    //   0: "0",
    //   0.5: "5px",
    //   1: "10px",
    //   1.5: "15px",
    //   2: "20px",
    //   2.5: "25px",
    //   3: "30px",
    //   3.5: "35px",
    //   4: "40px",
    //   5: "50px",
    //   6: "60px",
    //   7: "70px",
    //   8: "80px",
    //   sm: "8px",
    //   md: "12px",
    //   lg: "16px",
    //   xl: "24px",
    // },
    borderRadius: {
      none: "0",
      sm: ".125rem",
      DEFAULT: ".8px",
      lg: ".5rem",
      full: "9999px",
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("daisyui")],
};
