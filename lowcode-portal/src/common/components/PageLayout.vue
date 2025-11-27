<template>
  <div :class="['page-layout', { dark: dark }]">
    <slot name="header"></slot>
    <div class="page-layout-container">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="page-layout-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.page-layout {
  position: relative;
  .page-layout-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1300px;
    align-items: flex-start;
    margin: 0 auto;
    background: #fff;
  }
  .page-layout-footer {
    position: fixed;
    display: flex;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    padding: 20px;
  }
  &.dark {
    background-color: #f2f5fc;
    .page-layout-container {
      background-color: #f2f5fc;
    }
  }
}

@media screen and (min-width: 1300px) {
  .page-layout {
    .page-layout-container {
      width: 1300px;
    }
  }
}

@media screen and (min-width: 500px) and (max-width: 1300px) {
  .page-layout {
    .page-layout-container {
      padding: 0 24px;
    }
  }
}
</style>
