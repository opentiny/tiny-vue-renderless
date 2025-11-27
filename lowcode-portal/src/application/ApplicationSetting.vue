<template>
  <setting-layout :navData="navData" :name="`我的应用：${appSetting.name}`" :icon="IconApp"></setting-layout>
</template>

<script>
import SettingLayout from '../common/components/SettingLayout.vue'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'
import { isPlatformAdmin, isAppAdmin, isMaster, useModal } from 'lowcode-design-controller'
import { IconApp } from '@opentiny/vue-icon'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPlatformById } from '../platform/http'

export default {
  components: {
    SettingLayout
  },
  setup() {
    const appSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.appSetting))
    const platformId = appSetting?.platform?.id || -1
    const appId = appSetting?.id || -1
    const router = useRouter()

    const navData = ref(
      isPlatformAdmin(platformId) || isAppAdmin(appId) || isMaster()
        ? [
            { name: 'applicationSettingBase', title: '基础信息' },
            { name: 'applicationSettingPermission', title: '应用权限' },
            { name: 'applicationSettingHistory', title: '历史记录' }
          ]
        : [
            { name: 'applicationSettingBase', title: '基础信息' },
            { name: 'applicationSettingHistory', title: '历史记录' }
          ]
    )

    onMounted(async () => {
      const routes = await getExtendRoute()

      routes.forEach((route) => {
        // 动态加载到 applicationSetting 的二级菜单
        router.addRoute('applicationSetting', {
          path: route.path,
          name: route.name,
          // 路由支持动态加载组件，其原理是 import ES Module，故要求卡片编译成 ES Module
          component: () => import(route.url)
        })

        // 给左侧菜单项动态添加应用的扩展配置
        navData.value.push({ name: route.name, title: route.title })
      })
    })

    return {
      appSetting,
      navData,
      IconApp: IconApp()
    }
  }
}

export const getExtendRoute = () => {
  const { message } = useModal()
  const appSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.appSetting))
  const platformId = appSetting?.platform?.id

  if (!platformId) {
    return []
  }

  return new Promise((resolve) => {
    fetchPlatformById(platformId)
      .then((data) => {
        resolve(data?.app_extend_config?.route || [])
      })
      .catch((error) => {
        message({ message: `获取应用扩展路由失败: ${error.message || error}`, status: 'error' })
      })
  })
}
</script>
