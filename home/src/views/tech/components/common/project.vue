<template>
  <div :class="props.cardContainer">
    <!-- 项目卡片 -->
    <div :class="props.cardOther">
      <slot name="card-other"></slot>
    </div>
    <!-- 标题 -->
    <div :class="props.cardTitle">
      <slot name="card-title"></slot>
    </div>
    <!-- 内容 -->
    <div :class="props.cardContent">
      <slot name="card-content"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../../style/current.less'

const props = defineProps({
  cardContainer: {
    type: String,
    default: ''
  },
  cardOther: {
    type: String,
    default: ''
  },
  cardTitle: {
    type: String,
    default: ''
  },
  cardContent: {
    type: String,
    default: ''
  }
})
</script>
