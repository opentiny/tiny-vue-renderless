<script setup>
import { ref, onMounted, onUnmounted, reactive, computed, watchEffect } from 'vue'
import useWindowSize from '@/tools/useWindowSize.js'
import { featuresList } from './config'
import { TinyCarousel, TinyCarouselItem } from '@opentiny/vue'
import feature1 from './images/feature1.webp'
import feature2 from './images/feature2.webp'
import feature3 from './images/feature3.webp'
import feature4 from './images/feature4.webp'
import feature5 from './images/feature5.webp'
import feature6 from './images/feature6.webp'

const SCROLL_STEP_LEN = 360 // 滚动步长，滚动360px触发步骤更改
const { isMobile } = useWindowSize()
const actionIndex = ref(0)
const scrollDelta = ref(0)
let state = reactive({
  featureImgs: [feature1, feature2, feature3, feature4],
  guideWrap: ''
})
const imgSrc = computed(() => state.featureImgs[actionIndex.value])

const scrollTo = (index) => {
  actionIndex.value = index
}

function isContainerInCenter(container) {
  if (!container) {
    return false
  }
  const rect = container.getBoundingClientRect()
  const containerCenterY = rect.top + rect.height / 2 // 容器中心点 Y 坐标
  const windowHeight = window.innerHeight // 窗口高度
  const windowCenterY = windowHeight / 2 // 窗口中心点 Y 坐标

  // 允许一定误差（如 100px 内视为中间）
  const tolerance = 100
  return Math.abs(containerCenterY - windowCenterY) <= tolerance
}

const onWheel = (event) => {
  const isCenter = isContainerInCenter(state.guideWrap)
  const isScrollUp = event.wheelDelta > 0 // 向上滚（wheelDelta>0）
  const isScrollDown = event.wheelDelta < 0 // 向下滚（wheelDelta<0）

  // 第一层：容器不在中心 → 允许正常滚动，不阻止
  if (!isCenter) {
    scrollDelta.value = 0 // 重置累计值，避免残留
    return
  }

  // 第二层：容器在中心，但到了边界 → 允许正常滚动，不阻止
  const isLegalScroll = (isScrollUp && actionIndex.value > 0) || (isScrollDown && actionIndex.value < 3)
  if (!isLegalScroll) {
    scrollDelta.value = 0
    return
  }

  // 第三层：合法场景（容器在中心 + 未到边界）→ 全程阻止默认滚动！
  event.preventDefault()
  event.stopPropagation()

  // 累计滚动差值（无正负限制，确保持续累计）
  scrollDelta.value -= event.wheelDelta

  if (Math.abs(scrollDelta.value) >= SCROLL_STEP_LEN) {
    let activeIndex = isScrollUp
      ? actionIndex.value - 1 // 向上滚 → 上一个tab
      : actionIndex.value + 1 // 向下滚 → 下一个tab

    activeIndex = Math.max(0, Math.min(activeIndex, 3))

    if (activeIndex !== actionIndex.value) {
      actionIndex.value = activeIndex
    }

    scrollDelta.value = 0
  }
}

onMounted(() => {
  state.guideWrap = document.querySelector('.home-features-wrap')
  if (!state.guideWrap) {
    return
  }
  state.guideWrap.addEventListener('wheel', onWheel)
})

onUnmounted(() => {
  if (!state.guideWrap) {
    return
  }
  state.guideWrap.removeEventListener('wheel', onWheel)
})
watchEffect(() => {
  if (isMobile.value) {
    state.featureImgs = [feature1, feature2, feature5, feature6]
  } else {
    state.featureImgs = [feature1, feature2, feature3, feature4]
  }
})
</script>

