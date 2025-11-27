<template>
  <div class="edit-detail-list-content">
    <div class="edit-detail-list-content-cardlist">
      <div class="tool-card">
        <tool-card v-bind="$attrs"></tool-card>
        <div class="card-list-change">
          <div class="card-list-condition">
            <slot name="condition"></slot>
          </div>
          <designer-common-card
            v-bind="$attrs"
            layout="tool-list-card"
            :showVersion="true"
            :imgStyle="{ height: '52px', width: '52px' }"
          ></designer-common-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolCard from './ToolCard.vue'
import DesignerCommonCard from './DesignerCommonCard.vue'
</script>

<style lang="less" scoped>
.card-list-condition {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>
