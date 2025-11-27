import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 由于动态加载卡片 js 文件时，不会自动加载卡片配套的样式文件，故将 css 样式打包到统一的 js 文件里
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), cssInjectedByJsPlugin()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
    outDir: 'dist',
    emptyOutDir: false, // 构建卡片直接输出到 dist 目录，不要清空已构建的产物
    lib: {
      entry: 'src/TinyCard.vue',
      name: 'card',
      formats: ['es'], // 只需打包成 ES Module，不需要 UMD
      fileName: 'card'
    },
    rollupOptions: {
      // 必须把卡片用到的 TinyVue 和 Vue 排除，否则卡片和应用不在一个 Vue 实例里
      external: ['@opentiny/vue', 'vue']
    }
  }
})