<template>
  <div class="home-features-wrap">
    <div class="home-features">
      <div class="title">快速构建，快速使用</div>
      <div class="sub-title">WebMCP全场景实践指南，轻松从浏览器连接到多端应用落地</div>
      <div class="home-features-container" v-if="!isMobile">
        <div class="home-features-left">
          <div class="home-features-list">
            <div
              :class="['home-features-item', { 'home-features-item-active': actionIndex === index }]"
              v-for="(item, index) in featuresList"
              :key="item.title"
              @click="scrollTo(index)"
            >
              <div class="home-features-item-title">
                <img
                  class="home-features-item-title-icon"
                  :src="$pub(`images/home/new-features/${actionIndex === index ? 'checked' : 'uncheck'}.webp`)"
                  alt=""
                />
                <span class="home-features-item-title-text">{{ item.title }}</span>
              </div>
              <div v-if="!isMobile" class="home-features-item-content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="home-features-right">
          <img class="home-features-right-img" :src="imgSrc" alt="" loading="lazy" />
        </div>
      </div>
      <div class="mobile-features" v-else>
        <tiny-carousel arrow="never" height="440px" @change="scrollTo" autoplay>
          <tiny-carousel-item class="mobile-features-item" v-for="(item, index) in featuresList" :key="item.title">
            <div class="mobile-title">
              <img
                class="mobile-features-item-title-icon"
                :src="$pub('images/icon-selected.png')"
                alt=""
                loading="lazy"
              />
              <h3>{{ item.title }}</h3>
            </div>
            <h3>{{ item.content }}</h3>
            <img class="home-features-right-img" :src="imgSrc" alt="" loading="lazy" />
          </tiny-carousel-item>
        </tiny-carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';

.home-features-wrap {
  background-color: #f5f6f9;
  .pcPadding(100, 150);

  .home-features {
    max-width: 1600px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .sub-title {
      .pcRem(margin-bottom, 60);
    }
    &-container {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 2fr;
      .pcRem(gap, 60);
    }

    &-list {
      display: flex;
      flex-direction: column;
    }
    &-item {
      .pcPadding(20, 32);
      border-radius: 18px;
      border: 1px solid #f5f6f9;
      color: rgb(89, 89, 89);

      &-title {
        display: flex;
        align-items: center;
        &-icon {
          .pcRem(width, 20);
          .pcRem(height, 20);
        }

        &-text {
          .pcRem(margin-left, 12);
          .pcRem(font-size, 20);
          font-weight: 700;
          line-height: 1.5;
        }
      }

      &-content {
        .pcRem(margin-top, 8);
        .pcRem(font-size, 16);
        line-height: 2;
      }
    }

    &-item-active {
      border: 1px solid rgba(25, 25, 25, 1);
      color: #191919;
    }

    &-right {
      width: 100%;
      margin: auto;

      &-img {
        width: 100%;
      }
    }
  }
  .mobile-features {
    width: 100%;
    background-color: #fff;
    border-radius: 20px;
    .mobile-features-item {
      display: flex;
      flex-direction: column;
      padding: 24px;
      line-height: 18px;
      gap: 8px;
    }
    .mobile-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
    }
    .mobile-features-item-title-icon {
      width: 20px;
      height: 20px;
    }
  }
}

@media screen and (max-width: @break-point) {
  .home-features-wrap {
    .mobilePadding(32, 48);
  }

  .home-features {
    &-title {
      font-size: 24px;
      margin-bottom: 8px;
    }

    &-sub-title {
      font-size: 14px;
    }

    &-container {
      margin-top: 1rem;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 4fr;
      .mobileRem(gap, 60);
    }

    &-item {
      .mobileRem(margin-bottom, 20);
      .mobileRem(padding-bottom, 6);

      .underline {
        .mobileRem(height, 6);
        .mobileRem(border-radius, 47);
      }

      &-title {
        &-icon {
          .mobileRem(width, 20);
          .mobileRem(height, 20);
        }

        &-text {
          .mobileRem(margin-left, 12);
          .mobileRem(font-size, 20);
        }
      }

      &-content {
        line-height: 2;
        .mobileRem(margin-top, 8);
        .mobileRem(font-size, 18);
      }
    }
  }
}
</style>
