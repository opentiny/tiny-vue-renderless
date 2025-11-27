<h1 id='structure'>Directory structure</h1>

---

A good project catalog organization can make your project clearer.

<h2 id='directory'>Table of contents</h2>

When you initialize the project，You can see the project directory structure of `TinyPro of Vue` as follows：

```bash
├── node_modules  (Provides npm packages for the entire workspace)
├── src  (Page code)
├── env (Environment variable configuration)
├── .editorconfig
├── .eslintrc.js
├── .gitignore
├── config (Specify the default configuration of the CLI for all items in the workspace)
├── package.json  (Configure the npm package dependencies available to all projects in the workspace)
├── README.md
├── tsconfig.json  (Basic TypeScript configuration for all projects in the workspace)
```

<h3 id='page'>Page code structure</h3>

The page code is stored in the `src` directory，for most cases，you only need to develop files in the `src` directory.
It is recommended that you be in the development process，adhere to the existing directory structure，to make the organizational structure of the project code more standardized。

> If a component is dependent on multiple pages，we recommend you put in `src/components`；
> If only a component depends on a single page，we recommend that you place it in the nearest `view` directory.

```bash
|-- src
    |-- index.html  (Main HTML page)
    |-- main.ts  (Main mounting entry of an application)
    |-- api  (File containing interface and mock data)
    |-- assets (Include static resources，internationalization and other documents)
    |   |-- style
    |   |-- img
    |-- components  (Contains encapsulated component files)
    |   |-- breadcrumb (Routing breadcrumbs)
    |   |-- footer (bottom)
    |   |-- global-setting (page accompanying)
    |   |-- menu (route menu)
    |   |-- navbar (Head navigation)
    |   |-- theme (theme switch in the lower right corner)
    |-- directive (custom instruction)
    |-- hooks (custom hook)
    |-- layout (page layout)
    |-- locale  (internationalization configuration file)
    |-- mock  (mock data)
    |-- router  (router config)
    |-- store  (status management defined by pinia)
    |-- types  (ts definition type)
    |-- utils  (global method)
    |-- views  (project page)
    |   |-- board (dashboard page)
    |   |-- exception (exception page)
    |   |-- form (form page)
    |   |-- list (list page)
    |   |-- login (login page)
    |   |-- not-found (404 page)
    |   |-- profile (detail page)
    |   |-- result (result page)
    |   |-- user (personal center)
    |-- env (include build configuration options for a specific target environment)
```
