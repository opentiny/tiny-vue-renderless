<template>
  <div class="w-full h-screen max-h-full sm:p-4 relative bg-[#F5F6F6] sm:bg-white flex flex-col">
    <tiny-tabs v-model="activeName" class="bg-color-bg-1">
      <tiny-tab-item title="待我处理" name="first"></tiny-tab-item>
      <tiny-tab-item title="我发起" name="second"></tiny-tab-item>
      <tiny-tab-item title="我已处理" name="third"></tiny-tab-item>
    </tiny-tabs>

    <div class="hidden sm:flex mt-4 justify-between">
      <tiny-button type="primary" @click="handleAdd()">新增</tiny-button>
      <div>
        <tiny-slider-button-group v-model="radios" type="icon" @change="sliderChange">
          <tiny-slider-button label="1">
            <div class="w-full h-full flex justify-center items-center">
              <tiny-icon-table-mode></tiny-icon-table-mode>
            </div>
          </tiny-slider-button>
          <tiny-slider-button label="2">
            <div class="w-full h-full flex justify-center items-center">
              <tiny-icon-card-mode></tiny-icon-card-mode>
            </div>
          </tiny-slider-button>
        </tiny-slider-button-group>
      </div>
    </div>

    <div class="mt-3 overflow-auto mb-16">
      <tiny-grid
        highlight-current-row
        :fetch-data="fetchData"
        seq-serial
        :pager="pagerConfig"
        auto-resize
        :view-type="viewType"
        mf-show="card"
        :card-config="cardConfig"
        show-overflow
        height="100%"
        @card-click="handleDetail"
        @cell-click="handleDetail"
      >
        <tiny-grid-column field="title" title="处理事项"></tiny-grid-column>
        <tiny-grid-column field="billNum" title="票据编号"></tiny-grid-column>
        <tiny-grid-column field="status" title="状态"></tiny-grid-column>
        <tiny-grid-column field="curNode" title="当前节点"></tiny-grid-column>
        <tiny-grid-column field="curApprover" title="当前审批人"></tiny-grid-column>
        <tiny-grid-column card-co field="applicant" title="当前节点"></tiny-grid-column>
        <tiny-grid-column field="date" title="申请日期"></tiny-grid-column>
      </tiny-grid>
    </div>
    <div class="absolute bottom-0 w-full sm:hidden">
      <div class="flex items-center justify-center p-2 bg-color-bg-1">
        <tiny-button banner type="primary" @click="handleAdd()">发起审批</tiny-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tabs, TabItem, Grid, GridColumn, Pager, Button, Tag, SliderButton, SliderButtonGroup } from '@opentiny/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { IconCardMode, IconTableMode } from '@opentiny/vue-icon'

const TinyTabs = Tabs
const TinyTabItem = TabItem
const TinyGrid = Grid
const TinyGridColumn = GridColumn
const TinyButton = Button
const TinySliderButton = SliderButton
const TinySliderButtonGroup = SliderButtonGroup

const TinyIconCardMode = IconCardMode()
const TinyIconTableMode = IconTableMode()

const radios = ref('1')

const activeName = ref('first')

const viewType = ref('mf')

const pagerConfig = {
  component: Pager,
  attrs: {
    currentPage: 1,
    pageSize: 10,
    pageSizes: [5, 10],
    total: 0,
    layout: 'total, prev, pager, next, jumper, sizes'
  }
}
const getData = ({ page }) => {
  let curPage = page.currentPage
  let { pageSize } = page
  let offset = (curPage - 1) * pageSize

  return new Promise((resolve) => {
    resolve({
      result: tableData.value.slice(offset, offset + pageSize),
      page: { total: tableData.value.length }
    })
  })
}

const fetchData = {
  api: getData
}

const cardConfig = {
  cardSize: 'medium',
  primaryField: 'title',
  contentFields: ['curNode', 'curApprover', 'date'],
  tagFields: [
    [
      'status',
      {
        render: ({ h, row, field, value, config, color }) =>
          h(
            Tag,
            {
              props: {
                size: 'mini',
                type: value === '已通过' ? 'success' : 'default',
                customClass: 'inline-block h-4.5 leading-4.5'
              }
            },
            value
          )
      }
    ]
  ]
}

