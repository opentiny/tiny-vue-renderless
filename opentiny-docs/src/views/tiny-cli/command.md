
<h1 id='command'>基础命令详解</h1>

---
tiny-cli 提供了三类命令：
- tiny-cli 基础命令
- tiny-cli 套件固定命令
- tiny-cli 插件扩展命令  

<br/>

本文主要讲解 tiny-cli 提供的基础命令，[`tiny-cli 套件命令`](/tiny-cli/docs/guide/use-toolkit) 及 [`tiny-cli 插件命令`](/tiny-cli/docs/guide/use-plugin) 请跳转至对应的文档查看。

<h2 id='overview'>基础命令一览</h2>

可在终端输入`$ tiny -h` 查看tiny使用帮助

```bash
$ tiny

 tiny 使用帮助:  $ tiny [command] [options]

    $  tiny                     显示tiny帮助信息,若目录下有使用的套件,则会同时显示套件的帮助信息
    $  tiny init [toolkitName]  初始化套件
    $  tiny update [name]       更新tiny模块
    $  tiny list [type]         插件列表
    $  tiny i                   安装npm模块
    $  tiny mirror              切换npm源
    $  tiny switch              切换npm包安装方式，支持npm和cnpm
    $  tiny clear               清空 tiny 的本地缓存
    $  tiny config [type]       显示/设置.cnpmrc文件，类似npm config的用法
    $  tiny [name]              其他调用插件命令

   Options:

     -h, --help                显示tiny帮助信息
     -v, --version             显示tiny版本


 提示:
   套件 - 若想查看项目中所使用的套件帮助信息,请在项目根目录执行该命令.
   插件 - 若想查看插件的帮助信息,请使用 tiny [name] help 命令, eg : tiny git help
```

<h2 id='init'>tiny init [toolkitName]</h2>

初始化套件

```bash
$ tiny init [toolkitName]
```

其中`toolkitName`表示套件的名字。如Dev套件：[`@opentiny/tiny-toolkit-dev`](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md)，若要使用该套件可直接初始化：

```bash
$ tiny init dev
```

若你不记得套件的名称，也可以直接使用`$ tiny init` 命令，该命令会列出所有可用的套件。

```bash
$ tiny init dev
```

执行该命令后，会自动判断本地是否已安装了该套件，若已安装则直接初始化；若未安装，则自动在电脑中进行安装，安装完后再进行初始化操作。

#### 例子

```bash
# 创建一个叫toolkit-demo的空文件夹，并进入该文件夹
$ mkdir toolkit-demo && cd $_
# 初始化dev套件
$ tiny init dev
```

<h2 id='update'>tiny update [toolkitName]</h2>


更新tiny模块到最新版本


一般情况下不太需要用到该命令，因为tiny会自动检测套件和插件是否有更新。但tiny的检测是有缓存的，3小时内只检测一次，若套件在3小时内多次更新的话，则可以用该命令进行升级。

#### 例子

```bash
# 更新dev套件到最新版本
$ tiny update @opentiny/tiny-toolkit-dev

# 更新link插件到最新版本
$ tiny update @opentiny/tiny-plugin-link
```

<h2 id='list'>tiny list [type]</h2>


显示tiny可用的模块列表。


其中 `type` 值为 `toolkit` 和 `plugin`。

#### 例子

```bash
# 显示tiny所有模块
$ tiny list

************** toolkit/plugin list ******************

- 套件列表 

  @opentiny/tiny-toolkit-dev  -------  开发tiny-cli套件和插件
  @opentiny/tiny-toolkit-pro  -------  开箱即用的中后台前端/设计解决方案
  @opentiny/tiny-toolkit-docs -------  快速生成组件库官网的工具，支持`ng`和`vue`两种技术栈组件

- 插件列表 

  @opentiny/tiny-plugin-link  -------  快速调试本地node_modules中的依赖包
  @opentiny/tiny-plugin-hwc  --------  快速管理和访问华为云服务资源      
  @opentiny/tiny-plugin-lint --------  eslint+prettier代码规范及格式化插件

***************************************************

```

带参数则显示对应的套件和插件

```bash

# 显示tiny所有套件
$ tiny list toolkit

# 显示tiny所有插件
$ tiny list plugin
```

<h2 id='config'>tiny config</h2>


显示/设置.cnpmrc文件，类似npm config的用法


```bash
# 设置.cnpmrc 文件，写入registry
$ tiny config set registry xxxxxx

# 获取.cnpmrc 文件中registry的值
$ tiny config get registry

# 列出所有.cnpmrc文件配置
$ tiny config list

# 删除.cnpmrc文件中registry的配置
$ tiny config delete
```