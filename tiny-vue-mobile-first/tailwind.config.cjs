/** @type { import('tailwindcss').Config } */
const config = require('@opentiny/vue-theme-saas/tailwind.config.js')

module.exports = {
  content: ['./src/**/*.{html,js,vue}', './node_modules/@opentiny/vue-*/lib/*.js'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      xl: '1000px'
    }
  },
  presets: [config],
  safelist: []
}
