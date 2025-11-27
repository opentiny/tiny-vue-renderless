<template>
  <div class="flow-bar">
    <div class="flow-content">
      <div class="title">开发流程</div>
      <div class="items">
        <div class="item">
          <flow-item
            iconName="join-org"
            title="加入组织"
            description="申请创建自己的组织或加入已有的组织，就可以定制可视化设计器和应用"
          ></flow-item>
          <svg-icon name="arrow" class="logo-svg"></svg-icon>
        </div>
        <div class="item">
          <flow-item
            iconName="create-material"
            title="创建物料资产包"
            description="物料是页面搭建的原料，可分为组件、区块，可以定制自己想要的物料"
          ></flow-item>
          <svg-icon name="arrow" class="logo-svg"></svg-icon>
        </div>
        <div class="item">
          <flow-item
            iconName="create-platform"
            title="创建可视化设计器"
            description="根据不同需求定制设计器的物料资产包、主题、工具栏、插件栏和DSL"
          ></flow-item>
          <svg-icon name="arrow" class="logo-svg"></svg-icon>
        </div>
        <div class="item">
          <flow-item iconName="create-app" title="创建应用" description="创建应用来实现不同的业务场景"></flow-item>
          <svg-icon name="arrow" class="logo-svg"></svg-icon>
        </div>
        <div class="item">
          <flow-item
            iconName="create-web"
            title="可视化搭建页面"
            description="现在可以使用创建好的应用来进行页面的搭建了"
          ></flow-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlowItem from './FlowItem.vue'

export default {
  components: {
    FlowItem
  }
}
</script>

<style lang="less" scoped>
.flow-bar {
  width: 100%;
  background: #f2f6fa;
  text-align: center;
  .flow-content {
    width: 100%;
    max-width: 1360px;
    padding: 50px 0;
    margin: 0 auto;
  }
  .title {
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-size: 36px;
    color: #191919;
    font-weight: 600;
    padding: 50px;
  }
  .items {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .item {
    box-sizing: border-box;
    align-items: center;
    margin-right: 70px;
  }
  .item:last-child {
    margin-right: 0;
  }
  .logo-svg {
    font-size: 70px;
    overflow: visible;
    color: #dfe1e6;
    height: 100px;
    position: absolute;
    top: 102px;
  }
  :deep(.flow-item) {
    margin: 20px;
  }
}
</style>
