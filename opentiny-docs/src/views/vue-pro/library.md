<h1 id='makecell'>云服务客户端库</h1>

---

云服务客户端库提供了一套强大的 Lib 库，这个 Lib 库屏蔽了繁琐的云服务对接，降低了前端开发人员和后端的对接门槛，Lib 库由华为云提供支持，并且建议将[云服务插件](./plugin)创建的新后端和现有后端资源一起使用。

云服务客户端库支持不同的框架和技术栈，包括不限于 React、Angular 和 Vue。

<h2 id='makeinterface'>云服务接口</h2>

- [OBS](/vue-pro/docs/advanced/library#obsClient)

- [APIG](/vue-pro/docs/advanced/library#apigClient)

<h3 id='makeword'>准备工作</h3>

<h3 id='setcloud'>1. 注册华为帐号并开通华为云</h3>

请参考<a href="https://support.huaweicloud.com/usermanual-account/account_id_001.html" target="_blank">注册华为帐号并开通华为云</a>。

<h3 id='setname'>2. 登录华为云并完成实名认证</h3>

请参考<a href="https://support.huaweicloud.com/usermanual-account/account_id_004.html" target="_blank">登录华为云</a>。

请参考<a href="https://support.huaweicloud.com/usermanual-account/account_auth_00001.html" target="_blank">实名认证</a>。


<h3 id='setplugin'>3. 安装和配置云服务插件</h3>


云服务插件可以在您的应用中创建华为云服务，您需要先安装和配置[`云服务插件`](/vue-pro/docs/advanced/plugin)。

<h3 id='intsall'>安装</h3>

安装云服务客户端库，请打开控制台终端窗口，并运行如下命令。

```bash
npm install @opentiny/hwc-client
```

<h3 id='object'>HwcClient 对象</h3>

<h3 id='properties'>属性</h3>

| 属性名                                    | 类型         | 说明                |
| ----------------------------------------- | ------------ | ------------------- |
| config                                    | HwcConfigure | 收集用户配置的对象  |
| [obsClient](/vue-pro/docs/advanced/library#obsClient)   | ObsClient    | OBS 对象存储客户端 |
| [apigClient](/vue-pro/docs/advanced/library#apigClient) | ApigClient   | APIG API 网关客户端 |


<h3 id='methods'>方法</h3>

| 方法名                                        | 类型                             | 说明                |
| --------------------------------------------- | -------------------------------- | ------------------- |
| [configure](/vue-pro/docs/advanced/library#HwcClient) | (config：HwcConfigure ) => void; | 配置`HwcClient`对象 |


<h3 id='HwcClient'>1. 配置HwcClient对象</h3>

在前端工程，找到工程入口文件，通常是`main.js`中，导入依赖包并调用`configure`方法。

```typescript
import { HwcClient } from '@opentiny/hwc-client';
import config from './hwc-exports.json'; // 此文件由云服务插件生成，需要在此导入

HwcClient.configure({
  ...config.hwcConfig,
});
```

<h3 id='obsClient'>2. obsClient</h3>

OBS 对象存储客户端，它内部集成了<a href="https://www.npmjs.com/package/esdk-obs-browserjs" target="_blank" rel="noopener noreferrer">esdk-obs-browserjs</a> SDK，因此该 SDK 的全部 API 都得予继承，<a href="https://support.huaweicloud.com/sdk-browserjs-devg-obs/obs_24_0113.html" target="_blank" rel="noopener noreferrer">点击此处</a>查询该 SDK 通用示例。

<h4>示例代码</h4>

```typescript
/**
 *
 * obs上传接口
 */

obsClient.putObject(
  {
    Bucket: 'bucketname',
    Key: 'objectname',
    Body: 'Hello OBS',
  },
  function (err, result) {
    // 异常信息不为空，表明接口调用异常
    if (err) {
      console.log('Error-->' + err);
    } else {
      // 异常信息为空，表明接口调用完成，应进一步判断HTTP状态码
      if (result.CommonMsg.Status < 300) {
        // 操作成功
        if (result.InterfaceResult) {
          // 处理操作成功后业务逻辑
        }
      } else {
        // 操作失败，获取详细异常信息
        console.log('Code-->' + result.CommonMsg.Code);
        console.log('Message-->' + result.CommonMsg.Message);
        console.log('HostId-->' + result.CommonMsg.HostId);
        console.log('RequestId-->' + result.CommonMsg.RequestId);
      }
    }
  }
);
```


<h3 id='apigClient'>3. apigClient</h3>
API 网关客户端，提供`exec`方法来调用华为云 API 网关实例，如何创建华为云 API 网关实例，请参考[`云服务插件`](/vue-pro/docs/advanced/plugin)。

```typescript
/**
 *
 * @param groupName 分组名称
 * @param name 网关实例名称
 * @param data API网关实例参数
 * @returns
 */
exec(groupName: string, name: string, data: ApigRequest) Promise<Response> {}
```

```typescript
interface ApigRequest {
  headers?: Record<string, string>;
  body?: any;
  query?: Record<string, string>;
  pathParams?: Record<string, string>;
}
```

<h4>示例代码</h4>

```typescript
const res = await HwcClient.apigClient.exec('DEFAULT', 'apig_001', {
  query: { name: 'user001' },
  body: JSON.stringify({ name: 'user001', desc: 'desc001' }),
});

const result = await res.json();
console.log('请求响应结果：', result);
```

> 前端直接访问华为云网关接口，通常会有跨域的问题，请参考[华为云文档](https://support.huaweicloud.com/usermanual-apig/apig_03_0011.html)，为网关分组添加一个允许跨域的 OPTIONS 网关。

