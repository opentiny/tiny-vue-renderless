# 物料资产包协议

[TOC]

物料资产包协议用于定义一份物料中包含的所有组件和区块的描述信息，包含组件与区块 名称与分组、对外暴露的属性与事件、属性配置面板的渲染配置、快捷配置菜单等信息

## 物料资产包协议结构

| 字段                 | 说明                                     | 类型   |
| -------------------- | ---------------------------------------- | ------ |
| framework            | 物料使用的框架，例如 Vue、Angular、React | String |
| materials            | 物料详情                                 | Object |
| materials.components | 组件列表，由多个组件 Schema 组成         | Array  |
| materials.blocks     | 区块列表，由多个区块 Schema 组成         | Array  |
| materials.snippets   | 在组件面板展示的组件的集合               | Array  |

例如：

```json
{
  "framework": "Vue",
  "materials": {
    "components": [
      {} // 组件协议
    ], // 组件列表
    "blocks": [
      {} // 区块协议
    ], // 区块列表
    "snippets": [
      {
        "group": "基础组件",
        "children": [
          {} // 插入到画布时的组件 schema
        ]
      }
    ] // 组件面板展示的组件列表
  }
}
```

## 组件协议结构规范

| 字段              | 说明                                         | 类型   |
| ----------------- | -------------------------------------------- | ------ |
| name              | 组件名称，已 i18n 形式配置                   | Object |
| component         | 组件名                                       | String |
| icon              | 组件图标                                     | String |
| screenshot        | 快照                                         | String |
| description       | 组件介绍描述                                 | String |
| npm               | 组件 NPM 包信息，会根据此描述引入 npm 源组件 | Object |
| npm.package       | npm 包名                                     |        |
| npm.exportName    | 需要从 npm 包中 import 的 名称               |        |
| npm.version       | package 的版本                               |        |
| npm.destructuring | 是否以结构方式 import                        |        |
| npm.script        | ESModule格式的JS文件CDN地址                        |    String    |
| npm.css           | 样式文件CDN地址                        |    String    |
| group             | 组件分组                                     | String |
| schema            | 组件元数据(定义属性、事件等)                 | Object |
| configure         | 组件的属性信息                               | Object |
| version           | 组件版本                                     | Object |

### 组件元数据结构规范

组件元数据规范用于描述组件的对外 API：属性、事件等，对应组件的 `schema`字段

| 字段        | 说明                         | 类型             |
| ----------- | ---------------------------- | ---------------- |
| properties  | 组件暴露的配置属性           | Array `<Object>` |
| events      | 组件暴露的事件               | Object           |
| shortcuts   | 组件可以在画布快捷配置的属性 | Object           |
| contentMenu | 右键菜单动作                 |                  |

组件暴露配置属性项结构（properties[0]）

| 字段                    | 说明                                                        | 类型                       |
| ----------------------- | ----------------------------------------------------------- | -------------------------- |
| label                   | 配置分类名                                                  | Object                     |
| description             | 配置分类描述                                                | Object                     |
| collapse                | 配置项超出数量时收缩展示                                    | Object                     |
| content                 | 属性项                                                      | Array                      |
| content[0].property     | 要配置的组件属性名                                          | string                     |
| content[0].type         | 属性值的类型                                                | string                     |
| content[0].defaultValue | 属性值的默认值                                              | string\| boolean \| number |
| content[0].label        | 展示的属性配置 label                                        | Object                     |
| content[0].cols         |                                                             |                            |
| content[0].rules        | 属性值的校验规则                                            | Array                      |
| content[0].hidden       | 是否展示改属性配置                                          | boolean                    |
| content[0].required     | 是否必须配置该属性项                                        | boolean                    |
| content[0].readOnly     | 该属性项是否只读                                            | boolean                    |
| content[0].disabled     | 是否禁用配置该属性项                                        | boolean                    |
| content[0].widget       | 配置属性值的渲染组件和 props                                | Object                     |
| content[0].device       | 使用该属性的设备 e.g. pc 端，移动端，可选：pc,mobile        | string                     |
| widget.component        | 使用哪个组件来配置属性值，比如可选 `MetaInput` `MetaSelect` | string                     |
| widget.props            | 属性值组件的 props                                          | Object                     |

组件元数据示例

