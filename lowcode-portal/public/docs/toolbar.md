# 工具栏介绍
<img src="http://image.opentiny.design/tiny-lts/v1/images/682cea034b0bc28288195efefe1a57f8_1366x175.png"  width="1400"/>

## Logo菜单
<img src="http://image.opentiny.design/tiny-lts/v1/images/ca70538574fb18647c544c9b14b60531_1916x934.png"  width="1400"/>

#### 页面管理

快捷打开页面管理面板

#### 区块管理

快捷打开区块管理面板

#### 前往设计器中心

快捷前往设计器中心

#### 前往物料中心

快捷前往物料中心
#### 应用保存

保存当前的整个应用数据到服务端，并记录此次保存的信息作为历史备份

<!-- #### 应用预览

应用预览，就是对当前的应用进行打包构建，生成一个临时的可预览的网页。

<img src="http://image.opentiny.design/tiny-lts/v1/images/2e0fcc3527792970f231f9a6edfcc8c5_1918x987.png"  width="600"/>

![预览](http://image.opentiny.design/tiny-lts/v1/images/c11a530b43cd50abe766f3cc26a12f14_1827x1190.gif)

构建过程界面图

> 注意：预览页面默认打开的是根路由对应的页面，如果没有配置根路由页面，则需要补全URL后面的路由，需要设置好应用的Home页面 -->

#### 应用发布

* 应用发布是什么？

 > 应用发布实际上就是生成当前整个应用的源代码，拉取Git仓库的代码，合并代码，然后上传到代码仓的过程。

* 应用发布的前期准备工作(**重要**)
  
1、首先，创建一个Git代码仓，用于提交设计器生成的应用源码。`注意，代码仓的成员一定要添加p开头的公共账号，如xxx,`,因为，发布应用提交代码的时候，实际上是以公共账号成员的身份去提交的。

<img src="http://image.opentiny.design/tiny-lts/v1/images/c095159a67a30eb96d30eae9510a78d7_1898x299.png"  width="1400"/>


2、*设计器管理员* 和 *应用管理员* 可以前往 我的应用，点击应用设置，`设置应用git仓库地址 和 默认提交分支`


 <img src="http://image.opentiny.design/tiny-lts/v1/images/808833e54213baa96ae95fb7fa735585_1669x934.png"  width="1400"/>

如图：设置应用git仓库地址 和 默认提交分支

<img src="http://image.opentiny.design/tiny-lts/v1/images/9d778723ff8dfc0de0cef50acd678934_1650x934.png"  width="1400"/>

3、做好以上准备，*应用管理员* 就可以点击开发应用，前往我们这个应用对应的设计器，开发完成后即可点击发布应用，即可上传我们的应用源码到仓库。

<img src="http://image.opentiny.design/tiny-lts/v1/images/2a7104f9c3e5f2f26ebb6d64c19a99df_1657x932.png"  width="1400"/>

4、部署

* 流水线部署参考文档：<a style="color: #00AEEF;" href="https://opentiny.design"  target="_blank">流水线文档</a>

## 页面大小切换
可以根据用户的需求去切换页面的大小  

![页面大小切换](http://image.opentiny.design/tiny-lts/v1/images/c341f1e95853c910fe7be58a50c55847_1472x1058.gif)

##  清除屏幕
可以清除当前画布的全部内容  

![清除屏幕](http://image.opentiny.design/tiny-lts/v1/images/1c6a8da3836c74f1c97c64e0a36841e5_1649x1097.gif)

##  保存

用户配好页面后点击保存可以把当前画布配置好的内容进行保存  

![保存](http://image.opentiny.design/tiny-lts/v1/images/cf160ba71ab8dc023e778ccf0a7e1f3f_1764x1132.gif)

##  预览
用户可以在浏览器预览当前画布的配置

## 撤销

用户可以回退至上一步操作  
## 恢复

用户撤销后可以恢复至下一步的操作  
## 全屏

可以提供全屏浏览  
## 锁 

A用户加锁可以锁定当前页面去开发，当加锁情况下，其他用户没有开发的权限；A 用户释放锁后其他用户方能加锁配置页面

