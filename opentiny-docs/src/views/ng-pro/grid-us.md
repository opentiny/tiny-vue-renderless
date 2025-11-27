<h1 id='grid'>Responsive & Grid</h1>

----

Grid layout must be well known. When we develop pages, we often have high requirements on page layout. How to type and align the content of each area is a major problem for us. The grid system is our typesetting tool, and the simple and easy-to-use features make grid layout a necessary function for all mainstream frameworks.

<h2 id='module'>Import and Export Module</h2>

```typescript
import { TProBaseGridModule } from 'src/app/@shared/modules/grid'; // Referenced and exported in shared.module.ts
```

<h2 id='importStyle'>Introducing Styles</h2>

In the `angular.json` file, import the grid style file.

```json
{
  "build": {
    "styles": [
      ...,
      "src/app/@shared/modules/grid/style/grid.scss", // Imported in the angular.json file
      ...
    ]
  }
}
```

<h2 id='griddemo'>Use in the page</h2>

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

<h2 id='layoutLabel'>Layout Label</h2>

<h3 id='baserow'>t-pro-base-row</h3>

- A row element in a vertical layout that groups columns and combines a group of columns into a row.

<h3 id='basecol'>t-pro-base-col</h3>

- Column elements in the horizontal layout, the elements that really display the content, our content is written in the column.

<h2 id='layoutPursue'>Layout implementation</h2>

<h3 id='layoutGrid'>Grid</h3>

- Compared with the 12-grid system, the 24-grid system is more flexible and suitable for scenarios with various and complex contents. In this example, the 24-column grid system is also used.

- 示例：

```html
<!-- 将24格划分为各占12格的两个空间 -->
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="12"></t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="12"></t-pro-base-col>
</t-pro-base-row>
```

<h3 id='responsive'>Responsive</h3>

- Based on the screen resolution, we divide the following separation points：`ms: 360px, mm: 768px, ml: 1024px, xs: 1280px, sm: 1440px, md: 1600px, lg: 1760px, xl: 1920px`。

- Example：

```html
<!-- 0 <= resolution < 768px，occupying 12 columns， 768px>= resolution < 1280px，occupying 8 columns， resolution>= 1280，occupying 6 columns. -->
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 12, mm: 8, xs: 6 }">col-12, col-mm-8, col-xs-6</t-pro-base-col>
</t-pro-base-row>
```

`TProBaseScreenMediaQueryService`the file can be used to listen for changes in separator points during responsive layouts.

<h3 id='elasticity'>Elastic Box</h3>

- `css flex` is an important layout mode in CSS. It is implemented based on the `css flex` elastic layout box model and supports responsiveness.

- Example：

```html
<t-pro-base-row [tProBaseAlign]="'end'" class="base-container">
  <t-pro-base-col [tProBaseSpan]="6">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="6" class="full-height">col-6</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="2">col-2</t-pro-base-col>
  <t-pro-base-col [tProBaseFlex]="{ ss: 1, md: '100px' }">flex-1</t-pro-base-col>
</t-pro-base-row>
```

<h3 id='space'>Spacing Space</h3>

- You can set `margin-bottom` or `margin-right` to adjust the spacing between subelements. Responsiveness is also supported.

- Example：

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

<h3 id='gutter'>Spacing Gutter</h3>

- You can set the left and right `padding` and the up and down `padding` between child elements by setting the `tProBaseGutter` parameter.

- Example：

```html
<!-- The padding of the internal t-pro-base-col element is 12 / 2 = 6px，If set[tProBaseGutter] = "12"，The left and right padding is 6px. -->
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

<h3 id='offset'>offsets Offset</h3>

- `tProBaseOffset` can be used to set the number of grids required for the spacing before the element is located. It also supports responsiveness.

- Example：

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="{ ss: 8, md: 10 }">col</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="{ ss: 8, md: 10 }" 
  [tProBaseOffset]="{ ss: 8, md: 4 }">col</t-pro-base-col>
</t-pro-base-row>
```

<h3 id='class'>Class Name Class</h3>

- `class` supports responsive rendering.

- `tProBaseClass` is a general-purpose instruction that you can use on any label except for the `Row` and `Col` labels.

- Example：

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8" [tProBaseClass]="{ ss: ['col-green-color'], 
  md: ['font-size-price'] }">col-8
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
</t-pro-base-row>
```

<h3 id='style'>Styles Style</h3>

- `styles` supports responsive rendering.

- `tProBaseStyle` is a general-purpose instruction that you can use on any label except for the `Row` and `Col` labels.

- Example：

```html
<t-pro-base-row>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8" [tProBaseStyle]="{ ss: { 'font-size': '12px' }, 
  md: { 'font-size': '20px' } }">col-8
  </t-pro-base-col>
  <t-pro-base-col [tProBaseSpan]="8">col-8</t-pro-base-col>
</t-pro-base-row>
```
