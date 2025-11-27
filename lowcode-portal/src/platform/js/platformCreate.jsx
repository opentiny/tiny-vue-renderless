import { reactive } from 'vue'
import { extend, copyArray } from '@opentiny/vue-renderless/common/object'
import { BuildTask } from '@huawei/tinybuilder-common'
import { useHttp } from 'lowcode-design-http'
import {
  setBuildingMessage,
  setBuildErrorMessage,
  setBuildPercent,
  SESSION_STORAGE,
  openLoading,
  TIMELINE_TYPES
} from 'lowcode-design-controller/utils'
import { useModal } from 'lowcode-design-controller'
import { fetchEcology, fetchMaterialList, fetchBusinessCategory, fetchVersion } from '../../ecosystem/http'
import { requestUpdatePlatform, fetchPlatformById, fetchPlatformHash, fetchPlatformStatus } from '.././http'

const { confirm, message } = useModal()

const statusDefault = 'isDefault'
const createType = 'create'
const TASK_RUNNING_CODE = 1
const singleChoiceTypes = [TIMELINE_TYPES.MATERIAL, TIMELINE_TYPES.THEME, TIMELINE_TYPES.DSL]

export const structurePlatform = 'platform'
export const structureVSCode = 'VSCode'

export const platformBtns = reactive({})
export const platformPercent = reactive({})
export const platformMessage = reactive({})
export const vscodeBtns = reactive({})
export const vscodeMessage = reactive({})
export const vscodePercent = reactive({})

export const timeLineData = [
  {
    activeIdx: 0,
    name: '物料资产包',
    label: '物料资产包',
    type: 'material_history',
    attr: 'material_history',
    allData: [],
    imgUrl: `${import.meta.env.BASE_URL}img/edit/material.png`,
    status: statusDefault,
    singleChoice: true,
    content: '物料是可视化页面搭建的原料，按照粒度可分为组件和区块',
    stepIdx: '步骤1'
  },
  {
    activeIdx: 1,
    name: '主题设置',
    label: '主题',
    type: 'theme',
    attr: 'theme',
    allData: [],
    imgUrl: `${import.meta.env.BASE_URL}img/edit/theme.png`,
    status: statusDefault,
    singleChoice: true,
    content: '您可按自己喜好，定制专属主题',
    stepIdx: '步骤2'
  },
  {
    activeIdx: 2,
    name: '添加插件',
    label: '插件',
    type: 'plugins',
    attr: 'plugin',
    allData: [],
    imgUrl: `${import.meta.env.BASE_URL}img/edit/plugin.png`,
    status: statusDefault,
    content: '',
    stepIdx: '步骤3'
  },
  {
    activeIdx: 3,
    name: '添加工具',
    label: '工具栏',
    type: 'toolbar',
    attr: 'toolbar',
    allData: [],
    imgUrl: `${import.meta.env.BASE_URL}img/edit/toolbar.png`,
    status: statusDefault,
    content: '工具栏置于设计器最顶部，是可视化搭建的辅助工具',
    stepIdx: '步骤4'
  },
  {
    activeIdx: 4,
    name: '添加DSL',
    label: 'DSL',
    type: 'dsl',
    attr: 'dsl',
    allData: [],
    imgUrl: `${import.meta.env.BASE_URL}img/edit/plugin.png`,
    status: statusDefault,
    singleChoice: true,
    content: '插件栏置于页面最左侧，用来帮助用户快速完成页面搭建',
    stepIdx: '步骤5'
  }
]
export const state = reactive({
  platform: {
    id: ''
  },
  timeActive: 0,
  timeLineData,
  structureType: '',
  buildStatus: false,
  linkParams: {
    link: '',
    isOffline: true,
    materialType: 'platform' // platform | link
  },
  showBuild: false,
  businessList: [],
  selectGroup: [],
  createPlatformType: '',
  boxVisibility: false
})

export const setVersion = (data, type, idx) => {
  state.platform[type].forEach((item) => {
    if (data.block_id && item.material === data.block_id) {
      item.version = data.version
      item.id = data.id
    }

    if (item.base === data.base) {
      item.version = data.version
    }
  })

  state.timeLineData[idx].allData.forEach((item) => {
    if (data.block_id && item.id === data.block_id) {
      item.version = data.version
    }
  })
}

