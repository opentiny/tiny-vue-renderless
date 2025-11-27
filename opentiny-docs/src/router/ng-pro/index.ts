import type { RouteRecordRaw } from 'vue-router';

const routerList = [
  {
    path: 'introduction',
    name: 'introduction',
    id: 'introduction',
    label: '总览',
    component: () => import('@src/views/ng-pro/introduction.md'),
    meta: {
      requiresAuth: true,
      order: 1,
      type: 'ng-pro',
    },
  },
  {
    path: 'directory',
    name: 'directory',
    id: 'directory',
    label: '目录结构',
    component: () => import('@src/views/ng-pro/directory.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'ng-pro',
    },
  },
  {
    path: 'routing',
    name: 'routing',
    id: 'routing',
    label: '路由与菜单',
    component: () => import('@src/views/ng-pro/routing.md'),
    meta: {
      requiresAuth: true,
      order: 3,
      type: 'ng-pro',
    },
  },
  {
    path: 'newpage',
    name: 'newpage',
    id: 'newpage',
    label: '新增页面',
    component: () => import('@src/views/ng-pro/newpage.md'),
    meta: {
      requiresAuth: true,
      order: 4,
      type: 'ng-pro',
    },
  },
  {
    path: 'layout',
    name: 'layout',
    id: 'layout',
    label: '布局',
    component: () => import('@src/views/ng-pro/layout.md'),
    meta: {
      requiresAuth: true,
      order: 5,
      type: 'ng-pro',
    },
  },
  {
    path: 'grid',
    name: 'grid',
    id: 'grid',
    label: '响应式 & 栅格',
    component: () => import('@src/views/ng-pro/grid.md'),
    meta: {
      requiresAuth: true,
      order: 6,
      type: 'ng-pro',
    },
  },
  {
    path: 'mock',
    name: 'mock',
    id: 'mock',
    label: 'Mock数据',
    component: () => import('@src/views/ng-pro/mock.md'),
    meta: {
      requiresAuth: true,
      order: 7,
      type: 'ng-pro',
    },
  },
  {
    path: 'i18n',
    name: 'i18n',
    id: 'i18n',
    label: '国际化',
    component: () => import('@src/views/ng-pro/i18n.md'),
    meta: {
      requiresAuth: true,
      order: 8,
      type: 'ng-pro',
    },
  },
  {
    path: 'advanced',
    name: 'advanced',
    id: 'advanced',
    label: '高级',
    meta: {
      requiresAuth: true,
      order: 9,
      type: 'ng-pro',
    },
    children: [
      {
        path: 'hwcStart',
        name: 'hwcStart',
        id: 'hwcStart',
        label: '快速开始',
        component: () => import('@src/views/ng-pro/hwcStart.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwcPlugin',
        name: 'hwcPlugin',
        id: 'hwcPlugin',
        label: '云服务插件',
        component: () => import('@src/views/ng-pro/hwcPlugin.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwcClient',
        name: 'hwcClient',
        id: 'hwcClient',
        label: '云服务客户端库',
        component: () => import('@src/views/ng-pro/hwcClient.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwcPractice',
        name: 'hwcPractice',
        id: 'hwcPractice',
        label: '云服务最佳实践',
        component: () => import('@src/views/ng-pro/hwcPractice.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const routerListUs = [
  {
    path: '',
    name: '',
    id: '',
    label: 'Overview',
    component: () => import('@src/views/ng-pro/introduction-us.md'),
    meta: {},
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Directory Structure',
    component: () => import('@src/views/ng-pro/directory-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Routes and Menus',
    component: () => import('@src/views/ng-pro/routing-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Add Page',
    component: () => import('@src/views/ng-pro/newpage-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Layout',
    component: () => import('@src/views/ng-pro/layout-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Responsive & Grid',
    component: () => import('@src/views/ng-pro/grid-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Mock Data',
    component: () => import('@src/views/ng-pro/mock-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Internationalization',
    component: () => import('@src/views/ng-pro/i18n-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Advanced',
    children: [
      {
        path: 'hwcStart',
        name: 'hwcStart',
        id: 'hwcStart',
        label: 'Quick Start',
        component: () => import('@src/views/ng-pro/hwcStart-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwcPlugin',
        name: 'hwcPlugin',
        id: 'hwcPlugin',
        label: 'Cloud Service Plug-ins',
        component: () => import('@src/views/ng-pro/hwcPlugin-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwcClient',
        name: 'hwcClient',
        id: 'hwcClient',
        label: 'Cloud Service Client Library',
        component: () => import('@src/views/ng-pro/hwcClient-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwcPractice',
        name: 'hwcPractice',
        id: 'hwcPractice',
        label: 'Cloud Service Best Practices',
        component: () => import('@src/views/ng-pro/hwcPractice-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const appNgRoutes: RouteRecordRaw[] = [];

if (localStorage.getItem('_lang') === 'enUS') {
  routerListUs.forEach((item, index) => {
    item.path = `/ng-pro/docs/${routerList[index].path}`;
    item.name = `ng-${routerList[index].name}`;
    item.id = `ng-${routerList[index].id}`;
    item.meta = routerList[index].meta;
  });

  appNgRoutes.push(...routerListUs);
} else {
  routerList.forEach((item) => {
    item.path = `/ng-pro/docs/${item.path}`;
    item.name = `ng-${item.name}`;
    item.id = `ng-${item.id}`;
  });
  appNgRoutes.push(...routerList);
}

export default appNgRoutes;
