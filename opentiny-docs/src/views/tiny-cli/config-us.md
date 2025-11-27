<h1 id='config'>Configuration file</h1>

---
TinyCLI-based projects，the `tiny.config.js` configuration file exists in the root directory of each project.

This file can be used to configure the TinyCLI task flow, TinyCLI plug-in configuration, and suites used by the project.


<h2 id='formatting'>Configuration File Format</h2>

The `tiny.config.js` file is actually an object.

Here is an example of a configuration file

```js
// tiny.config.js

module.exports = {
    // Tiny toolkit used by the component
  toolkitName: '@opentiny/tiny-toolkit-mod',

  tasks: {
    start: [
      {
        // Use the tiny link plug-in to link the current directory to the tiny local cdn directory.
        command: 'tiny link'
      }
    ],

    build: [
      {
        // synchronize the Git version number
        command: 'tiny git sync'
      },
      {
        // detect version dependencies in dependencies
        command: 'tiny check'
      }
    ],

    publish: [
      {
       // Release the demo directory to the demo platform
        command: 'tiny git publish'
      }
    ],

    open: [
      {
       // Open a project on gitlab
        command: 'tiny git open'
      }
    ]
  },

  // ci configuration required by the plug-in
  ci: {
    // return the webpack configuration in the project
    getWebpackConfig() {
      return require('./webpack.config').dev();
    }
  }
};
```

<h2 id='kitConfig'>Suite Configuration Description</h2>

The toolkit field specifies the suite used by the project. If the current project has no suitable suite and only the task flow is available, you do not need to configure the suite name and suite parameters.

Suite parameters are written in toolkitConfig.

To meet most of the requirements of some projects for matching a suite, that is, one or two commands have different requirements, we provide a way to rewrite the suite commands by passing in the command + Rewrite method.

```js
{
    toolkit: "@opentiny/tiny-toolkit-mod", // Suite Name
    toolkitConfig: {
        port: 9000, // port number of the local server
        open: true,  // whether to automatically Open Browser
        log: true,  // indicates whether to print local server access logs
        openTarget: "src/index.html",   // the target page is automatically displayed after the browser is opened
        liveload: false, // whether to auto Refresh
    }    
}
```

In addition, there are some different fields depending on the suite.


<h2 id='pluginConfig'>Plug-in Configuration Description</h2>

The plug-in configuration varies according to the plug-in used in the current project,the configuration for each plug-in is written under the same field as its plug-in name,the following figure shows the AWP plug-in configuration:

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

<h2 id='taskFlows'>Task Flow Configuration</h2>


Users can customize some tasks in their, if the corresponding task name has the corresponding suite command,then the user-defined task is executed first,Re-execute the task of the suite.

If you have configured the task of the corresponding command, you do not need to configure the suite name during execution.

Tasks can be functional,it can also be imperative, the configuration is as follows,add the following configuration to tiny.config.js:

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
              // Setting Environment Variables the value of NODE_ENV is development，Start at the same timeserver
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

#### **Task flow parameters**

#### 1. async : true /false （the default value is false）

Taskflow runs are executed serially by default，When a task is complete，to continue with the execution，But there will be situations，for example, enable a proxy，start a server，when performing such tasks，because the server is in a listening state，unable to exit process，the task flow cannot be executed，setting `async: true` makes serial tasks parallel

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

#### 2. Setting Environment Variables  {environment variable key}={value}

Often we need to set environment variables during build, so you can directly run the command in `command`

```js
{
   tasks: {
        start: [
          {
              // Setting Environment Variables the value of NODE_ENV is development，Start at the same time server
              command: 'NODE_ENV=development node ./start-server.js',
          }
        ],
   }
}
```

#### 3. Adjusting the Order of Task Flows in a Suite

Task flow execution. By default, the tasks in `tiny.config.js` are executed first，after the execution is complete, execute the task of the suite.if a task for that suite need to be inserted in the middle of the task flow,you can use the `$task` keyword to adjust

```js
module.exports = {
    toolkit: '@opentiny/tiny-toolkit-mod',
    tasks: {
        start: [
          { command: 'echo 123' },
          // suite Task Insertion
          { command: '$task' },
          { command: 'npm run watch' }
        ],
    }
};
```
