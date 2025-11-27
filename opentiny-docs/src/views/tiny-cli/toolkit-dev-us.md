<h1 id='dev'>Dev suite</h1>

---
> Tool for quickly generating the tiny-cli plug-in/suite development environment


<h2 id='view'>Application Scenarios</h2>

Used to develop tiny-cli suites and plug-ins

<h2 id='use'>Usage</h2>

<h3 id='init'>Initialize</h3>

```
tiny init dev 
```

<h3 id='creat'>Create a soft link</h3>

After you run the following command in the root directory of the plug-in or suite that is being developed, all the commands you operate on the local computer about the suite or plug-in are executing the code of your current project.

```
tiny link
```

<h3 id='publish'>Publish Code</h3>

Release code to npm

```
npm publish
```


<h3 id='seeHelp'>Viewing Help Information</h3>

```
tiny help
```

<h2 id='practice'>Best Practices</h2>

<h3 id='devInit'>Use the latest tiny-toolkit-dev for initialization</h3>

This suite has integrated all the following recommended practices and handled the eslint verification problems of all suites and plug-ins.


<h3 id='tinyCli'>Use the `@opentiny/cli-devkit` module to invoke the methods provided by tiny-cli.</h3>

[API link](https://github.com/opentiny/tiny-cli/blob/main/docs/develop/api.md)

```
# How to Use
const { modules , logs } from '@opentiny/cli-devkit';

```

<h3 id='default'>Externally exposed object of the plug-in/suite</h3>

The plug-in and suite are pure npm modules,You can expose an object,The key of the object is the tiny-cli command.

If no subcommand can be executed, you can transfer a default command to the `default` attribute. The specific code is as follows:

```
// Assume that the tiny-plugin-commit plug-in logic is as follows

function commit() {
  // the commit type selection box is displayed
}

function help() {
  // print help information
}

module.exports = {
  help,
  default: commit
}
```


<h3 id='commit'>Obtaining command line parameters</h3>


There are two attributes: `clientArgs` and `clientOptions`,the former is the console parameter array, and the latter is the console option object,the specific usage is as follows:

```
// Assume that the implementation of the tiny commit help command is as follows
// There is one parameter, which is the console parameter and option
module.exports = function(options) {
  console.log(options.clientArgs);
  console.log(options.clientOptions);
}

// Execute tiny commit help --x 1
// Then it will output:  
// ['help']
// { x: 1 }
```
