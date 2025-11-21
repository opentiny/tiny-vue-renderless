<template>
  <div class="common-banner" :class="{ 'has-anchor': props.hasAnchor }">
    <div class="common-banner-inner">
      <div class="common-banner-title">{{ props.title }}</div>
      <div class="common-banner-desc">
        {{ props.desc }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String
  },
  desc: {
    type: String
  },
  hasAnchor: {
    type: Boolean
  }
})
</script>
<style lang="less" scoped>
@import '@/mixin.less';
.common-banner {
  background: #f5f6f7;
  padding: 27px var(--tiny-main-container-padding-horizontal);

  &.has-anchor {
    .pcPadding(27, 80, 27, 160);
    .common-banner-inner {
      max-width: 1600px;
    }
  }
  &-inner {
    max-width: var(--tiny-main-container-width);
    margin: 0 auto;
  }

  &-title {
    font-size: 24px;
    font-weight: 600;
    color: #191919;
    line-height: 36px;
    margin-bottom: 8px;
  }

  &-desc {
    font-size: 14px;
    line-height: 22px;
    color: #595959;
  }
}
</style>
