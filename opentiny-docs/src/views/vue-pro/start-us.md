
<h1 id='overview'>Overview</h1>

---
 **TinyPro of Vue** is a complete set of enterprise-level mid- and back-end front-end/design solutions based on HUAWEI CLOUD TinyVue component library，
 continue to build upwards，extract typical templates/service components/auxiliary design resources，Further enhance the experience of 『users』and『designers』in the process of enterprise-level mid- and back-end product design and development.
 In addition, it integrates [`Cloud Service Client Library`](/vue-pro/docs/advanced/library) to better use cloud service resources, 
 used to connect HUAWEI CLOUD and ['cloud service plug-ins'](/vue-pro/docs/advanced/plugin)used to manage and use your cloud service resources.
 <br/>
 
 <h2 id='knowledge'>Background knowledge</h2>

`TinyPro of Vue` As a front-end scaffolding, the default reader already knows some front-end basics，and understand[`Vue`](https://cn.vuejs.org/)、[`Tiny Vue`](/tiny-vue)和[`TinyCLI`](/tiny-cli/home).

<h2 id='Preparations'>Preparations</h2>

`TinyPro of Vue` front-end scaffolding is a `TinyCLI` package-based kit，and therefore，First of all, install`TinyCLI`，You can access it by clicking here[`TinyCLI`](/tiny-cli/docs/use-install)How to install.

<h2 id='init'>Initialize</h2>

Kits are provided to quickly initialize the scaffolding.

```bash
tiny init pro
```

Configure the project name, project description, and technology stack（select"**vue**"）
```
 ? Enter a project name： 
 ? Please enter the project description： (middle and back-end systems created based on the TinyPro suite)
 ? Please select the technology stack you want to use： (Use arrow keys)
 > vue
   angular
```

<h2 id='development'>development</h2>

After the scaffold is successfully initialized, development can begin，we have provided some commands to assist in development.

***`tiny start`***

Running this script will start the service，automatically open the default browser to display your page.When you re-edit the code，the page is also automatically refreshed.

 ![start.webp](/src/assets/images/vue-pro/start.webp)

***`tiny build`***

Running this script will compile your project，you can find the compiled files in the dist directory of your project for deployment.

 ![build.webp](/src/assets/images/vue-pro/build.webp)


<h2 id='cloud'>Cloud service capability</h2>

Please move『advanced』[`Cloud Service Best Practices`](/vue-pro/docs/advanced/practiced)chapters，learn more about cloud service capabilities.
