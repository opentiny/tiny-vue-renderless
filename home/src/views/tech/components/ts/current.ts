import mcp from '@/assets/tech/mcp-next.png'
import engine2 from '@/assets/tech/engine28.png'
import next from '@/assets/tech/next.png'
import summer from '@/assets/tech/summer.svg'
import discuss from '@/assets/tech/discuss.svg'
import lowcode from '@/assets/tech/lowcode.svg'
import aiengine from '@/assets/tech/ai-engine.svg'
import vuetree from '@/assets/tech/vue-tree.svg'
import vue from '@/assets/tech/vue.svg'
import engine from '@/assets/tech/engine.svg'
import other from '@/assets/tech/other.svg'
import one from '@/assets/tech/one.svg'
import second from '@/assets/tech/second.svg'
import third from '@/assets/tech/third.svg'
import fourth from '@/assets/tech/fourth.svg'
import fifth from '@/assets/tech/fifth.svg'
import sixth from '@/assets/tech/sixth.svg'
import seventh from '@/assets/tech/seventh.svg'
import eighth from '@/assets/tech/eighth.svg'
import gold from '@/assets/tech/gold.svg'
import silver from '@/assets/tech/silver.svg'
import copper from '@/assets/tech/copper.svg'
import iron from '@/assets/tech/iron.svg'
import num1 from '@/assets/tech/num1.svg'
import num2 from '@/assets/tech/num2.svg'
import num3 from '@/assets/tech/num3.svg'
import buildEngine from '@/assets/tech/build-engine.svg'
import iconEnjoy from '@/assets/tech/icon-enjoy.svg'
import tsMorph from '@/assets/tech/ts-morph.svg'
import xinyu from '@/assets/tech/xinyu.png'
import xiaoyu from '@/assets/tech/xiaoyu.png'
import chensheng from '@/assets/tech/chensheng.jpg'
import guanmo from '@/assets/tech/guanmo.jpg'
import wangshizhong from '@/assets/tech/wangshizhong.png'

export function carouselData() {
  const data = [
    {
      image: mcp,
      img: one,
      info: '一场 MCP 生态的变革——详解 OpenTiny NEXT 逆向思维的技术创新',
      link: '/opentiny-design/article/analysis/next/1?name=原理解析&subName=Next'
    },
    {
      image: engine2,
      img: second,
      info: 'TinyEngine 2.8 正式上线：AI能力就位、Docker一键起飞！',
      link: '/opentiny-design/article/feature/tinyengine/13?name=特性介绍&subName=Tinyengine'
    },
    {
      image: next,
      img: third,
      info: 'OpenTiny NEXT 内核新生：生成式UI × MCP，重塑前端交互新范式！',
      link: '/opentiny-design/article/feature/next/1?name=特性介绍&subName=Next'
    },
    {
      image: summer,
      img: fourth,
      info: '15个项目，12000奖金！OpenTiny 开源之夏2025编程活动来袭！',
      link: '/opentiny-design/article/news/2?name=最新活动&type=news'
    },
    {
      image: discuss,
      img: fifth,
      info: '朋友你好，一起加入OpenTiny社区吧~',
      link: '/opentiny-design/article/news/3?name=最新活动&type=news'
    },
    {
      image: lowcode,
      img: sixth,
      info: '实操上手TinyEngine低代码引擎插件化开发',
      link: '/opentiny-design/article/guide/tinyengine/4?name=使用指南&subName=Tinyengine'
    },
    {
      image: aiengine,
      img: seventh,
      info: 'OpenTiny训练营活动|使用TinyEngine低代码引擎AI能力搭建华为云官网首页',
      link: '/opentiny-design/article/guide/tinyengine/2?name=使用指南&subName=Tinyengine'
    },
    {
      image: vuetree,
      img: eighth,
      info: '实操案例|TinyVue树表+动态行合并',
      link: '/opentiny-design/article/guide/tinyvue/5?name=使用指南&subName=Tinyvue'
    }
  ]
  return data
}

