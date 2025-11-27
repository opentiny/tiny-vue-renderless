<h1 id='FAQ'>常见问题</h1>

---
<h2 id='yeoman'>TinyCLI 与 Yeoman 或者其他脚手架有什么区别？</h2>
TinyCLI通过套件提供了类似Yeoman的脚手架功能，可以创建一个新项目开发环境，除此之外，还提供了插件、任务流、依赖安装、自动更新等众多特性。

<h2 id='distinguish'>TinyCLI 的插件与套件的区别是什么？</h2>
- 套件：套件是特定业务的标准化开发解决方案，一条命令即可完成项目的初始化；套件命令覆盖从项目初始化，到代码发布上线等流程。
- 插件：插件专注于某个单一的功能，解决工作中零散、 重复的任务。任意目录执行，开箱即用。例如 可以创建一个通用的eslint插件为前端项目添加eslint检查。

<h2 id='tiny-i'>tiny i 命令能替代 npm i 命令吗？</h2>
可以。`tiny i` 通过 [npminstall](https://github.com/cnpm/npminstall) 包提供了依赖安装管理的能力，相比于npm提供的install功能，npminstall会更快、占用空间也更小。

- npminstall@1.2.0
- pnpm@0.18.0
- npm@2.14.12

cli | real | user | sys
--- | ---  | ---  | ---
npminstall | 0m10.908s | 0m8.733s | 0m4.282s
npminstall with cache | 0m8.815s | 0m7.492s | 0m3.644s
npminstall --no-cache | 0m10.279s | 0m8.255s | 0m3.932s
pnpm | 0m13.509s | 0m11.650s | 0m4.443s
npm | 0m28.171s | 0m26.085s | 0m8.219s
npm with cache | 0m20.939s | 0m19.415s | 0m6.302s

如果希望继续使用`npm install`，删除node_modules后重新使用`npm i`安装依赖即可.