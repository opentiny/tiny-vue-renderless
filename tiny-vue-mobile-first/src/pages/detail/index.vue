<template>
  <div class="w-full h-screen max-h-full bg-[#F5F6F8] overflow-y-auto">
    <div class="flex flex-col sm:flex-row max-h-full">
      <div class="flex flex-col max-h-full sm:w-3/4 mr-0 sm:mr-3">
        <div class="flex flex-col bg-color-bg-1 px-3 py-2 mb-2 sm:mb-4">
          <div>
            <span class="text-base font-semibold mr-2">XXX提交的（工程款、设备材料款、技术服务类）支付通知单</span
            ><tiny-tag type="default">待我审批</tiny-tag>
          </div>

          <div class="text-sm text-color-text-placeholder sm:text-color-icon-primary mt-1">XXXX有限责任公司</div>
        </div>

        <div class="flex flex-col bg-color-bg-1 px-3 mb-2 sm:mb-4">
          <tiny-form :model="formData" display-only class="sm:!grid sm:grid-cols-3 sm:mt-3">
            <tiny-form-item label="审批编号" prop="approvalid" required>
              <tiny-input v-model="formData.approvalid" placeholder="请输入"></tiny-input>
            </tiny-form-item>
            <tiny-form-item label="建没单位" prop="engineerName" required>
              <tiny-input v-model="formData.engineerName" placeholder="请输入"></tiny-input>
            </tiny-form-item>
            <tiny-form-item label="预算价或上限价（元）" label-width="160px" prop="budgetPrice" required>
              <tiny-input v-model="formData.budgetPrice" placeholder="请输入大写金额"></tiny-input>
            </tiny-form-item>
            <tiny-form-item label="工程获服务名称" label-width="120px" prop="negotiateUnit" required>
              <tiny-input v-model="formData.negotiateUnit" placeholder="请输入数字"></tiny-input>
            </tiny-form-item>

            <tiny-form-item label="谈判单位数量" label-width="130px" prop="num" required>
              <tiny-input v-model="formData.num" placeholder="请输入大写金额"></tiny-input>
            </tiny-form-item>
          </tiny-form>
        </div>

        <div class="flex flex-col bg-color-bg-1 mb-2 sm:mb-4">
          <div class="p-3 text-xs font-semibold">供应商最终报价情况</div>
          <div class="sm:px-3 sm:pb-4">
            <tiny-grid
              highlight-current-row
              :data="tableData"
              seq-serial
              auto-resize
              view-type="mf"
              mf-show="list"
              :card-config="cardConfig"
            >
              <tiny-grid-column field="id" title="序号"></tiny-grid-column>
              <tiny-grid-column field="companyName" title="公司名称"></tiny-grid-column>
              <tiny-grid-column field="amount" title="最终报价金额"></tiny-grid-column>
              <tiny-grid-column field="projectTime" title="工期"></tiny-grid-column>
            </tiny-grid>
          </div>
        </div>

        <div class="bg-color-bg-1 px-3 mb-2 sm:mb-4 pb-2 sm:h-52">
          <tiny-file-upload
            ref="upload"
            :action="action"
            accept=".doc,.docx"
            :file-list="fileList"
            display-only
            compact
            class="customFileUpload"
          >
          </tiny-file-upload>
        </div>
      </div>

      <div class="flex flex-col bg-color-bg-1 sm:w-1/4">
        <div class="w-full flex justify-center mt-4">
          <tiny-slider-button-group v-model="radio2">
            <tiny-slider-button label="1">审批流程</tiny-slider-button>
            <tiny-slider-button label="2">审批记录</tiny-slider-button>
          </tiny-slider-button-group>
        </div>
        <div class="mt-3 px-6">
          <tiny-time-line :data="data">
            <template #left="data">
              <div class="flex flex-col ml-6 mb-4">
                <div class="mb-2 sm:mb-4 text-sm align-top leading-4">
                  <span
                    v-if="data.slotScope.status !== '-1'"
                    class="mr-2"
                    :class="
                      data.slotScope.status === '0'
                        ? 'text-color-success-hover font-semibold'
                        : 'text-color-brand-focus font-normal'
                    "
                    >{{ data.slotScope.status === '0' ? '同意' : '待审批' }}</span
                  >
                  <span class="font-semibold">{{ data.slotScope.title }}</span>
                </div>
                <div class="mb-2 sm:mb-4">
                  <div class="mb-0.5 text-color-text-placeholder text-xs">
                    {{ data.slotScope.date }}
                  </div>
                  <div class="mb-0.5 text-color-text-placeholder text-xs">
                    {{ data.slotScope.person }}
                  </div>
                  <div v-if="data.slotScope.desc" class="text-color-text-placeholder text-xs">
                    审批意见： {{ data.slotScope.desc }}
                  </div>
                </div>
                <img v-if="data.slotScope.signSrc" :src="data.slotScope.signSrc" class="w-12 h-12" />
              </div>
            </template>
          </tiny-time-line>
        </div>
        <div class="h-20"></div>
      </div>
    </div>

    <div
      class="absolute w-full bottom-0 py-2 flex items-center bg-color-bg-1 shadow-t-sm justify-center sm:justify-end"
    >
      <div class="flex w-full sm:hidden items-center justify-between">
        <tiny-dropdown single-button class="mx-4">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更多&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <template #dropdown>
            <tiny-dropdown-menu>
              <tiny-dropdown-item>选择一</tiny-dropdown-item>
              <tiny-dropdown-item>选择二</tiny-dropdown-item>
              <tiny-dropdown-item>选择三</tiny-dropdown-item>
            </tiny-dropdown-menu>
          </template>
        </tiny-dropdown>
        <tiny-button banner @click="handleIndex">驳回</tiny-button>
        <tiny-button type="primary" banner @click="handleIndex">同意</tiny-button>
      </div>
      <div class="hidden sm:block sm:mr-4">
        <tiny-dropdown single-button class="mx-4">
          <span>更多</span>
          <template #dropdown>
            <tiny-dropdown-menu>
              <tiny-dropdown-item>选择一</tiny-dropdown-item>
              <tiny-dropdown-item>选择二</tiny-dropdown-item>
              <tiny-dropdown-item>选择三</tiny-dropdown-item>
            </tiny-dropdown-menu>
          </template>
        </tiny-dropdown>
        <tiny-button class="mr-4" @click="handleIndex">取消</tiny-button>
        <tiny-button type="primary" @click="handleIndex">提交</tiny-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FileUpload,
  Form,
  FormItem,
  Input,
  Grid,
  GridColumn,
  Button,
  Tag,
  SliderButton,
  SliderButtonGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  TimeLine,
  UserHead
} from '@opentiny/vue'

