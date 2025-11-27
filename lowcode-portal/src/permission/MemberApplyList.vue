<template>
  <div class="application-list">
    <tiny-grid ref="grid" :fetch-data="state.fetchData" :pager="state.pagerConfig">
      <tiny-grid-column type="index" width="60"></tiny-grid-column>
      <tiny-grid-column field="username" title="姓名"></tiny-grid-column>
      <tiny-grid-column v-if="isInternalEnv()" field="account" title="工号"></tiny-grid-column>
      <tiny-grid-column field="created_at" title="申请时间" format-text="longDateTime"></tiny-grid-column>
      <tiny-grid-column title="操作">
        <template #default="{ row }">
          <div v-if="row.status === APPLY_STATUS.Apply">
            <tiny-button size="mini" type="primary" @click="pass(row)">通过</tiny-button>
            <tiny-button size="mini" @click="reject(row)">驳回</tiny-button>
          </div>
          <div v-else-if="row.status === APPLY_STATUS.Pass">已通过</div>
          <div v-else-if="row.status === APPLY_STATUS.Reject">已驳回</div>
        </template>
      </tiny-grid-column>
    </tiny-grid>
  </div>
</template>

<script>
import { Grid, GridColumn, Pager, Button } from '@opentiny/vue'
import { useModal, getCurrentTenantId } from 'lowcode-design-controller'
import { isInternalEnv } from '@/utils/env'
import { fetchApplicationList, requestUpdataApply } from './http'

const APPLY_STATUS = {
  Apply: 0,
  Pass: 1,
  Reject: 2
}

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyButton: Button
  },
  setup(props) {
    const { message } = useModal()

    const action = 'joinTenant'

    const getApplicationList = ({ page, filterArgs }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize

      return new Promise((resolve) => {
        fetchApplicationList({ action, tenant_id: getCurrentTenantId() }).then((data) => {
          const result = data.slice(offset, offset + pageSize)

          resolve({ result, page: { total: data.length } })
        })
      })
    }

    const state = {
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

    const pass = (row) => {
      requestUpdataApply(row.id, {
        action,
        status: APPLY_STATUS.Pass
      })
        .then((data) => {
          message({ message: '审批成功' })
          row.status = APPLY_STATUS.Pass
        })
        .catch((error) => {
          message({ message: `审批失败: ${error.message || error}`, status: 'error' })
        })
    }

    const reject = (row) => {
      requestUpdataApply(row.id, {
        action,
        status: APPLY_STATUS.Reject
      })
        .then((data) => {
          message({ message: '驳回成功' })
          row.status = APPLY_STATUS.Reject
        })
        .catch((error) => {
          message({ message: `驳回失败: ${error.message || error}`, status: 'error' })
        })
    }

    return {
      state,
      APPLY_STATUS,
      pass,
      reject,
      isInternalEnv,
      getApplicationList
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
}
</style>
