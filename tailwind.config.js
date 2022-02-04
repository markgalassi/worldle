module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        reveal: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
        pop: {
          "0%": {
            transform: "scale(1)",
          },
          "75%": {
            transform: "scale(1.25)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        reveal: "reveal 200ms forwards",
        pop: "pop 500ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