export const sortPluginsAndToolbar = (data) => {
  const sortPlugins = data?.sort_plugins || []
  const sortToolbar = data?.sort_toolbar || []
  const plugins = data?.plugins || []
  const toolbar = data?.toolbar || []

  if (sortPlugins.length > 0 && plugins.length > 0) {
    plugins.sort((pre, ne) => {
      return sortPlugins.indexOf(pre.id) > sortPlugins.indexOf(ne.id) ? 1 : -1
    })
  }

  if (sortToolbar.length > 0 && toolbar.length > 0) {
    toolbar.sort((pre, ne) => {
      return sortToolbar.indexOf(pre.id) > sortToolbar.indexOf(ne.id) ? 1 : -1
    })
  }
}

export const lineChange = (idx) => {
  state.timeActive = idx
}

export const sortData = (data) => {
  const timeSortType = 'updated_at' // 默认按更新时间倒序

  data &&
    data
      .sort((a, b) => a.tiny_reserved - b.tiny_reserved)
      .sort((a, b) => b[timeSortType]?.localeCompare(a[timeSortType]))
      .sort((a, b) => b.isDefault - a.isDefault)

  return data
}

const setSelected = (type, index) => {
  const { allData } = state.timeLineData[index]

  allData.forEach((item) => {
    item.selected = (state.platform[type] || []).some((selectedItem) => {
      const flag = item.id === selectedItem.id

      if (flag) {
        item.version = selectedItem.version
      }

      return flag
    })
  })
}

export const getMaterial = (resolve) => {
  const loadingInstance = openLoading(document.getElementsByClassName('edit-detail-list-content-cardlist')[0])

  fetchMaterialList()
    .then((data) => {
      loadingInstance?.close()

      if (!data.total) {
        return
      }

      const newData = data.list.filter((i) => i.name && i.latest)

      state.timeLineData[0].allData = newData
      resolve()
    })
    .catch((error) => {
      loadingInstance?.close()
      message({ message: `获取物料资产包列表失败: ${error.message || error}`, status: 'error' })
    })
}

export const getEcology = (category, idx, resolve) => {
  const loadingInstance = openLoading(document.getElementsByClassName('edit-detail-list-content-cardlist')[0])

  fetchEcology({ category })
    .then((data) => {
      loadingInstance?.close()
      const groupData = data.filter((i) => i.versions.length)

      state.timeLineData[idx].allData = groupData
      resolve()
    })
    .catch((error) => {
      loadingInstance?.close()
      message({
        message: `获取列表${state.timeLineData[idx].label}失败: ${error.message || error}`,
        status: 'error'
      })
    })
}

export const setPlatformItem = (newItem) => {
  if (newItem.versions) {
    newItem.selectId = newItem.versions[0].id
    newItem.version = newItem.version || newItem.versions[0].version
  } else {
    newItem.selectId = newItem.id
  }

  newItem.id = newItem.base || newItem.id

  return newItem
}
export const setMaterialItem = async (newItem, idx, type) => {
  newItem.id = newItem.material || newItem.id

  if (type !== TIMELINE_TYPES.MATERIAL) {
    newItem = setPlatformItem(newItem)
  } else {
    if (!newItem.versions?.length) {
      const res = await fetchVersion(newItem.material || newItem.id)

      newItem.versions = res
      newItem.version = res[0]?.version
    }

    newItem.selectId = newItem.versions[0]?.id
  }

  state.platform[type] = [newItem]

  setSelected(type, idx)
}

const relateVersion = (selectedData, type, idx) => {
  if (type === TIMELINE_TYPES.MATERIAL) {
    setMaterialItem(selectedData[0], 0, type)

    return
  }

  selectedData.map((item) => setPlatformItem(item))
}

export const setDefaultData = () => {
  let promiseArray = state.timeLineData.map((item, idx) => {
    return new Promise((resolve) => {
      idx === 0 ? getMaterial(resolve) : getEcology(item.attr, idx, resolve)
    })
  })

  Promise.all(promiseArray).then((result) => {
    state.timeLineData.forEach((item, idx) => {
      const { type, allData } = state.timeLineData[idx]

      if (state.createPlatformType === createType || !state.platform[type].length) {
        // 新建，设置默认选项
        const defaultData = copyArray(sortData(allData).filter((item) => item.isDefault))

        if (defaultData.length) {
          state.platform[type] = singleChoiceTypes.includes(type) ? defaultData.slice(0, 1) : defaultData
        }
      }

      if (state.platform[type]?.length) {
        relateVersion(state.platform[type], type, idx)
      }

      setSelected(type, idx)
    })

    state.showBuild = true

    sessionStorage.setItem(SESSION_STORAGE.createPlatformType, null)
  })
}

