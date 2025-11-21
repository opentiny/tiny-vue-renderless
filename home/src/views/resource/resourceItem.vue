<template>
  <div class="resource-item">
    <div class="resource-item-img">
      <img :src="img" alt="logo" />
    </div>
    <div class="resource-item-footer">
      <div class="resource-item-title" v-auto-tip>{{ title }}</div>
      <div class="resource-item-info">
        <div class="resource-item-update-time">更新时间 {{ updateTime }}</div>
        <a :href="link" target="_blank">
          <tiny-icon-download class="download-icon"></tiny-icon-download>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { iconDownload } from '@opentiny/vue-icon'
import { AutoTip as VAutoTip } from '@opentiny/vue-directive'
const TinyIconDownload = iconDownload()
const props = defineProps({
  title: {
    type: String
  },
  link: {
    type: String
  },
  updateTime: {
    type: String
  },
  img: {
    type: String
  }
})
</script>
<style lang="less" scoped>
.resource-item {
  overflow: hidden;
  border-radius: 8px;
  width: 348px;
  height: 230px;
  border: 1px solid rgb(240, 240, 240);
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
  &-img {
    height: 150px;
    background-size: cover;
    background-position: center;
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-height: 90%;
    }
  }
  &-footer {
    padding: 16px 24px;
  }
  &-title {
    font-size: 16px;
    color: #191919;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-info {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    align-items: center;
    a {
      fill: #808080;
      font-size: 16px;
    }
  }
  &-update-time {
    font-size: 12px;
    color: #808080;
  }
  .download-icon {
    width: 16px;
  }
}
</style>
