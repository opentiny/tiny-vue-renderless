import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import React from '../views/React.vue'
import Solid from '../views/Solid.vue'
import Vue2 from '../views/Vue2.vue'
import Vue3 from '../views/Vue3.vue'
const basename = process.env.NODE_ENV === 'production' ? '/demo-main-vue/' : ''

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/react',
    name: 'react',
    component: React
  },
  {
    path: '/solid',
    name: 'solid',
    component: Solid
  },
  {
    path: '/vue2',
    name: 'vue2',
    component: Vue2
  },
  {
    path: '/vue3',
    name: 'vue3',
    component: Vue3
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  base: basename,
  routes
})

export default router
