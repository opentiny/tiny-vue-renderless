// @ts-ignore 头部统一添加 furion 埋点
!(function (x: string, n: string) {
  window[n] = window[n] || {}
  window[n].config = {
    appId: 'C49090620DD44DFD8E3CA5911408CBBE',
    setting: 'api,jsTrack,uba,longtask,rtti,fps',
    hashMode: true,
    smartJsErr: false
  }
  let o = document.createElement('script')
  o.src = x
  o.async = !0
  let d = document.body.firstChild
  document.body.insertBefore(o, d)
})('https://res.hc-cdn.com/FurionSdkStatic/3.6.56/furion-cdn.min.js', '__fr')

import { createApp, type App } from 'vue'
import HeaderVue from './components/header.vue'
import FooterVue from './components/footer.vue'

export interface ICommonOption {
  /** 小屏时，主动将文档上的菜单区隐藏掉，然后显示图标， 点击菜单把指定菜单再显示出来 */
  menuCollapse?: {
    useCollapse: boolean
    menuId: string
  }
  customMenus?: {
    name: string
    url: string
    children: {
      title: string
      desc: string
      href: string
      logo: any
      github: string
    }[]
    isUnderline: () => boolean
  }[]
  rightVue?: any
  mobileRightVue?: any
  allowDarkTheme?: boolean
}
export default class TinyUIDesignCommon {
  options: ICommonOption | null = null
  headerId = ''
  footerId = ''
  barcodeUrl = ''

  headerApp: App | null = null
  footerApp: App | null = null

  // 模拟一个主题，防止某个网站访问它，而报错了。
  themeSubject = {
    subscribe: (_) => {
      return {
        unsubscribe: () => {}
      }
    }
  }

  constructor(ids: string[], options: ICommonOption = {}) {
    this.options = options

    this.headerId = ids.find((item) => item.match(/header/i)) || ''
    this.footerId = ids.find((item) => item.match(/footer/i)) || ''

    if (this.headerId[0] !== '#') this.headerId = '#' + this.headerId
    if (this.footerId[0] !== '#') this.footerId = '#' + this.footerId
  }

  async renderHeader() {
    this.destroyHeader()
    if (this.headerId) {
      this.headerApp = createApp(HeaderVue, { options: this.options })
      this.headerApp.mount(this.headerId)
    }
  }

  async renderFooter() {
    this.destroyFooter()
    if (this.footerId) {
      this.footerApp = createApp(FooterVue, { options: this.options })
      this.footerApp.mount(this.footerId)
    }
  }

  destroyHeader() {
    if (this.headerApp) {
      this.headerApp.unmount()
      this.headerApp = null
    }
  }

  destroyFooter() {
    if (this.footerApp) {
      this.footerApp.unmount()
      this.footerApp = null
    }
  }
}
