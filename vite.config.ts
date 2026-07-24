import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://<user>.github.io/DeoduckPortfolio/
export default defineConfig({
  plugins: [react()],
  base: '/DeoduckPortfolio/',
})
