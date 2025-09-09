import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
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
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Light theme colors
        light: {
          50: '#FFFFFF',   // Pure White
          100: '#F8F9FA',  // Off White
          200: '#E9ECEF',  // Light Gray
          300: '#DEE2E6',  // Medium Light Gray
          400: '#CED4DA',  // Gray
          500: '#ADB5BD',  // Medium Gray
          600: '#6C757D',  // Dark Gray
          700: '#495057',  // Darker Gray
          800: '#343A40',  // Very Dark Gray
          900: '#212529',  // Near Black
        },
        // Green theme colors
        green: {
          50: '#E0F2F1',   // Mint Green
          100: '#B2DFDB',  // Light Mint
          200: '#80CBC4',  // Medium Mint
          300: '#4DB6AC',  // Darker Mint
          400: '#26A69A',  // Teal
          500: '#004D40',  // Rich Teal (primary)
          600: '#00695C',  // Deep Teal
          700: '#00796B',  // Forest Teal
          800: '#00897B',  // Ocean Teal
          900: '#004D40',  // Rich Teal
        },
        // Pinkish-blue gradient colors
        gradient: {
          pink: '#F8BBD9',     // Light Pink
          'pink-light': '#FCE4EC', // Very Light Pink
          blue: '#87CEEB',     // Sky Blue
          'blue-light': '#E1F5FE', // Very Light Blue
          start: '#F8BBD9',    // Gradient start (pink)
          end: '#87CEEB',      // Gradient end (blue)
        },
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
        glow: {
          '0%': { boxShadow: '0 4px 20px rgba(0, 77, 64, 0.15), 0 2px 8px rgba(0, 77, 64, 0.1)' },
          '50%': { boxShadow: '0 8px 30px rgba(0, 77, 64, 0.25), 0 4px 12px rgba(0, 77, 64, 0.15)' },
          '100%': { boxShadow: '0 4px 20px rgba(0, 77, 64, 0.15), 0 2px 8px rgba(0, 77, 64, 0.1)' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
