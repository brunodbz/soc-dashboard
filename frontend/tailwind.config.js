/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        critical: '#fca5a5',
        high: '#fdba74',
        medium: '#fcd34d',
        low: '#93c5fd',
        info: '#a5b4fc',
      },
    },
  },
  plugins: [],
}
