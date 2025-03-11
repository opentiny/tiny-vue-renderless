<script setup lang="ts">
import { ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { dataSource } from './data-source'

const items = dataSource

const tags = ref([])
</script>

<template>
  <tvp-search-box v-model="tags" :items="items" panel-max-height="100px" />
</template>
