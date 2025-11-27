<template>
  <tiny-dialog-box v-model:visible="state.showVersionList" :title="title" width="900px" @closed="closeDialog">
    <div class="version-list-dialog">
      <tiny-form label-position="left" label-width="100px">
        <tiny-form-item label="版本更新方式">
          <tiny-button-group v-model="state.checkedVal" :data="state.groupData"></tiny-button-group>
          <tiny-tooltip class="item" effect="light" placement="bottom">
            <icon-help-circle class="tiny-svg-size icon-help-circle"></icon-help-circle>
            <template #content>
              <div>
                <div>^ 开头的版本会固定首个大版本，后面的两个小版本会更新到<br />最新，如 vue ^2.2.0=>vue 2.6.14；</div>
                <div>~ 开头的版本会前两个版本，后面的小版本会更新到最新，<br />vuex ~3.1.0=>vuex 3.1.3；</div>
                <div>固定版本（不带符号），直接写版本号会安装固定的版本vue-<br />router 3.5.3=>vue-router 3.5.3；</div>
              </div>
            </template>
          </tiny-tooltip>
        </tiny-form-item>
      </tiny-form>
      <tiny-grid
        v-show="state.checkedVal !== 'x'"
        ref="gridRef"
        auto-resize
        :data="state.data"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
        seq-serial
      >
        <tiny-grid-column type="radio" width="60"></tiny-grid-column>
        <tiny-grid-column title="版本号">
          <template #default="data">
            <div>
              <div class="item-version">
                <p>{{ data.row.version }}</p>
                <p v-if="data.row.id === selectData.id" class="current-version">当前版本</p>
              </div>
            </div>
          </template>
        </tiny-grid-column>
        <tiny-grid-column field="description" title="版本描述"></tiny-grid-column>
        <tiny-grid-column title="更新时间" sortable>
          <template #default="data">
            <div>{{ data.row.created_at ? format(new Date(data.row.created_at)) : '' }}</div>
          </template>
        </tiny-grid-column>
      </tiny-grid>
      <div v-if="state.checkedVal === 'x'" class="latest-version">
        <svg-icon class="empty-icon" name="empty"></svg-icon>
        <p>自动更新到最新版本</p>
      </div>
    </div>
    <template #footer>
      <tiny-button type="primary" native-type="submit" @click="setVersion">确定</tiny-button>
      <tiny-button @click="closeDialog">取消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref, onMounted } from 'vue'
import { Button, ButtonGroup, DialogBox, Form, FormItem, Grid, GridColumn, Tooltip } from '@opentiny/vue'
import { IconHelpCircle } from '@opentiny/vue-icon'
import { useModal } from 'lowcode-design-controller'
import { format } from '@opentiny/vue-renderless/common/date'

export default {
  components: {
    TinyButton: Button,
    TinyButtonGroup: ButtonGroup,
    TinyDialogBox: DialogBox,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyTooltip: Tooltip,
    IconHelpCircle: IconHelpCircle()
  },
  props: {
    showVersionList: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '选择版本'
    },
    data: {
      type: Array,
      default: []
    },
    selectData: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['cancel', 'setVersion'],
  setup(props, { emit }) {
    const { message } = useModal()
    const gridRef = ref(null)
    const updateList = ['^', '~', 'x']

    const state = reactive({
      showVersionList: props.showVersionList,
      checkedVal: '^',
      groupData: [
        { text: '^（固定首位）', value: '^' },
        { text: '~（固定前两位）', value: '~' },
        { text: '固定版本', value: '' },
        { text: '默认最新', value: 'x' }
      ],
      data: props.data
    })

    const closeDialog = () => {
      emit('cancel')
    }

    const setRadioRow = () => {
      const version = props.selectData.version

      if (version?.[0] === '^' || version?.[0] === '~') {
        const newVersion = version.slice(1, version.length)
        const newVersionArr = newVersion.split('.')

        let data = []

        if (version[0] === '^') {
          data = state.data.filter((item) => item.version.split('.')[0] === newVersionArr[0])
        }

        if (version[0] === '~') {
          data = state.data.filter(
            (item) => item.version.split('.')[0] === newVersionArr[0] && item.version.split('.')[1] === newVersionArr[1]
          )
        }

        const sameVersion = state.data.find((item) => item.version === versionSort(data)[0].version)

        gridRef.value.setRadioRow(sameVersion)
      } else if (version === 'x') {
        gridRef.value.setRadioRow(state.data[0])
      } else {
        const sameVersion = state.data.find((item) => item.version === version)

        gridRef.value.setRadioRow(sameVersion)
      }
    }

    const setVersion = () => {
      if (!state.data.length) {
        message({ message: '所选物料版本为旧版本，请去构建新版本', status: 'error' })

        return
      }

      if (!gridRef.value.getRadioRow()) {
        message({ message: '请选择版本', status: 'error' })

        return
      }

      let params = {
        id: gridRef.value.getRadioRow().id, // 版本id
        block_id: props.selectData.material || props.selectData.base || props.selectData.id,
        version: state.checkedVal === 'x' ? state.checkedVal : state.checkedVal + gridRef.value.getRadioRow().version
      }

      emit('setVersion', params)
    }

    const versionSort = (data) => {
      data.sort((a, b) => {
        let i = 0
        const arr1 = a.version.split('.')
        const arr2 = b.version.split('.')

        while (true) {
          const s1 = arr1[i]
          const s2 = arr2[i]

          i++
          if (s1 === undefined || s2 === undefined) {
            return arr2.length - arr1.length
          }

          if (s1 === s2) continue

          return s2 - s1
        }
      })

      return data
    }

    watch(
      () => props.showVersionList,
      (value) => {
        state.showVersionList = value
      }
    )

    watch(
      () => props.data,
      (value) => {
        state.data = value
        setRadioRow()
      }
    )

    onMounted(() => {
      state.checkedVal = updateList.includes(props.selectData?.version) ? props.selectData?.version : ''
      setRadioRow()
    })

    return {
      state,
      gridRef,
      closeDialog,
      setVersion,
      format
    }
  }
}
</script>

<style lang="less" scoped>
.version-list-dialog {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  :deep(.tiny-dialog-box) {
    height: 585px;
    .tiny-dialog-box__footer {
      padding: 18px 32px 29px;
    }
  }
  :deep(.tiny-button-group) {
    .tiny-group-item li {
      width: 150px;
      margin: 0;
      button {
        width: 150px;
        border-radius: 0;
        background: #f5f5f5;
        padding: 0 20px;
        border: 0;
      }
      &.active button:not(.disabled) {
        background: #fff;
        color: #191919;
        border: 1px solid #191919;
        border-radius: 6px;
      }

      &:hover:not(.active) button:not(.disabled) {
        color: #191919;
        font-weight: 700;
      }
    }
  }
  :deep(.tiny-grid) {
    margin-top: 4px;
    .tiny-grid__body-wrapper {
      height: 320px;
      overflow-y: scroll;
    }
  }
  .icon-help-circle {
    margin-left: 8px;
  }
  .empty-icon {
    width: 64px;
    height: 64px;
    color: var(--ti-lowcode-empty-icon-color);
  }

  .item-version {
    .current-version {
      width: 60px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 10px;
      background: #50d4ab;
      border-top-left-radius: 6px;
      border-bottom-right-radius: 6px;
      color: #fff;
    }
  }
  .latest-version {
    height: 256px;
    text-align: center;
    padding-top: 100px;
    p {
      text-align: center;
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>
