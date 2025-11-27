<template>
  <div class="setting-member-wrapper">
    <tiny-alert
      type="info"
      class="explain-text info"
      description="对于同一个应用，用户不能同时具有应用管理员与应用开发者两种权限，设置其中一种权限会自动删除另一种权限。"
    ></tiny-alert>
    <div class="application-setting-member">
      <div class="administrators">
        <div class="title">应用管理员</div>
        <div class="explain-text">
          应用管理员拥有修改应用基本信息及发布应用的权限，可以开发应用，不能删除应用，可以维护应用管理员、开发人员列表。
        </div>
        <member-setting-table
          ref="appAdminSettingTableRef"
          class="permission-member"
          :tableData="state.appAdministrator"
          :userList="state.adminUser"
          :type="ROLE.appAdmin"
          @saveAuth="saveAuth"
          @deleteAuth="deleteAuth"
        ></member-setting-table>
      </div>
      <div class="administrators">
        <div class="title">应用开发者</div>
        <div class="explain-text">应用开发者拥有访问应用、开发应用的权限，不能修改应用信息，不能删除应用。</div>
        <member-setting-table
          ref="appDeveloperSettingTableRef"
          class="permission-member"
          :tableData="state.devMember"
          :userList="state.developUser"
          :type="ROLE.appDeveloper"
          @saveAuth="saveAuth"
          @deleteAuth="deleteAuth"
        ></member-setting-table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { Alert } from '@opentiny/vue'
import MemberSettingTable from '../common/components/MemberSettingTable.vue'
import { useModal, user } from 'lowcode-design-controller'
import { SESSION_STORAGE, ROLE, PERMISSION_TYPE } from 'lowcode-design-controller/utils'
import {
  requestAddAuth,
  requestUpdateAuth,
  requestDeleteAuth,
  fetchAuthList,
  fetchMemberList,
  fetchAllUser
} from './http.js'

export default {
  components: {
    MemberSettingTable,
    TinyAlert: Alert
  },
  setup() {
    const { confirm, message } = useModal()
    const appSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.appSetting))
    const appAdminSettingTableRef = ref(null)
    const appDeveloperSettingTableRef = ref(null)

    const state = reactive({
      // 应用管理员列表
      appAdministrator: [],
      // 应用开发人员列表
      devMember: [],
      // 角色列表列表
      roleList: [],
      // 可设置为应用管理员的用户
      adminUser: [],
      // 可设置为应用开发员的用户
      developUser: [],
      // 当前的用户权限
      currentAuth: {}
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

    const getCurrentAuth = () => {
      const platformId = appSetting?.platform?.id || -1
      const appId = appSetting?.id

      return user.current.auths?.find(
        (auth) =>
          (auth.unit?.type === PERMISSION_TYPE.app && auth.unit?.id === appId && auth.role?.name === ROLE.appAdmin) ||
          (auth.unit?.type === PERMISSION_TYPE.platform &&
            auth.unit?.id === platformId &&
            auth.role?.name === ROLE.platformAdmin)
      )
    }

    const getAdminList = (type) => {
      const role = state.roleList.find((item) => item.name === type)

      const params = {
        current_auth: state.currentAuth?.id,
        qUnitId: appSetting?.id,
        qUnitType: PERMISSION_TYPE.app,
        qRole: role?.id
      }

      fetchMemberList(params)
        .then((data) => {
          type === ROLE.appAdmin ? (state.appAdministrator = data) : (state.devMember = data)
        })
        .catch((error) => {
          message({ message: `获取管理员列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const getUserList = (type) => {
      const role = state.roleList.find((item) => item.name === type)

      const params = {
        current_auth: state.currentAuth?.id,
        qUnitId: appSetting?.id,
        qUnitType: PERMISSION_TYPE.app,
        qRole: role?.id
      }

      fetchAllUser(params)
        .then((data) => {
          type === ROLE.appAdmin ? (state.adminUser = data) : (state.developUser = data)
        })
        .catch((error) => {
          message({ message: `获取用户列表失败: ${error.message || error}`, status: 'error' })
        })
    }

    const closeEditingStatusMap = {
      [ROLE.appAdmin]: appAdminSettingTableRef,
      [ROLE.appDeveloper]: appDeveloperSettingTableRef
    }

    const saveAuth = (row, type) => {
      const newRole = state.roleList.filter((item) => item.name === type)

      const params = {
        id: row?.id,
        user: row?.user,
        unit: {
          type: PERMISSION_TYPE.app,
          id: appSetting?.id
        },
        role: newRole[0].id,
        expired_time: row.expired_time,
        current_auth: state.currentAuth?.id
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
          closeEditingStatusMap[type].value?.closeEditingStatus?.()
        })
    }

    const deleteAuth = ({ row, type }) => {
      const title = type === ROLE.appAdmin ? '删除应用管理员' : '删除开发成员'
      const status = 'warning'
      const params = {
        id: row.id,
        current_auth: state.currentAuth?.id
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
      state.currentAuth = getCurrentAuth()
      state.roleList = await getRole()
      getAdminList(ROLE.appAdmin)
      getAdminList(ROLE.appDeveloper)
      getUserList(ROLE.appAdmin)
      getUserList(ROLE.appDeveloper)
    })

    return {
      state,
      ROLE,
      saveAuth,
      deleteAuth,
      appAdminSettingTableRef,
      appDeveloperSettingTableRef
    }
  }
}
</script>

<style>
#sideNavLayout .container {
  background-color: transparent;
}
</style>
<style lang="less" scoped>
.setting-member-wrapper {
  display: flex;
  flex-direction: column;
}

.info {
  border-radius: 8px;
  border: none;
  background-color: rgba(65, 145, 250, 0.1);
}
.application-setting-member {
  flex: 1;
  box-sizing: border-box;
  border-radius: 14px;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  .title {
    font-size: 14px;
    font-weight: Bold;
    color: #191919;
    line-height: 14px;
    margin-bottom: 8px;
  }
  .administrators {
    box-sizing: border-box;
    background: #fff;
    margin: 10px 0 20px;
    border-radius: 8px;
    padding: 24px;
    overflow: auto;
    .title {
      font-size: 14px;
      font-weight: Bold;
    }

    .explain-text {
      font-size: 12px;
      margin-bottom: 16px;
    }

    .permission-member {
      height: calc(100% - 67px);
      width: 100%;
    }
  }
}
</style>
