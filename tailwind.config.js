/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      intrepid: ["Intrepid"],
      montserrat: ["Montserrat"],
    },
    extend: {
      colors: {
        AquaHaze: "#F1F6F6",
        Seashell: "#F1F1F1",
        Bismark: "#456E84",
      },
    },
  },
  plugins: [],
};
