<template>
  <div v-if="relations.length" class="relations">
    <span v-for="relation in relations" :key="relation.id" class="relations-item">{{ relation.category_name }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  relations: Array
})
</script>

<style lang="less" scoped>
.relations {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  bottom: 0;
  z-index: 1;
  margin: 8px;
  gap: 4px;

  .relations-item {
    display: inline-block;
    background: rgba(255, 255, 255, 0.7);
    color: #595959;
    line-height: 20px;
    height: 20px;
    border-radius: 4px;
    font-size: 12px;
    padding: 0 10px;
  }
}
</style>
