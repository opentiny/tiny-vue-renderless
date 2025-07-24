<script setup>
import { ref } from 'vue'

const tabs = ref([
  { title: '百度', name: 'baidu', url: 'https://www.baidu.com', icon: 'https://www.baidu.com/favicon.ico' },
  { title: '必应', name: 'bing', url: 'https://www.bing.com', icon: 'https://www.bing.com/favicon.ico' }
])
const activeName = ref('baidu')
const handleChange = (tab) => {
  console.log('切换: ' + tab)
}
const handleClose = (name) => {
  console.log('关闭: ' + name)
}
const handleAdd = () => {
  console.log('新建标签页')
}
const handleStar = (tab, starred) => {
  console.log(`${starred ? '已收藏' : '取消收藏'}: ${tab.title}`)
}
const handleAddressEnter = (url) => {
  console.log('地址栏回车: ' + url)
}
const handleGoBack = (tab) => {
  console.log('后退: ' + tab.title)
}
const handleGoForward = (tab) => {
  console.log('前进: ' + tab.title)
}
const handleRefresh = (tab) => {
  console.log('刷新: ' + tab.title)
}
const handleMinimize = () => {
  console.log('最小化')
}
const handleMaximize = () => {
  console.log('最大化')
}
const handleWindowClose = () => {
  console.log('关闭窗口')
}
</script>

<template>
  <ClientOnly>
    <TinyBrowserTabs
      v-model="activeName"
      :tabs="tabs"
      :can-go-back="true"
      :can-go-forward="true"
      @change="handleChange"
      @close="handleClose"
      @add="handleAdd"
      @star="handleStar"
      @address-enter="handleAddressEnter"
      @go-back="handleGoBack"
      @go-forward="handleGoForward"
      @refresh="handleRefresh"
      @minimize="handleMinimize"
      @maximize="handleMaximize"
      @window-close="handleWindowClose"
    />
  </ClientOnly>
</template>
