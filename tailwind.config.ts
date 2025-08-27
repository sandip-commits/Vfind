import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // Enables class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
       keyframes: {
    dash: {
      "72.5%": { opacity: "0" },
      "100%": { strokeDashoffset: "0" },
    },
  },
  animation: {
    dash: "dash 1.4s linear infinite",
  },
    },
  },
  plugins: [],
}
export default config
