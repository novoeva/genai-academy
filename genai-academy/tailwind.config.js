/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6f68f7',
          600: '#5148d8',
          700: '#4338ca',
          800: '#4f46e5',
          900: '#312e81',
        },
        surface: '#f7f9fb',
        sidebar: '#f8fafc',
        ink: {
          dark:  '#2c3437',
          mid:   '#596064',
          light: '#94a3b8',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(170deg, #4f46e5 0%, #818cf8 100%)',
      },
    },
  },
  plugins: [],
}

