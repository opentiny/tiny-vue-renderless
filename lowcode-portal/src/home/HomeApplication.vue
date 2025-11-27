<template>
  <div class="home-application">
    <div class="title">搭建应用，轻而易举</div>
    <div class="description">简单易用的可视化开发模式，快速搭建支持多终端的企业应用</div>
    <div class="content">
      <img src="/img/application.png" alt="" />
      <ul>
        <i class="line"></i>
        <li><i></i>丰富多样的组件库、通过拖、拉、拽形成各类业务表单</li>
        <li><i></i>属性/样式，为您提供可配置化参数</li>
        <li><i></i>提供大量实用的插件，系统自动识别代码类别</li>
        <li><i></i>应用快速落地，帮您提升交付能力</li>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home-application {
  text-align: center;
  width: 100%;
  padding: 70px 0;
  .title {
    font-size: 24px;
    line-height: 24px;
    font-weight: 500;
  }

  .description {
    font-size: 16px;
    line-height: 18px;
    color: rgb(160, 156, 156);
    margin-top: 12px;
    margin-bottom: 40px;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 813px;
      margin-right: 43px;
    }

    ul {
      height: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: left;
      position: relative;
      li {
        font-size: 14px;
        color: #adb0b8;
        padding-left: 12px;
        position: relative;
        i {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #adb0b8;
          position: absolute;
          left: -3px;
          top: 3px;
        }
      }
      .line {
        height: 203px;
        width: 1px;
        border-left: 1px dashed #ccc;
        position: absolute;
        left: 0px;
        top: 3px;
      }
    }
  }
}
</style>
