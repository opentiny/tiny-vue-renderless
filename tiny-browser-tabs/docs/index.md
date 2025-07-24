---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'TinyBrowserTabs'
  text: '浏览器页签组件'
  tagline: TinyBrowserTabs 是一个基于 Vue3 的浏览器页签组件，使用 TinyVue 组件库，遵循 OpenTiny 设计规范，简单易用、功能强大，支持动态增删、切换，便于与后端或业务逻辑集成。
  image:
    src: logo.png
    alt: TinyBrowserTabs
  actions:
    - theme: brand
      text: 案例
      link: /examples/basic-usage
    - theme: alt
      text: API
      link: /apis/props

features:
  - icon: 📦
    title: 模拟真实浏览器标签页体验
    details: 支持多标签页的增删、切换、拖拽排序，交互方式贴近主流浏览器，用户上手无门槛。
  - icon: 📝
    title: 高度自定义
    details: 提供 tab-title、tab-icon、default 等多个插槽，开发者可自定义每个标签的标题、图标、内容区域，满足各种业务需求
  - icon: ⚖️
    title: 丰富的事件回调
    details: 提供如 add、close、tab-drag-end、go-back、go-forward、refresh 等事件，方便父组件监听和处理用户操作
---
