<h1 id='dev'>Dev套件</h1>

---
> 快速生成 tiny-cli 插件/套件 开发环境的工具


<h2 id='view'>使用场景</h2>

用于开发 tiny-cli 套件及插件

<h2 id='use'>用法</h2>

<h3 id='init'>初始化</h3>

```
tiny init dev 
```

<h3 id='creat'>创建软链</h3>

在当前正在开发的插件或套件根目录下执行以下命令后, 之后你在本机操作的所有关于该套件或插件的命令,都是在执行你当前项目的代码

```
tiny link
```

<h3 id='publish'>发布代码</h3>

发布代码至 npm 上

```
npm publish
```


<h3 id='seeHelp'>查看帮助信息</h3>

```
tiny help
```

<h2 id='practice'>最佳实践</h2>

<h3 id='devInit'>使用最新的 tiny-toolkit-dev 初始化</h3>

该套件已经整合了以下所有的推荐实践方案, 并且已经处理好了所有套件, 插件的 eslint 的校验问题.


<h3 id='tinyCli'>统一使用 `@opentiny/cli-devkit` 模块来调用 tiny-cli 提供的方法</h3>

[API 链接](https://github.com/opentiny/tiny-cli/blob/main/docs/develop/api.md)

```
# 使用方式
const { modules , logs } from '@opentiny/cli-devkit';

```

<h3 id='default'>插件/套件对外暴露对象</h3>

插件和套件 本身是一个纯 npm 模块，对外暴露一个对象出来即可，其中对象的key，就是tiny-cli的命令。

如果无子命令就可以执行的,可以给 `default` 属性传一个默认命令, 具体代码如下:

```
// 假定以下为 tiny-plugin-commit 插件逻辑

function commit() {
  // 执行弹出 commit 类型选择框操作
}

function help() {
  // 打印帮助信息
}

module.exports = {
  help,
  default: commit
}
```


<h3 id='commit'>获取命令行参数</h3>


会有 `clientArgs` 和 `clientOptions` 两个属性, 前者是控制台参数数组, 后者是控制台选项对象, 具体使用如下:

```
// 假定以下为 tiny commit help 命令的实现
// 参数保有一个，是控制台参数及选项
module.exports = function(options) {
  console.log(options.clientArgs);
  console.log(options.clientOptions);
}

// 执行 tiny commit help --x 1
// 那么将会输出:  
// ['help']
// { x: 1 }
```
