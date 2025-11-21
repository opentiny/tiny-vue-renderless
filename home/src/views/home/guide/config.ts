import { StepSetting } from './type'

export const nextSdkGuideUrl = 'https://opentiny.github.io/next-sdk/guide/'

export const stepSettings: StepSetting[] = [
  {
    title: '步骤1',
    subTitle: '引入 NEXT-SDKs',
    shortTitle: '引入',
    descriptions: ['在 HTML 头部通过<script>标签加载@opentiny/next-sdk，获取WebMcpServer、WebMcpClient等核心能力。'],
    guide: {
      code: `
<html>
  <head>
    <script src="https://unpkg.com/@opentiny/next-sdk@0.1/dist/webmcp-full.js"></script>
  </head>
  <body>
    <script>
      ;(async () => {
        const { WebMcpServer, createMessageChannelPairTransport, z, WebMcpClient } = WebMCP
      })()
    </script>
  </body>
</html>`,
      title: '引入 NEXT-SDKs'
    }
  },
  {
    title: '步骤2',
    subTitle: '创建 Web 端 MCPServer',
    shortTitle: '创建',
    descriptions: [
      '使用 NEXT-SDKs 提供的 WebMcpServer,快速实现在 Web 端定义 MCPServer 和注册工具，注册工具按照MCP官网定义方式即可。'
    ],
    guide: {
      code: `
<html>
  <head>
    <script src="https://unpkg.com/@opentiny/next-sdk@0.1/dist/webmcp-full.js"></script>
  </head>
  <body>
    <script>
      ;(async () => {
        const { WebMcpServer, createMessageChannelPairTransport, z, WebMcpClient } = WebMCP

        const [serverTransport, clientTransport] = createMessageChannelPairTransport()
        const server = new WebMcpServer()

        server.registerTool(
          'demo-tool',
          {
            title: '演示工具',
            description: '一个简单工具',
            inputSchema: { foo: z.string() }
          },
          async (params) => {
            console.log('工具接收的参数:', params)
            return { content: [{ type: 'text', text: \`收到: \${params.foo}\` }] }
          }
        )

        await server.connect(serverTransport)
      })()
    </script>
  </body>
</html>
`,
      title: '创建 Web 端 MCPServer'
    }
  },
  {
    title: '步骤3',
    subTitle: '创建 Web 端 MCPClient',
    shortTitle: '创建',
    descriptions: ['使用 NEXT-SDKs 提供的 WebMcpClient, 快速定义 ClientMCP。'],
    guide: {
      code: `
<html>
  <head>
    <script src="https://unpkg.com/@opentiny/next-sdk@0.1/dist/webmcp-full.js"></script>
  </head>
  <body>
    <script>
      ;(async () => {
        const { WebMcpServer, createMessageChannelPairTransport, z, WebMcpClient } = WebMCP

        const [serverTransport, clientTransport] = createMessageChannelPairTransport()
        const server = new WebMcpServer()

        server.registerTool(
          'demo-tool',
          {
            title: '演示工具',
            description: '一个简单工具',
            inputSchema: { foo: z.string() }
          },
          async (params) => {
            console.log('工具接收的参数:', params)
            return { content: [{ type: 'text', text: \`收到: \${params.foo}\` }] }
          }
        )

        await server.connect(serverTransport)

        const client = new WebMcpClient()
        await client.connect(clientTransport)
      })()
    </script>
  </body>
</html>
      `,
      title: '创建 Web 端 MCPClient'
    }
  },
  {
    title: '步骤4',
    subTitle: '在 Web 端调用 WebMCP',
    shortTitle: '调用',
    descriptions: ['连接并调用 WebMCP 工具，控制台打印就可以看到调用成功啦。​'],
    guide: {
      code: `
<html>
  <head>
    <script src="https://unpkg.com/@opentiny/next-sdk@0.1/dist/webmcp-full.js"></script>
  </head>
  <body>
    <script>
      ;(async () => {
        const { WebMcpServer, createMessageChannelPairTransport, z, WebMcpClient } = WebMCP

        const [serverTransport, clientTransport] = createMessageChannelPairTransport()
        const server = new WebMcpServer()

        server.registerTool(
          'demo-tool',
          {
            title: '演示工具',
            description: '一个简单工具',
            inputSchema: { foo: z.string() }
          },
          async (params) => {
            console.log('工具接收的参数:', params)
            return { content: [{ type: 'text', text: \`收到: \${params.foo}\` }] }
          }
        )

        await server.connect(serverTransport)

        const client = new WebMcpClient()
        await client.connect(clientTransport)

        const { sessionId } = await client.connect({
          agent: true,
          url: 'https://agent.opentiny.design/api/v1/webmcp-trial/mcp'
        })

        console.log('连接成功，会话ID:', sessionId)

        const toolResult = await client.callTool('demo-tool', { foo: '测试参数' })
        console.log('工具调用结果:', toolResult)
      })()
    </script>
  </body>
</html>
      `,
      title: '在 Web 端调用 WebMCP'
    }
  }
]
