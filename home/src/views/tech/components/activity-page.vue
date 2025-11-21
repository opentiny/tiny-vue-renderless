<template>
  <div class="tech-events">
    <nav-cmp
      ref="navCmp"
      :tabs-data="tabs"
      :type="'events'"
      :show-select="false"
      @change-data="changeData"
      @tab-click="tabClick"
    ></nav-cmp>
    <div class="tech-events-container">
      <div class="tech-events-container-item" v-for="(item, index) in activityData" :key="index" :id="item.markId">
        <description
          :description-container="'tech-events-desc-container'"
          :info-container="'tech-events-info-container'"
          :title="'tech-events-info-container-title'"
          :content="'tech-events-info-container-content'"
          :instruct="'tech-events-info-container-instruct'"
          :other-container="'tech-events-other-container'"
          :other="'tech-events-other-container-content'"
        >
          <template #title>
            <div class="tech-events-info-container-title-desc">
              <a @click.prevent="linkTo(item)" :href="item.link" target="_blank" rel="noopener noreferrer">
                {{ item.title }}
              </a>
            </div>
            <div v-if="item.tag">
              <tiny-tag size="small" :type="item.type">{{ item.tag }} </tiny-tag>
            </div>
          </template>
          <template #content>
            <div class="tech-events-info-container-content-item">
              {{ item.content }}
            </div>
          </template>
          <template #instruct>
            <div class="tech-events-info-container-instruct-write">
              <tiny-tag>{{ item.instruct.write }} </tiny-tag>
            </div>
            <div class="tech-events-info-container-instruct-desc">
              <div class="tech-events-info-container-instruct-declaration">{{ item.instruct.declaration }}</div>
              <div class="tech-events-info-container-instruct-author">{{ item.instruct.author }}</div>
            </div>
            <div class="tech-events-info-container-instruct-date">{{ item.instruct.date }}</div>
            <div class="tech-events-info-container-instruct-apply" v-if="item.instruct.apply">
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
import { nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TinyTag } from '@opentiny/vue'
import description from './common/description.vue'
import NavCmp from './other/nav.vue'
import { activeData } from './ts/active'
import { scrollToView } from './ts/utils'
import '../style/events.less'
import '../style/adapter/events.less'

const router = useRouter()
const route = useRoute()
const activityData = ref(activeData().news.data)
const navCmp = ref()

const tabs = ref([
  {
    name: 'news',
    title: '最新活动'
  },
  {
    name: 'hot',
    title: '热门活动'
  }
])
const breadValue = ref({ first: '最新活动', currentTab: 'news', serial: '' })

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
  const data = sessionStorage.getItem('route-active-data')
  if (data) {
    const params = JSON.parse(data)
    const { first, currentTab, serial } = params
    return { first, currentTab, serial }
  }
}

const routeChange = () => {
  const save = getRouteParams()
  if (save) {
    breadValue.value = { ...save }
    navCmp.value.videoName = save.currentTab
    navCmp.value.currentData = activityData.value[`${save.currentTab}`]
    getCurrentTabs(save)
    if (history.state.current === '/opentiny-design/tech/events') {
      scrollView(save)
    }
  }
}

const scrollView = async (save) => {
  await nextTick()
  scrollToView(save)
}

const linkTo = (item) => {
  const data = {
    first: breadValue.value.first,
    id: item.markId,
    tab: breadValue.value.currentTab,
    active: true
  }
  router.push({
    name: 'articleWithoutType',
    state: data,
    params: {
      mode: data.tab,
      serial: item.markId
    },
    query: {
      name: data.first,
      type: data.tab
    }
  })
}

const setValue = (msg) => {
  const jsonString = JSON.stringify(msg)
  sessionStorage.setItem('active-data', jsonString)
}

const getCurrentTabs = (msg) => {
  breadValue.value.first = msg.first
  breadValue.value.currentTab = msg.currentTab
  if (msg.currentTab === 'hot') {
    getHotData()
  } else {
    getNewsData()
  }
}

const getNewsData = () => {
  activityData.value = activeData().news.data
  setValue(activityData.value)
}

const getHotData = () => {
  activityData.value = activeData().hot.data
  setValue(activityData.value)
}

const changeData = (msg) => {
  msg === 'hot' ? getHotData() : getNewsData()
}

const tabClick = (msg) => {
  if (msg.value === 'news') {
    breadValue.value.first = msg.title
    breadValue.value.currentTab = msg.value
    getNewsData()
  }
  if (msg.value === 'hot') {
    breadValue.value.first = msg.title
    breadValue.value.currentTab = msg.value
    getHotData()
  }
}

onMounted(() => {
  getNewsData()
})
</script>
