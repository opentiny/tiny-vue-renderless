<h1 id='backend'>后台管理</h1>

配套 TinyPro of Vue 使用的后台框架，目前有```EggJs``` ```Spring Cloud``` 两种框架，使用 ```TinyCLI``` 套件初始化，开箱即用 

<h2 id='egg'>EggJs</h2>

Egg.js 是一个基于 Node.js 的企业级应用开发框架。它提供了一系列的插件和约定，例如路由管理、参数校验、模板引擎、数据库访问等，使得开发者可以更加高效地构建可扩展、可维护的应用程序

Egg.js 基于 Koa.js 开发，并在其基础上增加了许多功能和特性，使得开发大型项目变得更加简单

<h3 id='egg_prepare'>环境准备</h3>

* 操作系统：支持 macOS，Linux，Windows
* 运行环境：建议Node选择 [LTS版本](https://nodejs.org/zh-cn)，最低要求 14.x


<h3 id='egg_start'>开发环境启动</h3>

```
npm run dev
```


<h3 id='egg_build'>构建</h3>

[Egg构建部署指南](https://www.eggjs.org/zh-CN/core/deployment)


<h2 id='springcloud'>Spring Cloud</h2> 

采用Spring Cloud Huawei版本，Spring Cloud Huawei 是基于 Spring Cloud 架构的一个扩展和优化版本。它在 Spring Cloud 的基础上，提供了一些专门针对华为云环境的功能和特性。

Spring Cloud Huawei 支持 Apache ServiceComb and Nacos 作为服务注册发现中心和服务配置管理中心。

Spring Cloud Huawei 提供了大量开箱即用的服务治理能力，让开发者能够快速上手构建韧性、可靠的微服务应用。


<h3 id='spring_env'>环境准备</h3>

使用Spring Cloud Huawei，需要提前安装好JDK、IDE、Maven、CSE、配置好环境变量等  

<h4 id='java_install'>Java 安装</h4>

1. [下载JDK](https://www.oracle.com/java/technologies/downloads/)
2. [配置环境变量](https://www.runoob.com/java/java-environment-setup.html)  

<h4 id='IDE_install'>IDE安装</h4> 

建议安装使用 [IntelliJ IDEA](https://www.jetbrains.com/idea/)，内置Maven  
[下载链接](https://www.jetbrains.com/zh-cn/idea/download/)  

<h4 id='maven_install'>Maven安装</h4> 

tiny-toolkit-pro 套件中的 Spring Cloud 采用 Maven 构建项目和依赖管理  
1. [下载链接](https://maven.apache.org/download.cgi)
2. [环境配置](https://www.runoob.com/maven/maven-setup.html)  

<h4 id='cse_install'>微服务引擎</h4>   

有两种方式可供选择：
  
  * 通过下载安装本地简化版 CSE 搭建本地开发环境，下载链接：[CSE 2.0](https://support.huaweicloud.com/devg-cse/cse_devg_0036.html)，下载完成，一键启动cse.exe 
  
  * 使用[华为云微服务引擎(CSE)](https://support.huaweicloud.com/qs-cse/cse_qs_0002.html) 


<h3 id='spring_start'>开发环境启动</h3>

有三种方式启动

  * 直接使用IDEA一键启动所有服务（推荐）
  * 使用 ```mvn``` 命令
  ```
  // 进入对应目录下
  mvn spring-boot:run
  ```
  * 使用 ```java -jar ``` 命令  
  ```
  // 使用IDEA或者mvn进行打包
  mvn clean package

  // 进入对应 target 目录下
  java -jar packagename.jar
  ```

<h3 id='spring_build'>构建</h3>

[CSE部署微服务应用](https://support.huaweicloud.com/intl/zh-cn/devg-cse/cse_devg_0016.html)


<h2 id='database'>数据库</h2>

如果要对接服务端，请提前安装配置本地数据库服务或者云数据库服务，确保连接正常可用，可使用本地数据库或云数据库    

**本地数据库：**  本地数据库安装MySQL
- 查看本机操作系统，选择合适的安装包版本[下载MySQL](https://dev.mysql.com/downloads/)
- 安装完成MySQL软件
- 进行初始化配置，设置端口、用户、登录密码等，测试连接正常

详细安装教程可参考：[MySQL 安装](https://www.runoob.com/mysql/mysql-install.html)



**云数据库：** 云数据库推荐使用[华为云数据库RDS](https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html)
- 注册华为帐号并开通华为云
- 选择合适的计费模式购买并配置数据库实例
- 选择合适的连接模式进行连接  

具体开通过程请参考：[RDS for MySQL快速入门](https://support.huaweicloud.com/qs-rds/rds_02_0008.html)，也可使用TinyCLI云服务插件以命令行的方式开通创建，具体请参考：[TinyCLI 云服务插件](https://opentiny.design/vue-pro/docs/advanced/plugin)