```json
{
  // 组件元数据定义
  "properties": [
    {
      "label": {
        "text": {
          "zh_CN": "基础信息" // 属性显示名称
        }
      },
      "description": {
        "text": {
          "zh_CN": "基础信息"
        }
      },
      "content": [
        {
          "label": {
            "text": {
              "zh_CN": "按钮文字" // 属性显示名称
            }
          },
          "description": {
            "text": {
              "zh_CN": "详细的描述文字，会在鼠标放入？时显示"
            }
          },
          "required": true,
          "readOnly": false, // 支持使用{{ }} e.g. "{{ $rootData.color !== "primary" }}"
          "disabled": false,
          "property": "text",
          "defaultValue": "Tiny Button", // 默认值
          // string number bool array object function event
          "type": "string", // 属性值类型, 字符串或者对象  e.g. ["string", "object"]
          "hidden": "{{ $rootData.color !== "primary" }}", // $rootData表示全部数据, $parentData表示父级数据
          "cols": 12,
          "device": ["pc","mobile"],
          "widget": {
            "component": "InputText",
            "props": {} // 支持使用{{ }}
          }, // 渲染组件， type为数组时此处也对应为数组， e.g. ["InputText", "InputSelect"]
          "rules": [
            {
              "pattern": "^[A-Za-z0-9]+$",
              "message": {
                "zh_CN": "只允许填写英文字母和数字"
              }
            },
            {
              "validator": "(rule, value) => value === "muji"",
              "message": {
                "zh_CN": "只允许填写英文字母和数字"
              }
            }
          ]
        }
      ]
    }
  ],
  "events": {
    "onClick": {
      // 事件的名称为 on+大写字母 开头
      "label": {
        "zh_CN": "点击事件" // 事件名称
      },
      "description": {
        "zh_CN": "详细的描述文字，会在鼠标放入？时显示"
      },
      "type": "event", // 事件的type为event
      "functionInfo": {
        // 当type为 event或者 function时有 functionInfo字段
        "params": [
          {
            "name": "e",
            "type": "string",
            "defaultValue": "",
            "description": {
              "zh_CN": "事件参数的描述文字"
            }
          }
        ],
        "returns": {
          "type": "string",
          "defaultValue": "",
          "description": {
            "zh_CN": "事件返回值的描述文字"
          }
        }
      },
      "defaultValue": "function onClick(e) {}"
    }
  },
  "shortcuts": {
    "properties": ["text", "columns"] // 选中组件后点击设置出现的快捷菜单面板
  },
  "contentMenu": {
    "actions": ["create symbol"] // 右键菜单动作
  }
}

```

### 组件属性信息结构规范

组件属性信息规范用于描述组件的额外信息，如是否是容器，是否支持循环，是否支持快捷方式，是否支持右键菜单等，对应组件的 `configure` 字段

```json
// configure
{
  "loop": true, // 是否支持循环
  "condition": true, // 是否在画布中渲染
  "styles": true,
  "isContainer": false, //是否为容器，设置为true,且具有一个或多个具名插槽需新增 slots 配置，格式："slots":["slotName","slotName"];
  "isModal": false, // 组件是否带浮层，浮层组件拖入设计器时会遮挡画布区域，此时应当辅助一些交互以防止阻挡
  "nestingRule": {
    "childWhitelist": "", // 子节点类型白名单
    "parentWhitelist": "", // 父节点类型白名单
    "descendantBlacklist": "", // 后裔节点类型黑名单
    "ancestorWhitelist": "" // 祖父节点类型白名单
  },
  "isNullNode": false, // 是否存在渲染的根节点
  "isLayout": false,
  "rootSelector": "", // 组件选中框的 cssSelector
  "shortcuts": {
    "properties": ["text", "size"]
  },
  "contextMenu": {
    "actions": [
      "copy",
      "remove",
      "insert",
      "updateAttr",
      "bindEevent",
      "createBlock"
    ],
    "disable": ["copy", "remove"]
  }
}
```

## 区块结构规范

| 字段                  | 说明                   | 类型    |
| --------------------- | ---------------------- | ------- |
| id                    | 区块 id                | number  |
| assets                | 区块依赖的物料包信息   | Object  |
| framework             | 前端框架               | String  |
| description           | 区块描述               | String  |
| path                  | 生成代码路径           | String  |
| platform              | 平台                   | String  |
| tenant                | 租户 ID                | String  |
| label                 | 区块 HTML 标签         | String  |
| author                | 作者                   | String  |
| screenshot            | 区块快照               | string  |
| build_info            | 构建相关信息           | Object  |
| tenant                | 租户 id                | number  |
| content               | 区块结构               | Object  |
| content.type          | 类型 "block"           | "block" |
| content.component     | 区块 HTML 标签         | string  |
| content.componentName | 固定值 "Block"         | “Block” |
| content.label         | 区块 HTML 标签         | string  |
| content.fileName      | 区块文件名             | string  |
| content.css           | 区块 CSS               | string  |
| content.lifeCycles    | 区块的生命周期         | Object  |
| content.methods       | 区块的方法             | Object  |
| content.schema        | 区块的暴露的可配置属性 | Object  |
| content.state         | 区块定义的状态值       | Object  |

区块结构示例

