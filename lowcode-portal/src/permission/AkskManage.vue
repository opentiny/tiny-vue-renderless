<template>
  <div class="aksk-list">
    <span class="title">AK/SK 申请</span>
    <tiny-alert type="info" class="mb20">
      <template #description>
        如果访问密钥泄露，会带来数据泄露风险，
        <span class="warning"
          >且每个访问密钥仅能下载一次，为了帐号安全性，建议您定期更换并妥善保存访问密钥。</span
        ></template
      >
    </tiny-alert>
    <div class="list-header mb20">
      <tiny-button @click="openCreateDialog">创建AK/SK</tiny-button>
      <tiny-search
        v-model="state.searchKeyword"
        class="search"
        placeholder="请输入AK进行搜索"
        clearable
        @search="search"
      ></tiny-search>
    </div>
    <tiny-grid
      ref="gridRef"
      auto-resize
      :fetch-data="{ api: getData }"
      :sort-config="{ trigger: 'cell' }"
      :pager="state.pagerConfig"
      seq-serial
      @sort-change="sortChangeEvent"
    >
      <tiny-grid-column field="access_key" title="AK"></tiny-grid-column>
      <tiny-grid-column field="desc" title="描述" show-overflow width="160"></tiny-grid-column>
      <tiny-grid-column field="status" title="状态" width="140">
        <template #default="{ row }">
          <div class="icon-container">
            <img v-if="row.status === 1" class="icon" src="/src/svgs/assets/run.svg" />
            <img v-if="row.status === 0" class="icon" src="/src/svgs/assets/stop.svg" />
            <span class="ml4">{{ statusFormat(row.status) }}</span>
          </div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column
        field="created_at"
        title="创建时间"
        sortable
        format-text="longDateTime"
        width="140"
      ></tiny-grid-column>
      <tiny-grid-column title="操作">
        <template v-slot="{ row }">
          <tiny-button size="mini" @click="openEditDialog(row)">编辑</tiny-button>
          <tiny-button size="mini" @click="openChangeStatusDialog(row)">{{ getOperationName(row.status) }}</tiny-button>
          <tiny-button size="mini" @click="openDeleteDialog(row)">删除</tiny-button>
        </template>
      </tiny-grid-column>
    </tiny-grid>
  </div>

  <!-- 创建AK/SK 弹窗 -->
  <tiny-dialog-box
    v-model:visible="state.showCreateDialog"
    :close-on-click-modal="false"
    title="创建AK/SK"
    @closed="cancelCreateFn"
  >
    <tiny-form ref="createRef" label-position="left" label-width="45px" :model="state.create" :rules="rules">
      <tiny-form-item label="描述" prop="desc">
        <tiny-input
          v-model="state.create.desc"
          type="textarea"
          placeholder="请输入"
          :maxlength="255"
          show-word-limit
          :rows="6"
        ></tiny-input>
      </tiny-form-item>
    </tiny-form>
    <template #footer>
      <tiny-button type="primary" @click="createAksk">确定</tiny-button>
      <tiny-button @click="cancelCreateFn">取消</tiny-button>
    </template>
  </tiny-dialog-box>
  <!-- 创建AK/SK成功 -->
  <tiny-modal
    v-model="state.showCreateSuccessDialog"
    title="创建成功"
    status="success"
    :lock-scroll="false"
    esc-closable
    :show-footer="false"
  >
    <template #default>
      <span class="warning">请复制SK，关闭弹窗后将不再显示。</span>

      <tiny-form label-position="left" label-width="100px" class="mt30 mb50">
        <tiny-form-item label="AK">
          <span>{{ state.createSuccess.ak }}</span>
        </tiny-form-item>
        <tiny-form-item label="SK">
          <span>{{ state.createSuccess.sk }}</span>

          <tiny-tooltip
            v-model="state.showTooltip"
            content="复制成功"
            placement="right"
            :manual="true"
            :hide-after="1000"
          >
            <icon-copy-solid
              class="tiny-svg-size icon-copy-solid copy ml4"
              @click.stop="copyFn(state.createSuccess.sk)"
            ></icon-copy-solid>
          </tiny-tooltip>
        </tiny-form-item>
      </tiny-form>
    </template>
  </tiny-modal>

  <!-- 编辑AK/SK 弹窗 -->
  <tiny-dialog-box v-model:visible="state.showEditDialog" title="编辑AK/SK" width="30%">
    <tiny-form ref="editRef" :model="state.edit" label-position="left" label-width="100px" :rules="rules">
      <tiny-form-item label="AK">
        <span>{{ state.edit.access_key }}</span>
      </tiny-form-item>
      <tiny-form-item label="创建时间">
        <span>{{ format(new Date(state.edit.created_at)) }}</span>
      </tiny-form-item>
      <tiny-form-item label="描述" :rules="state.edit.rules" prop="desc">
        <tiny-input
          v-model="state.edit.desc"
          type="textarea"
          placeholder="请输入"
          :maxlength="255"
          show-word-limit
          :rows="6"
        ></tiny-input>
      </tiny-form-item>
    </tiny-form>
    <template #footer>
      <tiny-button type="primary" @click="editAksk">确定</tiny-button>
      <tiny-button @click="state.showEditDialog = false">取消</tiny-button>
    </template>
  </tiny-dialog-box>

  <!-- 停用/启用 -->
  <tiny-dialog-box v-model:visible="state.showChangeStatusDialog">
    <template #title>
      <div class="icon-container">
        <div class="icon-alarm"></div>
        <span class="dialog-title ml4">{{ getChangeStatusTitle(state.changeStatus.status) }}</span>
      </div>
    </template>
    <tiny-grid :data="state.changeStatus.data">
      <tiny-grid-column field="access_key" title="AK"></tiny-grid-column>
      <tiny-grid-column field="status" title="状态">
        <template #default="{ row }">
          <div class="icon-container">
            <img v-if="row.status === 1" class="icon" src="/src/svgs/assets/run.svg" />
            <img v-if="row.status === 0" class="icon" src="/src/svgs/assets/stop.svg" />
            <span class="ml4">{{ statusFormat(row.status) }}</span>
          </div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column field="created_at" title="创建时间" format-text="longDateTime"></tiny-grid-column>
    </tiny-grid>
    <template #footer>
      <tiny-button @click="changeStatus">是</tiny-button>
      <tiny-button type="primary" @click="state.showChangeStatusDialog = false">否</tiny-button>
    </template>
  </tiny-dialog-box>

  <!-- 删除 -->
  <tiny-dialog-box v-model:visible="state.showDeleteDialog">
    <template #title>
      <div class="icon-container">
        <div class="icon-alarm"></div>
        <span class="dialog-title ml4">是否删除该AK</span>
      </div>
    </template>
    <div class="warning mb16">删除后原AK将不可用，请谨慎操作。</div>
    <tiny-grid :data="state.remove.data">
      <tiny-grid-column field="access_key" title="AK"></tiny-grid-column>
      <tiny-grid-column field="status" title="状态">
        <template #default="{ row }">
          <div class="icon-container">
            <img v-if="row.status === 1" class="icon" src="/src/svgs/assets/run.svg" />
            <img v-if="row.status === 0" class="icon" src="/src/svgs/assets/stop.svg" />
            <span class="ml4">{{ statusFormat(row.status) }}</span>
          </div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column field="created_at" title="创建时间" format-text="longDateTime"></tiny-grid-column>
    </tiny-grid>
    <template #footer>
      <tiny-button @click="deleteFn">是</tiny-button>
      <tiny-button type="primary" @click="state.showDeleteDialog = false">否</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, ref } from 'vue'
