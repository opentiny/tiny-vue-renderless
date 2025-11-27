<template>
  <ecology-detail :visible="state.detailVisibility" :editFlag="state.editFlag" @cancel="$emit('cancel')">
    <template #base>
      <tiny-form ref="formRef" :model="detail" label-width="100px" :label-align="true" label-position="left">
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item label="区块ID">
              <div>{{ detail.label || '无' }}</div>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="区块名称">
              <div>{{ detail.name_cn || '无' }}</div>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item label="描述">
              <div>{{ detail.description || '无' }}</div>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="标签">
              <div v-if="detail.tags?.length" class="detail-tags">
                <span v-for="item in detail.tags" :key="item" :title="item">{{ item }}</span>
              </div>
              <div v-else>---</div>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item label="技术栈">
              <div>{{ detail.framework || '无' }}</div>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="官方">
              <div>{{ detail.isOfficial ? '是' : '否' }}</div>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item label="默认">
              <div>{{ detail.isDefault ? '是' : '否' }}</div>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="公开范围">
              <div>{{ publicMatch[detail.public] }}</div>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
        <tiny-row>
          <tiny-col :span="12">
            <tiny-form-item v-if="detail.public === 2" label="公开组织">
              <div class="public-tenant">
                <span v-for="item in detail.public_scope_tenants" :key="item.id">{{ item.tenant_id }}</span>
              </div>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
        <tiny-row>
          <tiny-col :span="12">
            <tiny-form-item label="content">
              <div class="material-import-monao">
                <monaco-editor
                  style="height: 100%"
                  :options="monacoOptions"
                  :value="JSON.stringify(detail.content, null, 2)"
                />
              </div>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
      </tiny-form>
    </template>
    <template #version>
      <tiny-grid
        ref="gridRef"
        auto-resize
        :fetch-data="{ api: getData }"
        :pager="state.pagerConfig"
        :border="true"
        seq-serial
        size="small"
      >
        <tiny-grid-column field="version" title="版本号" width="160"> </tiny-grid-column>
        <tiny-grid-column field="message" title="版本描述" show-overflow="ellipsis"></tiny-grid-column>
        <tiny-grid-column field="updated_at" title="更新时间" width="160" format-text="longDateTime">
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
import { Grid, GridColumn, Form, FormItem, Pager, Row, Col } from '@opentiny/vue'
import { ACTION_ID } from 'lowcode-design-controller/utils'
import EmptyData from '@/common/components/EmptyData.vue'
import EcologyDetail from '@/common/components/EcologyDetail.vue'
import MonacoEditor from '@/common/components/VueMonaco'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyRow: Row,
    TinyCol: Col,
    EmptyData,
    EcologyDetail,
    MonacoEditor
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

    const monacoOptions = {
      roundedSelection: true,
      automaticLayout: true,
      autoIndent: true,
      language: 'json',
      formatOnPaste: true,
      tabSize: 2,
      theme: 'vs',
      readOnly: true
    }

    const state = reactive({
      detailVisibility: props.boxVisibility,
      editFlag: false,
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
        state.versions = value
        gridRef.value.handleFetch()
      }
    )

    return {
      state,
      ACTION_ID,
      publicMatch,
      gridRef,
      getData,
      monacoOptions
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.tiny-form-item__content) {
  line-height: 22px;
}
:deep(.tiny-form-item__label) {
  line-height: 22px;
}
:deep(.tiny-form) {
  .tiny-row {
    .tiny-col {
      .tiny-form-item {
        margin-bottom: 6px;
      }
    }
  }
  .tiny-form-item {
    .tiny-form-item--default {
      margin-bottom: 10px;
    }
  }
}
.detail-tags {
  height: 50px;
  width: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  span {
    width: 170px;
    letter-spacing: 1px;
    text-indent: 1em;
    margin-bottom: 3px;
    float: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background: #ebebeb;
    border-radius: 4px;
  }
}
.material-import-monao {
  height: 320px;
}
.public-tenant {
  span {
    margin-right: 8px;
  }
}
</style>
