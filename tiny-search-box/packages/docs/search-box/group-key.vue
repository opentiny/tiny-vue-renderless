<script setup lang="ts">
import { reactive, ref } from 'vue'
import { data } from './group-key-data'

const tags = ref([])
const items = reactive(data)
</script>

<template>
  <tiny-search-box v-model="tags" :items="items" />
</template>
