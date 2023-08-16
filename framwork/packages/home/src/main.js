import { createApp } from 'vue'
import WujieVue from 'wujie-vue3'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

app.use(WujieVue).use(router).mount('#app')
