<h1 id='plugin'>云服务插件</h1>

---

云服务插件是基于华为云服务API提供的命令行管理工具，您可以通过此工具管理和使用您的各类云服务资源。

<h2 id='support'>支持的云服务</h2>

- [对象存储服务 OBS](/ng-pro/docs/advanced/hwcPlugin#obs)

- [虚拟私有云服务 VPC](/ng-pro/docs/advanced/hwcPlugin#private)

- [弹性公网IP服务 EIP](/ng-pro/docs/advanced/hwcPlugin#EIP)

- [云数据库服务 RDS](/ng-pro/docs/advanced/hwcPlugin#RDS)

- [函数工作流服务 FunctionGraph](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)

- [API网关服务 APIG](/ng-pro/docs/advanced/hwcPlugin#APIG)

<h2 id='work'>准备工作</h2>

<h3 id='login'>1. 注册华为帐号并开通华为云</h3>

请参考<a href="https://support.huaweicloud.com/usermanual-account/account_id_001.html" target="_blank" rel="noopener noreferrer">注册华为帐号并开通华为云</a>。

<h3 id='name'>2. 登录华为云并完成实名认证</h3>

请参考<a href="https://support.huaweicloud.com/usermanual-account/account_id_004.html" target="_blank" rel="noopener noreferrer">登录华为云</a>。

请参考<a href="https://support.huaweicloud.com/usermanual-account/account_auth_00001.html" target="_blank" rel="noopener noreferrer">实名认证</a>。

<h3 id='select'>3. 创建IAM用户并给IAM用户授权（可选）</h3>

统一身份认证服务IAM请参考<a href="https://support.huaweicloud.com/productdesc-iam/iam_01_0026.html" target="_blank" rel="noopener noreferrer">什么是IAM</a>。

请参考<a href="https://support.huaweicloud.com/usermanual-iam/iam_02_0001.html" target="_blank" rel="noopener noreferrer">创建IAM用户</a>。

请参考<a href="https://support.huaweicloud.com/usermanual-iam/iam_01_0652.html" target="_blank" rel="noopener noreferrer">给IAM用户授权</a>。

<h3 id='get'>4. 获取访问密钥（AK/SK）</h3>

使用云服务插件管理和使用您的各类云服务资源时，需提供调用者的身份信息用于认证鉴权。为完成初始化配置，您可<a href="https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解关于访问密钥（永久AK/SK）的信息和获取访问密钥的方法。

<h3 id='tool'>5. 安装华为云命令行工具服务（Koo Command Line Interface，KooCLI）</h3>）

云服务插件透传了部分KooCLI的能力，您可<a href="https://support.huaweicloud.com/productdesc-hcli/hcli_01.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是KooCLI。

您可<a href="https://support.huaweicloud.com/qs-hcli/hcli_02_003.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解如何安装KooCLI。

<h3 id='http'>6. 配置 HTTP 代理（可选）</h3>  
   
使用云服务插件管理和使用您的各类云服务资源时，可能会因为用户所在公司的内网访问限制，导致调用云服务API失败。此时，用户可使用HTTP代理访问，使用HTTP代理需要配置环境变量
`http_proxy`和`https_proxy`。

#### Windows环境配置`http_proxy`和`https_proxy`环境变量。

```bash
set http_proxy=http://username:password@proxyServer:port
set https_proxy=https://username:password@proxyServer:port
```

> 请在当前目录执行以上命令，proxyServer为代理服务器的域名（如果能解析）或者IP。port为端口号。如果您的代理服务器需要用户名和密码才能访问，需要填写上面的username和password部分，否则的话，请省略这两部分，如下：

```bash
set http_proxy=http://proxyServer:port
set https_proxy=https://proxyServer:port
```

此外，也可在`控制面板`->`系统`->`高级系统设置`->`环境变量`中添加全局配置`http_proxy`和`https_proxy`。

<h3 id='cli'>7. 安装TinyCLI</h3>

`TinyCLI`是一个跨平台的前端工程化cli工具，为开发者提供一系列开发套件及工程插件，覆盖前端开发的整个链路， 保证团队开发过程的一致性和可复制性。您可<a href="/tiny-cli/docs/use-install" target="_blank" rel="noopener noreferrer">点击此处</a>获取`TinyCLI`如何安装。

> 云服务插件是基于`TinyCLI`扩展的插件。

<h2 id='make'>安装</h2>

```bash
tiny hwc
```

> 执行该命令，`TinyCLI`会检查您的电脑有没有安装插件，如果没有安装，开始安装插件，安装成功后，会列出插件支持的所有云服务，更多[请参考](/ng-pro/docs/advanced/hwcPlugin#cloudbu)。

<h2 id='list'>命令列表</h2>

- [tiny hwc](/ng-pro/docs/advanced/hwcPlugin#cloudbu)

- [tiny hwc configure](/ng-pro/docs/advanced/hwcPlugin#configure)

- [tiny hwc obs](/ng-pro/docs/advanced/hwcPlugin#obs)

- [tiny hwc vpc](/ng-pro/docs/advanced/hwcPlugin#private)

- [tiny hwc eip](/ng-pro/docs/advanced/hwcPlugin#EIP)

- [tiny hwc mysql](/ng-pro/docs/advanced/hwcPlugin#RDS)

- [tiny hwc fg](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)

- [tiny hwc apig](/ng-pro/docs/advanced/hwcPlugin#APIG)

<h3 id="configure">1. <span>插件初始化</span></h3>

```bash
> tiny hwc configure
----------开始初始化配置, 其中"Secret Access Key"输入内容匿名化处理, 请按下面提示进行操作----------

? 请输入Access Key ID： 560*************43FQ
? 请输入Secret Access Key：
? 请选择Region： 华南-广州(cn-south-1)
? 请选择项目ID： (此处选择你要使用的项目ID)
2022-xx-xx xx:xx:xx [tiny-plugin-hwc-configure]: 配置成功！
```

命令执行完会在当前目录生成`hwc-exports.json`文件和`hwc`目录，用于存放初始化信息。

> 初始化命令用于将永久<a href="https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html" target="_blank" rel="noopener noreferrer">AK/SK</a>、<a href="https://support.huaweicloud.com/iam_faq/iam_01_0011.html" target="_blank" rel="noopener noreferrer">区域</a>信息和<a href="https://support.huaweicloud.com/api-iam/iam_17_0002.html" target="_blank" rel="noopener noreferrer">projectID</a>存储在配置文件和目录中，避免执行操作时频繁输入这些固定信息。

### 2. <span id="cloudbu">云服务列表</span>

```bash
> tiny hwc
? 请选择云服务 (Use arrow keys)
> 函数工作流 FunctionGraph
  云数据库 RDS
  对象存储服务 Obs
  虚拟私有云 Vpc
  API网关 APIG
  弹性公网IP Eip
```

<h3 id='obs'>3. 对象存储服务 OBS</h3>

对象存储服务（Object Storage Service，OBS）是一个基于对象的海量存储服务，为客户提供海量、安全、高可靠、低成本的数据存储能力。您可<a href="https://support.huaweicloud.com/productdesc-obs/zh-cn_topic_0045829060.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是对象存储服务。

<h4 id='order'>命令列表</h4>

- tiny hwc obs add

- tiny hwc obs create

<h4 id='step'>同步华为云OBS资源命令</h4>

```bash
> tiny hwc obs add
--------------------开始同步线上桶--------------------
```

| 序号 | 名称     |  序号 | 名称    |  区域位置    |
| ---- | ------- |  ------- |  ------- |  ------- |
| 1    | obs_001 |  标准存储  |  3.0    |  cn-south-1  |
| 2    | obs_002 |  标准存储  |  3.0    |  cn-south-1  |

<h4 id='commanded'>创建华为云OBS资源命令</h4>

```bash
> tiny hwc obs create
--------------------开始创建桶, 请按下面提示进行操作--------------------

? 请输入桶名称（长度3-63，数字或字母开头，支持小写字母、数字、“-”、“.”。禁止使用类IP地址；禁止以“-”或“.”开头及
结尾；
禁止两个“.”相邻，如：“my..bucket”；
禁止“.”和“-”相邻，如：“my-.bucket”和“my.-bucket”）： obs-0012022-xx-xx xx:xx:xx [aio-plugin-hwc-obs]: 创
建桶成功！

```

<h3 id='private'>4. 虚拟私有云服务 VPC</h3>

虚拟私有云（Virtual Private Cloud，以下简称VPC）为云数据库构建隔离的、用户自主配置和管理的虚拟网络环境，提升用户云上资源的安全性，简化用户的网络部署。您可<a href="https://support.huaweicloud.com/productdesc-vpc/zh-cn_topic_0013748729.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是虚拟私有云。

#### 命令列表

- tiny hwc vpc add

- tiny hwc vpc create

#### 同步华为云VPC资源命令

```bash
> tiny hwc vpc add
--------------------开始同步线上虚拟私有云--------------------
```

| 序号 | 名称    | IPv4 网段      |
| ---- | ------- | -------------- |
| 1    | vpc_001 | 192.168.0.0/18 |
| 2    | vpc_002 | 192.168.0.0/18 |

#### 创建华为云VPC资源命令

```bash
> tiny hwc vpc create
--------------------开始创建虚拟私有云, 请按下面提示进行操作--------------------

? 请输入虚拟私有云名称（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点），并且同一下的
  名称不能重复）: vpc-test1
? 请选择虚拟私有云下可用子网的范围： 10.0.0.0/8-24
? 请输入网段的掩码（取值范围：8-24）： 8
2022-xx-xx xx:xx:xx [aio-plugin-hwc-vpc]: 虚拟私有云创建成功！
? 请输入子网名称（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点））: subnet-test1
? 请输入子网网段的掩码（取值范围：8-28）： 28
2022-xx-xx xx:xx:xx [aio-plugin-hwc-vpc]: 子网创建成功！
```

<h3 id='EIP'>5. 弹性公网IP EIP</h3>

弹性公网IP（Elastic IP，简称EIP）提供独立的公网IP资源，包括公网IP地址与公网出口带宽服务。可以与弹性云服务器、裸金属服务器、虚拟IP、弹性负载均衡、NAT网关等资源灵活地绑定及解绑。您可<a href="https://support.huaweicloud.com/productdesc-eip/overview_0001.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是弹性公网IP。

#### 命令列表

- tiny hwc eip add

- tiny hwc eip create

#### 同步华为云EIP资源命令

```bash
> tiny hwc eip add
--------------------开始同步线上数据库实例--------------------
```

| 序号 | 名称    | 弹性公网 IP 地址 | 带宽名称      | 带宽大小 |
| ---- | ------- | ---------------- | ------------- | -------- |
| 1    | eip_001 | 116.63.63.63     | bandwidth_001 | 5 Mbit/s |
| 2    | eip_002 | 116.63.63.64     | bandwidth_002 | 5 Mbit/s |

#### 创建华为云EIP资源命令

```bash
> tiny hwc eip create
--------------------开始创建弹性公网IP, 请按下面提示进行操作--------------------

? 请输入弹性公网IP名称 eip_001
? 请选择弹性公网IP线路类型 全动态BGP
? 请选择弹性公网IP版本 ipv4
? 请选择付费模式 按需付费
? 请选择带宽类型 独占带宽
? 请输入带宽名称 bandwidth_001
? 请输入带宽大小 1
2022-xx-xx xx:xx:xx [aio-plugin-hwc-eip]: 创建弹性公网IP成功
```

<h3 id='RDS'>6. 云数据库 RDS</h3>

云数据库RDS（Relational Database Service，简称RDS）是一种基于云计算平台的稳定可靠、弹性伸缩、便捷管理的在线云数据库服务。您可<a href="https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是云数据库RDS。

#### 命令列表

- tiny hwc mysql add

- tiny hwc mysql create

- tiny hwc mysql eip

#### 同步华为云RDS资源命令

```bash
> tiny hwc mysql add
--------------------开始同步线上数据库实例--------------------
```

| 序号 | 名称      | 数据库    |
| ---- | --------- | --------- |
| 1    | mysql_001 | MySQL 8.0 |
| 2    | mysql_002 | MySQL 8.0 |

#### 创建华为云RDS资源命令

```bash
> tiny hwc mysql create
--------------------开始创建数据库实例, 请按下面提示进行操作-------------------------

? 请选择数据库版本 8.0
? 请选择数据库实例类型 主备
? 请选择备机同步参数 异步
? 请输入实例名称 mysql_001
? 请选择性能规格 通用型 2vCPUs 8GB
? 请选择磁盘类型 SSD云盘
? 请输入磁盘大小 40
? 请选择主可用区 可用区二
? 请选择备可用区 可用区二
? 请输入端口号 3306
? 是否关联已有虚拟私有云？ Yes
? 请选择私有云 vpc-default
? 请选择子网 subnet-default
? 请选择安全组 default
? 请选择计费模式 包年/包月
? 请选择 包年
? 请选择包年时长 1年
? 是否自动续费? Yes
2022-xx-xx xx:xx:xx [aio-plugin-hwc-mysql]: 创建数据库实例成功
```

#### RDS资源绑定/解绑EIP资源命令

```bash
> tiny hwc mysql eip
--------------------开始为数据库实例绑定/解绑EIP, 请按下面提示进行操作--------------------

? 请选择数据库 mysql-001
? 是否关联已有弹性IP？ Yes
? 请选择弹性IP eip_001
2022-xx-xx xx:xx:xx [aio-plugin-hwc-mysql]: 数据库实例绑定EIP成功
```

> 实例在创建、变更规格、恢复、重启或冻结状态下不能绑定和解绑弹性公网IP。

<h3 id='FunctionGraph'>7. 函数工作流 FunctionGraph</h3>

FunctionGraph是一项基于事件驱动的函数托管计算服务。使用FunctionGraph函数，只需编写业务函数代码并设置运行的条件，无需配置和管理服务器等基础设施，函数以弹性、免运维、高可靠的方式运行。您可<a href="https://support.huaweicloud.com/productdesc-functiongraph/functiongraph_01_0100.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是FunctionGraph。

#### 命令列表

- tiny hwc fg add

- tiny hwc fg create

- tiny hwc fg update

- tiny hwc fg dep

#### 同步华为云FunctionGraph资源命令

```bash
> tiny hwc fg add
--------------------开始同步线上函数工作流--------------------
```

| 序号 | 名称         | 运行时        |
| ---- | ------------ | ------------- |
| 1    | function_001 | Node.js14.18  |
| 2    | function_002 | 1Node.js14.18 |

#### 创建华为云FunctionGraph资源命令

```bash
> tiny hwc fg create
--------------------开始创建函数工作流, 请按下面提示进行操作--------------------

? 请输入函数名称 fg_001
? 请选择版本 FunctionGraph v2
? 请选择执行环境 Node.js14.18
? 请选择运行内存 256Mb
? 请输入超时时间 300
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 创建函数工作流成功
```

#### 更新华为云FunctionGraph资源命令，支持更新代码和依赖

```bash
> tiny hwc fg update
--------------------开始更新函数工作流--------------------

? 请选择需要更新的函数 fg_001
? 请输入本地代码的目录 cloudfunctions
? 请选择依赖包
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 更新函数工作流成功
```

> 更新命令支持压缩后体积小于600Kb的本地代码上传。如需要上传超大函数代码时，请登录华为云的函数工作流服务的控制台上传！

#### 创建/更新华为云FuncitonGraph资源依赖包命令

```bash
> tiny hwc fg dep
--------------------开始创建/更新函数工作流依赖包--------------------

? 请选择 创建依赖包
? 请输入依赖包名称 dep_01
? 请选择执行环境 Node.js14.18
? 请输入本地依赖目录 cloudfunctions/deps
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: 创建函数工作流依赖包成功
```

> 依赖包的本地代码压缩后小于600Kb的代码上传。如需要上传超大依赖代码时，请登录华为云的函数工作流服务的控制台上传！

<h3 id='APIG'>8. API网关 APIG</h3>

API网关（API Gateway）提供高性能、高可用、高安全的API托管服务，能快速将企业服务能力包装成标准API服务，帮助您轻松构建、管理和部署任意规模的API，并上架API云商店进行售卖。您可<a href="https://support.huaweicloud.com/productdesc-apig/apig_0080101651.html" target="_blank" rel="noopener noreferrer">点击此处</a>了解什么是API网关。

> 使用API网关服务需要先<a href="https://support.huaweicloud.com/usermanual-apig/apig_03_0037.html" target="_blank" rel="noopener noreferrer">购买专享版实例</a>。

#### 命令列表

- tiny hwc apig group add

- tiny hwc apig group create

- tiny hwc apig add

- tiny hwc apig create

- tiny hwc apig publish

#### 同步华为云APIG资源分组命令，APIG资源必须选择一个分组

```bash
> tiny hwc apig group add
--------------------开始同步线上API网关分组--------------------
```

| 序号 | 名称           |
| ---- | -------------- |
| 1    | apig_group_001 |
| 2    | apig_group_002 |

#### 创建华为云APIG资源分组命令

```bash
> tiny hwc apig group create
--------------------开始创建API网关分组，请按下面提示进行操作--------------------

? 请输入分组的名称（长度3-255，以英文、汉字和数字开头，支持汉字、英文、数字、中划线、下划线、点、斜杠、中
英文格式下的小括号和冒号、中文格式下的顿号）： apig-group-test
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: 创建API网关分组成功
请为分组 apig-group-test 绑定独立域名来开放服务，也可以使用调试域名 
a5d36433103345869d0492e032789bcf.apic.cn-south-1.huaweicloudapis.com 
进行开发调试，每天最多访问1000次。
? 是否绑定独立域名？ No
```

#### 同步华为云APIG资源命令

```bash
> tiny hwc apig add
--------------------开始同步线上API列表--------------------
```

| 序号 | 名称     | 请求方法 | 路径 | 所属分组       |
| ---- | -------- | -------- | ---- | -------------- |
| 1    | apig_001 | GET      | /xx  | apig_group_001 |
| 2    | apig_002 | GET      | /xx  | apig_group_002 |

#### 创建华为云APIG资源命令

```bash
> tiny hwc apig create
--------------------开始创建API网关, 请按下面提示进行操作--------------------

? 当前 Region 下有 xx 个API网关分组，是否关联已有API网关分组（输入 n 进入新建API网关分组流程）？ Yes
? 请选择分组 DEFAULT
? 请输入API名称 apig_001
? 请选择类型 公有API
? 请选择请求协议 HTTPS
? 请选择匹配模式 绝对匹配
? 请输入请求路径 /
? 请选择请求方式 GET
? 是否支持跨域？ Yes
? 请选择认证方式 IAM认证
? 请选择一个函数工作流中的函数做后端服务 fg_group
? 请选择函数的调用类型 同步
? 请输入后端函数超时 5000
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: 创建API网关成功
```

#### 发布华为云APIG资源命令

```bash
> tiny hwc apig publish
--------------------开始发布API，请按下面提示进行操作--------------------

? 请选择需要发布的API： apig_001
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: 已发布API apig_001 到 RELEASE 环境上。
```

> 仅发布到`RELEASE`环境上，如需发布其它环境，请登录华为云控制台操作。

<h2 id='Common'>常见问题</h2>

<a href="https://apierrorcenter.developer.intl.huaweicloud.com/apierrorcenter?keyword=&product=" target="_blank" rel="noopener noreferrer">错误码描述</a>