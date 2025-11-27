import type { RouteRecordRaw } from 'vue-router';

const routerList = [
  {
    path: 'start',
    name: 'Start',
    id: 'Start',
    label: '总览',
    component: () => import('@src/views/vue-pro/start.md'),
    meta: {
      icon: 'icon-settings',
      requiresAuth: true,
      order: 1,
      type: 'vue-pro',
    },
  },
  {
    path: 'quick-start',
    name: 'Quick Start',
    id: 'Quick Start',
    label: '快速上手',
    component: (): Promise<typeof import('*.md')> =>
      import('@src/views/vue-pro/quick-start.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'vue-pro',
    },
  },
  {
    path: 'back-end-guide',
    name: 'Back End Guide',
    id: 'Back End Guide',
    label: '后端指南',
    component: (): Promise<typeof import('*.md')> =>
      import('@src/views/vue-pro/back-end-guide.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'vue-pro',
    },
  },
  {
    path: 'front-end-guide',
    name: 'Front End Guide',
    id: 'Front End Guide',
    label: '前端指南',
    component: (): Promise<typeof import('*.md')> =>
      import('@src/views/vue-pro/front-end-guide.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'vue-pro',
    },
  },
  {
    path: 'directory',
    name: 'Directory',
    id: 'Directory',
    label: '目录结构',
    component: () => import('@src/views/vue-pro/directory.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'vue-pro',
    },
  },
  {
    path: 'menu',
    name: 'Menu',
    id: 'Menu',
    label: '路由与菜单',
    component: () => import('@src/views/vue-pro/menus.md'),
    meta: {
      requiresAuth: true,
      order: 3,
      type: 'vue-pro',
    },
  },
  {
    path: 'newpage',
    name: 'Newpage',
    id: 'Newpage',
    label: '新增页面',
    component: () => import('@src/views/vue-pro/newpage.md'),
    meta: {
      requiresAuth: true,
      order: 4,
      type: 'vue-pro',
    },
  },
  {
    path: 'request',
    name: 'Request',
    id: 'Request',
    label: 'Mock数据',
    component: () => import('@src/views/vue-pro/mock.md'),
    meta: {
      requiresAuth: true,
      order: 5,
      type: 'vue-pro',
    },
  },
  {
    path: 'internationa',
    name: 'Internationa',
    id: 'Internationa',
    label: '国际化',
    component: () => import('@src/views/vue-pro/internation.md'),
    meta: {
      requiresAuth: true,
      order: 6,
      type: 'vue-pro',
    },
  },
  {
    path: 'theme',
    name: 'Theme',
    id: 'Theme',
    label: '个性化主题',
    component: () => import('@src/views/vue-pro/theme.md'),
    meta: {
      requiresAuth: true,
      order: 7,
      type: 'vue-pro',
    },
  },
  {
    path: 'layout',
    name: 'Layout',
    id: 'Layout',
    label: '布局',
    component: () => import('@src/views/vue-pro/layout.md'),
    meta: {
      requiresAuth: true,
      order: 8,
      type: 'vue-pro',
    },
  },
  {
    path: 'status',
    name: 'Status',
    id: 'Status',
    label: '状态管理',
    component: () => import('@src/views/vue-pro/status.md'),
    meta: {
      requiresAuth: true,
      order: 9,
      type: 'vue-pro',
    },
  },
  {
    path: 'permissions',
    name: 'Permissions',
    id: 'Permissions',
    label: '权限控制',
    component: () => import('@src/views/vue-pro/role.md'),
    meta: {
      requiresAuth: true,
      order: 10,
      type: 'vue-pro',
    },
  },
  {
    path: 'advanced',
    name: 'Advanced',
    id: 'Advanced',
    label: '高级',
    meta: {
      requiresAuth: true,
      order: 11,
      type: 'vue-pro',
    },
    children: [
      {
        path: 'quick',
        name: 'Quick',
        id: 'Quick',
        label: '快速开始',
        component: () => import('@src/views/vue-pro/quick.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'plugin',
        name: 'Plugin',
        id: 'Plugin',
        label: '云服务插件',
        component: () => import('@src/views/vue-pro/plugin.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'library',
        name: 'Library',
        id: 'Library',
        label: '云服务客户端库',
        component: () => import('@src/views/vue-pro/library.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'practiced',
        name: 'Practiced',
        id: 'Practiced',
        label: '云服务最佳实践',
        component: () => import('@src/views/vue-pro/practiced.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'BackEnd',
        name: 'BackEnd',
        id: 'BackEnd',
        label: '后台管理',
        component: () => import('@src/views/vue-pro/backEnd.md'),
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
    component: () => import('@src/views/vue-pro/start-us.md'),
    meta: {},
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Directory Structure',
    component: () => import('@src/views/vue-pro/directory-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Routes and Menus',
    component: () => import('@src/views/vue-pro/menus-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Add Page',
    component: () => import('@src/views/vue-pro/newpage-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Mock Data',
    component: () => import('@src/views/vue-pro/mock-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Internationalization',
    component: () => import('@src/views/vue-pro/internation-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Personalized Themes',
    component: () => import('@src/views/vue-pro/theme-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Layout',
    component: () => import('@src/views/vue-pro/layout-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Status Management',
    component: () => import('@src/views/vue-pro/status-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Permission Control',
    component: () => import('@src/views/vue-pro/role.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Advanced',
    children: [
      {
        path: 'quick',
        name: 'Quick',
        id: 'Quick',
        label: 'Quick Start',
        component: () => import('@src/views/vue-pro/quick-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'plugin',
        name: 'Plugin',
        id: 'Plugin',
        label: 'Cloud Service Plug-ins',
        component: () => import('@src/views/vue-pro/plugin-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'library',
        name: 'Library',
        id: 'Library',
        label: 'Cloud Service client Library',
        component: () => import('@src/views/vue-pro/library-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'practiced',
        name: 'Practiced',
        id: 'Practiced',
        label: 'Cloud Service Best Practices',
        component: () => import('@src/views/vue-pro/practiced-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'BackEnd',
        name: 'BackEnd',
        id: 'BackEnd',
        label: 'Background Management',
        component: () => import('@src/views/vue-pro/backEnd-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];
const appVueRoutes: RouteRecordRaw[] = [];

if (localStorage.getItem('_lang') === 'enUS') {
  routerListUs.forEach((item, index) => {
    item.path = `/vue-pro/docs/${routerList[index].path}`;
    item.name = `vue-${routerList[index].name}`;
    item.id = `vue-${routerList[index].id}`;
    item.meta = routerList[index].meta;
  });

  appVueRoutes.push(...routerListUs);
} else {
  routerList.forEach((item) => {
    item.path = `/vue-pro/docs/${item.path}`;
    item.name = `vue-${item.name}`;
    item.id = `vue-${item.id}`;
  });
  appVueRoutes.push(...routerList);
}

export default appVueRoutes;
