<h1 id='start'>Get Started Quickly</h1>

---
<h2 id='Installed'>Tool Installation</h2>


TinyCLI depends on the Node.js, NPM, and Git environments. If you have not installed the front-end development environment, install it by referring to this document.

<h3 id='node'>Security Node. js with NPM</h3>

If Node.js and NPM have been installed, skip this step.

Go to [`Node.js official website`] (https://nodejs.org/en/) to download the Node.js installation package and install it.

To check whether the installation is successful, run the following command on the CLI to check the Node.js version and NPM version:

```
$ node -v
v16.18.1
$ npm -v
8.19.2
```

<h3 id='git'>Installing Git</h3>

Open [`Git Chinese website`](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)，download and install the corresponding version.

Run the following command on the CLI to check whether the installation is successful:

```
$ git --version
git version 2.22.0.windows.1
```

<h3 id='cli'>Installing TinyCLI</h3>

```bash
$ npm install @opentiny/cli -g
```

Note: If a message is displayed indicating that the mac user does not have the permission, add the `sudo` command before the mac user.

To check whether the installation is successful, run the following command in the command line to check the version of Tiny:

```bash
$ tiny -v
tiny v1.x.x
```

<h3 id='problem'>Problems that may occur during the installation</h3>

1、Command not found

After the `tiny -v` command is executed, the following error message is displayed:：

```
'tiny' is not an internal or external command, nor is it an executable program or batch file.
```

This error indicates that `npm` is not added to the system variable, causing `tiny` to be unusable. Solution:

(1) Run `npm config get prefix` on the CLI. Check the bin path of the NPM.  
(2) Add the printed path to the system environment variable `PATH` and restart the CLI tool.


---
<h2 id='newProject'>New project usage</h2>

#### 1. Initializing a project

Use the `$tiny init` command to select the project type you want to develop.

```bash
$ tiny init
? Please select a suite suitable for your project to initialize: (Use arrow keys)
>   dev  ----------  Developing tiny-cli suites and plug-ins
    pro  ----------  Out-of-the-box mid-front end/design solution
    docs ----------  Suite for developing the official website of the component library
```

The first `dev suite: developing the tiny-cli suite and plug-in' is used as an example for initialization. The kit will let you choose a specific component type：

```
? Please select the template you want to initialize (Use arrow keys)
> Tiny Mantle ---- Used to generate project templates
  Tiny plug-in ---- Used to extend the Tiny function

? Enter Suite/Plug-In Name(tiny-toolkit-/tiny-plugin- for the beginning) (tiny-toolkit-mytest)
```

After selecting the type and component name, Tiny automatically initializes the project template to your current folder and installs the dependency packages required by the project.

Wait patiently for one minute. If the following information is displayed, the component development environment has been initialized successfully. You can use the IDE that you are familiar with to develop components.

```
--------------------Initialization succeeded,Follow the instructions below--------------------

$ tiny start         # One-click start of the project development environment
$ tiny help          # You can view the detailed help of the current suite

--------------------Technical Support: xxx--------------------
```

#### 2. Start Development
Run the `start` command to start local project development：
```
$ tiny start
```

#### 3. Compiling and Building Codes

After the component is developed, you can package and build the code.

```
# Code building
$ tiny build
```


Tiny build is not mandatory. When a component is released, Tiny build is automatically executed.


#### Summarize

Tiny-based project suites comply with consistent development specifications.

```
# Initializing a project
$ tiny init

# Enable the dev service
$ tiny start

# Build Code
$ tiny build
```

Based on Tiny, you can master all Tiny project development processes after you are familiar with a project.


If you do not know which commands are supported by the current suite, run the `tiny help` command to view the commands.



<h2 id='oldProject'>Used in old projects</h2>

Based on the development process of the new project, I believe you have experienced the development convenience brought by Tiny. For our large number of installed base projects, how can these projects quickly connect to Tiny's development system?

#### 1. Creating a Base Profile

Create the `tiny.config.js` file in the root directory of the project，Then enter the following information: (The running of the tiny project depends on the `tiny.config.js` file)：

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


where the tasks field is the core task flow function of our TinyCLI，About Task Flows You can [`View Detailed Task Flow Documentation`](/tiny-cli/docs/guide/task)


#### 2. Supplement the build script

In many projects, commands such as `npm run start` and `npm run dev` need to be executed to start services.Add the task of starting the service to our `task.start`.

Assume that the task of starting the service is as follows:

```
webpack-dev-server --port 9000 --watch --content-base src/ --mode development
```

Then write the command to the `tiny.config.js` file：

```js
module.exports = {                                
    tasks:{                                        
        start: [{   
            // Start the service                                   
            command: 'webpack-dev-server --port 9000 --watch --content-base src/ --mode development', 
        }],                                      
        // ...                                        
    },                                            
};
```

When you run `$tiny start` on the local host, Tiny executes the commands in `command` in sequence

Then the `build` and `publish` commands are also supplemented.

#### 3. Use Extra Commands

The `task` field in the Tiny configuration file corresponds to the command executed by Tiny.

For example, we create a task called eslint，Modify `tiny.config.js` as follows:

```js
module.exports = {                                
    tasks:{                                        
        start: [{   
            // Start the service                                   
            command: 'webpack-dev-server --port 9000 --watch --content-base src/ --mode development', 
        },],                                      
        // eslint office
        eslint:[{
          // execute eslint
          command: './node_modules/.bin/eslint . --ext .js.ts --fix'
        }]                                        
    },                                            
};
```

Then we can execute `$tiny eslint` in the root directory to invoke this task.
