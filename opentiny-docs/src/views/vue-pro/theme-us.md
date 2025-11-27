<h1 id='theme'>Personalized themes</h1> 

---

Based on the visual design concept of `Open Tiny`, the `TinyPro of Vue` site has added six sets of common themes. (`Default Theme, Molasses Theme, Violet Theme, Deep Night Sky Theme, Dark Theme, Custom Theme`) For your reference, the default theme is the default theme style of HUAWEI CLOUD.


<h2 id='set'>Online theme settings</h2>

At the `TinyPro of Vue` site, we have integrated the theme switching function, you can switch the current site to our built-in theme style, and preview in real time.

![theme.png](/src/assets/images/vue-pro/theme.png)

In the `src/components/theme` component, the theme switch function is implemented.
```html
    <div class="theme-choose">
      <div>
        <span>Light</span>
        <span>Dark</span>
      </div>
      <div>
        <div v-for="(index, item) in SwitchColor" :key="index">
          <div
            class="theme-block"
            :style="{ 'background-color': item.color }"
            @click="choose(item)"
          >
            <iconYes v-if="item.value === index" class="theme-yes"></iconYes>
          </div>
        </div>
      </div>
```

```typescript
  const choose = (item: {
    value?: number;
    color?: string;
    dark: any;
    theme: any;
  }) => {
    index.value = item.value;
    theme.changeTheme(item.theme);
    dark.value = item.dark as string;
  };
```


<h2 id='self'>Customizing extended themes</h2>

Add the user-defined theme type and related configuration of the user-defined theme. For details, see the configuration in src/components/theme/type.

```typescript
const Theme13 = {
  id: 'tiny-theme-13',
  name: 'Theme13',
  data: {
    'ti-base-color-brand-1': '#f36b7f;',
    'ti-base-color-brand-2': '#f36b7f;',
    'ti-base-color-brand-3': '#f36b7f;',
    'ti-base-color-brand-4': '#f36b7f;',
    'ti-base-color-brand-5': '#f36b7f;',
    'ti-base-color-brand-6': '#f36b7f;',
    'ti-base-color-brand-7': '#f36b7f;',
    'ti-base-color-brand-8': '#f36b7f;',
  },
};
```


