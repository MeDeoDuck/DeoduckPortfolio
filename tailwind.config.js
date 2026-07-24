/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // 색은 셋뿐이다. 나머지 층위는 전부 이 셋의 투명도로 만든다.
      colors: {
        ink: '#0C0C0C',
        mist: '#D7E2EA',
        accent: '#0A84FF',
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
