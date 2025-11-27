<template>
  <div class="edit-detail-list-content">
    <div class="edit-detail-list-content-tool">
      <div class="edit-detail-list-content-tool-title">{{ title }}</div>
      <slot name="condition"></slot>
    </div>
    <div v-if="!isExperienceVersion" class="edit-detail-list-content-select">
      <div class="card-filters-item">
        <div class="card-filters-item-label">业务类型</div>
        <div class="card-filters-item-value">
          <div :class="['card-filters-value-item', { selected: selectedAll }]" @click="emit('filterAll')">全部</div>
          <div
            v-for="item in searchGroup"
            :key="item.name"
            :class="['card-filters-value-item', { selected: item.selected }]"
            @click="() => emit('getFilters', item.id)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="edit-detail-list-content-cardlist">
      <select-card-list v-bind="$attrs"></select-card-list>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, inject } from 'vue'
import SelectCardList from './SelectCardList'

const isExperienceVersion = inject('isExperienceVersion')
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  searchGroup: {
    type: Array,
    default: () => []
  },
  selectedAll: {
    type: Boolean,
    default: false
  },
  isPageMock: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['filterAll', 'getFilters'])

const title = computed(() => `选择${props.label}（单选）`)
</script>
<style lang="less" scoped>
.card-filters-value-item {
  padding: 0 8px;
}
</style>
