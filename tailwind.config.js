/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#06080D',
          900: '#0B0F19',
          850: '#0E1422',
          800: '#131B2E',
          700: '#1E293B',
        },
        cool: {
          cyan: '#06B6D4',
          sky: '#38BDF8',
          blue: '#3B82F6',
          indigo: '#6366F1',
          violet: '#8B5CF6',
          slate: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle-cyan': '0 0 20px -5px rgba(56, 189, 248, 0.25)',
      },
    },
  },
  plugins: [],
}
