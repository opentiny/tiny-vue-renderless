<h1 id='structure'>目录结构</h1>

---

良好的项目目录组织结构可以使你的工程更清晰。

<h2 id='directory'>目录</h2>

当您初始化项目后，可以看到 `TinyPro of Ng` 的项目目录结构如下：

```bash
├── node_modules  (为整个工作空间提供 npm 包)
├── src/  (页面代码)
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── angular.json  (为工作区中的所有项目指定 CLI 的默认配置)
├── karma.conf.js
├── package.json  (配置工作空间中所有项目可用的 npm 包依赖)
├── README.md
├── tsconfig.app.json
├── tsconfig.json  (工作空间中所有项目的基本 TypeScript 配置)
├── tsconfig.spec.json
```

<h3 id='page'>页面代码结构</h3>

`src` 目录下是页面代码，对于大多数的情况，您只需要开发 `src` 目录下的文件。
推荐您在开发的过程中，遵守现有的目录结构，以使项目代码的组织结构更加规范。

> 若一个组件被多个页面所依赖，我们推荐您放到 `src/app/@shared/components` 中；
> 若只是被单个页面依赖的组件，我们推荐您放到就近的 `widget` 目录。

```bash
|-- src
    |-- favicon.ico
    |-- index.html  (主要 HTML 页面)
    |-- main.ts  (应用的主要切入点)
    |-- polyfills.ts  (为浏览器支持提供了腻子（polyfill）脚本)
    |-- styles.scss  (为项目提供样式的 CSS 文件)
    |-- test.ts  (单元测试的主入口点)
    |-- app  (包含定义应用逻辑和数据的组件文件)
    |   |-- app-routing.module.ts
    |   |-- app.component.ts
    |   |-- app.module.ts
    |   |-- @core (mock数据, 以及共享到整个应用的单例服务service)
    |   |-- @shared  (管道、布局、公共方法、组件、数据类型等需要公共用到的)
    |   |-- pages (特性模块如 控制台首页 等)
    |       |-- menu.ts
    |       |-- pages-routing.module.ts (配置模块路由)
    |       |-- pages.component.html
    |       |-- pages.component.scss
    |       |-- pages.component.ts
    |       |-- pages.module.ts
    |       |-- console-home (控制台首页模块)
    |       |   |-- console-home.component.html
    |       |   |-- console-home.component.scss
    |       |   |-- console-home.component.ts
    |       |   |-- console-home.module.ts
    |       |   |-- widgets
    |       |-- ... (其他页面)
    |-- assets (包含静态资源，国际化等文件)
    |   |-- i18n
    |   |-- img
    |-- config (包含语言配置文件)
    |-- environments  (包含特定目标环境的构建配置选项)
```