```json
{
  "id": 808, // 区块id
  "label": "CrmQuoteDownloadList", // 区块 HTML
  "framework": "Vue",
  "content": { // 区块详细组成描述
    "componentName": "Block",
     // 区块文件名
    "fileName": "CrmQuoteDownloadList",
     // 区块 css
    "css": ".crm-quote-download-list {\r\n  width: 550px;}",
    // 区块暴露的配置的 schema
    "schema": {
      "properties": [
        {
          "label": {
            "zh_CN": "基础信息"
          },
          "description": {
            "zh_CN": "基础信息"
          },
          "collapse": {
            "number": 6,
            "text": {
              "zh_CN": "显示更多"
            }
          },
          "content": [
            {
              "property": "show",
              "type": "Boolean",
              "defaultValue": true,
              "label": {
                "text": {
                  "zh_CN": "是否显示下载列表"
                }
              },
              "description": {
                "zh_CN": "配置下载列表显示隐藏"
              },
              "widget": {
                "component": "MetaSwitch",
                "props": {}
              },
              "cols": 12,
              "rules": [],
              "required": true,
              "handle": {}
            }
          ]
        }
      ],
      "events": {
        "close": {
          "label": {
            "zh_CN": "close"
          },
          "description": {
            "zh_CN": "关闭"
          }
        }
      }
    },
    "lifeCycles": {
      "setup": {
        "type": "JSFunction",
        "value": "function({ props, watch, onMounted, state }) {\n const getGridData = ({ page }) => {\r\n  const curPage = page.currentPage\r\n  const pageSize = page.pageSize\r\n  const offset = (curPage - 1) * pageSize\r\n\r\n  return new Promise((resolve) => {\r\n    resolve({\r\n      result: state.tableData.slice(offset, offset + pageSize),\r\n      page: { total: state.tableData.length }\r\n    })\r\n  })\r\n}\r\n\r\nwatch(\r\n  () => props.show,\r\n  (value) => {\r\n    state.show = value\r\n  }\r\n)\r\n\r\nonMounted(() => {\r\n  state.fetchData.api = getGridData\r\n}) \n}"
      }
    },
    // 组成区块的组件，或者子区块描述
    "children": [
      {
        "componentName": "div",
        "condition": {
          "type": "JSExpression",
          "value": "this.state.show"
        },
        "props": {
          "className": "crm-quote-download-list"
        },
        "children": [
          {
            "componentName": "div",
            "props": {
              "className": "download-list-title"
            },
            "children": [
              {
                "componentName": "span",
                "props": {
                  "className": "title"
                },
                "children": {
                  "type": "i18n",
                  "key": "contract.channel_motivation.export_record"
                },
                "id": "72b0b150"
              },
            // ....
          }
        ],
        "id": "bd926cd5"
      }
    ],
    // 区块的状态值
    "state": {
      "show": {
        "type": "JSExpression",
        "value": "this.props.show"
      },
      "tableData": [
        {
          "id": "1",
          "name": "客户界面报价单",
          "status": "已生成",
          "createdDate": "2022/03/22 15:35:04"
        }
      ]
    },
    // 区块定义的js方法
    "methods": {
      "closeDownloadList": {
        "type": "JSFunction",
        "value": "function() {\r\n this.emit('close') \r\n}"
      }
    },
    "type": "block",
    "component": "CrmQuoteDownloadList",
    "label": "CrmQuoteDownloadList"
  },
  "published_at": "2022-04-24T13:18:01.000Z", // 发布时间
  "created_at": "2022-04-24T13:18:01.000Z", // 创建时间
  "updated_at": "2022-06-02T05:49:07.000Z", // 更新时间
  "platform": null, // 所属平台
  "assets": null, // 资产
  "last_build_info": null,
  "tenant": 1, // 租户 id
  "description": null, // 区块描述
  "tags": null, // 区块标签
  "author": null, // 区块作者
  "current_history": null, // 当前历史
  // 区块快照
  "screenshot": "https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/assets/images/block_screenshot/CrmQuoteDownloadList/CrmQuoteDownloadList_1654148946586.png",
   // 区块路径
  "path": "crm/quote-list",
  "occupier": null
}
```

## 协议描述示例

### 物料资产包描述示例

