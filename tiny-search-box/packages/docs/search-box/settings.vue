<script setup lang="ts">
import { ref } from 'vue'
import { dataSource } from './data-source'

const tags = ref([])
const defaultField = ref('testRegion')
</script>

<template>
  <tiny-search-box v-model="tags" :default-field="defaultField" :items="dataSource" />
</template>
