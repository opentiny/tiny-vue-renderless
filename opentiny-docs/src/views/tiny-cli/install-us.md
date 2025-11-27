<h1 id='install'>dependent installation</h1>

---
tiny-cli Use the npminstall npm package to efficiently install and manage dependencies，the following dependency-related commands are provided：
- `tiny i`
- `tiny switch`
- `tiny mirror`
- `tiny clear`


<h2 id='i'>tiny i [name]</h2>

Installing the npm dependency，compatible parameters of npm install，consistent usage，just change the npm install command to tiny i。


This command is probably the most used command.This command is similar to：`npm i / npm install`.You can replace `npm install` with `tiny i`，other parameters remain unchanged.  

The difference between `tiny i` and `npm install` is，faster installation algorithm inside Tiny，it installs more than 3 times faster than `npm install`.the installation kernel uses an open-source library：[`npminstall`](https://github.com/cnpm/npminstall)，Ali's cnpm is also based on this library.

The `tiny i` command enables the internal network environment，some of the more difficult packages to download，such as `node-sass`、`phantomjs` and so on，all can be downloaded through `tiny i`.

warning:
tiny i and npm install cannot coexist，do not mix in the same project.As a result, the package dependency in node_modules is disordered.
repair method：run the rm -rf node_modules command and run the tiny i command to install the node again.


#### Example

```bash
# installing jquery to a project，the dependency is also written to dependencies
$ tiny i jquery -S

# installing the Typescript to the Project，Write the dependency to devDependencies
$ tiny i typescript --save-dev

# install dependencies in package.json
$ tiny i

# install the co module of version 4.2.0
$ tiny i co@4.2.0

```

<h2 id='switch'>tiny switch</h2>


Switching the tiny i installation mode


The default `tiny i` command uses [`npminstall`](https://github.com/cnpm/npminstall)install the kernel，this installation is fast，but there may be some compatibility issues：

In the angular.json file，If the `./node_modules/xxx/yy` format is directly written in the path, a build error occurs.

Therefore, you can use the tiny switch command，switch the tiny i installation mode to `npm install`，after the switchover, the effect of running `tiny i` and `npm install` is the same。 

```
tiny switch
? Select an npm package installation mode (Use arrow keys)
> Using the npm to install dependency packages（stable）
  Use cnpm to install dependency packages（fast installation）
```

#### Example

```bash
# clearing the tiny local cache
$ tiny clear
```

<h2 id='mirror'>tiny mirror</h2>


Switching the npm image source


Due to the special network environment in China，downloading the `npm` package from the official `npm` image source may be slow，this command provides a set of image sources for stable downloads of `npm packages`.

If you use `tiny i` to download an exception，you can run this command to switch to another source.

You can also use shortcut commands to set the parameters in one-click mode.

```bash
$ tiny mirror xxx
```

<h2 id='clear'>tiny clear</h2>


Clearing the Tiny Local Cache.


When an exception occurs during the installation of the Tiny module，you can run this command to initialize the tiny cache directory.After initialization，**all Tiny modules installed on Tiny will be cleared**

When an error occurs when you run the Tiny command, you can run this command to clear the cache.The command is equivalent to drinking more hot water when you get sick and reinstalling the system with a virus in your computer.`tiny clear` is the equivalent of hot water, reloading the system.

#### Example

```bash
# clearing the Tiny local cache
$ tiny clear
```
