<template>
  <div class="history-backup">
    <tiny-grid :data="data" :border="true" size="medium">
      <tiny-grid-column width="20%" title="更新时间">
        <template #default="data">
          <div>{{ data.row.updated_at ? format(new Date(data.row.updated_at)) : '暂无变更时间' }}</div>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="详情">
        <template #default="data">
          <slot name="info" :row="data.row">
            <div class="backup-name">{{ data.row.name }}</div>
            <div class="backup-count">
              {{ data.row.sub_count ? data.row.sub_count : 0 }}个{{ type === 'app' ? '页面' : '应用' }}
            </div>
          </slot>
        </template>
      </tiny-grid-column>
      <tiny-grid-column title="远程仓库信息">
        <template #default="data">
          <slot name="info" :row="data.row">
            <div class="backup-name">{{ data.row.sourceCodeUrl }}</div>
            <div class="backup-count">
              {{ data.row.sourceCodeBranch }}
            </div>
          </slot>
        </template>
      </tiny-grid-column>
      <tiny-grid-column align="center" width="20%" title="操作">
        <template #default="data">
          <div class="backup-btn">
            <a
              v-if="isShowPreview"
              class="preview-button"
              :href="data.row.url || 'javascript:void(0)'"
              :target="data.row.url ? '_blank' : ''"
              @click="preivew(data.row)"
            >
              <tiny-button type="text">预览</tiny-button>
            </a>
            <tiny-button v-if="isShowRestore" type="text" @click="restore"> 还原 </tiny-button>
          </div>
        </template>
      </tiny-grid-column>
      <template #empty>
        <empty-data></empty-data>
      </template>
    </tiny-grid>
  </div>
</template>

<script>
import { Grid, GridColumn, Button } from '@opentiny/vue'
import { format } from '@opentiny/vue-renderless/common/date'
import { useModal } from 'lowcode-design-controller'
import EmptyData from './EmptyData.vue'

export default {
  components: {
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyButton: Button,
    EmptyData
  },
  props: {
    type: {
      type: String,
      default: 'app'
    },
    data: {
      type: Array,
      default: () => []
    },
    isShowPreview: {
      type: Boolean,
      default: true
    },
    isShowRestore: {
      type: Boolean,
      default: true
    },
    preivewMessage: {
      type: String,
      default: ''
    }
  },
  emits: ['preview', 'restore'],
  setup(props) {
    const { message } = useModal()

    const preivew = (row) => {
      if (!row.url && props.preivewMessage) {
        message({ message: props.preivewMessage, status: 'warning' })
      }
    }

    const restore = () => {
      message({ message: '持续建设中...', status: 'warning' })
    }

    return {
      format,
      preivew,
      restore
    }
  }
}
</script>

<style lang="less" scoped>
.tiny-grid-hidden-column {
  display: block;
}
.history-backup {
  height: 98%;
  width: 100%;
  overflow-y: scroll;
  .backup-name {
    font-weight: 500;
    color: black;
    font-size: 14px;
  }
  .backup-count {
    margin-top: 8px;
    color: #808080;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
  :deep(.tiny-grid .tiny-grid-cell) {
    padding: 8px 20px;
  }
  .backup-btn {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }
  .preview-button {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
