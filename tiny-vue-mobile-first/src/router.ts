import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './pages/index/index.vue'
import About from './pages/about/index.vue'
import Detail from './pages/detail/index.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/detail', component: Detail }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})
