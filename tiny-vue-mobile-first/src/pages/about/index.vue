<template>
  <div class="w-full h-screen max-h-full bg-[#F5F6F8] sm:bg-white overflow-y-scroll">
    <div class="flex flex-col max-h-full">
      <tiny-alert description="合格供应商准入评价" :closable="false" custom-class="m-0"></tiny-alert>
      <div class="flex flex-col bg-color-bg-1 px-3 mb-2 sm:mb-0">
        <tiny-form label-width="116px" :model="formData" :inline="true" size="small" class="sm:grid-cols-4 sm:mt-3">
          <tiny-form-item label="建设单位" prop="buildUnit" required>
            <tiny-input v-model="formData.buildUnit" placeholder="请输入" class="w-40"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="工程服务名称" prop="engineerName" required>
            <tiny-input v-model="formData.engineerName" placeholder="请输入"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="预算上限" prop="budgetPrice" required>
            <tiny-input v-model="formData.budgetPrice" placeholder="请输入大写金额"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="参与单位数量" prop="negotiateUnit" required>
            <tiny-input v-model="formData.negotiateUnit" placeholder="请输入数字"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="评审日期" prop="reviewDate" required>
            <tiny-date-picker v-model="formData.reviewDate" placeholder="请选择"></tiny-date-picker>
          </tiny-form-item>
        </tiny-form>
      </div>
      <div class="px-3 py-3 text-sm font-semibold w-full bg-color-bg-1">供应商最终报价情况</div>
      <tiny-alert title="提示信息标题" :closable="false" size="large" custom-class="m-0">
        <span>提示提示提示</span></tiny-alert
      >

      <div class="flex flex-col bg-color-bg-1 mb-2">
        <tiny-grid
          highlight-current-row
          :data="tableData"
          seq-serial
          auto-resize
          view-type="mf"
          mf-show="list"
          :card-config="cardConfig"
        >
          <tiny-grid-column
            type="operation"
            title="操作"
            :operation-config="operationConfig"
            width="120"
          ></tiny-grid-column>
          <tiny-grid-column field="companyName" title="公司名称"></tiny-grid-column>
          <tiny-grid-column field="amount" title="最终报价金额"></tiny-grid-column>
          <tiny-grid-column field="projectDura" title="工期"></tiny-grid-column>
        </tiny-grid>
        <div class="w-full">
          <div class="flex justify-center items-center border-t border-solid border-color-border-separator py-2 mx-3">
            <div @click="fn">
              <tiny-icon-plus style="height: 18px; width: 18px" class="fill-color-brand mr-2"></tiny-icon-plus>
              <span class="text-color-brand">新增</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col bg-color-bg-1 px-3 mb-2 pb-3 sm:pb-0">
        <div class="border-b border-solid border-color-border-separator pb-3 mb-2">
          <tiny-file-upload
            ref="upload"
            compact
            title="附件：供应商清单"
            :action="action"
            accept=".doc,.docx"
            :file-list="fileList"
          >
            <template #notice>
              <tiny-alert size="large" title="合格供应商准入评价" custom-class="mt-3">
                <template #description>
                  <p class="font-normal">1. XX集团合格供应商上传"集团公司内部采购优势产品目录"</p>
                  <p class="font-normal">2. XX集团合格供应商上传</p>
                </template>
              </tiny-alert>
            </template>
            <template #assist-content="{ file }">{{ `${file.author}&nbsp;&nbsp;${file.updateTime}` }}</template>
          </tiny-file-upload>
        </div>
        <tiny-file-upload
          ref="upload"
          compact
          :action="action"
          accept=".doc,.docx"
          :file-list="fileList"
          title="附件：报价清单"
        >
          <template #assist-content="{ file }">{{ `${file.author}&nbsp;&nbsp;${file.updateTime}` }}</template>
        </tiny-file-upload>
      </div>

      <div class="flex flex-col bg-color-bg-1">
        <div class="px-3 py-2 text-sm font-semibold">审批流程</div>
        <div v-if="flag" class="w-full flex flex-col justify-center items-center">
          <div
            class="w-9 h-9 border rounded-full border-dashed border-color-brand flex justify-center items-center"
            @click="flag = false"
          >
            <tiny-icon-plus style="width: 20px; height: 20px" class="fill-color-brand"></tiny-icon-plus>
          </div>
          <div class="before:content-['*'] before:text-color-error text-sm mt-2">确认审批人</div>
        </div>
        <div v-else>
          <div class="flex justify-center">
            <tiny-flowchart ref="chart" :data="chartData" :config="chartConfig"> </tiny-flowchart>
          </div>
        </div>
        <div class="h-20"></div>
      </div>
    </div>
    <div
      class="absolute w-full bottom-0 py-2 flex items-center bg-color-bg-1 shadow-t-sm justify-center sm:justify-end"
    >
      <div class="flex w-full sm:hidden items-center">
        <tiny-button banner @click="handleList">取消</tiny-button>
        <tiny-button banner type="primary" @click="handleList">提交</tiny-button>
      </div>
      <div class="hidden sm:block mr-4">
        <tiny-button class="mr-4" @click="handleList">取消</tiny-button>
        <tiny-button type="primary" @click="handleList">提交</tiny-button>
      </div>
    </div>

    <tiny-dialog-box title="标题" :visible="boxVisibility" @update:visible="boxVisibility = $event">
      <tiny-form :model="form" label-width="120px">
        <tiny-form-item label="单位名称" prop="name" required>
          <tiny-input v-model="form.name" placeholder="请输入"></tiny-input>
        </tiny-form-item>
        <tiny-form-item label="最终报价金额" prop="money" required>
          <tiny-input v-model="form.money" placeholder=".00"></tiny-input>
        </tiny-form-item>
        <tiny-form-item label="工期" prop="time" required>
          <tiny-input v-model="form.time" placeholder="请输入"></tiny-input>
        </tiny-form-item>
      </tiny-form>

      <template #footer>
        <tiny-button @click="boxVisibility = false">取消</tiny-button>
        <tiny-button type="primary" @click="boxVisibility = false"> 确定 </tiny-button>
      </template>
    </tiny-dialog-box>
  </div>
