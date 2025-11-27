<template>
  <ecology-detail :visible="state.detailVisibility" :version="version" @cancel="$emit('cancel')">
    <template #base>
      <tiny-form ref="formRef" :model="detail" label-width="100px" :label-align="true" label-position="left">
        <tiny-form-item label="中文名称">
          <div>{{ detail.name_cn || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="英文名称">
          <div>{{ detail.name || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="物料包描述">
          <div>{{ detail.description || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="选择技术栈">
          <div>{{ detail.framework === 'Html' ? 'HTML' : detail.framework || '无' }}</div>
        </tiny-form-item>
        <tiny-form-item label="是否为官方">
          <div>{{ detail.isOfficial ? '是' : '否' }}</div>
        </tiny-form-item>
        <tiny-form-item label="是否为默认">
          <div>{{ detail.isDefault ? '是' : '否' }}</div>
        </tiny-form-item>
        <tiny-form-item label="公开范围">
          <div>{{ publicMatch[detail.public] }}</div>
        </tiny-form-item>
        <tiny-form-item v-if="detail.public === 2" label="公开组织">
          <div class="public-tenant">
            <span v-for="item in detail.public_scope_tenants" :key="item.id">{{ item.tenant_id }}</span>
          </div>
        </tiny-form-item>
      </tiny-form>
    </template>
    <template #version>
      <tiny-grid
        ref="gridRef"
        auto-resize
        :fetch-data="{ api: getData }"
        :pager="state.pagerConfig"
        seq-serial
        size="small"
      >
        <tiny-grid-column field="version" title="版本号" width="160"> </tiny-grid-column>
        <tiny-grid-column field="description" title="描述" show-overflow="ellipsis"></tiny-grid-column>
        <tiny-grid-column field="updated_at" title="变更时间" width="160" format-text="longDateTime">
        </tiny-grid-column>
        <template #empty>
          <empty-data></empty-data>
        </template>
      </tiny-grid>
    </template>
  </ecology-detail>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { Grid, GridColumn, Form, FormItem, Pager } from '@opentiny/vue'
import { ACTION_ID } from 'lowcode-design-controller/utils'
import EmptyData from '@/common/components/EmptyData.vue'
import EcologyDetail from '@/common/components/EcologyDetail.vue'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyForm: Form,
    TinyFormItem: FormItem,
    EmptyData,
    EcologyDetail
  },
  props: {
    boxVisibility: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: () => ({})
    },
    versions: {
      type: Object,
      default: []
    },
    version: {
      type: Boolean,
      default: true
    }
  },
  emits: ['cancel'],
  setup(props) {
    const gridRef = ref(null)
    const publicMatch = {
      0: '私有',
      1: '公开',
      2: '半公开'
    }

    const state = reactive({
      detailVisibility: props.boxVisibility,
      versions: props.versions,
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

    const getData = ({ page }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize

      return new Promise((resolve) => {
        let total = state.versions?.length

        let result = state.versions?.slice(offset, offset + pageSize) || []

        resolve({ result, page: { total: total } })
      })
    }

    watch(
      () => props.boxVisibility,
      (value) => {
        state.detailVisibility = value
      }
    )

    watch(
      () => props.versions,
      (value) => {
        state.versions = value.map((item) => {
          item.version = item.version.includes('_')
            ? item.version.substring(0, item.version.lastIndexOf('_'))
            : item.version
          item.description = item.description || '无'

          return item
        })
        gridRef.value.handleFetch()
      }
    )

    return {
      state,
      ACTION_ID,
      publicMatch,
      gridRef,
      getData
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.tiny-form-item) {
  --ti-form-item-margin-bottom-default: 16px;
  .tiny-form-item__content,
  .tiny-form-item__label {
    height: 20px;
    line-height: 20px;
  }
}

.public-tenant {
  span {
    margin-right: 8px;
  }
}
</style>