export function cardData() {
  const data = [
    {
      img: vue,
      title: 'TinyVue 组件库',
      desc: [
        {
          info: 'OpenTiny训练营实操体验|轻松解锁TinyVue智能组件开发Web应用',
          link: '/opentiny-design/article/guide/tinyvue/1?name=使用指南&subName=Tinyvue',
          suffix: true
        },
        {
          info: 'OpenTiny 体验官实操活动 | 快速体验 TinyVue 组件库的智能化交互能力',
          link: '/opentiny-design/article/guide/tinyvue/2?name=使用指南&subName=Tinyvue',
          suffix: true
        },
        {
          info: 'OpenTiny icons——超轻量的CSS图标库，引领图标库新风向',
          link: '/opentiny-design/article/guide/tinyvue/3?name=使用指南&subName=Tinyvue',
          suffix: true
        },
        {
          info: 'TinyVue的DatePicker 组件支持日期面板单独使用啦！',
          link: '/opentiny-design/article/guide/tinyvue/4?name=使用指南&subName=Tinyvue',
          suffix: false
        },
        {
          info: '实操案例|TinyVue树表+动态行合并',
          link: '/opentiny-design/article/guide/tinyvue/5?name=使用指南&subName=Tinyvue',
          suffix: false
        }
      ]
    },
    {
      img: engine,
      title: 'TinyEngine 低代码引擎',
      desc: [
        {
          info: 'AI助力快速引入外部组件到TinyEngine低代码引擎',
          link: '/opentiny-design/article/guide/tinyengine/1?name=使用指南&subName=Tinyengine',
          suffix: true
        },
        {
          info: 'OpenTiny训练营活动|使用TinyEngine低代码引擎AI能力搭建华为云官网首页',
          link: '/opentiny-design/article/guide/tinyengine/2?name=使用指南&subName=Tinyengine',
          suffix: true
        },
        {
          info: '强烈推荐|新手从搭建到二开TinyEngine低代码引擎',
          link: '/opentiny-design/article/guide/tinyengine/3?name=使用指南&subName=Tinyengine',
          suffix: true
        },
        {
          info: '实操上手TinyEngine低代码引擎插件化开发',
          link: '/opentiny-design/article/guide/tinyengine/4?name=使用指南&subName=Tinyengine',
          suffix: false
        },
        {
          info: '使用 TinyEngine 低代码引擎实现三方物料集成',
          link: '/opentiny-design/article/guide/tinyengine/5?name=使用指南&subName=Tinyengine',
          suffix: false
        }
      ]
    },
    {
      img: other,
      title: '其他',
      desc: [
        {
          info: 'TinyVue 智能组件库：基于 MCP 协议，实现 AI 代替人操作 Web 组件',
          link: '/opentiny-design/article/analysis/tinyvue/1?name=原理解析&subName=Tinyvue',
          suffix: true
        },
        {
          info: '将Node.js内置模块外置',
          link: '/opentiny-design/article/technology/node/2?name=前端技术&subName=Node',
          suffix: true
        },
        {
          info: 'TinyEditor v4.0 alpha：表格更强大，表情更丰富，上传体验超乎想象！',
          link: '/opentiny-design/article/feature/tinyeditor/1?name=特性介绍&subName=Tinyeditor',
          suffix: false
        },
        {
          info: 'OpenTiny HUICharts 正式开源发布，一个简单、易上手的图表组件库',
          link: '/opentiny-design/article/feature/tinycharts/1?name=特性介绍&subName=Tinycharts',
          suffix: false
        },
        {
          info: 'Node.js addon一文通',
          link: '/opentiny-design/article/technology/node/1?name=前端技术&subName=Node',
          suffix: false
        }
      ]
    }
  ]
  return data
}

export function videoData() {
  const data = [
    {
      img: buildEngine,
      title: '新手从搭建到二开TinyEngine低代码引擎',
      desc: {
        info: '',
        name: '观默',
        date: '2025年04月07日'
      },
      link: 'https://www.bilibili.com/video/BV1CkR1YVEFW/?spm_id_from=333.1387.collection.video_card.click&vd_source=b06daacb8364d3b887df5492fd31d992'
    },
    {
      img: iconEnjoy,
      title: 'TinyVue 轻量图标库探讨及分享',
      desc: {
        info: '',
        name: '申君健',
        date: '2025年4月23日'
      },
      link: 'https://www.bilibili.com/video/BV1i5Lbz8ELm/?spm_id_from=333.1387.collection.video_card.click&vd_source=b06daacb8364d3b887df5492fd31d992'
    },
    {
      img: tsMorph,
      title: '深入解析ts-morph:通过注释生成类型文档',
      desc: {
        info: '',
        name: '王士忠',
        date: '2024年06月04日'
      },
      link: 'https://www.bilibili.com/video/BV1UD421u7vb/?spm_id_from=333.1387.collection.video_card.click&vd_source=b06daacb8364d3b887df5492fd31d992'
    }
  ]
  return data
}

export function techData() {
  const data = [
    {
      img: gold,
      header: xinyu,
      num: num1,
      desc: {
        content: '徐新宇',
        area: '',
        part: '前端架构师',
        job: '',
        publish: 'TinyVue组件库高级用法：定制你的企业级UI体系'
      }
    },
    {
      img: silver,
      header: xiaoyu,
      num: num2,
      desc: {
        content: '李小雨',
        area: '',
        part: '产品总监',
        job: '',
        publish: '从新手到贡献者：手把手教你融入开源生态'
      }
    },
    {
      img: copper,
      header: chensheng,
      num: num3,
      desc: {
        content: '陈胜',
        area: '',
        part: '前端工程师',
        job: '',
        publish: '从零开始读懂TinyEngine代码结构理清设计意图'
      }
    },
    {
      img: iron,
      header: guanmo,
      desc: {
        content: '观默',
        area: '',
        part: '前端工程师',
        job: '',
        publish: '新手从搭建到二开TinyEngine低代码引擎'
      }
    },
    {
      img: iron,
      header: wangshizhong,
      desc: {
        content: '王士忠',
        area: '',
        part: '前端工程师',
        job: '',
        publish: 'TinyPro:一行命令搭建包含前后端的后台管理系统'
      }
    }
  ]
  return data
}

export function eventsData() {
  const data = [
    {
      info: 'HDC 2025|仰望星空，低头看路！OpenTiny再启航，持续打造前端智能化解决方案',
      link: '/opentiny-design/article/hot/1?name=热门活动&type=hot'
    },
    {
      info: '开源之夏·西安电子科技大学站精彩回顾：OpenTiny开源技术下沉校园，点燃高校开发者技术热情',
      link: '/opentiny-design/article/hot/2?name=热门活动&type=hot'
    },
    {
      info: '是观察者，也是实践者！|华为云开源开发者大前端技术论坛完满结束',
      link: '/opentiny-design/article/hot/3?name=热门活动&type=hot'
    },
    {
      info: 'OpenTiny 亮相 W3C 2024春季顾问委员会会议，共话行业新趋势。',
      link: '/opentiny-design/article/hot/4?name=热门活动&type=hot'
    }
  ]
  return data
}
