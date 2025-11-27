<h1 id='practiced'>云服务最佳实践</h1>

---

最佳实践通过演示一个典型的列表页，包含增删查改等基本的操作，向开发者展示`Serverless`这种流行的开发模式，它具有联动云上资源，弹性扩缩，按需付费，极速部署等特点。本文基于华为云的`云数据库`、`云函数工作流`、`云API网关`等服务，搭建一个简单的`华为云Serverless开发环境`。

<h2 id='backgroundknowledge'>背景知识</h2>

- 了解并使用过常见的云服务！
- 具有一定的 `Node.js` 开发经验！
- 有前端开发经验！

<h2 id='serverless'>基于华为云的 Serverless 开发模式</h2>

![practise-overview.png](/src/assets/images/ng-pro/practise-overview.png)

<h2 id='Preview'>效果预览</h2>

最佳实践通过演示典型的增删查改操作，让开发者熟悉`Serverless`开发模式，代码路径`src/app/pages/contracts`。
![ng-preview.png](/src/assets/images/ng-pro/ng-preview.png)

<h2 id='Preparations'>准备工作</h2>

最佳实践基于`云服务插件`，请移步`云服务插件`[准备工作](/ng-pro/docs/advanced/hwcPlugin#work)章节。

<h2 id='step'>步骤</h2>

<h3 id='createapp'>1. 创建应用</h3>

推荐使用<a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>开发工具来初始化一个 Angular 应用。

```bash
tiny init pro
```

配置项目名称、项目描述、技术栈（选择"**angular**"）
```
 ? 请输入项目名称： 
 ? 请输入项目描述： (基于TinyPro套件创建的中后台系统)
 ? 请选择你希望使用的技术栈： (Use arrow keys)
 > vue
   angular
```

<h3 id='installcloud'>2. 安装<a href="/ng-pro/docs/advanced/hwcPlugin">云服务插件</a>并初始化</h3>

上一步创建了一个 Angular 应用，接下来要做的是通过`云服务插件`，创建应用的后端服务。

```bash
tiny hwc configure
```

> [点击此处](/ng-pro/docs/advanced/hwcPlugin#configure)了解更多插件初始化。

<h3 id='installhwcClient'>3. 安装<a href="/ng-pro/docs/advanced/hwcClient">云服务客户端库</a>并初始化</h3>

`云服务客户端库`提供了一套强大的 Lib 库，这个 Lib 库屏蔽了繁琐的云服务对接，降低了前端开发人员和后端的对接门槛。

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

<h3 id='createcase'>4. 创建数据库实例</h3>

创建数据库实例涉及到[`RDS`](/ng-pro/docs/advanced/hwcPlugin#RDS)、[`VPC`](/ng-pro/docs/advanced/hwcPlugin#private) 和[`EIP`](/ng-pro/docs/advanced/hwcPlugin#EIP)三个云服务。

#### 4.1 创建[`VPC`](/ng-pro/docs/advanced/hwcPlugin#private)实例

```bash
> tiny hwc vpc create
```

> 在创建`RDS`实例时，需要关联`VPC`实例。

#### 4.2 创建安全组

> 通过创建安全组，可以将 VPC 中的云服务器划分成不同的安全域，以提升云服务器访问的安全性。  
> <a href="https://support.huaweicloud.com/usermanual-vpc/zh-cn_topic_0013748715.html" target="_blank" rel="noopener noreferrer">创建安全组</a>

#### 4.3 创建[`EIP`](/ng-pro/docs/advanced/hwcPlugin#EIP)实例

```bash
> tiny hwc eip create
```

> `RDS`实例创建成功后，需要关联`EIP`实例。

#### 4.4 创建[`RDS`](/ng-pro/docs/advanced/hwcPlugin#RDS)实例并关联[`EIP`](/ng-pro/docs/advanced/hwcPlugin#EIP)实例

```bash
> tiny hwc mysql create
```

> 创建实例的过程中，会询问数据库引擎类型，华为云`RDS`云服务支持`MySql`、`PostgreSQL`和`Microsoft SQL Server`三种引擎，最佳实践选择的是`MySql`。

#### 4.5 关联[`EIP`](/ng-pro/docs/advanced/hwcPlugin#EIP)实例

```bash
> tiny hwc mysql eip
```

#### 4.6 关联安全组

> 为了保障数据库的安全性和稳定性，在使用云数据库 RDS 实例之前，您需要设置安全组。<a href="https://support.huaweicloud.com/qs-rds/rds_02_0004.html" target="_blank" rel="noopener noreferrer">RDS 设置安全组</a>

#### 4.7 创建数据库

> 云数据库 RDS 实例创建成功后，您可根据业务需要，创建更多数据库。<a href="https://support.huaweicloud.com/usermanual-rds/rds_05_0019.html" target="_blank" rel="noopener noreferrer">创建数据库</a>

<h3 id='workcase'>5. 创建函数工作流实例</h3>

创建函数工作流实例涉及到创建[`FunctionGraph`](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)实例、函数<a href="https://support.huaweicloud.com/usermanual-functiongraph/functiongraph_01_0391.html" target="_blank" rel="noopener noreferrer">依赖包管理</a>、函数代码管理。

#### 5.1 创建[`FunctionGraph`](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)实例

```bash
> tiny hwc fg create
--------------------开始创建函数工作流, 请按下面提示进行操作--------------------

? 请输入函数名称 fg_contract
? 请选择版本 FunctionGraph v2
? 请选择执行环境 Node.js14.18
? 请选择运行内存 256Mb
? 请输入超时时间 300
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 创建函数工作流成功
```

> 除了上述 `EIP` + `安全组` 的方式，您也可以通过设置 `函数工作流的权限` + `VPC访问` 直接访问公网上的服务。  
> <a href="https://support.huaweicloud.com/usermanual-functiongraph/functiongraph_01_0920.html" target="_blank" rel="noopener noreferrer">设置权限访问函数工作流</a>  
> <a href="https://support.huaweicloud.com/usermanual-functiongraph/functiongraph_01_0222.html" target="_blank" rel="noopener noreferrer">设置 VPC 管理权限的委托</a>

#### 5.2 制作、上传和关联依赖包

##### 5.2.1 制作依赖包

在当前目录创建`cloudfunctions`文件夹，添加访问`MySql 数据库`的包依赖`mysql2`和`sequelize`，安装到`node_modules`文件夹中。

```bash
>  mkdir cloudfunctions
>  cd cloudfunctions
>  npm init -y
>  npm install mysql2 sequelize
```

> 华为云函数工作流服务支持 Node.js、Python、Java 和 Go 四种语言，最佳实践选的是 Nodejs，因此在制作依赖包的时候选择的是 npm。这里为什么要安装`MySql`数据库的依赖包，是因为在步骤 4`创建数据库实例`选择的是`MySql`引擎的数据库实例。

##### 5.2.2 上传依赖包

```bash
> tiny hwc fg dep
--------------------开始创建/更新函数工作流依赖包--------------------

? 请选择 创建依赖包
? 请输入依赖包名称 mysql2_sequelize
? 请选择执行环境 Node.js14.18
? 请输入本地依赖目录 cloudfunctions/node_modules
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 创建函数工作流依赖包成功
```

> 依赖包大小超 600k，接口限制只能通过控制台上传 <a href="https://support.huaweicloud.com/usermanual-functiongraph/functiongraph_01_0391.html" target="_blank" rel="noopener noreferrer">控制台上传依赖包</a>

##### 5.2.3 关联依赖包

```bash
> tiny hwc fg update
--------------------开始更新函数工作流--------------------

? 请选择需要更新的函数 fg_contract
? 请输入本地代码的目录
? 请选择依赖包
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 更新函数工作流成功
```

#### 5.3 编写和关联函数代码

##### 5.3.1 编写函数代码

示例代码演示了`MySql`数据库的的增删查改逻辑，[示例代码下载](/public/assets/sample-code/groupService.zip)，下载后请解压到命令执行目录。

##### 5.3.2 关联函数代码

```bash
> tiny hwc fg update
--------------------开始更新函数工作流--------------------

? 请选择需要更新的函数 fg_contract
? 请输入本地代码的目录 groupService
? 请选择依赖包
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 更新函数工作流成功
```

<h3 id='createapi'>6.创建 API 网关实例</h3>

创建 API 网关实例涉及到创建分组和创建[`APIG`](/ng-pro/docs/advanced/hwcPlugin#APIG)实例。

#### 6.1 创建 API 网关分组

```bash
> tiny hwc apig group create
```

#### 6.2 创建[`APIG`](/ng-pro/docs/advanced/hwcPlugin#APIG)实例

```bash
> tiny hwc apig create
--------------------开始创建API网关, 请按下面提示进行操作--------------------

? 当前 Region 下有 xx 个API网关分组，是否关联已有API网关分组（输入 n 进入新建API网关分组流程）？ Yes
? 请选择分组 DEFAULT
? 请输入API名称 apig_contract
? 请选择类型 公有API
? 请选择请求协议 HTTPS
? 请选择匹配模式 绝对匹配
? 请输入请求路径 /contract
? 请选择请求方式 POST
? 是否支持跨域？ Yes
? 请选择认证方式 无认证
? 请选择一个函数工作流中的函数做后端服务 fg_contract
? 请选择函数的调用类型 同步
? 请输入后端函数超时 5000
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: 创建API网关成功
```

> 创建过程中，用户可选择步骤 5 中创建的函数工作流实例。

 <h3 id='makecase'>7.页面调用API网关实例</h3>

请参考[效果预览](/ng-pro/docs/advanced/hwcPractice#Preview)章节，至此，最佳实践全部完成，开发者可以基于最佳实践，完善和扩展自身的应用。

<h3 id='video-md'>视频帮助</h3>
