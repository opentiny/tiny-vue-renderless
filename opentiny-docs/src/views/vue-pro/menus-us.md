<h1 id='menu'>Routes and Menus</h1>


---
When the user uses the application，Vue's routers allow users to navigate from one view to another.

<h2 id='function'>Core modules and functions</h2>

- #### navigating

  Configure in `src/router/routes/modules` according to your route.

- #### Route management

  - **1.Primary route**  
    Configured in `src/router/index`.

  - **2.Page routing**  
    Configured in `src/router/routes/modules`.


- #### breadcrumbs

  For details, see `src/compoments/breadcrumb`.

<h2 id='导航'>navigating</h2>

Contents related to navigation can be modified in `src/router/routes/modules`.
The `menu` data format is as follows：

```ts
export default {
  path: 'form',
  name: 'Form',
  id: 'Form',
  label: 'Form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'base',
      name: 'Base',
      id: 'Base',
      label: 'Base',
      component: () => import('@/views/form/base/index.vue'),
      meta: {
        locale: 'menu.form.base',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'step',
      name: 'Step',
      id: 'Step',
      label: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

```

`Note: Add the corresponding modification to the internationalization file.`

<h2 id='icon'>Use in navigation<code>TinyVue</code>icon</h2>

> Transfer the icon name of the `TinyVue`Icon component for the configuration item `menuIcon` in `menu.ts`.

<h2 id='router'>Routing</h2>

Routes in the project are classified into primary routes and page routes. The detailed configuration is as follows:  
The configuration file of the primary route is stored in `src/router/index`.

```ts
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: import.meta.env.VITE_CONTEXT + 'login',
    },
    {
      path: '/' + import.meta.env.VITE_CONTEXT,
      redirect: import.meta.env.VITE_CONTEXT + 'board/work',
    },
    {
      path: import.meta.env.VITE_CONTEXT + 'login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      name: 'root',
      path: import.meta.env.VITE_CONTEXT,
      component: DefaultLayout,
      children: appRoutes,
    },
    {
      path: import.meta.env.VITE_CONTEXT + ':pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
});

export default router;

```

The format of the `src/router/routes/modules` configuration file for page routing is as follows:

```ts
export default {
  path: 'form',
  name: 'Form',
  id: 'Form',
  label: 'Form',
  component: () => import('@/views/form/index.vue'),
  meta: {
    locale: 'menu.form',
    icon: 'icon-settings',
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: 'base',
      name: 'Base',
      id: 'Base',
      label: 'Base',
      component: () => import('@/views/form/base/index.vue'),
      meta: {
        locale: 'menu.form.base',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'step',
      name: 'Step',
      id: 'Step',
      label: 'Step',
      component: () => import('@/views/form/step/index.vue'),
      meta: {
        locale: 'menu.form.step',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
```


<h2 id='breadcrumb'>breadcrumbs</h2>

The breadcrumb component `tiny-breadcrumb` is used. Except the last level, the other levels of the breadcrumb component are jumpable links. The link address can be set through the href attribute. You can also add events to implement service logic, as shown in the following figure:

```html
  <tiny-breadcrumb class="container-breadcrumb">
    <tiny-breadcrumb-item v-for="item in items" :key="item">
      {{ $t(item) }}
    </tiny-breadcrumb-item>
  </tiny-breadcrumb>
```

Corresponding ts file：

```ts
  import { PropType } from 'vue';
  import {
    Breadcrumb as TinyBreadcrumb,
    BreadcrumbItem as TinyBreadcrumbItem,
  } from '@opentiny/vue';

  defineProps({
    items: {
      type: Array as PropType<string[]>,
      default() {
        return [];
      },
    },
  });
```
