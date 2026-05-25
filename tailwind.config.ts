import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#BF5FFF",
          "purple-dark": "#7F35CC",
          "purple-deeper": "#26215C",
          black: "#07070f",
          "black-soft": "#0d0d1a",
          "black-card": "#111122",
        },
        cat: {
          selfdev: "#FFB800",
          philosophy: "#A855F7",
          business: "#00FF9D",
          fiction: "#FF6B00",
          psychology: "#FF4E6A",
          spirituality: "#00C9FF",
          finance: "#00D68F",
          science: "#00B4CC",
          history: "#EF9F27",
          biography: "#5DCAA5",
          classics: "#B5D4F4",
          health: "#97C459",
          sleep: "#7F77DD",
        }
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        }
      },
    },
  },
  plugins: [],
};
export default config;
