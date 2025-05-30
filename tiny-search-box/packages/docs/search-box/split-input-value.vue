<script setup lang="ts">
import { ref } from 'vue'
import { dataSource } from './data-source'

const items = dataSource

const tags = ref([])
</script>

<template>
  <!-- 输入：“地区1|地区2|地区3” 则生成三个标签 -->
  <tiny-search-box v-model="tags" :items="items" split-input-value="|" />
</template>
