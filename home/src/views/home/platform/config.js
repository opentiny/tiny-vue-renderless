import { $t } from '@/i18n'
import TinyEngine from './components/TinyEngine.vue'
import TinyVue from './components/TinyVue.vue'
import TinyRobot from './components/TinyRobot.vue'

export const platformList = [
  {
    title: 'TinyRobot',
    desc: 'AI智能助手',
    tag: '智能应用',
    mark: $t('platDemoMark1'),
    docUrl: 'https://agent.opentiny.design/tiny-robot/',
    logo: 'tiny-robot',
    mobileImg: 'pro.png',
    iconbtn: 'vue',
    component: TinyRobot
  },
  {
    title: 'TinyEngine',
    desc: 'AI 时代的低代码基座',
    tag: '智能应用',
    mark: $t('platDemoMark1'),
    docUrl: '/tiny-engine',
    logo: 'tiny-engine',
    mobileImg: 'pro.png',
    iconbtn: 'vue',
    component: TinyEngine
  },
  {
    title: 'TinyVue',
    desc: '智能组件库',
    tag: '智能应用',
    mark: $t('platDemoMark1'),
    docUrl: '/tiny-vue',
    logo: 'tiny-vue',
    mobileImg: 'pro.png',
    iconbtn: 'vue',
    component: TinyVue
  },
  {
    title: 'TinyPro of Vue',
    desc: $t('platDemoDesc1'),
    mark: $t('platDemoMark1'),
    docUrl: '/vue-pro/docs/start',
    logo: 'tiny-pro',
    mobileImg: 'pro.png',
    iconbtn: 'vue',
    code: `import {
  Layout as TinyLayout,
  Row as TinyRow,
  Col as TinyCol,
} from '@opentiny/vue'
const pagerConfig = reactive({
  component: Pager,
  attrs: {
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10],
    total: 0,
    layout: 'total, prev, pager,
    next, jumper, sizes'
  }
})
`
  },
  {
    title: 'Tiny Charts',
    desc: $t('platChartDemoDesc'),
    mark: $t('platDemoChartMark'),
    docUrl: '/tiny-charts/QuickStart',
    logo: 'tiny-chart',
    mobileImg: 'chart.png',
    iconbtn: 'vue',
    code: `import HuiCharts from '@opentiny/huicharts'
let chartIns = new HuiCharts()

const chartOption = {
    theme: 'hdesign-light',
    data: [
        { value: 100, name: 'VPC' },
        { value: 94, name: 'IM' },
        { value: 44, name: 'EIP' },
        { value: 14, name: 'SG' }
    ]
};

chartIns.setSimpleOption(
  'PieChart', chartOption
)
chartIns.render()`
  },
  {
    title: 'TinyPro of Ng',
    desc: $t('platDemoDesc2'),
    mark: $t('platDemoMark1'),
    mobileImg: 'ng.png',
    docUrl: '/ng-pro/docs/introduction',
    logo: 'tiny-ng',
    iconbtn: 'angular',
    code: `import {
  Component, OnInit
} from '@angular/core'
import {
  MarketplaceMenus, CateContent,
  MarketplaceUrl, MarketContent
} from './constants'

@Componen$t({
  selector: 't-pro-marketplace',
  templateUrl:
  './marketplace.component.html',
  styleUrls:
  ['./marketplace.component.scss']
})`
  }
]
