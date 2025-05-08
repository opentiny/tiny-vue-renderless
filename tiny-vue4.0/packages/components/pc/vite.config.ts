import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { analyzer } from 'vite-bundle-analyzer'
import UnoCSS from 'unocss/vite'
import unoIconConfig from '../../../uno.cofig'
import fs from 'fs'

const { version } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'))
const isProd = process.env.NODE_ENV === 'production'
const isAnalyzer = process.env.analyzer === 'true'

export default defineConfig({
  plugins: [
    vue(),
    dts({ tsconfigPath: '../../../tsconfig.app.json' }) as PluginOption,
    UnoCSS(unoIconConfig),
    isAnalyzer ? analyzer() : null,
  ],
  build: {
    rollupOptions: {
      // output: {
      //   banner: 'import "./style.css";',
      // },
      external: ['vue', /@opentiny\/vue-directives/, /@opentiny\/vue-hooks/, /@opentiny\/utils/],
    },
    lib: {
      entry: './index.ts',
      name: 'tiny-vue4-pc',
      formats: ['es'],
    },
    minify: true,
  },
  define: {
    __DEV__: !isProd,
    __VERSION__: JSON.stringify(version),
  },
})
