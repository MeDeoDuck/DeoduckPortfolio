/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // 색은 셋뿐이다. 나머지 층위(회색·경계·면)는 전부 ink의 투명도로 만든다.
      colors: {
        paper: '#FFFFFF',
        ink: '#1D1D1F',
        accent: '#0071E3',
      },
      fontFamily: {
        display: ['Archivo', 'Pretendard Variable', 'Pretendard', 'sans-serif'],
        sans: ['Pretendard Variable', 'Pretendard', 'Archivo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
