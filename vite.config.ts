import { defineConfig } from 'vite'
import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: './project.inlang',
      outdir: './src/paraglide',
      strategy: ['localStorage', 'preferredLanguage', 'baseLocale'],
    }),
    // Router plugin MUST come before the React plugin so it can transform
    // route files before React Fast Refresh processes them.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
