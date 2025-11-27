<template>
  <div class="edit-detail-list-content">
    <div class="edit-detail-list-content-tool">
      <div class="edit-detail-list-content-tool-title">{{ title }}</div>
    </div>
    <div class="edit-detail-list-content-cardlist">
      <designer-common-card
        :data="data"
        :type="type"
        :isPageMock="isPageMock"
        :timeActive="timeActive"
        :imgStyle="{ height: '60px', width: '80px' }"
        @selectItem="(...args) => emit('selectItem', ...args)"
        @setVersion="(...args) => emit('setVersion', ...args)"
      ></designer-common-card>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import DesignerCommonCard from './DesignerCommonCard.vue'

const props = defineProps({
  timeActive: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: () => []
  },
  isPageMock: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['selectItem', 'setVersion'])
const title = computed(() => `选择${props.label}（单选）`)

</script>
