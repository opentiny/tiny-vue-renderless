<h1 id='overview'>Overview</h1>

---

It is a complete set of enterprise-level mid-range and back-end front-end/design solutions encapsulated based on HUAWEI CLOUD <a href="/tiny-ng/overview" target="_blank" rel="noopener noreferrer">`TinyNG` component library an <a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`, based on the design specifications and basic components, continue to build upwards, and extract typical templates, service components, and auxiliary design resources, further enhance the experience of 『users』 and 『designers』 in the process of enterprise-level mid- and back-end product design and development. To better use the resources of cloud services, it integrates [`Cloud Service Client Library`](/ng-pro/docs/advanced/hwcClient)Used to connect HUAWEI CLOUD and ['cloud service plug-ins'](/ng-pro/docs/advanced/hwcPlugin)Used to manage and use your cloud service resources.

<h2 id='knowledge'>Background knowledge</h2>

`TinyPro of Ng` As a front-end scaffolding, the default reader already understands some front-end basics and understands<a href="https://angular.io/" target="_blank" rel="noopener noreferrer">`Angular`</a>、<a href="/tiny-ng/overview" target="_blank" rel="noopener noreferrer">`TinyNG`</a>and<a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>。

<h2 id='Preparations'>Preparations</h2>

The `TinyPro of Ng` front-end scaffolding is a `TinyCLI` package-based kit, so you need to install the `TinyCLI` first, which you can obtain here<a href="/tiny-cli/docs/use-install" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>How to install.

<h2 id='init'>Initialize</h2>

We provide a kit to quickly initialize the scaffolding.

```bash
tiny init pro
```

Configure the project name, project description, and technology stack (select **angular**)
```
 ? Enter a project name： 
 ? Please enter the project description： (middle and back-end systems created based on the TinyPro suite)
 ? Please select the technology stack you want to use： (Use arrow keys)
 > vue
   angular
```

<h2 id='development'>development</h2>

After the scaffold is successfully initialized, you can start development. We provide some commands to assist development.

***`tiny start`***

Running this script will start the service and automatically open the default browser to display your page. When you re-edit the code, the page refreshes automatically.

![start.webp](/src/assets/images/ng-pro/ng-start.webp)

***`tiny build`***

Running this script will compile your project. You can find the compiled files in the dist directory of your project for deployment.

![build.webp](/src/assets/images/ng-pro/ng-build.webp)

<h2 id='cloud'>Cloud service capability</h2>

Please move『Advanced』[Cloud Service Best Practices](/ng-pro/docs/advanced/hwcPractice)chapters，learn more about cloud service capabilities.

