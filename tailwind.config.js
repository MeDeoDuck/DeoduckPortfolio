/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0C0C0C',
        mist: '#D7E2EA',
        steel: '#646973',
        frost: '#BBCCD7',
      },
      fontFamily: {
        display: ['Kanit', 'Pretendard', 'sans-serif'],
        sans: ['Pretendard', 'Kanit', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
