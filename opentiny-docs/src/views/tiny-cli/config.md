<h1 id='config'>配置文件</h1>

---
基于TinyCLI的项目，每个项目根目录下均有`tiny.config.js`配置文件。

该文件可以配置当前项目的：TinyCLI 任务流、TinyCLI 插件配置、项目所使用的套件


<h2 id='formatting'>配置文件格式</h2>

`tiny.config.js`文件实际是一个object对象。

以下是一个配置文件的例子

```js
// tiny.config.js

module.exports = {
    // 组件所使用的tiny toolkit
  toolkitName: '@opentiny/tiny-toolkit-mod',

  tasks: {
    start: [
      {
        // 使用tiny link插件将当前目录链接到tiny 本地cdn目录
        command: 'tiny link'
      }
    ],

    build: [
      {
        // 同步git版本号
        command: 'tiny git sync'
      },
      {
        // 检测dependencies中的版本依赖
        command: 'tiny check'
      }
    ],

    publish: [
      {
       // 将demo目录发布至demo平台
        command: 'tiny git publish'
      }
    ],

    open: [
      {
       // 打开gitlab上的项目
        command: 'tiny git open'
      }
    ]
  },

  // ci 插件所需的配置
  ci: {
    // 返回项目中的webpack配置
    getWebpackConfig() {
      return require('./webpack.config').dev();
    }
  }
};
```

<h2 id='kitConfig'>套件配置说明</h2>

项目指定使用的套件使用 toolkit 字段来说明,如果当前项目没有合适的套件使用, 只有任务流的话,也可以不配置套件名及套件参数.

套件参数都写在 toolkitConfig 里面.

为了满足有些项目对某些项目匹配某个套件的大部分需求,就是一两个命令的需求不太一样,我们提供了重写套件命令的方式, 只需要传入以 命令 + Rewrite 的方法便可以了.

```js
{
    toolkit: "@opentiny/tiny-toolkit-mod", // 套件名
    toolkitConfig: {
        port: 9000, // 本地服务器端口号
        open: true,  // 是否自动打开浏览器
        log: true,  // 是否打印本地服务器访问日志
        openTarget: "src/index.html",   // 打开浏览器后自动打开目标页面
        liveload: false, // 是否自动刷新
    }    
}
```

另外,根据不同的套件还会有一些不同字段.


<h2 id='pluginConfig'>插件配置说明</h2>

插件配置,是根据当前项目使用的插件不同而配置不同的,每个插件的配置写在与其插件名相同的字段下面,如以下是 awp 的插件配置:

```js
{
    awp: {
        dailyAppID: 554,
        onlineAppID: 219,
        appDir: 'mcm',
        awpBuildDir: 'build'
    }
}
```

<h2 id='taskFlows'>任务流配置</h2>


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

#### **任务流相关参数**

#### 1. async : true /false （默认为false）

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

#### 2. 环境变量设置  {环境变量key}={value}

经常我们需要在构建时，设置环境变量，那么可以直接在`command`中执行即可

```js
{
   tasks: {
        start: [
          {
              // 设置环境变量NODE_ENV的值为development，同时启动server
              command: 'NODE_ENV=development node ./start-server.js',
          }
        ],
   }
}
```

#### 3. 调整套件中的任务流顺序

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
