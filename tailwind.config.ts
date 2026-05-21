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
        bg: "var(--color-bg)",
        dark: "var(--color-dark)",
        primary: "var(--color-primary)",
        accent: "var(--color-accent)",
        medical: "var(--color-medical)",
        "text-main": "var(--color-text)",
        muted: "var(--color-muted)",
      },
      fontFamily: {
        display: ["var(--font-dm-serif)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      spacing: {
        section: "8rem",
      },
    },
  },
  plugins: [],
};

export default config;
