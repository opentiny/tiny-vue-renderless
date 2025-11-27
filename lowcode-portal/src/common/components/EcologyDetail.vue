<template>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :title="editFlag ? '编辑' : '查看详情'"
    width="700px"
    @closed="$emit('cancel')"
  >
    <tiny-tabs v-model="state.activeName">
      <tiny-tab-item title="基础信息" name="base">
        <slot name="base"></slot>
      </tiny-tab-item>
      <tiny-tab-item v-if="version" title="版本列表" name="version">
        <slot name="version"></slot>
      </tiny-tab-item>
    </tiny-tabs>
    <template v-if="editFlag" #footer>
      <tiny-button type="danger" @click="$emit('update', state.activeName)"> 确 定 </tiny-button>
      <tiny-button @click="$emit('cancel')">取 消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch } from 'vue'
import { Button, DialogBox, Tabs, TabItem } from '@opentiny/vue'
export default {
  components: {
    TinyDialogBox: DialogBox,
    TinyTabs: Tabs,
    TinyTabItem: TabItem,
    TinyButton: Button
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editFlag: {
      type: Boolean,
      default: false
    },
    version: {
      type: Boolean,
      default: true
    }
  },
  emits: ['cancel', 'update'],
  setup(props, { emit }) {
    const state = reactive({
      boxVisibility: props.visible,
      activeName: 'base'
    })

    watch(
      () => props.visible,
      (value) => {
        state.boxVisibility = value
      }
    )

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.tiny-tabs__content) {
  margin: 20px 0 32px;

  .release-button {
    margin-bottom: 20px;
  }
}
</style>
