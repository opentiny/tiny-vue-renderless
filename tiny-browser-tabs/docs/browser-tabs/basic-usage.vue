<script setup>
import { ref } from 'vue'

const tabs = ref([
  { title: '百度', name: 'baidu', url: 'https://www.baidu.com', icon: 'https://www.baidu.com/favicon.ico' },
  { title: '必应', name: 'bing', url: 'https://www.bing.com', icon: 'https://www.bing.com/favicon.ico' }
])
const activeName = ref('baidu')

const handleClose = (tab) => {
  const index = tabs.value.findIndex((item) => item.name === tab.name)
  tabs.value.splice(index, 1)
}
const handleAdd = () => {
  const idx = tabs.value.length + 1
  tabs.value.push({
    title: `新标签页${idx}`,
    name: `tab${idx}`,
    url: ''
  })
}
</script>

<template>
  <ClientOnly>
    <TinyBrowserTabs v-model="activeName" :tabs="tabs" @close="handleClose" @add="handleAdd" />
  </ClientOnly>
</template>
