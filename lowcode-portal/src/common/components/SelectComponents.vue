<template>
  <div class="edit-detail-list-content">
    <div class="edit-detail-list-content-tool">
      <div class="edit-detail-list-content-tool-title">{{ title }}</div>
      <slot name="condition"></slot>
    </div>
    <div class="edit-detail-list-content-cardlist">
      <designer-common-card v-bind="$attrs"></designer-common-card>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import DesignerCommonCard from './DesignerCommonCard.vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  allData: {
    type: Array,
    default: () => []
  }
})

const title = computed(() => `添加${props.label}（共${props.allData.length}个）`)
</script>
