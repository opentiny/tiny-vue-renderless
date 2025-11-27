<template>
  <div class="member-list">
    <tiny-grid :fetch-data="state.fetchData" :pager="state.pagerConfig">
      <tiny-grid-column type="index" width="60"></tiny-grid-column>
      <tiny-grid-column field="username" title="姓名"></tiny-grid-column>
      <tiny-grid-column v-if="isInternalEnv()" field="resetPasswordToken" title="工号"></tiny-grid-column>
      <tiny-grid-column field="email" title="邮箱"></tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script>
import { Grid, GridColumn, Pager } from '@opentiny/vue'
import { user } from 'lowcode-design-controller'
import { LOCAL_STORAGE, ROLE, PERMISSION_TYPE } from 'lowcode-design-controller/utils'
import { isInternalEnv } from '@/utils/env'
import { fetchAllUser } from './http'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn
  },
  setup(props) {
    const getUserList = ({ page, filterArgs }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize
      const tenant = JSON.parse(localStorage.getItem(LOCAL_STORAGE.tenant))
      const currentUser = user.current.auths?.find((auth) => auth.role.name === ROLE.tenantAdmin)

      const params = {
        current_auth: currentUser?.id,
        qUnitId: tenant?.id,
        qUnitType: PERMISSION_TYPE.tenant,
        type: 'all'
      }

      return new Promise((resolve) => {
        fetchAllUser(params).then((data) => {
          const result = data.slice(offset, offset + pageSize)

          resolve({ result, page: { total: data.length } })
        })
      })
    }

    const state = {
      pagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 50],
          total: 0,
          layout: 'total, prev, pager, next, jumper, sizes'
        }
      },
      fetchData: {
        api: getUserList
      }
    }

    return {
      state,
      isInternalEnv,
      getUserList
    }
  }
}
</script>

<style lang="less" scoped>
.member-list {
  background-color: #fff;
  padding: 20px;
}
</style>
