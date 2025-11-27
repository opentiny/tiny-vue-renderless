import { readonly, reactive, ref } from 'vue'
import { Loading } from '@opentiny/vue'
import { iconLoadingShadow } from '@opentiny/vue-icon'
import { isInternalEnv } from '@/utils/env'
import defaultImg from '../common/json/default'
import {
  useModal,
  isTenantAdmin,
  isPlatformAdmin,
  isAdmin,
  isAppAdmin,
  isAppDeveloper,
  isMaster,
  isGuest,
  isNoTenant,
  setHeadMenuList
} from '.'

export const LOCAL_STORAGE = readonly({
  material: 'tiny_lowcode_material',
  tenant: 'tiny_lowcode_tenant'
})

export const SESSION_STORAGE = readonly({
  appSetting: 'tiny_lowcode_app_setting',
  platformSetting: 'tiny_lowcode_platform_setting',
  component: 'tiny_lowcode_component',
  componentLib: 'tiny_lowcode_component_lib',
  block: 'tiny_lowcode_block',
  material: 'tiny_lowcode_material',
  createPlatformType: 'tiny_lowcode_create_platform_type',
  createMaterialType: 'tiny_lowcode_create_material_type',
  lastMaterialData: 'tiny_lowcode_last_material_data',
  lastComponentData: 'tiny_lowcode_last_component_data',
  lastComponentLibData: 'tiny_lowcode_last_component_lib_data',
  lastBlockData: 'tiny_lowcode_last_block_data',
  categories: 'tiny_lowcode_business_categories'
})

export const ROLE = readonly({
  admin: 'Tinybuilder_Admin',
  tenantAdmin: 'Tinybuilder_Tenant_Admin',
  platformAdmin: 'Tinybuilder_Platform_Admin',
  appAdmin: 'Tinybuilder_App_Admin',
  appDeveloper: 'Tinybuilder_App_Developer',
  guest: 'Guest'
})

export const PERMISSION_TYPE = readonly({
  app: 'apps',
  platform: 'platforms',
  tenant: 'tenant'
})

export const ACTION_ID = readonly({
  home: 'home',
  platform: 'platform',
  app: 'app',
  appCenter: 'appCenter',
  platformCenter: 'platformCenter',
  material: 'material',
  ecologyCenter: 'ecologyCenter',
  protocol: 'protocol',
  helpCenter: 'helpCenter',
  monitorCenter: 'monitorCenter',
  view: 'view',
  develop: 'develop',
  delete: 'delete',
  setting: 'setting',
  edit: 'edit',
  check: 'check',
  add: 'add',
  create: 'create',
  createFromTemplate: 'createFromTemplate',
  collect: 'collect',
  checkHistory: 'checkHistory'
})

export const PERMISSION_ID = {
  personalCenter: 'personalCenter',
  permission: 'permissionList'
}

export const sizeChange = (state, size) => {
  state.pageSize = size
  const data = state.searchData.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize)

  state.activeName ? (state.data[state.activeName] = data) : (state.data = data)
}

export const currentChange = (state, current) => {
  state.currentPage = current
  const data = state.searchData.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize)

  state.activeName ? (state.data[state.activeName] = data) : (state.data = data)
}

export const setBuildingMessage = ({ buildMessage, id }) => {
  const msg = buildMessage[id] || {}

  msg.color = 'grey'
  msg.content = '构建中...'
  buildMessage[id] = msg
}

export const setBuildErrorMessage = ({ buildMessage, id, error }) => {
  const msg = buildMessage[id] || {}

  msg.color = 'red'
  msg.content = '构建失败'
  buildMessage[id] = msg
}

export const setBuildPercent = ({ buildPercent, id, percent }) => {
  buildPercent[id] = percent
}

const proUrl = 'https://opentiny.design'

export const EXPERIENCE_URL = !isInternalEnv()
  ? `${import.meta.env.VITE_APP_STATIC_PATH}/tiny-engine-editor/index.html`
  : `${import.meta.env.VITE_APP_ORIGIN}/platform-center/entry/portal-platform?id=918&tenant=1` // 构建体验流程的URL
