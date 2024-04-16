import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [
    createVuePlugin({
      jsx: true
    }),
  ],
  server: {
    port: 7126
  }
}
