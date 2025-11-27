<h1 id='layout'>布局</h1> 

---

`TinyPro of Ng`为页面开发提供了布局组件，并在页面集成常见的布局模式，可快速调整页面的布局方式。

<h2 id='components'>布局组件</h2>

```html
<t-pro-layout>
  <t-pro-layout-header>
    <!-- 头部区域 -->
  </t-pro-layout-header>
  <t-pro-layout-sidebar>
    <!-- 侧边栏区域 -->
  </t-pro-layout-sidebar>
  <div>
    <!-- 内容区域 -->
  </div>
  <t-pro-layout-footer>
    <!-- 页脚区域 -->
  </t-pro-layout-footer>
</t-pro-layout>
```

<h2 id='adjust'>布局调整</h2>

- 修改`src/app/@shared/components/layouts/default-layout.config.ts`默认配置文件，可修改页面的布局。

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

- 此外我们还提供了界面来展示多种布局的切换，通过选择不同的布局方式，你可以在线查看当前页面布局的切换效果。

![layout.jpg](/src/assets/images/ng-pro/layout.png)

<h2 id='responsive'>响应式布局</h2>

`TinyPro of Ng` 提供了基于栅格的响应式布局解决方案，具体使用方法可参考[`响应式 & 栅格`](/ng-pro/docs/grid)。
