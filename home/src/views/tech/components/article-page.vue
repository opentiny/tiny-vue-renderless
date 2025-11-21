<template>
  <div class="tech-article">
    <nav-cmp
      ref="navCmp"
      :show-select="true"
      :type="'article'"
      :data="articleData"
      @tab-click="tabClick"
      @get-class="getClass"
    ></nav-cmp>
    <div class="tech-article-container">
      <div class="tech-article-container-item" v-for="(item, index) in currentTabsData" :key="index" :id="item.markId">
        <description
          :description-container="'tech-article-desc-container'"
          :info-container="'tech-article-info-container'"
          :title="'tech-article-info-container-title'"
          :content="'tech-article-info-container-content'"
          :instruct="'tech-article-info-container-instruct'"
          :other-container="'tech-article-other-container'"
          :other="'tech-article-other-container-content'"
        >
          <template #title>
            <div class="tech-article-info-container-title-desc">
              <a @click.prevent="linkTo(item)" :href="item.link" target="_blank" rel="noopener noreferrer">
                {{ item.title }}
              </a>
            </div>
            <div v-if="item.tag">
              <tiny-tag size="small" :type="item.type">{{ item.tag }} </tiny-tag>
            </div>
          </template>
          <template #content>
            <div class="tech-article-info-container-content-item">
              {{ item.content }}
            </div>
          </template>
          <template #instruct>
            <div class="tech-article-info-container-instruct-write">
              <tiny-tag>{{ item.instruct.write }} </tiny-tag>
            </div>
            <div class="tech-article-info-container-instruct-desc">
              <div class="tech-article-info-container-instruct-declaration">{{ item.instruct.declaration }}</div>
              <div class="tech-article-info-container-instruct-author">{{ item.instruct.author }}</div>
            </div>
            <div class="tech-article-info-container-instruct-date">{{ item.instruct.date }}</div>
            <div class="tech-article-info-container-instruct-apply" v-if="item.instruct.apply">
              {{ item.instruct.apply }}
            </div>
          </template>
          <template #other v-if="item.img">
            <div>
              <img :src="item.img" />
            </div>
          </template>
        </description>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TinyTag } from '@opentiny/vue'
import NavCmp from './other/nav.vue'
import description from './common/description.vue'
import { ArticleType } from './ts/desc.ts'
import { articleMdData } from './ts/article'
import { scrollToView, getLabel } from './ts/utils'
import '../style/description.less'
import '../style/adapter/description.less'

const router = useRouter()
const route = useRoute()
const articleData = ref(articleMdData())
const breadValue = ref({
  first: '使用指南',
  currentTab: 'guide',
  second: 'Tinyvue',
  currentClass: 'tinyvue',
  serial: ''
})
let currentTabsData = ref<ArticleType[]>([])
const navCmp = ref()

watch(
  () => route.path,
  () => {
    nextTick(() => {
      routeChange()
    })
  },
  { immediate: true }
)

const getRouteParams = () => {
  const data = sessionStorage.getItem('route-data')
  if (data) {
    const params = JSON.parse(data)
    const { first, second, currentTab, currentClass, serial } = params
    return { first, second, currentTab, currentClass, serial }
  }
}

const routeChange = () => {
  const save = getRouteParams()
  if (save) {
    breadValue.value = { ...save }
    navCmp.value.videoName = save.currentTab
    navCmp.value.currentData = articleData.value[`${save.currentTab}`]
    navCmp.value.aboutData = navCmp.value.currentData['about']
    navCmp.value.getCurrentDefault(save.currentClass)
    currentTabsData.value = articleData.value[`${save.currentTab}`].data[`${save.currentClass}`]
    if (history.state.current === '/opentiny-design/tech/write') {
      scrollView(save)
    }
  }
}

const scrollView = async (save) => {
  await nextTick()
  scrollToView(save)
}

const tabClick = (msg) => {
  breadValue.value.first = msg.title
  breadValue.value.currentTab = msg.value
  breadValue.value.second = capitalizeFirstLetter(msg.current)
  breadValue.value.currentClass = msg.current
  getData()
}

const capitalizeFirstLetter = (str) => {
  if (!str) return ''
  const withSpace = str.replace(/([A-Z])(?=[A-Z][a-z])/g, '$1').replace(/([a-z])(?=[A-Z])/g, '$1')
  const words = withSpace.split(' ')
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('')
}

const getClass = (msg) => {
  breadValue.value.second = capitalizeFirstLetter(msg.name)
  breadValue.value.currentClass = msg.value
  getData()
}

const linkTo = (item) => {
  const data = {
    first: breadValue.value.first,
    second: breadValue.value.second,
    id: item.markId,
    tab: breadValue.value.currentTab,
    subTab: breadValue.value.currentClass,
    active: false
  }
  router.push({
    name: 'article',
    state: data,
    params: {
      mode: data.tab,
      type: data.subTab,
      serial: item.markId
    },
    query: {
      name: data.first,
      subName: data.second
    }
  })
}

const getData = () => {
  currentTabsData.value = articleData.value[`${breadValue.value.currentTab}`].data[`${breadValue.value.currentClass}`]
}

onMounted(() => {
  getData()
})
</script>
