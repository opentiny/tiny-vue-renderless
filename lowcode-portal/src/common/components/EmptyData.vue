<template>
  <div class="empty-data-wrap">
    <div class="empty-data-content">
      <img :src="emptyImg" />
      <p v-if="description">{{ description }}</p>
      <p v-if="subDdescription">{{ subDdescription }}</p>
    </div>
  </div>
</template>

<script>
import emptyImg from '../../assets/emptyImgNew.svg'

export default {
  props: {
    description: {
      type: String,
      default: '暂无数据'
    },
    subDdescription: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {
      emptyImg
    }
  }
}
</script>

<style lang="less" scoped>
.empty-data-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  text-align: center;
  .empty-data-content {
    margin: auto auto;
    color: #adb0b8;
    img {
      width: 80px;
    }
    p {
      font-size: 14px;
      color: #808080;
      margin: 0;
    }
  }
}
</style>
