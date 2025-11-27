# 应用描述协议

[TOC]

应用描述协议用于描述当前应用 所有页面的数据、资产包组件信息、应用级数据源 桥接源 国际化词条等信息

## 应用协议结构

| 字段           | 说明               |
| -------------- | ------------------ |
| version        | 协议版本号         |
| componentsMap  | 组件映射关系       |
| componentsTree | 应用包含的页面     |
| bridge         | 桥接源             |
| meta           | 应用的基础信息     |
| dataSource     | 应用级别数据源     |
| i18n           | 应用级别国际化词条 |
| utils          | 工具类             |

## 组件映射关系

```json
"componentsMap": [
  {
    "componentName": "tiny-button", // 渲染时候使用的 组件名
    "package": "@opentiny/vue", // npm 包名
    "version": "0.1.16", // 版本号
    "destructuring": true, // 是否解构
    "exportName": "Button" // npm package 导出名
  }
]
```

## 页面结构规范

### 页面结构

| 字段             | 说明                               | 类型            |
| ---------------- | ---------------------------------- | --------------- |
| fileName         | 页面名称                           | string          |
| componentName    | 组件名，schema 是页面时值为 "Page" | string          |
| meta             | 页面元信息                         | Object          |
| meta.creator     | 新建页面的用户名称                 | string          |
| meta.description | 页面相关信息描述                   | string          |
| meta.group       | 页面分组，如 staticPages 静态页面  | sring           |
| meta.id          | 页面id                             | number          |
| meta.isHome      | 页面是否是当前应用的主页           | boolean         |
| meta.parentId    | 父级页面或文件夹id，顶层时为 “0”   | string          |
| meta.rootElement | 顶层包裹的标签                     | string          |
| meta.router      | 页面的路由                         | string          |
| meta.title       | 页面的标题                         | string          |
| css              | 页面全局 css 样式                  | string          |
| props            | 页面或者区块绑定的属性             | Object          |
| state            | 页面的 state                       | Object          |
| methods          | 页面声明的方法                     | Object          |
| children         | 页面的子组件列表或字符串           | Array \| string |

页面结构示例

 ```ts
interface IPageSchema { // 页面 或 区块 schema
  fileName?: string; // 页面名称，schema 是页面时使用
  componentName?: string; // 组件名，schema 是页面时值为 "Page"
  meta: {
    id: number; // 页面id
    creator: string; // 创建页面的用户名
    description: string; // 页面信息描述
    group: string; // 页面分组
    isHome: boolean; //是否是主页
    parentId: string; // 父级页面或文件夹 id，没有时固定为0
    rootElement: string; // 顶层包裹的标签
    router: string; // 页面的路由
  }
  css?: string; // 页面全局样式
  props?: { // 组件绑定的属性
      [prop:string]?: any;
      style?: string; // 行内样式
      className?: string; // 绑定的样式类名
  };
  children?: Array< IComponentSchema > | string; // 子组件列表 或 文本字符串
}
 ```



### 组件结构

页面的子组件 `children` 字段的结构

| 字段          | 说明                                                         | 类型   |
| ------------- | ------------------------------------------------------------ | ------ |
| componentName | 组件或区块名                                                 | string |
| componentType | 组件类型可以是组件或区块，为组件时，可以省略该字段，为区块时，值为: "block" | string |
| id            | 唯一 id                                                      | string |
| props         | 组件的属性值                                                 | Object |
| children      | 假如为容器组件时，可以有子组件，该字段描述子组件的信息       | Array  |

```ts
interface IComponentSchema { // 组件 schema
  componentName?: string;     // 页面
  id: string;
  props?: { // 组件绑定的属性
      condition?: boolean | IBindProps; // 条件渲染判断值
      ref?: {  // 定义组件引用 ID
          name: string; 
          type: string; 
      };
      style?: string; // 行内样式
      className?: string; // 绑定的样式类名
      [prop:string]?: IEventProps | IBindProps | any;
  };
  children?: Array< IComponentSchema > | string;
}
```