```json
{
  "data": {
    "framework": "Vue",
    "materials": {
      "components": [
        {
          "name": {
            "zh_CN": "按钮"
          },
          "component": "tiny-button",
          "icon": "button",
          "description": "常用的操作按钮，提供包括默认按钮、图标按钮、图片按钮、下拉按钮等类型",
          "docUrl": "",
          "screenshot": "",
          "tags": "",
          "keywords": "",
          "devMode": "proCode",
          "npm": {
            "package": "@opentiny/vue",
            "exportName": "Button",
            "version": "",
            "destructuring": true
          },
          "group": "component",
          "category": "general",
          "priority": 1,
          "schema": {
            "properties": [
              {
                "label": {
                  "zh_CN": "基础信息"
                },
                "description": {
                  "zh_CN": "基础信息"
                },
                "collapse": {
                  "number": 6,
                  "text": {
                    "zh_CN": "显示更多"
                  }
                },
                "content": [
                  {
                    "property": "PropTypes",
                    "type": ["string", "number"],
                    "defaultValue": "多类型",
                    "label": {
                      "text": {
                        "zh_CN": "多类型"
                      }
                    },
                    "cols": 12,
                    "rules": [],
                    "hidden": false,
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "bindState": true,
                    "widget": {
                      "component": ["MetaBindI18n", "MetaNumber"],
                      "props": {}
                    },
                    "description": {
                      "zh_CN": ""
                    }
                  },
                  {
                    "property": "propGroup",
                    "type": "array",
                    "defaultValue": "复杂 prop 属性面板配置",
                    "label": {
                      "text": {
                        "zh_CN": "复杂 prop 属性面板配置"
                      }
                    },
                    "cols": 12,
                    "rules": [],
                    "hidden": false,
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "bindState": true,
                    "widget": {
                      "component": "MetaArrayItem",
                      "props": {
                        "type": "object",
                        "textField": "title",
                        "language": "json",
                        "buttonText": "编辑列配置",
                        "title": "编辑列配置"
                      }
                    },
                    "properties": [
                      {
                        "label": {
                          "zh_CN": "默认分组"
                        },
                        "content": [
                          {
                            "property": "title",
                            "type": "string",
                            "defaultValue": "详情",
                            "label": {
                              "text": {
                                "zh_CN": "列标题"
                              }
                            },
                            "widget": {
                              "component": "MetaBindI18n",
                              "props": {}
                            }
                          },
                          {
                            "property": "dataKey",
                            "type": "string",
                            "defaultValue": "testData",
                            "label": {
                              "text": {
                                "zh_CN": "列键值"
                              }
                            },
                            "widget": {
                              "component": "MetaInput",
                              "props": {}
                            }
                          },
                          {
                            "property": "sorter",
                            "type": "boolean",
                            "defaultValue": true,
                            "label": {
                              "text": {
                                "zh_CN": "是否排序"
                              }
                            },
                            "widget": {
                              "component": "MetaSwitch",
                              "props": {}
                            }
                          },
                          {
                            "property": "width",
                            "type": "string",
                            "defaultValue": "",
                            "label": {
                              "text": {
                                "zh_CN": "列宽"
                              }
                            },
                            "widget": {
                              "component": "MetaInput",
                              "props": {}
                            }
                          }
                        ]
                      }
                    ],
                    "description": {
                      "zh_CN": ""
                    }
                  },
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
                    "rules": [],
                    "hidden": false,
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "bindState": true,
                    "widget": {
                      "component": "MetaBindI18n",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": ""
                    }
                  }
                ]
              },
              {
                "name": "1",
                "label": {
                  "zh_CN": "其他配置"
                },
                "content": [
                  {
                    "property": "round",
                    "label": {
                      "text": {
                        "zh_CN": "圆角"
                      }
                    },
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "cols": 12,
                    "widget": {
                      "component": "MetaSwitch",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": "是否圆角按钮"
                    },
                    "labelPosition": "left"
                  },
                  {
                    "property": "plain",
                    "label": {
                      "text": {
                        "zh_CN": "朴素按钮"
                      }
                    },
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "cols": 12,
                    "widget": {
                      "component": "MetaSwitch",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": "是否为朴素按钮"
                    },
                    "labelPosition": "left"
                  },
                  {
                    "property": "reset-time",
                    "label": {
                      "text": {
                        "zh_CN": "禁用时间"
                      }
                    },
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "cols": 12,
                    "widget": {
                      "component": "MetaNumeric",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": "设置禁用时间，防止重复提交，单位毫秒"
                    }
                  },
                  {
                    "property": "circle",
                    "label": {
                      "text": {
                        "zh_CN": "圆角"
                      }
                    },
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "cols": 12,
                    "widget": {
                      "component": "MetaSwitch",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": "是否圆形按钮"
                    },
                    "labelPosition": "left"
                  },
                  {
                    "property": "autofocus",
                    "label": {
                      "text": {
                        "zh_CN": "聚焦"
                      }
                    },
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "cols": 12,
                    "widget": {
                      "component": "MetaSwitch",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": "是否默认聚焦"
                    },
                    "labelPosition": "left"
                  },
                  {
                    "property": "loading",
                    "label": {
                      "text": {
                        "zh_CN": "加载中"
                      }
                    },
                    "required": true,
                    "readOnly": false,
                    "disabled": false,
                    "cols": 12,
                    "widget": {
                      "component": "MetaSwitch",
                      "props": {}
                    },
                    "description": {
                      "zh_CN": "是否展示位加载中样式"
                    },
                    "labelPosition": "left"
                  }
                ],
                "description": {
                  "zh_CN": ""
                }
              }
            ],
            "slots": {
              "default": {
                "componentName": "slot"
              }
            },
            "events": {
              "onClick": {
                "label": {
                  "zh_CN": "点击事件"
                },
                "description": {
                  "zh_CN": "按钮被点击时触发的回调函数"
                },
                "type": "event",
                "functionInfo": {
                  "params": [
                    {
                      "name": "component",
                      "type": "Object",
                      "defaultValue": "",
                      "description": {
                        "zh_CN": "当前点击的页签对象"
                      }
                    }
                  ],
                  "returns": {
                    "type": "string",
                    "defaultValue": "",
                    "description": {
                      "zh_CN": "事件返回值的描述文字"
                    }
                  }
                },
                "defaultValue": ""
              }
            }
          },
          "configure": {
            "loop": true,
            "condition": true,
            "styles": true,
            "isContainer": false,
            "isModal": false, // 组件是否带浮层，浮层组件拖入设计器时会遮挡画布区域，此时应当辅助一些交互以防止阻挡
            "nestingRule": {
              "childWhitelist": "", // 子节点类型白名单
              "parentWhitelist": "", // 父节点类型白名单
              "descendantBlacklist": "", // 后裔节点类型黑名单
              "ancestorWhitelist": "" // 祖父节点类型白名单
            },
            "isNullNode": false, // 是否存在渲染的根节点
            "isLayout": false,
            "rootSelector": "", // 组件选中框的 cssSelector
            "shortcuts": {
              "properties": ["text", "size"]
            },
            "contextMenu": {
              "actions": ["create symbol"],
              "disable": ["copy", "remove"]
            }
          }
        }
      ],
      "blocks": [],
      "snippets": [{}]
    }
  }
}
```

