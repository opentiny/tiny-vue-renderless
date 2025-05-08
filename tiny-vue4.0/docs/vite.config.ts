import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import unoIconConfig from '../uno.cofig'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), UnoCSS(unoIconConfig)],
  server: {
    port: 4000,
  },
  define: {
    __DEV__: true,
    __VERSION__: '4',
  },
})
