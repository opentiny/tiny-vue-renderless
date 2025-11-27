<h1 id='plugin'>Developing the TinyCLI plug-in</h1>

---
> If you have a good set of nodejs gadgets recommended for colleagues around you, developing a tiny-cli plug-in is a good way to go.
> Before developing the tiny-cli plug-in, check whether there is a plug-in similar to your nodejs widget. If there is, you can consider developing the plug-in to optimize the existing plug-in.

<h2 id='conventions'>Basic conventions</h2>

<h3 id='name'>Named</h3>

- The tiny-cli extension plug-in needs to be created in [`tiny-cli-extensions`](https://github.com/opentiny/tiny-cli-extensions) packages directory in the code repository
- The name field in package.json must be in the format of @opentiny/tiny-plugin-xxx

<h3 id='version'>Version No</h3>

- complying with [`semver`](http://semver.org/lang/zh-CN/) version specifications

<h2 id='task'>Development process</h2>

<h3 id='copy'>Copy the project to the local host</h3>

fork [`tiny-cli-extensions`](https://github.com/opentiny/tiny-cli-extensions) the code repository is cloned to the local host

<h3 id='init'>Initialize the plug-in template</h3>

Go to the packages directory of the project and run the tiny init dev command, execute init [`dev kit`](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md)会做几件事：
- Add the basic template of the plug-in to the current directory
- Link the current directory to the tiny-cli module directory

<h3 id='debug'>Debugging plug-ins</h3>

In the root directory of the initialized plug-in development，you can run the `tiny link` command to link the current plug-in to the local host for development. In this way, you do not need to modify the concurrent version for debugging each time, improving development efficiency.

After the development is complete, you can run the `tiny clear` command to clear all suites or plug-ins of `tiny-cli`. In this way, you can download the latest online suites and install them.

<h3 id='config'>Plug-in configuration</h3>

The package.json file of the generated template contains tinyOption configurations, which are read when the tiny-cli core invokes the suite. The configuration meaning is as follows：

```
{
  "type": "plugin", //do not modify this item because it is a suite or a plug-in
  "update": true, //indicates whether to automatically update the plug-in. If this parameter is set to true, tiny-cli automatically updates the plug-in to the latest version after a new version is released。
  "chName": "chinese name" // a few words to describe what type of plug-in is
}
```

<h3 id='api'>Interface implementation</h3>

Each plug-in exposes only one object based on its own commands（you can refer to implementation of [`tiny-plugin-link`](https://github.com/opentiny/tiny-cli/blob/main/packages/plugins/link/readme.md)）.

<h3 id='tinyConfig'>Use tiny.config.js placement</h3>

The project must have a tiny.config.js configuration file. All plug-ins are configured with a field in the plug-in name. Assume that a plug-in name is tiny-plugin-npm, the configuration is as follows：

```
{
  npm: {
    //configuration items required by the plug-in
  }
}
```

Use the config method to obtain the value

```
import { config } from '@cloud/devkit';

config.get('npm');

```

<h3 id='publish'>Plug-in release</h3>

Pay attention to the following before releasing a plug-in:

- the project name must be filled in according to the specifications
- the description should be clear and brief. Users can view the description in tiny list
- the changelog file must contain the update information of the current version number

Last execute release:

```
npm publish
```

<h3 id='clear'>Debugging a released plug-in</h3>

During local development, the `tiny link` command is executed to link the plug-in of the current project to the tiny-cli suite directory. In this case, the plug-in in the local development environment is always read.
You can run the `tiny clear` command to clear the suites and plug-ins on which tiny-cli depends. In this way, when you run tiny-cli commands again, the latest plug-in is downloaded and installed.

<h2 id='call'>Plug-in invoking mechanism</h2>

The tiny-cli plug-in is actually a pure npm package, and the plug-in can run independently.

The plug-in exposes an object. The `key` of the object is the command invoked by tiny-cli. Assume that a plug-in named `tiny-plugin-abc` is developed. The plug-in code is as follows:

```
module.exports = {
  go : function(){ console.log('go') },
  help: function(){ xxxx }
}
```

To run the plug-in in tiny-cli, run the following command:

```
$ tiny abc go
```

where `tiny` is the tiny-cli tool command, `abc` is the plug-in name, and `go` is the object key of the plug-in.
