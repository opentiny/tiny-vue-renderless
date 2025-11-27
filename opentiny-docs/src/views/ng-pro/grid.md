<h1 id='grid'>响应式 & 栅格</h1>

----

栅格布局想必大家都很了解，我们做页面开发的时候，往往对页面版式的要求很高，如何对各个区域的内容排版，并使之对齐是我们的一大难题。而栅格系统就是我们排版的利器，简单好用的特性使得栅格布局成为所有主流框架的必备的功能。

<h2 id='module'>引入和导出 Module</h2>

```typescript
import { TProBaseGridModule } from 'src/app/@shared/modules/grid'; // 已在 shared.module.ts 中统一引用与导出
```

<h2 id='importStyle'>引入样式</h2>

在`angular.json`文件中, 引入栅格样式文件。

```json
{
  "build": {
    "styles": [
      ...,
      "src/app/@shared/modules/grid/style/grid.scss", // 已在 angular.json 中引入
      ...
    ]
  }
}
```

<h2 id='griddemo'>在页面中使用</h2>

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="24">col</t-pro-base-col>
</t-pro-base-row>

<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="12">col-12</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="12">col-12</t-pro-base-col>
</t-pro-base-row>

<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
</t-pro-base-row>

<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="6">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="6">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="6">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="6">col-6</t-pro-base-col>
</t-pro-base-row>
```

<h2 id='layoutLabel'>布局标签</h2>

<h3 id='baserow'>t-pro-base-row</h3>

- 纵向布局中行元素，可对列进行分组，并把一组列合并为一个行。

<h3 id='basecol'>t-pro-base-col</h3>

- 横向布局中列元素，真正显示内容的元素，我们的内容就写在列里面。

<h2 id='layoutPursue'>布局实现</h2>

<h3 id='layoutGrid'>栅格</h3>

- 相对 12 栅格系统，24 栅格系统变化更加灵活，更适合内容比较多样复杂的场景，此处我们也采用 24 列栅格系统。

- 示例：

```html
<!-- 将24格划分为各占12格的两个空间 -->
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="12"></t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="12"></t-pro-base-col>
</t-pro-base-row>
```

<h3 id='responsive'>响应式</h3>

- 基于屏幕分辨率的大小，我们划分如下几个分隔点：`ms: 360px, mm: 768px, ml: 1024px, xs: 1280px, sm: 1440px, md: 1600px, lg: 1760px, xl: 1920px`。

- 示例：

```html
<!-- 0 <= 分辨率 < 768px，占 12 列， 768px>= 分辨率 < 1280px，占 8 列， 分辨率>= 1280，占 6 列。 -->
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
</t-pro-base-row>
```

`TProBaseScreenMediaQueryService`文件可用来监听响应式布局时分隔点是否发生变化。

<h3 id='elasticity'>弹性盒</h3>

- `css flex`为 css 中的重要布局方式，此处基于`css flex`弹性布局盒状模型实现，同时也支持响应式。

- 示例：

```html
<t-pro-base-row [tProBaseAlign]="'end'" class="base-container">
  <t-pro-base-col [tProBaseSpan]="6">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="6" class="full-height">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="2">col-2</t-pro-base-col>
  <t-pro-base-col [tProBaseFlex]="{ ss: 1, md: '100px' }">flex-1</t-pro-base-col>
</t-pro-base-row>
```

<h3 id='space'>间距 Space</h3>

- 可通过设置`margin-bottom`或者`margin-right`来调节各个子元素之间的间距，同时也支持响应式。

- 示例：

```html
<t-pro-base-row [tProBaseSpace]="[12, 12]">
  <t-pro-base-col [tProBaseSpan]="11">
    <div class="content-box">col-11</div>
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="11">
    <div class="content-box">col-11</div>
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="11">
    <div class="content-box">col-11</div>
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="11">
    <div class="content-box">col-11</div>
  </t-pro-base-col>
</t-pro-base-row>
```

<h3 id='gutter'>间距 Gutter</h3>

- 可通过设置`tProBaseGutter`参数来设置子元素之间的左右`padding`以及上下`padding`。

- 示例：

```html
<!-- 内部 t-pro-base-col 元素上下左右 padding 均为12 / 2 = 6px，若设置[tProBaseGutter] = "12"，则左右
 padding 为6px. -->
<t-pro-base-row [tProBaseGutter]="[12, 12]">
  <t-pro-base-col [tProBaseSpan]="12">
    <div class="content-box">col-12</div>
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="12">
    <div class="content-box">col-12</div>
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="12">
    <div class="content-box">col-12</div>
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="12">
    <div class="content-box">col-12</div>
  </t-pro-base-col>
</t-pro-base-row>
```

<h3 id='offset'>偏移 Offset</h3>

- `tProBaseOffset`可用来设置元素所在位置前所需间距需要占栅格的数量, 同时也支持响应式。

- 示例：

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="{ ss: 8, md: 10 }">col</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 8, md: 10 }" 
  [tProBaseOffset]="{ ss: 8, md: 4 }">col</t-pro-base-col>
</t-pro-base-row>
```

<h3 id='class'>类名 Class</h3>

- `class`支持响应式渲染。

- `tProBaseClass`是通用型指令，除了`Row`和`Col`标签外，你可以在任何标签上使用。

- 示例：

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8" [tProBaseClass]="{ ss: ['col-green-color'], 
  md: ['font-size-price'] }">col-8
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
</t-pro-base-row>
```

<h3 id='style'>样式 Style</h3>

- `styles`支持响应式渲染。

- `tProBaseStyle`是通用型指令，除了`Row`和`Col`标签外，你可以在任何标签上使用。

- 示例：

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8" [tProBaseStyle]="{ ss: { 'font-size': '12px' }, 
  md: { 'font-size': '20px' } }">col-8
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
</t-pro-base-row>
```
