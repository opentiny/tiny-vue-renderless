<template>
  <div>
    <div class="tech-nav">
      <div>
        <div class="tech-banner">
          <div class="tech-banner-sub">
            <div class="tech-banner-title">码上生花，共赴山海</div>
            <div class="tech-banner-subtitle">
              因专业，成就志向远大的你。<br v-if="isMobile" />
              在这里共同成长，共赴山海。
            </div>
            <!-- 导航 -->
            <div class="tech-banner-nav">
              <div class="tech-banner-nav-bar">
                <div
                  class="tech-banner-nav-item"
                  :style="index === 1 ? 'background-color: rgba(255, 255, 255, 0.6)' : ''"
                  @click="toVideo"
                >
                  <div class="tech-banner-nav-item-title">视频课程</div>
                  <div class="tech-banner-nav-item-subtitle">OpenTiny全方位知识点</div>
                </div>
                <div
                  class="tech-banner-nav-item"
                  :style="index === 2 ? 'background-color: rgba(255, 255, 255, 0.6)' : ''"
                  @click="toArticle"
                >
                  <div class="tech-banner-nav-item-title">技术文章</div>
                  <div class="tech-banner-nav-item-subtitle">大咖分享技术干货</div>
                </div>
                <div
                  class="tech-banner-nav-item"
                  :style="index === 3 ? 'background-color: rgba(255, 255, 255, 0.6)' : ''"
                  @click="toEvents"
                >
                  <div class="tech-banner-nav-item-title">热门活动</div>
                  <div class="tech-banner-nav-item-subtitle">最新活动Get</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- TODO: 轮播模式 -->
    <div class="tech-carousel-nav" v-if="false"></div>
    <!-- 当前主页 -->
    <div class="tech-content" v-if="index === 0">
      <current-page></current-page>
    </div>
    <!-- 视频课程 -->
    <div class="tech-content" v-if="index === 1">
      <video-page></video-page>
    </div>
    <!-- 技术文章 -->
    <div class="tech-content" v-if="index === 2">
      <article-page></article-page>
    </div>
    <!-- 热门活动 -->
    <div class="tech-content" v-if="index === 3">
      <activity-page></activity-page>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import './style/index.less'
import './style/adapter/index.less'
import CurrentPage from './components/current-page.vue'
import VideoPage from './components/video-page.vue'
import ArticlePage from './components/article-page.vue'
import ActivityPage from './components/activity-page.vue'
import useWindowSize from '@/tools/useWindowSize.js'

const { isMobile } = useWindowSize()

const router = useRouter()
const route = useRoute()
watch(
  route,
  () => {
    nextTick(() => {
      rushPage()
    })
  },
  { immediate: true }
)

const index = ref(0)

const toHome = () => {
  index.value = 0
  router.push({ name: 'tech' })
}

const toVideo = () => {
  index.value = 1
  router.push({ name: 'video' })
}
const toArticle = () => {
  index.value = 2
  router.push({
    name: 'write'
  })
  sessionStorage.removeItem('route-active-data')
}
const toEvents = () => {
  index.value = 3
  router.push({ name: 'events' })
  sessionStorage.removeItem('route-data')
}

const rushPage = () => {
  if (route.path === '/opentiny-design/tech') {
    toHome()
  }
  if (route.path === '/opentiny-design/tech/video') {
    toVideo()
  }
  if (route.path === '/opentiny-design/tech/write') {
    toArticle()
  }
  if (route.path === '/opentiny-design/tech/events') {
    toEvents()
  }
}
</script>
