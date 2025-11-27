<template>
  <div class="application-list">
    <tiny-grid ref="grid" :fetch-data="gridOp.fetchData" :pager="gridOp.pagerConfig">
      <template #toolbar>
        <tiny-grid-toolbar>
          <template #buttons>
            <div class="toolbar-content">
              <tiny-input v-model="state.formData.platform" placeholder="请输入设计器id" clearable></tiny-input>
              <tiny-input v-model="state.formData.name_contains" placeholder="请输入应用名称" clearable></tiny-input>
              <tiny-select v-model="state.formData.is_demo" :options="options" clearable></tiny-select>
              <tiny-select v-model="state.formData.is_default" :options="isDefaultOptions" clearable></tiny-select>
              <tiny-button type="primary" @click="search">搜索</tiny-button>
            </div>
          </template>
        </tiny-grid-toolbar>
      </template>
      <tiny-grid-column type="index" width="60"></tiny-grid-column>
      <tiny-grid-column field="name" title="应用名称"></tiny-grid-column>
      <tiny-grid-column field="createdBy" title="创建者" width="240">
        <template #default="data">
          <span>{{ data.row.createdBy?.username }}</span>
        </template>
      </tiny-grid-column>
      <tiny-grid-column field="description" title="应用描述"></tiny-grid-column>
      <tiny-grid-column field="created_at" title="创建时间" format-text="longDateTime"></tiny-grid-column>
      <tiny-grid-column title="默认 应用 " width="160">
        <template v-slot="data">
          <tiny-button size="mini" @click="setMetaData(data.row, 'is_default', !data.row.is_default)">{{
            data.row.is_default ? '禁用' : '启用'
          }}</tiny-button>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="DEMO 应用 " width="160">
        <template v-slot="data">
          <tiny-button size="mini" @click="setMetaData(data.row, 'is_demo', !data.row.is_demo)">{{
            data.row.is_demo ? '禁用' : '启用'
          }}</tiny-button>
        </template>
      </tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Grid, GridColumn, Pager, Button, Input, GridToolbar, Select } from '@opentiny/vue'
import { fetchAppList, requestApplicationMeta } from './http'
import { useModal } from 'lowcode-design-controller'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyGridToolbar: GridToolbar,
    TinyButton: Button,
    TinyInput: Input,
    TinySelect: Select
  },
  props: {
    platformId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const grid = ref(null)
    const getApplicationList = ({ page }) => {
      const curPage = page?.currentPage
      const pageSize = page?.pageSize

      state.formData._start = (curPage - 1) * pageSize
      state.formData._limit = pageSize

      return new Promise((resolve) => {
        const params = {}

        for (const [key, value] of Object.entries(state.formData)) {
          if (value !== '') {
            params[key] = value
          }
        }

        fetchAppList(params).then(({ list, total }) => {
          resolve({ result: list, page: { total } })
        })
      })
    }

    const gridOp = {
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
        api: getApplicationList
      }
    }

    const state = reactive({
      formData: {
        name_contains: '',
        is_demo: '',
        is_default: '',
        platform: props.platformId || ''
      }
    })

    const setMetaData = (data, key, confirm) => {
      requestApplicationMeta(data.id, { id: data.id, [key]: confirm }).then((res) => {
        if (res) {
          data[key] = confirm
          useModal().message({ message: '设置成功！', status: 'success' })
        }
      })
    }

    const search = () => {
      grid.value.pagerConfig.currentPage = 1
      grid.value.handleFetch()
    }

    return {
      grid,
      gridOp,
      state,
      setMetaData,
      search,
      options: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '是 DEMO 应用',
          value: true
        },
        {
          label: '非 DEMO 应用',
          value: false
        }
      ],
      isDefaultOptions: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '是 默认 应用',
          value: true
        },
        {
          label: '非 默认 应用',
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 10px;
  }
}
</style>
