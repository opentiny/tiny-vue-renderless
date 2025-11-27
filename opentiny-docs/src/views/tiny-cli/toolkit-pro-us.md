<h1 id='dev'>Pro Kit</h1>

---
> Out-of-the-box full-stack development infrastructure

<h2 id='view'>Application Scenarios</h2>

Used to quickly build TinyVue or TinyNg projects

<h2 id='prepare'>Preparations</h2>

<h3 id='prepare_fornt'>Front-end preparations</h3>

Install the TinyCLI in advance：[reference document](https://opentiny.design/tiny-cli/docs/start)

<h3 id='prepare_fornt'>Server Preparations</h3>

<h4 id='egg'>EggJs</h4> 

Egg.js is a Node.js server framework. Nodes and Git are ready in the development environment. [reference document](https://www.eggjs.org/zh-CN/intro/quickstart)

<h4 id='springcloud'>Spring Cloud</h4> 

If you want to connect to Spring Cloud, you need to install the JDK, IDE, and Maven and configure environment variables in advance

<h5 id='java_install'>Installing the Java Environment</h5>

1. [Downloading the JDK](https://www.oracle.com/java/technologies/downloads/)
2. [Configuring environment variables](https://www.runoob.com/java/java-environment-setup.html)  

<h5 id='IDE_install'>IDE Installation</h5> 

Recommended for installation [IntelliJ IDEA](https://www.jetbrains.com/idea/)，内置Maven  
[Download link](https://www.jetbrains.com/zh-cn/idea/download/)  

<h5 id='maven_install'>Maven Installation</h5> 

Spring Cloud in the tiny-toolkit-pro suite uses Maven to build projects and manage dependencies
1. [Download link](https://maven.apache.org/download.cgi)
2. [Environment configuration](https://www.runoob.com/maven/maven-setup.html)  

<h5 id='cse_install'>Microservice Engine</h5>   

There are two ways to choose from：
  
  * Set up a local development environment by downloading and installing the local simplified CSE. The download link is as follows：[CSE 2.0](https://support.huaweicloud.com/devg-cse/cse_devg_0036.html)，after the download is complete, start cse.exe by one click
  
  * Using [Huawei Cloud Microservice Engine (CSE)](https://support.huaweicloud.com/qs-cse/cse_qs_0002.html) 


<h3 id='database'>Database preparations</h3>

If you want to connect to the server, install and configure the local database service or cloud database service in advance to ensure that the connection is normal and available. You can use the local database or cloud database   

**local database：**  Installing the MySQL Database on the Local Database
- Check the operating system of the local host and select a proper installation package version[Download MySQL](https://dev.mysql.com/downloads/)
- The MySQL software has been installed
- Perform initial configuration, set the port, user name, and login password, and test that the connection is normal

For details about the installation tutorial, see：[MySQL Security](https://www.runoob.com/mysql/mysql-install.html)



**Cloud database：** Recommended for cloud databases[HUAWEI CLOUD RDS](https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html)
- Registering a Huawei ID and Enabling HUAWEI CLOUD
- Select a proper billing mode to purchase and configure database instances
- Select a proper connection mode for connection  

For details, see：[RDS for MySQL Quick Start](https://support.huaweicloud.com/qs-rds/rds_02_0008.html)，you can also use the TinyCLI cloud service plug-in to create a service in command line mode，for details, see：[TinyCLI Cloud service plug-ins](https://opentiny.design/vue-pro/docs/advanced/plugin)


<h2 id='use'>Usage</h2>

<h3 id='init'>Initialize</h3>

```
tiny init pro
```

<h3 id='tech_name'>Configure the project name and description</h3>

```
 ? enter a project name：(tiny-pro) 
 ? please enter the project description： (middle and back-end systems created based on the TinyPro suite)
```

<h3 id='tech_fornt'>Select the front-end technology stack</h3>

Supports two front-end technology stacks: `Vue` `Angular`
```
 ? please select the technology stack you wish to use： (Use arrow keys)
 > vue
   angular
```

<h3 id='tech_back'>Selecting the server technology stack（optional configuration）</h3>

**Currently, only the `Vue` project supports the interconnection with the server, Other functions are being developed**  
If you choose not to connect to the server, all interfaces use mock data

```
 ? please select the server technology stack you want to use： (Use arrow keys)
 > Egg.js
   Spring Cloud
   not configured currently
```

<h3 id='tech_database'>Selecting a database (optional)</h3>

```
 ? please select a database type： (Use arrow keys)
 > mySQL
   not configured currently
```

<h3 id='database_info'>Configuring Database Information</h3>

<p style="color:#c7000b">Databases and tables are automatically created during initialization. You are advised to use a new database name to avoid database overwriting risks！</p>
 
```
 ? please enter the database address： (localhost)
 ? please enter the database port： (3306)
 ? please enter a database name：
 ? please enter the login user name： (root)
 ? please enter the password： [input is hidden]
```
- You can also modify the configuration in `server/config/config.default.ts` after the project is created
- The pro suite automatically creates databases and tables during initialization. If the database initialization fails due to configuration problems, you can use either of the following methods to reinitialize the database：
    - After confirming the correct configuration, run `tiny init pro` again to overwrite the installation
    - Enter the content of `server/app/databases` and manually run related SQL statements
- A piece of user information is automatically inserted into the database table（account：admin@example.com  password：admin），can be directly used for login
- If the server service fails to be started, ensure that the address, name, account, and password of the database service are the same as those configured in `server/config/config.default.ts`
- In `server/app.ts`, the ORM model is synchronized to the database to help create tables. You are advised to use this function only in the development environment

<h3 id='start'>Start the local server</h3>

**Front end**
```
cd web && npm run start
```
**Back End**

* EggJS
```
cd server && npm run dev
```
* Spring Cloud  
  * Use IDEA to start all services by one click (recommended)
  * Using the ```mvn``` instruction
  ```
  // Go to the corresponding directory
  mvn spring-boot:run
  ```
  * Using the ```java -jar ``` instruction  
  ```
  // Use IDEA or MVN to pack the package
  mvn clean package

  // Go to the target directory
  java -jar packagename.jar
  ```

<h3 id='build'>Build Deployment</h3>

Front end：The Vue project is built using the Vite tool，for details, see[Vite Deployment Guide](https://cn.vitejs.dev/guide/static-deploy.html)、[Vite Production Environment Guide](https://cn.vitejs.dev/guide/build.html)  
Back End：
* For details about the EggJS project, see [Egg Build and Deployment Guide](https://www.eggjs.org/zh-CN/core/deployment)
* For details about the Spring Cloud, see [Deploying Microservice Applications on the CSE](https://support.huaweicloud.com/intl/zh-cn/devg-cse/cse_devg_0016.html)

## Maintainer

Add the official assistant WeChat: opentiny-official and join our technical exchange group