export const EXPERIENCE_URL_FLOW = `${import.meta.env.VITE_APP_ORIGIN}/platform-center/entry${
  import.meta.env.VITE_APP_ORIGIN === proUrl
    ? '/RF-Designer?type=app&id=1284&tenant=1'
    : '/RF-Designer?type=app&id=1418&tenant=1'
}`

export const EXPERIENCE_URL_CONSOLE = `${import.meta.env.VITE_APP_ORIGIN}/platform-center/entry${
  import.meta.env.VITE_APP_ORIGIN === proUrl
    ? '/console-designer?type=app&id=1305&tenant=1'
    : '/console-designer?type=app&id=1520&tenant=1'
}`
export const EXPERIENCE_URL_BDVIEW = `${import.meta.env.VITE_APP_ORIGIN}/platform-center/entry${
  import.meta.env.VITE_APP_ORIGIN === proUrl
    ? '/%E5%A4%A7%E5%B1%8F%E4%B8%93%E7%94%A8%E8%AE%BE%E8%AE%A1%E5%99%A8?type=app&id=1274&tenant=1&pageid=2883'
    : '/%E5%A4%A7%E5%B1%8F%E4%B8%93%E7%94%A8%E8%AE%BE%E8%AE%A1%E5%99%A8?type=app&id=1514&tenant=1&pageid=3406'
}`

export const TINY_ENGINE_DEFAULT_URL = `${import.meta.env.BASE_URL}tiny-engine-editor/index.html?type=app&id=1&tenant=1`

export const openLowCodeEditor = () => {
  window.open(EXPERIENCE_URL, '_blank')
}

let loadingInstance = null
const spinnerIcon = iconLoadingShadow()

export const openLoading = (target = document.getElementById('sideNavLayout'), text = '加载中...') => {
  if (loadingInstance && target?.compareDocumentPosition(loadingInstance.state.target) === 0) {
    loadingInstance?.close()
  }

  loadingInstance = Loading.service({
    text,
    target,
    spinner: spinnerIcon,
    customClass: 'common-loading',
    background: 'rgba(0, 0, 0, 0.3)'
  })

  return loadingInstance
}

export const framework = [
  {
    value: 'Vue',
    label: 'Vue',
    disabled: false
  },
  {
    value: 'Angular',
    label: 'Angular',
    disabled: false
  },
  {
    value: 'React',
    label: 'React',
    disabled: true
  },
  {
    value: 'HTML',
    label: 'HTML',
    disabled: true
  }
]

export const sortOptions = [
  {
    value: 'updateReverse',
    label: '按修改时间倒序'
  },
  {
    value: 'createReverse',
    label: '按创建时间倒序'
  }
]

export const appTemplateTypeList = [
  {
    label: '云服务开发',
    value: 'serviceDevelop'
  },
  {
    label: '人事管理',
    value: 'personnelManagement'
  },
  {
    label: '行政办公',
    value: 'AdministrativeOffice'
  },
  {
    label: '项目管理',
    value: 'projectManagement'
  }
]

