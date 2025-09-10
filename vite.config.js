import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: '/portfolio-3d-ia/', // Changez ceci par le nom de votre repository GitHub
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
