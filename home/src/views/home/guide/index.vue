<template>
  <div class="guide-wrap">
    <div class="guide">
      <div class="guide-header">
        <div class="title">快速集成NEXT SDKs</div>
        <div class="sub-title">支持多种编程语言和前端框架，帮助开发者快速实现智能化功能</div>
      </div>
      <div v-if="!isMobile" class="guide-content">
        <tiny-steps
          v-if="!isMobile"
          class="guide-steps"
          line
          vertical
          :data="state.data"
          :active="state.active"
          @click="onActiveStep"
        ></tiny-steps>
        <div class="guide-step-cards">
          <step-card
            v-for="(step, index) in stepSettings"
            :key="step.title"
            :title="step.title"
            :subTitle="step.subTitle"
            :descriptions="step.descriptions"
            :activated="index === state.active"
            @click="onActiveStep(index)"
          ></step-card>
        </div>
        <code-card
          class="guide-card"
          :guide="currentStep.guide"
          :show-finish="state.active === stepSettings.length - 1"
        >
        </code-card>
      </div>
      <div v-else>
        <div class="mobile-button-group">
          <div
            v-for="({ shortTitle }, index) in stepSettings"
            :key="index"
            :round="false"
            :class="{ 'mobile-button': true, 'mobile-button-active': index === state.active }"
            @click="state.active = index"
          >
            <span :class="{ 'mobile-button-number': true, 'mobile-button-number-active': index === state.active }">
              {{ index + 1 }}
            </span>
            {{ shortTitle }}
          </div>
        </div>
        <div class="mobile-guide-content">
          <div class="mobile-guide-content-title">{{ stepSettings[state.active].guide.title }}</div>
          <div
            class="mobile-guide-content-description"
            v-for="(description, index) in stepSettings[state.active].descriptions"
            :key="index"
          >
            {{ description }}
          </div>
          <code-card
            class="guide-card"
            :guide="currentStep.guide"
            :show-finish="state.active === stepSettings.length - 1"
          >
          </code-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, onUnmounted } from 'vue'
import { TinySteps } from '@opentiny/vue'
import useWindowSize from '@/tools/useWindowSize.js'
import { stepSettings } from './config'
import StepCard from './components/StepCard.vue'
import CodeCard from './components/CodeCard.vue'

const SCROLL_STEP_LEN = 360 // 滚动步长，滚动360px触发步骤更改
const state = reactive({
  data: [
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: ''
    },
    {
      name: ''
    }
  ],
  active: 0,
  observer: null,
  scrollDelta: 0,
  guideWrap: ''
})

const { isMobile } = useWindowSize()

const currentStep = computed(() => {
  return stepSettings[state.active]
})

const onActiveStep = (index) => {
  state.active = index
  state.scrollDelta = index * SCROLL_STEP_LEN
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
    state.scrollDelta = 0 // 重置累计值，避免残留
    return
  }

  // 第二层：容器在中心，但到了边界 → 允许正常滚动，不阻止
  const isLegalScroll = (isScrollUp && state.active > 0) || (isScrollDown && state.active < 3)
  if (!isLegalScroll) {
    state.scrollDelta = 0
    return
  }

  // 第三层：合法场景（容器在中心 + 未到边界）→ 全程阻止默认滚动！
  event.preventDefault()
  event.stopPropagation()

  // 累计滚动差值（无正负限制，确保持续累计）
  state.scrollDelta -= event.wheelDelta

  if (Math.abs(state.scrollDelta) >= SCROLL_STEP_LEN) {
    let activeIndex = isScrollUp
      ? state.active - 1 // 向上滚 → 上一个tab
      : state.active + 1 // 向下滚 → 下一个tab

    activeIndex = Math.max(0, Math.min(activeIndex, 3))

    if (activeIndex !== state.active) {
      state.active = activeIndex
    }

    state.scrollDelta = 0
  }
}

