<h1 id='backend'>Backend management</h1>

Background framework used by TinyPro of Vue. Currently, there are two ```EggJs``` ```Spring Cloud``` frameworks, which are initialized using the ``TinyCLI``` suite and can be used out of the box.

<h2 id='egg'>EggJs</h2>

Egg.js is an enterprise-level application development framework based on Node.js. It provides a series of plug-ins and conventions, such as route management, parameter validation, template engine, and database access, so that developers can build extensible and maintainable applications more efficiently.

Egg.js is developed based on Koa.js and adds many functions and features to it, making it easier to develop large projects.

<h3 id='egg_prepare'>Environment Preparation</h3>

* Operating system: macOS, Linux, and Windows
* Running environment: You are advised to select node [LTS Version](https://nodejs.org/zh-cn)，minimum requirement 14.x


<h3 id='egg_start'>Start the development environment</h3>

```
npm run dev
```


<h3 id='egg_build'>Constructing</h3>

[Egg Build and Deployment Guide](https://www.eggjs.org/zh-CN/core/deployment)


<h2 id='springcloud'>Spring Cloud</h2> 

Spring Cloud Huawei is an extended and optimized version based on the Spring Cloud architecture. Based on Spring Cloud, it provides some functions and features dedicated to the HUAWEI CLOUD environment

Spring Cloud Huawei supports Apache ServiceComb and Nacos as the service registration and discovery center and service configuration management center.

Spring Cloud Huawei provides a large number of out-of-the-box service governance capabilities, enabling developers to quickly build resilient and reliable microservice applications.


<h3 id='spring_env'>Environment Preparation</h3>

To use Spring Cloud Huawei, you need to install the JDK, IDE, Maven, and CSE and configure environment variables in advance.  

<h4 id='java_install'>Java install</h4>

1. [Downloading the JDK](https://www.oracle.com/java/technologies/downloads/)
2. [Configuring Environment Variables](https://www.runoob.com/java/java-environment-setup.html)  

<h4 id='IDE_install'>IDE Installation</h4> 

Recommended for installation [IntelliJ IDEA](https://www.jetbrains.com/idea/)built-in Maven  
[Download link](https://www.jetbrains.com/zh-cn/idea/download/)  

<h4 id='maven_install'>Maven Installation</h4> 

Spring Cloud in the tiny-toolkit-pro suite uses Maven to build projects and manage dependencies.
1. [Download link](https://maven.apache.org/download.cgi)
2. [Environment Configuration](https://www.runoob.com/maven/maven-setup.html)  

<h4 id='cse_install'>Microservice Engine</h4>   

There are two ways to choose from：
  
  * Set up a local development environment by downloading and installing the local simplified CSE. The download link is as follows：[CSE 2.0](https://support.huaweicloud.com/devg-cse/cse_devg_0036.html)，after the download is complete, start the CSE by one click..exe 
  
  * Using [Huawei Cloud Microservice Engine (CSE)](https://support.huaweicloud.com/qs-cse/cse_qs_0002.html) 


<h3 id='spring_start'>Start the development environment</h3>

There are three ways to start

  * Use IDEA to start all services by one click (recommended)
  * Using the ```mvn``` instruction
  ```
  // 进入对应目录下
  mvn spring-boot:run
  ```
  * Using the ```java -jar ``` instruction  
  ```
  // Use IDEA or MVN to pack the package
  mvn clean package

  // Go to the target directory
  java -jar packagename.jar
  ```

<h3 id='spring_build'>Constructing</h3>

[deploying microservice applications on the CSE](https://support.huaweicloud.com/intl/zh-cn/devg-cse/cse_devg_0016.html)


<h2 id='database'>Database</h2>

If you want to connect to the server, install and configure the local database service or cloud database service in advance to ensure that the connection is normal and available. You can use the local database or cloud database   

**Local database: **Install MySQL on the local database
- Check the operating system of the local host and select a proper installation package version. [Download MySQL](https://dev.mysql.com/downloads/)
- The MySQL software has been installed.
- Perform initial configuration, set the port, user name, and login password, and test that the connection is normal

For details about the installation, see [MySQL Installation](https://www.runoob.com/mysql/mysql-install.html)



**Cloud database: **Cloud database recommended [Huawei cloud database RDS](https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html)
- Registering a Huawei ID and Enabling HUAWEI CLOUD
- Select a proper billing mode to purchase and configure database instances
- Select a proper connection mode for connection  

For details, see [RDS for MySQL Quick Start](https://support.huaweicloud.com/qs-rds/rds_02_0008.html)，you can also use the TinyCLI cloud service plug-in to create a service in CLI mode. For details, see [TinyCLI Cloud Service Plug-in](https://opentiny.design/vue-pro/docs/advanced/plugin)
