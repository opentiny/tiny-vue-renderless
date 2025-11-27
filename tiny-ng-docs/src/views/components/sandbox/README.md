# demo 示例代码适配 CodeSandbox 指南
## 1、alpha环境测试接入 CodeSandbox

由于alpha环境会自动把生产环境的js地址替换成 alpha环境的js地址，alpha环境的js地址不支持跨域，因此需要允许浏览器跨域：

## 2、接入 CodeSandbox 指南

codeSandbox 是一个开源平台，可以通过调接口的方式直接打开 codeSandbox，其 API 是：https://codesandbox.io/docs/learn/sandboxes/cli-api

### 打开的 API 主要有以下几种：

1. get 请求 缺陷是 get 请求的 URL 有长度限制
2. **post 表单** （本项目采用的）

html内容
```html
<form className="code-box-code-action" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank" ref="sandboxRef">
  <input type="hidden" name="parameters" :value="codeSandboxValue" />
</form>
```

提交表单调用接口
```javascript
this.codesanboxPrefillConfig = {
  ...this.codesanboxPrefillConfig,
  files: fileObject,
};
await nextTick();
sandboxRef.value?.submit();
```

3. xhr 请求

### 传递文件：

1. 传递字节文件，可以使用 http 传递

```
{
  "isBinary": true,
  "content": "https://..."
}
```

2. 传递 json 文件，key 是文件目录/文件名，value 是文件内容 (**本项目采用的**)

```
{
  "files": {
    "src/index.js": {
      "content": "console.log('hello!')",
      "isBinary": false
    },
    "package.json": {
      "content": {
        "dependencies": {}
      }
    }
  }
}
```

## 3、demo示例代码更新指南
### 不涉及tinycloud、tiny3组件库升级

要是不涉及tinycloud、tiny3组件库升级，重新点一下更新的demo示例代码，可以运行就可以。

### 涉及tinycloud、tiny3组件库升级

#### 1. 升级 component-bundle，发布新版

要是涉及tinycloud、tiny3组件库升级，需要跑一下 component-bundle 组件库的alpha流水线（此js对内使用，发布alpha即可），更新一下组件库的依赖bundle。


#### 2. 修改tiny-design使用的版本

##### 2.1 要是本地开发
修改 `vite.config.docs.base.js`中的`__COMPONENT_BUNDLE_VERSION__`即可
```
  define: {
    // component-bundle生成的js版本
    __COMPONENT_BUNDLE_VERSION__: JSON.stringify('1.0.XXXXX'),
  },
```
##### 2.2 发布到 alpha环境、内网生产环境
在运行tinyui-design流水线时，修改全局变量`__COMPONENT_BUNDLE_VERSION__`为发布的版本即可（版本号举例：`1.0.1.20230625172041`）

