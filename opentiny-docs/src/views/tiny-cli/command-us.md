
<h1 id='command'>Basic Commands</h1>

---
tiny-cli provides three types of commands：
- tiny-cli Basic Commands
- tiny-cli Kit Pinning Commands
- tiny-cli Plug-in Extension Commands  

<br/>

This document describes basic commands provided by tiny-cli，[`tiny-cli suite commands`](/tiny-cli/docs/guide/use-toolkit) and [`tiny-cli plug-in commands`](/tiny-cli/docs/guide/use-plugin) go to the corresponding document.

<h2 id='overview'>Basic Command View</h2>

Can be entered on the terminal`$ tiny -h` view the help information about Tiny

```bash
$ tiny

 tiny use help:  $ tiny [command] [options]

    $  tiny                     the tiny help information is displayed, If a suite is used in the directory, the help information of the suite is also displayed
    $  tiny init [toolkitName]  initialization Kit
    $  tiny update [name]       update tiny module
    $  tiny list [type]         plug-in list
    $  tiny i                   installing the npm module
    $  tiny mirror              switching the npm source
    $  tiny switch              switch the npm package installation mode, the npm and cnpm packages are supported
    $  tiny clear               clear the local cache of tiny
    $  tiny config [type]       display/setup .cnpmrc file，usage similar to npm config
    $  tiny [name]              other invoking plug-in commands

   Options:

     -h, --help                display the help information of tiny 
     -v, --version             display the version of tiny


 tips:
   kit - To view help information about the suite used in the project,run the command in the root directory of the project.
   plug-in - To view the help information of the plug-in, use the tiny [name] help command, eg : tiny git help
```

<h2 id='init'>tiny init [toolkitName]</h2>

Initialization Kit

```bash
$ tiny init [toolkitName]
```

In the preceding command, `toolkitName` indicates the suite name.For example, the Dev suite：[`@opentiny/tiny-toolkit-dev`](https://github.com/opentiny/tiny-cli/blob/main/packages/toolkits/dev/README.md).To use this suite, you can initialize it directly：

```bash
$ tiny init dev
```

If you don't remember the name of the kit，you can also run the `$tiny init` command directly，this command lists all available suites.

```bash
$ tiny init dev
```

After the command is executed，automatically determines whether the suite is installed locally，If it has been installed, initialize it directly；If not installed，the installation is automatically performed on the computer，perform the initialization operation after installation.

#### Example

```bash
# create an empty folder called toolkit-demo，and go to the folder
$ mkdir toolkit-demo && cd $_
# initializing the dev suite
$ tiny init dev
```

<h2 id='update'>tiny update [toolkitName]</h2>


Update the Tiny module to the latest version


Generally, this command is not required，because Tiny automatically detects whether suites and plug-ins are updated.But tiny's detection is cached，only once within 3 hours，if the kit is updated multiple times within 3 hours，you can run this command to perform the upgrade.

#### Example

```bash
# update the dev suite to the latest version
$ tiny update @opentiny/tiny-toolkit-dev

# update the link plug-in to the latest version
$ tiny update @opentiny/tiny-plugin-link
```

<h2 id='list'>tiny list [type]</h2>


The list of modules available to Tiny is displayed.


where `type` values are `toolkit` and `plugin`.

#### Example

```bash
# Display all modules of Tiny
$ tiny list

************** toolkit/plugin list ******************

- Kit List 

  @opentiny/tiny-toolkit-dev  -------  developing tiny-cli suites and plug-ins
  @opentiny/tiny-toolkit-pro  -------  out-of-the-box mid-front end/design solution
  @opentiny/tiny-toolkit-docs -------  tool for quickly generating the official website of the component library，supports the `ng` and `vue` technology stack components

- Plug-in list

  @opentiny/tiny-plugin-link  -------  quickly debug the dependency package in the local node_modules
  @opentiny/tiny-plugin-hwc  --------  quickly manage and access HUAWEI CLOUD service resources      
  @opentiny/tiny-plugin-lint --------  eslint+prettier code specifications and formatting plug-ins

***************************************************

```

If a parameter is contained, the corresponding suite and plug-in are displayed

```bash

# show all suites of tiny
$ tiny list toolkit

# displays all tiny plug-ins
$ tiny list plugin
```

<h2 id='config'>tiny config</h2>


Displays/sets the .cnpmrc file, similar to the npm config usage.

```bash
# set the .cnpmrc file and write it to the registry
$ tiny config set registry xxxxxx

# obtain the value of registry in the .cnpmrc file
$ tiny config get registry

# list all .cnpmrc file configurations
$ tiny config list

# delete the registry configuration from the .cnpmrc file
$ tiny config delete
```