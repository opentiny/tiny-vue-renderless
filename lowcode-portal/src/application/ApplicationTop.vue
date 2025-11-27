<template>
  <div class="home-top">
    <div class="home-top-wrap">
      <div class="home-top-title">
        <div class="title">{{ title }}</div>
        <div class="sub-title">{{ subTitle }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '我的应用'
    },
    subTitle: {
      type: String,
      default: 'TinyEngine 前端可视化设计器致力于通过友好的用户交互提升业务的开发效率，欢迎一起来解锁~~'
    }
  }
}
</script>

<style lang="less" scoped>
.home-top {
  width: 100%;
  height: 250px;
  background-image: url('../assets/applicationBanner.jpg');
  .home-top-wrap {
    max-width: 1220px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .home-top-title {
      width: 460px;
      margin-top: 60px;

      .title {
        font-size: 36px;
        color: #191919;
        font-family: 'Microsoft YaHei';
      }
      .sub-title {
        width: 416px;
        font-size: 16px;
        line-height: 22px;
        color: #595959;
        font-family: 'Microsoft YaHei';
        margin-top: 16px;
      }
    }
  }
}
</style>
