import { $pub } from '../../../tools/utils'

export const core = {
  icon: $pub('images/home/architecture/logo1.svg'),
  title: ' OpenTiny NEXT 智能化改造原理',
  content:
    '下图展示了企业前端应用智能化后完整的工作流程：首先使用 MCP 官方多语言 SDKs 在企业各类前端应用里声明 MCP 工具，然后引入 OpenTiny NEXT SDKs 让前端应用连接 OpenTiny 的 Web Agent Server，同时创建动态的 WebMCP 工具库。当用户打开 AI 应用，扫描前端应用里的 OpenTiny 提供的二维码，Agent 智能体就能在识别用户意图后通过 sessionId 自主调用 WebMCP 工具库。',
  img: $pub('images/home/architecture/home_archi.jpg')
}

export const advances = {
  icon: $pub('images/home/architecture/logo2.svg'),
  title: 'OpenTiny NEXT 的独特优势',
  content: [
    {
      icon: $pub('images/home/architecture/advance1.webp'),
      title: '扩大 MCP 工具范围',
      description:
        '为 Agent 智能体提供更多的 MCP 工具，实现当前现有的本地/云服务 MCP 工具所不具备的能力，即操控前端应用的能力。这种能力比 RPA 方案（Browser Use / Computer Use）更快更准更经济'
    },
    {
      icon: $pub('images/home/architecture/advance2.webp'),
      title: '完全兼容 MCP 生态',
      description:
        '所有的前端应用都采用标准的 MCP 协议声明 MCP Server，并且基于标准的 MCP 通讯方式进行连接，比如 Streamable HTTP，意味着能完全融入现有的 MCP 生态，兼容现有乃至未来的 MCP Host 应用'
    },
    {
      icon: $pub('images/home/architecture/advance3.webp'),
      title: '支持智能体交互范式',
      description:
        '当前的前端应用主要还是人机交互，即人手动操作前端界面上的 UI 组件。引入 OpenTiny 后 Agent 智能体可以借助 MCP 工具读取前端界面的信息、调用前端界面的功能，配合生成式 UI 实现新的智能体交互范式'
    },
    {
      icon: $pub('images/home/architecture/advance4.webp'),
      title: '多样的前端智能化方案',
      description:
        '不仅支持 Web 应用、桌面应用、移动应用的前端智能化改造，还支持 AI 应用（对话框）部署在浏览器扩展，集成到 Web 页面、内置在各终端的 AI 助手等，都可以直接或间接调用前端应用里的 MCP 工具'
    }
  ]
}

export const steps = [
  {
    img: $pub('images/home/architecture/stepImg1.webp'),
    icon: $pub('images/home/architecture/step1.svg'),

    extraImg: $pub('images/home/architecture/logo3.svg'),
    name: '在企业前端应用里添加 MCP 工具',
    step: '第一步',
    description:
      '使用标准的 MCP 官方多语言 SDKs 在各类前端应用里声明 MCP 工具，比如在 Web 应用里使用 TypeScript 版 SDK，在桌面应用里使用 C#/Python/Go/Ruby/Rust，在移动应用里使用 Swift/Kotlin 等 \n\n 接下来使用 OpenTiny NEXT SDKs  连接 Web Agent Server，连接成功后前端应用就会展示 OpenTiny 图标，点击后将展示二维码/识别码/连接URL等'
  },
  {
    img: $pub('images/home/architecture/stepImg2.webp'),
    icon: $pub('images/home/architecture/step2.svg'),
    name: 'Agent 智能体获取 MCP 工具授权',
    step: '第二步',
    description:
      '用户使用个人手机扫描前端应用里 OpenTiny 提供的二维码，将自动打开 AI 应用，如已打开则自动将该应用声明的 MCP 工具添加到 AI 应用内置的 MCP 插件里。\n\n 其中二维码里包含两部分信息，一是 OpenTiny 的 Web Agent Server 网址，二是区分不同前端应用的 SessionId。Agent 智能体可以根据 SessionId 到 WebMCP 工具库里获取已经授权 Agent 智能体使用的动态的 MCP 工具'
  },
  {
    img: $pub('images/home/architecture/stepImg3.webp'),
    icon: $pub('images/home/architecture/step1.svg'),
    name: 'Agent 智能体识别意图自主调用 MCP 工具',
    step: '第三步',
    description:
      'Agent 智能体识别用户意图后，将到 MCP 工具库中寻找能完成任务的工具。工具分为两类：一类是静态工具，比如部署在本地或者云服务的 MCP 工具，另一类是由 OpenTiny 提供的动态 MCP 工具，这类工具随前端应用连接 Web Agent Server 动态创建，连接断开将被注销 \n\n 当 Agent 智能体调用这些工具时，借助 Web Agent Server 的连接通道，将触发前端应用里对应的 MCP 工具'
  },
  {
    img: $pub('images/home/architecture/stepImg4.webp'),
    icon: $pub('images/home/architecture/step4.svg'),
    name: '使用三方 AI 应用实现智能体调用前端 MCP 工具',
    step: '第四步',
    description:
      '由于在前端应用里使用标准的 MCP 协议声明 MCP Server，意味着使用标准 MCP Client 的三方 AI 应用都能连接这些 MCP Server 并调用工具 \n\n 比如用于智能体编排的 n8n/Dify/Coze 等、用于辅助编程的 Cursor/Claude/VSCode 等，只需在这些 AI 应用里配置 MCP Server 的地址为 OpenTiny 的 Web Agent Server 地址，然后在地址后附加 SessionId，就能让这些 AI 应用完成同样任务'
  }
]
