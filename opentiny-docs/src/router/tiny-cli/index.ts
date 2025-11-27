import type { RouteRecordRaw } from 'vue-router';

const routerListCli = [
  {
    path: 'about',
    name: 'about',
    id: 'about',
    label: '关于',
    component: () => import('@src/views/tiny-cli/about.md'),
    meta: {
      requiresAuth: true,
      order: 1,
      type: 'tiny-cli',
    },
  },
  {
    path: 'start',
    name: 'start',
    id: 'start',
    label: '快速上手',
    component: () => import('@src/views/tiny-cli/start.md'),
    meta: {
      requiresAuth: true,
      order: 2,
      type: 'tiny-cli',
    },
  },
  {
    path: 'config',
    name: 'config',
    id: 'config',
    label: '配置',
    component: () => import('@src/views/tiny-cli/config.md'),
    meta: {
      requiresAuth: true,
      order: 3,
      type: 'tiny-cli',
    },
  },
  {
    path: 'guide',
    name: 'guide',
    id: 'guide',
    label: '指南',
    meta: {
      requiresAuth: true,
      order: 4,
      type: 'tiny-cli',
    },
    children: [
      {
        path: 'command',
        name: 'command',
        id: 'command',
        label: '基础命令',
        component: () => import('@src/views/tiny-cli/command.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'install',
        name: 'install',
        id: 'install',
        label: '依赖安装',
        component: () => import('@src/views/tiny-cli/install.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'update',
        name: 'update',
        id: 'update',
        label: '自动安装与升级',
        component: () => import('@src/views/tiny-cli/update.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'task',
        name: 'task',
        id: 'task',
        label: '任务流',
        component: () => import('@src/views/tiny-cli/task.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'use-toolkit',
        name: 'use-toolkit',
        id: 'use-toolkit',
        label: '使用套件',
        component: () => import('@src/views/tiny-cli/use-toolkit.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'use-plugin',
        name: 'use-plugin',
        id: 'use-plugin',
        label: '使用插件',
        component: () => import('@src/views/tiny-cli/use-plugin.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: 'toolkits',
    name: 'toolkits',
    id: 'toolkits',
    label: '套件',
    meta: {
      requiresAuth: true,
      order: 5,
      type: 'tiny-cli',
    },
    children: [
      {
        path: 'lists',
        name: 'lists',
        id: 'lists',
        label: '套件列表',
        component: () => import('@src/views/tiny-cli/toolkit-list.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'dev',
        name: 'dev',
        id: 'dev',
        label: 'Dev套件',
        component: () => import('@src/views/tiny-cli/toolkit-dev.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'pro',
        name: 'pro',
        id: 'pro',
        label: 'Pro套件',
        component: () => import('@src/views/tiny-cli/toolkit-pro.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'docs',
        name: 'docs',
        id: 'docs',
        label: 'Docs套件',
        component: () => import('@src/views/tiny-cli/toolkit-docs.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: 'plugin',
    name: 'plugin',
    id: 'plugin',
    label: '插件',
    meta: {
      requiresAuth: true,
      order: 6,
      type: 'tiny-cli',
    },
    children: [
      {
        path: 'list',
        name: 'list',
        id: 'list',
        label: '插件列表',
        component: () => import('@src/views/tiny-cli/plugin-list.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'link',
        name: 'link',
        id: 'link',
        label: 'Link插件',
        component: () => import('@src/views/tiny-cli/plugin-link.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwc',
        name: 'hwc',
        id: 'hwc',
        label: 'HWC插件',
        component: () => import('@src/views/tiny-cli/plugin-hwc.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'lint',
        name: 'lint',
        id: 'lint',
        label: 'Lint插件',
        component: () => import('@src/views/tiny-cli/plugin-lint.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: 'dev',
    name: 'dev',
    id: 'dev',
    label: '开发者文档',
    meta: {
      requiresAuth: true,
      order: 7,
      type: 'tiny-cli',
    },
    children: [
      {
        path: 'plugin',
        name: 'plugin',
        id: 'plugin',
        label: '插件开发指导',
        component: () => import('@src/views/tiny-cli/dev-plugin.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'toolkit',
        name: 'toolkit',
        id: 'toolkit',
        label: '套件开发指导',
        component: () => import('@src/views/tiny-cli/dev-toolkit.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'api',
        name: 'api',
        id: 'api',
        label: 'API列表',
        component: () => import('@src/views/tiny-cli/dev-api.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: 'contribute',
    name: 'contribute',
    id: 'contribute',
    label: '参与贡献',
    component: () => import('@src/views/tiny-cli/contribute.md'),
    meta: {
      requiresAuth: true,
      order: 8,
      type: 'tiny-cli',
    },
  },
  {
    path: 'related-products',
    name: 'related-products',
    id: 'related-products',
    label: '相关产品',
    component: () => import('@src/views/tiny-cli/related-products.md'),
    meta: {
      requiresAuth: true,
      order: 9,
      type: 'tiny-cli',
    },
  },
  {
    path: 'faq',
    name: 'faq',
    id: 'faq',
    label: 'FAQ',
    component: () => import('@src/views/tiny-cli/faq.md'),
    meta: {
      requiresAuth: true,
      order: 10,
      type: 'tiny-cli',
    },
  },
];
const routerListCliUs = [
  {
    path: '',
    name: '',
    id: '',
    label: 'About',
    component: () => import('@src/views/tiny-cli/about-us.md'),
    meta: {},
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Get Started Quickly',
    component: () => import('@src/views/tiny-cli/start-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Configure',
    component: () => import('@src/views/tiny-cli/config-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Guides',
    children: [
      {
        path: 'command',
        name: 'command',
        id: 'command',
        label: 'Basic Commands',
        component: () => import('@src/views/tiny-cli/command-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'install',
        name: 'install',
        id: 'install',
        label: 'Dependent Installation',
        component: () => import('@src/views/tiny-cli/install-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'update',
        name: 'update',
        id: 'update',
        label: 'Installation And Upgrade',
        component: () => import('@src/views/tiny-cli/update-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'task',
        name: 'task',
        id: 'task',
        label: 'Task Flows',
        component: () => import('@src/views/tiny-cli/task-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'use-toolkit',
        name: 'use-toolkit',
        id: 'use-toolkit',
        label: 'Use Kits',
        component: () => import('@src/views/tiny-cli/use-toolkit-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'use-plugin',
        name: 'use-plugin',
        id: 'use-plugin',
        label: 'Using Plug-ins',
        component: () => import('@src/views/tiny-cli/use-plugin.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Kit',
    children: [
      {
        path: 'lists',
        name: 'lists',
        id: 'lists',
        label: 'Kit List',
        component: () => import('@src/views/tiny-cli/toolkit-list-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'dev',
        name: 'dev',
        id: 'dev',
        label: 'Dev Suite',
        component: () => import('@src/views/tiny-cli/toolkit-dev-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'pro',
        name: 'pro',
        id: 'pro',
        label: 'Pro Kit',
        component: () => import('@src/views/tiny-cli/toolkit-pro-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'docs',
        name: 'docs',
        id: 'docs',
        label: 'Docs Kit',
        component: () => import('@src/views/tiny-cli/toolkit-docs-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Plugin',
    children: [
      {
        path: 'list',
        name: 'list',
        id: 'list',
        label: 'Plugin-List',
        component: () => import('@src/views/tiny-cli/plugin-list-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'link',
        name: 'link',
        id: 'link',
        label: 'Link Plug-in',
        component: () => import('@src/views/tiny-cli/plugin-link-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'hwc',
        name: 'hwc',
        id: 'hwc',
        label: 'HWC Plug-in',
        component: () => import('@src/views/tiny-cli/plugin-hwc-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'lint',
        name: 'lint',
        id: 'lint',
        label: 'Lint Plug-in',
        component: () => import('@src/views/tiny-cli/plugin-lint-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Developer Docs',
    children: [
      {
        path: 'plugin',
        name: 'plugin',
        id: 'plugin',
        label: 'Plug-in Development Guide',
        component: () => import('@src/views/tiny-cli/dev-plugin-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'toolkit',
        name: 'toolkit',
        id: 'toolkit',
        label: 'Suite Development Guide',
        component: () => import('@src/views/tiny-cli/dev-toolkit-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'api',
        name: 'api',
        id: 'api',
        label: 'API List',
        component: () => import('@src/views/tiny-cli/dev-api-us.md'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Involve Literature',
    component: () => import('@src/views/tiny-cli/contribute-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'Related Products',
    component: () => import('@src/views/tiny-cli/related-products-us.md'),
  },
  {
    path: '',
    name: '',
    id: '',
    label: 'FAQ',
    component: () => import('@src/views/tiny-cli/faq-us.md'),
  },
];
const appCliRoutes: RouteRecordRaw[] = [];
if (localStorage.getItem('_lang') === 'enUS') {
  routerListCliUs.forEach((item, index) => {
    item.path = `/tiny-cli/docs/${routerListCli[index].path}`;
    item.name = `cli-${routerListCli[index].name}`;
    item.id = `cli-${routerListCli[index].id}`;
    item.meta = routerListCli[index].meta;
  });
  appCliRoutes.push(...routerListCliUs);
} else {
  routerListCli.forEach((item) => {
    item.path = `/tiny-cli/docs/${item.path}`;
    item.name = `cli-${item.name}`;
    item.id = `cli-${item.id}`;
  });
  appCliRoutes.push(...routerListCli);
}

export default appCliRoutes;
