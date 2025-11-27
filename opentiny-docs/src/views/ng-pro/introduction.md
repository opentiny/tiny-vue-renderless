<h1 id='overview'>总览</h1>

---

`TinyPro of Ng`是基于华为云<a href="/tiny-ng/overview" target="_blank" rel="noopener noreferrer">`TinyNG`</a>组件库和<a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>封装的一整套企业级中后台前端/设计解决方案，致力于在设计规范和基础组件的基础上，继续向上构建，提炼出典型模板/业务组件/配套设计资源，进一步提升企业级中后台产品设计研发过程中的『用户』和『设计者』的体验。除此之外，为更好地使用云服务的资源，它集成了[`云服务客户端库`](/ng-pro/docs/advanced/hwcClient)用于打通华为云和[`云服务插件`](/ng-pro/docs/advanced/hwcPlugin)用于管理和使用您的各类云服务资源。

<h2 id='knowledge'>背景知识</h2>

`TinyPro of Ng`作为一个前端脚手架，默认读者已经懂了一些前端的基础知识，并且了解<a href="https://angular.io/" target="_blank" rel="noopener noreferrer">`Angular`</a>、<a href="/tiny-ng/overview" target="_blank" rel="noopener noreferrer">`TinyNG`</a>和<a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>。

<h2 id='Preparations'>准备工作</h2>

`TinyPro of Ng`前端脚手架是基于`TinyCLI`封装的套件，因此，首先要安装`TinyCLI`，您可点击此处获取<a href="/tiny-cli/docs/use-install" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>如何安装。

<h2 id='init'>初始化</h2>

我们提供了套件来快速地初始化脚手架。

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

<h2 id='development'>开发</h2>

脚手架初始化成功之后就可以开始进行开发了，我们提供了一些命令来辅助开发。

***`tiny start`***

运行这个脚本会启动服务，自动打开默认浏览器展示你的页面。当你重新编辑代码后，页面还会自动刷新。

![start.webp](/src/assets/images/ng-pro/ng-start.webp)

***`tiny build`***

运行这个脚本将会编译你的项目，你可以在项目中的dist目录中找到编译后的文件用于部署。

![build.webp](/src/assets/images/ng-pro/ng-build.webp)

<h2 id='cloud'>云服务能力</h2>

请移步『高级』[云服务最佳实践](/ng-pro/docs/advanced/hwcPractice)章节，了解更多云服务能力。

