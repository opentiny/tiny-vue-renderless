import path from 'path'
import { defineConfig,searchForWorkspaceRoot } from 'vite'
import vue from "@vitejs/plugin-vue";         // 支持 vue + setup
import vueJsx from "@vitejs/plugin-vue-jsx";  // 支持 jsx

const workspaceRoot = searchForWorkspaceRoot(process.cwd()) // 根路径 ： /mini-tiny-vue

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  define:{
    VUE_VERSION: "3"
  },
  build: {
    outDir: path.resolve(workspaceRoot,'demos/vue3-app/src/lib/opentiny-vue'),
    emptyOutDir:true,
    lib: {
      entry: path.resolve(workspaceRoot,'packages/vue/index.js'),
      name: 'OpentinyVue',
      formats: ['es'],
      fileName: (format) => `opentiny-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
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
