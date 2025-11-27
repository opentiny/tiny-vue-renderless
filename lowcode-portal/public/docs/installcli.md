<p align="center">TinyEngine低代码引擎使能开发者定制低代码平台，支持在线实时构建低码平台，支持二次开发或集成低码平台能力</p>

- 跨端跨框架前端组件
- 支持在线实时构建、支持二次开发或被集成
- 直接生成可部署的源码，运行时无需引擎支撑
- 允许接入第三方组件、允许定制扩展插件
- 支持高代码与低代码，混合开发部署应用
- 平台接入 AI 大模型能力，辅助开发者构建应用

## 开发

### 安装所需的依赖

```sh
$ pnpm install
```

### 本地开发，启动本地 mock 服务器，使用本地 mock 服务器的 mock 数据

```sh
$ pnpm dev
```

### 本地开发，直连本地的tiny-engine-webservice服务端

1. 启动 <a href="https://github.com/opentiny/tiny-engine-data-center/blob/main/README.md" target="_blank">tiny-engine-data-center</a>

2. 启动 <a href="https://github.com/opentiny/tiny-engine-webservice/blob/main/README.md" target="_blank">tiny-engine-webservice</a>

3. 修改 tiny-engine 项目 `packages/design-core/` 目录下 `vite.config.js` 中origin的值为自己本地webService项目的地址端口（webService端口默认为7011），如：

<img alt="修改端口" src="https://opentiny-assets.obs.cn-north-4.myhuaweicloud.com/lowcode-portal/1.1.55/img/docimg/backend_deploy_5.png">

### 物料同步[方案](https://opentiny.design/tiny-engine#/help-center/course/dev/56)

```sh
$ pnpm splitMaterials
```

```sh
$ pnpm buildMaterials
```

浏览器打开：`http://localhost:8080/?type=app&id=918&tenant=1&pageid=NTJ4MjvqoVj8OVsc`  
`url search`参数：

- `type=app` 应用类型
- `id=xxx` 应用 ID
- `tenant=xxx` 组织 ID
- `pageid=xxx` 页面 ID

## 构建

```sh
# 先构建所有插件
pnpm run build:plugin

# 构建设计器
pnpm run build:alpha  或 build:prod

```

构建后产物所在文件夹

```
 tiny-engine/packages/design-core/dist/
```



