<template>
  <div class="breath-tip"></div>
  <div class="breath-tip-triangle"></div>
  <div class="breath-tip-content">
    <slot></slot>
    <icon-close @click="$emit('close')"></icon-close>
  </div>
</template>
<script>
import { IconClose } from '@opentiny/vue-icon'
import { onMounted } from 'vue'

export default {
  components: {
    IconClose: IconClose()
  },
  emits: ['close'],
  setup(props, { emit }) {
    onMounted(() => {
      setTimeout(() => {
        emit('close')
      }, 10000)
    })
  }
}
</script>
<style lang="less" scoped>
.breath-tip {
  position: absolute;
  top: calc(50% - 12px);
  left: 16px;
  pointer-events: none;
  width: 18px;
  height: 18px;
  border: 4px solid #5e7ce0;
  border-radius: 50%;
  opacity: 0.1;
  overflow: hidden;
  animation-name: breath;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
@keyframes breath {
  from {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0.1;
  }
}
.breath-tip-triangle {
  position: absolute;
  top: 54px;
  left: 22px;
  height: 12px;
  width: 12px;
  border-top: 1px solid #beccfa;
  border-right: 1px solid #beccfa;
  background-color: #ebf6ff;
  transform: rotate(-45deg);
  z-index: 2;
}
.breath-tip-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 60px;
  left: -120px;
  width: 248px;
  background: #ebf6ff;
  border: 1px solid #beccfa;
  padding: 12px 18px;
  font-size: 12px;
  font-family: Microsoft YaHei, Microsoft YaHei-Normal;
  color: #575d6c;
  text-shadow: 0px 3px 6px 0px rgba(94, 124, 224, 0.43);
  .tiny-svg {
    cursor: pointer;
  }
}
</style>
