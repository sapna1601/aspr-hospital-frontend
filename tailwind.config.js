module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#67C5AD",
        secondary: "#112435",
        background: "#DDDDDD",
        success: "#4caf50",
        danger: "#f44336",
        warning: "#ffeb3b",
        info: "#2196f3",
        light: "#f4f4f4",
        dark: "#212121",
        white: "#ffffff",
        black: "#000000",
      },
    },
    screens: {
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
