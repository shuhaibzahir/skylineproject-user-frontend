module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.300", "currentColor"),
        pink: "#FF005C",
        "dark-white": "#F7F6F2",

        "dark-gray": "#6E6D7A",

        dark: "#262626",
        "white-100": "#F3F3F4",
      }),
      backgroundColor: (theme) => ({
        pink: "#FF005C",
        "dark-white": "#F7F6F2",

        "dark-gray": "#6E6D7A",

        dark: "#262626",
        "white-100": "#F3F3F4",
      }),
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        main: ["Dancing Script", "cursive"],
      },

      flex: {
        1: "1 1 0%",
        auto: "1 1 auto",

        inherit: "inherit",
        none: "none",

        2: "2 2 0%",
        3: "2 2 0%",
      },
      textColor: {
        pink: "#E63E6D",

        "dark-gray": "#6E6D7A",

        dark: "#262626",
        "white-100": "#F3F3F4",
      },

      minHeight: {
        withoutHeader: "calc(100vh - 6rem)",
      },
      height: {
        logoh: "40px",
      },
      width: {
        logow: "40px",
      },
    },
  },
  variants: {
    extend: {
      height: ["hover", "focus"],
      backgroundColor: ["hover", "active"],
      textColor: ["hover", "active"],
      transitionDuration: ["hover", "focus"],
      padding: ["hover"],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
