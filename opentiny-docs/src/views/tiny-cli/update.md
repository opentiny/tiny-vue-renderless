<h1 id='update'>自动安装与升级</h1>

---
<h2 id='autoInstall'>自动安装</h2>

tiny-cli 包含几类命令：

- tiny-cli 基础命令
- tiny-cli 套件固定命令
- tiny-cli 插件扩展命令

当运行 tiny xxx 命令时，tiny-cli 是如何查找到对应的套件或插件命令的呢？
tiny-cli 会按照如下顺序进行查找：

- 先判断是否是 基础命令，如果是基础命令，则执行基础命令；
- 非基础命令，查找当前目录是否存在 `tiny.config.js`，本地有 `tiny.config.js`, 且指定了套件的名称，会查找当前本地是否安装该套件，未安装则先自动安装套件，再执行套件的命令；
- 如果不存在，则该命令为 插件命令，查找当前本地是否安装该插件，未安装则先自动安装插件，再执行插件的命令；

<h2 id='vsUpdate'>版本升级</h2>

<h3 id='auto'>自动升级</h3>

tiny-cli 在插件/套件每天首次运行时会检查最新版本，并记录检查时间，查询到最新版本时会提示进行升级。

如下：tiny.cache.json 中记录版本检查

```js
// tiny.cache.json
{
  "__expires": {
    "__versionTip": 1672972196289,
    "moduleCheck_@opentiny/tiny-toolkit-dev": 1672889396650,
    "moduleCheck_@opentiny/tiny-toolkit-testdev": 1671019358418,
    "moduleCheck_@opentiny/tiny-toolkit-pro": 1670987208867,
    "moduleCheck_@opentiny/tiny-plugin-link": 1671400643494,
    "moduleCheck_@opentiny/tiny-toolkit-mytest": 1672921810287
  },
  "__versionTip": true,
  "moduleCheck_@opentiny/tiny-toolkit-dev": true,
  "moduleCheck_@opentiny/tiny-toolkit-testdev": true,
  "moduleCheck_@opentiny/tiny-toolkit-pro": true,
  "moduleCheck_@opentiny/tiny-plugin-link": true,
  "moduleCheck_@opentiny/tiny-toolkit-mytest": true
}
```

<h3 id='manually'>手动升级</h3>

执行 `tiny update` 或 `tiny install` 命令可以手动升级 tiny-cli 套件与插件：
```bash
$ tiny update @opentiny/tiny-toolkit-dev

# 或者执行：
tiny install @opentiny/tiny-toolkit-dev
```
