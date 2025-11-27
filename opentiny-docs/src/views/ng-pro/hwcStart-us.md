<h1 id='quick'>Quick Start</h1>

---

Quick start demonstrating a simple `hello world` application.

<h2 id='background'>Background knowledge</h2>

- Understand and use common cloud services！
- Experience in developing `Node.js`！
- Front-end development experience！

<h2 id='work'>Preparations</h2>

Quick Start is based on`cloud service plug-ins`，Please move`cloud service plug-ins`[`Preparations`](/ng-pro/docs/advanced/hwcPlugin#work).

<h2 id='chart'>Flowchart</h2>

![process.png](/src/assets/images/ng-pro/process.png)

<h2 id='step'>Steps</h2>

<h3 id='create'>1. Creating an Application</h3>

Recommended<a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>develop tools to initialize an Angular application.

```bash
tiny init pro
```

Configure the project name, project description, and technology stack （select"**select**"）
```
 ? Enter a project name： 
 ? Please enter Project Description: (Mid-back-end system created based on TinyPro suite)
 ? Please select the technology stack you want to use： (Use arrow keys)
 > vue
   angular
```

<h3 id='install'>2. Install<a href="/ng-pro/docs/advanced/hwcPlugin">cloud service plug-ins</a> and initialized</h3>

In the previous step, an Angular application is created. The next step is to create a backend service for the application through the cloud service plug-in.

```bash
tiny hwc configure
```

> [Click here](/ng-pro/docs/advanced/hwcPlugin#configure)Learn more about plug-in initialization.

<h3 id='library'>3. Install<a href="/ng-pro/docs/advanced/hwcClient#setplugin">Cloud service client library</a>and initialized</h3>

`Cloud service client library`provides a powerful library, which shields complex cloud service interconnection and lowers the threshold for front-end and back-end interconnection.

```bash
> npm i @opentiny/hwc-client
```

You are advised to add the cloud service client library configuration to the application entry file `main.ts`.

```typescript
import { HwcClient } from '@opentiny/hwc-client';
import config from '../hwc-exports.json';

HwcClient.configure({
  ...config.hwcConfig,
});
```

<h3 id='flow'>4. Creating a functionGraph instance</h3>

Creating a function workflow instance involves creating a[`FunctionGraph`](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)instance, writing function code, and associating function code.

#### 4.1 Create[`FunctionGraph`](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)Instance

```bash
> tiny hwc fg create
--------------------Start creating the function workflow. Follow the instructions below--------------------

? Enter a function name fg_hello_world
? Select a version FunctionGraph v2
? Select an execution environment Node.js14.18
? Please select the running memory 256Mb
? Please enter the timeout period 300
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: The function workflow is created successfully
```

<h4 id='write'>4.2 Compiling Function Code</h4>

Create the `cloudfunctions` folder in the current directory, create the `index.js` file, and add the following code

```js
exports.handler = async (event, context) => {
  const output = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json'
    },
    isBase64Encoded: false,
    body: 'Hello World From Huawei Cloud!'
  };

  return output;
};

```

<h4 id='association'>4.3 Association Function Code</h4>

```bash
> tiny hwc fg update
--------------------Start updating the function workflow--------------------

? Select the function to be updated fg_hello_world
? Please enter the directory for the local code cloudfunctions/helloWorld
? Select a dependency package
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: succeeded in updating the function workflow
```

<h3 id='api'>5.succeeded in updating the function workflow</h3>

```bash
> tiny hwc apig create
--------------------Start creating the API gateway, Perform the following operations--------------------

? If there are xx API gateway groups in the current region, determine whether to associate them with existing API gateway groups. (Enter n to enter the API gateway group creation process)？ Yes
? Select a group group_hello_world
? Enter an API name apig_hello_world
? Select a public API
? Please select a request  protocol HTTPS
? Select a matching mode  An absolute match
? Please enter the request path  /hello-world
? Please select a request mode  GET
? Whether to support cross-domain？ Yes
? Select an authentication mode  No certification
? Select a function in the function workflow as the backend service  fg_hello_world
? Select the function invoking type  Synchronize
? Entering a backend function timed out 5000
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: API Gateway created successfully
```

> During the creation process, the user is asked to select a function workflow instance in step 4.

<h3 id='hello'>6.API Gateway Instance Called by Page，show hello world</h3>

```typescript
import { Component } from '@angular/core';
import { HwcClient } from '@opentiny/hwc-client';

@Component({
  selector: 'app-hello-world',
  template: `{{ text }}`,
})
export class HelloWorldComponent implements OnInit {
  text: string  = '';

  async ngOnInit(): Promise<void> {
    const res = await HwcClient.apigClient.exec('group_hello_world', 'apig_hello_world', {});

    this.text = await res?.text();
  }
}
```

> [Click here](/ng-pro/docs/advanced/hwcClient#apigClient)，Parameters for viewing the `exec` method.

<h3 id='video-md'>Video Help</h3>
