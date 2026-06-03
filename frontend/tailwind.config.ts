import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: { DEFAULT:'#0ea5e9', dark:'#0284c7', light:'#38bdf8' },
        brand: { 50:'#eff6ff', 500:'#3b82f6', 600:'#2563eb', 900:'#1e3a8a' }
      },
      fontFamily: { sans:['var(--font-dm-sans)','sans-serif'] }
    }
  },
  plugins: []
}
export default config
