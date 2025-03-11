<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'

const tags = ref([])
const items = reactive([
  {
    label: '可用地区',
    field: 'testRegion',
    type: 'checkbox',
    mergeTag: true, // 通过此属性设置多选标签合并为一个标签
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
  },
  {
    label: '状态',
    type: 'checkbox',
    field: 'status',
    mergeTag: false, // 不合并
    options: [
      {
        label: '运行中'
      },
      {
        label: '已关机'
      },
      {
        label: '已注销'
      }
    ]
  }
])

const onChange = (newFilters, oldFilters) => {
  console.log('changeEvent:', newFilters, oldFilters)
}
</script>

<template>
  <tvp-search-box v-model="tags" :items="items" @change="onChange" />
</template>
