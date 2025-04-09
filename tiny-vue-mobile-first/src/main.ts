import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { router } from './router'
import { customDesignConfig } from '@opentiny/vue-common'
import { twMerge } from 'tailwind-merge'
import './tailwind.css'

// 适配层集成twMerge能力
customDesignConfig.twMerge = twMerge

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {}
})

const app = createApp(App)
app.use(i18n)
app.use(router)

app.config.globalProperties.tiny_mode = { value: 'mobile-first' }
app.config.globalProperties.tiny_theme = { value: 'saas' }

app.mount('#app')
