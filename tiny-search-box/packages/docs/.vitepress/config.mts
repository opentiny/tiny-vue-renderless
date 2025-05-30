import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'

const env = loadEnv(process.env.VITE_BASE_URL!, fileURLToPath(new URL('../', import.meta.url)))
// https://vitepress.dev/reference/site-co nfig
export default defineConfig({
  title: 'TinySearchBox',
  description: '一个好用的综合搜索组件',
  base: env.VITE_BASE_URL || '/tiny-search-box/',
  cleanUrls: true,
  vite: {
    ssr: {
      noExternal: [/@opentiny\//, '@opentiny/vue-search-box']
    }
  },
  markdown: {
    config(md) {
      // 支持区块内的方式展示 demo 和示例代码
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  head: [['link', { rel: 'icon', href: 'favicon.ico' }]],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '案例', link: '/examples/basic-usage' }
    ],
    outline: {
      label: '页面导航'
    },
    sidebar: [
      {
        text: '简介',
        items: [{ text: '快速开始', link: '/usage' }]
      },
      {
        text: '案例',
        items: [
          { text: '基本用法', link: '/examples/basic-usage' },
          { text: '默认包含筛选项', link: '/examples/v-model' },
          { text: '自动匹配', link: '/examples/auto-match' },
          { text: '自定义二级下拉面板', link: '/examples/custom-panel' },
          { text: '可编辑', link: '/examples/editable' },
          { text: '没有筛选项时的占位文本', link: '/examples/empty-placeholder' },
          { text: '自定义属性分组', link: '/examples/group-key' },
          { text: 'help 提示场景', link: '/examples/help' },
          { text: '指定筛选项的 ID 键取值', link: '/examples/id-map-key' },
          { text: '数据项占位文本', link: '/examples/item-placeholder' },
          { text: '输入长度限制', link: '/examples/max-length' },
          { text: '时间长度限制', link: '/examples/max-time-length' },
          { text: '合并多选标签', link: '/examples/merge-tag' },
          { text: '面板最大高度', link: '/examples/panel-max-height' },
          { text: '潜在匹配项', link: '/examples/potential-match' },
          { text: '自定义默认搜索项', link: '/examples/default-field' },
          { text: '切分输入值', link: '/examples/split-input-value' },
          { text: '事件', link: '/examples/events' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'props', link: '/apis/props' },
          { text: 'types', link: '/apis/types' },
          { text: 'events', link: '/apis/events' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/opentiny/tiny-search-box' }]
  }
})
