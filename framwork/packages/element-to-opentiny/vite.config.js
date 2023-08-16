import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  server: {
    port: 2200,
    host: 'localhost'
  },
  define: {
    'process.env': { ...process.env }
  }
})
