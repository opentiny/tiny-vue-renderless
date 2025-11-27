<template>
  <tiny-tabs v-model="state.activeName">
    <tiny-tab-item title="属性" name="attrs" attrs-origin>
      <tiny-tabs v-model="state.activeButton" tab-style="button-card">
        <tiny-tab-item title="添加属性" name="addAttrs">
          <template #title>
            <tiny-button @click="beforeAdd('attr')">添加属性</tiny-button>
            <tiny-button :disabled="!state.attrs.length" @click="openDialog">属性编排</tiny-button>
          </template>
          <tiny-grid
            ref="gridAttr"
            auto-resize
            :fetch-data="{ api: getData }"
            :pager="state.pagerConfig"
            :edit-rules="attrRules"
            :edit-config="{ trigger: 'click', mode: 'row' }"
            seq-serial
            @edit-closed="saveAttrs"
          >
            <tiny-grid-column
              field="property"
              title="属性名称"
              :editor="{
                component: 'input',
                autoselect: true
              }"
            ></tiny-grid-column>
            <tiny-grid-column
              field="type"
              title="属性类型"
              :editor="{
                component: Select,
                attrs: { options }
              }"
            ></tiny-grid-column>
            <tiny-grid-column
              field="defaultValue"
              title="默认值"
              :editor="{
                component: 'input',
                autoselect: true
              }"
            ></tiny-grid-column>
            <tiny-grid-column
              field="enumerateValue"
              title="枚举值"
              :editor="{
                component: 'input',
                autoselect: true
              }"
            ></tiny-grid-column>
            <tiny-grid-column
              field="title"
              title="属性描述"
              :editor="{
                component: 'input',
                autoselect: true
              }"
            ></tiny-grid-column>
            <tiny-grid-column title="操作" width="100">
              <template v-slot="data">
                <tiny-button type="text" class="property-delete" @click="deleteAttr(gridAttr, data.row, 'property')">
                  删除
                </tiny-button>
              </template>
            </tiny-grid-column>
            <template #empty>
              <empty-data></empty-data>
            </template>
          </tiny-grid>
        </tiny-tab-item>
        <tiny-dialog-box
          v-model:visible="state.show"
          title="属性编排"
          width="70%"
          dialog-class="attrs-select"
          append-to-body
        >
          <tiny-alert type="info" :description="state.tips"></tiny-alert>
          <!-- <setting
            v-model="state.properties"
            :properties="state.originProperties"
            :components="[]"
            @close="closeDialog"
          >
          </setting> -->
        </tiny-dialog-box>
        <tiny-tab-item title="代码编辑" name="codeEdit">
          <template #title>
            <tiny-button class="edit-buttons">代码编辑</tiny-button>
          </template>
          <div class="editor-box">
            <monaco-editor
              ref="schemaEditor"
              style="height: 332px; width: auto"
              :options="monacoOptions"
              :value="state.schemaCode"
              @change="changeCode"
            />
            <tiny-button @click="saveCode">保存</tiny-button>
          </div>
        </tiny-tab-item>
      </tiny-tabs>
    </tiny-tab-item>
    <tiny-tab-item title="事件" name="events">
      <div class="events-wrap">
        <div class="operate">
          <tiny-button @click="beforeAdd('event')">添加事件</tiny-button>
        </div>
        <tiny-grid
          ref="gridEvent"
          auto-resize
          :data="state.originEvent"
          :edit-rules="eventRules"
          :edit-config="{ trigger: 'click', mode: 'row' }"
          seq-serial
          @edit-closed="saveEvents"
        >
          <tiny-grid-column
            field="eventName"
            title="事件名"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>
          <tiny-grid-column
            field="label"
            title="事件名称"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>
          <tiny-grid-column
            field="params"
            title="事件参数"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>
          <tiny-grid-column
            field="defaultValue"
            title="返回值"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>
          <tiny-grid-column
            field="description"
            title="事件详细描述"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>
          <tiny-grid-column title="操作" width="160">
            <template v-slot="data">
              <tiny-button type="text" class="property-delete" @click="deleteAttr(gridEvent, data.row, 'eventName')"
                >删除</tiny-button
              >
            </template>
          </tiny-grid-column>
          <template #empty>
            <empty-data></empty-data>
          </template>
        </tiny-grid>
      </div>
    </tiny-tab-item>
    <tiny-tab-item title="插槽" name="slots">
      <div class="slots-wrap">
        <div class="operate">
          <tiny-button @click="beforeAdd('slot')">添加插槽</tiny-button>
        </div>
        <tiny-grid
          ref="gridSlot"
          auto-resize
          :data="state.originSlots"
          :edit-rules="slotRules"
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          seq-serial
          @edit-closed="saveSlots"
        >
          <tiny-grid-column
            field="slotName"
            title="插槽名"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>

          <tiny-grid-column
            field="description"
            title="插槽描述"
            :editor="{
              component: 'input',
              autoselect: true
            }"
          ></tiny-grid-column>

          <tiny-grid-column title="操作" width="160">
            <template v-slot="data">
              <tiny-button type="text" class="property-delete" @click="deleteAttr(gridSlot, data.row, 'slotName')"
                >删除</tiny-button
              >
            </template>
          </tiny-grid-column>
          <template #empty>
            <empty-data></empty-data>
          </template>
        </tiny-grid>
      </div>
    </tiny-tab-item>
  </tiny-tabs>
