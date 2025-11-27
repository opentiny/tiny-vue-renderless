<h1 id='usePlugin'>Using Plug-ins</h1>

---
<h2 id='introduce'>TinyCLI Plug-in Introduction</h2>

The TinyCLI plug-in is an NPM module that complies with certain rules. The plug-in is used to extend the command line. You can use the TinyCLI plug-in to add the functions of the TinyCLI. * * Plug-ins focus on a single function * * to solve scattered and repetitive tasks in work. 

Plug-ins are a supplement to the suite. The suite addresses the main life cycle of front-end work, and the areas that the suite cannot cover are supplemented by plug-ins.  

For example, in the source code packaging and build phase (`tiny build`), the main task of the suite is to compress the source code in the src directory and compile the source code to the build directory. In this process, some auxiliary plug-ins can be used at the same time, such as:

1. You can create a lint plug-in to check code specifications during the build process
2. You can create a console plug-in to check whether the source code contains console information
3. You can create a check plug-in to check whether dependencies in dependencies have new versions

These small functions are universal and do not need to be implemented by each suite. These plug-ins are interspersed in the lifecycle of the suite and cooperate with each other to improve development efficiency and experience.  


<h2 id='command'>Using on the command line</h2>

The basic format of the plug-in is `tiny [pluginName] [command]`

Of which：

* `pluginName` indicates the plug-in name, for example, `@opentiny/tiny-plugin-lint`, and `pluginName` indicates `lint`
* `command` is the specific command of the plug-in. The command of each plug-in may be different. For details, see the plug-in document.

```bash
# run the init command of the lint plug-in to initialize the eslint running environment
$ tiny lint init

# view the lint plug-in help
$ tiny lint help
```

<h2 id='config'>Using in configuration files</h2>

Tiny's plug-in can be used in the `tiny.config.js` configuration file.

In the following example, the `tiny build` command is used. After the `tiny build` command is executed, the function of the `tiny console detect` command is executed first, and then the `build` task of the suite is executed.

```js
//tiny.config.js
module.exports = {

  tasks : {
    // other configurations are omitted...
    build : [
      {
        // run eslint before executing the build
        command : 'tiny lint fix'
      }
    ]
  }
};
```


