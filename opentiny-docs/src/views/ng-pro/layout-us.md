<h1 id='layout'>Layout</h1> 

---

`TinyPro of Ng` provides layout components for page development and integrates common layout modes on pages to quickly adjust page layouts.

<h2 id='components'>Layout Components</h2>

```html
<t-pro-layout>
  <t-pro-layout-header>
    <!-- Head area -->
  </t-pro-layout-header>
  <t-pro-layout-sidebar>
    <!-- Sidebar Area -->
  </t-pro-layout-sidebar>
  <div>
    <!-- Content area -->
  </div>
  <t-pro-layout-footer>
    <!-- Footer area -->
  </t-pro-layout-footer>
</t-pro-layout>
```

<h2 id='adjust'>Layout adjustment</h2>

- Modify the default configuration file of the `src/app/@shared/components/layouts/default-layout.config.ts` to modify the page layout.

```ts
export const DEFAULT_LAYOUT_CONFIG: TProLayoutConfig = {
  id: 'leftRight',
  mode: 'sidebarTop',
  header: {
    ...
  },
  sidebar: {
    ...
  },
  footer: {
    ...
  },
  hideLogo: false,
};
```

- In addition, we provide an interface to display the switching of multiple layouts. By selecting different layouts, you can view the switching effect of the current page layout online.

![layout.jpg](/src/assets/images/ng-pro/layout.png)

<h2 id='responsive'>Responsive layout</h2>

`TinyPro of Ng` provides a grid-based responsive layout solution. For details, see [`Responsive & Grid`] (/ng-pro/docs/grid).
