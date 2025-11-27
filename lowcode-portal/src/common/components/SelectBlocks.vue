<template>
  <div class="edit-detail-list-content">
    <div class="edit-detail-list-content-tool">
      <div class="edit-detail-list-content-tool-title">{{ title }}</div>
      <slot name="condition"></slot>
    </div>
    <div class="edit-detail-list-content-cardlist">
      <select-card-list
        :data="data"
        :type="type"
        :label="label"
        :isPageMock="isPageMock"
        :timeActive="timeActive"
        @selectItem="(...args) => emit('selectItem', ...args)"
        @setVersion="(...args) => emit('setVersion', ...args)"
      ></select-card-list>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import SelectCardList from './SelectCardList'

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
  allData: {
    type: Array,
    default: () => []
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

const title = computed(() => `添加${props.label}（共${props.allData.length}个）`)

</script>
