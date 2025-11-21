<template>
  <div class="resource">
    <common-banner
      title="资源"
      desc="这里提供 Cloud Design System 相关的设计资源和设计工具的下载，更多设计资源正在整理和完善中，欢迎使用。"
    ></common-banner>
    <div class="resource-container">
      <div class="resource-blcok">
        <div class="resource-block-title">设计资源</div>
        <div class="resource-items-box">
          <resource-item v-for="(item, index) in designResource" :key="index" v-bind="item"></resource-item>
        </div>
      </div>
      <!-- <div class="resource-blcok">
        <div class="resource-block-title">图标资源</div>
        <div class="resource-items-box">
          <resource-item v-for="(item, index) in iconResource" :key="index" v-bind="item"></resource-item>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="js">
import { effectScope, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { currentMenus } from '@/shared/menus';
import { searchMenuItem, $pub } from '@/tools';
import CommonBanner from '@/shared/components/common-banner.vue';
import ResourceItem from './resourceItem.vue';

const menuSearchValue = ref(null);
const displayMenus = ref([]);

const designResource = [
  {
    title: '桌面端Sketch组件库资源',
    updateTime: '2024-08-08 15:34',
    img: $pub('images/resource-pc.svg'),
    link: 'https://res.hc-cdn.com/tinyui-design-common/1.0.5.20240823150427/assets/OpenTinyUI.sketch'
  }
]

const iconResource = [
  {
    title: '控制台系统图标（216）',
    updateTime: '2024-08-08 15:34',
    img: 'https://gw.alipayobjects.com/zos/basement_prod/a9dc586a-fe0a-4c7d-ab4f-f5ed779b963d.svg',
    link: 'https://gw.alipayobjects.com/os/bmw-prod/704968a5-2641-484e-9f65-c2735b2c0287.sketch'
  },
  {
    title: '产品服务图标-面性（216）',
    updateTime: '2024-08-08 15:34',
    img: 'https://gw.alipayobjects.com/zos/basement_prod/a9dc586a-fe0a-4c7d-ab4f-f5ed779b963d.svg',
    link: 'https://gw.alipayobjects.com/os/bmw-prod/704968a5-2641-484e-9f65-c2735b2c0287.sketch'
  },
  {
    title: '产品服务图标-面性（216）',
    updateTime: '2024-08-08 15:34',
    img: 'https://gw.alipayobjects.com/zos/basement_prod/a9dc586a-fe0a-4c7d-ab4f-f5ed779b963d.svg',
    link: 'https://gw.alipayobjects.com/os/bmw-prod/704968a5-2641-484e-9f65-c2735b2c0287.sketch'
  },
  {
    title: '产品服务图标-面性（216）',
    updateTime: '2024-08-08 15:34',
    img: 'https://gw.alipayobjects.com/zos/basement_prod/a9dc586a-fe0a-4c7d-ab4f-f5ed779b963d.svg',
    link: 'https://gw.alipayobjects.com/os/bmw-prod/704968a5-2641-484e-9f65-c2735b2c0287.sketch'
  },
  {
    title: '产品服务图标-面性（216）',
    updateTime: '2024-08-08 15:34',
    img: 'https://gw.alipayobjects.com/zos/basement_prod/a9dc586a-fe0a-4c7d-ab4f-f5ed779b963d.svg',
    link: 'https://gw.alipayobjects.com/os/bmw-prod/704968a5-2641-484e-9f65-c2735b2c0287.sketch'
  },
]



const scope = effectScope();
onMounted(() => {
  scope.run(() => {
    watch(
        () => [currentMenus.value, menuSearchValue.value],
        () => {
          const resourceMenuIndex = Math.max(currentMenus.value.findIndex(item => item.label === '总览') + 1, 1);
          displayMenus.value = searchMenuItem(currentMenus.value?.slice(resourceMenuIndex), menuSearchValue.value);
        },
        { immediate: true }
    );
  });
});
onBeforeUnmount(() => {
  scope.stop();
});
</script>
<style lang="less" scoped>
.resource {
  &-container {
    max-width: var(--tiny-main-container-width);
    margin: 0 auto;
    padding-bottom: 130px;
  }
  &-block-title {
    font-size: 24px;
    color: #191919;
    font-weight: bold;
    line-height: 36px;
    margin: 48px 0 16px 0;
  }
  &-items-box {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
}
</style>
