<h1 id='start'>快速上手</h1>

---
<h2 id='Installed'>工具安装</h2>


TinyCLI 依赖 Node.js 、 NPM 、 Git 环境，若你还未安装好前端开发的环境，请先参考本文档进行安装。

<h3 id='node'>安装 Node.js 与 NPM</h3>

若已安装了 Node.js 与 NPM ，该步可忽略。

进入 [`Node.js 官网`](https://nodejs.org/en/) 下载 Node.js 安装包, 并安装。

验证安装是否成功，可以在命令行中执行以下命令，查看 Node.js 版本及 NPM 版本：

```
$ node -v
v16.18.1
$ npm -v
8.19.2
```

<h3 id='git'>安装 Git</h3>

打开 [`Git 中文网站`](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)，找到对应的版本下载并安装。

验证安装是否成功，可以在命令行中执行以下命令，查看是否有输出即可：

```
$ git --version
git version 2.22.0.windows.1
```

<h3 id='cli'>安装 TinyCLI</h3>

```bash
$ npm install @opentiny/cli -g
```

注意：mac 用户如果提示没有权限，请在前面加上 `sudo` 命令。

验证是否安装成功，可以在命令行中执行以下命令，查看 tiny 的版本：

```bash
$ tiny -v
tiny v1.x.x
```

<h3 id='problem'>安装过程中可能遇到的问题</h3>

1、找不到命令

执行`tiny -v`后报如下错误：

```
'tiny' 不是内部或外部命令，也不是可运行的程序或批处理文件。
```

该错误表示未将`npm`加入到系统变量中，导致`tiny`无法使用。解决方案：

(1) 命令行运行：`npm config get prefix`。查看 npm 的 bin 路径。  
(2) 将打印出来的路径加入到系统环境变量`PATH`中，并重启命令行工具即可。


---
<h2 id='newProject'>新项目使用</h2>

#### 1. 初始化项目

使用`$ tiny init` 命令，选择你需要开发的项目类型。

```bash
$ tiny init
? 请选择一个适合您项目的套件进行初始化: (Use arrow keys)
>   dev  ----------  开发tiny-cli套件和插件
    pro  ----------  开箱即用的中后台前端/设计解决方案
    docs ----------  用于开发组件库官网的套件
```

以第一个 `dev套件：开发tiny-cli套件和插件 为例` 进行初始化。该套件会让你选择具体的组件类型：

```
? 请选择你想要初始化的模板 (Use arrow keys)
> tiny套件 ---- 用于生成项目模板
  tiny插件 ---- 用于拓展tiny功能

? 输入套件/插件名称(tiny-toolkit-/tiny-plugin- 开头) (tiny-toolkit-mytest)
```

选完类型和组件名称后，tiny会自动将项目模板初始化到你当前的文件夹内，并安装项目所需的依赖包。

耐心等待一分钟，会出现如下提示，说明你组件开发环境已经初始化成功了，可用你熟悉的IDE进行组件开发。

```
--------------------初始化成功,请按下面提示进行操作--------------------

$ tiny start         # 可一键开启项目开发环境
$ tiny help          # 可查看当前套件的详细帮助

--------------------技术支持: xxx--------------------
```

#### 2. 启动开发
执行`start`命令可以启动本地项目开发：
```
$ tiny start
```

#### 3. 代码编译构建

当组件开发完成后，可以将代码进行打包及构建。

```
# 代码构建
$ tiny build
```


tiny build 不是必须的，在发布组件时，tiny也会自动执行构建。


#### 总结

基于tiny的项目套件，均遵循一致的开发规范。

```
# 初始化项目
$ tiny init

# 开启dev服务
$ tiny start

# 构建代码
$ tiny build
```

基于tiny，只需熟悉一个项目后，即可掌握所有的tiny项目开发流程。


若不知道当前套件支持哪些命令，可使用 `tiny help` 命令进行查看。



<h2 id='oldProject'>老项目使用</h2>

基于新项目的开发流程，相信您已经体验到了tiny带来的开发便捷。对于我们大量的存量项目，这些项目如何快速的接入tiny的开发体系呢？

#### 1. 创建基础配置文件

在项目根目录下创建`tiny.config.js`文件，然后输入如下内容(tiny项目的运行，依赖`tiny.config.js`文件)：

```js
//tiny.config.js
module.exports = {                                
    tasks:{                                        
        start: [
            {                                 
                command: 'tiny xxxx',           
            }, 
            {                                      
                command: 'node xxxx.js',            
            }
        ],                                      
        build:[                                   
            {                                     
                command : 'npm run build',        
            },                                    
        ],                                        
    },                                            
};
```


其中tasks字段是，我们TinyCLI的核心任务流功能，关于任务流，可以[`查看详细的任务流文档`](/tiny-cli/docs/guide/task)


#### 2. 补充构建脚本

我们很多项目都要执行类似`npm run start` 、`npm run dev`之类的命令启动服务。我们将对应启动服务的任务加到我们的`task.start` 里面来。

假设，我们之前启动服务的任务是如下代码：

```
webpack-dev-server --port 9000 --watch --content-base src/ --mode development
```

那么，则将该命令写至`tiny.config.js`文件中：

```js
module.exports = {                                
    tasks:{                                        
        start: [{   
            // 启动服务                                   
            command: 'webpack-dev-server --port 9000 --watch --content-base src/ --mode development', 
        }],                                      
        // ...                                        
    },                                            
};
```

那么，在本地执行`$ tiny start`时，tiny会依次顺序执行上面 `command` 里的命令。

然后将`build`和`publish`命令也补齐。

#### 3. 使用额外命令

tiny配置文件中的`task`字段，对应的就是 tiny 执行的命令。

比如我们新建一个叫 eslint 的任务，那么我们继续修改`tiny.config.js`如下：

```js
module.exports = {                                
    tasks:{                                        
        start: [{   
            // 启动服务                                   
            command: 'webpack-dev-server --port 9000 --watch --content-base src/ --mode development', 
        },],                                      
        // eslint任务流
        eslint:[{
          // 执行eslint
          command: './node_modules/.bin/eslint . --ext .js.ts --fix'
        }]                                        
    },                                            
};
```

那么我们在根目录下即可执行 `$ tiny eslint` 来调用这个任务了。