export const formValidate = (type) => {
  const rules = {
    nameZh: {
      reg: /^[-\w\u4e00-\u9fa5]+$/,
      message: '名称不能包含特殊字符'
    },
    nameEn: {
      reg: /(?=.*[A-Z].*[A-Z])(^([A-Z][a-z0-9._-]{2,})*?([A-Z][a-z0-9._-])*?)$/,
      message: '两个单词以上, 且是大写开头驼峰格式'
    },
    nameId: {
      reg: /^[a-zA-Z_]([a-zA-Z0-9._-]+)?$/,
      message: '以字母、下划线开头，允许数字、字母、点、下划线与中划线'
    },
    componentId: {
      reg: /(\b([A-Z][a-z]+){2,}\b)+$/,
      message: '两个单词以上, 且是大写开头驼峰格式，例：TinyButton'
    },
    version: {
      reg: /^(\d+\.){2}[\w-\.]+$/,
      message: '版本号应遵循 SemVer 规范(例:1.0.0)'
    },
    npm: {
      reg: /^(([a-z\d][a-z\d_-]*)|(@[a-z\d_-]+\/[a-z\d_-]+))$/,
      message: 'npm包名不规范'
    },
    https: {
      reg: /^(https):\/\/([\w.]+\/?)\S*/,
      message: '请输入https开头的地址'
    },
    attr: {
      reg: /^[a-zA-Z-_]+$/,
      message: '只能包含字母、中划线'
    },
    event: {
      reg: /^[a-zA-Z-:]+$/,
      message: '只能包含字母、中划线、冒号'
    },
    material: {
      reg: /^([a-z][a-z0-9]*)(-?[a-z0-9]+)*$/,
      message: '以小写字母开头，包含小写字母、数字、中划线（例:a-c）'
    },
    url: {
      reg: /^https?:\/\/[\w-]\/?$/,
      message: '输入不符合要求，请重新输入'
    },
    repositoryUrl: {
      reg: /^https?:\/\/(.*?)\.git$/,
      message: '请输入http(s)类型git地址'
    }
  }

  if (rules[type]) {
    return (rule, value, callback) => {
      const { reg, message } = rules[type]

      if (value && !reg.test(value)) {
        callback(new Error(message))
      } else {
        callback()
      }
    }
  }

  return undefined
}

export const validatePass = (rule, value, callback) => {
  if (!/^[-\w\u4e00-\u9fa5]+$/.test(value)) {
    callback(new Error('名称不能包含特殊字符'))
  } else {
    callback()
  }
}

export const getDefaultImg = (data, type) => {
  if (!type) {
    return data
  }

  const len = defaultImg[type].length
  const newData = data.map((item, idx) => {
    if (!item.image_url) {
      if (idx < len) {
        item.image_url = defaultImg[type][idx]
      } else {
        item.image_url = defaultImg[type][idx % len]
      }
    }

    return item
  })

  return newData
}

export const getSortParams = (value) => {
  const sortParams = {
    name: 'name:ASC',
    nameReverse: 'name:DESC',
    update: 'updated_at:ASC',
    updateReverse: 'updated_at:DESC',
    create: 'created_at:ASC',
    createReverse: 'created_at:DESC'
  }

  const _sort = sortParams[value]

  return _sort ? { _sort } : {}
}

const getReqParams = (state, config, getExtParams) => {
  const { pageSize, currentPage } = state
  const params = {
    _limit: pageSize,
    _start: (currentPage - 1) * pageSize,
    ...getSortParams(state.sort),
    ...getExtParams?.()
  }

  if (state.filter) {
    Object.assign(params, { name_contains: state.filter })
  }

  return params
}

const fetchState = {
  data: [],
  currentPage: 1,
  pageSize: 12,
  pageSizes: [12, 24, 36],
  filter: '',
  total: 100,
  sort: 'updateReverse',
  stack: 'Vue',
  empty: false
}

const doFetchCount = ({ params, reqest, state }) => {
  delete params._limit
  delete params._start
  delete params._sort

  reqest.count?.(params).then((count) => {
    state.total = count
  })
}

const showLoading = (loading) => {
  loading.value = openLoading(document.getElementsByClassName('page-layout')[1])
}

const closeLoading = (loading) => {
  loading.value?.close()
  loading.value = null
}

const updateMethod = (state, reqestMethods, config) => {
  const { request, getCount } = config

  if (typeof request === 'function') {
    reqestMethods.list = request
    state.currentPage = config.oldPage ? state.currentPage : 1
    state.filter = ''
    state.sort = 'updateReverse'
  }

  if (typeof getCount === 'function') {
    reqestMethods.count = getCount
  }
}

