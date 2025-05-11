// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import '../../../style/all.css' // 引入全是的图标类名
import 'lu2/theme/edge/css/common/variables.css'
import 'lu2/theme/edge/css/common/ui/Color.css'
import 'lu2/theme/edge/css/common/ui/Select.css'
import 'lu2/theme/edge/css/common/ui/Input.css'
import 'lu2/theme/edge/css/common/ui/Placeholder.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 防止 lulu 不支持ssr 报错
    if (!import.meta.env.SSR) {
      import(`lu2/theme/edge/js/common/ui/Color.js`)
      import(`lu2/theme/edge/js/common/ui/Select.js`)
    }
  }
} satisfies Theme
