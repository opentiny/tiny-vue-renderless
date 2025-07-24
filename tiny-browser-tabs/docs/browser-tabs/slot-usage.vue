<script setup>
import { ref } from 'vue'

const tabs = ref([
  { title: '百度', name: 'baidu', url: 'https://www.baidu.com', icon: 'https://www.baidu.com/favicon.ico' },
  { title: '必应', name: 'bing', url: 'https://www.bing.com', icon: 'https://www.bing.com/favicon.ico' }
])
const activeName = ref('baidu')
</script>

<template>
  <ClientOnly>
    <TinyBrowserTabs v-model="activeName" :tabs="tabs">
      <template #tab-icon="{ tab, index, isActive }">
        <img :src="tab.icon" style="width: 20px; height: 20px; border-radius: 50%; margin-right: 4px" />
        <span v-if="tab.name === 'baidu'" style="color: red; font-size: 12px">🔥</span>
      </template>
      <template #tab-title="{ tab, index, isActive }">
        <b v-if="isActive">【{{ tab.title }}】</b>
        <span v-else>{{ tab.title }}</span>
      </template>
      <template #default="{ tab }">
        <div style="padding: 32px; text-align: center">
          <h2>自定义内容：{{ tab.title }}</h2>
          <div>当前URL：{{ tab.url }}</div>
        </div>
      </template>
    </TinyBrowserTabs>
  </ClientOnly>
</template>
