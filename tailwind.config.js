/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      btn: {
        base: "py-2 px-4 rounded",
        primary: "bg-[#dadada] text-white",
        hover: "hover:bg-[#7a7a7a]",
      },
    },
  },
  plugins: [require("daisyui")],
};
