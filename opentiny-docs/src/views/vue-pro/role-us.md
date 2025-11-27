<h1 id='role'>Permission Management</h1>

---

The `TinyPro of Vue` implements role permission management by creating the `switchRoles` method in the `src/store/moudles/user` file and routing.

<h2 id='achieve'>How to use the project</h2>


<h3 id='roles'>Setting Role Display Labels in Routes [roles]</h3>

```ts
export default {
  path: 'exception',
  name: 'Exception',
  id: 'Exception',
  label: 'Exception',
  component: () => import('@/views/exception/index.vue'),
  meta: {
    locale: 'menu.exception',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
    order: 6,
  },
  children: [
    {
      path: '403',
      name: '403',
      id: '403',
      label: '403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        locale: 'menu.exception.403',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: '404',
      name: '404',
      id: '404',
      label: '404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        locale: 'menu.exception.404',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: '500',
      name: '500',
      id: '500',
      label: '500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        locale: 'menu.exception.500',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

```

<h3 id='write'>Write the `switchRoles` method in the store</h3>

```ts
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
```

<h3 id='store'>Invoke the method on the page to manage routing rights</h3>

```ts
  const switchRoles = async () => {
    const res = await userStore.switchRoles();
    Modal.message({
      message: res as string,
      status: 'success',
    });
  };
```


