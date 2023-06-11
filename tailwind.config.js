/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          "18181f": "#18181f",
          "#272732": "#272732",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
