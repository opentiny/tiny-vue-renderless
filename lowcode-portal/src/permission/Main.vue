<template>
  <side-nav-layout :navData="state.navData" :dark="true"></side-nav-layout>
</template>

<script>
import { onMounted, reactive } from 'vue'
import SideNavLayout from '@/common/components/SideNavLayout.vue'
import { isTenantAdmin, isAdmin, isMaster } from 'lowcode-design-controller'

export default {
  components: {
    SideNavLayout
  },
  setup() {
    const navAdmin = [
      {
        title: '权限管理',
        name: 'permissionList'
      },
      {
        title: '模板管理',
        name: 'appTemplateManage'
      },
      {
        title: '应用管理',
        name: 'applicationManage'
      },
      {
        title: '默认设计器管理',
        name: 'defaultPlatformManage'
      },
      {
        title: '组织申请列表',
        name: 'applicationList'
      },
      {
        title: '学院课程管理',
        name: 'courseManage'
      }
    ]
    const navTenantAdmin = [
      {
        title: '成员列表',
        name: 'memberList'
      },
      {
        title: '成员申请列表',
        name: 'memberApplyList'
      }
    ]

    const generalUser = [
      {
        title: 'AK/SK申请',
        name: 'akskManage'
      }
    ]

    const state = reactive({
      navData: [...generalUser]
    })

    const getNavData = () => {
      const map = new Map([
        [isMaster, [...navAdmin, ...navTenantAdmin, ...generalUser]],
        [isAdmin, [...navAdmin]],
        [isTenantAdmin, [...navTenantAdmin, ...generalUser]]
      ])

      for (let [key, value] of map) {
        if (key()) {
          return value
        }
      }

      return generalUser
    }

    onMounted(() => {
      state.navData = getNavData()
    })

    return {
      state
    }
  }
}
</script>
