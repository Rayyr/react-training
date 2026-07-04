/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 20px rgba(255,204,112,.7), 0 0 40px rgba(200,80,192,.5), 0 0 60px rgba(65,88,208,.3)",
      },
    },
  },
  plugins: [],
};