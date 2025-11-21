<template>
  <div class="tech-article-detail" ref="contentRef">
    <div class="tech-article-detail-nav">
      <tiny-breadcrumb>
        <!-- path 可填写跳转的路由 -->
        <tiny-breadcrumb-item :to="jump" @select="breadClick">{{ nav.first || route.query.name }}</tiny-breadcrumb-item>
        <tiny-breadcrumb-item>
          {{ convertToTinyEditor(getLabel(nav.second) || getLabel(route.query.subName)) }}
        </tiny-breadcrumb-item>
      </tiny-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="tech-article-detail-container">
      <!-- md渲染 -->
      <div class="tech-article-detail-container-md">
        <div class="tech-article-detail-container-md-content" v-if="articleData.length">
          <div v-for="(item, index) in showData" :key="index">
            <div class="tech-article-detail-container-md-title" :title="item['title']">
              {{ item['title'] }}
            </div>
            <div class="tech-article-detail-container-md-info">
              <div class="tech-article-detail-container-md-info-write" v-if="item['instruct']['write']">
                <tiny-tag> {{ item['instruct']['write'] }} </tiny-tag>
              </div>
              <div class="tech-article-detail-container-md-info-desc">
                <div class="tech-article-detail-container-md-info-declaration">
                  {{ item['instruct']['declaration'] }}
                </div>
                <div class="tech-article-detail-container-md-info-author">
                  {{ item['instruct']['author'] }}
                </div>
              </div>
              <div class="tech-article-detail-container-md-info-date">
                {{ item['instruct']['date'] }}
              </div>
              <div class="tech-article-detail-container-md-info-apply" v-if="item['instruct']['apply']">
                {{ item['instruct']['apply'] }}
              </div>
            </div>
          </div>
          <div class="tech-article-detail-container-markdown-body">
            <component :is="markdownCmp" />
          </div>
        </div>
        <div class="tech-article-detail-container-md-page">
          <div class="tech-article-detail-container-md-up" @click="upMd" v-if="showData[0]?.flag > 1">
            <img :src="left" /> 上一篇文章
          </div>
          <div
            class="tech-article-detail-container-md-down"
            v-if="showData[0]?.flag < articleData.length"
            @click="downMd"
          >
            下一篇文章<img :src="right" />
          </div>
        </div>
      </div>
      <!-- 推荐文章 -->
      <div class="tech-article-detail-container-about">
        <div
          class="tech-article-detail-container-about-wx"
          :style="{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }"
        >
          <div class="tech-article-detail-container-about-wx-left">
            <img :src="log" />
            <div class="tech-article-detail-container-about-wx-title">欢迎投稿</div>
            <div class="tech-article-detail-container-about-wx-desc">体验世界 听你评说</div>
            <div class="tech-article-detail-container-about-wx-desc">扫一扫添加小助手</div>
          </div>
          <!-- 图片 -->
          <div class="tech-article-detail-container-about-wx-img">
            <img :src="wx" />
          </div>
        </div>
        <div class="tech-article-detail-container-about-desc">
          <div class="tech-article-detail-container-about-title">{{ aboutitle }}</div>
          <div class="tech-article-detail-container-about-title-item" v-for="(item, index) in descData" :key="index">
            <div class="tech-article-detail-container-about-title-img">
              <img :src="word" />
            </div>
            <div class="tech-article-detail-container-about-title-info">
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
            </div>
            <div v-if="item.img">
              <img :src="item.img" />
            </div>
          </div>
        </div>
        <div class="tech-article-detail-container-about-hot">
          <div class="tech-article-detail-container-about-title">{{ hotitle }}</div>
          <div class="tech-article-detail-container-about-title-item" v-for="(item, index) in hotData" :key="index">
            <div class="tech-article-detail-container-about-title-info">
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
            </div>
            <div v-if="item.img">
              <img :src="item.img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, shallowRef, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TinyBreadcrumb, TinyBreadcrumbItem, TinyTag } from '@opentiny/vue'
