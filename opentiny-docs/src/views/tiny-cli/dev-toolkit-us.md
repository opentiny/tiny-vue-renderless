<h1 id='toolkit'>Developing a TinyCLI suite</h1>

---
> If you have a good development model that you want to recommend to your colleagues, developing a tiny-cli suite is a great way to do it.
> Before developing the tiny-cli suite, check whether there is a suite similar to your development mode. If yes, you can join the development of the suite to optimize the existing suite.

<h2 id='conventions'>Basic conventions</h2>

<h3 id='name'>Named</h3>

- The tiny-cli extension suite needs to be created in [`tiny-cli-extensions`](https://github.com/opentiny/tiny-cli-extensions) packages directory in the code repository
- The name field in the package.json file must be in the format of @opentiny/tiny-toolkit-xxx


<h3 id='version'>Version No</h3>

- Comply with the [`semver`](http://semver.org/lang/zh-CN/) version specifications

<h2 id='task'>Development process</h2>

<h3 id='copy'>Copy the project to the local host</h3>

fork [`tiny-cli-extensions`](https://github.com/opentiny/tiny-cli-extensions) the code repository is cloned to the local host

<h3 id='init'>Initialization suite template</h3>

Go to the packages directory of the project, run the tiny init dev command, and run the init [`dev suite`] (https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md)would do a couple of things：

- Add the basic template of the suite to the current directory
- Link the current directory to the tiny-cli module directory

<h3 id='debug'>Debugging suite</h3>

Run the `tiny link` command in the initial suite development root directory to link the current suite to the local host for development. In this way, you do not need to modify concurrent versions for debugging, improving development efficiency.

After the development is complete, run the `tiny clear` command to clear all `tiny-cli` suites/plug-ins. In this way, you can download the latest online suites and install them.

<h3 id='config'>Suite configuration</h3>

The package.json file of the generated template contains tinyOption configurations. These configurations are read when the tiny core invokes the suite. The configuration meanings are as follows：

```
{
  "type": "toolkit", //do not modify this item because it is a suite or a plug-in
  "update": false, //indicates whether to automatically update the plug-in. If this parameter is set to true, tiny-cli automatically updates the plug-in to the latest version after a new version is released.
  "chName": "chinese name" // a few words to describe what type of plug-in is
}
```

<h3 id='api'>Interface implementation</h3>

Each plug-in exposes only one object based on its own commands（For details, see the implementation of [`tiny-toolkit-dev`](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md)）.

<h3 id='tinyConfig'>Use tiny.config.js placement</h3>

There must be a configuration file `tiny.config.js` in the project. All suites must be implemented and performed according to this specification. For suites, the following configurations must be implemented.More configurations are set in the configuration file corresponding to the packaging tool used by the suite. The webpack is used for push：

```
module.exports = {
  //specifies the suite used by the current project
  toolkit: "@opentiny/tiny-toolkit-xxx",

  //The following table lists the basic configuration of the suite. All suites have only these parameters
  //The following configuration is optional. The default configuration is as follows
  toolkitConfig: {
    //Port number of the local server when tiny start is enabled
    port: 9000,
    //Indicates whether to automatically open the browser when tiny start is used
    open: true,
    //tiny start Default page when the browser is opened（this parameter is valid only when open is set to true）
    openTarget: "src/index.html",
    //Indicates whether to automatically refresh the page when the file is changed
    liveload: false
  }
};

```

<h3 id='publish'>Suite release</h3>

Pay attention to the following points before releasing the suite:

- The project name must be filled in according to the specifications
- The description should be clear and brief. Users can view the description in tiny list
- The changelog file must contain the update information of the current version number

Last execute release:

```
npm publish
```

<h3 id='clear'>Debugging a released suite</h3>

During local development, the `tiny link` command is executed to link the suite of the current project to the tiny-cli suite directory. In this way, the suite in the local development environment is always read.
You can run the `tiny clear` command to clear the suites and plug-ins on which tiny-cli depends. In this way, when you run the commands related to tiny-cli again, the latest suites are downloaded and installed.

<h2 id='call'>Suite invoking mechanism</h2>

The tiny-cli plug-in is actually a pure npm package, and the plug-in can run independently.

The suite exposes an object. The `key` of the object is the command invoked by tiny-cli. Assume that a suite named `tiny-toolkit-abc` is developed. The plug-in code is as follows:

```
module.exports = {
  init : function(){ console.log('init') },
  build : function(){ console.log('build') },
  help: function(){ xxxx }
}
```

To run the suite in tiny-cli, run the following command:

```
$ tiny init
```

You may have a question here. Why does tiny-cli know which suite the init command comes from when the `tiny init` command is executed?

The answer is in `tiny.config.js`：

```
module.exports = {
  // declare the suite used by the current project
  toolkit : "@opentiny/tiny-toolkit-abc"
}
```
