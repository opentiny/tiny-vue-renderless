// 测试common包的功能
import TDCommon from './index'
import { h, defineComponent } from 'vue'

const XXX = defineComponent({
  render() {
    return h('div', {}, 'xxx')
  }
})

const YYY = defineComponent({
  render() {
    return h('div', {}, 'yyy')
  }
})

const common = new TDCommon(['#header', '#footer'], {
  menuCollapse: {
    useCollapse: false,
    menuId: '#menu'
  },
  allowDarkTheme: true
  // customMenus: [
  //   {
  //     name: '设计',
  //     url: '/opentiny-design/design-principle',
  //     children: [],
  //     isUnderline: () => location.pathname.startsWith('/opentiny-design/design-principle')
  //   },
  //   {
  //     name: '指南',
  //     url: '/opentiny-design/guide',
  //     children: [],
  //     isUnderline: () => location.pathname.startsWith('/opentiny-design/guide')
  //   }
  // ],
  // rightVue: XXX,
  // mobileRightVue: YYY
})
common.renderHeader()
common.renderFooter()
