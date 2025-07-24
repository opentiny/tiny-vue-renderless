# TinyBrowserTabs 浏览器页签组件

TinyBrowserTabs 是一个基于 Vue3 的模拟浏览器页签组件，使用 TinyVue 组件库，遵循 OpenTiny 设计规范，简单易用、功能强大，支持页签新增、删除
、拖拽排序等功能，让您有一个真实浏览器的多标签体验。

[English](README.md) | 简体中文

## 项目优势

TinyBrowserTabs 主要有以下特点和优势：

- 支持多标签页的增删、切换、拖拽排序，交互方式贴近主流浏览器，用户上手无门槛。
- 提供 tab-title、tab-icon、default 等多个插槽，开发者可自定义每个标签的标题、图标、内容区域，满足各种业务需求。
- 通过 tabs 属性传递标签页数据，支持动态增删、切换，便于与后端或业务逻辑集成。
- 提供如 add、close、go-back、go-forward、refresh 等事件，方便父组件监听和处理用户操作。
- 支持嵌入网页/iframe，每个标签页可加载不同的 URL，适合做 WebView、页面预览、低代码平台等场景
- 基于 Vue3 组件化开发，API 简洁，易于在各种 Vue 项目中集成使用

## 快速上手

安装 TinyBrowserTabs

```shell
npm i @opentiny/vue-browser-tabs
```

导入 TinyBrowserTabs ：

```javascript
import '@opentiny/vue-browser-tabs/dist/index.css'
import TinyBrowserTabs from '@opentiny/vue-browser-tabs'
```

在模板中使用：

```html
<script setup>
  import { ref } from 'vue'
  import TinyBrowserTabs from '@opentiny/vue-browser-tabs'

  const tabs = ref([
    { title: '百度', name: 'baidu', url: 'https://www.baidu.com', icon: 'https://www.baidu.com/favicon.ico' },
    { title: '必应', name: 'bing', url: 'https://www.bing.com', icon: 'https://www.bing.com/favicon.ico' }
  ])
  const activeName = ref('baidu')

  const handleClose = (name) => {
    tabs.value = tabs.value.filter((tab) => tab.name !== name)
  }
  const handleAdd = () => {
    const idx = tabs.value.length + 1
    tabs.value.push({
      title: `新标签页${idx}`,
      name: `tab${idx}`,
      url: '',
      icon: ''
    })
  }
</script>

<template>
  <TinyBrowserTabs v-model="activeName" :tabs="tabs" @close="handleClose" @add="handleAdd" />
</template>
```

## 本地开发

```shell
git clone git@github.com:opentiny/mcp.git
cd packages/tiny-browser-tabs
pnpm i
pnpm dev
```

打开浏览器访问：[http://localhost:5173/tiny-browser-tabs/](http://localhost:5173/tiny-browser-tabs/)

## 贡献者 ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="12.5%"><a href="https://kagol.github.io/blogs"><img src="https://avatars.githubusercontent.com/u/9566362?v=4?s=100" width="100px;" alt="Kagol"/><br /><sub><b>Kagol</b></sub></a><br /><a href="https://github.com/opentiny/tiny-browser-tabs/commits?author=kagol" title="Code">💻</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/zzcr"><img src="https://avatars.githubusercontent.com/u/18521562?v=4?s=100" width="100px;" alt="ajaxzheng"/><br /><sub><b>ajaxzheng</b></sub></a><br /><a href="https://github.com/opentiny/tiny-browser-tabs/commits?author=zzcr" title="Code">💻</a></td>
      <td align="center" valign="top" width="12.5%"><a href="https://github.com/discreted66"><img src="https://avatars.githubusercontent.com/u/190872652?v=4?s=100" width="100px;" alt="liukun"/><br /><sub><b>liukun</b></sub></a><br /><a href="https://github.com/opentiny/tiny-vue/commits?author=discreted66" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
