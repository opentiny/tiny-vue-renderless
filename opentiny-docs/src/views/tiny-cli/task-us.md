<h1 id='task'>Task Flows</h1>

---

<h2 id='designIdeas'>Design Ideas</h2>

About the execution of the task，the tasks defined in npm scripts are most commonly used.For example, we define a series of commands in `package.json`：

```
{
"scripts": {
    "clean": "git reset --hard && git clean -df",
    "dev": "cross-env NODE_ENV=development BABEL_ENV=dev node tools/server.js",
    "build": "NODE_ENV=production BABEL_ENV=production node tools/packer.js"
  },
}
```

Then we can run the `npm run` command，like the example above，start the local development environment，we can run the command：`npm run dev`。

And our cli tool can do something similar，and more powerful，The following is an example of a that can perform a task：

```
// tiny.config.js
module.exports = {
  tasks: {
    init: [{
      // clear temporary files
      command: 'clearn'
    },
    {
      // installation dependency
      command: 'npm install'
    },
    ] start: [{
      // enable the service.
      command: 'node tools/server.js'
    },
    {
      // listen to file changes
      command: 'watch',
    },
    {
      // asynchronously enabling the front-end resource proxy service
      command: 'proxy start --enable',
      async: true
    }],
    build: [{
      // built based on webpack
      command: 'webpack2',
    },
    ],
    test: [{
      // execute eslint
      command: 'lint',
    },
    ],
  },
};
```

You can declare what you want to do at each stage，different tasks can be configured for each task flow，the task can be a cli plug-in or a node.js script.It can be a synchronization task，it can also be an asynchronous task.Each plug-in may have different usages，Different project templates can be configured as required.And then when the execution，you can run the `tiny start` and `tiny build` commands.

Give an example：

If eslint is forcibly executed when the service is started, the project cannot be started if eslint fails. In addition, the developer and project name of the current project are reported to the database.

If you run `npm run dev`, you cannot effectively and quickly execute the command. Based on the `tiny start` command, you can add the eslint detection and reporting function to the `start` command at the cli laye.Collaboration problems in large teams are easily solved by improving cli tasks and making projects more controllable


<h2 id='taskConfig'>Task Flow Configuration</h2>

<h3 id='prepose'>Prerequisites</h3>
Users can customize some tasks. If the corresponding task name has the corresponding suite command, the user-defined task is executed before the suite task.

If you have configured the task of the corresponding command, you do not need to configure the suite name during execution.

The task can be in function or command mode. The detailed configuration is as follows. You only need to add the following configuration to tiny.config.js:

```js
{
   tasks: {
        // run some shell commands before start
        start: [
          {
            command: 'echo test1'
          },
          {
              command: 'tiny server',
              // if async is set to true, you can run the following commands without waiting for the execution of the current asynchronous command to complete
              async: true
          },
          {
              // Set NODE_ENV to development，start the server at the same time
              command: 'NODE_ENV=development node ./start-server.js',
          }
        ],
        // run some gulp commands before building
        build: [{
            command: 'gulp clean'
        }]
   }
}
```

<h3 id='callback'>Synchronous and Asynchronous Tasks</h3>

By default, the task flow is executed in serial mode. After a task is executed, the task continues to be executed. However, some situations may occur, for example, a proxy and a server are started. When such a task is executed, the server is in a listening state and cannot exit the process. Makes the task flow impossible to execute, and setting `async: true` makes serial tasks parallel

```js
{
   tasks: {
        // run some shell commands before start
        start: [
          
          {
              command: 'tiny server',
              // if async is set to true, you can run the following commands without waiting for the execution of the current asynchronous command to complete
              // after this parameter is set, the next task is executed without waiting for the execution result of the current task
              async: true
          },
          {
            command: 'echo test1'
          },
        ],
   }
}
```

<h3 id='sequence'>Adjusting the Order of Task Flows in a Suite</h3>

Task flow execution. By default, the task in `tiny.config.js` is executed first, and then the suite task is executed. If you need to insert a suite task into the middle of a task flow, you can use the `$task` keyword to adjust the task flow.

```js
module.exports = {
    toolkit: '@opentiny/tiny-toolkit-mod',
    tasks: {
        start: [
          { command: 'echo 123' },
          // suite task insertion
          { command: '$task' },
          { command: 'npm run watch' }
        ],
    }
};
```
