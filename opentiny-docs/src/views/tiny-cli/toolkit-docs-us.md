<h1 id='dev'>Docs Kit</h1>

---
> Tool for quickly generating the official website of the component library. It supports the `ng` and `vue` technology stack components


<h2 id='view'>Application Scenarios</h2>

Used to develop the official website of the component library.

<h2 id='use'>Usage</h2>

<h3 id='init'>Initialize</h3>

```bash
tiny init docs 
```

<h3 id='tech'>Selecting a Technology Stack</h3>

Supports the `ng` and `vue` technology stack components. The `ng` uses the `web component` principle to render components

```bash
? Select the technology stack to be used (Use arrow keys)
> vue
  angular
```

<h3 id='integration'>Selecting the component sample integration mode</h3>

The component sample can be either local to the project or a `npm` package

```bash
? Select a component sample integration mode (Use arrow keys)
> Local path
  npm
```

<h3 id='localPath'>Enter the path for storing the component example</h3>

If the component sample is local to the project, enter the directory name

```bash
? enter the path for storing the component example (demos)
```

<h3 id='npmPath'>Enter the name of the component sample package</h3>

If the component example is an `npm` package, enter the package name

```bash
? Please enter the name of the component sample package (@opentiny/tinydoc-ng-tiny)
```

<h3 id='dependencie'>Enter the dependency package name of the component example</h3>

If the example has dependency, enter the dependency package name. If the example does not have dependency, press Enter

```bash
? Enter the component example dependency package name. This parameter is optional
```

<h3 id='base'>Enter the application access path</h3>

Application access path, which is displayed in the address box of the browser

```bash
? Enter the application access path (tiny-ng)
```

<h3 id='start'>Application Startup</h3>

```bash
tiny start
```

<h3 id='build'>Application building</h3>

```bash
tiny build
```

<h2 id='rules'>Component Sample Specification</h2>

Whether the component sample is placed locally in the project or in an `npm` package, the sample specification must comply with the sample specification, which contains the directory structure and content.

<h3 id='folder'>Directory Specification</h3>

```bash
|-- directory name
    |-- app (contains static resources and internationalization files)
    |   |-- button（button component）
    |   |   |-- webdoc
    |   |   |   |-- button.cn.md（chinese description of the button component markdown）
    |   |   |   |-- button.en.md（English description of the button component markdown）
    |   |   |   |-- button.js（all examples and API description files of the button component）
    |   |   |   |-- button-standard.zh-CN.md（chinese description markdown of the button component. This file is optional）
    |   |   |   |-- button-standard.en-US.md（english description markdown of the button component. This file is optional）
    |   |   |   |-- button-basic.zh-CN.md（the button-basic example describes markdown in Chinese. If the example description may contain complex formats such as tables, you are advised to use the example MD file. For a simple description, see the desc field in the button.js file）
    |   |   |   |-- button-basic.en-US.md（the button-basic example describes markdown in English. If the example description may contain complex formats such as tables, you are advised to use the example MD file. For a simple description, see the desc field in the button.js file）
    |   |   |-- button-basic Sample Source Code
    |   |   |-- Example 2: Source code
    |   |   |-- Example 3: Source code
    |   |-- xxx component
    |-- overviewimage  (component thumbnail)
    |   |-- button.svg (button component thumbnail)
    |   |-- xxx.svg (xxx component thumbnail)
    |-- webdoc
    |   |-- xxx.md (component library documentation markdown)
    |   |-- menu.js (official website menu of the component library)
    |-- scripts（only the ng technology stack has this directory）
    |   |-- web-components.js (Component library example: packaged web component)
    |   |-- assets (the component library depends on static resources)
    |-- config.js（mobile or not）
```

<h3 id='folder'>content specifications</h3>

The content specification consists of two parts based on the technology stack: `ng` technology stack [For details, see](/public/assets/sample-code/tiny-toolkit-docs-ng-demos.zip)，`vue`technology stack [For details, see](/public/assets/sample-code/tiny-toolkit-docs-vue-demos.zip)，decompress the package to the command execution directory.

The component document supports the tile and tab modes. To display the specification example of the component, you can add the `standard` field to the component specification file. The document displays the specification page description file first. If the corresponding file is not found, the specification page link is displayed.

For example `button.js` :
```bash
export default {
    title: "Button Button component",
    standard: {
        "zh-CN": {
            file: "button-standard.zh-CN.md",
            link: "https://opentiny.design",
        },
        "en-US": {
            file: "button-standard.en-US.md",
            link: "https://opentiny.design",
        },
    },
    ...
}
```

Example descriptions can be simple or complex. If the example description contains complex forms such as tables, you are advised to use the description file. The description file is preferentially displayed.

For example `button.js` :
```bash
export default {
  title: "Button Button component",
  demos: [
    {
      demoId: "button-color",
      name: {
        "zh-CN": "按钮颜色",
        "en-US": "button color",
      },
      desc: {
        "zh-CN": "<p>通过属性<code>color</code>配置按钮颜色，包含<code>default</code>、<code>danger</code>、<code>primary</code>三种类型。",
        "en-US": "<p>button color</p>",
      },
      descFiles: {
        "en-US": "button-color.en-US.md",
        "zh-CN": "button-color.zh-CN.md",
      },
      ...
    },
  ]
}
```