const tableData = ref([
  {
    id: 1,
    title: '小红提交的零星采购采购评审',
    billNum: 'ABC-XY-20240904',
    status: '已通过',
    curNode: '财务处长审批',
    curApprover: '张红',
    applicant: '张延庆',
    date: '2024-08-23'
  },
  {
    id: 2,
    title: '小明提交的零星采购采购评审',
    billNum: 'DEF-GH-20240905',
    status: '待审批',
    curNode: '人事经理审批',
    curApprover: '李华',
    applicant: '李雷',
    date: '2024-08-24'
  },
  {
    id: 3,
    title: '小刚提交的零星采购采购评审',
    billNum: 'IJK-LM-20240906',
    status: '待审批',
    curNode: '技术总监审批',
    curApprover: '王伟',
    applicant: '王涛',
    date: '2024-08-25'
  },
  {
    id: 4,
    title: '小蓝提交的零星采购采购评审',
    billNum: 'NOP-QR-20240907',
    status: '已通过',
    curNode: '行政部门审批',
    curApprover: '赵娜',
    applicant: '赵珊珊',
    date: '2024-08-26'
  },
  {
    id: 5,
    title: '小绿提交的零星采购采购评审',
    billNum: 'STU-VW-20240908',
    status: '待审批',
    curNode: '销售经理审批',
    curApprover: '郑艳',
    applicant: '郑珊珊',
    date: '2024-08-27'
  },
  {
    id: 6,
    title: '小粉提交的零星采购采购评审',
    billNum: 'XYZ-AB-20240909',
    status: '待审批',
    curNode: '财务副总审批',
    curApprover: '吴娜',
    applicant: '吴珊珊',
    date: '2024-08-28'
  },
  {
    id: 7,
    title: '小橙提交的零星采购采购评审',
    billNum: 'CD-EF-20240910',
    status: '已通过',
    curNode: '人事主管审批',
    curApprover: '周华',
    applicant: '周涛',
    date: '2024-08-29'
  },
  {
    id: 8,
    title: '小青提交的零星采购采购评审',
    billNum: 'GH-IJ-20240911',
    status: '已通过',
    curNode: '技术经理审批',
    curApprover: '孙伟',
    applicant: '孙珊珊',
    date: '2024-08-30'
  },
  {
    id: 9,
    title: '小蓝提交的零星采购采购评审',
    billNum: 'KL-MN-20240912',
    status: '已通过',
    curNode: '行政助理审批',
    curApprover: '陈娜',
    applicant: '陈涛',
    date: '2024-08-31'
  },
  {
    id: 10,
    title: '小紫提交的零星采购采购评审',
    billNum: 'OP-QR-20240913',
    status: '待审批',
    curNode: '销售副总审批',
    curApprover: '马华',
    applicant: '马涛',
    date: '2024-09-01'
  },
  {
    id: 11,
    title: '小红提交的零星采购采购评审',
    billNum: 'ABC-XY-20240904',
    status: '已通过',
    curNode: '财务处长审批',
    curApprover: '张红',
    applicant: '张延庆',
    date: '2024-08-23'
  },
  {
    id: 12,
    title: '小明提交的零星采购采购评审',
    billNum: 'DEF-GH-20240905',
    status: '待审批',
    curNode: '人事经理审批',
    curApprover: '李华',
    applicant: '李雷',
    date: '2024-08-24'
  },
  {
    id: 13,
    title: '小刚提交的零星采购采购评审',
    billNum: 'IJK-LM-20240906',
    status: '待审批',
    curNode: '技术总监审批',
    curApprover: '王伟',
    applicant: '王涛',
    date: '2024-08-25'
  },
  {
    id: 14,
    title: '小蓝提交的零星采购采购评审',
    billNum: 'NOP-QR-20240907',
    status: '已通过',
    curNode: '行政部门审批',
    curApprover: '赵娜',
    applicant: '赵珊珊',
    date: '2024-08-26'
  },
  {
    id: 15,
    title: '小绿提交的零星采购采购评审',
    billNum: 'STU-VW-20240908',
    status: '待审批',
    curNode: '销售经理审批',
    curApprover: '郑艳',
    applicant: '郑珊珊',
    date: '2024-08-27'
  },
  {
    id: 16,
    title: '小粉提交的零星采购采购评审',
    billNum: 'XYZ-AB-20240909',
    status: '待审批',
    curNode: '财务副总审批',
    curApprover: '吴娜',
    applicant: '吴珊珊',
    date: '2024-08-28'
  },
  {
    id: 17,
    title: '小橙提交的零星采购采购评审',
    billNum: 'CD-EF-20240910',
    status: '已通过',
    curNode: '人事主管审批',
    curApprover: '周华',
    applicant: '周涛',
    date: '2024-08-29'
  },
  {
    id: 18,
    title: '小青提交的零星采购采购评审',
    billNum: 'GH-IJ-20240911',
    status: '已通过',
    curNode: '技术经理审批',
    curApprover: '孙伟',
    applicant: '孙珊珊',
    date: '2024-08-30'
  },
  {
    id: 19,
    title: '小蓝提交的零星采购采购评审',
    billNum: 'KL-MN-20240912',
    status: '0',
    curNode: '行政助理审批',
    curApprover: '陈娜',
    applicant: '陈涛',
    date: '2024-08-31'
  },
  {
    id: 20,
    title: '小紫提交的零星采购采购评审',
    billNum: 'OP-QR-20240913',
    status: '待审批',
    curNode: '销售副总审批',
    curApprover: '马华',
    applicant: '马涛',
    date: '2024-09-01'
  }
])

const sliderChange = (val) => {
  if (val === '1') {
    viewType.value = 'mf'
  } else {
    viewType.value = 'card'
  }
}

const router = useRouter()

const handleAdd = () => {
  router.push({ path: '/about' })
}

const handleDetail = () => {
  router.push({ path: '/detail' })
}
</script>

<style scoped>
nav.w-full {
  width: fit-content;
}
</style>
