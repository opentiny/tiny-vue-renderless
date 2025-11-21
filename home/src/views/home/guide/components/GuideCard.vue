<template>
  <div :class="state.wrapClass">
    <div :class="`${state.wrapClass}-title`">
      <span>{{ isMobile ? '' : guide.title }}</span>
      <slot name="operation"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import useWindowSize from '@/tools/useWindowSize.js'
const { isMobile } = useWindowSize()

const props = defineProps({
  guide: { type: Object, default: () => ({}) }
})

const state = reactive({
  wrapClass: 'guide-card'
})

</script>

<style lang="less" scoped>
@import '@/mixin.less';

.guide-card {
  border: 1px solid rgb(25, 25, 25);
  border-radius: 12px;
  background: rgb(255, 255, 255);
  .pcPadding(24);

  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    border-bottom: 1px solid rgb(219, 219, 219);
    .pcRem(line-height, 36);
    .pcRem(font-size, 16);
    .pcRem(margin-bottom, 8);
    .pcRem(padding-bottom, 8);
  }

  @media screen and (max-width: @break-point) {
    &-title {
      font-size: 14px;
    }
  }
}
</style>