const alwaysScrollCenter = () => {
  const tabWrapper = document.querySelector('.mobile-button-group') // 事件委托的父元素

  if (!tabWrapper) {
    return
  }

  const scrollCenter = (e) => {
    // 找到被点击的tab元素（通过类名判断）
    const tab = e.target.closest('.mobile-button')

    // 计算居中滚动位置
    const containerRect = tabWrapper.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()

    const containerHalfWidth = containerRect.width / 2
    const tabHalfWidth = tabRect.width / 2

    // 核心滚动位置计算
    const scrollPosition = tabRect.left - containerRect.left + tabHalfWidth - containerHalfWidth

    // 执行滚动
    tabWrapper.scrollTo({
      left: tabWrapper.scrollLeft + scrollPosition,
      behavior: 'smooth'
    })
  }
  tabWrapper.addEventListener('click', scrollCenter)

  onUnmounted(() => {
    tabWrapper.removeEventListener('click', scrollCenter)
  })
}

onMounted(() => {
  state.guideWrap = document.querySelector('.guide-wrap')
  if (state.guideWrap) {
    state.guideWrap.computedStyleMap.overflow = 'auto'
    state.guideWrap.addEventListener('wheel', onWheel)
    alwaysScrollCenter()
  }
})

onUnmounted(() => {
  if (state.guideWrap) {
    state.guideWrap.removeEventListener('wheel', onWheel)
  }
})
</script>

<style lang="less" scoped>
@import '@/mixin.less';

.guide-wrap {
  display: flex;
  width: 100%;
  background: #fff;
  .pcPadding(100, 150);

  .guide {
    width: 100%;
    margin: 0 auto;
    .pcRem(max-width, 1600);

    &-content {
      display: flex;
      .pcRem(margin-top, 32);

      .guide-step-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        .pcRem(gap, 16);
        .pcRem(width, 690);
        .pcMargin(68, 0, 0, 16);
      }
    }

    .guide-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .pcRem(width, 856);
      .pcRem(height, 538);
      .pcMargin(68, 0, 0, 16);

      &-image {
        width: 100%;
        .pcPadding(16, 0);
      }
    }

    .mobile-button-group {
      display: flex;
      overflow: auto;
      -ms-overflow-style: none;
      /* 适用于 Internet Explorer 和旧版 Edge */
      scrollbar-width: none;

      /* 适用于 Firefox */
      &::-webkit-scrollbar {
        display: none;
      }

      gap: 8px;
      margin-top: 24px;
      font-size: 14px;

      & > div {
        padding: 6px 12px;
        box-sizing: border-box;
        border: 1px solid rgba(219, 219, 219, 1);
        border-radius: 8px;
        background: rgba(255, 255, 255, 1);
        color: #808080;
        cursor: pointer;
        white-space: nowrap;
      }

      .mobile-button-active {
        border: 1px solid #191919;
        color: #191919;
      }
    }

    .mobile-button-number {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      text-align: center;
      border-radius: 12px;
      background-color: #fff;
      line-height: 22px;
      border: 1px solid rgba(219, 219, 219, 1);
      margin-right: 6px;
      font-size: 12px;
      color: #595959;
    }

    .mobile-button-number-active {
      color: #fff;
      background-color: #000;
    }

    .mobile-guide-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 16px 0;

      &-title {
        font-size: 18px;
        font-weight: 600;
      }

      &-description {
        color: rgba(89, 89, 89, 1);
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        margin: 8px 0 16px 0;
      }
    }
  }

  .guide-steps {
    flex-direction: column;
    .pcRem(width, 40);

    :deep(.tiny-steps-main) {
      flex: 1;
      flex-direction: column;

      .line {
        border-top: none;
        border-right: 1px solid var(--tv-Steps-line-bg-color);
        margin: 0;
        .pcRem(height, 52);
      }
    }

    :deep(.title-vertical) {
      margin: 0;
    }
  }

  @media screen and (max-width: @break-point) {
    .guide-step-one-code {
      font-size: 14px;
    }

    .guide {
      &-content {
        .guide-step-cards {
          .mobileMargin(68, 0, 0, 16);
        }
      }
      .mobile-guide-content {
        .guide-card {
          max-height: 438px;
          width: 100%;
        }
      }
    }
  }
}
</style>