import log from '@/assets/tech/log.svg'
import wx from '@/assets/tech/wx.svg'
import word from '@/assets/tech/word.svg'
import right from '@/assets/tech/arrow-right.svg'
import left from '@/assets/tech/arrow-left.svg'
import '../style/description.less'
import '../style/adapter/description.less'
import { descriptionData } from './ts/article-page'
import { articleMdData } from './ts/article'
import { activeData } from './ts/active'
import { getLabel } from './ts/utils'

const router = useRouter()
const route = useRoute()
const nav = ref({
  first: '',
  second: '',
  id: '',
  tab: '',
  subTab: '',
  active: false
})
const contentRef = ref(null)
const aboutitle = ref('相关文章')
const hotitle = ref('热门文章')
let techArticle = ref({})
let techActive = ref({})
const currentPage = ref(false)
const descData = descriptionData().aboutData
const hotData = descriptionData().hotsData
let jump = ref({})
let markdownCmp = shallowRef()
let articleData = ref([])
let showData = ref([])
let seqArr = ref([])

const getBreadNav = () => {
  nav.value = history.state
  jump.value = route.query.subName ? { name: 'write', state: techArticle } : { name: 'events', state: techActive }
}

const breadClick = () => {
  route.query.subName ? setRoute() : setRouteActive()
}

const convertToTinyEditor = (text) => {
  return text && text.replace(/Tiny([a-z]+)/g, (m, t) => 'Tiny' + t[0].toUpperCase() + t.slice(1))
}

const getMdText = async () => {
  try {
    if (nav.value.active || route.query.type) {
      const module = await import(
        `@/views/tech/components/mark-down/${nav.value['tab'] || route.query.type}/${
          nav.value['id'] || route.params.serial
        }.md`
      )
      markdownCmp.value = module.default
      return {
        template: `
            ${markdownCmp.value}
          `
      }
    } else {
      const module = await import(
        `@/views/tech/components/mark-down/${nav.value['tab'] || route.params.mode}/${
          nav.value['subTab'] || route.params.type
        }/${nav.value['id'] || route.params.serial}.md`
      )
      markdownCmp.value = module.default
      return {
        template: `
            ${markdownCmp.value}
          `
      }
    }
  } catch (error) {
    throw error
  }
}

const insertFlag = (data) => {
  data?.forEach((item, index) => {
    item.flag = index + 1
  })
}

const getFlag = (msg) => {
  let data = []
  if (nav.value.active || route.query.type) {
    data = msg
    insertFlag(data)
  } else if (currentPage.value) {
    data = msg
    insertFlag(data)
  } else {
    const modes = nav.value['tab'] || route.params.mode
    const types = nav.value['subTab'] || route.params.type
    data = msg[`${modes}`]['data'][`${types}`]
    insertFlag(data)
  }
  return data
}

const getValue = () => {
  let currentData = {}
  if (nav.value.active || route.query.type) {
    const activeDataJson = sessionStorage.getItem('active-data')
    currentData = activeDataJson && JSON.parse(activeDataJson)
    const active = sessionStorage.getItem('article-active-data')
    techActive.value = active && JSON.parse(active)
  } else {
    const data = sessionStorage.getItem('data')
    currentData = data && JSON.parse(data)
    const tech = sessionStorage.getItem('article-data')
    techArticle.value = tech && JSON.parse(tech)
  }
  articleData.value = getFlag(currentData)
  showData.value = getCurrentMD(articleData.value)
}

const getCurrentMD = (msg) => {
  const filteredArray = msg.filter((item) => item.markId === (nav.value.id || route.params.serial))
  return filteredArray
}

const scrollToTop = () => {
  if (contentRef.value) {
    contentRef.value.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }
}
const upMd = () => {
  let data = getCurrentMD(articleData.value)
  const num = Number(data[0].flag)
  if (num > 1) {
    const upData = articleData.value[num - 2]
    showData.value = [upData]
    nav.value.id = upData.markId
    getMdText()
    route.params.type ? updateRouterUp() : updateActiveRouterUp()
    nextTick(() => {
      scrollToTop()
    })
  }
}

const sortAll = () => {
  if (route.params.mode === 'hot' || route.params.mode === 'news') {
    const isActiveDataExists = sessionStorage.getItem('active-data')
    const arr = JSON.parse(isActiveDataExists)
    return arr.map((item) => item.markId)
  } else {
    // 获取文章所有数据
    let articleArr = sessionStorage.getItem('data')
    const obj = JSON.parse(articleArr)
    const currentArr = obj[`${route.params.mode}`][`data`][`${route.params.type}`]
    return currentArr.map((item) => item.markId)
  }
}

