<template>
  <div :class="['component-card', { active }]">
    <div class="component-card-header">
      <div class="component-card-header-wrap" @click="$emit('clickCard', step)">
        <span class="component-card-header-icon">
          <icon-delta-down v-if="active"></icon-delta-down>
          <icon-delta-right v-else></icon-delta-right>
        </span>
        <span>{{ title }}</span>
      </div>
    </div>
    <div v-show="active">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { IconDeltaDown, IconDeltaRight } from '@opentiny/vue-icon'

export default {
  components: {
    IconDeltaDown: IconDeltaDown(),
    IconDeltaRight: IconDeltaRight()
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    step: {
      type: [Number, String],
      default: 1
    },
    title: {
      type: String,
      default: '基础信息（必填）'
    }
  }
}
</script>
<style lang="less" scoped>
.component-card {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 60px;
  background: #ffffff;
  border-radius: 8px;
  padding: 20px 30px;
  .component-card-header-wrap {
    cursor: pointer;
    max-width: 160px;
    .tiny-svg {
      width: 10px;
      height: 10px;
      fill: #252b3a;
    }
    span {
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: Bold;
      color: #191919;
      margin-left: 8px;
    }
  }
}
.component-card.active {
  .component-card-header {
    height: 36px;
    border-bottom: 1px solid #dfe1e6;
    margin-bottom: 20px;
  }
}

:deep(.tiny-form--label-left.has-required .tiny-form-item__label) {
  padding: 0;
  font-size: 12px;
  color: #595959;
}
</style>
