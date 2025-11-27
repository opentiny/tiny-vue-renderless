import type { RouteRecordRaw } from 'vue-router';

const routerThemeList = [
  {
    path: 'introduction',
    name: 'introduction',
    id: 'introduction',
    label: '总览',
    component: () => import('@src/views/theme/introduction.md'),
    meta: {
      requiresAuth: true,
      order: 1,
      type: 'theme',
    },
  },
  {
    path: 'guide-ng',
    name: 'guide-ng',
    id: 'guide-ng',
    label: 'TinyNG 主题配置指导',
    component: () => import('@src/views/theme/guide-ng.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'theme',
    },
  },
  {
    path: 'guide-vue',
    name: 'guide-vue',
    id: 'guide-vue',
    label: 'TinyVue 主题配置指导',
    component: () => import('@src/views/theme/guide-vue.md'),
    meta: {
      requiresAuth: true,
      order: 3,
      type: 'theme',
    },
  },
];

const appThemeRoutes: RouteRecordRaw[] = [];

routerThemeList.forEach((item) => {
  item.path = `/theme/docs/${item.path}`;
  item.name = `theme-${item.name}`;
  item.id = `theme-${item.id}`;
});

appThemeRoutes.push(...routerThemeList);
export default appThemeRoutes;