const findIndexInArray = (target) => {
  seqArr.value = []
  seqArr.value = sortAll()
  return seqArr.value.findIndex((item) => item === target)
}

const updateActiveRouterUp = () => {
  const index = findIndexInArray(route.params.serial)
  router.push({
    name: 'articleWithoutType',
    params: {
      mode: route.params.mode,
      serial: seqArr.value[index - 1]
    },
    query: {
      name: route.query.name,
      type: route.query.type
    }
  })
}

const updateActiveRouterNext = () => {
  const index = findIndexInArray(route.params.serial)
  router.push({
    name: 'articleWithoutType',
    params: {
      mode: route.params.mode,
      serial: seqArr.value[index + 1]
    },
    query: {
      name: route.query.name,
      type: route.query.type
    }
  })
}

const updateRouterUp = () => {
  const index = findIndexInArray(route.params.serial)
  router.push({
    name: 'article',
    params: {
      mode: route.params.mode,
      type: route.params.type,
      serial: seqArr.value[index - 1]
    },
    query: {
      name: route.query.name,
      subName: route.query.subName
    }
  })
}

const updateRouterNext = () => {
  const index = findIndexInArray(route.params.serial)
  router.push({
    name: 'article',
    params: {
      mode: route.params.mode,
      type: route.params.type,
      serial: seqArr.value[index + 1]
    },
    query: {
      name: route.query.name,
      subName: route.query.subName
    }
  })
}

const downMd = () => {
  let data = getCurrentMD(articleData.value)
  const num = Number(data[0].flag)
  if (num < articleData.value.length) {
    const upData = articleData.value[num]
    showData.value = [upData]
    nav.value.id = upData.markId
    getMdText()
    route.params.type ? updateRouterNext() : updateActiveRouterNext()
    nextTick(() => {
      scrollToTop()
    })
  }
}

const setRoute = () => {
  const routeItem = {
    first: route.query.name,
    second: route.query.subName,
    currentTab: route.params.mode,
    currentClass: route.params.type,
    serial: route.params.serial
  }
  sessionStorage.setItem('route-data', JSON.stringify(routeItem))
}

const setRouteActive = () => {
  const routeActiveItem = {
    first: route.query.name,
    currentTab: route.params.mode,
    serial: route.params.serial
  }
  sessionStorage.setItem('route-active-data', JSON.stringify(routeActiveItem))
}

const getData = () => {
  const isDataExists = sessionStorage.getItem('data') === null
  const isTechExists = sessionStorage.getItem('article-data') === null
  const isActiveExists = sessionStorage.getItem('article-active-data') === null
  const isActiveDataExists = sessionStorage.getItem('active-data') === null
  if (isDataExists) {
    let dataJson = articleMdData()
    sessionStorage.setItem('data', JSON.stringify(dataJson))
  }
  if (isTechExists) {
    let techJson = {
      first: route.query.name,
      second: route.query.subName,
      id: route.params.serial,
      tab: route.params.mode,
      subTab: route.params.type,
      active: false
    }
    sessionStorage.setItem('article-data', JSON.stringify(techJson))
  }
  if (isActiveExists) {
    let activeJson = {
      first: route.query.name,
      id: route.params.serial,
      tab: route.params.mode,
      active: true
    }
    sessionStorage.setItem('article-active-data', JSON.stringify(activeJson))
  }
  if (isActiveDataExists) {
    if (route.params.mode === 'news') {
      sessionStorage.setItem('active-data', JSON.stringify(activeData().news.data))
    }
    if (route.params.mode === 'hot') {
      sessionStorage.setItem('active-data', JSON.stringify(activeData().hot.data))
    }
  }
  //当前热门活动的tab值
  const validModes = ['news', 'hot']
  // 存储route值
  if (validModes.includes(String(route.params.mode))) {
    setRouteActive()
  } else {
    setRoute()
  }
}

getData()

onMounted(() => {
  getBreadNav()
  getValue()
  getMdText()
})
</script>
