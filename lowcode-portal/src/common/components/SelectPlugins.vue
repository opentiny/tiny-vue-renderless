<template>
  <div class="edit-detail-list-content">
    <div class="edit-detail-list-content-cardlist">
      <div class="plugin-list">
        <plugin-card v-bind="$attrs"></plugin-card>
        <div class="plugin-list-change">
          <div class="plugin-list-condition">
            <slot name="condition"></slot>
          </div>
          <designer-common-card v-bind="$attrs" layout="plugin-list-card" :showVersion="true"></designer-common-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PluginCard from './PluginCard.vue'
import DesignerCommonCard from './DesignerCommonCard.vue'
</script>

<style lang="less" scoped>
.edit-detail-list-content {
  flex: 1;
  &-cardlist {
    height: 100%;
    .plugin-list {
      height: 100%;
      .plugin-list-change {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        .plugin-list-condition {
          display: flex;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
