<template>
  <div class="error-cont">
    <TinyIconError class="error-icon" />
    <TinyButton @click="$emit('retry')" round plain type="text">加载出错，点击重试</TinyButton>
  </div>
</template>
<script setup lang="ts">
import { Button as TinyButton } from '@opentiny/vue';
import { iconError } from '@opentiny/vue-icon';
const TinyIconError = iconError();
</script>

<style lang="less" scoped>
.error-cont {
  margin-top: 20%;
  text-align: center;
  .error-icon {
    fill: #c7000b;
    margin-right: 6px;
  }
  ::v-deep(.tiny-button) {
    &.tiny-button--text:not([disabled]) {
      color: var(--ti-actionmenu-item-text-color);
      font-size: var(--ti-common-font-size-1);
    }
  }
}
</style>
