<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { data } from './group-key-data'

const tags = ref([])
const items = reactive(data)
</script>

<template>
  <tvp-search-box v-model="tags" :items="items" />
</template>
