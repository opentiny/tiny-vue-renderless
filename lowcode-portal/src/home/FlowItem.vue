<template>
  <div class="flow-item">
    <svg-icon :name="iconName" class="logo-svg fi-logo"></svg-icon>
    <div class="fi-title">{{ title }}</div>
    <div class="fi-des">{{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'tiny-logo'
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="less">
.flow-item {
  display: inline-block;
}
.fi-logo {
  font-size: 100px;
}
.fi-title {
  line-height: 40px;
  padding: 10px 0 10px 0;
  font-size: 20px;
  font-family: Microsoft YaHei, Microsoft YaHei-Normal;
  color: #191919;
  word-break: normal;
}
.fi-des {
  color: #8a8e99;
  line-height: 24px;
  text-align: left;
  font-size: 16px;
  max-width: 200px;
  padding-bottom: 70px;
}
</style>
