<template>
  <div class="material-center">
    <tiny-tabs v-model="state.activeName" @click="tabClick">
      <tiny-tab-item title="物料包" name="allMaterial" lazy>
        <my-material></my-material>
      </tiny-tab-item>
      <tiny-tab-item title="组件库" name="allComponentLib" lazy>
        <my-component-lib></my-component-lib>
      </tiny-tab-item>
      <tiny-tab-item title="区块" name="allBlock" lazy>
        <my-blocks></my-blocks>
      </tiny-tab-item>
    </tiny-tabs>
  </div>
</template>

<script lang="jsx">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tabs, TabItem } from '@opentiny/vue'

import MyBlocks from './MyBlocks.vue'
import MyComponentLib from './MyComponentLib.vue'
import MyMaterial from './MyMaterial.vue'

export default {
  components: {
    TinyTabs: Tabs,
    TinyTabItem: TabItem,
    MyBlocks,
    MyComponentLib,
    MyMaterial
  },
  setup() {
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      activeName: route.params?.activeName || 'allMaterial'
    })

    const tabClick = (tab) => {
      router.push(`/ecosystem/material/${tab.name}`)
    }

    return {
      state,
      tabClick
    }
  }
}
</script>

<style lang="less" scoped>
.material-center {
  position: relative;
  width: 100%;
  margin: 0 auto;

  :deep(.tiny-tabs__content) {
    padding: 0;
  }
  :deep(.tiny-tabs__header .tiny-tabs__nav-wrap::after) {
    height: 0;
  }
  :deep(.tiny-tabs__item) {
    font-size: 14px;
  }
  :deep(.card-filters) {
    margin-bottom: 20px;
  }
  :deep(.tiny-tabs__nav.is-show-active-bar .tiny-tabs__item.is-active) {
    color: #191919;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 3px solid #191919;
  }
  :deep(.tiny-tabs__nav-scroll) {
    border-bottom: 1px solid #dfe1e6;
  }
}
</style>
