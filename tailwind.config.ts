import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Be Vietnam Pro'", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["'Noto Serif'", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        ink: "var(--ink)",
        parchment: "var(--parchment)",
        cinnabar: "var(--cinnabar)",
        muted: "var(--muted)",
      },
    },
  },
  plugins: [],
} satisfies Config;
