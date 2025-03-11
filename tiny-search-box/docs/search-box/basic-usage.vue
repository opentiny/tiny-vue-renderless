<script setup lang="ts">
import { ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { dataSource } from './data-source'

const tags = ref([])
</script>

<template>
  <tvp-search-box v-model="tags" :items="dataSource" />
</template>
