<template>
  <div class="teams-list">
    <div class="teams-title-content">
      <div class="teams-title">组织管理</div>
      <div class="tenant-list-title">
        <tiny-button type="primary" @click="gridRef.insert({})">添加组织</tiny-button>
        <tiny-search v-model="state.tenantValue" placeholder="请输入关键字"></tiny-search>
      </div>
    </div>

    <tiny-grid
      ref="gridRef"
      auto-resize
      :fetch-data="{ api: getData }"
      :pager="state.pagerConfig"
      :edit-rules="{ tenant_id: { required: true } }"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      seq-serial
      @edit-closed="saveTenant"
    >
      <tiny-grid-column
        field="tenant_id"
        title="组织名称"
        :editor="{
          component: 'input',
          autoselect: true
        }"
      ></tiny-grid-column>
      <tiny-grid-column title="创建时间">
        <template #default="data">
          <div>{{ data.row.created_at ? format(new Date(data.row.created_at)) : '' }}</div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="更新时间">
        <template #default="data">
          <div>{{ data.row.updated_at ? format(new Date(data.row.updated_at)) : '' }}</div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="操作" width="160">
        <template v-slot="data">
          <template v-if="!gridRef?.hasActiveRow(data.row)">
            <tiny-button size="mini" @click="gridRef.setActiveRow(data.row)">编辑</tiny-button>
            <tiny-button size="mini" @click="deleteTenant(data.row)">删除</tiny-button>
          </template>
        </template>
      </tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script lang="jsx">
import { reactive, ref, watch } from 'vue'
import { Search, Button, Grid, GridColumn, Pager, DatePicker, Select } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { format } from '@opentiny/vue-renderless/common/date'
import { fetchTenant, requestUpdateTenant, requestCreateTenant, requestDeleteTenant } from './http'

export default {
  components: {
    TinySearch: Search,
    TinyButton: Button,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn
  },
  setup() {
    const { confirm, message } = useModal()
    const gridRef = ref(null)

    const state = reactive({
      tenantValue: '',
      pagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 5,
          pageSizes: [5, 10],
          total: 0,
          layout: 'total, prev, pager, next, sizes'
        }
      }
    })

    const getData = ({ page, filterTenant }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize

      return new Promise((resolve) => {
        fetchTenant()
          .then((data) => {
            let total = data.length

            let result = data.slice(offset, offset + pageSize)

            if (filterTenant || state.tenantValue) {
              result = data.filter((item) =>
                item.tenant_id.toLowerCase().includes((filterTenant || state.tenantValue).toLowerCase())
              )
              total = result.length
              result = result.slice(offset, offset + pageSize)
            }

            resolve({ result, page: { total: total } })
          })
          .catch((error) => {
            message({ message: `获取组织列表失败: ${error.message || error}`, status: 'error' })
          })
      })
    }

    const saveTenant = ({ row }) => {
      if (!row.tenant_id) {
        return
      }

      if (row.id) {
        requestUpdateTenant(row)
          .then(() => {
            gridRef.value.handleFetch()
          })
          .catch((error) => {
            message({ message: `组织更新失败: ${error.message || error}`, status: 'error' })
          })
      } else {
        requestCreateTenant(row)
          .then(() => {
            gridRef.value.handleFetch()
          })
          .catch((error) => {
            message({ message: `组织添加失败: ${error.message || error}`, status: 'error' })
          })
      }
    }

    const deleteTenant = (row) => {
      const { id, tenant_id, created_at } = row

      if (!created_at) {
        gridRef.value.remove(row)

        return
      }
      const title = '删除组织'
      const status = 'warning'
      const messageRender = {
        render: () => <span>{`您确定要删除 ${tenant_id} 吗?`}</span>
      }
      const exec = () => {
        requestDeleteTenant(id)
          .then(() => {
            gridRef.value.handleFetch()
          })
          .catch((error) => {
            message({ message: `组织删除失败: ${error.message || error}`, status: 'error' })
          })
      }

      confirm({ title, status, message: messageRender, exec })
    }

    const filterData = (value) => {
      gridRef.value.fetchData.args = { filterTenant: value }
      gridRef.value.handleFetch()
    }

    watch(
      () => state.tenantValue,
      (value) => {
        filterData(value)
      }
    )

    return {
      state,
      gridRef,
      getData,
      DatePicker,
      Select,
      deleteTenant,
      saveTenant,
      format
    }
  }
}
</script>

<style lang="less" scoped>
.teams-list {
  background-color: #fff;

  margin-bottom: 20px;
  padding: 32px 20px 24px;
  .teams-title {
    font-size: 16px;
    font-weight: bold;
  }
  .tenant-list-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0;
    .tiny-search {
      margin-right: 24px;
      width: 270px;
    }

    .tiny-button {
      flex-shrink: 0;
      max-width: none;
      height: 32px;
    }
  }
}
</style>
