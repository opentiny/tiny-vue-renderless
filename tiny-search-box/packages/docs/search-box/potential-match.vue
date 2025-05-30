<script setup lang="ts">
import { ref } from 'vue'
import { dataSource } from './data-source'

const items = dataSource

const tags = ref([])

const asyncObtain = (keyword: string) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: '名称',
          field: 'testName',
          value: keyword
        },
        {
          label: '可用区',
          field: 'testRegion',
          value: keyword,
          type: 'checkbox'
        }
      ])
    }, 3000)
  })

const potentialOptions = ref({
  async getMatchList(keyword: string) {
    let result = []
    if (keyword === '名称1') {
      return result
    }
    result = await asyncObtain(keyword)

    return result
  }
})
</script>

<template>
  <tiny-search-box :items="items" v-model="tags" :potential-options="potentialOptions" />
</template>
