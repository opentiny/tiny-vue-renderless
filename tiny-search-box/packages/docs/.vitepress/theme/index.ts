import DefaultTheme from 'vitepress/theme'
import { NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css' // 导入 Font Awesome 图标
import '@opentiny/vue-theme/dark-theme-index.css'
import '@opentiny/vue-search-box/src/index.less'
import './index.less'
export default {
  ...DefaultTheme,
  async enhanceApp({ app }) {
    if (!import.meta.env.SSR) {
      const Module = await import('@opentiny/vue-search-box')
      app.use(Module.default)
    }
    app.component('demo-preview', NaiveUIContainer)
  }
}
