<script setup>
import { ref, computed, onMounted } from 'vue'
import CommonCard from '@/shared/components/common-card.vue'
import { iconChevronLeft } from '@opentiny/vue-icon'
import useWindowSize from '@/tools/useWindowSize.js'

const props = defineProps({
  list: Array,
  titleKey: String
})

const { bodyWidth, isMobile } = useWindowSize()

// 减去滚动条宽度
const containerWidth = computed(() => bodyWidth.value - 6)

const IconLeft = iconChevronLeft()

const len = props.list.length
const itemWidth = computed(() => (isMobile.value ? 340 : 432))
const itemGap = 32
const itemSpace = itemWidth.value + itemGap
const totalWidth = itemSpace * len - itemGap

const list = ref()
const marginLeft = ref(0)

const listWidth = ref(0)
const listLeft = ref(0)

// 可以滚动的最大阈值
const maxLeft = computed(() => -totalWidth + listWidth.value)

onMounted(() => {
  listWidth.value = list.value.clientWidth
  listLeft.value = Math.floor((containerWidth.value - listWidth.value) / 2)
})

const prev = () => {
  if (prevDisabled.value) {
    return
  }
  const newLeft = marginLeft.value + containerWidth.value
  marginLeft.value = newLeft > 0 ? 0 : newLeft
}
const next = () => {
  if (nextDisabled.value) {
    return
  }
  let newLeft
  if (containerWidth.value < 500) {
    newLeft = marginLeft.value - itemSpace
  } else {
    newLeft = marginLeft.value - containerWidth.value
    // 每次点击下一次，都让一个卡片贴左边
    const remainSpace = (-1 * (newLeft + listLeft.value)) % itemSpace
    newLeft += remainSpace + itemGap
  }

  marginLeft.value = newLeft < maxLeft.value ? maxLeft.value : newLeft
}
const prevDisabled = computed(() => marginLeft.value >= 0)
const nextDisabled = computed(() => marginLeft.value <= maxLeft.value)

const isScroll = ref(false)

const enableScroll = () => {
  isScroll.value = true
}

const handleKeyUp = () => {
  isScroll.value = false
}

const handleEnter = () => {
  list.value.focus()
}

const handleLeave = () => {
  list.value.blur()
}

const doScroll = (e) => {
  if (!isScroll.value) {
    return
  }
  let newLeft = marginLeft.value - e.deltaY
  newLeft = newLeft > 0 ? 0 : newLeft
  marginLeft.value = newLeft < maxLeft.value ? maxLeft.value : newLeft
}

const touchStartX = ref(0) // 触摸起始X坐标
const touchStartMarginLeft = ref(0) // 触摸起始时的marginLeft
// 触摸起始：只记录两个关键值
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX // 触摸起始X
  touchStartMarginLeft.value = marginLeft.value // 起始marginLeft
}

// 触摸移动：直接计算偏移，更新marginLeft
const handleTouchMove = (e) => {
  const deltaX = e.touches[0].clientX - touchStartX.value // 触摸偏移量（右滑正，左滑负）
  let newMarginLeft = touchStartMarginLeft.value + deltaX // 偏移量映射到marginLeft

  // 边界限制：复用原有maxLeft/0，避免超出
  newMarginLeft = Math.max(newMarginLeft, maxLeft.value)
  newMarginLeft = Math.min(newMarginLeft, 0)

  marginLeft.value = newMarginLeft
  e.preventDefault() // 阻止页面整体滚动，只保留自定义滚动
}
</script>
<template>
  <div
    :class="['card-list', isScroll ? 'is-scroll' : '']"
    ref="list"
    tabindex="0"
    @keydown.shift="enableScroll"
    @keyup="handleKeyUp"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @touchmove="handleTouchMove"
    @touchstart="handleTouchStart"
    @wheel.stop="doScroll"
  >
    <div
      class="card-wrap"
      :style="{
        '--td-CardList-card-width': `${itemWidth}px`,
        '--td-CardList-card-gap': `${itemGap}px`,
        marginLeft: `${marginLeft}px`
      }"
    >
      <a v-for="(item, index) in props.list" :key="index" :href="item.link" target="_blank" rel="noopener noreferrer">
        <common-card :title="props.titleKey ? item[titleKey] : item.title" :img="item.image">
          <slot :data="item"></slot>
        </common-card>
      </a>
    </div>
  </div>
  <div class="scroll-controller">
    <icon-left class="icon-left" :class="{ 'is-disabled': prevDisabled }" @click="prev"></icon-left>
    <icon-left class="icon-right" :class="{ 'is-disabled': nextDisabled }" @click="next"></icon-left>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';

.card-list {
  padding: 10px 0 20px 0;
  outline: none;
  max-width: 1600px;
  overflow: visible;
  margin: 0 auto;
  --td-CardList-time-func: ease;
  --td-CardList-time: 0.5s;
  &.is-scroll {
    --td-CardList-time-func: linear;
    --td-CardList-time: 0.5s;
  }
}

.card-wrap {
  display: inline-flex;
  gap: var(--td-CardList-card-gap);
  transition: all var(--td-CardList-time) var(--td-CardList-time-func);
  margin-left: 0;
  > a {
    all: unset;
  }
}
:deep(.common-card) {
  flex-shrink: 0;
  width: var(--td-CardList-card-width);
  height: 398px;
}

.scroll-controller {
  max-width: 1600px;
  text-align: right;
  margin: 0 auto;
}

svg[class*='icon-'] {
  width: 32px;
  height: 32px;
  fill: #808080;
  cursor: pointer;
  &:hover {
    fill: #191919;
  }
  &.is-disabled {
    fill: #c2c2c2;
    cursor: not-allowed;
  }
}

.icon-right {
  transform: rotate(180deg);
  margin-left: 24px;
}

.card-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  bottom: 32px;
}

.course-type {
  padding: 0 8px;
  margin-left: 8px;
  border: 1px solid #808080;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  height: 24px;
  &.bilibili {
    border-color: #00aeec;
  }
  &.juejin {
    border-color: #1e80ff;
  }
}

@media screen and (max-width: @break-point) {
  .sub-title {
    margin-bottom: 32px;
    padding: 0 32px;
  }
  :deep(.common-card) {
    width: var(--td-CardList-card-width);
    height: 336px;
  }
}
</style>
