/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundSize: {
      "50%": "50%",
    },
    extend: {
      animation: {
        fadeIn: "fadeIn 300ms ",
        fadeOut: "fadeOut 300ms ",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.5)" },
          "85%": { opacity: 1, transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0.8, transform: "translateY(400%)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
