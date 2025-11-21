<template>
  <div class="home">
    <div class="home-contents">
      <!-- 全局通知 -->
      <!-- <global-notice></global-notice> -->
      <!-- 标题 -->
      <home-slogen id="home-1"></home-slogen>
      <web-mcp-struc id="home-2"></web-mcp-struc>
      <why-opentiny id="home-3"></why-opentiny>
      <guide id="home-4"></guide>
      <!-- 新特性 -->
      <new-features id="home-5"></new-features>
      <!-- 生态平台 -->
      <home-platform id="home-6"></home-platform>
      <!-- 最新动态 -->
      <recent-activity></recent-activity>
      <!-- 体验旅程 -->
      <!-- <home-journey></home-journey> -->
      <!-- 贡献者 -->
      <contributor></contributor>
    </div>
    <div class="anchor-nav" v-if="!isMobile">
      <div
        v-for="anchor in anchors"
        :key="anchor.id"
        class="anchor-item"
        :class="{ active: currentAnchorId === anchor.id }"
        @click="scrollToAnchor(anchor.target)"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import HomeSlogen from './slogen/index.vue'
import WebMcpStruc from './architecture/index.vue'
import GlobalNotice from './global-notice.vue'
import HomePlatform from './platform/index.vue'
import GrowthWithUser from './growth-with-user/index.vue'
import WhyOpentiny from './why-opentiny/index.vue'
import RecentActivity from './recent-activity/index.vue'
import Contributor from './contributor/index.vue'
import Guide from './guide/index.vue'
import NewFeatures from './new-features/index.vue'
import { debounce } from '../../tools/utils'
import useWindowSize from '@/tools/useWindowSize.js'

const { isMobile } = useWindowSize()

// 1. 配置锚点：id（唯一标识）、name（显示名称）、target（目标元素选择器）
const anchors = ref([
  { id: 'home-1', target: '#home-1' },
  { id: 'home-2', target: '#home-2' },
  { id: 'home-3', target: '#home-3' },
  { id: 'home-4', target: '#home-4' },
  { id: 'home-5', target: '#home-5' },
  { id: 'home-6', target: '#home-6' }
])
const currentAnchorId = ref('home-1')

const scrollToAnchor = (target) => {
  const el = document.querySelector(target)
  if (el) {
    // 平滑滚动到元素顶部（可调整 behavior 为 'auto' 关闭平滑）
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 滚动后直接高亮当前锚点（可选，避免滚动监听延迟）
    currentAnchorId.value = anchors.value.find((a) => a.target === target).id
  }
}

const handleScroll = debounce(() => {
  const viewportHeight = window.innerHeight // 视口高度

  // 遍历所有锚点，判断目标元素是否在视口内（优先高亮最上方的锚点）
  for (let i = anchors.value.length - 1; i >= 0; i--) {
    const anchor = anchors.value[i]
    const el = document.querySelector(anchor.target)
    if (!el) continue

    const rect = el.getBoundingClientRect() // 获取元素位置信息
    // 判定条件：元素顶部进入视口（距离顶部 < 视口高度的 1/3，避免底部元素提前高亮）
    const isInView = rect.top <= viewportHeight / 3 && rect.bottom >= 0

    if (isInView) {
      currentAnchorId.value = anchor.id
      break // 找到最上方的锚点后退出循环，避免重复更新
    }
  }
}, 100)

// 5. 挂载时绑定滚动监听，卸载时解绑
onMounted(() => {
  const homeContentRef = document.querySelector('.layout-scroll-container')
  homeContentRef.addEventListener('scroll', handleScroll)
  // 初始触发一次，确保页面加载时高亮正确锚点
  handleScroll()
})

onUnmounted(() => {
  const homeContentRef = document.querySelector('.layout-scroll-container')
  homeContentRef.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped lang="less">
@import '@/mixin.less';

.home {
  .anchor-nav {
    position: fixed;
    .pcRem( right,90);
    top: 50%;
    transform: translateY(-50%);
  }
  .anchor-item {
    width: 14px;
    height: 14px;
    border-radius: 2.33px;
    backdrop-filter: blur(4.6px);
    background: rgba(89, 89, 89, 0.2);
    cursor: pointer;
    color: #666;
    transition: all 0.3s;
    margin: 24px 0;
  }

  /* 高亮样式（可自定义） */
  .anchor-item.active {
    background: rgba(89, 89, 89, 0.5);
  }
}

:deep(.title) {
  color: rgb(25, 25, 25);
  .pcRem(font-size, 40);
  font-weight: 600;
  margin-bottom: 16px;
  text-align: center;
  line-height: 1.5;
}

:deep(.sub-title) {
  color: rgb(128, 128, 128);
  .pcRem(font-size, 24);
  max-width: 1300px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.5;
}

@media screen and (max-width: @break-point) {
  :deep(.title) {
    font-size: 20px;
    margin-bottom: 8px;
  }

  :deep(.sub-title) {
    font-size: 14px;
  }
}
</style>
