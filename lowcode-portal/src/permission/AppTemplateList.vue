<template>
  <div class="app-template-list">
    <tiny-grid
      ref="gridRef"
      auto-resize
      :data="state.data"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
      seq-serial
      @edit-closed="saveTemplate"
    >
      <tiny-grid-column field="name" title="模板名称"></tiny-grid-column>
      <tiny-grid-column
        title="应用类别"
        field="template_type"
        :editor="{ component: 'select', options: state.appTypeOptions }"
      >
      </tiny-grid-column>
      <tiny-grid-column title="设置时间">
        <template #default="data">
          <div>{{ data.row.updated_at ? format(new Date(data.row.updated_at)) : '' }}</div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="设置者" field="set_template_by.username"></tiny-grid-column>
      <tiny-grid-column title="操作" width="160">
        <template v-slot="data">
          <template v-if="!gridRef?.hasActiveRow(data.row)">
            <tiny-button size="mini" @click="gridRef.setActiveRow(data.row)">编辑</tiny-button>
            <tiny-button size="mini" @click="$emit('deleteTemplate', data.row)">删除</tiny-button>
          </template>
        </template>
      </tiny-grid-column>
    </tiny-grid>
    <tiny-pager
      v-if="state.custPager.total > state.custPager.pageSizes[0]"
      :current-page="state.custPager.currentPage"
      :page-size="state.custPager.pageSize"
      :total="state.custPager.total"
      :page-sizes="state.custPager.pageSizes"
      layout="total, prev, pager, next, jumper, sizes"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></tiny-pager>
  </div>
</template>

<script lang="jsx">
import { reactive, watch, ref } from 'vue'
import { Button, Grid, GridColumn, Pager } from '@opentiny/vue'
import { format } from '@opentiny/vue-renderless/common/date'
import { appTemplateTypeList } from 'lowcode-design-controller/utils'

export default {
  components: {
    TinyButton: Button,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyPager: Pager
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['saveTemplate', 'deleteTemplate'],
  setup(props, { emit }) {
    const gridRef = ref(null)

    const state = reactive({
      appTypeOptions: appTemplateTypeList,
      custPager: {
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50],
        total: 0
      },
      data: []
    })

    const saveTemplate = ({ row }) => {
      emit('saveTemplate', row)
    }

    const currentChange = (current) => {
      state.custPager.currentPage = current
      state.data = props.tableData.slice((current - 1) * state.custPager.pageSize, current * state.custPager.pageSize)
    }

    const sizeChange = (size) => {
      state.custPager.pageSize = size
      initPage(props.tableData)
    }

    const initPage = (value) => {
      state.custPager.currentPage = 1
      state.custPager.total = value.length ? value.length : 0

      state.data = value.slice(0, state.custPager.pageSize)
    }

    watch(
      () => props.tableData,
      (value) => {
        initPage(value)
      }
    )

    return {
      state,
      gridRef,
      saveTemplate,
      format,
      currentChange,
      sizeChange
    }
  }
}
</script>

<style lang="less" scoped>
.app-template-list {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 16px 20px 24px;
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
