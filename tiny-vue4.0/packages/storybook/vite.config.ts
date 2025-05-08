import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import UnoCSS from 'unocss/vite'
import unoIconConfig from '../../uno.cofig'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [vue(), UnoCSS(unoIconConfig as any)],
  define: {
    __DEV__: !isProd,
    __VERSION__: '4',
  },
})
