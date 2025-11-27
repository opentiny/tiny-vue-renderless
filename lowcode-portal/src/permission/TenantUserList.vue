<template>
  <div class="tenant-list">
    <div>
      <div class="tenant-title">组织管理员</div>
      <div class="description">
        组织管理员拥有修改设计器基本信息及发布设计器的权限，可以创建设计器，删除设计器，可以维护组织管理员、设计器管理员列表
      </div>
      <div class="tenant-list-title">
        <tiny-button type="primary" @click="userGridRef.insert({})">添加组织管理员</tiny-button>
        <tiny-search v-model="state.userValue" placeholder="请输入关键字"></tiny-search>
      </div>
    </div>

    <tiny-grid
      ref="userGridRef"
      :fetch-data="{ api: getUserData }"
      :pager="state.userPagerConfig"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      seq-serial
      auto-resize
      @edit-closed="saveUser"
    >
      <tiny-grid-column
        field="user.id"
        title="姓名"
        :editor="{
          component: Select,
          attrs: { options: state.users, textField: 'username', valueField: 'id', filterable: true }
        }"
      >
        <template #default="{ row }">
          <span>{{ row?.user?.username }}</span>
        </template>
      </tiny-grid-column>
      <tiny-grid-column field="unit.name" title="组织"></tiny-grid-column>
      <tiny-grid-column
        field="expired_time"
        title="到期时间"
        :editor="{
          component: DatePicker,
          autoselect: true,
          attrs: { valueFormat: 'yyyy-MM-dd HH:mm:ss', format: 'yyyy-MM-dd HH:mm:ss' }
        }"
        format-text="longDateTime"
      ></tiny-grid-column>
      <tiny-grid-column title="操作" width="160">
        <template v-slot="data">
          <template v-if="!userGridRef?.hasActiveRow(data.row)">
            <tiny-button size="mini" @click="userGridRef.setActiveRow(data.row)">编辑</tiny-button>
            <tiny-button size="mini" @click="deleteUser(data.row)">删除</tiny-button>
          </template>
        </template>
      </tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script lang="jsx">
import { reactive, ref, watch, onBeforeMount } from 'vue'
import { Search, Button, Grid, GridColumn, Pager, DatePicker, Select } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { LOCAL_STORAGE, ROLE, PERMISSION_TYPE } from 'lowcode-design-controller/utils'
import { format } from '@opentiny/vue-renderless/common/date'
import {
  fetchTenantUser,
  requestCreateTenantUser,
  requestUpdateTenantUser,
  fetchAllUser,
  fetchRole,
  requestDeleteTenantUser
} from './http'

export default {
  components: {
    TinySearch: Search,
    TinyButton: Button,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn
  },
  setup() {
    const { confirm, message } = useModal()
    const userGridRef = ref(null)
    const tenant = JSON.parse(localStorage.getItem(LOCAL_STORAGE.tenant))

    const state = reactive({
      userValue: '',
      userPagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 5,
          pageSizes: [5, 10],
          total: 0,
          layout: 'total, prev, pager, next, sizes'
        }
      },
      users: []
    })

    const findRole = () =>
      new Promise((resolve) => {
        fetchRole()
          .then((data) => {
            const role = data.find((item) => item.name === ROLE.tenantAdmin)

            resolve(role)
          })
          .catch((error) => {
            message({ message: `查询组织管理员角色错误: ${error.message || error}`, status: 'error' })
          })
      })

    const getUserData = async ({ page, filterUser }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize
      const role = await findRole()

      const params = {
        qUnitId: tenant?.id,
        qUnitType: PERMISSION_TYPE.tenant,
        qRole: role.id
      }

      return new Promise((resolve) => {
        fetchTenantUser(params)
          .then((data) => {
            let total = data.length

            let result = data.slice(offset, offset + pageSize)

            if (filterUser || state.userValue) {
              result = data.filter((item) =>
                item.user.username.toLowerCase().includes((filterUser || state.userValue).toLowerCase())
              )
              total = result.length
              result = result.slice(offset, offset + pageSize)
            }

            resolve({ result, page: { total: total } })
          })
          .catch((error) => {
            message({ message: `获取组织管理员列表失败: ${error.message || error}`, status: 'error' })
          })
      })
    }

    const saveUser = async ({ row }) => {
      const role = await findRole()

      if (!row?.user?.id || !role?.id || !tenant?.id) {
        return
      }

      const params = {
        id: row?.id,
        user: row?.user?.id,
        role: role?.id,
        expired_time: row.expired_time,
        unit: {
          type: PERMISSION_TYPE.tenant,
          id: tenant?.id
        }
      }

      const requestFn = row?.id ? requestUpdateTenantUser : requestCreateTenantUser

      requestFn(params)
        .then(() => {
          userGridRef.value.handleFetch()
          getAllUser()
        })
        .catch((error) => {
          message({
            message: `${row?.id ? '组织管理员更新失败' : '组织管理员添加失败'}: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const deleteUser = (row) => {
      const { id, user } = row

      if (!id) {
        userGridRef.value.remove(row)

        return
      }
      const title = '删除组织管理员'
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${user?.username} 吗?`}</span>
      }
      const exec = () => {
        requestDeleteTenantUser(id)
          .then(() => {
            userGridRef.value.handleFetch()
            getAllUser()
          })
          .catch((error) => {
            message({ message: `组织管理员删除失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const filterUserData = (value) => {
      userGridRef.value.fetchData.args = { filterUser: value }
      userGridRef.value.handleFetch()
    }

    const getAllUser = async () => {
      const role = await findRole()
      const params = {
        qUnitId: tenant?.id,
        qUnitType: PERMISSION_TYPE.tenant,
        qRole: role?.id
      }

      fetchAllUser(params).then((data) => {
        if (Array.isArray(data)) {
          state.users = data
        }
      })
    }

    watch(
      () => state.userValue,
      (value) => {
        filterUserData(value)
      }
    )

    onBeforeMount(getAllUser)

    return {
      state,
      userGridRef,
      getUserData,
      DatePicker,
      Select,
      format,
      saveUser,
      deleteUser
    }
  }
}
</script>

<style lang="less" scoped>
.tenant-list {
  background-color: #fff;
  padding: 32px 20px 24px;

  .tenant-title {
    font-size: 16px;
    font-weight: bold;
  }
  .description {
    color: #cccccc;
    font-size: 12px;
    margin-top: 10px;
  }
  .tenant-list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0;
    .tiny-search {
      margin-right: 24px;
      width: 270px;
    }

    .tiny-button {
      flex-shrink: 0;
      max-width: none;
      height: 32px;
    }
  }
}
</style>
