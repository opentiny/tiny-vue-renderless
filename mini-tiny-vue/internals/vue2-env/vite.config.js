import path from 'path'
import { defineConfig,searchForWorkspaceRoot } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2' // 支持Vue + jsx

const workspaceRoot = searchForWorkspaceRoot(process.cwd()) // 根路径 ： /mini-tiny-vue

export default defineConfig({
  plugins: [
    createVuePlugin({
      jsx: true
    }),
  ],
  define:{
    VUE_VERSION: "2"
  },
  build: {
    outDir: path.resolve(workspaceRoot,'demos/vue2-app/src/lib/opentiny-vue'),
    emptyOutDir:true,
    lib: {

      entry: path.resolve(workspaceRoot,'packages/vue/index.js'),
      name: 'OpentinyVue',
      formats: ['es'],
      fileName: (format) => `opentiny-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue', '@vue/composition-api'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    minify:false,
    sourcemap:true
  }
})
