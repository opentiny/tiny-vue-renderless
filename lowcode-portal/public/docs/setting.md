# 设置面板详解

> 设置面板位于设计器右侧，设置面板可以针对选中的组件的一些属性、样式、绑定数据进行配置。

![设置面板](http://image.opentiny.design/tiny-lts/v1/images/c975be6237cae105d88599846c8d031f_1817x1134.png)

设置面板包含的功能：

- 属性，录入物料时， Schema 可以设置可以配置哪些属性，暴露出来的属性即通过设置面板的属性栏让用户配置或绑定变量
- 样式，可以配置选中组件的大部分常用样式。
- 高级：可以配置点击事件、循环数据渲染、是否渲染等高级配置事件



## 属性设置栏

> 属性设置栏是录入物料时，通过低代码协议配置 schema 暴露出来的可快捷设置的属性。类似于使用组件库时设置的 props。

组件库录入物料协议示例：

```json
{
  "name": {
    "zh_CN": "按钮"
  },
  // ... 其他配置
  "schema": {
    "properties": [
      {
       // 配置属性面板中暴露出来的属性
        "content": [
          {
            "property": "text",
            "type": "string",
            "defaultValue": "按钮文案",
            "label": {
              "text": {
                "zh_CN": "按钮文字"
              }
            },
            "cols": 12,
            "hidden": false,
            "required": true,
            "readOnly": false,
            "disabled": false,
            "widget": {
              "component": "MetaBindI18n",
              "props": {}
            },
            "description": {
              "zh_CN": ""
            }
          }
          // ... 其他暴露属性与配置
]}]}}
```

属性设置栏示例图：

![属性设置栏示意图](http://image.opentiny.design/tiny-lts/v1/images/8c798c611e7e337588902465470d44c6_1766x825.png)



## 样式设置栏

> 样式设置栏相对于属性设置栏，提供了更全面更详细的样式配置，可以配置布局、盒模型尺寸、字体样式、定位等等样式，同时提供全局和行内样式代码编辑面板，满足更高级的设置需求。

样式设置栏示意图：

![央视设置栏示意图](http://image.opentiny.design/tiny-lts/v1/images/92a0d951b8a23f089e17585f5b9b8177_303x1097.png)

## 高级设置栏

> 高级设置栏类似于属性设置栏，属性设置栏提供基础常用设置， 高级设置栏提供事件绑定、是否渲染、数据循环等高级配置。同样，高级设置栏中出现的可配置项来源于录入物料时配置的 schema。

高级设置栏示意图

![高级设置栏示意图](http://image.opentiny.design/tiny-lts/v1/images/d806d58f9bfe16d13cfae64c0be19b28_294x641.png)

### 录入物料时配置高级设置栏可配置项

```json
{
"schema": {
    "properties": [
      // 配置属性面板基础属性
    ],
    "events": {
       // 配置高级面板可绑定事件
      "onClick": {
        "label": {
          "zh_CN": "点击事件"
        },
        "description": {
          "zh_CN": "按钮被点击时触发的回调函数"
        },
        "type": "event",
        "functionInfo": {
          "params": [],
          "returns": {}
        },
        "defaultValue": ""
      }
    }
  },
  // 高级面板配置属性
  "configure": {
    "loop": true, // 是否可以循环
    "condition": true, // 是否渲染
    "styles": true, 
    "isContainer": true, // 是否是容器组件
    "isModal": false, // 是否时模板
    "nestingRule": { // 嵌套规则，比如配置父子、孩子组件白名单
      "childWhitelist": "",
      "parentWhitelist": "",
      "descendantBlacklist": "",
      "ancestorWhitelist": ""
    },
    "isNullNode": false, // 是否可以为空
    "isLayout": false,
    "rootSelector": "",
    "shortcuts": {
      "properties": [
        "text",
        "size"
      ]
    },
    "contextMenu": {
      "actions": [
        "create symbol"
      ],
      "disable": [
        "copy",
        "remove"
      ]
    }
  }
}
```

录入物料时与高级面板相关配置项

![](http://image.opentiny.design/tiny-lts/v1/images/0e00baa454c286f0b1f48070af033340_1448x541.png)



### 绑定事件

- 在画布选择对应组件
- 点击高级面板&rarr;事件绑定&rarr;选择需要绑定的事件
- 在弹窗中选择 JS 面板中已有方法或新建 一个 JS 方法（新建需要绑定完成后点击JS面板完成方法体编写）

![绑定事件](http://image.opentiny.design/tiny-lts/v1/images/db0fc6deea671e677cdcb30f14908132_1818x1106.gif)

**注意** ：为了避免设计时候点击事件造成的一些困扰，我们在画布上屏蔽了组件的点击事件，所以我们在画布无法直接触发绑定事件，如果需要验证点击事件，请保存后点击预览进行验证。
