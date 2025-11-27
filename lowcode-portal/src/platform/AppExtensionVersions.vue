<template>
  <!-- mousedown.stop 是为了阻止点击冒泡，直接将 version 列表收起，而无法触发当前列表的点击事件 -->
  <ul class="app-extension-versions" @mousedown.stop>
    <li
      v-for="item in list.versions"
      :key="item.version"
      :class="['versions-item', { selected: item.selected }]"
      @click="$emit('selectVersion', item)"
    >
      <span class="version">{{ item.version }}</span>
      <tiny-tooltip effect="dark" :content="item.description" placement="top-start">
        <span class="description">{{ item.description }}</span>
      </tiny-tooltip>
    </li>
  </ul>
</template>

<script>
import { reactive } from 'vue'
import { Tooltip } from '@opentiny/vue'

export default {
  components: { TinyTooltip: Tooltip },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  emits: ['selectVersion'],
  setup(props, { emit }) {
    const state = reactive({
      boxVisibility: props.boxVisibility
    })

    return {
      state
    }
  }
}
</script>
<style lang="less" scoped>
.app-extension-versions {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 8px 0;
  background: #fff;
  .versions-item {
    box-sizing: border-box;
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    .version {
      float: left;
      margin-left: 12px;
      color: #252b3a;
    }
    .description {
      float: right;
      margin-left: 12px;
      color: #adb0b8;
      width: 220px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .versions-item:hover,
  .selected {
    background: #f2f5fc;
  }
}
</style>
