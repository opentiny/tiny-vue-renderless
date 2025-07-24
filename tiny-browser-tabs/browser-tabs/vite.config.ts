import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name: 'TinyBrowserTabs',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
      cssFileName: 'index'
    },
    rollupOptions: {
      external: ['vue', '@opentiny/vue-popover'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
