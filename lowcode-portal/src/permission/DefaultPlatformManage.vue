<template>
  <div class="application-list">
    <tiny-grid ref="grid" :fetch-data="platformOp.fetchData" :pager="platformOp.pagerConfig">
      <template #toolbar>
        <tiny-grid-toolbar>
          <template #buttons>
            <div class="toolbar-content">
              <tiny-input
                v-model="state.platformFormData.name_contains"
                placeholder="请输入设计器名称"
                clearable
              ></tiny-input>
              <tiny-select v-model="state.platformFormData.is_default" :options="options" clearable></tiny-select>
              <tiny-button type="primary" @click="search">搜索</tiny-button>
            </div>
          </template>
        </tiny-grid-toolbar>
      </template>
      <tiny-grid-column field="id" title="id" width="60"></tiny-grid-column>
      <tiny-grid-column field="name" title="设计器名称"></tiny-grid-column>
      <tiny-grid-column field="description" title="设计器描述"></tiny-grid-column>
      <tiny-grid-column field="created_at" title="创建时间" format-text="longDateTime"></tiny-grid-column>
      <tiny-grid-column title="默认设计器" width="160">
        <template v-slot="data">
          <tiny-button size="mini" @click="setMetaData(data.row, !data.row.is_default)">{{
            data.row.is_default ? '禁用' : '启用'
          }}</tiny-button>
        </template>
      </tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Grid, GridColumn, Pager, Button, Input, GridToolbar, Select } from '@opentiny/vue'
import { requestPlatformMeta, fetchPlatformList } from './http'
import { useModal } from 'lowcode-design-controller'
import { useRouter } from 'vue-router'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyGridToolbar: GridToolbar,
    TinyButton: Button,
    TinyInput: Input,
    TinySelect: Select
  },
  setup() {
    const grid = ref(null)

    const getPlatformList = ({ page }) => {
      const curPage = page?.currentPage
      const pageSize = page?.pageSize

      state.platformFormData._start = (curPage - 1) * pageSize
      state.platformFormData._limit = pageSize

      return new Promise((resolve) => {
        const params = {}

        for (const [key, value] of Object.entries(state.platformFormData)) {
          if (value !== '') {
            params[key] = value
          }
        }

        fetchPlatformList(params).then(({ list, total }) => {
          resolve({ result: list, page: { total } })
        })
      })
    }

    const platformOp = {
      pagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20, 50],
          total: 0,
          layout: 'total, prev, pager, next, jumper, sizes'
        }
      },
      fetchData: {
        api: getPlatformList
      }
    }

    const state = reactive({
      platformFormData: {
        name_contains: '',
        is_default: ''
      }
    })

    const router = useRouter()

    const setMetaData = (data, isDefault) => {
      requestPlatformMeta(data.id, { id: data.id, is_default: isDefault }).then((data) => {
        if (data) {
          grid.value.handleFetch()
          const { confirm, message } = useModal()

          if (isDefault) {
            confirm({
              title: '启用成功',
              message: '是否前往设置该设计器默认应用',
              status: 'success',
              exec: () => {
                router.push({ name: 'applicationManage', params: { platformId: data.id } })
              }
            })

            return
          }
          message({ message: '禁用成功' })
        }
      })
    }

    const search = () => {
      grid.value.pagerConfig.currentPage = 1
      grid.value.handleFetch()
    }

    return {
      platformOp,
      grid,
      state,
      setMetaData,
      search,
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '是 默认 设计器',
          value: true
        },
        {
          label: '非 默认 设计器',
          value: false
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.application-list {
  background-color: #fff;
  padding: 20px;
  .tiny-tag {
    margin-right: 2px;
    margin-top: 10px;
  }

  .toolbar-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 10px;
  }
}
</style>
