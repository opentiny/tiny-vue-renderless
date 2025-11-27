<template>
  <div :class="{ 'is-loading': isLoading }">
    <div class="mymaterial-content">
      <div class="mymaterial-content-tool">
        <card-filter
          releaseButtonText="创建物料包"
          :filters="filters"
          :filterRes="state.filterRes"
          :isShowRelease="state.isAll && !guestFlag"
          @toggleAll="toggleAll"
          @release="state.createVisibility = true"
          @filter="filter"
          @search="search"
        ></card-filter>
      </div>
      <div class="mymaterial-content-cardlist">
        <card-list
          v-if="fetchState.data?.length"
          :data="fetchState.data"
          height="auto"
          @clickMore="clickMore"
        ></card-list>
        <div v-else-if="fetchState.empty" class="no-data">
          <empty-data></empty-data>
        </div>
        <tiny-pager
          layout="sizes, total, prev, pager, next"
          :current-page="fetchState.currentPage"
          :total="fetchState.total"
          :page-size="fetchState.pageSize"
          :page-sizes="fetchState.pageSizes"
          @size-change="pageSizeChange"
          @current-change="currentChange"
        ></tiny-pager>
      </div>
    </div>
  </div>
  <material-create-dialog
    :boxVisibility="state.createVisibility"
    title="创建物料资产包"
    :errInfo="state.errorInfo"
    @cancel="createCancel"
    @save="createMaterial"
  ></material-create-dialog>
  <material-detail
    :boxVisibility="state.detailVisibility"
    :detail="state.selectedCard"
    :versions="state.versionData"
    @cancel="state.detailVisibility = false"
  ></material-detail>
</template>

<script lang="jsx">
import { reactive, onMounted } from 'vue'
import { Pager } from '@opentiny/vue'
import { IconEyeopen } from '@opentiny/vue-icon'
import { useRouter } from 'vue-router'
import { useModal, user, isGuest, isNoTenant } from 'lowcode-design-controller'
import CardFilter from '@/common/components/CardFilter.vue'
import CardList from '@/common/components/CardList'
import MaterialCreateDialog from './MaterialCreateDialog.vue'
import MaterialDetail from './MaterialDetail.vue'
import EmptyData from '../../common/components/EmptyData.vue'
import { fetchMaterial, getMaterialCount, requestDeleteMaterial, fetchVersion, requestCreateMaterial } from '../http'
import { SESSION_STORAGE, ACTION_ID, useFetchData, framework } from 'lowcode-design-controller/utils'

