<template>
  <div class="setting-layout">
    <div class="setting-layout-header">
      <icon-chevron-left-click class="myPlatform-create-icon" @click="back"></icon-chevron-left-click>
      <span v-for="(matched, idx) in route.matched" :key="idx">
        <router-link
          :replace="true"
          :to="matched.path"
          :class="['breadcrumb-link', { 'breadcrumb-link-last': idx === route.matched.length - 1 }]"
        >
          {{ matched.meta.breadcrumbsName }}
        </router-link>
        <span v-if="idx !== route.matched.length - 1" class="separator">/</span>
      </span>
    </div>
    <side-nav-layout :navData="navData"></side-nav-layout>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import router from '@/router'
import { iconChevronLeft } from '@opentiny/vue-icon'
import SideNavLayout from '@/common/components/SideNavLayout.vue'
const route = useRoute()
const IconChevronLeftClick = iconChevronLeft()

function back() {
  router.go(-1)
}

defineProps({
  name: {
    type: String,
    default: '应用名称'
  },
  icon: {
    type: [Object, String],
    default: 'icon-application'
  },
  navData: {
    type: Array,
    default: []
  }
})
</script>

<style lang="less" scoped>
.setting-layout {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
  box-sizing: border-box;
  overflow: hidden;
  .setting-layout-header {
    width: 100%;
    height: 52px;
    color: #000;
    background: #fff;
    border-bottom: 1px solid #f1f2f3;
    padding: 0 16px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    z-index: 9;
    .icon-wrap {
      width: 24px;
      height: 24px;
      font-size: 16px;
      margin-left: 16px;
      color: rgb(255, 255, 255);
      background-color: rgb(0, 137, 255);
      border-radius: 6px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name {
      margin-left: 12px;
    }
    .add-extension {
      margin-left: 12px;
      color: #526ecc;
      cursor: pointer;
    }
    .separator {
      margin: 0 6px;
    }
    .breadcrumb-link {
      color: #191919;
    }
    .breadcrumb-link-last {
      font-weight: bold;
    }
    .myPlatform-create-icon {
      cursor: pointer;
      color: #ccc;
      font-size: 18px;
    }
  }
  .setting-center {
    height: calc(100% - 52px);
  }
}
:deep(.container) {
  padding: 0 !important;
}
</style>
