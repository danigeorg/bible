import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' lets the build work on GitHub Pages under any repo name.
export default defineConfig({ base: './', plugins: [react(), tailwindcss()] })
