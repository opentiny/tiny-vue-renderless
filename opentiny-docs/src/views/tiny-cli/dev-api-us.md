<h1 id='api'>API List</h1>

---
> TinyCLI Set of external APIs

<h2 id='installation'>Installation</h2>

```
tiny i @opentiny/cli-devkit --save
```


<h2 id='use'>Using</h2>

devkit is a set of object objects, which integrates all tiny-cli dependency packages. Multiple objects are mounted under devkit, and each object contains a type of operation:

```
const { cache , logs } from '@opentiny/cli-devkit';


log.info('lalala');
cache.set('ff', 'ee');
cache.get('ff');
```

<h2 id='apiList'>API List</h2>

- [API](#api)
  - [Installation](#installation)
  - [Use](#use)
  - [API List](#apiList)
  - [cache](#cache)
    - [get(key)](#getkey)
    - [set(key, value, options)](#setkey-value-options)
    - [clear](#clear)
  - [config](#config)
    - [get(key, cwd)](#getkey-cwd)
    - [set(key, value, cwd)](#setkey-value-cwd)
    - [exist(cwd)](#existcwd)
    - [getToolkitName(cwd)](#gettoolkitnamecwd)
  - [fs](#fs)
    - [copyTpl(from: string, to: string, context?: any, options?: CopyOption)](#copytplfrom-string-to-string-context-any-options-copyoption)
    - [move(srcPath, distPath)](#movesrcpath-distpath)
    - [remove(file)](#removefile)
    - [readPackage(cwd?:string)](#readpackagecwdstring)
    - [writePackage(pkg:object, cwd?:string)](#writepackagepkgobject-cwdstring)
  - [home](#home)
    - [getHomePath()](#gethomepath)
    - [getModulesPath()](#getmodulespath)
    - [initHomeDir()](#inithomedir)
    - [cleanHomeDir()](#cleanhomedir)
  - [logs](#logs)
    - [info(msg)](#infomsg)
    - [success(msg)](#successmsg)
    - [warn(msg)](#warnmsg)
    - [error(msg)](#errormsg)
    - [debug(msg)](#debugmsg)
    - [cli](#cli)
    - [func](#func)
  - [module](#module)
    - [get(name)](#getname)
    - [install(name)](#installname)
    - [unInstall(name)](#uninstallname)
    - [update(name)](#updatename)
    - [localList(options)](#locallistoptions)
    - [onlineList(options)](#onlinelistoptions)
    - [localExist(name)](#localexistname)
    - [onlineExist([type])](#onlineexisttype)
    - [fullName(name)](#fullname)
    - [pluginFullName(name)](#pluginfullname)
    - [toolkitFullName(name)](#toolkitfullname)
  - [npm](#npm)
    - [install(pkg, options)](#installpkg-options)
    - [uninstall(pkg, options)](#uninstallpkg-options)
    - [installDependencies(options)](#installdependenciesoptions)
    - [latest(pkg, options)](#latestpkg-options)
    - [has(pkg, options)](#haspkg-options)
  - [task](#task)
    - [has(tasks, when)](#hastasks-when)
    - [run(options)](#runoptions)
    - [runFunction();](#runfunction)
  - [user](#user)
  - [git](#git)
    - [status([filePath])](#statusfilepath)
    - [repository([filePath])](#repositoryfilepath)
    - [project([filePath])](#projectfilepath)
    - [long([filePath])](#longfilepath)
    - [short([filePath])](#shortfilepath)
    - [branch([filePath])](#branchfilepath)
    - [count()](#count)
    - [date()](#date)
    - [isTagDirty()](#istagdirty)
    - [message](#message)
    - [tag([markDirty])](#tagmarkdirty)



<h2 id='cache'>cache</h2>

> Tiny-cli data cache module, which can be used to store common user data and support validity period setting

<h3 id='getkey'>get(key)</h3>

> Obtains the cached content. If the cached content does not exist or has expired, the value is returned null

- key `{string}` cached key value
- return: `{mix}` cached content

<h3 id='setkey-value-options'>set(key, value, options)</h3>

> Modify the tiny-cli configuration file

- key `{string}` cache key value
- value `{mix}` cache content, which can be a character string, number, or JSON object
- options `{object}`
- options.expires `{number}` cache duration, in milliseconds, for example, 1 hour = > 3600000

<h3 id='clear'>clear</h3>

> Clear all caches

```js

import { cache } from '@opentiny/cli-devkit'

// Write the object of key abc to the tiny-cli cache file.（the cache file is usually stored in ~/.tiny/tiny.cache.json）
cache.set('abc',{ data : 1 });

// Obtain the content of key abc from the tiny-cli cache.
cache.get('abc');
// => return { data : 1 }

// Clear the tiny-cli cache
cache.clear();

```

<h3 id='config'>config</h3>

> tiny.config.js file operation module, you can read and write the tiny.config.js file

<h3 id='getkey-cwd'>get(key, cwd)</h3>

> Obtain the contents of the tiny-cli configuration file (tiny.config.js).If it doesn't exist, return null

- key `{string}` configured key
- cwd `{string}` path of the configuration file, the default value is process.cwd()
- return: `{mix}` configuration content


```js
//tiny.config.js file
module.exports = {
	toolkit: '@opentiny/tiny-toolkit-dev',
	go : {
	   projectId: 85932,
	   assetsId: 21443
	}
};
```

```js
import { config } from '@opentiny/cli-devkit'
// Obtain the content of the go field in the configuration file
config.get('go');
// => return { projectId : 85932, assetsId : 21443 }

```



<h3 id='setkey-value-cwd'>set(key, value, cwd)</h3>

> Modify the tiny-cli configuration file

- key `{string}` configured key
- value `{mix}` the value can be a character string, a number, or a json object
- cwd `{string}` path of the configuration file,the default value is process.cwd()

```js
//Original tiny.config.js file
module.exports = {
  // abc plug-in
  abc: {
    xyz: 22
  },
  // task List
  tasks: {
    start: [{
      command: 'echo 33'
    }]
  }
};

```

```js
import { config } from '@opentiny/cli-devkit'
//set Set an object
config.set('abc', {xyz: 23});

//set Sets an annotated string object
config.set('gg',
			`
//This is a line of comments
{
  "good" : "yes"
}
      `);
      
//set Sets a character string with
config.set('xx.yy','123');
config.set('tasks.build',[{
			command: 'echo 44'
		}]);
```


```js
// Modify the output file named tiny.config.js
module.exports = {
    // abc plug-in
    abc: { xyz: 23 },
    // task list
    tasks: {
        start: [{ command: 'echo 33' }],
        build: [{ command: 'echo 44' }]
    },
    gg: //This is a line of comments
    { 'good': 'yes' },
    xx: { yy: 123 }
};
```

<h3 id='existcwd'>exist(cwd)</h3>

> Check whether the tiny.config.js file exists

- cwd `{string}` path of the configuration file,the default value is process.cwd()
- return: `{boolean}` existence or not

<h3 id='gettoolkitnamecwd'>getToolkitName(cwd)</h3>

> Obtain the toolkit name configured in the configuration file

- cwd `{string}` path of the configuration file,the default value is process.cwd()
- return: `{string}` toolkit name, If it doesn't exist, return null

```js
//tiny.config.js file
module.exports = {
	toolkit: '@opentiny/tiny-toolkit-dev',
	go : {
	   projectId: 85932,
	   assetsId: 21443
	}
};
```

```js
import { config } from '@opentiny/cli-devkit'
const toolkit = config.getToolkitName();
// =>  toolkit = @opentiny/tiny-toolkit-dev
```




<h2 id='fs'>fs</h2>

> Tiny-cli file and folder operation module, which is used to generate templates and replace variables in suites

The fs module integrates [fs-extra](https://www.npmjs.com/package/fs-extra) the full functionality of the package
```js
/**
 *
 * @param from original file path
 * @param to target file path
 * @param context ejs object replaced by the template
 * @param options object，used to filter and rename files
 * @param options.ignore arrays, it's similar to gitignore，the default value is['node_modules', '.DS_Store', '.idea']
 * @param options.rename renaming a file
 */
```

<h3 id='copytplfrom-string-to-string-context-any-options-copyoption'>copyTpl(from: string, to: string, context?: any, options?: CopyOption)</h3>

> Copy the directory. The ejs template engine is supported. The start and end characters of the label are: <% %>

- from `string` original file path
- to  `string` target file path
- context `object` ejs object replaced by the template
- options `object`，used to filter and rename files
- options.ignore `array`, it's similar to gitignore，the default value is['node_modules', '.DS_Store', '.idea']
- options.notTextFile: `string[] | undefined`，non-text file name extension. Files of this type are directly copied without conversion，such as ['.key','.ppt']
- options.rename `function` renaming a file

```
import { fs } from '@opentiny/cli-devkit'

fs.copyTpl(
		dirSrc,
		dirDist,
		{ name: 'test' },
		{
			ignore: ['zzz.js'],
      notTextFile: ['.key','.ppt'],
			rename: function(filename) {
				if (filename === 'xxx.js') {
					return 'yyy.js';
				}
				return filename;
			},
		}
	);
```

> Change the folder name

The folder name must contain the `{}` symbol.for example, `D:\gitlab\tiny\tiny\{name}\devkit` after replacement： `D:\gitlab\tiny\tiny\test\devkit`

The {name} variable is the object `{name:'test'}` in the preceding code



<h3 id='movesrcpath-distpath'>move(srcPath, distPath)</h3>

> Move files

- srcPath `string` source file, which is an absolute path
- distPath `string` absolute path of the target file

<h3 id='removefile'>remove(file)</h3>

> Delete a file or directory

- file `string` indicates the path of the file to be deleted

<h3 id='readpackagecwdstring'>readPackage(cwd?:string)</h3>

> Read the package file in the cwd directory

- cwd `string` directory where package.json is stored，the default value is process.cwd();

<h3 id='writepackagepkgobject-cwdstring'>writePackage(pkg:object, cwd?:string)</h3>

> Write content to the package.json

- pkg `object` contents of pkg
- cwd `string` directory where package.json is stored，the default value is process.cwd();

<h2 id='home'>home</h2>

> Obtain the paths of tiny-cli and modules, It is not recommended that the plug-in directly operate the contents in the tiny-cli home directory
<h3 id='gethomepath'>getHomePath()</h3>

> Obtain the home path of tiny-cli

- return: `{string}` path string

<h3 id='getmodulespath'>getModulesPath()</h3>

> Obtaining the Installation Path of the Tiny-cli Module

- return: `{string}` path string


<h3 id='initHomeDir'>initHomeDir()</h3>

> Initialize the home path of tiny-cli


<h3 id='cleanhomedir'>cleanHomeDir()</h3>

> Clear the home path of tiny-cli



<h2 id='logs'>logs</h2>

> Logs are displayed in different colors on the console

logs returns a method. Invoking this method can directly return an object and invoke the method. The procedure is as follows:

```
import { logs } from '@opentiny/cli-devkit';

const log = logs('test')

// Common character string
log.info('lalala'); // Print the fuchsia:  [test] lalala
log.cli.info('lalala'); // Print in purple only when the current plug-in or suite is used as the entry module:  [test] lalala
log.func.info('lalala'); // Prints in purple only if the current plug-in or kit is not an entry module:  [test] lalala

// Use placeholders
log.info('string:%s digit:%d ', 'ssss', 33); // Will print: [test] string:ssss digit:33
log.info('object:%o', {a: 1}); // print: [test] object:{a: 1}
```

The `info` `success` `warn` `error` `debug` methods provided below all support [printf-style](https://wikipedia.org/wiki/Printf_format_string) formatting. The following formatting modes are supported: 

| Formatter | Representation                 |
| --------- | ------------------------------ |
| `%O`      | Multiline print objects                  |
| `%o`      | Single-line print object                  |
| `%s`      | string      digit                   |
| `%d`      | Numbers                           |
| `%j`      | JSON                           |
| `%%`      | Print ('%'). Does not represent any placeholder |


<h3 id='infomsg'>hinfo(msg)</h3>

> Printed in magenta

- msg `{string}` content to be printed

<h3 id='successmsg'>success(msg)</h3>

> Print with product green

- msg `{string}` content to be printed


<h3 id='warnmsg'>warn(msg)</h3>

> Printed in yellow

- msg `{string}` content to be printed

<h3 id='errormsg'>error(msg)</h3>

> Printed in magenta

- msg `{string}` content to be printed


<h3 id='debugmsg'>debug(msg)</h3>

> This parameter is printed only when the environment variable DEBUG matches the parameter that is input to the tiny-log function, for details, see [debug](https://www.npmjs.com/package/debug)

- msg `{string}` content to be printed


<h3 id='cli'>cli</h3>

> Cli is an object that uses the same methods as the `info` `success` `warn` `error` declared above
> The only difference is that after the method under the cli is invoked, the corresponding content is printed only when the current plug-in or suite is used as the entry module

```
import { logs } from '@opentiny/cli-devkit';
const log = logs('test');

log.cli.info('lalala');
log.cli.error('lalala');
log.cli.warn('lalala');
log.cli.success('lalala');
```

<h3 id='func'>func</h3>

> func is an object that uses the same methods as the `info` `success` `warn` `error` declared above
> The only difference is that only the current plug-in or suite is invoked after the method under func is invoked`when it is not an entry module` , the corresponding content is printed

```
import { logs } from '@opentiny/cli-devkit';
const log = logs('test');

log.func.info('lalala');
log.func.error('lalala');
log.func.warn('lalala');
log.func.success('lalala');
```


<h2 id='module'>module</h2>

> Obtaining, Installing, and Uninstalling the Tiny-cli Module

<h3 id='getname'>get(name)</h3>

> `Generator Function`, obtain the tiny-cli module. You need to run the plug-in and suite to obtain the module. If the module is installed locally, the module is automatically installed and then returned

- name `{string}` module name. To obtain the package.json information, add the module name to the end of the package.json file  `/package.json`
- return: `{object}` modInfo module object, modInfo.mod module object, modInfo.options setting items of the module.

```js
import { modules } from '@opentiny/cli-devkit';
const blue = await modules.get('@opentiny/tiny-toolkit-blue');
// If blue is a blue suite, it is an object. The following describes how to mount functions corresponding to several commands
yield blue.build(tinyObj, {
  clientArgs: ['index']
});

// Obtains the package.json file of a module
import { modules } from '@opentiny/cli-devkit';
const pkg = await modules.get('@opentiny/tiny-toolkit-blue/package.json');
console.log(pkg.tinyOptions);
```

<h3 id='installname'>install(name)</h3>

> `Generator Function`, Installing the tiny-cli module

- name `{string}` module name. If you need to specify a version number, add the module name to the end of the module name,如: gulp@1.0.0

<h3 id='uninstallname'>unInstall(name)</h3>

> `Generator Function`, uninstalling the tiny-cli Module

- name `{string}` module name


<h3 id='updatename'>update(name)</h3>

> `Generator Function`, updating the tiny-cli Module

- name `{string}` module name



<h3 id='locallistoptions'>localList(options)</h3>

> Obtains the list of installed tiny-cli plug-ins and suites

- options `{object}` options
- options.type `{string}` type，The value can be a plugin or toolkit. This parameter is not transferred to obtain the entire list
- return: `{array}` module list



<h3 id='onlinelistoptions'>onlineList(options)</h3>

> `Generator Function`, obtain the list of tiny-cli plug-ins and suites online

- options `{object}` options
- options.type `{string}` type，The value can be a plugin or toolkit. This parameter is not transferred to obtain the entire list
- return: `{array}` module list



<h3 id='localexistname'>localExist(name)</h3>

> Check whether the corresponding tiny-cli module is installed on the local host

- name `{string}` module name
- return: `{boolean}` existence or not



<h3 id='onlineexisttype'>onlineExist([type])</h3>

> `Generator Function`, check whether the corresponding tiny-cli module exists online

- name `{string}` module name
- return: `{array}` module list

<h3 id='fullname'>fullName(name)</h3>

> Generate a full name based on the input plug-in or suite name abbreviation

- name `{string}` abbreviated name
- return: `{string}` full name


<h3 id='pluginfullname'>pluginFullName(name)</h3>

> Generate the full name of the corresponding plug-in based on the input plug-in name abbreviation

- name `{string}` abbreviated name
- return: `{string}` full name


<h3 id='toolkitfullname'>toolkitFullName(name)</h3>

> Generate the full name of the corresponding suite based on the input suite name abbreviation

- name `{string}` abbreviated name
- return: `{string}` full name


<h2 id='npm'>npm</h2>

> npm operation module,用Used to install, uninstall, and check whether the corresponding npm module exists, the system determines whether to pull Alibaba intranet or extranet based on the current user configuration.

<h3 id='installpkg-options'>install(pkg, options)</h3>

> `Generator Function`,install an npm package

- pkg `{string}` name of the package to be operated
- options `{object}` options
- options.registry `{string}` source corresponding to the package. By default, the source is switched based on the network selected by the current user
- options.stdio `{string}` input and output. The default value is inherit
- options.cwd `{string}` execution directory. the default value is process.cwd()


```
import { npm } from '@opentiny/cli-devkit';

await npm.install('react');
await npm.install('react@18.2.0');


```



<h3 id='uninstallpkg-options'>uninstall(pkg, options)</h3>

> `Generator Function`,uninstall an npm package

- pkg `{string}` name of the package to be operated
- options `{object}` options
- options.stdio `{string}` input and output. The default value is inherit
- options.cwd `{string}` execution directory. The default value is process.cwd()



<h3 id='installdependenciesoptions'>installDependencies(options)</h3>

> `Generator Function`,install the dependency package corresponding to the package.json file in the current directory

- options `{object}` options
- options.registry `{string}` source corresponding to the package. By default, the source is switched based on the network selected by the current user
- options.stdio `{string}` input and output. The default value is inherit
- options.cwd `{string}` execution directory, the default value process.cwd()

<h3 id='latestpkg-options'>latest(pkg, options)</h3>

> `Generator Function`,obtaining the Latest NPM Package Information

- pkg `{string}` name of the package to be operated
- options `{object}` options
- options.registry `{string}` source corresponding to the package. By default, the source is switched based on the network selected by the current user
- options.version `{string}` version number or tag of the information to be obtained. The default value is latest
- return: `{object}` If the JSON object exists, the corresponding JSON object is returned. Otherwise, the value is null


<h3 id='haspkg-options'>has(pkg, options)</h3>

> `Generator Function`,check whether an NPM package exists

- pkg `{string}` name of the package to be operated
- options `{object}` options
- options.registry `{string}` source corresponding to the package. By default, the source is switched based on the network selected by the current user
- return: `{boolean}` existence or not

<h2 id='task'>task</h2>

> tiny-cli task flow module, used to execute tiny-cli task flow

<h3 id='hastasks-when'>has(tasks, when)</h3>

> Indicates whether the task flow of the current moment exists

- tasks `{array}` task List
- when `{string}` the timing

<h3 id='runoptions'>run(options)</h3>

> `Generator Function`,execute a string of task flows, directly transfer a task flow corresponding to the instruction, and specify the execution time

- options `{object}` options
- options.tasks `{array}` task flow array. If a function needs to be transferred, only the generator function is supported
- options.when `{string}` the timing, before or after
- options.args `{array}` if there are functions in the task flow, the number of groups is the parameter transferred to the function
- options.command `{string}` The tiny-cli instruction that is currently running, used to prompt and replace the $$ parameter on the console

使用案例

```js
const tasks = [{
  command: 'echo "$$"'
}, {
  * func(a, b) {
    console.log(a, b);
  }
}, {
  command: '__toolkitCommand__'
}, {
  comamnd: 'echo afterTask'
}];

// Invoke the previous task
await run({
  tasks,
  when: 'before',
  args: ['aaa', 'bbb'],
  command: 'test'
});

// Invoke post-tasks
await run({
  tasks,
  when: 'after',
  command: 'test'
});

```

If `tiny test x -y z` is entered in the command line, the output of the preceding two calls is as follows:

```
> x -y z
> aaa bbb
```

```
> afterTask
```


<h3 id='runfunction'>runFunction()</h3>

> `Generator Function`,executes a function. The generator and common functions are supported

- options `{object}`
- options.method `{function}` functions to be executed
- options.args `{array}` parameters to be transferred to the method 
- options.next `{function}` next, execute the method. If method is a common function, it is automatically spelled into args and transferred to method. If method is a generator function or promise, it does not need to be transferred. The runFunction function exits after the function is executed

Executing a Common Function

```js
await runFunction({
  method(a, b, next) {
    setTimeout(() => {
      console.log(a, b);
      next();
    }, 10);
  },
  args: ['aaa', 'bbb'],
  next() {
    console.log('ccc');
  }
});

// Execution result
// > aaa bbb
// > ccc
```

Execute the generator function

```js
await runFunction({
  async method(a, b) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(a, b);
        resolve();
      }, 10);
    });
  },
  args: ['aaa', 'bbb']
});
console.log('ccc');

// 执行结果
// > aaa bbb
// > ccc
```

<h2 id='user'>user</h2>

> Obtain user information based on the current git information of the user
> Obtaining the git user name and email address

- return: `{object}` object that contains the user name and email address

```
import { user } from '@opentiny/cli-devkit';
const userInfo = user();

console.log(userInfo); // {name: 'xxx', email: 'xxx@xxx.xx'}
```

<h2 id='git'>git</h2>

> Suite or plug-in, which often needs to obtain the git information of the current project. The git tool set provides a set of methods for obtaining git and project information.

<h3 id='statusfilepath'>status([filePath])</h3>

Obtains the current git branch status.

- options `{filePath}` optional, the default value is process.cwd()
- return: `{object}` current git status
```
import { git } from '@opentiny/cli-devkit';


const status = git.status();

// => console.log(status)
{ 
  local_branch: 'xxx',
  remote_branch: null,
  remote_diff: null,
  clean: true/false,
  files: []
}
```

<h3 id='repositoryfilepath'>repository([filePath])</h3>

Obtains the remote repository address of the project.

- options `{filePath}` optional, the default value is process.cwd()
- return: `{string}` current Git repository address

```
import { git } from '@opentiny/cli-devkit';

const repository = git.repository();

// => console.log(repository)
// => git@github.com:opentiny/tiny-cli.git
```


<h3 id='projectfilepath'>project([filePath])</h3>

Obtains the NAMESPACE and PROJECT_NAME of the current project. Note: In the cloud build environment, the information provided by the cloud build is preferred.

- options `{filePath}` optional, the default value is process.cwd()
- return: `{string}` NAMESPACE/PROJECT_NAME of the current git repository

```
import { git } from '@opentiny/cli-devkit';

const project = git.project();

// => console.log(project)
// => openteam/tiny-cli
```

<h3 id='longfilepath'>long([filePath])</h3>

Obtains the latest commit ID. Note: In the cloud build environment, the information provided by the cloud build is preferred.

- options `{filePath}` optional, the default value is process.cwd()
- return: `{string}` commit id

```
import { git } from '@opentiny/cli-devkit';

const long = long();

// => console.log(long)
// => 5f6f63cf3a7f094c8041054e7092cd7a0e5d0aa5
```

<h3 id='shortfilepath'>short([filePath])</h3>

Obtains the latest commit id. Note: In the cloud build environment, the information provided by the cloud build is preferred

- options `{filePath}` optional, the default value is process.cwd()
- return: `{string}` first seven digits of the commit id

```
import { git } from '@opentiny/cli-devkit';

const short = short();

// => console.log(short)
// => 5f6f63c
```

<h3 id='branchfilepath'>branch([filePath])</h3>

Gets the branch name of the current project. Note: In the cloud build environment, the information provided by the cloud build is preferred.

- options `{filePath}` optional, the default value is process.cwd()
- return: `{string}` branch

```
import { git } from '@opentiny/cli-devkit';

const branch = branch();

// => console.log(branch)
// => master
```

The following methods are from[git-rev-sync](https://github.com/kurttheviking/git-rev-sync-js)

<h3 id='count'>count()</h3>

- return: `{number}`

return the count of commits across all branches; this method will fail if the `git` command is not found in `PATH`

<h3 id='date'>date()</h3>

- return: `{Date}`

returns the date of the current commit; this method will fail if the `git` command is not found in `PATH`

<h3 id='istagdirty'>isTagDirty()</h3>

- return: `{boolean}`

returns true if the current tag is dirty; this method will fail if the `git` command is not found in `PATH`

<h3 id='message'>message</h3>

- return: `{string}`

return the current commit message; this method will fail if the `git` command is not found in `PATH`

<h3 id='tagmarkdirty'>tag([markDirty])</h3>

- return: `{string}`

return the current tag and mark as dirty if markDirty is truthful; this method will fail if the `git` command is not found in `PATH`
