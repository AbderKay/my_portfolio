import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        text: "var(--text)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        primary: "var(--primary)",
        "primary-ink": "var(--primary-ink)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        accent3: "var(--accent3)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "step--1": "clamp(0.8rem, 0.76rem + 0.2vw, 0.9rem)",
        "step-0": "clamp(1rem, 0.95rem + 0.2vw, 1.1rem)",
        "step-1": "clamp(1.25rem, 1.1rem + 0.6vw, 1.6rem)",
        "step-2": "clamp(1.7rem, 1.4rem + 1.4vw, 2.6rem)",
        "step-3": "clamp(2.3rem, 1.8rem + 2.4vw, 4rem)",
        display: "clamp(2.8rem, 1.4rem + 7vw, 8rem)",
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        inset: "8px",
        card: "12px",
        media: "18px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(.22,1,.36,1)",
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "scroll-x": {
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 1.1s step-end infinite",
        "scroll-x": "scroll-x 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
