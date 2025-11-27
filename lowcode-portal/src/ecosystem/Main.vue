<template>
  <side-nav-layout :navData="sideList" :dark="isDark"></side-nav-layout>
</template>

<script>
import SideNavLayout from '@/common/components/SideNavLayout'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

export default {
  components: {
    SideNavLayout
  },
  setup() {
    const route = useRoute()
    const isDark = computed(() => ['componentImport', 'blockImport', 'createMaterial'].includes(route.name))

    const sideList = [
      {
        title: '物料生态',
        name: 'ecosystemMaterial'
      },
      {
        title: '插件生态',
        name: 'ecosystemPlugin'
      },
      {
        title: '工具栏生态',
        name: 'ecosystemToolbar'
      },
      {
        title: '主题生态',
        name: 'ecosystemTheme'
      },
      {
        title: 'DSL生态',
        name: 'ecosystemDsl'
      },
      {
        title: '应用扩展',
        name: 'ecosystemApp'
      }
    ]

    return {
      sideList,
      isDark
    }
  }
}
</script>
