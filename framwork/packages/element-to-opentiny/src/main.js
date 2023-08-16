import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(ElementUI)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('./components/HomePage.vue')
    },
    {
      path: '/form',
      component: () => import('./components/FormPage.vue')
    },
    {
      path: '/list',
      component: () => import('./components/ListPage.vue')
    }
  ]
})

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