const getPlatformHash = (id) => {
  return new Promise((resolve) => {
    fetchPlatformHash(id)
      .then(resolve)
      .catch((error) => {
        message({ message: `获取设计器hash失败: ${error.message || error}`, status: 'error' })
      })
  })
}

const buildPlatform = (sourceCodeBuildInfo) => {
  state.structureType = structurePlatform
  const { id, name } = state.platform

  if (platformBtns[id]) {
    return
  }

  let params = {}

  if (state.platform?.app_extend?.some(({ name }) => name === '@huawei/lowcode-design-taihu-extension')) {
    params = {
      materialUrl: state.linkParams.link,
      downloadMaterial: state.linkParams.isOffline
    }
  }

  params.extensionVersions = {
    material: state.platform.material_history[0].version
  }

  // 从源码构建场景，需要添加构建参数
  if (sourceCodeBuildInfo) {
    Object.assign(params, sourceCodeBuildInfo.params)
  }
  state.boxVisibility = true

  const task = new BuildTask({
    buildTaskUrl: `/platform-center/api/platform/build/${id}`,
    queryStatusUrl: `/platform-center/api/platform/task?uniqueId=${id}&taskTypeId=3`,
    $http: useHttp(),
    params,
    method: 'POST',
    onInit: () => {
      platformBtns[id] = true
      setBuildPercent({ buildPercent: platformPercent, id, percent: 0 })
      setBuildingMessage({ buildMessage: platformMessage, id, name })
    },
    onInitError: (error) => {
      delete platformBtns[id]
      setBuildErrorMessage({ buildMessage: platformMessage, id, name, error })
    },
    onRunning: (data) => {
      platformBtns[id] = true
      setBuildPercent({ buildPercent: platformPercent, id, percent: data.progress_percent })
      setBuildingMessage({ buildMessage: platformMessage, id, name })
    },
    onFinished: async ({ progress_percent, isFirstQuery }) => {
      delete platformMessage[id]
      delete platformBtns[id]

      if (isFirstQuery) {
        state.boxVisibility = false
        const title = '构建设计器'
        const status = 'custom'
        const platformHash = await getPlatformHash(id)
        const renderString = platformHash?.same
          ? '当前设计器与上次构建时没有发生变化, 确定要重新构建吗?'
          : '设计器已构建, 确定要重新构建吗?'
        const messageRender = {
          render: () => <span>{renderString}</span>
        }
        const exec = () => {
          task.build()
          state.boxVisibility = true
        }

        confirm({ title, status, message: messageRender, exec })
      } else {
        state.boxVisibility = false
        setBuildPercent({ buildPercent: platformPercent, id, percent: progress_percent })
        getPlatform()
        state.buildStatus = true
      }
    },
    onStopped: (error) => {
      state.boxVisibility = false
      setBuildErrorMessage({ buildMessage: platformMessage, id, name, error })
      delete platformBtns[id]
      const title = '构建设计器'
      const status = 'error'
      const messageRender = {
        render: () => (
          <span style="max-height:316px;overflow:auto;display:block;">{`设计器构建失败: ${
            error.taskResult?.result || error.taskResult || error
          },需要重新构建吗?`}</span>
        )
      }
      const exec = () => {
        platformBtns[id] = true
        task.build()
        state.boxVisibility = true
      }

      confirm({ title, status, message: messageRender, exec, width: 700 })
    }
  })
}

// 初始化时，查询设计器构建状态，如果是正在构建中，则调用 buildPlatform 方法轮询构建进度
const getBuildStatus = () => {
  const { id } = state.platform

  fetchPlatformStatus(id)
    .then((data) => {
      if (data?.taskStatus === TASK_RUNNING_CODE) {
        buildPlatform()
      }
    })
    .catch((error) => {
      message({ message: `查询设计器构建状态失败: ${error.message || error}`, status: 'error' })
    })
}

