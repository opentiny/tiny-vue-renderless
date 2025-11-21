<template>
  <div>
    <div :class="cardContainer" :style="bg">
      <div :class="cardLeft"><slot name="left"></slot></div>
      <div :class="cardRight">
        <div :class="cardContent">
          <slot name="right-content"></slot>
        </div>
        <div :class="cardDesc">
          <slot name="right-desc"></slot>
        </div>
        <div :class="cardInfo">
          <slot name="right-info"></slot>
        </div>
      </div>
      <div>
        <slot name="top"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import '../../style/current.less'

const props = defineProps({
  bgImg: {
    type: Object,
    default: {}
  },
  cardContainer: {
    type: String,
    default: ''
  },
  cardLeft: {
    type: String,
    default: ''
  },
  cardRight: {
    type: String,
    default: ''
  },
  cardContent: {
    type: String,
    default: ''
  },
  cardDesc: {
    type: String,
    default: ''
  },
  cardInfo: {
    type: String,
    default: ''
  }
})

const bg = props.bgImg
</script>
