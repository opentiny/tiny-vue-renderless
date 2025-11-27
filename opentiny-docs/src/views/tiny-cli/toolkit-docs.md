<h1 id='dev'>Docs套件</h1>

---
> 快速生成组件库官网的工具，支持`ng`和`vue`两种技术栈组件


<h2 id='view'>使用场景</h2>

用于开发组件库官网

<h2 id='use'>用法</h2>

<h3 id='init'>初始化</h3>

```bash
tiny init docs 
```

<h3 id='tech'>选择技术栈</h3>

支持`ng`和`vue`两种技术栈组件，其中`ng`采用的`web component`原理渲染组件示例

```bash
? 请选择使用的技术栈 (Use arrow keys)
> vue
  angular
```

<h3 id='integration'>选择组件示例集成方式</h3>

组件示例既可以放在项目本地，也可以是一个`npm`包

```bash
? 请选择组件示例集成方式 (Use arrow keys)
> 本地路径
  npm
```

<h3 id='localPath'>输入组件示例存放路径</h3>

如果组件示例放在项目本地，输入目录名

```bash
? 请输入组件示例存放路径 (demos)
```

<h3 id='npmPath'>输入组件示例包名</h3>

如果组件示例是个`npm`包，输入包名

```bash
? 请输入组件示例包名 (@opentiny/tinydoc-ng-tiny)
```

<h3 id='dependencie'>输入组件示例依赖包名</h3>

如果示例有依赖，请输入依赖包包名，如果无依赖，直接按回车键

```bash
? 请输入组件示例依赖包名，非必填
```

<h3 id='base'>输入应用访问路径</h3>

应用访问路径，出现在浏览器地址栏

```bash
? 请输入应用访问路径 (tiny-ng)
```

<h3 id='start'>应用启动</h3>

```bash
tiny start
```

<h3 id='build'>应用构建</h3>

```bash
tiny build
```

<h2 id='rules'>组件示例规范</h2>

组件示例不管是放在项目本地还是`npm`包，都要满足示例规范，规范包含目录结构和内容。

<h3 id='folder'>目录规范</h3>

```bash
|-- 目录名
    |-- app (包含静态资源，国际化等文件)
    |   |-- button（按钮组件）
    |   |   |-- webdoc
    |   |   |   |-- button.cn.md（button组件中文描述markdown）
    |   |   |   |-- button.en.md（button组件英文描述markdown）
    |   |   |   |-- button.js（button组件全部示例和api描述文件）
    |   |   |   |-- button-standard.zh-CN.md（button组件规范中文描述markdown，非必须文件）
    |   |   |   |-- button-standard.en-US.md（button组件规范英文描述markdown，非必须文件）
    |   |   |   |-- button-basic.zh-CN.md（button-basic示例中文描述markdown，当示例描述的内容可能包含表格等复杂格式时，建议使用示例md文件；如果为简单描述，请参考button.js的desc字段）
    |   |   |   |-- button-basic.en-US.md（button-basic示例英文描述markdown，当示例描述的内容可能包含表格等复杂格式时，建议使用示例md文件；如果为简单描述，请参考button.js的desc字段）
    |   |   |-- button-basic 示例源码
    |   |   |-- 示例2源码
    |   |   |-- 示例3源码
    |   |-- xxx组件
    |-- overviewimage  (组件缩略图)
    |   |-- button.svg (按钮组件缩略图)
    |   |-- xxx.svg (xxx组件缩略图)
    |-- webdoc
    |   |-- xxx.md (组件库文档markdown)
    |   |-- menu.js (组件库官网菜单)
    |-- scripts（只有ng技术栈有这个目录）
    |   |-- web-components.js (组件库示例打包好的web component)
    |   |-- assets (组件库依赖静态资源)
    |-- config.js（是否移动端）
```

<h3 id='folder'>内容规范</h3>

内容规范按技术栈分两部分，`ng`技术栈[请参考](/public/assets/sample-code/tiny-toolkit-docs-ng-demos.zip)，`vue`技术栈[请参考](/public/assets/sample-code/tiny-toolkit-docs-vue-demos.zip)，下载后请解压到命令执行目录。

组件文档支持平铺模式及Tab模式，如需展示该组件的规范示例，可在组件规范文件中添加`standard`字段，文档将优先展示规范页描述文件，当未找到对应文件时，将展示规范页链接。

例如 `button.js` :
```bash
export default {
    title: "Button 按钮组件",
    standard: {
        "zh-CN": {
            file: "button-standard.zh-CN.md",
            link: "https://opentiny.design",
        },
        "en-US": {
            file: "button-standard.en-US.md",
            link: "https://opentiny.design",
        },
    },
    ...
}
```

示例描述支持简单描述及复杂描述，当示例描述包含表格等复杂形式时，建议使用描述文件，优先展示描述文件。

例如 `button.js` :
```bash
export default {
  title: "Button 按钮组件",
  demos: [
    {
      demoId: "button-color",
      name: {
        "zh-CN": "按钮颜色",
        "en-US": "button color",
      },
      desc: {
        "zh-CN": "<p>通过属性<code>color</code>配置按钮颜色，包含<code>default</code>、<code>danger</code>、<code>primary</code>三种类型。",
        "en-US": "<p>button color</p>",
      },
      descFiles: {
        "en-US": "button-color.en-US.md",
        "zh-CN": "button-color.zh-CN.md",
      },
      ...
    },
  ]
}
```
