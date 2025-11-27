<h1 id='usePlugin'>使用插件</h1>

---
<h2 id='introduce'>TinyCLI 插件介绍</h2>

TinyCLI 插件，是符合一定规则的 npm 模块，插件主要是用来扩展命令行，可以通过插件来增加 TinyCLI 的功能。**插件专注于某个比较单一的功能**，解决工作中零散、重复的任务。  

插件是对套件的一个补充，套件解决的是前端工作的主要生命周期，而套件无法覆盖到的地方，将由插件来补充。  

比如：在套件的源码打包与构建阶段(`tiny build`)，套件的主要任务是将src目录的源码进行压缩、编译到build目录。而在这个过程中，可以同时使用一些辅助插件，例如：  

1. 可以创建 lint 插件，在build的过程中做代码规范检测
2. 可以创建 console 插件，检测源码中是否包含有console信息
3. 可以创建 check 插件，检测dependencies中的依赖是否有新版本  

这些细小的功能点，本身具有业务通用性，不需要每个套件去实现一遍，将这些插件穿插在套件的生命周期中一起使用，相互配合，最终提高开发效率，改善开发体验。  


<h2 id='command'>在命令行中使用</h2>

插件的使用基本格式是：`tiny [pluginName] [command]`

其中：

* `pluginName`为插件的名字，如`@opentiny/tiny-plugin-lint`插件，`pluginName`则是`lint`
* `command`为插件的具体命令，每个插件的命令可能不一样，需要看插件文档。

```bash
# 使用lint插件的init命令，初始化eslint运行环境
$ tiny lint init

# 查看lint插件帮助
$ tiny lint help
```

<h2 id='config'>在配置文件中使用</h2>

tiny 的插件可以在`tiny.config.js`配置文件中使用。

如下面的例子，在`tiny build`命令中进行使用，执行`tiny build`后，会先执行`tiny console detect`命令的功能，再执行套件本身的`build`任务。

```js
//tiny.config.js
module.exports = {

  tasks : {
    //省略其他配置...
    build : [
      {
        // 执行构建前，先跑一遍eslint
        command : 'tiny lint fix'
      }
    ]
  }
};
```