### 组件描述示例

```json
{
  "name": {
    "zh_CN": "按钮"
  },
  "component": "tiny-button",
  "icon": "button",
  "description": "常用的操作按钮，提供包括默认按钮、图标按钮、图片按钮、下拉按钮等类型",
  "docUrl": "", // 组件文档链接
  "screenshot": "",
  "tags": "", // 组件标签
  "keywords": "",
  "devMode": "proCode", // 组件研发模式
  "npm": {
    "package": "@opentiny/vue",
    "exportName": "Button",
    "version": "",
    "destructuring": true
  },
  "group": "component", // 当前组件位于组件面板的哪个 tab
  "category": "general", // 描述组件位于组件面板同一 tab 的哪个区域
  "priority": 2, // 描述组件在同一 category 中的排序
  "snippets":[
   {
      "title": "按钮组",
      "icon": "buttons",
      "snippetName": "tiny-buttons",
      "screenshot": "",
      "schema": {
        "componentName": "Box",
        "props": {},
        "children": [
          {
            "componentName": "tiny-button",
            "props": {
              "text": "提交",
              "type": "primary",
              "style": {
                "margin": "0 5px 0 5px"
              }
            }
          },
          {
            "componentName": "tiny-button",
            "props": {
              "text": "重置",
              style: {
                margin: "0 5px 0 5px"
              }
            }
          },
          {
            "componentName": "tiny-button",
            "props": {
              "text": "取消"
            }
          }
        ]
      }
    }
  ],// 组件使用的 schema 片段
  "schema": {
    "properties": [
      {
        "label": {
          "zh_CN": "基础信息"
        },
        "description": {
          "zh_CN": "基础信息"
        },
        "collapse": {
          "number": 6,
          "text": {
            "zh_CN": "显示更多"
          }
        },
        "content": [
          {
            "property": "PropTypes",
            "type": ["string", "number"],
            "defaultValue": "多类型",
            "label": {
              "text": {
                "zh_CN": "多类型"
              }
            },
            "cols": 12,
            "rules": [],
            "hidden": false,
            "required": true,
            "readOnly": false,
            "disabled": false,
            "bindState": true,
            "widget": {
              "component": ["MetaBindI18n", "MetaNumber"],
              "props": {}
            },
            "description": {
              "zh_CN": ""
            }
          },
          {
            "property": "propGroup",
            "type": "array",
            "defaultValue": "复杂 prop 属性面板配置",
            "label": {
              "text": {
                "zh_CN": "复杂 prop 属性面板配置"
              }
            },
            "cols": 12,
            "rules": [],
            "hidden": false,
            "required": true,
            "readOnly": false,
            "disabled": false,
            "bindState": true,
            "widget": {
              "component": "MetaArrayItem",
              "props": {
                "type": "object",
                "textField": "title",
                "language": "json",
                "button""text": "编辑列配置",
                "title": "编辑列配置"
              }
            },
            "properties": [
              {
                "label": {
                  "zh_CN": "默认分组"
                },
                "content": [
                  {
                    "property": "title",
                    "type": "string",
                    "defaultValue": "详情",
                    "label": {
                      "text": {
                        "zh_CN": "列标题"
                      }
                    },
                    "widget": {
                      "component": "MetaBindI18n",
                      "props": {}
                    }
                  },
                  {
                    "property": "dataKey",
                    "type": "string",
                    "defaultValue": "testData",
                    "label": {
                      "text": {
                        "zh_CN": "列键值"
                      }
                    },
                    "widget": {
                      "component": "MetaInput",
                      "props": {}
                    }
                  },
                  {
                    "property": "sorter",
                    "type": "boolean",
                    "defaultValue": true,
                    "label": {
                      "text": {
                        "zh_CN": "是否排序"
                      }
                    },
                    "widget": {
                      "component": "MetaSwitch",
                      "props": {}
                    }
                  },
                  {
                    "property": "width",
                    "type": "string",
                    "defaultValue": "",
                    "label": {
                      "text": {
                        "zh_CN": "列宽"
                      }
                    },
                    "widget": {
                      "component": "MetaInput",
                      "props": {}
                    }
                  }
                ]
              }
            ],
            "description": {
              "zh_CN": ""
            }
          },
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
            "rules": [],
            "hidden": false,
            "required": true,
            "readOnly": false,
            "disabled": false,
            "bindState": true,
            "widget": {
              "component": "MetaBindI18n",
              "props": {}
            },
            "description": {
              "zh_CN": ""
            }
          }
        ]
      },
      {
        name: "1",
        "label": {
          "zh_CN": "其他配置"
        },
        content: [
          {
            "property": "round",
            "label": {
              "text": {
                "zh_CN": "圆角"
              }
            },
            "required": true,
            "readOnly": false,
            "disabled": false,
            "cols": 12,
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "description": {
              "zh_CN": "是否圆角按钮"
            },
            "labelPosition": "left"
          },
          {
            "property": "plain",
            "label": {
              "text": {
                "zh_CN": "朴素按钮"
              }
            },
            "required": true,
            "readOnly": false,
            "disabled": false,
            "cols": 12,
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "description": {
              "zh_CN": "是否为朴素按钮"
            },
            "labelPosition": "left"
          },
          {
            "property": "reset-time",
            "label": {
              "text": {
                "zh_CN": "禁用时间"
              }
            },
            "required": true,
            "readOnly": false,
            "disabled": false,
            "cols": 12,
            "widget": {
              "component": "MetaNumeric",
              "props": {}
            },
            "description": {
              "zh_CN": "设置禁用时间，防止重复提交，单位毫秒"
            }
          },
          {
            "property": "circle",
            "label": {
              "text": {
                "zh_CN": "圆角"
              }
            },
            "required": true,
            "readOnly": false,
            "disabled": false,
            "cols": 12,
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "description": {
              "zh_CN": "是否圆形按钮"
            },
            "labelPosition": "left"
          },
          {
            "property": "autofocus",
            "label": {
              "text": {
                "zh_CN": "聚焦"
              }
            },
            "required": true,
            "readOnly": false,
            "disabled": false,
            "cols": 12,
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "description": {
              "zh_CN": "是否默认聚焦"
            },
            "labelPosition": "left"
          },
          {
            "property": "loading",
            "label": {
              "text": {
                "zh_CN": "加载中"
              }
            },
            "required": true,
            "readOnly": false,
            "disabled": false,
            "cols": 12,
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "description": {
              "zh_CN": "是否展示位加载中样式"
            },
            "labelPosition": "left"
          }
        ],
        "description": {
          "zh_CN": ""
        }
      }
    ],
    "slots": {
      "default": {
        "componentName": "slot"
      }
    },
    "events": {
      "onClick": {
        "label": {
          "zh_CN": "点击事件"
        },
        "description": {
          "zh_CN": "按钮被点击时触发的回调函数"
        },
        "type": "event",
        "functionInfo": {
          "params": [
            {
              "name": "component",
              "type": "Object",
              "defaultValue": "",
              "description": {
                "zh_CN": "当前点击的页签对象"
              }
            }
          ],
          "returns": {
            "type": "string",
            "defaultValue": "",
            "description": {
              "zh_CN": "事件返回值的描述文字"
            }
          }
        },
        "defaultValue": ""
      }
    }
  },
  "configure": {
    "loop": true,
    "condition": true,
    "styles": true,
    "isContainer": false, //是否为容器，设置为true,且具有一个或多个具名插槽需新增 slots 配置，格式："slots":["slotName","slotName"];
    "isModal": false, // 组件是否带浮层，浮层组件拖入设计器时会遮挡画布区域，此时应当辅助一些交互以防止阻挡
    "nestingRule": {
      "childWhitelist": "", // 子节点类型白名单
      "parentWhitelist": "", // 父节点类型白名单
      "descendantBlacklist": "", // 后裔节点类型黑名单
      "ancestorWhitelist": "" // 祖父节点类型白名单
    },
    "isNullNode": false, // 是否存在渲染的根节点
    "isLayout": false,
    "rootSelector": "", // 组件选中框的 cssSelector
    "shortcuts": {
      "properties": ["text", "size"]
    },
    "contextMenu": {
      "actions": ["copy","remove","insert","updateAttr","bindEevent","createBlock"],
      "disable": ["copy", "remove"]
    }
  }
}
```

