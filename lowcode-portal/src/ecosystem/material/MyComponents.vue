<template>
  <div>
    <card-filter
      :filters="filters"
      :filterRes="state.filterRes"
      :releaseButtonText="'发布' + addTitle"
      :isShowRelease="isAll && !isGuest"
      @release="releaseComponent"
      @toggleAll="toggleAll"
      @filter="filter"
      @search="search"
    ></card-filter>
    <material-card
      :data="fetchState.data"
      :roundImg="false"
      :moreAction="state.moreAction"
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
  <material-detail
    :boxVisibility="state.detailVisibility"
    :detail="state.selectedCard"
    :versions="state.versionData"
    :version="state.version"
    @cancel="state.detailVisibility = false"
  ></material-detail>
</template>

<script lang="jsx">
import { Pager } from '@opentiny/vue'
import { IconEyeopen, IconWriting, IconDel } from '@opentiny/vue-icon'
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import MaterialCard from '@/common/components/MaterialCard'
import CardFilter from '@/common/components/CardFilter.vue'
import MaterialDetail from './MaterialDetail.vue'
import { SESSION_STORAGE, ACTION_ID, useFetchData, framework } from 'lowcode-design-controller/utils'
import { useModal, user, isGuest } from 'lowcode-design-controller'
import { fetchComponents, fetchComponentsCount, requestDeleteComponent } from '../http'
import useComponent from './js/useComponent'
export default {
  components: {
    TinyPager: Pager,
    CardFilter,
    MaterialCard,
    MaterialDetail
  },
  setup(props) {
    const { confirm, message } = useModal()
    const { refreshComponentData } = useComponent()
    const router = useRouter()
    const addTitle = '组件'

    let searchValue = ''
    const state = reactive({
      filterRes: {},
      isAll: true,
      moreAction: [],
      selectedCard: {},
      detailVisibility: false,
      version: false
    })
    const guestFlag = isGuest()
    const allAction = guestFlag ? [] : [{ id: ACTION_ID.check, icon: IconEyeopen(), content: '查看' }]
    const myAction = guestFlag
      ? []
      : [
          { id: ACTION_ID.edit, icon: IconWriting(), content: '编辑' },
          { id: ACTION_ID.check, icon: IconEyeopen(), content: '查看' },
          { id: ACTION_ID.delete, icon: IconDel(), content: '删除' }
        ]

    const filters = [
      {
        id: 'framework',
        name: '按技术栈',
        children: framework
      }
    ]

    const { fetchState, currentChange, pageSizeChange, doFetch, resetPage } = useFetchData({
      errorMsg: `获取${addTitle}列表失败`,
      getCount: fetchComponents,
      getExtParams() {
        const params = {}
        const { filterRes } = state

        if (!state.isAll) {
          params.createdBy = user.current.id
        }

        if (searchValue) {
          // _where[_or][0][component_contains]=test&_where[_or][1][name_contains]=test&_where[_or][2][description_contains]=test
          params['_where[_or][0][component_contains]'] = searchValue
          params['_where[_or][1][name_contains]'] = searchValue
          params['_where[_or][2][description_contains]'] = searchValue
        }

        if (filterRes.framework) {
          params.framework_in = filterRes.framework
        }

        return params
      }
    })

    const getComponents = () => {
      doFetch({
        request: fetchComponents,
        errorMsg: `获取${addTitle}列表失败`,
        getCount: fetchComponentsCount,
        oldPage: true
      })
    }

    const releaseComponent = (edit) => {
      if (!edit) {
        sessionStorage.setItem(SESSION_STORAGE.component, null)
        refreshComponentData()
      }

      router.push({
        name: 'componentImport'
      })
    }

    const deleteComponent = (component) => {
      const { id, name } = component
      const title = `删除${addTitle}`
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${name?.zh_CN} 吗?`}</span>
      }

      const exec = () => {
        requestDeleteComponent(id)
          .then(doFetch)
          .catch((error) => {
            message({ message: `删除${addTitle}失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const getSessionPage = () => {
      let lastData = null

      try {
        lastData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.lastComponentData))
      } catch (error) {
        message({ message: '组件数据获取失败', status: 'error' })
      }

      if (lastData) {
        fetchState.currentPage = lastData.currentPage
        fetchState.pageSize = lastData.pageSize
        sessionStorage.setItem(SESSION_STORAGE.lastComponentData, null)
      } else {
        resetPage()
      }
    }

    const getData = () => {
      getSessionPage()
      getComponents()
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

    const editComponent = (item) => {
      sessionStorage.setItem(SESSION_STORAGE.component, JSON.stringify(item))
      sessionStorage.setItem(SESSION_STORAGE.lastComponentData, JSON.stringify(fetchState))
      refreshComponentData()
      releaseComponent(true)
    }

    const getVersion = (item) => {
      state.showVersionBack = true
      state.selectedCard = item
    }

    const checkMaterial = (item) => {
      state.selectedCard = item
      state.detailVisibility = true
    }

    const clickMore = ({ item, action }) => {
      const actionMap = new Map([
        [ACTION_ID.edit, () => editComponent(item)],
        [ACTION_ID.delete, () => deleteComponent(item)],
        [ACTION_ID.check, () => checkMaterial(item)],
        [ACTION_ID.checkHistory, () => getVersion(item)]
      ])

      if (actionMap.has(action.id)) {
        actionMap.get(action.id)()
      }
    }

    watch(
      () => state.isAll,
      () => {
        state.moreAction = state.isAll ? allAction : myAction
      },
      { immediate: true }
    )

    onMounted(getData)

    return {
      state,
      isGuest,
      filter,
      filters,
      search,
      toggleAll,
      addTitle,
      releaseComponent,
      clickMore,
      currentChange,
      fetchState,
      pageSizeChange
    }
  }
}
</script>
