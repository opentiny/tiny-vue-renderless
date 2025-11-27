import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/layout/layout.vue';
import { VITE_CONTEXT, CUR_BUILD_TYPE, BUILD_TYPES } from './shared/const';
import { $t } from './tools';

const Components = () => import('@/views/components/components.vue');
const Docs = () => import('@/views/docs/docs.vue');
const Overview = () => import('@/views/overview.vue');
const tinyTitle = VITE_CONTEXT === '/tiny-ng/' ? 'TinyNG' : 'TinyCloud';
const DemoPage = () => import('@/views/components/demoPage.vue');

let routes = [
  // 基础样式
  CUR_BUILD_TYPE === BUILD_TYPES.TINY_CLOUD && {
    path: VITE_CONTEXT + 'base-styles',
    component: Layout,
    name: 'baseStyles',
    children: [
      // 未匹配到目标地址时，进行路由重定向
      {
        path: '',
        redirect: { path: VITE_CONTEXT + 'base-styles/layout' },
      },
      {
        path: ':baseStyleId',
        component: Docs,
        name: 'root',
        meta: { title: $t('baseStyle') },
        children: [
          {
            path: ':baseStyleChildId',
            name: 'child',
            component: Docs,
            meta: { title: $t('baseStyle') },
          },
        ],
      },
    ],
  },
  // 组件总览
  {
    path: VITE_CONTEXT + 'overview',
    component: Layout,
    name: 'overview',
    children: [{ path: '', component: Overview, meta: { title: `组件总览 | ${tinyTitle}` }, name: 'componentsOverview' }],
  },
  // 文档
  {
    path: VITE_CONTEXT + 'docs/:docId',
    component: Layout,
    name: 'docs',
    children: [{ path: '', component: Docs }],
  },
  // 组件
  {
    path: VITE_CONTEXT + 'components/:cmpId',
    component: Layout,
    name: 'components',
    children: [{ path: '', component: Components }],
  },
  // 单个组件示例
  {
    path: VITE_CONTEXT + 'demoPage/:cmpId/:demoId',
    component: DemoPage,
    name: 'demoPage',
  },
  // 未匹配到目标地址时，进行路由重定向
  {
    path: '/:pathMatch(.*)*',
    redirect: { path: VITE_CONTEXT + 'overview' },
  },
].filter(Boolean);
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 为浏览器添加title
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
});
export { router };