### 区块描述示例

```json
{
    "id": 784,
    "label": "CrmAddService",
    "framework": "Vue",
    "content": {
        "componentName": "Block",
        "fileName": "CrmAddService",
        "css": ".selected-label {\r\n  color: #8a8e99;\r\n}\r\n.selected-value {\r\n  font-weight: 700;\r\n}\r\n.service-tree {\r\n  box-sizing: border-box;\r\n  border: 1px solid #dfe1e6;\r\n  padding: 20px;\r\n  margin-top: 8px;\r\n  width: 310px;\r\n  height: 440px;\r\n  overflow-y: auto;\r\n}\r\n.service-tree .service-tiny-tree {\r\n  margin-top: 12px;\r\n}",
        "schema": {
            "properties": [
                {
                    "label": {
                        "zh_CN": "基础信息"
                    },
                    "description": {
                        "zh_CN": "基础信息"
                    },
                    "collapse": {
                        "number": 6,
                        "text": {
                            "zh_CN": "显示更多"
                        }
                    },
                    "content": [
                        {
                            "property": "data",
                            "type": "Array",
                            "defaultValue": [],
                            "label": {
                                "text": {
                                    "zh_CN": "云服务数据"
                                }
                            },
                            "description": {
                                "zh_CN": "云服务数据"
                            },
                            "widget": {
                                "component": "MetaInput",
                                "props": {}
                            },
                            "cols": 12,
                            "rules": [],
                            "linked": {
                                "componentName": "TinyButton",
                                "property": "text",
                                "id": "222"
                            }
                        },
                        {
                            "property": "text",
                            "type": "String",
                            "defaultValue": "添加",
                            "label": {
                                "text": {
                                    "zh_CN": "按钮文本"
                                }
                            },
                            "description": {
                                "zh_CN": "按钮文本"
                            },
                            "widget": {
                                "component": "MetaInput",
                                "props": {}
                            },
                            "cols": 12,
                            "rules": [],
                            "linked": {
                                "componentName": "TinyButton",
                                "property": "text",
                                "id": "222"
                            }
                        }
                    ]
                }
            ],
            "events": {
                "onAdd": {
                    "label": {
                        "zh_CN": "点击按钮添加服务"
                    },
                    "description": {
                        "zh_CN": "确定添加服务"
                    }
                }
            }
        },
        "children": [
            {
                "componentName": "div",
                "props": {
                    "className": "crm-add-service"
                },
                "children": [
                    {
                        "componentName": "TinyButton",
                        "id": "222",
                        "props": {
                            "size": "small",
                            "style": {
                                "margin-left": "8px"
                            },
                            "text": {
                                "type": "JSExpression",
                                "value": "this.props.text"
                            },
                            "onClick": {
                                "type": "JSExpression",
                                "value": "this.openDialog"
                            }
                        }
                    },
                    {
                        "componentName": "TinyDialogBox",
                        "props": {
                            "visible": {
                                "type": "JSExpression",
                                "value": "this.state.boxVisibility",
                                "model": {
                                    "prop": "visible"
                                }
                            },
                            "title": {
                                "type": "JSExpression",
                                "value": "this.props.text"
                            },
                            "width": "368px"
                        },
                        "children": [
                            {
                                "componentName": "div",
                                "children": [
                                    {
                                        "componentName": "span",
                                        "props": {
                                            "className": "selected-label"
                                        },
                                        "children": {
                                            "type": "i18n",
                                            "key": "quotes.quoteconfig.category_is_selected"
                                        },
                                        "id": "483ecde1"
                                    },
                                    {
                                        "componentName": "span",
                                        "props": {
                                            "className": "selected-value"
                                        },
                                        "children": {
                                            "type": "JSExpression",
                                            "value": "this.state.checkedNodes.length"
                                        },
                                        "id": "019743e2"
                                    }
                                ],
                                "id": "5f77c4da"
                            },
                            {
                                "componentName": "div",
                                "props": {
                                    "className": "service-tree"
                                },
                                "children": [
                                    {
                                        "componentName": "TinySearch",
                                        "props": {
                                            "value": {
                                                "type": "JSExpression",
                                                "value": "this.state.filterText",
                                                "model": {
                                                    "prop": ""
                                                }
                                            },
                                            "placeholder": {
                                                "type": "i18n",
                                                "key": "quotes.productlist.pleaseenterkeywords"
                                            },
                                            "size": "mini",
                                            "onChange": {
                                                "type": "JSExpression",
                                                "value": "this.search"
                                            }
                                        },
                                        "id": "51396a6d"
                                    },
                                    {
                                        "componentName": "TinyTree",
                                        "props": {
                                            "ref": "treeRef",
                                            "className": "service-tiny-tree",
                                            "data": {
                                                "type": "JSExpression",
                                                "value": "this.state.treeData"
                                            },
                                            "show-checkbox": true,
                                            "check-on-click-node": true,
                                            "icon-trigger-click-node": true,
                                            "shrink-icon": {
                                                "type": "JSExpression",
                                                "value": "this.state.IconMinusSquare"
                                            },
                                            "expand-icon": {
                                                "type": "JSExpression",
                                                "value": "this.state.IconPlusSquare"
                                            },
                                            "filter-node-method": {
                                                "type": "JSExpression",
                                                "value": "this.filterNode"
                                            },
                                            "onCheckChange": {
                                                "type": "JSExpression",
                                                "value": "this.checkChange"
                                            }
                                        },
                                        "children": [
                                            {
                                                "componentName": "Template",
                                                "props": {
                                                    "slot": {
                                                        "name": "default",
                                                        "params": "sourceData"
                                                    }
                                                },
                                                "children": [
                                                    {
                                                        "componentName": "div",
                                                        "props": {
                                                            "className": "tiny-tree-node__label"
                                                        },
                                                        "children": {
                                                            "type": "JSExpression",
                                                            "value": "sourceData.data?.label || """
                                                        }
                                                    }
                                                ]
                                            }
                                        ],
                                        "id": "0e19cd6f"
                                    }
                                ],
                                "id": "c6df3fc5"
                            },
                            {
                                "componentName": "Template",
                                "props": {
                                    "slot": {
                                        "name": "footer"
                                    }
                                },
                                "children": [
                                    {
                                        "componentName": "TinyButton",
                                        "props": {
                                            "type": "primary",
                                            "text": {
                                                "type": "i18n",
                                                "key": "quotes.quotelistmodal.ok"
                                            },
                                            "onClick": {
                                                "type": "JSExpression",
                                                "value": "this.confirm"
                                            }
                                        },
                                        "id": "156b0f43"
                                    },
                                    {
                                        "componentName": "TinyButton",
                                        "props": {
                                            "text": {
                                                "type": "i18n",
                                                "key": "quotes.quotelistmodal.cancel"
                                            },
                                            "onClick": {
                                                "type": "JSExpression",
                                                "value": "this.closeDialog"
                                            }
                                        },
                                        "id": "0e25121e"
                                    }
                                ]
                            }
                        ],
                        "id": "61065af7"
                    }
                ],
                "id": "62360476"
            }
        ],
        "state": {
            "boxVisibility": false,
            "checkedNodes": [],
            "checkedNodesLength": 0,
            "filterText": "",
            "IconMinusSquare": {
                "type": "JSResource",
                "value": "this.utils.IconMinusSquare()"
            },
            "IconPlusSquare": {
                "type": "JSResource",
                "value": "this.utils.IconPlusSquare()"
            },
            "treeData": {
                "type": "JSExpression",
                "value": "this.props.data"
            }
        },
        "methods": {
            "openDialog": {
                "type": "JSFunction",
                "value": "function openDialog() {\n  this.state.boxVisibility = true;\n}"
            },
            "closeDialog": {
                "type": "JSFunction",
                "value": "function closeDialog() {\n  this.state.boxVisibility = false;\n}"
            },
            "search": {
                "type": "JSFunction",
                "value": "function search(key, value) {\n  if (key.stopPropagation) {\n    key.stopPropagation();\n    return false;\n  }\n\n  this.$('treeRef').filter(value);\n}"
            },
            "checkChange": {
                "type": "JSFunction",
                "value": "function checkChange() {\n  this.state.checkedNodes = this.$('treeRef').getCheckedNodes().filter(item => !item.children);\n}"
            },
            "filterNode": {
                "type": "JSFunction",
                "value": "function filterNode(value, data) {\n  if (!value) {\n    return true;\n  }\n\n  return data.label.indexOf(value) !== -1;\n}"
            },
            "confirm": {
                "type": "JSFunction",
                "value": "function confirm() {\n  this.emit('add', {\n    checkedNodes: this.state.checkedNodes,\n    treeData: this.state.treeData\n  });\n  this.state.boxVisibility = false;\n}"
            }
        },
        "lifeCycles": {
            "setup": {
                "type": "JSFunction",
                "value": "function({ state, watch, onMounted}) {\r\n  watch(\r\n    () => props.data,\r\n    (data) => {\r\n      this.state.treeData = data\r\n    },\r\n    {\r\n      deep: true\r\n    }\r\n  )\r\n}"
            }
        }
    },
    "published_at": "2022-04-24T13:18:00.000Z",
    "created_at": "2022-04-24T13:18:00.000Z",
    "updated_at": "2022-06-08T02:05:26.000Z",
    "platform": null,
    "assets": null,
    "last_build_info": null,
    "tenant": 1,
    "description": null,
    "tags": null,
    "author": null,
    "screenshot": "https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/assets/images/block_screenshot/CrmAddService/CrmAddService_1654653924374.png",
    "path": "common"
}
```

##
