<h1 id='structure'>Directory Structure</h1>

---

A good project catalog organization can make your project clearer.

<h2 id='directory'>Directory</h2>

When you initialize the project, you can see that the project directory structure for `TinyPro of Ng` is as follows:

```bash
├── node_modules  (provides npm packages for the entire workspace)
├── src/  (Page Code)
├── .browserslistrc
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── angular.json  (specify the default configuration of the CLI for all items in the workspace)
├── karma.conf.js
├── package.json  (configure the npm package dependencies available to all projects in the workspace)
├── README.md
├── tsconfig.app.json
├── tsconfig.json  (basic TypeScript configuration for all projects in the workspace)
├── tsconfig.spec.json
```

<h3 id='page'>Page Code Structure</h3>

The `src` directory contains the page code. In most cases, you only need to develop the files in the `src` directory.
It is recommended that you comply with the existing directory structure during development to standardize the organizational structure of project codes.

> If a component depends on multiple pages, you are advised to place it in `src/app/@shared/components`.
> If only a component depends on a single page, you are advised to place the component in the nearest `widget` directory.

```bash
|-- src
    |-- favicon.ico
    |-- index.html  (main html page)
    |-- main.ts  (main entry points of the application)
    |-- polyfills.ts  (Putty (polyfill) script for browser support)
    |-- styles.scss  (CSS file that provides styles for the project)
    |-- test.ts  (main entry point for unit tests)
    |-- app  (contains component files that define application logic and data)
    |   |-- app-routing.module.ts
    |   |-- app.component.ts
    |   |-- app.module.ts
    |   |-- @core (mock data and singleton services shared to the entire application service)
    |   |-- @shared  (Pipes, layouts, common methods, components, and data types)
    |   |-- pages (feature modules, such as the console home page)
    |       |-- menu.ts
    |       |-- pages-routing.module.ts (configuring module routes)
    |       |-- pages.component.html
    |       |-- pages.component.scss
    |       |-- pages.component.ts
    |       |-- pages.module.ts
    |       |-- console-home (console home page module)
    |       |   |-- console-home.component.html
    |       |   |-- console-home.component.scss
    |       |   |-- console-home.component.ts
    |       |   |-- console-home.module.ts
    |       |   |-- widgets
    |       |-- ... (other pages)
    |-- assets (contains static resources and internationalization files)
    |   |-- i18n
    |   |-- img
    |-- config (include language profile)
    |-- environments  (include build configuration options for a specific target environment)
```
