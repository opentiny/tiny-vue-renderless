<template>
  <div class="layout-main">
    <div class="layout-aside">
      <div class="menu-wrapper" id="menuContainer">
        <Menu />
      </div>
    </div>
    <div class="layout-pagelayout">
      <div class="doc-wrapper">
        <div class="markdown-container">
          <PageLayout />
          <videoSwitch></videoSwitch>
        </div>
        <div class="layout-anchor">
          <Anchor />
        </div>
      </div>
      <div id="footer"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick } from '@vue/runtime-core';
  import Menu from '@src/components/menu/index.vue';
  import Anchor from '@src/components/anchor/index.vue';
  import videoSwitch from '@src/components/video/videoSwitch.vue';
  import PageLayout from '@src/layout/page-layout.vue';

  // 注入页头页脚
  nextTick(() => {
    const common = new (window as any).TDCommon(['#header', '#footer'], {
      menuCollapse: {
        useCollapse: true, // 启用1024隐藏菜单
        menuId: '#menuContainer', // 菜单dom id
      },
    });
    common.renderHeader();
    common.renderFooter();
  });
</script>

<style scoped lang="less">
  .layout-main {
    position: relative;
    display: flex;
    justify-content: flex-end;
    margin-top: 60px;
  }

  .layout-aside {
    width: 250px;
  }

  .menu-wrapper {
    position: fixed;
    left: 0;
    z-index: 100;
    width: 250px;
    height: 100vh;
    padding: 10px 0;
    overflow-y: auto;
    background: #ffff;
    box-shadow: 0 4px 12px 0 rgb(0 0 0 / 10%);
  }

  .menu-wrapper::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }

  .menu-wrapper:hover::-webkit-scrollbar-thumb {
    background-color: #adb0b8;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #0004;
  }

  .menu-wrapper:hover ::-webkit-scrollbar-track {
    background-color: #adb0b8;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #0004;
  }

  :deep(.tiny-tree) {
    min-height: 700px;
  }

  .layout-anchor {
    position: sticky;
    top: 100px;
    right: 0;
    z-index: 99;
    box-sizing: border-box;
    width: 15%;
    height: fit-content;
    padding: 8px 8px 8px 4px;
  }

  .image {
    position: absolute;
    right: 21%;
  }

  .layout-pagelayout {
    flex-basis: calc(100% - 250px);
    flex-grow: 0;
    flex-shrink: 0;
    max-width: calc(100% - 250px);
  }

  .doc-wrapper {
    position: relative;
    display: flex;
    align-content: stretch;
    width: 100%;
    min-height: 500px;
  }

  .markdown-container {
    flex: 0 0 85%;
    box-sizing: border-box;
    max-width: 85%;
    padding: 100px 30px 0 30px;
    background-image: url(/src/assets/images/title.png);
    background-repeat: no-repeat;
    background-position: right -60px;
    background-origin: content-box;
  }

  @media (max-width: 1279px) {
    .layout-anchor {
      display: none;
    }

    .doc-wrapper {
      display: block;
    }

    .markdown-container {
      max-width: 100%;
      padding: 5%;
      background-position: right -25px;
      background-size: 170px auto;
    }
  }

  @media (max-width: 1023px) {
    .layout-aside {
      width: 0;
    }

    .layout-pagelayout {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
</style>
