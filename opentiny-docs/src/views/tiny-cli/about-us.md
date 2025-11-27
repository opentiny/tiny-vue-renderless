<h1 id='about'>About</h1>

---
<h2 id='definition'>What is TinyCLI？</h2>

TinyCLI is the core tool for front-end engineering. It aims to provide developers with a series of robust tools, suites, plug-ins, and workflows. Based on a unified development environment, the development process of the team is consistent and replicable.

Tiny CLI provides [`yeoman`](http://yeoman.io/)-like scaffolding capabilities，Let you quickly build a local development environment; In addition, the plug-in mechanism similar to [`gulp`](http://gulpjs.com/) is provided to solve various problems during front-end development.

The design idea of TinyCLI is derived from npm, which does not have many functions and is just a package management tool. The same applies to TinyCLI. TinyCLI does not have any engineering capabilities. TinyCLI only provides a platform for you to write suites (scaffolding) and plug-ins. The platform can install, manage, and run corresponding suites or plug-ins.

<h2 id='features'>Functions and Features</h2>

1. 💻 **Cross-platform**，Compatible with Windows, Mac, and Linux platforms
2. 🛠 **Plug-in system**，Rich efficiency plug-ins, trusted plug-ins, and process plug-ins, covering all lifecycles from development to build to release
3. 📦 **Out of the box**，Provide project solutions based on mainstream business scenarios based on project development best practices accumulated from rich experience
4. ⏳ **Task flow mechanism**，Provides a more powerful task flow running mechanism than npm scripts
5. 🏹 **Automatic upgrade**，No need to manually install and upgrade plug-ins, all of this is automated

Tiny CLI has a lot more features than that, and more features are waiting to be discovered.

<h2 id='select'>Why choose TinyCLI ?</h2>

What kind of cli is needed for a front-end team? Let's think about the following scenarios:

1. **Diversified technology stacks**：a front-end team usually has more than one project template, such as the vue-based single-page application template, PEP page and floor component development template, nodejs project development template, and XXX service development template.**How to enable cli to support multiple service forms and have good scalability?**
2. **A large number of installed base projects**：The engineering process of a team is definitely accumulated and improved. For example, some business projects have a long history of using jq and may not need to be compiled.**How to enable the CLI tool to be compatible with inventory projects?**
3. **Implementation effect assurance**：Currently, most teams have R&D specifications. In many cases, specifications are like a gust of wind. When leaders grasp them, everyone is observing them. However, they will gradually return to their original position. People are always lazy，**How to ensure the implementation and execution effect of regulations based on the CLI?**
4. **Common project issues**：For example, each project may have the environment and configuration of eslint and pretter code specifications and formats. The issues related to the corporate environment, such as code review and code release, are common issues of the project. Should each set of engineering templates develop a set of these environments? Can these common problems be abstracted through plug-ins, middleware, or other slicing methods and initialized or used separately?
5. **Project Escalation Issues**：The front-end technology is changing rapidly, and the most commonly used webpack is webpack 4，**How Do I Upgrade the Technology Stack in Batches for Initialized Projects？**Another example is the eslint specification. The specification is updated. How to ensure that the eslint configuration file of each project is upgraded and how to quickly fix project bugs.
6. **Environment Fault Tolerance Issues**：Many Node.js environment problems may occur during development, such as port usage, webpack building failure, and missing dependency packages，**Can cli-based environmental problems be solved more elegantly**，Enable developers to focus on services？
7. **Big data statistics**：Everyone's using this tool，**Which of the following methods can be used to collect common information？**For example, what common npm packages do your projects rely on? What is the eslint pass rate of your projects? You can even use this tool to see which time period you are focusing on.

Each team has different business characteristics and many scenarios. Defining core scenarios is the prerequisite for designing a CLI that meets team requirements.
The core idea of tiny-cli is to provide suites, plug-ins, and task flows. Teams and users can split suites and plug-ins based on their core scenarios to solve various scenario problems：

<h3 id='kit'>Kit</h3>

Template management is one of the core functions of the cli tool. Template management is easy to understand. The famous yeoman is estimated to have been used by many people. One of his core capabilities is to install various generators to enrich his ecosystem. This platform-based architecture has the greatest benefit：**The front end can participate in the tool ecosystem to build templates and cope with various projects. The scalability is high**.

In addition, the tiny-cli suite provides more control and flexibility than yeoman through common commands and task flow functions.

<h3 id='plugin'>Plug-in</h3>

The concept of plug-ins is slightly different from that of templates. Templates are mainly used for project-level affairs, such as project initialization, packaging, and compilation.And the plug-in focuses on**Solve common issues between projects**，As in the fourth point of the above scenario. For example, an eslint plug-in, which can contain：

1. Initializing the eSlint Running Environment
2. Run eslint
3. Add git hooks to the project. When the git commit command is executed, eslint is automatically triggered

Based on this plug-in, you can quickly access eslint no matter what project you are in. Similarly, based on the plug-in mechanism, we can develop various project plug-ins, such as：

1. Efficiency improvement: mock service plug-ins, frontend resource proxy plug-ins, and frontend project dependency analysis plug-ins.
2. Process optimization: Git operation encapsulation plug-ins, front-end resource release CDN plug-ins, etc
3. Quality assurance: console detection plug-ins, quick test environment setup plug-ins, and prettier plug-ins.