export const getPlatform = (isInit) => {
  fetchPlatformById(state.platform.id)
    .then((data) => {
      if (data) {
        state.platform = data
        state.platform.material_history =
          data.material_history && JSON.stringify(data.material_history) !== '{}' ? [data.material_history] : []
        state.platform.theme = data.theme && JSON.stringify(data.theme) !== '{}' ? [data.theme] : []

        sessionStorage.setItem(SESSION_STORAGE.platformSetting, JSON.stringify(state.platform))

        if (data?.app_extend_config?.materialUrl) {
          state.linkParams.link = data.app_extend_config?.materialUrl || ''
          state.linkParams.isOffline = data.app_extend_config?.downloadMaterial || true
          state.linkParams.materialType = 'link'
        }

        if (data?.app_extend?.length) {
          state.selectGroup = data?.app_extend.map((item) => item.business_category)
        }
      }

      if (isInit) {
        setDefaultData()
        getBuildStatus()
      }

      sortPluginsAndToolbar(state.platform)

      if (state.platform.material_history.length) {
        fetchVersion(state.platform.material_history[0].material).then((res) => {
          state.platform.material_history[0].versions = res
        })
      }
    })
    .catch((error) => {
      message({ message: `获取设计器信息失败: ${error.message || error}`, status: 'error' })
    })
}

export const updatePlatform = (params) => {
  const { id } = state.platform
  const loadingInstance = openLoading(document.getElementsByClassName('myPlatform-content')[0])

  return new Promise((resolve) => {
    requestUpdatePlatform({ id, ...params })
      .then(() => {
        loadingInstance?.close()
        resolve()
      })
      .catch((error) => {
        loadingInstance?.close()
        message({ message: `设计器更新失败: ${error.message || error}`, status: 'error' })
        state.boxVisibility = false
      })
  })
}
// 应用扩展不需要构建设计器，故勾选后直接调接口保存，其他需要构建的在点击构建时再统一保存
export const addItem = (item) => {
  const idx = state.timeActive
  const type = state.timeLineData[idx].type
  const data = state.platform[type]

  let newItem = extend(true, {}, item)

  if (singleChoiceTypes.includes(type)) {
    const dataItem = data[0]

    if (newItem.noSug === false) {
      setTimeout(() => {
        setMaterialItem(newItem, idx, type)
      }, 1000)

      return
    }

    if (dataItem) {
      const title = `替换${state.timeLineData[idx].label}`
      const status = 'WARNING'
      const messageRender = {
        render: () => <span>{`当前设计器已存在${state.timeLineData[idx].label},确定要替换吗?`}</span>
      }
      const exec = () => {
        setMaterialItem(newItem, idx, type)
      }

      confirm({ title, status, message: messageRender, exec })
    } else {
      setMaterialItem(newItem, idx, type)
    }
  } else {
    newItem = setPlatformItem(newItem)
    state.platform[type]?.push(newItem)

    setSelected(type, idx)
  }
}

export const selectAll = (isSelectALl, data) => {
  const { type } = state.timeLineData[state.timeActive]

  if (!state.platform[type]) {
    state.platform[type] = []
  }

  if (isSelectALl) {
    const selectedIds = state.platform[type].map((cur) => cur.id)
    const newList = data.filter((item) => !selectedIds.includes(item.id))

    state.platform[type].push(...newList.map((item) => setPlatformItem(item)))
  } else {
    const cancelIds = data.map((cur) => cur.id)

    state.platform[type] = state.platform[type].filter((item) => !cancelIds.includes(item.id))
  }

  setSelected(type, state.timeActive)
}

export const deleteItem = (item) => {
  const idx = state.timeActive
  const { type, label } = state.timeLineData[idx]

  if (singleChoiceTypes.includes(type)) {
    message({ message: `请选择其它${label}进行替换。`, status: 'warning' })

    return
  }

  const title = `移除${label}`
  const status = 'warning'
  const messageSaved = {
    render: () => (
      <span>
        {'未勾选【Vue代码保存到本地】工具，'}
        <span style="color:#ff8800">{'您将不能下载代码到本地，'}</span>
        {'确定要取消勾选吗?'}
      </span>
    )
  }
  const isGenerateVue = item.name.includes('generate-vue')

  const defaultMsg = (
    <span>{`您确定要取消勾选【${
      item.name_cn || item.content?.fileName || item.label || item.name.zh_CN || item.name
    }】吗?`}</span>
  )

  const generateVueMsg = (
    <span>
      {'未勾选【Vue代码保存到本地】工具，'}
      <span style="color:#ff8800">{'您将不能下载代码到本地，'}</span>
      {'确定要取消勾选吗?'}
    </span>
  )

  const messageRender = {
    render: () => (isGenerateVue ? generateVueMsg : defaultMsg)
  }

  const exec = () => {
    state.platform[type] = state.platform[type].filter((cur) => cur.id !== item.id)

    setSelected(type, idx)
  }

  confirm({ title, status, message: item.id === 251 ? messageSaved : messageRender, exec })
}