import { h, ref } from 'vue'
import { useRouter } from 'vue-router'

const TinyFileUpload = FileUpload
const TinyForm = Form
const TinyFormItem = FormItem
const TinyInput = Input
const TinyGrid = Grid
const TinyGridColumn = GridColumn
const TinyButton = Button
const TinyTag = Tag
const TinySliderButton = SliderButton
const TinySliderButtonGroup = SliderButtonGroup
const TinyDropdown = Dropdown
const TinyDropdownMenu = DropdownMenu
const TinyDropdownItem = DropdownItem
const TinyTimeLine = TimeLine
const TinyUserHead = UserHead

const action = ref('http://localhost:3000/api/upload')

const fileList = ref([
  {
    docId: 'M1T2A1N548572512085860351',
    path: 'edm/one/',
    docVersion: 'V1',
    name: '附件清单.docx',
    docSize: 100 * 1024,
    size: 100 * 1024,
    serverName: 'ShenZhen'
  }
])

const formData = ref({
  approvalid: '202310221732000677',
  engineerName: 'XXXX有限责任公司',
  negotiateUnit: '生产车间',
  budgetPrice: '95825808',
  num: '3'
})

const cardConfig = {
  primaryField: 'companyName',
  contentFields: ['amount']
}

const tableData = ref([
  {
    id: 1,
    companyName: 'abc有限责任公司',
    amount: 'CNY10000.00',
    projectTime: '2023-09-10'
  },
  {
    id: 2,
    companyName: 'xyz有限责任公司',
    amount: 'CNY10000.00',
    projectTime: '2023-09-10'
  },
  {
    id: 3,
    companyName: 'xyz有限责任公司',
    amount: 'CNY10000.00',
    projectTime: '2023-09-10'
  }
])

const radio2 = ref('2')

const data = ref([
  {
    title: '发起',
    status: '-1',
    date: '2019-06-06 15:57:20',
    person: '郭春节',
    desc: '',
    signSrc: '../../assets/1.png',
    autoColor: h(TinyUserHead, {
      type: 'label',
      round: true,
      modelValue: '郭',
      size: 32
    })
  },
  {
    title: '生产技术科意见',
    status: '0',
    date: '2022-10-31 15:57:20',
    person: '李晓阳',
    desc: '这是一条审批意见，内部全部展示中',
    signSrc: '../../assets/1.png',
    autoColor: h(TinyUserHead, {
      type: 'label',
      round: true,
      modelValue: '李',
      size: 32
    })
  },
  {
    title: '财务科复核',
    status: '0',
    date: '2019-06-06 15:57:20',
    person: '陈富阳',
    desc: '这是一条审批意见，内部全部展示中',
    signSrc: '',
    autoColor: h(TinyUserHead, {
      type: 'label',
      round: true,
      modelValue: '陈',
      size: 32
    })
  },
  {
    title: '总经理',
    status: '1',
    date: '2022-10-31 15:57:20',
    person: '韩梅',
    desc: '这是一条审批意见，内部全部展示中',
    signSrc: '',

    autoColor: h(TinyUserHead, {
      type: 'label',
      round: true,
      modelValue: '韩',
      size: 32
    })
  }
])

const router = useRouter()

const handleIndex = () => {
  router.push({ path: '/' })
}
</script>
