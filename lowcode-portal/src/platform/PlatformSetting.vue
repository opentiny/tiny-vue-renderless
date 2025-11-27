<template>
  <setting-layout :navData="navData" :name="`我的设计器：${platformSetting.name}`" :icon="IconCourse"></setting-layout>
</template>

<script>
import SettingLayout from '@/common/components/SettingLayout.vue'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'
import { IconCourse } from '@opentiny/vue-icon'

export default {
  components: {
    SettingLayout
  },
  setup() {
    const platformSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.platformSetting))
    const navData = [
      { name: 'platformSettingBase', title: '基础信息' },
      { name: 'platformSettingPermission', title: '设计器权限' },
      { name: 'platformSettingHistory', title: '历史记录' }
    ]

    return {
      navData,
      platformSetting,
      IconCourse: IconCourse()
    }
  }
}
</script>