</template>

<script setup lang="ts">
import {
  FileUpload,
  Alert,
  Form,
  FormItem,
  Input,
  DatePicker,
  Grid,
  GridColumn,
  Button,
  DialogBox,
  Select
} from '@opentiny/vue'

import Flowchart from '@opentiny/vue-flowchart'
import { hooks } from '@opentiny/vue-common'
import { useRouter } from 'vue-router'
import { IconDel, IconPlus, IconSplitRight } from '@opentiny/vue-icon'

import { ref } from 'vue'

const TinyFileUpload = FileUpload
const TinyAlert = Alert
const TinyForm = Form
const TinyFormItem = FormItem
const TinyInput = Input
const TinyDatePicker = DatePicker
const TinyGrid = Grid
const TinyGridColumn = GridColumn
const TinyButton = Button
const TinyFlowchart = Flowchart
const TinyDialogBox = DialogBox
const TinySelect = Select

const TinyIconPlus = IconPlus()

const action = ref('http://localhost:3000/api/upload')

const router = useRouter()

const handleList = () => {
  router.push({ path: '/' })
}

const fileList = ref([
  {
    docId: 'M1T2A1N548572512085860351',
    path: 'edm/one/',
    docVersion: 'V1',
    name: '文件名称.docx',
    docSize: 100 * 1024,
    size: 100 * 1024,
    serverName: 'ShenZhen',
    author: '张三',
    updateTime: '2022.11.04'
  },
  {
    docId: 'M1T2A1N548572512085860351',
    path: 'edm/one/',
    docVersion: 'V1',
    name: '操作手册.docx',
    docSize: 100 * 1024,
    size: 100 * 1024,
    serverName: 'ShenZhen',
    author: '张三',
    updateTime: '2022.11.04'
  }
])

const formData = ref({
  buildUnit: '',
  engineerName: '',
  budgetPrice: '',
  negotiateUnit: '',
  reviewDate: ''
})

const form = ref({
  name: '',
  money: '',
  time: ''
})

const operationConfig = {
  buttons: [
    {
      name: '操作1',
      icon: IconDel()
    }
  ]
}

const cardConfig = {
  cardSize: 'small',
  primaryField: 'companyName',
  contentFields: ['amount']
}

const tableData = ref([
  {
    id: 1,
    companyName: 'abc有限责任公司',
    amount: 'CNY10000.00',
    projectDura: '2023-09-10'
  },
  {
    id: 2,
    companyName: 'xyz有限责任公司',
    amount: 'CNY10000.00',
    projectDura: '2023-09-10'
  },
  {
    id: 3,
    companyName: 'qwe有限责任公司',
    amount: 'CNY10000.00',
    projectDura: '2023-09-10'
  }
])

const userValue = ref('')

const flag = ref(true)
const boxVisibility = ref(false)

