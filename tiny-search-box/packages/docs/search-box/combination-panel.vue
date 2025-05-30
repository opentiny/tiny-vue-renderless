<script setup lang="ts">
import { ref, reactive } from 'vue'
import { TinySearchBoxFirstLevelPanel, TinySearchBoxSecondLevelPanel } from '@opentiny/vue-search-box'
import { TinyInput } from '@opentiny/vue'
import { iconChevronLeft, iconSearch, } from '@opentiny/vue-icon'

const TinyIconChevronLeft = iconChevronLeft()
const TinyIconSearch = iconSearch()
const input1 = ref('')
const input2 = ref('')
const tags = ref([])
const items = reactive([
  {
    label: '名称',
    field: 'testName',
    type: 'radio',
    options: [
      {
        label: 'ecs-1'
      },
      {
        label: 'obs-2'
      },
      {
        label: 'vpc-1'
      },
      {
        label: 'evs-2'
      },
      {
        label: 'tms-1'
      }
    ]
  },
  {
    label: '可用地区',
    field: 'testRegion',
    type: 'checkbox',
    options: [
      {
        label: '华南区',
        id: '2-1'
      },
      {
        label: '华北区',
        id: '2-2'
      },
      {
        label: '西北区',
        id: '2-3'
      },
      {
        label: '西南区',
        id: '2-4'
      }
    ]
  }
])
</script>

<template>
  <tiny-search-box v-model="tags" :items="items">
    <!-- 一级自由组合面板 -->
    <template #first-panel="{ state, handleEvents }">
      <div class="slot-header">
        <tiny-input
          v-model="input1"
          placeholder="搜索筛选条件"
          :prefix-icon="TinyIconSearch"
          input-box-type="underline"
        ></tiny-input>
      </div>
      <TinySearchBoxFirstLevelPanel :state="state" @events="handleEvents" />
    </template>
    <!-- 二级自由组合面板，优先级高于type=custom -->
    <template #second-panel="{ state, pickerOptions, handleEvents, back }">
      <div class="slot-header">
        <TinyIconChevronLeft class="back-svg" @click="back" />
        <tiny-input
          v-model="input2"
          placeholder="输入关键字搜索"
          :prefix-icon="TinyIconSearch"
          input-box-type="underline"
        ></tiny-input>
      </div>
      <TinySearchBoxSecondLevelPanel :state="state" :picker-options="pickerOptions" @events="handleEvents" />
    </template>
  </tiny-search-box>
</template>

<style scoped>
.slot-header {
  padding: 8px 16px;
  display: flex;
  align-items: center;
}
.slot-header .back-svg {
  font-size: 24px;
  margin-right: 12px;
  fill: var(--tv-color-text);
}
</style>
