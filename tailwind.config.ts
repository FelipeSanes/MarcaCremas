import type { Config } from "tailwindcss";

// Paleta y tipografías provisorias de Aura Botánica.
// Cuando tengamos el export de Stitch (content/design/stitch/DESIGN.md),
// reemplazar SOLO los valores de acá: los nombres de los tokens se mantienen.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#faf7f2",
        surface: "#faf7f2",
        "surface-container-low": "#f4efe7",
        "surface-container": "#efe8dd",
        "surface-container-high": "#e7dfd2",
        "on-background": "#2d3129",
        "on-surface": "#2d3129",
        "on-surface-variant": "#5f6659",
        outline: "#8f9786",
        "outline-variant": "#d8d2c4",
        primary: "#4f6b4a",
        "primary-hover": "#3f583b",
        "on-primary": "#ffffff",
        "primary-container": "#dfe8d6",
        "on-primary-container": "#243521",
        secondary: "#b5836a",
        "secondary-container": "#f3e1d6",
        "on-secondary-container": "#5a3423",
        error: "#ba1a1a",
        whatsapp: "#25d366",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      spacing: {
        xs: "4px",
        base: "8px",
        sm: "12px",
        gutter: "16px",
        md: "24px",
        lg: "48px",
        xl: "80px",
        "margin-mobile": "20px",
        "margin-desktop": "64px",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["64px", { lineHeight: "70px", letterSpacing: "-0.01em" }],
        "display-mobile": ["40px", { lineHeight: "46px", letterSpacing: "-0.01em" }],
        "headline-lg": ["36px", { lineHeight: "44px" }],
        "headline-md": ["24px", { lineHeight: "32px" }],
        "body-lg": ["18px", { lineHeight: "28px" }],
        "body-md": ["16px", { lineHeight: "24px" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600", letterSpacing: "0.08em" }],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(45, 49, 41, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
