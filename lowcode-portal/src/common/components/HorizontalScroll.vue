<template>
  <div ref="scrollContainer" class="scroll-container">
    <div class="scroll-vertical">
      <div :class="{ 'scroll-horizontal': true, 'align-right': alignRight }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

defineProps({
  alignRight: {
    type: Boolean,
    default: false
  }
})

const scrollContainer = ref(null)
const containerWidth = ref(0)
const containerHeight = ref(0)

useResizeObserver(scrollContainer, (entries) => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect

    containerWidth.value = width
    containerHeight.value = height
  }
})

</script>

<style lang="less">
.scroll-container {
  width: 100%;
  height: 100%;
  --scroll-width: calc(v-bind(containerWidth) * 1px);
  --scroll-height: calc(v-bind(containerHeight) * 1px);
}
.scroll-vertical {
  width: var(--scroll-height);
  height: var(--scroll-width);
  overflow: auto;
  position: relative;
  transform-origin: left top;
  transform: translateY(var(--scroll-height)) rotate(-90deg);
  &::-webkit-scrollbar {
    display: none;
  }
}
.scroll-horizontal {
  min-width: var(--scroll-width);
  height: var(--scroll-height);
  display: flex;
  align-items: center;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: var(--scroll-height);
  transform-origin: left top;
  transform: rotate(90deg);
}
.align-right {
  justify-content: flex-end;
}
</style>
