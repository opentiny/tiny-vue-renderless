<template>
  <div>
    <card-filter
      :filters="filters"
      :filterRes="state.filterRes"
      :releaseButtonText="'导入' + addTitle"
      :isShowRelease="state.isAll && !isGuest"
      @release="releaseComponentLib"
      @toggleAll="toggleAll"
      @filter="filter"
      @search="search"
    ></card-filter>
    <material-card
      :data="fetchState.data"
      :roundImg="false"
      :moreAction="moreAction"
      type="componentLib"
      @clickMore="clickMore"
    ></material-card>
    <tiny-pager
      v-if="fetchState.total > fetchState.pageSizes[0]"
      layout="sizes, total, prev, pager, next"
      :current-page="fetchState.currentPage"
      :total="fetchState.total"
      :page-size="fetchState.pageSize"
      :page-sizes="fetchState.pageSizes"
      @size-change="pageSizeChange"
      @current-change="currentChange"
    ></tiny-pager>
  </div>

  <component-lib-import-dialog
    v-model:visible="state.libVisible"
    :componentLibData="state.componentLibData"
    @addSuccess="setComponentConfig"
  ></component-lib-import-dialog>
</template>

<script setup>
import { reactive, onMounted, computed } from 'vue'
import { Pager as TinyPager } from '@opentiny/vue'
import { IconWriting, IconDel, IconSetting } from '@opentiny/vue-icon'
import { useRouter } from 'vue-router'
import MaterialCard from '@/common/components/MaterialCard'
import CardFilter from '@/common/components/CardFilter.vue'
import { SESSION_STORAGE, ACTION_ID, useFetchData, framework } from 'lowcode-design-controller/utils'
import { useModal, user, isGuest as isGuestFunc } from 'lowcode-design-controller'
import { fetchComponentLib, fetchComponentLibCount, requestDeleteComponentLib } from '../http'
import useComponent from './js/useComponent'
import ComponentLibImportDialog from './ComponentLibImportDialog.vue'

const { confirm, message } = useModal()
const { refreshComponentLibData } = useComponent()
const router = useRouter()
const addTitle = '组件库'

let searchValue = ''
const isGuest = isGuestFunc()
const state = reactive({
  filterRes: {},
  isAll: true,
  showHelp: false,
  libVisible: false,
  componentLibData: {}
})

const filters = [
  {
    id: 'framework',
    name: '按技术栈',
    children: framework
  }
]

const moreAction = computed(() => {
  return isGuest || state.isAll
    ? []
    : [
        { id: ACTION_ID.edit, icon: IconWriting(), content: '编辑' },
        { id: ACTION_ID.set, icon: IconSetting(), content: '组件配置' },
        { id: ACTION_ID.delete, icon: IconDel(), content: '删除' }
      ]
})

const { fetchState, currentChange, pageSizeChange, doFetch, resetPage } = useFetchData({
  errorMsg: `获取${addTitle}列表失败`,
  getCount: fetchComponentLibCount,
  getExtParams() {
    const params = {}
    const { filterRes } = state

    if (!state.isAll) {
      params.createdBy = user.current.id
    }

    if (searchValue) {
      params['_where[_or][1][name_contains]'] = searchValue
      params['_where[_or][2][description_contains]'] = searchValue
    }

    if (filterRes.framework) {
      params.framework_in = filterRes.framework?.join(',')
    }
    if (filterRes.framework !== undefined && !filterRes.framework.length) {
      params.framework_in = 'Vue,Angular,React,HTML'
    }

    return params
  }
})

const getComponentLib = () => {
  doFetch({
    request: fetchComponentLib,
    errorMsg: `获取${addTitle}列表失败`,
    getCount: fetchComponentLibCount,
    oldPage: true
  })
}

const releaseComponentLib = () => {
  state.libVisible = true
  state.componentLibData = {}
}

const deleteComponentLib = ({ id, name }) => {
  const title = '删除组件库'
  const status = 'warning'
  const messageText = `您确定要删除 ${name} 吗?`

  const exec = () => {
    requestDeleteComponentLib(id)
      .then(doFetch)
      .catch((error) => {
        message({ message: `删除组件库失败: ${error.message || error}`, status: 'error' })
      })
  }

  confirm({ title, status, message: messageText, exec })
}

const getSessionPage = () => {
  let lastData = null

  try {
    lastData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.lastComponentLibData))
  } catch (error) {
    message({ message: '组件库数据获取失败', status: 'error' })
  }

  if (lastData) {
    fetchState.currentPage = lastData.currentPage
    fetchState.pageSize = lastData.pageSize
    sessionStorage.setItem(SESSION_STORAGE.lastComponentLibData, null)
  } else {
    resetPage()
  }
}

const getData = () => {
  getSessionPage()
  getComponentLib()
}

const toggleAll = (params) => {
  state.isAll = params
  getData()
}

const search = (name) => {
  searchValue = name
  getData()
}

const filter = (params) => {
  state.filterRes = params
  getData()
}

// 组件库设置
const editComponentLib = (item) => {
  state.libVisible = true
  state.componentLibData = item
}

// 组件配置
const setComponentConfig = (item) => {
  if (!item) return

  sessionStorage.setItem(SESSION_STORAGE.componentLib, JSON.stringify(item))
  sessionStorage.setItem(SESSION_STORAGE.lastComponentData, JSON.stringify(fetchState))
  refreshComponentLibData()

  router.push({
    name: 'componentsLibImport'
  })
}

const clickMore = ({ item, action }) => {
  const actionMap = new Map([
    [ACTION_ID.edit, () => editComponentLib(item)],
    [ACTION_ID.set, () => setComponentConfig(item)],
    [ACTION_ID.delete, () => deleteComponentLib(item)]
  ])

  if (actionMap.has(action.id)) {
    actionMap.get(action.id)()
  }
}

onMounted(getData)
</script>
