<script setup lang="ts">
import { ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { dataSource } from './data-source'

const tags = ref([])
const defaultField = ref('testRegion')
</script>

<template>
  <tvp-search-box v-model="tags" :default-field="defaultField" :items="dataSource" />
</template>
