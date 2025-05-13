import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Opentiny Design',
  description: 'A Cross-framework Icons Library',
  base: '/icons/',
  cleanUrls: true,
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/quick-start' },
      {
        text: '浏览图标',
        items: [
          { text: '基础图标', link: '/browser-icons-base' },
          { text: '云服务图标', link: '/browser-icons-svc' },
          { text: '云服务扩展图标', link: '/browser-icons-ext' },
          { text: '状态图标', link: '/browser-icons-stat' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: '图标库介绍', link: '/introduce' },
          { text: '快速上手', link: '/quick-start' },
          {
            text: '浏览图标',
            items: [
              { text: '基础图标', link: '/browser-icons-base' },
              { text: '云服务图标', link: '/browser-icons-svc' },
              { text: '云服务扩展图标', link: '/browser-icons-ext' },
              { text: '状态图标', link: '/browser-icons-stat' }
            ]
          },
          { text: '更新日志', link: '/changelog' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/opentiny/icons' }],
    outline: {
      label: '目录'
    },
    footer: {
      copyright: 'Copyright © 2025-present OpenTiny'
    }
  }
})
