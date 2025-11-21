import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [mode === 'analyze' ? visualizer({ open: true }) : undefined, , vue(), cssInjectedByJsPlugin()],
  envDir: './env',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  define: {
    'process.env': {}
  },
  build: {
    emptyOutDir: false,
    outDir: '../../dist/common',
    lib: {
      entry: './src/index.ts',
      name: 'TDCommon',
      fileName: 'tinyui-design-common',
      formats: ['umd', 'iife']
    },
    assetsInlineLimit: 100 * 1024, // 把图片打包到js， 避免再去做图片地址替换
    minify: true
  },
  server: {
    port: 7000
  }
}))
