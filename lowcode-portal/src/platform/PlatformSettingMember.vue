<template>
  <div class="platform-setting-member">
    <div class="administrators">
      <div class="title">组织管理员</div>
      <div class="explain-text">
        组织管理员拥有修改设计器基本信息及发布设计器的权限，可以创建设计器、删除设计器，可以维护组织管理员、设计器管理员列表。
      </div>
      <member-setting-table
        ref="tenantSettingTableRef"
        class="permission-member"
        :tableData="state.tenantList"
        :userList="state.tenantUser"
        :type="ROLE.tenantAdmin"
        @saveAuth="saveAuth"
        @deleteAuth="deleteAuth"
      ></member-setting-table>
    </div>
    <div class="administrators">
      <div class="title">设计器管理员</div>
      <div class="explain-text">
        设计器管理员拥有修改应用基本信息及发布应用的权限，可以创建应用，删除应用，可以维护应用管理员、开发人员列表。
      </div>
      <member-setting-table
        ref="platformSettingTableRef"
        class="permission-member"
        :tableData="state.platformList"
        :userList="state.platformUser"
        :type="ROLE.platformAdmin"
        @saveAuth="saveAuth"
        @deleteAuth="deleteAuth"
      ></member-setting-table>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import MemberSettingTable from '../common/components/MemberSettingTable.vue'
import { useModal, user } from 'lowcode-design-controller'
import { LOCAL_STORAGE, SESSION_STORAGE, ROLE, PERMISSION_TYPE } from 'lowcode-design-controller/utils'
import {
  requestAddAuth,
  requestUpdateAuth,
  requestDeleteAuth,
  fetchAuthList,
  fetchMemberList,
  fetchAllUser
} from '../application/http.js'

export default {
  components: {
    MemberSettingTable
  },
  setup() {
    const { confirm, message } = useModal()
    const tenant = JSON.parse(localStorage.getItem(LOCAL_STORAGE.tenant))
    const platformSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.platformSetting))
    const currentUser = user.current.auths?.find((auth) => auth.role.name === ROLE.tenantAdmin)
    const tenantSettingTableRef = ref(null)
    const platformSettingTableRef = ref(null)

    const state = reactive({
      // 组织管理员列表
      tenantList: [],
      // 设计器管理员列表
      platformList: [],
      // 角色列表
      roleList: [],
      // 可设置为组织管理员的用户
      tenantUser: [],
      // 可设置为设计器管理员的用户
      platformUser: []
    })

    const getRole = () =>
      new Promise((resolve) => {
        fetchAuthList()
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            message({ message: `获取角色列表: ${error.message || error}`, status: 'error' })
          })
      })

    const getAdminList = (type) => {
      const role = state.roleList.find((item) => item.name === type)

      const params =
        type === ROLE.tenantAdmin
          ? {
              current_auth: currentUser?.id,
              qUnitId: tenant?.id,
              qUnitType: PERMISSION_TYPE.tenant,
              qRole: role?.id
            }
          : {
              current_auth: currentUser?.id,
              qUnitId: platformSetting?.id,
              qUnitType: PERMISSION_TYPE.platform,
              qRole: role?.id
            }

      fetchMemberList(params)
        .then((data) => {
          type === ROLE.tenantAdmin ? (state.tenantList = data) : (state.platformList = data)
        })
        .catch((error) => {
          message({ message: `获取管理员列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const getUserList = (type) => {
      const role = state.roleList.find((item) => item.name === type)

      const params =
        type === ROLE.tenantAdmin
          ? {
              current_auth: currentUser?.id,
              qUnitId: tenant?.id,
              qUnitType: PERMISSION_TYPE.tenant,
              qRole: role?.id
            }
          : {
              current_auth: currentUser?.id,
              qUnitId: platformSetting?.id,
              qUnitType: PERMISSION_TYPE.platform,
              qRole: role?.id
            }

      fetchAllUser(params)
        .then((data) => {
          type === ROLE.tenantAdmin ? (state.tenantUser = data) : (state.platformUser = data)
        })
        .catch((error) => {
          message({ message: `获取用户列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const closeEditingStatusMap = {
      [ROLE.tenantAdmin]: tenantSettingTableRef,
      [ROLE.platformAdmin]: platformSettingTableRef
    }

    const saveAuth = (row, type) => {
      const newRole = state.roleList.filter((item) => item.name === type)

      const params = {
        id: row?.id,
        user: row?.user,
        unit: {
          type: type === ROLE.tenantAdmin ? PERMISSION_TYPE.tenant : PERMISSION_TYPE.platform,
          id: type === ROLE.tenantAdmin ? tenant?.id : platformSetting?.id
        },
        role: newRole[0].id,
        expired_time: row.expired_time,
        current_auth: currentUser?.id
      }

      const requestFn = row?.id ? requestUpdateAuth : requestAddAuth

      requestFn(params)
        .then(() => {
          getAdminList(type)
          getUserList(type)
        })
        .catch((error) => {
          message({
            message: `${row?.id ? '权限更新失败' : '权限添加失败'}: ${error.message || error}`,
            status: 'error'
          })
        })
        .finally(() => {
          closeEditingStatusMap[type]?.value?.closeEditingStatus?.()
        })
    }

    const deleteAuth = ({ row, type }) => {
      const title = type === ROLE.tenantAdmin ? '删除组织管理员' : '删除设计器管理员'
      const status = 'warning'
      const params = {
        id: row.id,
        current_auth: currentUser?.id
      }
      const exec = () => {
        requestDeleteAuth(params)
          .then(() => {
            getAdminList(type)
            getUserList(type)
          })
          .catch((error) => {
            message({ message: `删除失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: `您确定要删除 ${row.user?.username} 吗?`, exec })
    }

    onMounted(async () => {
      state.roleList = await getRole()
      getAdminList(ROLE.tenantAdmin)
      getAdminList(ROLE.platformAdmin)
      getUserList(ROLE.tenantAdmin)
      getUserList(ROLE.platformAdmin)
    })

    return {
      state,
      ROLE,
      saveAuth,
      deleteAuth,
      tenantSettingTableRef,
      platformSettingTableRef
    }
  }
}
</script>

<style lang="less" scoped>
.platform-setting-member {
  box-sizing: border-box;
  height: 100%;
  background: #f5f5f5;
  .title {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: Bold;
    color: #252b3a;
    line-height: 24px;
    margin-bottom: 4px;
  }
  .explain-text {
    color: #808080;
    font-size: 12px;
    margin-bottom: 16px;
  }
  .administrators {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: calc((100% - 70px) / 2);
    min-height: 380px;
    padding: 24px 24px;
    margin-bottom: 24px;
    background: #fff;
    border-radius: 10px;
    .title {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: Bold;
      color: #252b3a;
    }
    .explain-text {
      font-size: 12px;
    }
    .permission-member {
      flex: 1;
    }
  }
}
</style>
