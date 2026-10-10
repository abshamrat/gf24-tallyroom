const { fontFamily } = require("tailwindcss/defaultTheme");
import { createPreset } from "fumadocs-ui/tailwind-plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/fumadocs-ui/dist/**/*.js",
    "./content/**/*.mdx",
  ],
  prefix: "",
  presets: [createPreset()],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        paper: "url('/so-white.png')",
        space: "url('/so-black.png')",
        plus: "url('/plus.svg')",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          primary: "hsl(var(--brand-primary))",
          "primary-foreground": "hsl(var(--brand-primary-foreground))",
          secondary: "hsl(var(--brand-secondary))",
          "secondary-foreground": "hsl(var(--brand-secondary-foreground))",
          accent: "hsl(var(--brand-accent))",
        },
        gradient: {
          start: "hsl(var(--gradient-start))",
          mid: "hsl(var(--gradient-mid))",
          end: "hsl(var(--gradient-end))",
        },
        feature: {
          "1-start": "hsl(var(--feature-1-start))",
          "1-end": "hsl(var(--feature-1-end))",
          "2-start": "hsl(var(--feature-2-start))",
          "2-end": "hsl(var(--feature-2-end))",
          "3-start": "hsl(var(--feature-3-start))",
          "3-end": "hsl(var(--feature-3-end))",
          "4-start": "hsl(var(--feature-4-start))",
          "4-end": "hsl(var(--feature-4-end))",
          "5-start": "hsl(var(--feature-5-start))",
          "5-end": "hsl(var(--feature-5-end))",
          "6-start": "hsl(var(--feature-6-start))",
          "6-end": "hsl(var(--feature-6-end))",
          "7-start": "hsl(var(--feature-7-start))",
          "7-end": "hsl(var(--feature-7-end))",
          "8-start": "hsl(var(--feature-8-start))",
          "8-end": "hsl(var(--feature-8-end))",
        },
        status: {
          success: "hsl(var(--status-success))",
          "success-light": "hsl(var(--status-success-light))",
          warning: "hsl(var(--status-warning))",
          "warning-light": "hsl(var(--status-warning-light))",
          error: "hsl(var(--status-error))",
          "error-light": "hsl(var(--status-error-light))",
          info: "hsl(var(--status-info))",
          "info-light": "hsl(var(--status-info-light))",
        },
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          200: "hsl(var(--neutral-200))",
          300: "hsl(var(--neutral-300))",
          400: "hsl(var(--neutral-400))",
          500: "hsl(var(--neutral-500))",
          600: "hsl(var(--neutral-600))",
          700: "hsl(var(--neutral-700))",
          800: "hsl(var(--neutral-800))",
          900: "hsl(var(--neutral-900))",
          950: "hsl(var(--neutral-950))",
        },
        badge: {
          bg: "hsl(var(--badge-bg))",
          text: "hsl(var(--badge-text))",
          "bg-dark": "hsl(var(--badge-bg-dark))",
          "text-dark": "hsl(var(--badge-text-dark))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
