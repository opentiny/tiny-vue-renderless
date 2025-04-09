import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@opentiny/vue-theme': '@opentiny/vue-theme-saas',
      '@opentiny/vue-icon': '@opentiny/vue-icon-saas'
    }
  }
})
