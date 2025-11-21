<template>
  <div class="tech-video">
    <nav-cmp
      ref="nav"
      :tabs-data="tabs"
      :type="'video'"
      :show-select="false"
      @tab-click="tabClick"
      @change-video-data="changeData"
    ></nav-cmp>
    <video-class :data="cardVideoData"></video-class>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import NavCmp from './other/nav.vue'
import VideoClass from './other/video-class.vue'
import { MyType } from './ts/desc.ts'
import '../style/video-page.less'
import '../style/adapter/video-page.less'
import { techData, enjoyData, engineData, vueData, moreData } from './ts/video.ts'

const route = useRoute()
const tabs = ref([
  {
    name: 'tech',
    title: 'OpenTiny开发者技术实践'
  },
  {
    name: 'enjoy',
    title: 'OpenTiny前端解决方案技术分享'
  },
  {
    name: 'engine',
    title: 'TinyEngine低代码引擎系列'
  },
  {
    name: 'vue',
    title: 'TinyVue组件库系列'
  },
  {
    name: 'more',
    title: '更多'
  }
])
const cardVideoData = ref<MyType[]>([])
const nav = ref()

watch(
  () => route.path,
  () => {
    nextTick(() => {
      routeChange()
    })
  },
  { immediate: true }
)

const routeChange = () => {
  const data = sessionStorage.getItem('video-data')
  if (data) {
    nav.value.videoName = data
    tabClick({ value: data })
  }
}

const tabClick = (msg) => {
  if (msg.value === 'tech') {
    cardVideoData.value = techData()
  }
  if (msg.value === 'enjoy') {
    cardVideoData.value = enjoyData()
  }
  if (msg.value === 'engine') {
    cardVideoData.value = engineData()
  }
  if (msg.value === 'vue') {
    cardVideoData.value = vueData()
  }
  if (msg.value === 'more') {
    cardVideoData.value = moreData()
  }
}

const changeData = (item) => {
  tabClick({ value: item.info.mode })
}

onMounted(() => {
  cardVideoData.value = techData()
})
</script>
