<template>
  <div class="setting-center">
    <div v-show="isShowNav" class="nav">
      <nav-layout :navData="navData" @select="navItemClick"></nav-layout>
    </div>
    <div id="sideNavLayout" class="content">
      <div :class="['container', { dark: dark }]">
        <router-view></router-view>
      </div>
      <right-nav-help-doc></right-nav-help-doc>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavLayout from '@/common/components/NavLayout.vue'
import RightNavHelpDoc from './RightNavHelpDoc.vue'

export default {
  components: {
    NavLayout,
    RightNavHelpDoc
  },
  props: {
    navData: {
      type: Array,
      default: []
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const router = useRouter()
    const isShowNav = ref(true)

    const navItemClick = (item) => {
      router.push({
        name: item.name
      })

      emit('select', item)
    }

    watch(
      () => router.currentRoute.value.name,
      () => {
        isShowNav.value = router.currentRoute.value.name !== 'createMaterial'
      },
      { immediate: true }
    )

    return {
      navItemClick,
      router,
      isShowNav
    }
  }
}
</script>

<style lang="less" scoped>
.setting-center {
  height: 100%;
  display: flex;
  .nav {
    width: 200px;
    background-color: #fff;
  }
  .content {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    overflow-y: auto;
    position: relative;
    display: flex;

    .container {
      background: #fff;
      margin: 20px;
      padding: 30px 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      box-sizing: border-box;
      border-radius: 8px;
      overflow: hidden;
      &.dark {
        background-color: #f5f5f5;
        padding: 0;
      }
      overflow: auto;
    }
  }
}
</style>