### 数据源结构

| 字段         | 说明                                         | 类型   |
| ------------ | -------------------------------------------- | ------ |
| dataHandler  | 数据处理方法，用于处理远程接口数据返回来的值 |        |
| list         | 数据源列表                                   | Array  |
| list[0].app  | 数据源所属的应用 id                          | string |
| list[0].desc | 数据源信息描述                               | string |
| list[0].id   | 数据源 id                                    | number |
| list[0].name | 数据源名称                                   | string |
| list[0].tpl  | 模板，用于某些高度重复的数据结构的复用       |        |
| list[0].data | 数据源详细配置信息                           | Object |



```ts
interface IDataSource { // 数据源定义
  dataHandler: string;  
  list: Array<{ 
      id: number; // 数据源 id
      name: string; // 数据源名称
      desc?: string; // 数据源描述
      app: string; // 数据源所属应用 id
      data: {
          columns: Array<{}>; // 用户定义添加
          data: Array<{}>; // 用户定义添加
          dataHandler: {   // 数据处理函数
              type: string;  // handler 类型，一般情况下为 "JSFunction"
              value: string; // 函数字符串
          };
          errorHandler: { // 失败后的回调函数
              type: string;  // handler 类型，一般情况下为 "JSFunction"
              value: string; // 函数字符串
          };
          option: {
              method: string; // 远程请求的方法
              url: string; // 远程请求的 url
          };
          shouldFetch: { // 是否可以发起请求的计算函数
              type: string; // "JSFunction"
              value: string; // 函数字符串
          };
          type: string; // 返回值的类型
          willFetch: { // 用于请求前参数的处理
              type: string; // "JSFunction"
              value: sting; // 函数字符串
          };
      }
  }>
}
```



### 补充一：特殊ComponentName类型



在页面中，以下 ComponentName 为保留关键字，**不允许**接入与此同名的物料；在出码时，也需要注意单独处理

| **ComponentName** | **概述**                       | **说明**                                                     |
| ----------------- | ------------------------------ | ------------------------------------------------------------ |
| Page              | 页面容器                       | 配合 fileName ，确定页面名称                                 |
| Block             | 区块容器                       | 配合 fileName ，确定区块名称                                 |
| Component         | 低代码业务组件容器**（预留）** |                                                              |
| Template          | 虚拟容器，**实际并不渲染**     | 在原生元素上使用具名插槽，如：``children 为 [] 时，出码**跳过此节点** |
| Slot              | 插槽                           | 定义插槽时使用，如：`  默认页头 `                            |
| Collection        | 数据源容器，**实际并不渲染**   | 向该容器内部的节点提供数据源，**出码跳过此节点**，遍历其 children |
| Text              | 文本节点，使用 span 渲染       | 文本内容在 text 属性中，如：`{  "componentName": "text",  "props": {    "text": "页头"  } }``页头` |



### 补充二：插槽

**1、表格自定义插槽示例：**

```json
  "slots": {
    "header": {
      "type": "JSSlot",
      "params": ["column"],
      "value": [
        {
          "componentName": "div",
          "props": {},
          "children": [
            {
              "componentName": "span",
              "props": {}
            },
            {
              "componentName": "crm-text-block",
              "props": {}
            }
          ]
        }
      ]
    }
  }
```

相当于以下表格配置代码：

```markup
  slots: {
    header({ column }, h) {
      return (
        <div>
          <span></span>
          <crm-text-block></crm-text-block>
        </div>
      )
    }
  }
```

**2、区块在方法里以及在 template 模板中使用 props 属性及抛出事件：**



```javascript
// 在方法里使用 props 的属性
this.props.xxx

// 在模板里使用 props 的属性
xxx

// 在方法里抛出事件
this.emit('xxx')

// 在模板里抛出事件
$emit('xxx')
```

 **3、区块插槽定义及使用：**

