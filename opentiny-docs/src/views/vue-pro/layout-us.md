<h1 id='layout'>Layout</h1> 

---
`TinyPro of Vue` provides layout components for page development and integrates common layout modes on pages to quickly adjust page layouts.


<h2 id='components'>Layout components</h2>

```html
<tiny-container>
  <template #header>
    <tiny-layout>
      <!-- head area -->
    </tiny-layout>
  </template>
  <template #aside>
    <tiny-layout class="layout-sider">
      <!-- sidebar area -->
    </tiny-layout>
  </template>
  <tiny-layout class="layout-content">
    <!-- content area -->
  </tiny-layout>
  <template #footer>
    <tiny-layout>
      <!-- footer area -->
    </tiny-layout>
  </template>
</tiny-container>
```

<h2 id='adjust'>Layout adjustment</h2>

- Modify the `src/layout/default-layout.config.ts` attribute information file to modify the page layout.

```ts
  // Indicates whether to display the switching frame structure
  const myPattern = ref('legend');
```

- In addition, we provide an interface to display the switching of multiple layouts. By selecting different layouts, you can view the switching effect of the current page layout online.

![layout.png](/src/assets/images/vue-pro/set.png)


