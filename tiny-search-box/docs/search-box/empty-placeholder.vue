<script setup lang="ts">
import { ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { dataSource } from './data-source'

const tags = ref([])
</script>

<template>
  <tvp-search-box :items="dataSource" v-model="tags" empty-placeholder="默认自动识别，识别不出按照关键字搜索" />
</template>