export const getUpdateParams = () => {
  const { id, material_history, theme, dsl, toolbar, plugins, sort_toolbar, sort_plugins, app_extend } = state.platform

  const params = {
    id,
    material_history: material_history?.[0]?.selectId,
    theme: theme?.[0]?.selectId,
    dsl: dsl?.[0]?.selectId,
    toolbar: toolbar?.map((item) => item.selectId),
    plugins: plugins?.map((item) => item.selectId),
    app_extend: app_extend?.map((item) => item.id),
    sort_toolbar: sort_toolbar,
    sort_plugins: sort_plugins
  }

  return params
}

export const buildVSCode = () => {
  const { name, id } = state.platform

  state.structureType = structureVSCode
  const task = new BuildTask({
    buildTaskUrl: `/vscode/api/vscode/build/${id}`,
    queryStatusUrl: `/vscode/api/vscode/task?uniqueId=${id}&taskTypeId=4`,
    $http: useHttp(),
    onInit: () => {
      vscodeBtns[id] = true
      setBuildingMessage({ buildMessage: vscodeMessage, id, name })
    },
    onInitError: (error) => {
      delete vscodeBtns[id]
      setBuildErrorMessage({ buildMessage: vscodeMessage, id, name, error })
    },
    onRunning: (data) => {
      vscodeBtns[id] = true
      setBuildPercent({ buildPercent: vscodePercent, id, percent: data.progress_percent })
      setBuildingMessage({ buildMessage: vscodeMessage, id, name })
    },
    onFinished: ({ progress_percent, isFirstQuery }) => {
      delete vscodeBtns[id]
      delete vscodeMessage[id]
      if (isFirstQuery) {
        const title = '构建VSCode插件'
        const status = 'custom'
        const messageRender = {
          render: () => <span>{'VSCode插件已构建, 确定要重新构建吗?'}</span>
        }
        const exec = () => {
          task.build()
        }

        confirm({ title, status, message: messageRender, exec })
      } else {
        setBuildPercent({ buildPercent: vscodePercent, id, percent: progress_percent })
        getPlatform()
        state.buildStatus = true
      }
    },
    onStopped: (error) => {
      setBuildErrorMessage({ buildMessage: vscodeMessage, id, name, error })
      delete vscodeBtns[id]
      const title = '构建VSCode插件'
      const status = 'error'
      const messageRender = {
        render: () => <span>{`VSCode插件构建失败: ${error.taskResult || error}, 需要重新构建吗?`}</span>
      }
      const exec = () => {
        platformBtns[id] = true
        task.build()
      }

      confirm({ title, status, message: messageRender, exec })
    }
  })
}

export const dragItem = async (data) => {
  const { type } = state.timeLineData[state.timeActive]
  const newSortData = data.map((id) => state.platform[type].find((item) => item.id === id))

  state.platform[type] = newSortData
}

export const updateAndBuildPlatform = async (sourceCodeBuildInfo) => {
  if (!state.platform.material_history.length) {
    message({ message: '请选择物料', status: 'error' })

    return
  }

  if (!state.platform.material_history[0]?.versions?.length) {
    message({ message: '所选物料版本为旧版本，请去构建新版本', status: 'error' })

    return
  }

  const updateParams = getUpdateParams()

  await updatePlatform(updateParams)
  buildPlatform(sourceCodeBuildInfo)
}

export const updateMaterial = (attr, value) => {
  if (typeof value !== 'boolean') {
    return
  }

  state.linkParams[attr] = value
}

export const getAppTypeList = () => {
  fetchBusinessCategory()
    .then((data) => {
      state.businessList = data.map((item) => Object.assign(item, { selected: false }))
    })
    .catch((error) => {
      message({
        message: `获取业务分类列表失败: ${error.message || error}`,
        status: 'error'
      })
    })
}
