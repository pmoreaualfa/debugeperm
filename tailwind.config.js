/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pages/**/*.{html, js}',
    './components/**/*.{html, js}'
  ],
  theme: {
    extend: {
      colors:{
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        }
      }
    },
  },
  plugins: [],
}

