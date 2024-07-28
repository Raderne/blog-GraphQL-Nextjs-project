/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        white: {
          1: "#FFFFFF",
          2: "rgba(255, 255, 255, 0.72)",
          3: "rgba(255, 255, 255, 0.4)",
          4: "rgba(255, 255, 255, 0.64)",
          5: "rgba(255, 255, 255, 0.80)",
        },
        black: {
          1: "#000000",
          2: "#222429",
          3: "#101114",
          4: "#252525",
          5: "#2E3036",
          6: "#24272C",
        },
        purple: {
          1: "#A40E4C",
        },
        yellow: {
          1: "#F0C808",
        },
        blue: {
          1: "#3D405B",
        },
        cream: {
          1: "#F2CC8F",
        },
        offwhite: {
          1: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};
