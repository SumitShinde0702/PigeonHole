import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))", 
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          glow: "hsl(var(--secondary-glow))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "glow": {
          "0%": {
            boxShadow: "var(--glow-small) hsl(var(--primary) / 0.4)",
          },
          "100%": {
            boxShadow: "var(--glow-large) hsl(var(--primary) / 0.8)",
          },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "card-flip": {
          "0%": { transform: "rotateY(0) scale(1)" },
          "50%": { transform: "rotateY(90deg) scale(1.1)" },
          "100%": { transform: "rotateY(0) scale(1)" },
        },
        "hole-open": {
          "0%": { transform: "scale(1) rotateZ(0deg)", opacity: "1" },
          "50%": { transform: "scale(1.1) rotateZ(5deg)", opacity: "0.8" },
          "100%": { transform: "scale(0.8) rotateZ(0deg)", opacity: "0" },
        },
        "pack-tear": {
          "0%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
          "25%": { transform: "scale(1.05) rotate(-2deg)", opacity: "0.9" },
          "50%": { transform: "scale(1.1) rotate(2deg)", opacity: "0.7" },
          "75%": { transform: "scale(0.95) rotate(-1deg)", opacity: "0.4" },
          "100%": { transform: "scale(0.8) rotate(0deg)", opacity: "0" },
        },
        "card-slide-in": {
          "0%": { transform: "translateY(20px) scale(0.8)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shake": "shake 0.5s ease-in-out",
        "card-flip": "card-flip 0.8s ease-in-out",
        "bounce-slow": "bounce-slow 2s infinite",
        "hole-open": "hole-open 0.6s ease-out forwards",
        "pack-tear": "pack-tear 0.8s ease-out forwards",
        "card-slide-in": "card-slide-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