import {
  Alert,
  Button,
  Search,
  Pager,
  Grid,
  GridColumn,
  DatePicker,
  DialogBox,
  Form,
  FormItem,
  Input,
  Notify,
  Tooltip
} from '@opentiny/vue'
import { IconCopySolid } from '@opentiny/vue-icon'
import { format } from '@opentiny/vue-renderless/common/date'
import useClipboard from 'vue-clipboard3'
import { requestAkskList, requestCreateAksk, requestEditAksk, requestDeleteAksk } from './http'

export default {
  components: {
    TinyAlert: Alert,
    TinyButton: Button,
    TinySearch: Search,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyDialogBox: DialogBox,
    TinyInput: Input,
    TinyTooltip: Tooltip,
    IconCopySolid: IconCopySolid()
  },

  setup() {
    const gridRef = ref(null)
    const createRef = ref(null)
    const editRef = ref(null)
    const { toClipboard } = useClipboard()

    const refreshData = () => {
      gridRef.value.handleFetch()
    }

    const state = reactive({
      searchKeyword: '',
      pagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 5,
          pageSizes: [5, 10],
          total: 0,
          layout: 'total, prev, pager, next, jumper, sizes'
        }
      },
      sort: { order: '' },
      shouldQueryData: true,
      sourceData: [],
      showCreateDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      showCreateSuccessDialog: false,
      showChangeStatusDialog: false,
      showTooltip: false,
      create: {
        desc: '',
        rules: {
          desc: { type: 'date', trigger: 'change', min: 1, max: 255 }
        }
      },
      createSuccess: { ak: '', sk: '' },
      edit: {
        desc: '',
        rules: {
          desc: { type: 'date', trigger: 'change', min: 1, max: 255 }
        }
      },
      changeStatus: { id: '', status: '', data: [] },
      query: { ak: '' },
      remove: { id: '', data: [] }
    })

    const copyFn = async (text) => {
      try {
        await toClipboard(text)
        state.showTooltip = true
        setTimeout(() => {
          state.showTooltip = false
        }, 1000)
      } catch (e) {
        // do nothing
      }
    }

    const sortChangeEvent = ({ order }) => {
      state.sort.order = order
      state.shouldQueryData = false
      refreshData()
    }
    const openCreateDialog = () => {
      state.create.desc = ''
      state.showCreateDialog = true
    }

    const openEditDialog = (row) => {
      state.edit = { ...row }
      state.showEditDialog = true
    }

    const openChangeStatusDialog = (row) => {
      state.changeStatus.id = row.id
      state.changeStatus.status = row.status
      state.changeStatus.data = [row]
      state.showChangeStatusDialog = true
    }

    const getChangeStatusData = () => {
      return Promise.resolve(state.changeStatus.data)
    }

    const openDeleteDialog = (row) => {
      state.remove.id = row.id
      state.remove.data = [row]
      state.showDeleteDialog = true
    }

    const openCreateSuccessDialog = ({ ak, sk }) => {
      state.showCreateSuccessDialog = true
      state.createSuccess.ak = ak
      state.createSuccess.sk = sk
      state.showTooltip = false
    }

    const cancelCreateFn = () => {
      state.showCreateDialog = false
    }

    const getSortedData = (array, order) => {
      let sortFn = null

      if (order === 'asc') {
        sortFn = (a, b) => new Date(a.created_at) - new Date(b.created_at)

        return [...array].sort(sortFn)
      } else if (order === 'desc') {
        sortFn = (a, b) => new Date(b.created_at) - new Date(a.created_at)

        return [...array].sort(sortFn)
      }

      return array
    }

    const getData = async ({ page }) => {
      const params = state.query.ak ? state.query : null

      let { currentPage, pageSize } = page

      let offset = (currentPage - 1) * pageSize

      const res = state.shouldQueryData ? await requestAkskList(params) : state.sourceData

      state.pagerConfig.attrs.total = res.length
      state.sourceData = res

      const sorted = getSortedData(res, state.sort.order)

      return {
        result: sorted.slice(offset, offset + pageSize),
        sort: true,
        page: { total: res.length, currentPage }
      }
    }

    const search = (key, value) => {
      state.query.ak = value
      state.shouldQueryData = true
      refreshData()
    }

    const statusFormat = (status) => {
      const map = { 0: '停用', 1: '启用' }

      return map[status]
    }

    const validateFn = (ref) => {
      return new Promise((resolve, reject) => {
        ref.value.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject(new Error())
          }
        })
      })
    }

    const successCallback = (message) => () => {
      Notify({
        type: 'success',
        message,
        position: 'top-right'
      })
      state.shouldQueryData = true
      refreshData()
    }

    const failCallback = (text) => (error) => {
      Notify({
        type: 'error',
        position: 'top-right',
        message: `${text}: ${error.message || error}`
      })
    }

    const createAksk = async () => {
      await validateFn(createRef)

      const param = {
        desc: state.create.desc
      }

      requestCreateAksk(param)
        .then((res) => {
          openCreateSuccessDialog(res)
          state.shouldQueryData = true
          refreshData()
        })
        .catch(failCallback('创建AK/SK失败'))
        .finally(() => {
          state.showCreateDialog = false
        })
    }

    const getOperationName = (currentStatus) => {
      return currentStatus === 1 ? '停用' : '启用'
    }

    const getChangeStatusTitle = (currentStatus) => {
      return currentStatus === 1 ? '是否停用该AK' : '是否启用该AK'
    }

    const editAksk = async () => {
      await validateFn(editRef)
      const params = {
        desc: state.edit.desc
      }

      requestEditAksk(state.edit.id, params)
        .then(successCallback('编辑成功'))
        .catch(failCallback('编辑失败'))
        .finally(() => {
          state.showEditDialog = false
        })
    }

    const deleteFn = () => {
      requestDeleteAksk(state.remove.id)
        .then(successCallback('删除AK成功'))
        .catch(failCallback('删除AK失败'))
        .finally(() => {
          state.showDeleteDialog = false
        })
    }

    const changeStatus = () => {
      const params = {
        status: state.changeStatus.status === 1 ? 0 : 1
      }
      const title = params.status === 0 ? '停用AK' : '启用AK'

      requestEditAksk(state.changeStatus.id, params)
        .then(successCallback(`${title}成功`))
        .catch(failCallback(`${title}失败`))
        .finally(() => {
          state.showChangeStatusDialog = false
        })
    }

    return {
      state,
      getData,
      sortChangeEvent,
      openCreateDialog,
      cancelCreateFn,
      DatePicker,
      statusFormat,
      openEditDialog,
      openChangeStatusDialog,
      openDeleteDialog,
      openCreateSuccessDialog,
      getChangeStatusData,
      createAksk,
      editAksk,
      search,
      getOperationName,
      getChangeStatusTitle,
      changeStatus,
      deleteFn,
      format,
      gridRef,
      createRef,
      editRef,
      rules: {
        desc: [{ trigger: 'change', min: 0, max: 255 }]
      },
      copyFn
    }
  }
}
</script>
<style lang="less" scoped>
#Success path.st0 {
  fill: var(--ti-common-color-success) !important;
}

