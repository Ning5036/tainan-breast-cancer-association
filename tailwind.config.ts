import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E8A0B4",
        secondary: "#F5D0DC",
        accent: "#9B4F6B",
        background: "#FEF9F9",
        foreground: "#3D2B2B",
        charcoal: "#3D2B2B",
      },
      fontFamily: {
        sans: ["Noto Sans TC", "Lato", "sans-serif"],
        heading: ["Playfair Display", "Noto Sans TC", "serif"],
        body: ["Lato", "Noto Sans TC", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
