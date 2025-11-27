<template>
  <div>
    <card-filter
      :filters="filters"
      :filterRes="state.filterRes"
      :releaseButtonText="'发布' + addTitle"
      :isShowRelease="state.isAll && !guestFlag"
      @release="releaseBlock"
      @toggleAll="toggleAll"
      @filter="filter"
      @search="search"
    ></card-filter>
    <card-list
      :isBlock="true"
      :data="fetchState.data"
      :isLevel="false"
      :moreAction="state.moreAction"
      type="blocks"
      @clickMore="clickMore"
    ></card-list>
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
    <block-detail
      :boxVisibility="state.detailVisibility"
      :detail="state.detail"
      :versions="state.versions"
      @cancel="state.detailVisibility = false"
    ></block-detail>
  </div>
</template>

<script lang="jsx">
import { Pager } from '@opentiny/vue'
import { IconEyeopen } from '@opentiny/vue-icon'
import { reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import CardFilter from '@/common/components/CardFilter.vue'
import CardList from '@/common/components/CardList'
import { SESSION_STORAGE, ACTION_ID, useFetchData, framework } from 'lowcode-design-controller/utils'
import { useModal, user, isGuest } from 'lowcode-design-controller'
import BlockDetail from './BlockDetail.vue'
import { fetchBlocks, fetchBlocksCount, requestDeleteBlock, fetchBlockDetail } from '../http'
export default {
  components: {
    TinyPager: Pager,
    CardFilter,
    BlockDetail,
    CardList
  },
  setup(props) {
    const { confirm, message } = useModal()
    const router = useRouter()
    const addTitle = '区块'
    const state = reactive({
      detailVisibility: false,
      filterRes: {},
      detail: {
        content: '{}'
      },
      versions: [],
      isAll: true,
      moreAction: []
    })
    const guestFlag = isGuest()
    const allAction = guestFlag ? [] : [{ id: ACTION_ID.check, icon: IconEyeopen(), content: '查看' }]
    const myAction = guestFlag
      ? []
      : [
          {
            id: ACTION_ID.edit,
            icon: <svg-icon name="editor" />,
            content: '编辑'
          },
          {
            id: ACTION_ID.delete,
            icon: <svg-icon name="delete-application" />,
            content: '删除'
          }
        ]
    const filters = [
      {
        id: 'framework',
        name: '按技术栈',
        children: framework
      }
    ]

    let searchValue = ''

    const { fetchState, currentChange, pageSizeChange, doFetch, resetPage } = useFetchData({
      errorMsg: `获取${addTitle}列表失败`,
      getCount: fetchBlocks,
      getExtParams() {
        const params = {}
        const { filterRes } = state

        if (!state.isAll) {
          params.createdBy = user.current.id
        }

        if (searchValue) {
          params['_where[_or][0][name_cn_contains]'] = searchValue
          params['_where[_or][1][description_contains]'] = searchValue
        }

        if (filterRes.framework) {
          params.framework_in = filterRes.framework
        }

        return params
      }
    })

    const getBlocks = () => {
      doFetch({
        request: fetchBlocks,
        errorMsg: `获取${addTitle}列表失败`,
        getCount: fetchBlocksCount,
        oldPage: true
      })
    }

    const releaseBlock = (edit) => {
      if (!edit) {
        sessionStorage.setItem(SESSION_STORAGE.block, null)
      }

      router.push({
        name: 'blockImport'
      })
    }

    const deleteBlock = (block) => {
      const { id, label } = block
      const title = `删除${addTitle}`
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${label} 吗?`}</span>
      }

      const exec = () => {
        requestDeleteBlock(id)
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
        lastData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.lastBlockData))
      } catch (error) {
        message({ message: '区块数据获取失败', status: 'error' })
      }

      if (lastData) {
        fetchState.currentPage = lastData.currentPage
        fetchState.pageSize = lastData.pageSize
        sessionStorage.setItem(SESSION_STORAGE.lastBlockData, null)
      } else {
        resetPage()
      }
    }

    const getData = () => {
      getSessionPage()
      getBlocks()
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

    const editBlock = (item) => {
      sessionStorage.setItem(SESSION_STORAGE.block, JSON.stringify(item))
      sessionStorage.setItem(SESSION_STORAGE.lastBlockData, JSON.stringify(fetchState))
      releaseBlock(true)
    }

    const getVersion = (item) => {
      fetchBlockDetail(item.id)
        .then((data) => {
          state.versions = data.histories?.reverse()
        })
        .catch((error) => {
          message({ message: `获取区块历史版本失败: ${error.message || error}`, status: 'error' })
        })
    }

    const checkBlock = (item) => {
      state.detail = item
      state.detailVisibility = true
      getVersion(item)
    }

    const clickMore = ({ item, action }) => {
      const actionMap = new Map([
        [ACTION_ID.edit, () => editBlock(item)],
        [ACTION_ID.delete, () => deleteBlock(item)],
        [ACTION_ID.check, () => checkBlock(item)]
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
      guestFlag,
      filter,
      filters,
      search,
      toggleAll,
      addTitle,
      releaseBlock,
      clickMore,
      currentChange,
      fetchState,
      pageSizeChange
    }
  }
}
</script>
