<script setup>
const props = defineProps({
  title: String,
  img: String
})
</script>
<template>
  <div class="common-card">
    <div class="common-card-body">
      <div class="common-card-image"><img :src="props.img" /></div>
      <div class="common-card-info">
        <div class="common-card-title">
          <p class="common-card-title-text" :title="props.title">{{ props.title }}</p>
        </div>
        <div class="common-card-main">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
@import '@/mixin.less';
.common-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  cursor: pointer;
  width: 384px;
  background: #fff;
  transition: all 0.3s ease-out;
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
    transform: translateY(-10px);
  }
  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    background-size: cover;
  }
}
.common-card-info {
  padding: 24px 32px;
}
.common-card-title-text {
  font-size: 20px;
  margin-bottom: 16px;
  font-weight: bold;
  line-height: 1.5;
  word-break: break-all;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}
.common-card-main {
  font-size: 14px;
  color: #808080;
}

@media screen and (max-width: @break-point) {
  .common-card-title-text {
    font-size: 16px;
  }
}
</style>
