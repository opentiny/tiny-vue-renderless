<h1 id='FAQ'>Frequently Asked Questions</h1>

---
<h2 id='yeoman'>What is the difference between TinyCLI and Yeoman or other scaffolding?</h2>
TinyCLI provides Yeoman-like scaffolding capabilities through suites to create a new project development environment, as well as plug-ins, task flows, dependency installations, automatic updates, and more.

<h2 id='distinguish'>What is the difference between TinyCLI plug-ins and suites?</h2>
- Suite: A suite is a standard development solution for a specific service. A project can be initialized by running one command. Suite commands cover the process from project initialization to code release and go-live.
- Plug-in: Plug-in focuses on a single function and solves scattered and repetitive tasks in work. Execute in any directory, out of the box. For example, you can create a common eslint plug-in to add eslint checks for front-end projects。

<h2 id='tiny-i'>Can the tiny i command replace the npm i command?</h2>
Yes. The `tiny i` package provides the dependency installation management capability through the [npminstall](https://github.com/cnpm/npminstall) package. Compared with the install function provided by the npm, the npminstall is faster and occupies less space.

- npminstall@1.2.0
- pnpm@0.18.0
- npm@2.14.12

cli | real | user | sys
--- | ---  | ---  | ---
npminstall | 0m10.908s | 0m8.733s | 0m4.282s
npminstall with cache | 0m8.815s | 0m7.492s | 0m3.644s
npminstall --no-cache | 0m10.279s | 0m8.255s | 0m3.932s
pnpm | 0m13.509s | 0m11.650s | 0m4.443s
npm | 0m28.171s | 0m26.085s | 0m8.219s
npm with cache | 0m20.939s | 0m19.415s | 0m6.302s

If you want to continue using `npm install`, delete node_modules and use `npm i` to install the dependency again.