.aksk-list {
  background-color: #fff;
  padding: var(--ti-common-space-5x);
  .tiny-tag {
    margin-right: 2px;
    margin-top: var(--ti-common-space-10);
  }

  .list-header {
    display: flex;
    justify-content: space-between;
  }

  .search {
    width: 20%;
  }
}

.title {
  font-weight: bold;
  font-size: 16px;
}

.dialog-title {
  font-weight: bold;
  font-size: 18px;
}

.icon-alarm {
  width: 18px;
  height: 20px;
  background: url('/src/svgs/assets/alarm.svg') round;
}

.icon-success {
  background: #50d4ab;
}

.copy {
  color: #999;
  width: 14px;
  height: 14px;
  &:hover {
    color: var(--ti-common-color-icon-hover);
  }
}

.mt30 {
  margin-top: 30px;
}

.mb16 {
  margin-bottom: var(--ti-common-space-4x);
}

.mb20 {
  margin-bottom: var(--ti-common-space-5x);
}

.mb50 {
  margin-bottom: 50px;
}

.ml4 {
  margin-left: var(--ti-common-space-base);
}

.warning {
  color: #de504e;
  font-size: var(--ti-common-font-size-base);
  line-height: 18px;
}

.icon {
  width: var(--ti-common-space-4x);
  height: var(--ti-common-space-4x);
  display: inline-block;
}

.icon-container {
  display: flex;
  align-items: center;
}
</style>
