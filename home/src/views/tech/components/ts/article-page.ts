import news from '@/assets/tech/new.svg'

export function descriptionData() {
  const aboutData = [
    {
      img: news,
      markId: '1', //与markdown文件同名
      link: '/opentiny-design/article/guide/tinyvue/1?name=使用指南&subName=Tinyvue',
      title: 'OpenTiny训练营实操体验|轻松解锁TinyVue智能组件开发Web应用',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '申君健、岑灌铭',
        date: '2025年7月1日',
        apply: ''
      }
    },
    {
      markId: '2', //与markdown文件同名
      title: '快速入门 TinyVue 组件库一键换肤！get“多主题适配”技能',
      link: '/opentiny-design/article/guide/tinyvue/6?name=使用指南&subName=Tinyvue',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '岑灌铭',
        date: '2024年6月13日',
        apply: ''
      }
    },
    {
      markId: '3', //与markdown文件同名
      title: 'OpenTiny icons——超轻量的CSS图标库，引领图标库新风向',
      link: '/opentiny-design/article/guide/tinyvue/3?name=使用指南&subName=Tinyvue',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '申君健',
        date: '2025年5月13日',
        apply: ''
      }
    },
    {
      markId: '4', //与markdown文件同名
      title: 'OpenTiny Vue 组件库适配微前端可能遇到的4个问题',
      link: '/opentiny-design/article/guide/tinyvue/7?name=使用指南&subName=Tinyvue',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '岑灌铭',
        date: '2024年2月22日',
        apply: ''
      }
    },
    {
      markId: '5', //与markdown文件同名
      title: 'common-intellisense：助力 TinyVue 组件书写体验更丝滑',
      link: '/opentiny-design/article/guide/tinyvue/8?name=使用指南&subName=Tinyvue',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '曾令卡',
        date: '2024年7月25日',
        apply: ''
      }
    }
  ]
  const hotsData = [
    {
      img: news,
      markId: '1', //与markdown文件同名
      link: '/opentiny-design/article/feature/tinyengine/1?name=特性介绍&subName=Tinyengine',
      title: 'TinyEngine 2.7版本正式发布：开启低代码新范式！注册表功能重大更新！',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '李锦浩、柳霖',
        date: '2025年7月24日',
        apply: ''
      }
    },
    {
      markId: '2', //与markdown文件同名
      title: 'OpenTiny HUICharts 正式开源发布，一个简单、易上手的图表组件库',
      link: '/opentiny-design/article/feature/tinycharts/1?name=%E7%89%B9%E6%80%A7%E4%BB%8B%E7%BB%8D&subName=Tinycharts',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '张涵宇',
        date: '2024年8月6日',
        apply: ''
      }
    },
    {
      markId: '3', //与markdown文件同名
      title: 'TinyVue的DatePicker 组件支持日期面板单独使用啦！',
      link: '/opentiny-design/article/guide/tinyvue/4?name=使用指南&subName=Tinyvue',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '刘坤',
        date: '2025年3月12日',
        apply: ''
      }
    },
    {
      markId: '4', //与markdown文件同名
      title: 'TinyPro 中后台管理系统使用指南——让页面搭建变得如此简单！',
      link: '/opentiny-design/article/guide/tinypro/1?name=使用指南&subName=Tinypro',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '曾令卡',
        date: '2025年4月8日',
        apply: ''
      }
    },
    {
      markId: '5', //与markdown文件同名
      title: 'Node.js调试能力分析',
      link: '/opentiny-design/article/technology/node/9?name=%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF&subName=Node',
      instruct: {
        write: '原创',
        declaration: '作者：',
        author: '屈金雄',
        date: '2025年2月14日',
        apply: ''
      }
    }
  ]
  return { aboutData, hotsData }
}
