<template>
  <div :class="{
    [state.wrapClass]: true,
    [`${state.wrapClass}-active`]: activated
  }">
    <div :class="`${state.wrapClass}-sub-title`">
      {{ subTitle }}
    </div>
    <div :class="`${state.wrapClass}-description`" v-if="!isMobile">
      <div v-for="(description, index) in descriptions" :key="index">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import useWindowSize from '@/tools/useWindowSize.js'


const props = defineProps({
  title: { type: String, default: '' },
  subTitle: { type: String, default: '' },
  descriptions: { type: Array, default: () => [] },
  activated: { type: Boolean, default: false }
})
const { isMobile } = useWindowSize()

const state = reactive({
  wrapClass: 'step-card'
})
</script>

<style lang="less" scoped>
@import '@/mixin.less';

.step-card {
  border: 1px solid rgb(240, 240, 240);
  border-radius: 12px;
  .pcPadding(16);

  &-active {
    border: 1px solid rgb(25, 25, 25);
  }

  &-title {
    color: rgb(89, 89, 89);
    .pcMargin(8, 0);
  }

  &-sub-title {
    font-weight: 600;
    color: rgb(25, 25, 25);
    font-weight: 600;
    .pcRem(line-height, 36);
    .pcRem(font-size, 18);
  }

  &-description {
    color: rgb(89, 89, 89);
    font-weight: 400;
    .pcMargin(8, 0, 0, 0);
    .pcRem(line-height, 28);
    .pcRem(font-size, 16);
  }

  @media screen and (max-width: @break-point) {
    .mobilePadding(14);

    &-sub-title {
      font-size: 14px;
      line-height: 18px;
    }

    &-description {
      font-size: 14px;
      line-height: 18px;
    }
  }
}
</style>
