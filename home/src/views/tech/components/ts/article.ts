export function articleMdData() {
  const guide = {
    type: 'guide',
    name: '使用指南',
    about: [
      { info: 'TinyVue', value: 'tinyvue', default: 'tinyvue' },
      { info: 'TinyEngine', value: 'tinyengine', default: '' },
      { info: 'TinyPro', value: 'tinypro', default: '' },
      { info: 'TinyCLI', value: 'tinycli', default: '' },
      { info: 'OpenTiny NEXT', value: 'next', default: '' }
    ],
    data: {
      tinyvue: [
        {
          markId: '1', //与markdown文件同名
          title: 'OpenTiny训练营实操体验|轻松解锁TinyVue智能组件开发Web应用',
          tag: '精华',
          type: 'warning',
          content:
            '本次实验是通过改造一个使用 TinyVue 组件的常规 Web 应用，秒变为一个能够对接大语言模型的智能应用。这个应用可以让用户通过自然语言与网页进行对话，直接“精准”操作网页上的组件。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '申君健、岑灌铭',
            date: '2025年7月1日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/1?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '2', //与markdown文件同名
          title: 'OpenTiny 体验官实操活动 | 快速体验 TinyVue 组件库的智能化交互能力',
          tag: 'NEW',
          type: 'danger',
          content:
            '本次实验主要是在 TinyVue 官网上，开发者能够通过 AI 对话框，以语音或文字方式与网站组件进行互动，并且还能借助 VSCode Copilot、Cursor 等 IDE 工具，Dify、Coze 等智能体平台来操作这些组件。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '郑志超',
            date: '2025年6月21日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/2?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '3', //与markdown文件同名
          title: 'OpenTiny icons——超轻量的CSS图标库，引领图标库新风向',
          content: '图标库是很小众的技术，从早先的字体图标，到现在形形色色的组件库图标，我们应该使用什么技术去做呢？',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '申君健',
            date: '2025年5月13日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/3?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '4', //与markdown文件同名
          title: 'TinyVue的DatePicker 组件支持日期面板单独使用啦！',
          content:
            'DatePicker 组件全新升级，支持日期面板单独使用！无论您是需要在复杂页面中嵌入日期选择器，还是希望在特定场景下提供独立的日期选择功能，这个功能都能满足您的需求。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '刘坤',
            date: '2025年3月12日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/4?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '5', //与markdown文件同名
          title: '实操案例|TinyVue树表+动态行合并',
          content:
            '当初用 Element 实现这个表格时费了一些周折，料想 TinyVue 上场应该也不轻松，谁曾想一上手才知道——这比 Element 实现容易多了！',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '孟智强',
            date: '2024年11月19日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/5?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '6', //与markdown文件同名
          title: '快速入门 TinyVue 组件库一键换肤！get“多主题适配”技能',
          content:
            '本次实操内容通过实现 TinyVue 中 Button 组件和 Alert 的类 element 主题适配，让开发者感受到 TinyVue 跨设计规范的亮点特性，同时对 TinyVue 组件库多主题的实现原理有个初步的了解。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '岑灌铭',
            date: '2024年6月13日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/6?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '7', //与markdown文件同名
          title: 'OpenTiny Vue 组件库适配微前端可能遇到的4个问题',
          content: 'TinyVue组件库的跨技术栈能力与微前端十分契合，往期我们也有文章，指导如何在wujie微前端中使用。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '岑灌铭',
            date: '2024年2月22日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/7?name=使用指南&subName=Tinyvue'
        },
        {
          markId: '8', //与markdown文件同名
          title: 'common-intellisense：助力 TinyVue 组件书写体验更丝滑',
          content: 'common-intellisense 支持 TinyVue 组件库啦！',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年7月25日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyvue/8?name=使用指南&subName=Tinyvue'
        }
      ],
      tinyengine: [
        {
          markId: '1', //与markdown文件同名
          title: 'AI助力快速引入外部组件到TinyEngine低代码引擎',
          content:
            '我们公司面临着将私有组件库接入TinyEngine的需求。如果采用传统的人工方式为每个组件编写schema文件，不仅耗时费力，更重要的是缺乏那种让人兴奋的技术创新感。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '观默',
            date: '2025年7月3日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/1?name=使用指南&subName=Tinyengine'
        },
        {
          markId: '2', //与markdown文件同名
          title: 'OpenTiny训练营活动|使用TinyEngine低代码引擎AI能力搭建华为云官网首页',
          content:
            '实时定制出自己的低代码平台。适用于多场景的低代码平台开发，如：资源编排、服务端渲染、模型驱动、移动端、大屏端、页面编排等。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '王莉纯',
            date: '2025年6月21日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/2?name=使用指南&subName=Tinyengine'
        },
        {
          markId: '3', //与markdown文件同名
          title: '强烈推荐|新手从搭建到二开TinyEngine低代码引擎',
          content:
            '我想来跟你分享一下这款华为开源的低代码引擎--TinyEngine。它基于 Vue3，利用 DSL 实现从 schema 生成源码，支持多框架集成，且拥有强大的插件系统，能实现各种定制化开发的需求。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '观默',
            date: '2025年4月1日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/3?name=使用指南&subName=Tinyengine'
        },
        {
          markId: '4', //与markdown文件同名
          title: '实操上手TinyEngine低代码引擎插件化开发',
          content:
            '低代码开发是近些年非常热门的一种开发方式，用户可以通过可视化的方式，简单拖拽，不写代码或者编写少量代码，类似搭积木一样搭建业务应用。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '伍其和',
            date: '2024年10月18日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/4?name=使用指南&subName=Tinyengine'
        },
        {
          markId: '5', //与markdown文件同名
          title: '使用 TinyEngine 低代码引擎实现三方物料集成',
          content:
            '本文由体验技术团队 TinyEngine 项目成员炽凌创作，欢迎大家实操体验，本体验内容基于 TinyEngine 低代码引擎提供的环境，介绍了如何通过 TinyEngine 低代码引擎实现三方物料集成，帮助开发者快速开发。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李锦浩',
            date: '2024年6月5日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/5?name=使用指南&subName=Tinyengine'
        },
        {
          markId: '6', //与markdown文件同名
          title: 'TinyEngine 低代码引擎：带你5分钟高效构建游戏登录界面',
          content:
            '本文由体验技术团队 TinyEngine 项目成员李旭宏创作，欢迎大家实操体验，本体验项目基于 TinyEngine 低代码引擎提供的环境，通过体验简单拖、拉、拽的形式帮助开发者快速了解低代码引擎的使用流程，达到快速开发游戏登录界面的效果。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李旭宏',
            date: '2024年5月29日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/6?name=使用指南&subName=Tinyengine'
        },
        {
          markId: '7', //与markdown文件同名
          title: 'TinyEngine 低代码引擎区块局域网部署方案全新上线！',
          content:
            '在 TinyEngine 开源后，对私有化部署存在诉求的用户越来越多，而当前 TinyEngine 多项内容都依托在公网中，当前官网提供的区块发布方案，为公网环境下的发布，不能完全满足部分用户的需求。因此需要提供用户能够在内网环境下，也能够正常使用 TinyEngine 的全部功能的方案。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '王文敏',
            date: '2024年5月9日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinyengine/7?name=使用指南&subName=Tinyengine'
        }
      ],
      tinypro: [
        {
          markId: '1', //与markdown文件同名
          title: 'TinyPro 中后台管理系统使用指南——让页面搭建变得如此简单！',
          content:
            'TinyPro 是一个基于 TinyVue 打造的前后端分离的后台管理系统，支持在线配置菜单、路由、国际化，支持页签模式、多级菜单，支持丰富的模板类型，支持多种构建工具，功能强大、开箱即用。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年4月8日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinypro/1?name=使用指南&subName=Tinypro'
        }
      ],
      tinycli: [
        {
          markId: '1', //与markdown文件同名
          title: 'Vue.js 应用实现监控可观测性最佳实践',
          content:
            'TinyPro 是一套使用 Vue 编写的中后台管理后台框架，官网地址：https://www.opentiny.design/vue-pro/docs/start ，下面以 TinyPro 为例来接入如何实现 Vue 应用的可观测性。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '可观测学堂',
            date: '2024年3月19日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/tinycli/1?name=使用指南&subName=Tinycli'
        }
      ],
      next: [
        {
          markId: '1', //与markdown文件同名
          title: 'OpenTiny NEXT 实操体验 | 四步将你的 Web 应用升级为智能应用',
          content:
            'OpenTiny 团队基于 MCP 协议实现了 AI 代替人操作 Web 应用这项技术，并应用到我们的 TinyVue 组件库中，实现了 TinyVue 组件库的智能化改造，使用 TinyVue 智能组件库开发的应用，天然地支持被 AI 识别和操控。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年9月12日',
            apply: ''
          },
          link: '/opentiny-design/article/guide/next/1?name=使用指南&subName=Next'
        }
      ]
    }
  }
  const analysis = {
    type: 'analysis',
    name: '原理解析',
    about: [
      { info: 'TinyVue', value: 'tinyvue', default: 'tinyvue' },
      { info: 'OpenTiny NEXT', value: 'next', default: 'next' }
    ],
    data: {
      tinyvue: [
        {
          markId: '1', //与markdown文件同名
          title: 'TinyVue 智能组件库：基于 MCP 协议，实现 AI 代替人操作 Web 组件',
          content:
            '2025年6月21日，我在华为开发者大会2025（HDC2025）开源论坛做了一场主题分享，给开发者们介绍我们 OpenTiny 团队基于 MCP 协议实现 AI 代替人操作 Web 应用的技术。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年6月30日',
            apply: ''
          },
          link: '/opentiny-design/article/analysis/tinyvue/1?name=原理解析&subName=Tinyvue'
        },
        {
          markId: '2', //与markdown文件同名
          title: 'TinyVue：与 Vue 交往八年的组件库',
          content:
            '“先写一个我和 Vue 的八周年”。我寻思，我那十分钟的闪电演讲，有人吐槽没有干货，比如同时支持 Vue2 和 Vue3 的技术细节，不如就利用这个机会，给闪电演讲打个补丁。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '莫春辉',
            date: '2024年7月19日',
            apply: ''
          },
          link: '/opentiny-design/article/analysis/tinyvue/2?name=原理解析&subName=Tinyvue'
        },
        {
          markId: '3', //与markdown文件同名
          title: 'Renderless 思想正在影响前端开发',
          content: '',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '方长_beezen',
            date: '2024年7月4日',
            apply: ''
          },
          link: '/opentiny-design/article/analysis/tinyvue/3?name=原理解析&subName=Tinyvue'
        },
        {
          markId: '4', //与markdown文件同名
          title: '直播回顾|6个实例带你解读TinyVue 组件库跨框架技术',
          content:
            '在本期《手把手教你实现mini版TinyVue组件库》的主题直播中，华为云前端开发DTSE技术布道师阿健老师，给开发者们展开了组件库跨框架的讨论。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '申君健、胡艳鑫',
            date: '2024年4月24日',
            apply: ''
          },
          link: '/opentiny-design/article/analysis/tinyvue/4?name=原理解析&subName=Tinyvue'
        }
      ],
      next: [
        {
          markId: '1', //与markdown文件同名
          title: '一场 MCP 生态的变革——详解 OpenTiny NEXT 逆向思维的技术创新',
          content:
            '如何破解这一难题？OpenTiny NEXT 运用逆向思维，创新性地将 MCP Server 运行在前端，使得智能体能够将前端应用当作 MCP 工具来调用，以低成本方式实现传统应用的智能化，并在执行效率和准确率等方面显著优于 GUI 方案。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '莫春辉',
            date: '2025年9月18日',
            apply: ''
          },
          link: '/opentiny-design/article/analysis/next/1?name=原理解析&subName=Next'
        }
      ]
    }
  }

  const feature = {
    type: 'feature',
    name: '特性介绍',
    about: [
      { info: 'TinyVue', value: 'tinyvue', default: 'tinyvue' },
      { info: 'TinyEngine', value: 'tinyengine', default: '' },
      { info: 'TinyPro', value: 'tinypro', default: '' },
      { info: 'TinyEditor', value: 'tinyeditor', default: '' },
      { info: 'TinyCharts', value: 'tinycharts', default: '' },
      { info: 'OpenTiny NEXT', value: 'next', default: '' }
    ],
    data: {
      tinyvue: [
        {
          markId: '1', //与markdown文件同名
          title: 'TinyVue v3.23.0 正式发布：增加 NumberAnimation 数字动画组件、支持全局配置组件的 props',
          content: ' 增加 NumberAnimation 数字动画组件。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年5月27日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyvue/1?name=特性介绍&subName=Tinyvue'
        },
        {
          markId: '2', //与markdown文件同名
          title: 'TinyVue v3.22.0 正式发布：深色模式上线！集成 UnoCSS 图标库！TypeScript 类型支持全面升级！',
          content:
            '本次 3.22.0 版本主要有以下重大变更：支持深色模式、增加基于 UnoCSS 的图标库、更丰富的 TypeScript 类型声明、支持 XSS 配置',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年4月25日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyvue/2?name=特性介绍&subName=Tinyvue'
        },
        {
          markId: '3', //与markdown文件同名
          title: '优化永不止步：TinyVue v3.20.0 正式发布，更美观的官网UI，更友好的文档搜索，更强大的主题配置能力~',
          content:
            'TinyVue 官网增加 Algolia 全文搜索，原来只能搜索组件名称，现在可以搜索组件Demo和API文档，让你更容易搜索到自己想要的内容。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年12月7日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyvue/3?name=特性介绍&subName=Tinyvue'
        },
        {
          markId: '4', //与markdown文件同名
          title: 'TinyVue v3.19.0 正式发布！Tree 组件终于支持虚拟滚动！',
          content: '增加 VirtualTree 虚拟树组件、增加 VirtualScrollBox 虚拟化容器组件、 增加 Sticky 粘性布局组件。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年11月12日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyvue/4?name=特性介绍&subName=Tinyvue'
        },
        {
          markId: '5', //与markdown文件同名
          title: '焕然一新！TinyVue 组件库 UI 大升级，更符合现代的审美！',
          content:
            '这套全新的设计规范，是我们的设计师同事结合华为云的业务特点和最新的设计趋势打磨出来的，目前 TinyVue 所有组件均已支持 OpenTiny Design 设计规范。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年11月8日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyvue/5?name=特性介绍&subName=Tinyvue'
        },
        {
          markId: '6', //与markdown文件同名
          title: 'OpenTiny 前端组件库正式开源啦！面向未来，为开发者而生',
          content: '面向未来，为开发者而生',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年3月20日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyvue/6?name=特性介绍&subName=Tinyvue'
        }
      ],
      tinyengine: [
        {
          markId: '13', //与markdown文件同名
          title: 'TinyEngine 2.8 正式上线：AI能力就位、Docker一键起飞！',
          content: 'AI 可通过 MCP 协议直接操作平台能力（创建词条/创建页面/修改属性等），支持可视化管理 MCP 工具。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '伍其和',
            date: '2025年8月28日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/13?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '1', //与markdown文件同名
          title: 'TinyEngine 2.7版本正式发布：开启低代码新范式！注册表功能重大更新！',
          content:
            '近期，我们正式推出TinyEngine v2.7版本，希望能够给大家带来更好的使用体验，能够深度定制化的同时可以更简洁便利地配置。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李锦浩、柳霖',
            date: '2025年7月24日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/1?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '2', //与markdown文件同名
          title: 'TinyEngine2.6版本焕新发布：实现页面树折叠！设计器 UI 及多项功能点升级！',
          content:
            '近期，我们正式推出TinyEngine v2.6版本，希望能够给大家带来更好的使用体验，满足大家日益增长的各种需求。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李璇',
            date: '2025年6月26日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/2?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '3', //与markdown文件同名
          title: 'TinyEngine 2.5版本正式发布：多选交互优化升级，页面预览支持热更新，性能持续跃升！',
          content:
            '近期，TinyEngine v2.5版本带着新的功能和优化一起来咯~ 希望这次更新能为大家的使用带来更多的便利与惊喜。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李锦浩',
            date: '2025年5月20日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/3?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '4', //与markdown文件同名
          title: 'TinyEngine 2.4版本正式发布：文档全面开源，实现主题自定义，体验焕新升级！',
          content:
            '近期，TinyEngine v2.4版本带着新的功能和优化正式上线~ 希望这次更新能为大家的使用带来更多的便利与惊喜。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李璇',
            date: '2025年4月17日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/4?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '5', //与markdown文件同名
          title: 'TinyEngine2.3版本发布：界面更美观、操作更便捷、路由能力再次升级',
          content:
            '近期，TinyEngine 正式推出 2.3 版本！继 2.2 版本通过嵌套路由革新应用架构后，本次升级聚焦路由能力增强与界面主题切换，使得开发体验再上新的台阶。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李松',
            date: '2025年3月18日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/5?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '6', //与markdown文件同名
          title: 'TinyEngine v2.2版本发布：支持页面嵌套路由，提升多层级路由管理能力&开发分支调整',
          content:
            '我们很高兴地宣布：TinyEngine v2.2版本正式发布！本次更新带来了重要的功能增强——页面支持嵌套路由，让开发者在构建复杂应用时更加得心应手。接下来，我们将详细介绍该版本的几大亮点与改进。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '胡靖',
            date: '2025年2月27日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/6?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '7', //与markdown文件同名
          title: '开发者福音！TinyEngine开启新篇章，服务端Java版本正式开源~',
          content:
            'TinyEngine 低代码引擎作为低代码平台的底座，提供可视化搭建页面等基础能力，既可以通过线上搭配组合使用，也可以通过 cli 创建个人工程进行二次开发，实时定制出自己的低代码平台。适用于多场景的低代码平台开发，如：资源编排、服务端渲染、模型驱动、移动端、大屏端、页面编排等。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '路延刚',
            date: '2025年2月7日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/7?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '8', //与markdown文件同名
          title: 'TinyEngine v2.1版本发布：全新的区块方案和画布通信方案，打造更强力的可拓展低代码引擎',
          content:
            '2025年蛇年已经到来，TinyEngine v2.1.0 版本也已经蛇气腾腾的发布了出来，新年新气象，为了让大家更详细了解到 v2.1.0 的内容更新，我们特此列举了该版本中的一些重要特性更新。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李锦浩',
            date: '2025年1月17日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/8?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '9', //与markdown文件同名
          title: 'TinyEngine低代码引擎2.0新特性介绍',
          content:
            '源码二次开发管理问题以及定制化能力不够强大，想要深度定制必须修改源码，而当开发者们在TinyEngine的源码中融入了大量的定制业务逻辑，这又使得直接合并TinyEngine自身的新功能变得异常困难，常常引发代码冲突和错误。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李旭宏',
            date: '2024年11月27日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/9?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '10', //与markdown文件同名
          title: '智启未来：TinyEngine 低代码引擎版本更新，畅享升级体验',
          content:
            '它是低代码平台的底座，提供可视化搭建页面等基础能力，既可以通过线上搭配组合，也可以通过下载源码进行二次开发，实时定制出自己的低代码平台。适用于多场景的低代码平台开发，如：资源编排、服务端渲染、模型驱动、移动端、大屏端、页面编排等。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '王文敏',
            date: '2024年3月21日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/10?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '11', //与markdown文件同名
          title: 'TinyEngine 服务端正式开源啦！！！',
          content:
            '2023年9月21日，TinyEngine 在华为全联接大会正式宣布开源，引发了广泛的关注，3个月时间收获了960个 Star，组建了4个用户交流社群，成员数772名。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李云蛟',
            date: '2024年1月3日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/11?name=特性介绍&subName=Tinyengine'
        },
        {
          markId: '12', //与markdown文件同名
          title: '低代码引擎 TinyEngine 正式发布！！！',
          content:
            '随着企业对于低代码开发平台的需求日益增长，急需一个通用的解决方案来满足各种低代码平台的开发需求。正是在这种情况下，低代码引擎应运而生。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '李旭宏',
            date: '2023年9月21日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyengine/12?name=特性介绍&subName=Tinyengine'
        }
      ],
      tinypro: [
        {
          markId: '1', //与markdown文件同名
          title: 'TinyPro 1.2.0 正式发布：增加综合搜索，解决数据筛选难题，后端单测覆盖率再提升！',
          content:
            'TinyPro 是一个基于 TinyVue 打造的前后端分离的后台管理系统，支持在线配置菜单、路由、国际化，支持页签模式、多级菜单，支持丰富的模板类型，支持多种构建工具，功能强大、开箱即用。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年4月16日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinypro/1?name=特性介绍&subName=Tinypro'
        },
        {
          markId: '2', //与markdown文件同名
          title: 'TinyPro Vue 1.1.0 正式发布：增加细粒度权限、页签模式、多级菜单，支持Vite/Rspack/Farm等构建工具',
          content:
            '为了提升前端开发效率，OpenTiny 提供了一个跨平台的前端工程化 CLI 工具 TinyCLI，为开发者提供一系列开发套件及工程插件，覆盖前端开发的整个链路，保证团队开发过程的一致性和可复制性。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年12月3日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinypro/2?name=特性介绍&subName=Tinypro'
        }
      ],
      tinyeditor: [
        {
          markId: '1', //与markdown文件同名
          title: 'TinyEditor v4.0 alpha：表格更强大，表情更丰富，上传体验超乎想象！',
          content:
            'TinyEditor 是一个基于 Quill 2.0 的富文本编辑器，在 Quill 基础上扩展了丰富的模块和格式，框架无关、功能强大、开箱即用。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年7月18日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyeditor/1?name=特性介绍&subName=Tinyeditor'
        },
        {
          markId: '2', //与markdown文件同名
          title: '重磅更新！Fluent Editor 开源富文本支持 LaTeX 可编辑公式啦~',
          content: 'Quill 内置了公式的功能，基于 KaTeX，使用时需要安装 katex 依赖，并导入对应的样式。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年11月15日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyeditor/2?name=特性介绍&subName=Tinyeditor'
        },
        {
          markId: '3', //与markdown文件同名
          title: 'Fluent Editor 富文本开源2个月的总结：增加格式刷、截屏、TypeScript 类型声明等新特性',
          content:
            'EditorX，最早 EditorX 只是在公司内部使用，做 EditorX 的过程让我对 Quill 这款开源富文本有了更加深入的了解，沉淀了《深入浅出 Quill》系列文章。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年10月29日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyeditor/3?name=特性介绍&subName=Tinyeditor'
        },
        {
          markId: '4', //与markdown文件同名
          title:
            '一直没找到合适的开源富文本？何不尝试下Fluent Editor，一个基于Quill 2.0的富文本编辑器，功能强大、开箱即用！',
          content:
            '接下来我就带大家一起使用下 Fluent Editor，使用起来基本上和 Quill 没什么区别，只需要重点关注下增强的部分，比如表格、附件、@提醒、表情等模块。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2024年8月22日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinyeditor/4?name=特性介绍&subName=Tinyeditor'
        }
      ],
      tinycharts: [
        {
          markId: '1', //与markdown文件同名
          title: 'OpenTiny HUICharts 正式开源发布，一个简单、易上手的图表组件库',
          content:
            'OpenTiny HUICharts 集成了自适应、性能提升、数据状态管理、无障碍能力、刻度优化、刻度均分等特性。这些特性帮助我们解决了许多内部业务场景中的问题。我们追求的目标是让图表的使用变得更加简单、直观且易于上手',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '张涵宇',
            date: '2024年8月6日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/tinycharts/1?name=特性介绍&subName=Tinycharts'
        }
      ],
      next: [
        {
          markId: '1', //与markdown文件同名
          title: 'OpenTiny NEXT 内核新生：生成式UI × MCP，重塑前端交互新范式！',
          content: '每一个企业应用都值得被 AI 理解，每一次用户交互都可以更自然、更智能。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曾令卡',
            date: '2025年9月17日',
            apply: ''
          },
          link: '/opentiny-design/article/feature/next/1?name=特性介绍&subName=Next'
        }
      ]
    }
  }

  const technology = {
    type: 'technology',
    name: '前端技术',
    about: [
      { info: 'Node.js 技术原理分析系列', value: 'node', default: 'node' }
      // { info: 'zone.js 由入门到放弃系列', value: 'zone', default: '' },
      // { info: '其他', value: 'other', default: '' }
    ],
    data: {
      node: [
        {
          markId: '1', //与markdown文件同名
          title: 'Node.js addon一文通',
          content:
            'Node.js 是基于Chrome V8引擎构建的，专为高性能、高并发的网络应用而设计，广泛应用于构建服务器端应用程序、网络应用、命令行工具等。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年5月9日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/1?name=前端技术&subName=Node'
        },
        {
          markId: '2', //与markdown文件同名
          title: '将Node.js内置模块外置',
          content:
            '在上一节中我们探讨了Node.js模块加载方式分析的相关内容，在本节中则主要分享《Node.js内置模块外置》相关内容，本文内容为本系列第8篇，以下为正文内容。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年4月23日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/2?name=前端技术&subName=Node'
        },
        {
          markId: '3', //与markdown文件同名
          title: 'Node.js模块加载方式分析',
          content:
            '在上一节中我们探讨了基于 V8 封装 JavaScript 运行时的相关内容，在本节中则主要分享《Node.js模块加载方式分析》相关内容，本文内容为本系列第7篇，以下为正文内容。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年4月15日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/3?name=前端技术&subName=Node'
        },
        {
          markId: '4', //与markdown文件同名
          title: '基于 V8 封装一个自己的 JavaScript 运行时',
          content:
            '在上一节中我们探讨了 Node.js 中的 ABI 稳定相关内容，在本节中则主要分享《基于 V8 封装一个自己的 JavaScript 运行时》相关内容，本文内容为本系列第6篇，以下为正文内容。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曹杨毅',
            date: '2025年3月21日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/4?name=前端技术&subName=Node'
        },
        {
          markId: '5', //与markdown文件同名
          title: '理解 Node.js 中的 ABI 稳定',
          content:
            '在上一节中我们探讨了使用 Chrome DevTools 分析 Node.js 性能问题，在本节中则主要分享 Node.js 中的 ABI 稳定相关内容，本文内容为本系列第5篇，以下为正文内容。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年3月13日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/5?name=前端技术&subName=Node'
        },
        {
          markId: '6', //与markdown文件同名
          title: '使用 Chrome DevTools 分析 Node.js 性能问题',
          content:
            '在上一节中我们探讨了 Node.js 的 perf_hooks 模块作用和用法，在本节中则主要分享使用 Chrome DevTools 分析 Node.js 性能问题，本文内容为本系列第4篇，以下为正文内容。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年3月7日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/6?name=前端技术&subName=Node'
        },
        {
          markId: '7', //与markdown文件同名
          title: 'Node.js的perf_hooks模块作用和用法',
          content:
            'perf_hooks 模块使用的时间戳都是高精度时间戳，依赖的底层 api 是 process.hrtime()，单位是毫秒（ms），保留 14 位小数点，例如 35.87660002708435。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年2月25日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/7?name=前端技术&subName=Node'
        },
        {
          markId: '8', //与markdown文件同名
          title: '如何在Node.js中新增一个内置模块',
          content:
            '作为 Node.js 的使用者，想必同学们对“内置模块”这个概念并不陌生：Node.js 内置模块也叫核心模块，预置在 Node.js 运行时中，这些内置模块不需要额外下载安装，可以在 js 代码中通过 require 引入。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '曹杨毅',
            date: '2025年2月18日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/8?name=前端技术&subName=Node'
        },
        {
          markId: '9', //与markdown文件同名
          title: 'Node.js调试能力分析',
          content:
            '调试的目的是通过观察运行时数据来定位问题。Node.js 的运行时数据由 V8 引擎管理，为了实现调试功能，V8封装了一套 api 供外部查看运行时数据，这套 api 名字就是 V8 inspector（运行时是一个 websocket 服务）。',
          instruct: {
            write: '原创',
            declaration: '作者：',
            author: '屈金雄',
            date: '2025年2月14日',
            apply: ''
          },
          link: '/opentiny-design/article/technology/node/9?name=前端技术&subName=Node'
        }
      ],
      zone: [],
      other: []
    }
  }
  return { guide, analysis, feature, technology }
}
