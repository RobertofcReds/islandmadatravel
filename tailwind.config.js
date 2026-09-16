/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: { 50: '#f5f5ef', 100: '#eaeee7', 200: '#dce3da', 300: '#c3cfc5', 400: '#9aaaa1', 500: '#586f61', 600: '#506259', 700: '#344a40', 800: '#1c322a', 900: '#10271f', 950: '#091b15' },
        emerald: { 50: '#eff8f1', 100: '#dcefe1', 200: '#bbdec8', 300: '#90caae', 400: '#65b594', 500: '#258563', 600: '#17694e', 700: '#12533e', 800: '#103f32', 900: '#0e3328', 950: '#082219' },
        primary: {
          DEFAULT: '#10B981', // Émeraude moderne
          light: '#34D399',
          dark: '#059669',
        },
        secondary: {
          DEFAULT: '#F59E0B', // Ambre chaleureux
          light: '#FBBF24',
          dark: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        shooting: {
          '0%': { transform: 'translateX(0) translateY(0) rotate(-45deg)', opacity: '1' },
          '100%': { transform: 'translateX(-300px) translateY(300px) rotate(-45deg)', opacity: '0' },
        },
      },
      animation: {
        twinkle: 'twinkle var(--duration, 3s) ease-in-out infinite',
        shooting: 'shooting var(--duration, 5s) linear infinite',
      },
    },
  },
  plugins: [],
}