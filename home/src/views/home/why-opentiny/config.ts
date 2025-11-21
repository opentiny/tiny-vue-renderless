import { $pub } from '@/tools'
export const data = [
  {
    tag: {
      icon: $pub('images/home/why-opentiny/logo1.svg'),
      title: '人工效率低，存在人为失误'
    },
    title: '智能化改造前的人机交互',
    description:
      '人需要手动操作前端界面上的 UI 组件来完成具体的任务，界面的复杂程度及 UI 组件的易用性等决定人执行任务的效率，并且不可避免产生各种人为操作的失误',
    advances: [
      {
        icon: $pub('images/home/why-opentiny/icon1-1.svg'),
        title: '系统成熟',
        description: '前端应用的人机交互发展多年，系统的运作机制和技术体系已经非常成熟'
      },
      {
        icon: $pub('images/home/why-opentiny/icon1-2.svg'),
        title: '上手成本',
        description: '无论是开发前端应用的成本，还是用户使用系统的学习成本，都相对稳定'
      }
    ],
    img: $pub('images/home/why-opentiny/why-opentiny-1.webp')
  },
  {
    tag: {
      icon: $pub('images/home/why-opentiny/logo2.svg'),
      title: 'AI 辅助提效，又快又准'
    },
    title: '智能化改造后同时支持人机交互和智能体交互',
    mobileTitle: '前端智能化交互方式',
    description:
      '保持现有前端的人机交互方式不变，新增智能体交互方式，让传统应用可以平稳过渡到智能应用，为后续逐步演进到后端智能体交互方式打下基础',
    advances: [
      {
        icon: $pub('images/home/why-opentiny/icon2-1.svg'),
        title: '低成本',
        description:
          '无需改动现有人机交互逻辑，无需改动后端 API 服务，仅在前端页面添加声明 MCP 工具的脚本，改造成本较低'
      },
      {
        icon: $pub('images/home/why-opentiny/icon2-2.svg'),
        title: '边界可控',
        description:
          '声明 MCP 工具的脚本由该应用的开发人员编写，智能体能获取的页面信息及调用的页面功能，完全取决于该应用的开发人员'
      },
      {
        icon: $pub('images/home/why-opentiny/icon2-3.svg'),
        title: '权限受控',
        description:
          '由于声明 MCP 工具的前端页面要求在用户登录系统后才可见，因此智能体调用该页面的 MCP 工具是以登录用户的身份执行'
      },
      {
        icon: $pub('images/home/why-opentiny/icon2-4.svg'),
        title: '交互转移',
        description:
          '借助 OpenTiny 的生成式 UI 技术，前端页面的 MCP 工具不需要操作页面 UI 组件，即可实现智能体与人在 AI 应用进行交互'
      }
    ],
    img: $pub('images/home/why-opentiny/why-opentiny-2.webp')
  },
  {
    tag: {
      icon: $pub('images/home/why-opentiny/logo3.svg'),
      title: '改造难度大，开发运维成本高'
    },
    title: '后端 API 服务进行 MCP 改造',
    description: '不对前端页面智能化改造，而是将后端 API 改造成 MCP 服务，让智能体直接调用改造后的 MCP 服务',
    advances: [
      {
        icon: $pub('images/home/why-opentiny/icon3-1.svg'),
        title: '改造难度大',
        description:
          '由于智能体直接调用后端 MCP 服务，绕过原本前端应用已经建立的权限机制，因此必须基于 MCP 协议的鉴权体系重新建立一套新的权限机制'
      },
      {
        icon: $pub('images/home/why-opentiny/icon3-2.svg'),
        title: '开发运维成本高',
        description:
          '将后端 API 改造成 MCP 服务要围绕智能体的特点，实现 MCP 服务的 AI 友好化和智能化，并且一般需要同时维护现有 API 服务和新的 MCP 服务'
      },
      {
        icon: $pub('images/home/why-opentiny/icon3-3.svg'),
        title: '应对新挑战',
        description:
          '不同于传统的网络攻击，智能应用是人通过自然语言与智能体进行交互，由于大模型尚未完全成熟，容易遭受新型的特殊语言指令的攻击'
      }
    ]
  }
]
