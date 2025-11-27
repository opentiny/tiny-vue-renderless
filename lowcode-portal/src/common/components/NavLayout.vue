<template>
  <ul class="setting-nav">
    <li
      v-for="nav in navData"
      :key="nav.id"
      :class="{ 'setting-nav-item': true, active: $route.name === nav.name || currentId === nav.id }"
      @click="$emit('select', nav)"
    >
      <component :is="nav.icon" v-if="nav.icon"></component>
      <div class="setting-nav-title">{{ nav.title }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    navData: {
      type: Array,
      default: []
    },
    currentId: {
      type: String,
      default: ''
    }
  },
  emits: ['select']
}
</script>

<style lang="less" scoped>
.setting-nav {
  height: 100%;
  width: 198px;
  padding-top: 20px;
  border-right: 1px solid #d9d9d9;
  box-sizing: border-box;
  .setting-nav-item {
    height: 48px;
    font-size: 14px;
    line-height: 48px;
    color: #191919;
    border-left: 2px solid #fff;
    cursor: pointer;
    .setting-nav-title {
      margin-left: 22px;
    }
  }
  .active {
    background-color: #f5f5f5;
    border-left: 2px solid #191919;
    color: #191919;
  }
}
</style>
