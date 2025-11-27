<template>
  <ecology-card
    :type="category"
    :data="fetchState.data"
    :roundImg="category === 'plugin'"
    @create="createExtension"
    @delete="deleteExtension"
    @update="updateExtension"
    @tabChange="tabChange"
  >
    <tiny-pager
      v-if="fetchState.total > fetchState.pageSizes[0]"
      class="ecology-pager"
      layout="sizes, total, prev, pager, next"
      :current-page="fetchState.currentPage"
      :total="fetchState.total"
      :page-size="fetchState.pageSize"
      :page-sizes="fetchState.pageSizes"
      @size-change="pageSizeChange"
      @current-change="currentChange"
    ></tiny-pager>
  </ecology-card>
</template>

<script lang="jsx">
import { onMounted, reactive } from 'vue'
import { Pager } from '@opentiny/vue'
import { useModal, user } from 'lowcode-design-controller'
import { useFetchData } from 'lowcode-design-controller/utils'
import EcologyCard from './EcologyCard'
import {
  requestDeleteEcology,
  requestCreateEcology,
  fetchEcology,
  fetchEcologyCount,
  requestUpdateEcology
} from '../http'

export default {
  components: {
    EcologyCard,
    TinyPager: Pager
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { confirm, message } = useModal()
    const match = {
      plugin: '插件',
      toolbar: '工具栏',
      theme: '主题',
      dsl: 'dsl',
      appExtension: '应用扩展'
    }

    const state = reactive({
      filter: ''
    })
    const { fetchState, currentChange, pageSizeChange, doFetch } = useFetchData({
      request: fetchEcology,
      errorMsg: `获取${match[props.category]}列表失败`,
      getCount: fetchEcologyCount,
      getExtParams() {
        const params = { category: props.category }

        if (state.filter === 'mine') {
          params.createdBy = user.current.id
        }

        if (state.filter === 'official') {
          params.isOfficial = true
        }

        return params
      }
    })

    const deleteExtension = (extension) => {
      const { id, name } = extension
      const title = `删除${match[props.category]}`
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${name} 吗?`}</span>
      }
      const exec = () => {
        requestDeleteEcology(id)
          .then(doFetch)
          .catch((error) => {
            message({ message: `删除${match[props.category]}失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const createExtension = (extension) => {
      extension.category = props.category
      requestCreateEcology(extension)
        .then(doFetch)
        .catch((error) => {
          message({ message: `创建${match[props.category]}失败: ${error.message || error}`, status: 'error' })
        })
    }

    const updateExtension = (extension) => {
      extension.category = props.category
      requestUpdateEcology(extension)
        .then(doFetch)
        .catch((error) => {
          message({ message: `编辑${match[props.category]}失败: ${error.message || error}`, status: 'error' })
        })
    }

    const tabChange = (name) => {
      fetchState.currentPage = 1
      state.filter = name
      doFetch()
    }

    onMounted(doFetch)

    return {
      state,
      match,
      deleteExtension,
      createExtension,
      updateExtension,
      fetchState,
      currentChange,
      pageSizeChange,
      tabChange
    }
  }
}
</script>
