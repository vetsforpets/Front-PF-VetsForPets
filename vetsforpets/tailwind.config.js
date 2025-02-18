/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBeige: "#FFFAD7",
        customHardBeige: "#fbeb83",
        customLightBrown: "#DDA15E",
        customBrown: "#BC6C25",
        customHardBrown: "#6b3d15",
        customGreen: "#606C38",
        customDarkGreen: "#283618",
      },
      fontFamily: {
        kiwi: ["Kiwi Maru", "serif"],
        tenor: ["Tenor Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
