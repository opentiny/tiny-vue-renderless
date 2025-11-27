# TinyEngine 简介

 ## 我们是什么？

- 我们是一款面向多种角色，多种技术栈，具备强大定制扩展能力的可视化设计器研发框架！
- 我们是提供用户搭建属于自己的个性化设计器！

 ## 我们能做什么？

- 可视化页面搭建，通过简单的拖拽就可以完成应用页面开发，提高开发效率
- 权限、角色设置标准化和业务化，通过策略规则配置来将数据、操作的权限进行精细化管理
- 与传统的低代码或者零代码设计器不同，我们支持高低代码混合开发，比如调用高代码封装的方法
- 与传统的不同，我支持创建可交互可复用的区块
- 创建的设计器不仅可以在浏览器使用，还可以打包成插件在VSCode中使用



## 快速开始

### 线上 demo 体验

您可以直接访问[首页](portal-only-prefix/team-home)的前往体验按钮，或者点击[该链接](
md-only-prefix/tiny-engine-editor/index.html)直接访问 demo，即可快速体验 TinyEngine 设计器

### 通过创建应用访问

假如您已经成为我们的组织，您可以通过创建应用 &rarr; 访问应用的方式进入 TinyEngine 设计器




# 一、面板简介

> 如下图，整个设计器主要分为 `工具栏`，`插件栏`，`属性面板`，`中心画布`四大模块。

<img src="http://image.opentiny.design/tiny-lts/v1/images/eaa0698c676786f16b47fa60b1bf8813_1897x935.png"  width="1400"/>

## 1、工具栏模块

工具栏模块位于页面顶部，主要包含 页面大小切换、清除屏幕、保存、预览、撤销、恢复、全屏以及页面锁等功能

<img src="http://image.opentiny.design/tiny-lts/v1/images/682cea034b0bc28288195efefe1a57f8_1366x175.png"  width="1400"/>

## 2、插件栏模块

> 插件栏模块主要包括 物料面板、大纲树、页面管理、区块管理、数据源管理、资源管理、国际化管理、页面JS、状态管理、页面Schema等插件面板。

### 物料面板

> `物料`，顾名思义就是我们拖拽生成一个页面所需要用到的所有基本材料，分为 `组件` 和 `区块` 。我们可以拖拽物料面板上的组件或区块到中心画布上，灵活地排布出想要的页面

<img src="http://image.opentiny.design/tiny-lts/v1/images/59603f8645b08cb64cb2f8b91c983bc0_1917x879.png"  width="1400"/>

### 大纲树面板

大纲树是当前画布元素（组件/区块）的 Dom 树结构目录。大纲树的功能特点：

- 大纲树与画布同步高亮选中的元素（图-1，图-2）
- 可设置元素的显示隐藏 （图-3）
- 根节点元素，默认为 body （图-4）

<img src="http://image.opentiny.design/tiny-lts/v1/images/f4991ae44d2206760de66f7b27d3465f_1904x931.png"  width="1400"/>

### 页面管理面板

页面管理是对当前应用下的所有页面的统一管理，涉及每个页面或者文件夹的增删改查。主要的功能有：新建页面、新增文件夹、页面分组、页面搜索、对页面或文件夹的配置



**其他更多面板的更详细介绍，请移步面板详解模块的相关文档**

## 3. 属性面板模块

> 左边插件栏模块中主要是应用级别的一些设置与操作，右边的属性面板设置则是针对选中后的单个组件的配置，包括组件的文字内容设置、样式设置、高级渲染设置以及变量的绑定等等，都会通过属性面板来完成。

## 4. 画布中心模块

> 画布中心位于整个设计器的中央，是可视化开发的的核心。我们在物料面板拖入组件或区块，即可看到渲染出来的效果，在右侧属性面板更改属性面板之后，也可以立即看到更改之后的效果。这种所见即所得的开发方式，在一些垂直领域上，能够极大的提升开发效率。



# 二、使用简介

> 主要介绍从新建页面到拖入组件搭建页面再到预览页面的简要流程。

## 1. 新建页面/选择可用页面

> 体验 demo 时，我们可以自由新建页面或者选择当前可用页面进行开发。

- 打开页面管理，从列表中选择没有锁的页面

![](http://image.opentiny.design/tiny-lts/v1/images/ec8704888eedfa2d5b541bb6ff124115_1821x1126.gif)

- 假如列表中每一项都有锁，我们也可以选择新建页面

![新建页面](http://image.opentiny.design/tiny-lts/v1/images/561cd63f7be86e4ac65b6bada03456f4_1821x1126.gif)

- 点击需要编辑的页面，然后给页面加锁，我们就可以开始编辑了

![](http://image.opentiny.design/tiny-lts/v1/images/466d767448650558f7a0e0263894bd62_1821x1126.gif)

## 2. 拖入组件或区块

>  打开左侧物料面板，选择需要的组件或者区块，拖入画布。

![拖入组件](http://image.opentiny.design/tiny-lts/v1/images/eacc1295d0d6d8eb247d823d8aaa01e2_1821x1126.gif)

## 3. 更改组件的属性或样式

> 在画布中选中需要更改属性的组件，即可在右侧面板更改组件相关配置与属性。

![修改组件属性与样式](http://image.opentiny.design/tiny-lts/v1/images/40da9fce7a73b3730fefb484c036781a_1821x1126.gif)

## 4. 页面保存与预览

> 点击工具栏的保存页面按钮，再点击预览按钮，就可以预览我们搭建出来的页面啦！

![页面保存与预览](http://image.opentiny.design/tiny-lts/v1/images/edecb4e7a5b491854eaeb76ec2023653_1821x1126.gif)

# 三、常见问题

#### 1、内置组件库的属性配置与使用

还想了解更多的属性配置？可以<a style="color: #00AEEF;" href="https://opentiny.design/tiny-vue/zh-CN/os-theme/components/envpreparation"  target="_blank">前往内置组件库TinyVue</a>

#### 2、还没有设计器怎么办？

- 可以 <a style="color: #00AEEF;" href="md-only-prefix/tiny-engine-editor/index.html"  target="_blank">前往体验设计器</a>

- 也可以 <a style="color: #00AEEF;" href="portal-only-prefix/home/create"  target="_blank">前往体验定制设计器</a> 

#### 3、怎么设置for循环一个元素？

- 选中要循环的元素>>
- 点击**属性面板高级**（图-1）>>
- 设置一个可枚举的变量（图-3） >>
- 循环数据就会显示绑定的变量（图-2）>>
- 再设置迭代的变量名（图-4）>>
- 设置迭代的索引（图-5）>>
- 设置迭代的Key（图-6）,key是用来给每个元素设置上唯一的标识

<img src="http://image.opentiny.design/tiny-lts/v1/images/05d3c3ee00f994582421cecaca458a0b_1905x933.png"  width="600"/>

