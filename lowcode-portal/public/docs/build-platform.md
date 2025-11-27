# 构建自定义设计器

## 什么是定制扩展能力

什么是扩展能力呢，一方面我们可以快速拥有一个官方标准的设计器，另外一方面如果用户有独特的业务功能需要，我们可以不用看它的源码、不用关心其实现，用户可以使用 API、插件等方式快速开发自己的工具，插件，DSL等的npm包，用于构建用户自定义的设计器。而设计器引擎对于设计器的扩展能力支持基本上覆盖了设计器的所有功能点。
![expend]( md-only-prefix/img/docimg/platformExpend.png)

## 如何创建一个设计器

用户可以在 [我的设计器](portal-only-prefix/my-platform) 中创建设计器，创建设计器 &rarr; 填写必要的字段 &rarr; 确定
![create-platform]( md-only-prefix/img/docimg/createPlatform.png)

## 如何定制物料资产包、主题、DSL、工具栏和插件栏

设计器创建完成后会自动打开编辑页面，用户可以在这里定制设计器的*物料资产包*、*主题*、*工具*、*插件*和*DSL*，如下图：

1. **定制物料资产包：** 物料资产包  **必选且唯一**  , **不允许删除** 物料资产包，可以添加其他物料资产包来替换当前的。
![define-material]( md-only-prefix/img/docimg/defineMaterial.png)

1. **定制主题：** 主题 **必选且唯一** ，**不允许删除** 主题，可以添加其他主题来替换当前的
![define-theme]( md-only-prefix/img/docimg/defineTheme.png)

1. **定制DSL：** DSL为 **单选**。DSL是将物料的Schema 解析成不同技术栈源码的转换工具，所以DSL的必须和选择的物料在技术栈保持一致。
![define-DSL]( md-only-prefix/img/docimg/defineDsl.png)

1. **定制工具：** 可以将工具拖入上方位置栏，规划定制的设计器里工具的位置。工具可以多选，也可以删除。
![define-tools]( md-only-prefix/img/docimg/defineTools.png)

1. **定制插件：** 可以将插件拖入中间位置栏，规划定制的设计器里插件的位置。插件可以多选，也可以删除。
![define-plugs]( md-only-prefix/img/docimg/definePlugs.png)


## 如何定制一个设计器

物料资产包、主题、工具、插件和DSL定制完成后，有两种方式可以构建设计器。

方式一：可视化构建

![build-platform1]( md-only-prefix/img/docimg/buildPlatform1.png)

方式二：由源码构建

![build-platform2]( md-only-prefix/img/docimg/buildPlatform2.png)

