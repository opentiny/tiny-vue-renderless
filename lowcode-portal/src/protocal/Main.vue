<template>
  <div class="setting-center">
    <div id="sideNavLayout" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="less" scoped>
.setting-center {
  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
}
</style>
