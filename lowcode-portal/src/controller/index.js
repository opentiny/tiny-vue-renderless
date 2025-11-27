import useModal from './useModal'
import routeMap from './router'
import user, {
  isAdmin,
  isAppDeveloper,
  isPlatformAdmin,
  isTenantAdmin,
  isAppAdmin,
  isMaster,
  isGuest,
  isNoTenant,
  headMenuList,
  setHeadMenuList,
  getCurrentTenantId
} from './user'

export {
  useModal,
  user,
  headMenuList,
  routeMap,
  isAdmin,
  isAppDeveloper,
  isPlatformAdmin,
  isTenantAdmin,
  isAppAdmin,
  isMaster,
  isGuest,
  isNoTenant,
  setHeadMenuList,
  getCurrentTenantId
}
