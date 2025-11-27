<h1 id='page'>Add page</h1>

---

If you want to access a new page through the navigation bar, you can use this method. The process of creating a page is to create a page in the `src/view` directory,
then, create the corresponding component in the module. If you need to create a common component in the component, create it in `src/components`.  The following describes how to create **result page** as an example.


<h2 id='modal'>Creating a module</h2>

Create a page in `src/view`：

 ![result.png](/src/assets/images/vue-pro/routercode.png)


<h2 id='request'>Add route access</h2>

After the preceding steps are complete, you need to add the corresponding route access for the new page in the navigation bar.

Add route information to `src/router/moudles`.

```ts
export default {
  path: 'result',
  name: 'Result',
  id: 'Result',
  label: 'Result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    locale: 'menu.result',
    icon: 'icon-check-circle',
    requiresAuth: true,
    order: 5,
  },
  children: [
    {
      path: 'success',
      name: 'Success',
      id: 'Success',
      label: 'Success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: 'menu.result.success',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'error',
      name: 'Error',
      id: 'Error',
      label: 'Error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: 'menu.result.error',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
```

<h2 id='visible'>New page display</h2>

 ![page.png](/src/assets/images/vue-pro/result.png)


