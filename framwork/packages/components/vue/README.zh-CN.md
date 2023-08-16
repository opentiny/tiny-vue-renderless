# @opentiny/vue

这是一个基于 vue 框架的组件库，同时支持 Vue2 和 Vue3

### 1. 安装

执行以下命令，安装 Vue 3 版本的 @opentiny/vue 组件库：

```shell
npm i @opentiny/vue@3
```

执行以下命令，安装 Vue 2 版本的 TinyVue 组件库：

```shell
npm i @opentiny/vue@2
```

### 2. 引入和使用

在`App.vue`文件中使用 @opentiny/vue 组件。

```html
<script lang="ts" setup>
  import { Button as TinyButton } from '@opentiny/vue'
</script>

<template>
  <tiny-button>TinyVue</tiny-button>
</template>
```
