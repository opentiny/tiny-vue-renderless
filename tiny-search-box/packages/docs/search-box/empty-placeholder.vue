<script setup lang="ts">
import { ref } from 'vue'
import { dataSource } from './data-source'

const tags = ref([])
</script>

<template>
  <tiny-search-box :items="dataSource" v-model="tags" empty-placeholder="默认自动识别，识别不出按照关键字搜索" />
</template>
