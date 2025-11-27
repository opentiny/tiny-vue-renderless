/* eslint-disable prefer-template */
import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import DefaultLayout from '@src/layout/layout.vue';
import appVueRoutes from '@src/router/vue-pro';
import appNgRoutes from '@src/router/ng-pro';
import appCliRoutes from '@src/router/tiny-cli';
import appThemeRoutes from '@src/router/theme';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/vue-pro/docs/start',
    },
    {
      path: '/vue-pro',
      redirect: '/vue-pro/docs/start',
    },
    {
      path: '/ng-pro',
      redirect: '/ng-pro/docs/introduction',
    },
    {
      path: '/tiny-cli',
      redirect: '/tiny-cli/docs/start',
    },
    {
      path: '/theme',
      redirect: '/theme/docs/introduction',
    },
    {
      name: 'root',
      path: '/',
      component: DefaultLayout,
      children: [
        ...appVueRoutes,
        ...appNgRoutes,
        ...appCliRoutes,
        ...appThemeRoutes,
      ],
    },
    // 未匹配到目标地址时，进行路由重定向
    {
      path: '/vue-pro/docs/:pathMatch(.*)*',
      redirect: '/vue-pro/docs/start',
    },
    {
      path: '/ng-pro/docs/:pathMatch(.*)*',
      redirect: '/ng-pro/docs/introduction',
    },
    {
      path: '/tiny-cli/docs/:pathMatch(.*)*',
      redirect: '/tiny-cli/docs/start',
    },
    {
      path: '/theme/docs/:pathMatch(.*)*',
      redirect: '/theme/docs/introduction',
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
