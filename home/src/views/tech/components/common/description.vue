<template>
  <div :class="props.descriptionContainer">
    <div :class="props.infoContainer">
      <div :class="props.title">
        <slot name="title"></slot>
      </div>
      <div :class="props.content">
        <slot name="content"></slot>
      </div>
      <div :class="props.instruct">
        <slot name="instruct"></slot>
      </div>
    </div>
    <div :class="props.otherContainer">
      <div :class="props.other">
        <slot name="other"></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  descriptionContainer: {
    type: String,
    default: ''
  },
  infoContainer: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  instruct: {
    type: String,
    default: ''
  },
  otherContainer: {
    type: String,
    default: ''
  },
  other: {
    type: String,
    default: ''
  }
})
</script>
