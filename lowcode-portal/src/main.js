import { createApp } from 'vue'
import { Loading } from '@opentiny/vue'
import App from './App.vue'
import i18n from './i18n'
import router from './router'
import initSvgs from './svgs'
import TinyThemeTool from '@opentiny/vue-theme/theme-tool'
import { tinySmbTheme } from '@opentiny/vue-theme/theme' // SMB 主题

// eslint-disable-next-line no-new
new TinyThemeTool(tinySmbTheme, 'smbtheme') // 初始化主题

const app = createApp(App)

initSvgs(app)

app.use(Loading).use(i18n).use(router).mount('#app')
