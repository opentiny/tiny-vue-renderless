<script setup lang="ts">
import { ref } from 'vue'
import { dataSource } from './data-source'

const tags = ref([])
const handleHelp = () => {
  console.log('Help Event')
}
</script>

<template>
  <tiny-search-box class="mb10" v-model="tags" :items="dataSource" :show-help="false" @help="handleHelp" />
  <tiny-search-box v-model="tags" :items="dataSource" @help="handleHelp" />
</template>
