import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // Pre-bundle the heavy dependencies at server start so Vite never triggers a
  // mid-session re-optimisation (which forces a full page reload).
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'gsap', 'gsap/ScrollTrigger', 'lenis', 'three'],
  },
})
