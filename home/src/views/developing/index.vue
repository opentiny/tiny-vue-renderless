<template>
  <div class="dev-root">
    <div class="dev-img w120 h120"></div>
    <label class="des-title mt16">页面搭建中</label>
    <label class="des mt8"> {{ description }} </label>
  </div>
</template>

<script setup>
const { description } = defineProps({
  description: {
    type: String,
    default: '',
  },
});
</script>

<style lang="less" scoped>
.dev-root {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  .dev-img {
    background: url('@/assets/images/page-developing.svg') no-repeat;
  }
  .des-title {
    height: 36px;
    font-size: 24px;
    font-family: Lantinghei SC, Lantinghei SC-Semibold;
    font-weight: 600;
    color: #101010;
    line-height: 36px;
  }
  .des {
    height: 28px;
    font-size: 18px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: center;
    color: #595959;
    line-height: 28px;
  }
}
</style>
