<h1 id='install'>依赖安装</h1>

---
tiny-cli 使用 npminstall npm包来高效安装管理依赖，提供了一下与依赖相关的命令：
- `tiny i`
- `tiny switch`
- `tiny mirror`
- `tiny clear`


<h2 id='i'>tiny i [name]</h2>

安装npm依赖，兼容npm install参数，用法一致，只需把 npm install 命令换成  tiny i 即可。


这个命令也许是用到最多次的命令。该命令类似于：`npm i / npm install`。你可以将 `npm install`替换成`tiny i`，其他参数不变。 

`tiny i`与 `npm install` 的区别是，tiny内部采用更快的安装算法，其安装速度比`npm install`快3倍以上。其安装内核使用的是开源库：[`npminstall`](https://github.com/cnpm/npminstall)，阿里的cnpm也是基于该库实现的。

且`tiny i`命令内部打通了内网环境，一些比较难下载的包，如`node-sass`、`phantomjs`等，均能通过`tiny i`进行下载。

warning:
tiny i 和 npm install 两种方式无法共存，同一个项目内不要混用，会导致node_modules里面的包依赖错乱。
修复方式：rm -rf node_modules 后重新使用tiny i安装即可。


#### 例子

```bash
# 安装jquery 到项目，同时将该依赖写到dependencies中
$ tiny i jquery -S

# 安装typescript 到项目，同时将该依赖写到devDependencies中
$ tiny i typescript --save-dev

# 安装package.json中的依赖
$ tiny i

# 安装 4.2.0版本的 co模块
$ tiny i co@4.2.0

```

<h2 id='switch'>tiny switch</h2>


切换tiny i 的安装方式


默认`tiny i`命令使用[`npminstall`](https://github.com/cnpm/npminstall)内核进行安装，这种安装方式速度虽然快，但可能会存在一些兼容问题：

angular.json 文件中，路径里直接写`./node_modules/xxx/yy`的格式会导致构建错误。

所以可以使用 tiny switch 命令，切换tiny i的安装方式到正常`npm install`，切换后执行`tiny i`和`npm install`的效果是一样的。 

```
tiny switch
? 请选择npm包安装的方式 (Use arrow keys)
> 使用 npm 进行依赖包安装（稳定）
  使用 cnpm 进行依赖包安装（安装速度快）
```

#### 例子

```bash
# 清空tiny本地缓存
$ tiny clear
```

<h2 id='mirror'>tiny mirror</h2>


npm镜像源切换


由于国内特殊的网络环境，从`npm`官方镜像源下载`npm`包可能会异常缓慢，该命令提供了一组稳定下载`npm 包`的镜像源。

如果你使用`tiny i`下载出现异常，可通过该命令切换至其他源。

也可以使用快捷命令一键设置

```bash
$ tiny mirror xxx
```

<h2 id='clear'>tiny clear</h2>


清空tiny本地缓存。


当tiny模块安装出现异常时，可使用该命令将tiny的缓存目录进行初始化。初始化之后，**会清空tiny安装过的所有tiny模块**

当你使用tiny出现各种异常报错时，可以使用该命令清空缓存。该命令相当于生病了多喝热水，电脑中病毒了重装系统一样。`tiny clear`就相当于热水、重装系统。

#### 例子

```bash
# 清空tiny本地缓存
$ tiny clear
```
