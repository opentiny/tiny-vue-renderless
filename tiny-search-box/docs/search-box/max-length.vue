<script setup lang="ts">
import { ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { Modal } from '@opentiny/vue'

const tags = ref([])
const maxlength = ref(8)
const dataSource = [
  {
    label: '名称',
    field: 'testName',
    replace: true,
    options: [
      {
        label: `不能超过${maxlength.value}个字符`
      }
    ]
  }
]

const handleExceed = (number) => {
  Modal.message({ message: `不能超过${number}个字符`, status: 'warning' })
}
</script>

<template>
  <tvp-search-box v-model="tags" :items="dataSource" :maxlength="maxlength" @exceed="handleExceed" />
</template>