</template>

<script>
import { reactive, ref, nextTick, capitalize } from 'vue'
import { Button, Grid, GridColumn, Pager, DatePicker, Select, DialogBox, Alert, Tabs, TabItem } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import MonacoEditor from '@/common/components/VueMonaco'
// import Setting from '@opentiny/tiny-engine-setting-design'
import { formValidate } from 'lowcode-design-controller/utils'
import EmptyData from '../../common/components/EmptyData.vue'
import useComponent from './js/useComponent'

const optionsArr = [
  {
    label: 'string',
    value: 'string'
  },
  {
    label: 'boolean',
    value: 'boolean'
  },
  {
    label: 'object',
    value: 'object'
  },
  {
    label: 'array',
    value: 'array'
  },
  {
    label: 'number',
    value: 'number'
  }
]

export default {
  components: {
    TinyButton: Button,
    TinyGrid: Grid,
    TinyGridColumn: GridColumn,
    TinyDialogBox: DialogBox,
    TinyAlert: Alert,
    MonacoEditor,
    // Setting,
    EmptyData,
    TinyTabs: Tabs,
    TinyTabItem: TabItem
  },
  props: {
    modelValue: {
      type: Object,
      default: () => []
    },
    metadata: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { confirm, message } = useModal()
    const gridAttr = ref(null)
    const gridEvent = ref(null)
    const gridSlot = ref(null)
    const { componentValidate } = useComponent()

    const state = reactive({
      show: false,
      attrs: props.metadata?.attrs || [],
      originEvent: props.metadata?.events || [],
      originSlots: props.metadata?.slots || [],
      properties: props.modelValue.properties,
      events: props.modelValue.events || [],
      slots: props.modelValue.slots || [],
      originProperties: {},
      pagerConfig: {
        component: Pager,
        attrs: {
          currentPage: 1,
          pageSize: 10,
          pageSizes: [10, 20],
          total: 0,
          layout: 'total, prev, pager, next, sizes'
        }
      },
      tips: '1、先创建分组，再拖拽属性到对应的分组中；2、点击分组内的属性，在右侧面板对属性进行详细的配置。',
      activeName: 'attrs',
      activeButton: 'addAttrs',
      schemaCode: JSON.stringify(props.modelValue.properties || [], null, 2)
    })

    const getData = ({ page }) => {
      const curPage = page.currentPage
      const pageSize = page.pageSize
      const offset = (curPage - 1) * pageSize

      return new Promise((resolve) => {
        let total = state.attrs?.length

        let result = state.attrs?.slice(offset, offset + pageSize) || []

        resolve({ result, page: { total: total } })
      })
    }

    const getProperties = (properties) => {
      state.originProperties = {}
      properties?.forEach(({ property, title, type, defaultValue, enumerateValue }) => {
        state.originProperties[property] = { title, type, defaultValue, enumerateValue }
      })
    }

    const addProperty = (refValue, data) => {
      let params = {
        property: null,
        title: null,
        type: null,
        defaultValue: null,
        enumerateValue: null
      }

      refValue.insert({}).then((res) => {
        refValue.setActiveRow(res.row)
      })
      data.unshift(params)
    }

    const refMap = () => ({
      attr: {
        refValue: gridAttr.value,
        data: state.attrs
      },
      event: {
        refValue: gridEvent.value,
        data: state.events
      },
      slot: {
        refValue: gridSlot.value,
        data: state.slots
      }
    })

    const beforeAdd = (type) => {
      const { refValue, data } = refMap()[type]

      if (!data.length) {
        addProperty(refValue, data)

        return
      }

      refValue.validate((valid) => {
        if (!valid) return

        addProperty(refValue, data)
      })
    }

    const deleteAttr = (instance, row, property) => {
      if (property === 'property') {
        confirm({
          title: '提示',
          status: 'warning',
          message: '删除该属性可能需重新对属性分组，确定要删除？',
          exec: () => {
            const index = state.attrs.findIndex((data) => data[property] === row[property])

            state.attrs.splice(index, 1)
            instance.loadData(state.attrs)
            getProperties(state.attrs)
            emit('update:metadata', { events: state.originEvent, attrs: state.attrs, slots: state.originSlots })
          }
        })
      } else {
        const tableData = instance.getTableData().tableData
        const index = tableData.findIndex((data) => data[property] === row[property])

        tableData.splice(index, 1)
        instance.loadData(tableData)
        if (property === 'eventName') {
          getEvents(tableData)
          state.originEvent = tableData
        } else {
          getSlots(tableData)
          state.originSlots = tableData
        }
        emit('update:modelValue', { properties: state.properties, events: state.events, slots: state.slots })
        emit('update:metadata', { events: state.originEvent, attrs: state.attrs, slots: state.originSlots })
      }
    }

    const openDialog = () => {
      getProperties(state.attrs)
      state.show = true
      nextTick(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }

    const saveAttrs = ({ row, rowIndex }) => {
      const reg = /.*[\u4e00-\u9fa5]+.*$/

      if (reg.test(row.property)) {
        row.property = null
      }
      gridAttr.value.validate((valid) => {
        if (valid) {
          componentValidate.attrs = true
          state.attrs[rowIndex] = row
          getProperties(state.attrs)
          emit('update:metadata', { events: state.originEvent, attrs: state.attrs, slots: state.originSlots })
        } else {
          componentValidate.attrs = false
        }
      })
    }

    const closeDialog = () => {
      state.show = !state.show
      emit('update:modelValue', { properties: state.properties, events: state.events })
      emit('update:metadata', { events: state.originEvent, attrs: state.attrs, slots: state.originSlots })
    }

    const getEvents = (events) => {
      state.events = {}
      events.forEach(({ eventName, label, params, description, returns }) => {
        state.events[`on${capitalize(eventName)}`] = {
          label: { zh_CN: label },
          description: { zh_CN: description },
          type: 'event',
          functionInfo: {
            params: [params],
            returns: { returns }
          }
        }
      })
    }

    const saveData = (instance, callback, type) => {
      instance.validate((valid) => {
        if (valid) {
          componentValidate[type] = true
          const tableData = instance.getTableData().tableData

          state[type] = tableData

          callback(tableData)
          emit('update:modelValue', { properties: state.properties, events: state.events, slots: state.slots })
          emit('update:metadata', { events: state.originEvent, attrs: state.attrs, slots: state.originSlots })
        } else {
          componentValidate[type] = false
        }
      })
    }

    const saveEvents = () => saveData(gridEvent.value, getEvents, 'originEvent')

    const getSlots = (slots) => {
      state.slots = {}
      slots
        .filter((slot) => slot.slotName)
        .forEach(({ slotName, description }) => {
          state.slots[slotName] = {
            label: {
              zh_CN: slotName
            },
            description: {
              zh_CN: description
            }
          }
        })
    }

    const saveSlots = () => saveData(gridSlot.value, getSlots, 'originSlots')

    const monacoOptions = {
      roundedSelection: true,
      automaticLayout: true,
      autoIndent: true,
      language: 'json',
      formatOnPaste: true,
      tabSize: 2,
      theme: 'vs',
      readOnly: false
    }

    const attrRules = {
      property: [
        { required: true, message: '必填', trigger: 'blur' },
        { validator: formValidate('attr'), trigger: 'blur' }
      ],
      type: { required: true }
    }

    const eventRules = {
      eventName: [
        { required: true, message: '必填', trigger: 'blur' },
        { validator: formValidate('event'), trigger: 'blur' }
      ]
    }

    const slotRules = {
      slotName: [
        { required: true, message: '必填', trigger: 'blur' },
        { validator: formValidate('attr'), trigger: 'blur' }
      ]
    }

    const options = ref(optionsArr)

    const saveCode = () => {
      try {
        emit('update:modelValue', { properties: JSON.parse(state.schemaCode), events: state.events })
      } catch {
        message({ message: '代码格式有误', status: 'error' })
      }
    }

    const changeCode = (newCode) => {
      state.schemaCode = newCode
    }

    return {
      state,
      gridAttr,
      gridEvent,
      gridSlot,
      getData,
      DatePicker,
      Select,
      deleteAttr,
      monacoOptions,
      openDialog,
      saveAttrs,
      saveEvents,
      closeDialog,
      saveSlots,
      options,
      attrRules,
      eventRules,
      slotRules,
      beforeAdd,
      saveCode,
      changeCode
    }
  }
}
</script>

<style lang="less" scoped>
.operate {
  margin-bottom: 20px;
}

.edit-buttons {
  width: 108px;
  margin-left: -110px;
}

.property-delete {
  color: #191919;
}

:deep(.tiny-tabs__nav.is-show-active-bar .tiny-tabs__item) {
  width: 80px;
  text-align: center;
  height: 30px;
  font-size: 14px;
  color: #191919;
}

:deep(.tiny-tabs.tiny-tabs--button-card .tiny-tabs__nav) {
  background-color: #fff;
}

:deep(.tiny-tabs.tiny-tabs--button-card .tiny-tabs__item) {
  margin-right: 8px;
  height: 28px;
  width: 220px;
  font-size: 14px;
  color: #191919;

  &.is-active {
    border: 0;
  }
}

:deep(.tiny-grid .tiny-grid-header__column) {
  height: 30px;
  font-size: 14px;
  color: #595959;
  font-weight: normal;
}

:deep(.tiny-grid__body-wrapper) {
  overflow-y: auto;
}
</style>
<style lang="less">
.tiny-dialog-box__wrapper.attrs-select {
  .tiny-dialog-box__header {
    padding: 20px;
  }
}
</style>
