<h1 id='practiced'>Cloud Service Best Practices</h1>

---

The best practice demonstrates a typical list page, including basic operations such as adding, deleting, querying, and modifying, to show developers the popular development mode `serverless`. It features cloud resource linkage, elastic scaling, pay-per-use, and fast deployment. This document is based on HUAWEI CLOUD services such as `Cloud Database`、`Cloud FunctionGraph`、 `Cloud API Gateway`, setting Up a Simple `HUAWEI CLOUD Serverless Development Environment`.

<h2 id='backgroundknowledge'>Background knowledge</h2>

- Know and use common cloud services!
- Experience in developing `Node.js`！
- Front-end development experience！

<h2 id='serverless'>Serverless Development Mode Based on HUAWEI CLOUD</h2>

![quick.png](/src/assets/images/vue-pro/quick.png)

<h2 id='Preview'>Effect Preview</h2>

The best practice demonstrates typical add, delete, query, and modify operations to familiarize developers with the serverless development mode and code path`src/view/cloud/contracts`。
![contracts.png](/src/assets/images/vue-pro/contracts.png)

<h2 id='Preparations'>Preparations</h2>

Best practices are based on`cloud service plug-ins`，please move`cloud service plug-ins`[`preparations`](/vue-pro/docs/advanced/plugin#work)。

<h2 id='step'>Steps</h2>

<h3 id='createapp'>1. creating an application</h3>

Recommended<a href="/tiny-cli/home" target="_blank" rel="noopener noreferrer">`TinyCLI`</a>Develop tools to initialize a Vue application.

```bash
tiny init pro
```

Configure the project name, project description, and technology stack（select"**vue**"）
```
 ? Enter a project name： 
 ? Please enter the project description： (Middle and back-end systems created based on the TinyPro suite)
 ? Please select the technology stack you want to use： (Use arrow keys)
 > vue
   angular
```

<h3 id='installcloud'>2. install<a href="/vue-pro/docs/advanced/plugin">cloud service plug-ins</a>and initialized</h3>

In the previous step, an Angular application is created. The next step is to create a backend service for the application through the cloud service plug-in

```bash
tiny hwc configure
```

> [`click here`](/vue-pro/docs/advanced/plugin#configure)learn more about plug-in initialization.

<h3 id='installhwcClient'>3. Install<a href="./library">cloud service client library</a>and initialized</h3>

`cloud service client library`provides a powerful library, which shields complex cloud service interconnection and lowers the threshold for front-end and back-end interconnection.

```bash
> npm i @opentiny/hwc-client
```

You are advised to add the `cloud service client library configuration` to the application entry file `main.ts`.

```typescript
import { HwcClient } from '@opentiny/hwc-client';
import config from '../hwc-exports.json';

HwcClient.configure({
  ...config.hwcConfig,
});
```

<h3 id='createcase'>4. Creating a database instance</h3>

Creating a database instance involves [`RDS`](/vue-pro/docs/advanced/plugin#RDS)、[`VPC`](/vue-pro/docs/advanced/plugin#private) and[`EIP`](/vue-pro/docs/advanced/plugin#EIP).

#### 4.1 create[`VPC`](/vue-pro/docs/advanced/plugin#private)instance

```bash
> tiny hwc vpc create
```

> When creating an RDS instance, you need to associate it with a VPC instance.

#### 4.2 Creating a security group

> By creating a security group, you can divide ECSs in a VPC into different security zones to improve ECS access security. 
> <a href="https://support.huaweicloud.com/usermanual-vpc/zh-cn_topic_0013748715.html" target="_blank" rel="noopener noreferrer">Creating a security group</a>

#### 4.3 create[`EIP`](/vue-pro/docs/advanced/plugin#EIP)instance

```bash
> tiny hwc eip create
```

>After an `RDS` instance is created, you need to associate it with an `EIP` instance.

#### 4.4 create[`RDS`](/vue-pro/docs/advanced/plugin#RDS)instance and association[`EIP`](/vue-pro/docs/advanced/plugin#EIP)instance

```bash
> tiny hwc mysql create
```

> When creating a DB instance, you will be asked about the DB engine type. HUAWEI CLOUD `RDS` supports three engines: MySql, `PostgreSQL`, and `Microsoft SQL Server`. In the best practice, select `MySql`.

#### 4.5 association[`EIP`](/vue-pro/docs/advanced/plugin#EIP)instance

```bash
> tiny hwc mysql eip
```

#### 4.6 Associate a security group

> To ensure database security and stability, you need to set a security group before using RDS DB instances.<a href="https://support.huaweicloud.com/qs-rds/rds_02_0004.html" target="_blank" rel="noopener noreferrer">RDS setting up a security group</a>

#### 4.7 Creating a database

> After an RDS DB instance is created, you can create more databases as required.<a href="https://support.huaweicloud.com/usermanual-rds/rds_05_0019.html" target="_blank" rel="noopener noreferrer">create a database</a>

<h3 id='workcase'>5. Creating a functionGraph instance</h3>

Creating a function workflow instance involves creating[`FunctionGraph`](/vue-pro/docs/advanced/plugin#FunctionGraph)instances and functions<a href="https://support.huaweicloud.com/usermanual-functiongraph/functiongraph_01_0391.html" target="_blank" rel="noopener noreferrer">dependency package management</a>、function code management.

#### 5.1 create[`FunctionGraph`](/vue-pro/docs/advanced/plugin#FunctionGraph)instance

```bash
> tiny hwc fg create
--------------------Start creating the function workflow. Follow the instructions below--------------------

? Enter a function name fg_contract
? Select a version FunctionGraph v2
? Select an execution environment Node.js14.18
? Please select the running memory 256Mb
? Please enter the timeout period 300
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: The function workflow is created successfully
```

#### 5.2 Creating, Uploading, and Associating Dependency Packages

##### 5.2.1 Creating a dependency package

Create the `cloudfunctions` folder in the current directory, add the package dependencies `mysql2` and `sequelize` for accessing the `MySQL database`, and install the package to the `node_modules` folder.

```bash
>  mkdir cloudfunctions
>  cd cloudfunctions
>  npm init -y
>  npm install mysql2 sequelize
```

> FunctionGraph supports four languages: Node.js, Python, Java, and Go. In the best practice, Node.js is selected. Therefore, npm is selected when creating a dependency package. The reason why you need to install the dependency package of the `MySql` database is because the database instance of the `MySql` engine is selected in step 4.

##### 5.2.2 Uploading dependency packages

```bash
> tiny hwc fg dep
--------------------Start to create or update a function workflow dependency package--------------------

? Please select  creating a dependency package
? Enter a dependency package name  mysql2_sequelize
? Select an execution environment  Node.js14.18
? Enter a local dependency directory  cloudfunctions/node_modules
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: FunctionWorkflow dependency package created successfully
```
> The size of the dependency package exceeds 600 KB. The interface restriction is that the package can be uploaded only through the console <a href="https://support.huaweicloud.com/usermanual-functiongraph/functiongraph_01_0391.html" target="_blank" rel="noopener noreferrer">Uploading dependency packages on the Console</a>

##### 5.2.3 Associating dependency packages

```bash
> tiny hwc fg update
--------------------Start updating the function workflow--------------------

? Select the function to be updated  fg_contract
? Please enter the directory for the local code
? Select a dependency package
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: Succeeded in updating the function workflow
```

#### 5.3 Compiling and associating function code

##### 5.3.1 Compiling Function Code

The sample code demonstrates the adding, deleting, querying, and modifying logic of the `MySql` database，<a href="/public/assets/sample-code/groupService.zip">Sample Code Download</a>，decompress the package to the command execution directory.

##### 5.3.2 Association Function Code

```bash
> tiny hwc fg update
--------------------Start updating the function workflow--------------------

? Select the function to be updated fg_contract
? Please enter the directory for the local code groupService
? Select a dependency package
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: ucceeded in updating the function workflow
```

<h3 id='createapi'>6.Creating an API Gateway Instance</h3>

Creating an API Gateway instance involves creating a group and creating an API Gateway instance[`APIG`](/vue-pro/docs/advanced/plugin#APIG)instance.

#### 6.1 Creating an API Gateway Group

```bash
> tiny hwc apig group create
```

#### 6.2 create[`APIG`](/vue-pro/docs/advanced/plugin#APIG)instance

```bash
> tiny hwc apig create
--------------------Start creating the API gateway. Perform the following operations--------------------

? If there are xx API gateway groups in the current Region, determine whether to associate them with existing API gateway groups. (Enter n to enter the API gateway group creation process)？ Yes
? Select a group  DEFAULT
? Enter an API name  apig_contract
? Please select a type  Public API
? Please select a request  protocol HTTPS
? Select a matching mode  An absolute match
? Please enter the request path  /contract
? Please select a request mode  POST
? Whether to support cross-domain？  Yes
? Select an authentication mode  No certification
? Select a function in the function workflow as the backend service  fg_contract
? Please select the function invoking type  Synchronize
? Entering a backend function timed out  5000
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: API Gateway created successfully
```

> During the creation process, the user is asked to select a function workflow instance in step 4.

 <h3 id='makecase'>7.API Gateway Instance Called by Page</h3>

For details, see section [`Effect Preview`](/vue-pro/docs/advanced/practiced#Preview), by now, the best practices are complete. Developers can improve and expand their applications based on the best practices.

<h3 id='video-md'>Video Help</h3>