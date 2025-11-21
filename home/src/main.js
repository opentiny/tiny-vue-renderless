import { createHead } from '@vueuse/head'

import { createApp } from 'vue'
import '@unocss/reset/eric-meyer.css'
import 'prismjs/prism'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/themes/prism.css'

import 'uno.css'

// markdown样式引用的是github-markdown-light.css
import 'github-markdown-css/github-markdown-light.css'
import './assets/index.less'

import '@/index.less'
import { i18n } from './i18n/index'
import { router } from './router'
import App from './App.vue'
import { $t, $t2 } from './i18n'
import { $pub, $recal } from './tools'

// 覆盖默认的github markdown样式
import './assets/custom-markdown.css'
import './assets/custom-block.less'

const mountApp = (TDCommon) => {
  // window.tinycommon = new TDCommon(['#header', '#footer'])
  // tinycommon.renderHeader()
  const app = createApp(App)
  app.config.performance = true
  app.use(router).use(i18n).use(createHead()).mixin({ methods: { $t, $t2, $pub } }).mount('#app')
}

// 本地环境联调公共头部和尾部
// if (import.meta.env.DEV) {
//   import('opentiny-design-common').then((common) => {
//     const TDCommon = common.default
//     mountApp(TDCommon)
//   })
// } else {
  mountApp(window.TDCommon)
// }
