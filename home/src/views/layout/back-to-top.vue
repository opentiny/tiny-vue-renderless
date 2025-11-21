<script setup>
import { watch } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  clickEvent: {
    type: Function,
    default: () => () => {}
  }
})
</script>

<template>
  <div class="back-top" @click="props.clickEvent" v-show="props.visible">
    <div class="arrow"></div>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';
.back-top {
  width: 66px;
  height: 66px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  position: fixed;
  bottom: 100px;
  right: 10px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.18);
    .arrow {
      border: 2px solid #191919;
      border-left-color: transparent;
      border-top-color: transparent;
    }
  }
  @media (max-width: 1279px) {
    bottom: 72px;
    right: 40px;
  }
  @media screen and (max-width: @break-point) {
    width: 32px;
    height: 32px;
    .arrow {
      width: 8px;
      height: 8px;
    }
  }
}

.arrow {
  border: 1px solid #191919;
  width: 10px;
  height: 10px;
  border-left-color: transparent;
  border-top-color: transparent;
  transform: rotate(-135deg);
  transform-origin: 50% 50%;
  margin-top: 5px;
}
</style>
