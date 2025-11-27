<h1 id='plugin'>Cloud service plug-ins</h1>

---

The cloud service plug-in is a command-line management tool provided by HUAWEI CLOUD service APIs. You can use this tool to manage and use your cloud service resources.

<h2 id='support'>Supported Cloud Services</h2>

- [Object storage service OBS](/ng-pro/docs/advanced/hwcPlugin#obs)

- [Virtual Private Cloud Service VPC](/ng-pro/docs/advanced/hwcPlugin#private)

- [EIP Service EIP](/ng-pro/docs/advanced/hwcPlugin#EIP)

- [Cloud Database Service RDS](/ng-pro/docs/advanced/hwcPlugin#RDS)

- [FunctionGraph Service FunctionGraph](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)

- [API Gateway Service APIG](/ng-pro/docs/advanced/hwcPlugin#APIG)

<h2 id='work'>Preparations</h2>

<h3 id='login'>1. Registering a Huawei ID and Enabling HUAWEI CLOUD</h3>

For details, see<a href="https://support.huaweicloud.com/usermanual-account/account_id_001.html" target="_blank" rel="noopener noreferrer">Registering a Huawei ID and Enabling HUAWEI CLOUD</a>.

<h3 id='name'>2. Log in to HUAWEI CLOUD and complete real-name authentication</h3>

For details, see<a href="https://support.huaweicloud.com/usermanual-account/account_id_004.html" target="_blank" rel="noopener noreferrer">Log In to HUAWEI CLOUD</a>.

For details, see<a href="https://support.huaweicloud.com/usermanual-account/account_auth_00001.html" target="_blank" rel="noopener noreferrer">Real-name authentication</a>.

<h3 id='select'>3. Creating an IAM User and Granting Permissions to the User（optional）</h3>

For details about IAM, see<a href="https://support.huaweicloud.com/productdesc-iam/iam_01_0026.html" target="_blank" rel="noopener noreferrer">What is IAM</a>。

For details, see<a href="https://support.huaweicloud.com/usermanual-iam/iam_02_0001.html" target="_blank" rel="noopener noreferrer">Creating an IAM User</a>。

For details, see<a href="https://support.huaweicloud.com/usermanual-iam/iam_01_0652.html" target="_blank" rel="noopener noreferrer">Granting Permissions to an IAM User</a>。

<h3 id='get'>4. Obtaining an Access Key（AK/SK）</h3>

When using cloud service plug-ins to manage and use your cloud service resources, you need to provide the identity information of the caller for authentication. To complete the initial configuration，you can<a href="https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html" target="_blank" rel="noopener noreferrer"> click here</a>learn about access keys (permanent AK/SK) and how to obtain access keys.

<h3 id='tool'>5. Installing the HUAWEI CLOUD CLI tool（Koo Command Line Interface，KooCLI）</h3>

The cloud service plug-in transparently transmits some KooCLI capabilities，you can<a href="https://support.huaweicloud.com/productdesc-hcli/hcli_01.html" target="_blank" rel="noopener noreferrer">click here</a>learn what KooCLI is.

You can<a href="https://support.huaweicloud.com/qs-hcli/hcli_02_003.html" target="_blank" rel="noopener noreferrer">click here</a>Learn how to install the KooCLI.

<h3 id='http'>6. Configuring the HTTP Proxy（Optional）</h3>  
   
When you use cloud service plug-ins to manage and use your cloud service resources, you may fail to call cloud service APIs due to intranet access restrictions of your company. In this case, the user can access the HTTP proxy. To use the HTTP proxy, you need to configure environment variables.
http_proxy和https_proxy。

Configure the http_proxy and https_proxy environment variables in the Windows environment.

```bash
set http_proxy=http://username:password@proxyServer:port
set https_proxy=https://username:password@proxyServer:port
```

> Run the preceding command in the current directory. proxyServer indicates the domain name (if the domain name can be resolved) or IP address of the proxy server. port indicates the port number. If your proxy server requires a user name and password to access, fill in the username and password sections above. Otherwise, omit the two sections as follows:

```bash
set http_proxy=http://proxyServer:port
set https_proxy=https://proxyServer:port
```

In addition, you can also add the global configuration `http_proxy` and `https_proxy` under `Control Panel` - > `System` - > `Advanced System Settings` - > `Environmental Variables`.

<h3 id='cli'>7. Install TinyCLI</h3>

`TinyCLI` is a cross-platform front-end engineering CLI tool. It provides developers with a series of development suites and project plug-ins, covering the entire front-end development link, ensuring the consistency and replicability of the team development process. You can<a href="/tiny-cli/docs/use-install" target="_blank" rel="noopener noreferrer">click here</a>get how to install the `TinyCLI`.

> Cloud service plug-ins are plug-ins extended based on `TinyCLI`.

<h2 id='make'>Install</h2>

```bash
tiny hwc
```

> After this command is executed, the `TinyCLI` will check whether the plug-in is installed on your computer. If the plug-in is not installed, the system starts to install the plug-in. After the installation is successful, all cloud services supported by the plug-in are listed, more [see](/ng-pro/docs/advanced/hwcPlugin#cloudbu)。

<h2 id='list'>Command List</h2>

- [tiny hwc](/ng-pro/docs/advanced/hwcPlugin#cloudbu)

- [tiny hwc configure](/ng-pro/docs/advanced/hwcPlugin#configure)

- [tiny hwc obs](/ng-pro/docs/advanced/hwcPlugin#obs)

- [tiny hwc vpc](/ng-pro/docs/advanced/hwcPlugin#private)

- [tiny hwc eip](/ng-pro/docs/advanced/hwcPlugin#EIP)

- [tiny hwc mysql](/ng-pro/docs/advanced/hwcPlugin#RDS)

- [tiny hwc fg](/ng-pro/docs/advanced/hwcPlugin#FunctionGraph)

- [tiny hwc apig](/ng-pro/docs/advanced/hwcPlugin#APIG)

<h3 id="configure">1. <span>Plug-in initialization</span></h3>

```bash
> tiny hwc configure
----------Start initial configuration, The value of "Secret Access Key" is anonymized, Follow the instructions below----------

? Enter an access key ID： 560*************43FQ
? Please enter Secret Access Key：
? Select a region: CN South-Guangzhou (cn-south-1)
? Please select a project ID: (Select the project ID you want to use here)
2022-xx-xx xx:xx:xx [tiny-plugin-hwc-configure]: Configuration succeeded！
```

After the command is executed, the `hwc-exports.json` file and the `hwc` directory are generated in the current directory for storing initialization information.

> The initialization command is used to permanently<a href="https://support.huaweicloud.com/usermanual-ca/ca_01_0003.html" target="_blank" rel="noopener noreferrer">AK/SK</a>、<a href="https://support.huaweicloud.com/iam_faq/iam_01_0011.html" target="_blank" rel="noopener noreferrer">regions</a>information and<a href="https://support.huaweicloud.com/api-iam/iam_17_0002.html" target="_blank" rel="noopener noreferrer">projectID</a>stored in configuration files and directories to avoid frequent input of fixed information during operations.

### 2. <span id="cloudbu">Cloud Service List</span>

```bash
> tiny hwc
? Select a cloud service (Use arrow keys)
> Function Workflow FunctionGraph
  Cloud database RDS
  Object storage service Obs
  Virtual Private Cloud Vpc
  API Gateway APIG
  EIP Eip
```

<h3 id='obs'>3. Object storage service OBS</h3>

Object storage service（Object Storage Service，OBS）is an object-based massive storage service that provides customers with massive, secure, highly reliable, and low-cost data storage capabilities.You can<a href="https://support.huaweicloud.com/productdesc-obs/zh-cn_topic_0045829060.html" target="_blank" rel="noopener noreferrer">click here</a>Know what the object Storage Service is

<h4 id='order'>Command List</h4>

- tiny hwc obs add

- tiny hwc obs create

<h4 id='step'>Command for Synchronizing HUAWEI CLOUD OBS Resources</h4>

```bash
> tiny hwc obs add
--------------------Start synchronizing online buckets--------------------
```

| No | Name     |  No | Name    |  Regional location    |
| ---- | ------- |  ------- |  ------- |  ------- |
| 1    | obs_001 |  Standard storage  |  3.0    |  cn-south-1  |
| 2    | obs_002 |  Standard storage  |  3.0    |  cn-south-1  |

<h4 id='commanded'>Command for creating HUAWEI CLOUD OBS resources</h4>

```bash
> tiny hwc obs create
--------------------Start to create a bucket, Perform the following operations--------------------

? Enter a bucket name containing 3 to 63 characters, starting with a digit or letter, and supporting lowercase letters and digits、“-”、“.”.Do not use class IP addresses；Do not start or end with“-” or “.”；Prohibit two "." adjacent，such as：“my..bucket”；“.”and“-” are not allowed to be adjacent，such as：“my-.bucket”和“my.-bucket”）： obs-001
2022-xx-xx xx:xx:xx [aio-plugin-hwc-obs]: bucket created successfully！
```

<h3 id='private'>4. Virtual Private Cloud Service VPC</h3>

Virtual Private Cloud (VPC) builds an isolated, configurable, and managed virtual network environment for cloud databases, improving the security of cloud resources and simplifying network deployment.You can<a href="https://support.huaweicloud.com/productdesc-vpc/zh-cn_topic_0013748729.html" target="_blank" rel="noopener noreferrer">click here</a>Learn what a VPC is.

#### Command List

- tiny hwc vpc add

- tiny hwc vpc create

#### Command for Synchronizing HUAWEI CLOUD VPC Resources

```bash
> tiny hwc vpc add
--------------------Start synchronizing the online VPC--------------------
```

| No | Name    | IPv4 Network Segment      |
| ---- | ------- | -------------- |
| 1    | vpc_001 | 192.168.0.0/18 |
| 2    | vpc_002 | 192.168.0.0/18 |

#### Commands for creating a HUAWEI CLOUD VPC resource

```bash
> tiny hwc vpc create
--------------------Start creating a VPC, follow the instructions below--------------------

? Enter a VPC name（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点），the names of the same tenant must be unique）: vpc-test1
? Select an available subnet range in the VPC： 10.0.0.0/8-24
? Please enter the subnet mask of the network segment (value range:：8-24）： 8
2022-xx-xx xx:xx:xx [aio-plugin-hwc-vpc]: The VPC is successfully created！
? Enter a subnet name（长度1-64，支持数字、字母、中文、_（下划线）、-（中划线）、.（点））: subnet-test1
? Enter the subnet mask（Value Range：8-28）： 28
2022-x！
```

<h3 id='EIP'>5. Elastic public network IP EIP</h3>

Elastic public network IP（Elastic IP，Abbreviation EIP）Provides independent public IP address resources，including the public IP address and public network egress bandwidth service.You can bind or unbind resources from ECSs, bare metal server, virtual IP addresses, Elastic Load Balance, and NAT gateways.You can<a href="https://support.huaweicloud.com/productdesc-eip/overview_0001.html" target="_blank" rel="noopener noreferrer">click here</a>know what an elastic public IP address is

#### Command List

- tiny hwc eip add

- tiny hwc eip create

#### Synchronizing HUAWEI CLOUD EIP Resources

```bash
> tiny hwc eip add
--------------------开始同步线上数据库实例--------------------
```

| No | Name    | Elastic public network IP | Bandwidth Name   | Bandwidth Size |
| ---- | ------- | ---------------- | ------------- | -------- |
| 1    | eip_001 | 116.63.63.63     | bandwidth_001 | 5 Mbit/s |
| 2    | eip_002 | 116.63.63.64     | bandwidth_002 | 5 Mbit/s |

#### Command for creating HUAWEI CLOUD EIP resources

```bash
> tiny hwc eip create
--------------------Start to create an EIP, follow the instructions below--------------------

? Enter an EIP name eip_001
? Select an EIP line type  Dynamic BGP
? Select an EIP version ipv4
? Select a payment mode  Pay-per-use
? Select a bandwidth type  Exclusive bandwidth
? Enter a bandwidth name bandwidth_001
? Enter the bandwidth 1
2022-xx-xx xx:xx:xx [aio-plugin-hwc-eip]: The EIP is created successfully
```

<h3 id='RDS'>6. Cloud database RDS</h3>

Cloud database RDS（Relational Database Service，简称RDS）is a stable, reliable, scalable, and easy-to-manage cloud database service based on the cloud computing platform.You can<a href="https://support.huaweicloud.com/productdesc-rds/zh-cn_topic_dashboard.html" target="_blank" rel="noopener noreferrer">click here</a>What is RDS

#### Command List

- tiny hwc mysql add

- tiny hwc mysql create

- tiny hwc mysql eip

#### Synchronizing RDS Resources on HUAWEI CLOUD

```bash
> tiny hwc mysql add
--------------------Start synchronizing online database instances--------------------
```

| No | Name      | Database    |
| ---- | --------- | --------- |
| 1    | mysql_001 | MySQL 8.0 |
| 2    | mysql_002 | MySQL 8.0 |

#### Commands for creating HUAWEI CLOUD RDS resources

```bash
> tiny hwc mysql create
--------------------The system starts to create the database instance. Perform the following operations-------------------------

? Select a database version 8.0
? Select a database instance type  active/standby
? Please select the synchronization parameters of the standby node  Asynchronous
? Enter an instance name mysql_001
? Select a performance specification  General-purpose 2vCPUs 8GB
? Select a disk type  SSD cloud disk
? Enter the disk size 40
? Select a primary AZ  AZ 2
? Select a standby AZ  AZ 2
? Please enter the port number 3306
? Specifies whether to associate with an existing VPC？ Yes
? Select a private cloud  vpc-default
? Select a subnet  subnet-default
? Select a security group  default
? Select a charging mode  Yearly/Monthly
? Please select  Yearly package
? Select a yearly duration  1 year
? Auto Renewal? Yes
2022-xx-xx xx:xx:xx [aio-plugin-hwc-mysql]: The database instance is created successfully
```

#### Commands for binding or unbinding an EIP from an RDS resource

```bash
> tiny hwc mysql eip
--------------------Bind or unbind the EIP from the database instance, Perform the following operations--------------------

? Please select a database mysql-001
? Specifies whether to associate an existing elastic IP address？ Yes
? Select an elastic IP address  eip_001
2022-xx-xx xx:xx:xx [aio-plugin-hwc-mysql]: Succeeded in binding the EIP to the database instance
```
> An EIP cannot be bound or unbound when an instance is being created, modified, restored, restarted, or frozen.


<h3 id='FunctionGraph'>7. Function Workflow FunctionGraph</h3>

FunctionGraph is an event-driven function hosting computing service. To use FunctionGraph functions, you only need to write service function code and set running conditions. You do not need to configure or manage infrastructure such as servers. FunctionGraph functions run in an elastic, O&M-free, and highly reliable manner.You can<a href="https://support.huaweicloud.com/productdesc-functiongraph/functiongraph_01_0100.html" target="_blank" rel="noopener noreferrer">click here</a>Learn what FunctionGraph is.

#### Command List

- tiny hwc fg add

- tiny hwc fg create

- tiny hwc fg update

- tiny hwc fg dep

#### Command for Synchronizing FunctionGraph Resources on HUAWEI CLOUD

```bash
> tiny hwc fg add
--------------------Start synchronizing the online function workflow--------------------
```

| No | Name         | Runtime        |
| ---- | ------------ | ------------- |
| 1    | function_001 | Node.js14.18  |
| 2    | function_002 | 1Node.js14.18 |

#### Commands for creating HUAWEI CLOUD FunctionGraph resources

```bash
> tiny hwc fg create
--------------------Start creating a function workflow, follow the instructions below--------------------

? Enter a function name fg_001
? Select a version FunctionGraph v2
? Select an execution environment Node.js14.18
? Please select the running memory 256Mb
? Please enter the timeout period 300
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: The function workflow is created successfully
```

#### Updated HUAWEI CLOUD FunctionGraph resource commands to support code and dependencies

```bash
> tiny hwc fg update
--------------------Start updating the function workflow--------------------

? Select the function to be updated fg_001
? Please enter the directory for the local code cloudfunctions
? Select a dependency package
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: Succeeded in updating the function workflow
```

> The update command supports the upload of local code whose size is less than 600 KB after compression. To upload super-large function code, log in to the FunctionGraph console and upload it！

#### Commands for creating or updating a HUAWEI CLOUD FuncitonGraph resource dependency package

```bash
> tiny hwc fg dep
--------------------Start to create or update a function workflow dependency package--------------------

? Please select create a Dependency Package
? Enter a dependency package name dep_01
? Select an execution environment Node.js14.18
? Enter a local dependency directory cloudfunctions/deps
2022-xx-xx xx:xx:xx [aio-plugin-hwc-fg]: FunctionWorkflow dependency package created successfully
```

> Upload the compressed local code of the dependency package whose size is less than 600 KB. To upload super-large dependency code, log in to the FunctionGraph console and upload it！

<h3 id='APIG'>8. API Gateway APIG</h3>

API Gateway provides high-performance, high-availability, and high-security API hosting services to quickly package enterprise service capabilities into standard API services, helping you easily build, manage, and deploy APIs of any scale and put them on the API cloud store for sale.You can<a href="https://support.huaweicloud.com/productdesc-apig/apig_0080101651.html" target="_blank" rel="noopener noreferrer">click here</a>Understand what API Gateway is.

> Before using API Gateway, you need to<a href="https://support.huaweicloud.com/usermanual-apig/apig_03_0037.html" target="_blank" rel="noopener noreferrer">buying a Premium Instance</a>。

#### Command List

- tiny hwc apig group add

- tiny hwc apig group create

- tiny hwc apig add

- tiny hwc apig create

- tiny hwc apig publish

#### This command is used to synchronize HUAWEI CLOUD APIG resource groups, you must select a group for APIG resources

```bash
> tiny hwc apig group add
--------------------Start synchronizing online API gateway groups--------------------
```

| No | Name           |
| ---- | -------------- |
| 1    | apig_group_001 |
| 2    | apig_group_002 |

#### 创建华为云APIG资源分组命令

```bash
> tiny hwc apig group create
--------------------Command for creating a HUAWEI CLOUD APIG resource group--------------------

? Enter a group name（The value is a string of 3 to 255 characters starting with a letter, a Chinese character, or a digit. Chinese characters, letters, digits, hyphens (-), underscores (_), dots (.), slashes (/), parentheses and colons (:) in Chinese and English formats, and stop signs () in Chinese formats）： apig-group-test
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: API Gateway group created successfully
Bind an independent domain name to group apig-group-test to enable services. You can also use a debugging domain name a5d36433103345869d0492e032789bcf.apic.cn-south-1.huaweicloudapis.com Perform development and debugging, with a maximum of 1000 accesses per day.
? Indicates whether to bind an independent domain name？ No
```


#### Synchronizing HUAWEI CLOUD APIG resources

```bash
> tiny hwc apig add
--------------------Start synchronizing the online API list--------------------
```

| No | Name     | Request Method | Pathway | Home Group       |
| ---- | -------- | -------- | ---- | -------------- |
| 1    | apig_001 | GET      | /xx  | apig_group_001 |
| 2    | apig_002 | GET      | /xx  | apig_group_002 |

#### Commands for creating HUAWEI CLOUD APIG resources

```bash
> tiny hwc apig create
--------------------Start creating the API gateway, Perform the following operations--------------------

? If there are xx API gateway groups in the current Region, determine whether to associate them with existing API gateway groups. (Enter n to enter the API gateway group creation process)？ Yes
? Select a group  DEFAULT
? Enter an API name  apig_001
? Please select a type  public API
? Please select a request protocol  HTTPS
? Select a matching mode  An absolute match
? Please enter the request path  /
? Please select a request mode  GET
? Whether to support cross-domain？ Yes
? Select an authentication mode  IAM authentication
? Select a function in the function workflow as the backend service  fg_group
? Please select the function invoking type  synchronization
? Entering a backend function timed out 5000
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: API Gateway created successfully
```

#### Publishing HUAWEI CLOUD APIG resource commands

```bash
> tiny hwc apig publish
--------------------Start publishing the API, Perform the following operations--------------------

? Select the API to be published： apig_001
2022-xx-xx xx:xx:xx [aio-plugin-hwc-apig]: API apig_001 has been released to the RELEASE environment.
```

> You can only publish it to the RELEASE environment. To publish other environments, log in to the HUAWEI CLOUD console.

<h2 id='Common'>Frequently Asked Questions</h2>

<a href="https://apierrorcenter.developer.intl.huaweicloud.com/apierrorcenter?keyword=&product=" target="_blank" rel="noopener noreferrer">Error Code Description</a>