<template>
  <div class="member-setting-table">
    <tiny-button round class="add-button" @click="insertMember">添加成员</tiny-button>
    <tiny-grid
      ref="gridRef"
      class="member-table"
      :data="state.data"
      :edit-config="{ trigger: 'manual', mode: 'row', showStatus: true }"
      height="auto"
    >
      <tiny-grid-column class="table-title" :show-icon="false" field="user" title="姓名" :editor="{}">
        <template #default="{ row }">
          <span>{{ row?.user?.username }}</span>
        </template>
        <template #edit="data">
          <tiny-select
            v-model="state.currentUserId"
            :options="[...userList, { ...data.row.user }]"
            textField="username"
            valueField="id"
            :filterable="true"
          ></tiny-select>
        </template>
      </tiny-grid-column>
      <tiny-grid-column
        :show-icon="false"
        field="created_at"
        :title="renderHeaderAddTime"
        sortable
        format-text="longDateTime"
        show-overflow="ellipsis"
      ></tiny-grid-column>
      <tiny-grid-column
        :show-icon="false"
        field="expired_time"
        :title="renderHeaderOverTime"
        sortable
        :editor="{}"
        format-text="longDateTime"
        show-overflow="ellipsis"
      >
        <template #edit="data">
          <tiny-date-picker
            v-model="state.currentExpiredTime"
            valueFormat="yyyy-MM-dd 23:59:59"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions(data.row.created_at)"
          ></tiny-date-picker>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="操作" class="operation" width="230" align="center">
        <template v-slot="data">
          <template v-if="gridRef && gridRef.hasActiveRow(data.row)">
            <tiny-button type="text" :disabled="!state.currentUserId" @click="saveRowEvent(data.row)">保存</tiny-button>
            <span class="split"> | </span>
            <tiny-button type="text" @click="cancelRowEvent(data.row)">取消</tiny-button>
          </template>
          <template v-else>
            <tiny-button type="text" @click="editRowEvent(data.row)">编辑</tiny-button>
            <span class="split">|</span>
            <tiny-button type="text" @click="deleteRowEvent(data.row)">删除</tiny-button>
          </template>
        </template>
      </tiny-grid-column>
      <template #empty>
        <empty-data></empty-data>
      </template>
    </tiny-grid>
  </div>
</template>

<script lang="jsx">
import { Grid, GridColumn, Button, DatePicker, Select } from '@opentiny/vue'
import { reactive, watch, ref } from 'vue'
import EmptyData from './EmptyData.vue'

export default {
  components: {
    TinyButton: Button,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyDatePicker: DatePicker,
    TinySelect: Select,
    EmptyData
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    userList: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: ''
    }
  },
  emits: ['save-auth', 'delete-auth'],
  setup(props, { emit, expose }) {
    const gridRef = ref(null)
    const state = reactive({
      data: props.tableData,
      activedRow: '',
      currentExpiredTime: null,
      currentUserId: ''
    })

    const editRowEvent = (row) => {
      gridRef.value.setActiveRow(row).then(getActiveRow)

      state.currentExpiredTime = row.expired_time ? new Date(row.expired_time) : null
      state.currentUserId = row.user?.id
    }

    const closeEditingStatus = () => {
      gridRef.value.clearActived()
    }

    const saveRowEvent = (row) => {
      // 必选用户
      if (!state.currentUserId) {
        return
      }

      emit('save-auth', { ...row, expired_time: state.currentExpiredTime, user: state.currentUserId }, props.type)
    }

    const cancelRowEvent = () => {
      gridRef.value.clearActived().then(getActiveRow)
    }

    const getActiveRow = () => {
      const activedRow = gridRef.value.getActiveRow()

      state.activedRow = activedRow ? activedRow.rowIndex : ''
    }

    const deleteRowEvent = (row) => {
      if (row.id) {
        emit('delete-auth', { row, type: props.type })
      } else {
        gridRef.value.remove(row)
      }
    }

    const insertMember = () => {
      gridRef.value.insert({
        type: 'insert'
      })
    }

    const renderHeaderAddTime = (h) => {
      return <span>添加时间</span>
    }

    const renderHeaderOverTime = (h) => {
      return <span>到期时间</span>
    }

    watch(
      () => props.tableData,
      (value) => {
        state.data = value
      },
      { deep: true }
    )

    const pickerOptions = (createTime) => ({
      disabledDate(time) {
        const createDate = createTime ? new Date(createTime) : new Date()

        return time.getTime() < createDate.getTime()
      }
    })

    expose({
      closeEditingStatus
    })

    return {
      state,
      gridRef,
      editRowEvent,
      saveRowEvent,
      cancelRowEvent,
      getActiveRow,
      deleteRowEvent,
      insertMember,
      DatePicker,
      Select,
      renderHeaderAddTime,
      renderHeaderOverTime,
      pickerOptions
    }
  }
}
</script>

<style lang="less" scoped>
.member-setting-table {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 0;
  .member-table {
    margin-top: 20px;
    flex: 1;
    .split {
      color: #dfe1e6;
      margin: 0 8px;
    }
  }
  .add-button {
    align-self: flex-start;
  }
}
:deep(.tiny-grid-header__column.is__editable .tiny-grid-cell) {
  padding-left: 1px;
  font-size: 12px;
  color: #595959;
}
:deep(.tiny-button.tiny-button--text) {
  font-size: 12px;
  color: #191919;
  padding: 0;
}
:deep(.tiny-grid .tiny-grid-header__column.col__center) {
  text-align: left;
  color: #595959;
}
:deep(.tiny-grid .tiny-grid-body__column.col__center) {
  text-align: left;
}
:deep(.tiny-grid .tiny-grid-sort-wrapper) {
  left: -544px;
  top: 2px;
}
:deep(.tiny-grid__body-wrapper) {
  overflow: auto;
}
</style>
