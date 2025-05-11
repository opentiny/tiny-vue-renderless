# 快速上手

`OpenTiny Icons`图标库是`CSS`图标方案，所以支持所有前端框架，也支持`UnoCSS`的图标插件使用场景。

## 安装图标库

本节中，我们将介绍如何安装图标库依赖以及图标库的内容。

```sh
$ npm install @opentiny/icons
```

安装后，在`node_modules/@opentiny/icons` 目录中存放着如下的图标库产物。
其中 `json` 目录中存放了符合[`IconifyJson`](https://iconify.design/docs/types/iconify-json.html)数据格式的产物，它兼容整个[Iconify](https://iconify.design/)生态。
`style` 目录存放了构建后的样式文件, `svg` 目录存放了原始的设计文件。

```
./
|─json
|  └─ icons.json
|─style
|  |─ all.css
|  |─ base.css
|  |─ svc.css
|  |─ ext.css
|  └─ stat.css
|-svgs
|  └─ *.svg
|-README.md

```

## 整体引入 css 使用

在项目工程中，直接引入`@opentiny/icons`图标的 css 文件, 也可以根据使用情况，按`图标类别`导入图标，以减小引入样式文件的体积。

```css
import "@opentiny/icons/style/all.css"
```

图标类别：

- 全量图标: all.css
- 基础图标: base.css
- 服务图标: svc.css
- 服务扩展图标: ext.css
- 状态图标: stat.css

:::warning 提示

引入`CSS`的时候，所有图标类名的前缀统一为 `ci-类别-*`, 其中`base类别`的图标最为常用，所以省略了类别，其它类别的图标必须带着类别。
比如：

- ci-home <i class="ci-home" style="font-size:24px;"></i> 是 `base` 类别的图标,统一省略`-base`类别。
- ci-svc-esc <i class="ci-svc-ecs" style="font-size:24px;"></i> 是服务图标， `svc`的类别不能省略。
- ci-ext-ideahub <i class="ci-ext-ideahub" style="font-size:24px;"></i> 是扩展服务图标，`ext`的类别不能省略。
- ci-stat-no-data <i class="ci-stat-no-data" style="font-size:24px;"></i> 是状态图标，`stat`的类别不能省略。
  :::

## 按需引用 (推荐)

`UnoCSS`是目前最好的原子化CSS引擎，它提供有 `@unocss/preset-icons` 图标插件，可以实现按需引用图标，减小构建产物大小。该图标插件完美支持 `Iconify`的生态的图标，所以也支持我们 `IconifyJson` 格式的导出。以 `vite` 工程为例，可以如下配置：

```javascript{16}
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  plugins: [
    UnoCSS({
      presets: [
        presetIcons({
          prefix: '',
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle'
          },
          collections: {
            ci: () => import('@opentiny/icons/json/icons.json', { assert: { type: 'json' }}).then((i) => i.default)
          }
        })
      ]
    })
  ]
})
```

上面高亮行，引入了图标集，您可以在这里自定义图标引用前缀，比如将`ci`换成你喜欢的其它前缀。
配置后在`main.ts` 中添加下面代码，以启用`UnoCSS`的功能 ：

```javascript
import "virtual:uno.css";
```

经过以上配置，就可以正常使用所有的图标了。

:::warning 如何自定义一个图标

当需要使用设计师提供的`SVG图标`时， `@unocss/preset-icons` 插件允许我们快速的自定义图标,比如在上面配置的`collections` 节点中增加如下配置，就可以通过`<i class="custom-circle"></i>`来显示一个图标了。
参考[UnoCSS 文档](https://unocss.dev/presets/icons#customization) 。

```javascript{3-6}
  collections: {
    ci: () => import('@opentiny/icons/json/icons.json', { assert: { type: 'json' }}).then((i) => i.default),
    custom: {
      circle: '<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="50"></circle></svg>',
      /* ...其它自定义图标... */
    },
  }
```

:::

## 自定义颜色和大小

图标库可以通过`CSS`去完全控制样式，其中`单色图标`支持通过字体大小和颜色去自定义样式，而`彩色图标`仅支持自定义大小。

```html
<i class="ci-home" style="font-size:14px; color:#000;"></i>
<i class="ci-email" style="font-size:16px; color:#d32222;"></i>
<i class="ci-news" style="font-size:18x; color:#4822d3;"></i>
<i class="ci-date" style="font-size:20px; color:#40d322;"></i>
<hr />
<i class="ci-svc-ecs" style="font-size:72px;"></i>
<i class="ci-svc-obs" style="font-size:72px;"></i>
<i class="ci-svc-cbr" style="font-size:72px;"></i>
<i class="ci-svc-live" style="font-size:72px;"></i>
<hr />
```

<div style="display:flex; align-items: center; gap: 24px;">
  <i class="ci-home" style="font-size:14px; color:#000;"></i>   
  <i class="ci-email" style="font-size:20px; color:#d32222;"></i>   
  <i class="ci-news" style="font-size:24px; color:#4822d3;"></i>   
  <i class="ci-date" style="font-size:32px; color:#40d322;"></i>  
</div>
<hr />
<div style="display:flex; align-items: center; gap: 24px;">
  <i class="ci-svc-ecs" style="font-size:72px;"></i>
  <i class="ci-svc-obs" style="font-size:72px;"></i>
  <i class="ci-svc-cbr" style="font-size:72px;"></i>
  <i class="ci-svc-live" style="font-size:72px;"></i>
</div>
<hr />
 
 ## 动画

`OpenTiny Icons`图标库是`CSS`图标方案，所以支持所有的`CSS`动画。图标库中没有任何内置动画工具类，但您可以使用一些成熟的动画库，也可以编写一些常用的动画工具类，比如持续旋转动画：

```css
.icon-rotating {
  animation: rotating 2s linear infinite;
}
@keyframes rotating {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
```

将动画工具类名`icon-rotating` 添加到图标上即可。

```html
<i class="ci-setting icon-rotating" style="font-size:24px; color:#000;"></i>
<i class="ci-retry icon-rotating" style="font-size:24px; color:#000;"></i>
<i class="ci-refresh icon-rotating" style="font-size:24px; color:#000;"></i>
<i class="ci-loading icon-rotating" style="font-size:24px; color:#000;"></i>
```

<div style="display:flex; align-items: center; gap: 24px;">
   <i class="ci-setting icon-rotating" style="font-size:24px; color:#000;"></i>
   <i class="ci-retry icon-rotating" style="font-size:24px; color:#000;"></i>
   <i class="ci-refresh icon-rotating" style="font-size:24px; color:#000;"></i>
   <i class="ci-loading icon-rotating" style="font-size:24px; color:#000;"></i>
</div>
<hr/>
