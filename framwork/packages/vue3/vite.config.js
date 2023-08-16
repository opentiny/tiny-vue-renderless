import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 2004,
    host: 'localhost',
    https: false,
    proxy: {
      '/api': {
        target: '*',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      'virtual:common/adapter/vue': path.resolve(
        __dirname,
        `../components/vue/common/src/adapter/vue3/index`
      )
    }
  },
  define: {
    'process.env': { ...process.env }
  }
})