export default {
  components: {
    TinyPager: Pager,
    CardList,
    CardFilter,
    MaterialCreateDialog,
    MaterialDetail,
    EmptyData
  },
  setup(props) {
    const router = useRouter()
    const { confirm, message } = useModal()
    const guestFlag = isGuest()
    const noTenantFlag = isNoTenant()
    const allAction = guestFlag || noTenantFlag ? [] : [{ id: ACTION_ID.check, icon: IconEyeopen(), content: '查看' }]
    const myAction =
      guestFlag || noTenantFlag
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

    const getMoreAction = (data) => {
      const action = state.isAll ? allAction : myAction

      const newData = data.map((item) => {
        item.moreAction = action

        return item
      })

      return newData
    }

    const { fetchState, currentChange, pageSizeChange, doFetch, isLoading } = useFetchData({
      request: fetchMaterial,
      routeName: 'myMaterial',
      errorMsg: '获取物料列表失败',
      getCount: getMaterialCount,
      getMoreAction,
      getExtParams() {
        const { filterRes } = state
        const params = {}
        const createdBy = state.isAll ? '' : user.current.id

        if (createdBy) {
          params.createdBy = createdBy
        }
        if (state.searchValue) {
          params['_where[_or][0][name_contains]'] = state.searchValue
          params['_where[_or][1][description_contains]'] = state.searchValue
          params['_where[_or][2][name_cn_contains]'] = state.searchValue
        }
        if (filterRes.framework) {
          params.framework_in = filterRes.framework
        }

        return params
      }
    })
    const filters = [
      {
        id: 'framework',
        name: '按技术栈',
        children: structuredClone(framework)
      }
    ]

    const toggleAll = (params) => {
      state.isAll = params
      if (params === false) {
        fetchState.currentPage = 1
      }
      doFetch()
    }

    const filter = (params) => {
      state.filterRes = params
      doFetch()
    }

    const search = (params) => {
      state.searchValue = params
      doFetch()
    }

    const state = reactive({
      selectValue: 'updateReverse',
      filterRes: {},
      createVisibility: false,
      detailVisibility: false,
      isAll: true,
      searchValue: '',
      versionData: [],
      times: 'all',
      showVersionBack: false,
      selectedCard: {},
      defaultImg: `${import.meta.env.BASE_URL}img/default.png`,
      errorInfo: ''
    })

    const createCancel = () => {
      state.createVisibility = false
      state.errorInfo = ''
    }

    const createMaterial = (createData) => {
      const params = {
        name: createData.name,
        name_cn: createData.name_cn,
        description: createData.description,
        framework: createData.framework,
        version: createData.version,
        isOfficial: createData.isOfficial,
        isDefault: createData.isDefault,
        user_blocks: [],
        user_components: [],
        public: createData.public,
        public_scope_tenants: createData.public_scope_tenants,
        image_url: createData.image_url,
        business_categories: createData.business_categories
      }

      state.errorInfo = ''
      requestCreateMaterial(params)
        .then((data) => {
          sessionStorage.setItem(SESSION_STORAGE.material, JSON.stringify(data))
          sessionStorage.setItem(SESSION_STORAGE.createMaterialType, 'create')
          router.push({
            name: 'createMaterial'
          })
        })
        .catch((error) => {
          state.errorInfo = error.message || error
        })
    }

    const getMaterial = () => {
      fetchState.filter = ''
      fetchState.sort = 'updateReverse'
      doFetch()
    }

    const versionBack = () => {
      state.showVersionBack = false
      doFetch()
    }

    const getSessionPage = () => {
      let lastData = null

      try {
        lastData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.lastMaterialData))
      } catch (error) {
        lastData = null
      }

      if (lastData) {
        fetchState.currentPage = lastData.currentPage
        fetchState.pageSize = lastData.pageSize
        sessionStorage.setItem(SESSION_STORAGE.lastMaterialData, null)
      }
    }

    onMounted(() => {
      fetchState.pageSize = 15
      fetchState.pageSizes = [15, 30, 45]
      getSessionPage()
      doFetch()
    })

    const editMaterial = (item) => {
      sessionStorage.setItem(SESSION_STORAGE.material, JSON.stringify(item))
      sessionStorage.setItem(SESSION_STORAGE.lastMaterialData, JSON.stringify(fetchState))
      router.push({
        name: 'createMaterial'
      })
    }

    const deleteMaterial = (item) => {
      const { id, name_cn } = item
      const title = '删除物料包'
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${name_cn} 吗?`}</span>
      }
      const exec = () => {
        requestDeleteMaterial(id)
          .then(doFetch)
          .catch((error) => {
            message({ message: `删除物料失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const getVersionData = (item) => {
      fetchVersion(item.id)
        .then((data) => {
          data.forEach((item) => {
            item.url = item.assets_url?.material[0] || ''
          })

          state.versionData = data
        })
        .catch((error) => {
          message({ message: `获取物料历史版本失败: ${error.message || error}`, status: 'error' })
        })
    }

    const getVersion = (item) => {
      state.detailVisibility = true
      state.showVersionBack = true
      state.selectedCard = item
      getVersionData(item)
    }

    const checkMaterial = (item) => {
      state.selectedCard = item
      state.detailVisibility = true
      getVersionData(item)
    }

    const clickMore = ({ item, action }) => {
      const actionMap = new Map([
        [ACTION_ID.edit, () => editMaterial(item)],
        [ACTION_ID.checkHistory, () => getVersion(item)],
        [ACTION_ID.delete, () => deleteMaterial(item)],
        [ACTION_ID.check, () => checkMaterial(item)]
      ])

      if (actionMap.has(action.id)) {
        actionMap.get(action.id)()
      }
    }

    return {
      state,
      filter,
      search,
      toggleAll,
      filters,
      guestFlag,
      clickMore,
      versionBack,
      createCancel,
      createMaterial,
      pageSizeChange,
      currentChange,
      fetchState,
      doFetch,
      getMaterial,
      isLoading
    }
  }
}
</script>

<style lang="less" scoped>
.mymaterial-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  &-tool {
    text-align: right;
    margin: 20px 0 14px;
    &-search {
      width: 300px;
      :deep(.tiny-input__inner) {
        height: 32px;
      }
    }
    .tiny-select {
      width: 140px;
      margin-left: 12px;
      :deep(.tiny-input__inner) {
        height: 32px;
      }
    }
  }
  &-cardlist {
    flex: 1;
    &-wrap {
      display: flex;
      align-items: center;
      margin: 12px 0;
    }
    &-icon {
      cursor: pointer;
    }
    &-line {
      display: inline-block;
      background: #000000;
      width: 1px;
      height: 16px;
      margin: 12px 10px;
      opacity: 0.3;
    }
    &-title {
      font-size: 16px;
      line-height: 24px;
      margin-left: 4px;
    }
    .info-top {
      color: #adb0b8;
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #252b3a;
      }
      & :not(:first-child) {
        margin-left: 4px;
      }
    }
    .info-bottom {
      margin-top: 8px;
      color: #adb0b8;
      & :not(:first-child) {
        margin-left: 18px;
      }
    }
  }
}
.no-data {
  height: 100%;
  margin: 32px 0;
}
.page-layout.is-loading {
  min-height: calc(100% - 220px);
}
</style>