export const useFetchData = (config) => {
  const { request, routeName, errorMsg, getExtParams, getCount, getMoreAction } = config
  const loading = ref(null)
  const reqestMethods = {
    list: request,
    count: getCount
  }
  const state = reactive({ ...fetchState })

  const resetPage = () => {
    state.currentPage = 1
    state.filter = ''
    state.sort = 'updateReverse'
    loading.value = null
  }

  const debounce = (func, delay) => {
    let timer = null

    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }

  const doFetch = debounce((config = {}) => {
    updateMethod(state, reqestMethods, config)
    const requestParams = getReqParams(state, config, getExtParams)

    showLoading(loading)
    reqestMethods
      .list(requestParams)
      .then((data) => {
        closeLoading(loading)
        state.data = getDefaultImg(data, routeName)
        state.data = getMoreAction && typeof getMoreAction === 'function' ? getMoreAction(state.data) : state.data
        state.empty = !data.length
      })
      .catch((error) => {
        closeLoading(loading)
        useModal().message({ message: `${config.errorMsg || errorMsg}: ${error.message || error}`, status: 'error' })
      })

    doFetchCount({ params: requestParams, state, reqest: reqestMethods })
  }, 100)

  const currentChange = (val) => {
    state.currentPage = val
    doFetch()
  }

  const pageSizeChange = (val) => {
    state.currentPage = 1
    state.pageSize = val
    doFetch()
  }

  return {
    fetchState: state,
    currentChange,
    pageSizeChange,
    getParams: getReqParams,
    isLoading: loading,
    doFetch,
    resetPage
  }
}

export const refreshHeadMenuList = () => {
  const defaultHeadMenuList = [
    {
      id: ACTION_ID.app,
      title: '我的应用',
      link: '/my-application'
    },
    {
      id: ACTION_ID.appCenter,
      title: '应用中心',
      link: '/application-center'
    },
    {
      id: ACTION_ID.platform,
      title: '我的设计器',
      link: '/my-platform'
    },
    {
      id: ACTION_ID.ecologyCenter,
      title: '生态中心',
      link: '/ecosystem'
    },
    {
      id: ACTION_ID.protocol,
      title: '协议规范',
      link: '/protocol'
    },
    {
      id: ACTION_ID.helpCenter,
      title: '帮助中心',
      link: '/help-center'
    }
  ]

  const roleBlackList = {
    // 未选组织、游客，看不到我的设计器、我的应用、我的物料、监控中心
    noTenant: [ACTION_ID.platform, ACTION_ID.app, ACTION_ID.monitorCenter],
    // 超级管理员，看不到我的设计器、我的应用
    admin: [ACTION_ID.platform, ACTION_ID.app],
    // 组织管理员、设计器管理员，看不到监控中心
    tenantAdmin: [ACTION_ID.monitorCenter],
    // 应用管理员、应用开发人员，看不到我的设计器、监控中心
    appAdmin: [ACTION_ID.platform, ACTION_ID.monitorCenter],
    // 开发专用，什么都能看到
    master: []
  }

  const map = new Map([
    [isNoTenant, roleBlackList.noTenant],
    [isAdmin, roleBlackList.admin],
    [isTenantAdmin, roleBlackList.tenantAdmin],
    [isPlatformAdmin, roleBlackList.tenantAdmin],
    [isAppAdmin, roleBlackList.appAdmin],
    [isAppDeveloper, roleBlackList.appAdmin],
    [isMaster, roleBlackList.master],
    [isGuest, roleBlackList.noTenant]
  ])

  // 各角色的黑名单求交集
  let blackList = defaultHeadMenuList

  for (let [key, value] of map) {
    if (key()) {
      blackList = blackList.filter((item) => value.includes(item.id))
    }
  }

  const headMenuList = defaultHeadMenuList.filter((item) => !blackList.includes(item))

  setHeadMenuList(headMenuList)
}

export const TIMELINE_TYPES = {
  COMPONENTS: 'user_components',
  COMPONENT_LIB: 'componentLibrary',
  BLOCKS: 'blocks',
  MATERIAL: 'material_history',
  THEME: 'theme',
  PLUGINS: 'plugins',
  TOOLBAR: 'toolbar',
  DSL: 'dsl',
  APP_EXTEND: 'app_extend'
}