const { createConfig } = Flowchart
const chartData = hooks.markRaw({
  nodes: [
    {
      name: '0',
      info: {
        col: 0,
        row: 0,
        width: 50,
        shape: 'circle',
        status: 1,
        other: { main: '开始' }
      },
      hidden: false
    },
    {
      name: '1',
      info: {
        col: 0,
        row: 1,
        width: 160,
        height: 56,
        shape: 'rectangle',
        other: { main: '发起人', auxi: '当前发起人' }
      }
    },
    {
      name: '2',
      info: {
        col: 0,
        row: 2,
        width: 160,
        height: 56,
        shape: 'rectangle',
        other: { main: '财务处长审批', auxi: '张三' }
      }
    },
    {
      name: '3',
      info: {
        col: 0,
        row: 3,
        width: 160,
        height: 56,
        shape: 'rectangle',
        other: {
          main: '财务副处长审批',
          auxi: ''
        }
      }
    },
    {
      name: '4',
      info: {
        col: 0,
        row: 4,
        width: 160,
        height: 56,
        shape: 'rectangle',
        other: {
          main: '财务分管领导审批',
          auxi: ''
        }
      }
    },

    {
      name: '5',
      info: {
        col: 0,
        row: 5,
        width: 50,
        shape: 'circle',
        status: 3,
        other: { main: '结束' }
      },
      hidden: false
    }
  ],
  links: [
    {
      from: '0',
      to: '1',
      fromJoint: 'bottom',
      toJoint: 'top',
      info: { status: 3, style: 'solid' }
    },
    {
      from: '1',
      to: '2',
      fromJoint: 'bottom',
      toJoint: 'top',
      info: { status: 3, style: 'solid' }
    },
    {
      from: '2',
      to: '3',
      fromJoint: 'bottom',
      toJoint: 'top',
      info: { status: 3, style: 'solid' }
    },
    {
      from: '3',
      to: '4',
      fromJoint: 'bottom',
      toJoint: 'top',
      info: { status: 3, style: 'solid' }
    },
    {
      from: '4',
      to: '5',
      fromJoint: 'bottom',
      toJoint: 'top',
      info: { status: 3, style: 'solid' }
    }
  ]
})

const chartConfig = hooks.markRaw(createConfig())

Object.assign(chartConfig, {
  width: 0,
  height: 0,
  gap: 24,
  padding: 12,
  prior: 'vertical',
  align: 'center',
  status: { 1: 'completed', 2: 'ongoing', 3: 'not-started', 4: 'ongoing-fail' },
  colors: { 1: '#00a874', 2: '#0067d1', 3: '#999', 4: '#eb171f' },
  ongoingBackgroundColor: '#f3f8fe',
  popoverPlacement: 'right',
  renderOuter: (h, node) => {
    if (node.name === '0') {
      return h('div', { class: 'w-full h-full flex items-end justify-center' }, [
        h(
          'div',
          {
            class: 'rounded-full flex items-center justify-center border-4 border-color-success-subtle w-10 h-10 pl-0.5'
          },
          [
            h(IconSplitRight(), {
              class: 'fill-color-success',
              style: 'width:20px;height:20px'
            })
          ]
        )
      ])
    } else if (node.name === '5') {
      return h('div', { class: 'w-full h-full flex items-start justify-center' }, [
        h(
          'div',
          {
            class: 'rounded-full flex items-center justify-center border-4 border-color-text-placeholder w-10 h-10'
          },
          [
            h('div', {
              class: 'h-3 w-3 bg-color-text-placeholder'
            })
          ]
        )
      ])
    } else {
      return h(
        'div',
        {
          class: 'w-full h-full rounded flex justify-center items-center flex-col border border-solid'
        },
        [
          h(
            'div',
            {
              class: 'text-sm font-semibold'
            },
            node.info.other.main
          ),
          node.info.other.auxi === ''
            ? h('div', { class: 'flex justify-center pl-4 sm:px-2' }, [
                h(TinySelect, {
                  placeholder: '选择审批人',
                  modelValue: userValue.value,
                  'onUpdate:modelValue': (newValue) => (userValue.value = newValue),
                  options: [
                    {
                      value: 'z00123450',
                      label: '张三一  z00123450'
                    },
                    {
                      value: 'z00123456',
                      label: '李四  l00123456'
                    },
                    {
                      value: 'z00123457',
                      label: '王五  w00123457'
                    },
                    {
                      value: 'z00123458',
                      label: '钱六  q00123458'
                    },
                    {
                      value: 'z00123459',
                      label: '赵七  z00123459'
                    }
                  ]
                })
              ])
            : h(
                'div',
                {
                  class: 'text-xs text-color-text-secondary mt-1'
                },
                node.info.other.auxi
              )
        ]
      )
    }
  }
})

const fn = () => {
  boxVisibility.value = true
}
</script>

<style scoped></style>
