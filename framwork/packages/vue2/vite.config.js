import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  server: {
    port: 2003,
    host: 'localhost'
  },
  resolve: {
    alias: {
      'virtual:common/adapter/vue': path.resolve(
        __dirname,
        `../components/vue/common/src/adapter/vue2/index`
      )
    }
  },
  define: {
    'process.env': { ...process.env }
  }
})
