<h1 id='task'>任务流</h1>

---

<h2 id='designIdeas'>设计思想</h2>

关于任务的执行，我们最常用的是npm scripts里面定义的任务。比如我们在`package.json`中定义一系列命令：

```
{
"scripts": {
    "clean": "git reset --hard && git clean -df",
    "dev": "cross-env NODE_ENV=development BABEL_ENV=dev node tools/server.js",
    "build": "NODE_ENV=production BABEL_ENV=production node tools/packer.js"
  },
}
```

然后我们可以用`npm run`命令运行，比如上面的例子，开启本地开发环境，我们可以执行命令：`npm run dev`。

而我们这个cli工具也能做类似的事情，同时更为强大，以下是一个可以执行任务的的示例：

```
// tiny.config.js
module.exports = {
  tasks: {
    init: [{
      // 清除临时文件
      command: 'clearn'
    },
    {
      // 安装依赖
      command: 'npm install'
    },
    ] start: [{
      // 开启服务
      command: 'node tools/server.js'
    },
    {
      // 监听文件变化
      command: 'watch',
    },
    {
      // 异步开启前端资源代理服务
      command: 'proxy start --enable',
      async: true
    }],
    build: [{
      // 基于webpack构建
      command: 'webpack2',
    },
    ],
    test: [{
      // 执行eslint
      command: 'lint',
    },
    ],
  },
};
```

每个阶段都可声明要做的事情，每个任务流可以配置不同的任务，任务可以是cli的插件也可以是一个nodejs的脚本。可以是同步任务，也可以是异步任务。每个插件可能有不同用法，不同的工程模板可根据需求进行不同的配置。然后执行的时候，可以用`tiny start`、`tiny build`执行。

举个例子：

如果我们需要在开启服务时，强制执行eslint，eslint不通过的，项目没法开启，同时将当前项目的开发人员和项目名称上报到数据库。

如果是`npm run dev`，你没法有效快速的执行，而基于`tiny start`命令，我们可以在cli层面的`start`命令中加入eslint检测及上报功能。通过完善cli任务轻松就解决了大型团队中的协同问题，让项目更可控。


<h2 id='taskConfig'>任务流配置</h2>

<h3 id='prepose'>前置任务</h3>
使用者可以在其自定义一些任务, 如果对应任务名有对应的套件命令,那么会在先执行用户自定义的任务,再执行套件的任务.

如果您配置了对应命令的任务, 那么执行时可以不需要配置套件名.

任务可以是函数式,也可以是命令式, 具体配置如下,只需要在 tiny.config.js 里面添加以下配置即可:

```js
{
   tasks: {
        // start 前执行一些 shell 命令
        start: [
          {
            command: 'echo test1'
          },
          {
              command: 'tiny server',
              // 添加 async 为 true 选项，可以无须等待当前异步命令执行完成便可招待下面的命令
              async: true
          },
          {
              // 设置环境变量NODE_ENV的值为development，同时启动server
              command: 'NODE_ENV=development node ./start-server.js',
          }
        ],
        // build 前执行一些 gulp命令
        build: [{
            command: 'gulp clean'
        }]
   }
}
```

<h3 id='callback'>同步与异步任务</h3>

任务流运行默认是串行执行的，当一个任务运行结束后，才继续往下执行，但是会有一些情况，比如开启一个proxy，开启一个server，当执行这类任务时，因为server处于一个监听状态，无法退出进程，使得任务流无法往下执行，而设置`async: true` 可以让串行的任务变成并行。

```js
{
   tasks: {
        // start 前执行一些 shell 命令
        start: [
          
          {
              command: 'tiny server',
              // 添加 async 为 true 选项，可以无须等待当前异步命令执行完成便可招待下面的命令
              // 设置该值后，下一个任务无需等待当前任务的运行结果，直接往下执行
              async: true
          },
          {
            command: 'echo test1'
          },
        ],
   }
}
```

<h3 id='sequence'>调整套件中的任务流顺序</h3>

任务流执行，默认是先执行`tiny.config.js`中的任务，执行完后再执行套件的任务。如果需要将套件的任务插入到任务流中间，可以使用`$task`关键字来调整。

```js
module.exports = {
    toolkit: '@opentiny/tiny-toolkit-mod',
    tasks: {
        start: [
          { command: 'echo 123' },
          // 套件任务插入
          { command: '$task' },
          { command: 'npm run watch' }
        ],
    }
};
```
