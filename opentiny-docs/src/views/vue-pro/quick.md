<h1 id='quick'>快速开始</h1>

---

快速开始演示一个简单的`hello world`应用。

<h2 id='background'>背景知识</h2>

- 了解并使用过常见的云服务！
- 具有一定的 `Node.js` 开发经验！
- 有前端开发经验！

<h2 id='work'>准备工作</h2>

快速开始基于`云服务插件`，请移步`云服务插件`[`准备工作`](/vue-pro/docs/advanced/plugin#work)章节。

<h2 id='chart'>流程图</h2>

![start.png](/src/assets/images/vue-pro/quick.png)

<h2 id='step'>步骤</h2>

<h3 id='create'>1. 创建应用</h3>

推荐使用[`TinyCLI`](/tiny-cli/home)开发工具来初始化一个Vue应用。

```bash
tiny init pro
```

配置项目名称、项目描述、技术栈（选择"**vue**"）
```
 ? 请输入项目名称： 
 ? 请输入项目描述： (基于TinyPro套件创建的中后台系统)
 ? 请选择你希望使用的技术栈： (Use arrow keys)
 > vue
   angular
```

<h3 id='install'>2. 安装<a href="/vue-pro/docs/advanced/plugin">云服务插件</a>并初始化</h3>

上一步创建了一个Angular应用，接下来要做的是通过`云服务插件`，创建应用的后端服务。

```bash
tiny hwc configure
```

> [`点击此处`](/vue-pro/docs/advanced/plugin#configure)了解更多插件初始化。


<h3 id='library'>3. 安装<a href="/vue-pro/docs/advanced/library">云服务客户端库</a>并初始化</h3>

`云服务客户端库`提供了一套强大的Lib库，这个Lib库屏蔽了繁琐的云服务对接，降低了前端开发人员和后端的对接门槛。

```bash
> npm i @opentiny/hwc-client
```

推荐在应用入口文件`main.ts`，添加`云服务客户端库`配置。

```typescript
import { HwcClient } from '@opentiny/hwc-client';
import config from '../hwc-exports.json';

HwcClient.configure({
  ...config.hwcConfig,
});
```

<h3 id='flow'>4. 创建函数工作流实例</h3>

创建函数工作流实例涉及到创建[`FunctionGraph`](/vue-pro/docs/advanced/plugin#FunctionGraph)实例、编写函数代码和关联函数代码。

<h4 id='case'>4.1 创建<a href="/vue-pro/docs/advanced/plugin#FunctionGraph">FunctionGraph</a>实例</h4>

```bash
> tiny hwc fg create
--------------------开始创建函数工作流, 请按下面提示进行操作--------------------

? 请输入函数名称 fg_hello_world
? 请选择版本 FunctionGraph v2
? 请选择执行环境 Node.js14.18
? 请选择运行内存 256Mb
? 请输入超时时间 300
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 创建函数工作流成功
```

<h4 id='write'>4.2 编写函数代码</h4>

在当前目录创建`cloudfunctions`文件夹，新建文件`index.js`，添加如下代码

```js
exports.handler = async (event, context) => {
  const output = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    isBase64Encoded: false,
    body: 'Hello World From Huawei Cloud!',
  };
  return output;
};
```

<h4 id='association'>4.3 关联函数代码</h4>

```bash
> tiny hwc fg update
--------------------开始更新函数工作流--------------------

? 请选择需要更新的函数 fg_hello_world
? 请输入本地代码的目录 cloudfunctions/helloWorld
? 请选择依赖包
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 更新函数工作流成功
```

<h3 id='api'>5.创建API网关实例</h3>

```bash
> tiny hwc apig create
--------------------开始创建API网关, 请按下面提示进行操作--------------------

? 当前 Region 下有 xx 个API网关分组，是否关联已有API网关分组（输入 n 进入新建API网关分组流程）？ Yes
? 请选择分组 group_hello_world
? 请输入API名称 apig_hello_world
? 请选择类型 公有API
? 请选择请求协议 HTTPS
? 请选择匹配模式 绝对匹配
? 请输入请求路径 /hello-world
? 请选择请求方式 GET
? 是否支持跨域？ Yes
? 请选择认证方式 无认证
? 请选择一个函数工作流中的函数做后端服务 fg_hello_world
? 请选择函数的调用类型 同步
? 请输入后端函数超时 5000
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: 创建API网关成功
```

> 创建过程中，会让用户选择步骤4函数工作流实例。

<h3 id='hello'>6.页面调用API网关实例，展示hello world</h3>

```typescript
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { HwcClient } from '@opentiny/hwc-client';

  const text = ref();

  async function getData(): Promise<void> {
    const res = await HwcClient.apigClient.exec(
      'group_hello_world',
      'apig_hello_world',
      {}
    );

    text.value = await res?.text();
  }

  onMounted(getData);
</script>
```

> [`点击此处`](/vue-pro/docs/advanced/library#apigClient)，查看`exec`方法参数说明。


<h3 id='video-md'>视频帮助</h3>