定义插槽

```json
{
  "componentName": "slot",
  "props": {
    "name": "formSlot"
  },
  "children": [
    {
      "componentName": "tiny-input",
      "props": {}
    }
  ]
}
```

生成代码示例如下：

```html
<slot name="formSlot">
  <tiny-input></tiny-input>
</slot>
```

使用作用域插槽

```json
{
  "componentName": "template",
  "props": {
    "slot": {
      "name": "footer",
      "params": ["row"]
    }
  },
  "children": [
    {
      "componentName": "tiny-input",
      "props": {}
    }
  ]
}
```

生成代码示例如下：

```html
<template #footer="{ row }">
  <tiny-input></tiny-input>
</template>
```

使用非作用域插槽

```json
{
  "componentName": "template",
  "props": {
    "slot": "footer",
  },
  "children": [
    {
      "componentName": "tiny-input",
      "props": {}
    }
  ]
}
```

生成代码示例如下：

```html
<template #footer>
  <tiny-input></tiny-input>
</template>
```



## 应用国际化

```json
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "你好 ${name}",
      "i18n-jwg27yo3": "华为"
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello ${name}",
      "i18n-jwg27yo3": "Huawei"
    }
  }
```



## 数据源

在表格外层套一个 collection 组件，组件内定义使用的数据源，数据源的列定义和数据直接设置到表格的 props 的 data 和 columns 属性上，示例如下：

```json
{
  "componentName": "collection",
  "props": {
    "dataSource": "ladderColumns"
  },
  "children": [
    {
      "componentName": "tiny-grid",
      "props": {
        "data": [
          {
            "title": "序号",
            "field": "seq",
            "width": 50
          },
          {
            "title": "阶梯起始",
            "field": "ladderStart",
            "showIcon": false,
            "editor": {
              "component": "input",
              "type": "visible"
            }
          }
        ],
        "columns": [
          {
            "title": "序号",
            "field": "seq",
            "width": 50
          },
          {
            "title": "阶梯起始",
            "field": "ladderStart",
            "showIcon": false,
            "editor": {
              "component": "input",
              "type": "visible"
            }
          }
        ]
      }
    }
  ]
}
```

数据源定义在原协议基础上扩展，增加 type 为 value，其中 data 和 columns 的内容与上面是重复的，原因在于，collection 容器内拖入表格组件，会将绑定的数据源的 data 和 columns 复制到表格对应的属性上，当 collection 容器切换数据源，则会提示用户清空并重置表格当前设置的 data 和 columns 属性，即运行在设计态允许切换和维护表格的数据源，示例如下：



```json
"dataSource": {
  "list": [
    {
      "id": "ladderColumns",
      "type": "value",
      "value": {
        "data": [
          {
            "title": "序号",
            "field": "seq",
            "width": 50
          },
          {
            "title": "阶梯起始",
            "field": "ladderStart",
            "showIcon": false,
            "editor": {
              "component": "input",
              "type": "visible"
            }
          }
        ],
        "columns": [
          {
            "title": "序号",
            "field": "seq",
            "width": 50
          },
          {
            "title": "阶梯起始",
            "field": "ladderStart",
            "showIcon": false,
            "editor": {
              "component": "input",
              "type": "visible"
            }
          }
        ]
      }
    }
  ]
}
```

## 协议描述示例

