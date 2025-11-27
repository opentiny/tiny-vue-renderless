import { reactive, ref } from 'vue'
import { ROLE, PERMISSION_TYPE } from './utils'

const user = reactive({
  current: {}
})

export default user

export const getCurrentTenantId = () => {
  const id = user.current.tenant?.id
  const tenants = user.current.tenants

  if (Array.isArray(tenants) && id) {
    const tenant = tenants.find((item) => item.id === Number(id))

    return tenant?.tenant_id
  }

  return ''
}

// 无组织
export const isNoTenant = () => user.current.tenant?.id === undefined
// 是否是超级管理员
export const isAdmin = () => user.current.is_admin
// 是否是组织管理员
export const isTenantAdmin = () =>
  user.current.auths?.some((auth) => auth.unit?.type === PERMISSION_TYPE.tenant && auth.role?.name === ROLE.tenantAdmin)

// 是否是设计器管理员
export const isPlatformAdmin = (id) =>
  user.current.auths?.some(
    (auth) =>
      auth.unit?.type === PERMISSION_TYPE.platform &&
      (!id || auth.unit?.id === id) &&
      auth.role?.name === ROLE.platformAdmin
  )
// 是否是应用管理员
export const isAppAdmin = (id) =>
  user.current.auths?.some(
    (auth) =>
      auth.unit?.type === PERMISSION_TYPE.app && (!id || auth.unit?.id === id) && auth.role?.name === ROLE.appAdmin
  )

// 是否是应用开发人员
export const isAppDeveloper = (id) =>
  user.current.auths?.some(
    (auth) =>
      auth.unit?.type === PERMISSION_TYPE.app && (!id || auth.unit?.id === id) && auth.role?.name === ROLE.appDeveloper
  )
// 是否是开发专用
export const isMaster = () => user.current.resetPasswordToken === 'developer'
// 是否是游客
export const isGuest = () => {
  const auths = user.current.auths?.filter(
    (item) => !(item.unit?.type !== PERMISSION_TYPE.tenant && item.role?.name === ROLE.guest)
  )
  const length = auths?.length

  return (
    (length === 0 || (length === 1 && auths[0].role?.name === ROLE.guest)) &&
    !user.current.is_admin &&
    user.current.resetPasswordToken !== 'developer'
  )
}

export const headMenuList = ref([])

export const setHeadMenuList = (value) => {
  headMenuList.value = value
}
