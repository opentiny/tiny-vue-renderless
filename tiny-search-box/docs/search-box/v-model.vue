<script setup lang="ts">
import { ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { dataSource } from './data-source'

const tags = ref([
  {
    field: 'ip',
    label: '个人IP地址',
    value: '192.168.66.88'
  },
  {
    field: 'testName',
    label: '名称',
    value: 'ecs-1',
    type: 'radio'
  }
])
</script>

<template>
  <tvp-search-box :items="dataSource" v-model="tags" default-field="ip" />
</template>