```json
{
  "version": "1.0.0",
  "componentsMap": [
    {
      "componentName": "tiny-button",
      "package": "@opentiny/vue",
      "version": "0.1.16",
      "destructuring": true,
      "exportName": "Button",
      "subName": ""
    }
  ],
  "componentsTree": [
    {
      "componentName": "Page",
      "fileName": "Home",
      "props": {},
      "css": "body {font-size: 12px;} .table { width: 100px;}",
      "meta": {
        "title": "首页",
        "description": "应用的首页",
        "router": "/",
        "creator": "m00278660",
        "gmt_create": "2022-03-31 00:00:00",
        "gmt_modified": "2022-03-31 00:00:00",
        "isHome": true,
        "parentId": 0,
        "rootElement": "div",
        "group": "staticPages"
      },
      "children": [
        {
          "componentName": "Div",
          "props": {
            "className": "red"
          },
          "children": [
            {
              "componentName": "tiny-button",
              "props": {
                "type": "primary",
                "text": {
                  "type": "JSExpression",
                  "value": "this.state.btn.text"
                },
                "onClick": {
                  "type": "JSExpression",
                  "value": "function(e) { console.log(e) }"
                }
              }
            }
          ]
        }
      ]
    },
    {
      "componentName": "Folder",
      "folderName": "price",
      "router": "/price",
      "gmt_create": "2022-03-31 00:00:00",
      "gmt_modified": "2022-03-31 00:00:00",
      "id": 1,
      "parentId": 0,
      "depth": 1
    },
    {
      "componentName": "Folder",
      "folderName": "setting",
      "router": "/setting",
      "gmt_create": "2022-03-31 00:00:00",
      "gmt_modified": "2022-03-31 00:00:00",
      "id": 2,
      "parentId": 1,
      "depth": 2
    }
  ],
  "bridge": [
    {
      "name": "clone",
      "type": "npm",
      "content": {
        "package": "lodash",
        "version": "4.17.21",
        "exportName": "clone",
        "subName": "",
        "destructuring": false,
        "main": "/lib/clone"
      }
    },
    {
      "name": "moment",
      "type": "npm",
      "content": {
        "package": "@alifd/next",
        "version": "0.0.1",
        "exportName": "Moment",
        "subName": "",
        "destructuring": true,
        "main": ""
      }
    },
    {
      "name": "helloEvent",
      "type": "function",
      "content": {
        "type": "JSFunction",
        "value": "function(e) {\n  console.log(this.i18n('i18n-jwg27yo4', {name: 'Tiny'}), e) \n}"
      }
    }
  ],
  "constants": {
    "ENV": "prod",
    "DOMAIN": "opentiny.design"
  },
  "css": "body {font-size: 12px;} .table { width: 100px;}",
  "config": {
    "sdkVersion": "1.0.3",
    "historyMode": "hash",
    "targetRootID": "app"
  },
  "meta": {
    "appId": "477",
    "name": "demo 应用",
    "tenant": "",
    "git_group": "appGroup",
    "project_name": "app_demo",
    "description": "这是一个测试应用",
    "creator": "m00278660",
    "gmt_create": "2022-03-31 00:00:00",
    "gmt_modified": "2022-03-31 00:00:00"
  },
  "dataSource": {
    "list": [
      {
        "structure": "array",
        "type": "fetch",
        "isInit": true,
        "options": {
          "params": {
            "isOpen": "test"
          },
          "method": "POST",
          "isCors": true,
          "timeout": 5000,
          "headers": {
            "title": "test"
          },
          "uri": "mock/info.json"
        },
        "id": "info",
        "columns": [
          {
            "name": "field",
            "title": "",
            "type": "",
            "format": {}
          }
        ],
        "data": [{ "field": "qq" }],
        "shouldFetch": {
          "type": "JSFunction",
          "value": "function() { return true; }"
        },
        "willFetch": {
          "type": "JSFunction",
          "value": "function(options) { return options; }"
        },
        "dataHandler": {
          "type": "JSFunction",
          "value": "function(res) { return res.data }"
        },
        "errorHandler": {
          "type": "JSFunction",
          "value": "function(err) {}"
        }
      }
    ]
  },
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "你好 ${name}",
      "i18n-jwg27yo3": "华为"
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello ${name}",
      "i18n-jwg27yo3": "Huawei"
    }
  }
}
```



