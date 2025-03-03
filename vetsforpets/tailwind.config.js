/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
          default: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
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
  plugins: [require('tailwindcss-textshadow')],
};

export default config;
