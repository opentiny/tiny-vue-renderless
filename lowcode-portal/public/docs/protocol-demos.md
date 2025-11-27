# 协议示例

## 常用特性示例

### 属性

传递给组件或者区块的属性通常是动态的，需要用到数据的绑定，绑定可以通过`{ type: 'JSExpression'; value: string; }`的结构来描述：

以表格的 fetch-data 属性为例：

```json
"fetch-data": {
  "type": "JSExpression",
  "value": "{api:this.getTableData}"
}
```

生成的 VUE 代码如下：

```VUE
:fetch-data="{ api: getTableData }"
```

### 事件

以点击事件为例：在 props 里面设置 onClick 属性调用 fixedLayout 方法

```json
"props": {
  "onClick": {
    "type": "JSFunction",
    "value": "this.fixedLayout"
  }
}
```

```VUE
@click="fixedLayout"
```

### 方法

**方法的定义**

```json
{
  "componentName": "Block",
  "fileName": "BlockMethods",
  "css": "",
  "props": {},
  "children": [],
  "methods": {
    "modelChange": {
      "type": "JSFunction",
      "value": "function modelChange(value) {\n  this.emit('change', value);\n}"
    },
    "boxChange": {
      "type": "JSFunction",
      "value": "function boxChange(status, id) {\n  this.emit('box-change', status, id);\n}"
    }
  },
  "schema": {
    "properties": [],
    "events": {}
  },
  "state": {},
  "methods": {},
  "dataSource": {},
  "i18n": {},
  "id": "f90244db"
}
```

**生成的代码（Vue）**

```VUE
const modelChange = wrap(function modelChange(value) {
  this.emit('change', value)
})

const boxChange = wrap(function boxChange(status, id) {
  this.emit('box-change', status, id)
})
```

### id

**如下例子，id 属性是自动生成的**

```json
{
  "componentName": "Block",
  "fileName": "BlockState",
  "css": "",
  "props": {},
  "children": [],
  "state": {
    "checkList": [],
    "options": [],
    "billingModes": [],
    "checkOptions": []
  },
  "state": {},
  "methods": {},
  "dataSource": {},
  "i18n": {},
  "id": "f90244db"
}
```

**生成的代码（Vue）**

```VUE
const state = vue.reactive({ checkList: [], options: [], billingModes: [], checkOptions: [] })

```

### this

这里的 this 就是页面或者区块的引用，所有的 props、state、method 都是挂载到 this 上的，就是说可以在 this 上拿到所有的状态

```json
{
  "componentName": "CrmFormItem",
  "fileName": "CrmFormItem",
  "props": {
    "label": {
      "type": "i18n",
      "key": "quotes.quote_list.total_sales_price"
    }
  },
  "condition": {
    "type": "JSExpression",
    "value": "this.state.selected.length < 2"
  },
  "children": [
    {
      "componentName": "span",
      "props": {
        "className": "num"
      },
      "children": {
        "type": "JSExpression",
        "value": "this.state.total"
      },
      "id": "768e9e16"
    }
  ],
  "id": "9e08dd7e"
}
```

```VUE
<crm-form-item v-if="state.selected.length < 2" :label="t('quotes.quote_list.total_sales_price')">
    <span class="num">{{ state.total }}</span>
</crm-form-item>
```

### 变量

**变量 State 的定义**

```json
{
  "componentName": "Block",
  "fileName": "BlockState",
  "css": "",
  "props": {},
  "children": [],
  "state": {
    "checkList": [],
    "options": [],
    "billingModes": [],
    "checkOptions": []
  },
  "state": {},
  "methods": {},
  "dataSource": {},
  "i18n": {},
  "id": "f90244db"
}
```

**生成的代码（Vue）**

```VUE
const state = vue.reactive({ checkList: [], options: [], billingModes: [], checkOptions: [] })

```

### 国际化

#### 普通方式

type 为 i18n 方式，适用于简单表达式场景

```json
{
  "componentName": "CrmFormItem",
  "fileName": "CrmFormItem",
  "props": {
    "label": {
      "type": "i18n",
      "key": "quotes.quote_list.total_sales_price"
    }
  },
  "condition": {
    "type": "JSExpression",
    "value": "this.state.selected.length < 2"
  },
  "children": [
    {
      "componentName": "span",
      "props": {
        "className": "num"
      },
      "children": {
        "type": "JSExpression",
        "value": "this.state.total"
      },
      "id": "768e9e16"
    }
  ],
  "id": "9e08dd7e"
}
```

```VUE
<crm-form-item v-if="state.selected.length < 2" :label="t('quotes.quote_list.total_sales_price')">
    <span class="num">{{ state.total }}</span>
</crm-form-item>
```

#### API(t 函数)方式

type 为 JSExpression 方式，适用于复杂表达式场景

```json
{
  "componentName": "TinyFormItem",
  "condition": {
    "type": "JSExpression",
    "value": "item.selected"
  },
  "props": {
    "label": {
      "type": "JSExpression",
      "value": "`${item.field_value}${t('quotes.mutilSites.consumption_ratio')}`"
    }
  },
  "children": [
    {
      "componentName": "TinyInput",
      "props": {
        "value": {
          "type": "JSExpression",
          "value": "item.percent",
          "model": {
            "prop": ""
          }
        },
        "onChange": {
          "type": "JSExpression",
          "value": "this.percentChange"
        }
      }
    }
  ],
  "id": "5f535ada"
}
```

```VUE
<tiny-form-item v-if="item.selected" :label="`${item.field_value}${t('quotes.mutilSites.consumption_ratio')}`">
    <tiny-input v-model="item.percent" @change="percentChange"></tiny-input>
</tiny-form-item>
```

### 样式

#### 全局样式

全局样式是当前 `Schema` 描述的页面样式

全局样式的设置：

TinyLowcode 低代码平台画布上选中元素，在右边属性面板设置其样式类，再在样式面板的全局样式弹框中设置样式，如下图：

![image](http://image.opentiny.design/tiny-lts/v1/images/1062cd5f1e7d611d09e53504ee3df256_1366x219.png)

![image](http://image.opentiny.design/tiny-lts/v1/images/b2fbf46ffb1cc244a26459a3e8c6768d_1366x456.png)

协议描述示例：

```json
{
  "componentName": "Block",
  "fileName": "BlockGlobalStyle",
  "css": ".global-style {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}",
  "props": {},
  "children": [
    {
      "componentName": "div",
      "props": {
        "className": "global-style"
      },
      "id": "cd4d0594"
    }
  ],
  "schema": {
    "properties": [],
    "events": {}
  },
  "state": {},
  "methods": {},
  "dataSource": {},
  "i18n": {},
  "id": "f90244db"
}
```

#### 行内样式

当前选中元素的行内样式

**行内样式的设置**

TinyLowcode 低代码平台提供了强大可视化设置元素行内样式功能， 如下图：

![image](http://image.opentiny.design/tiny-lts/v1/images/8cd3b535ce79c4a2297dc73c750e3d68_1366x488.png)

![image](http://image.opentiny.design/tiny-lts/v1/images/36cec6deca648008e1bfa2161e43ad4f_1366x521.png)

**协议描述示例:**

```json
{
  "componentName": "Block",
  "fileName": "BlockInlineStyle",
  "css": "",
  "props": {},
  "children": [
    {
      "componentName": "div",
      "props": {
        "style": "display: flex; justify-content: center; align-items: center;"
      },
      "id": "a032b321"
    }
  ],
  "schema": {
    "properties": [],
    "events": {}
  },
  "state": {},
  "methods": {},
  "dataSource": {},
  "i18n": {},
  "id": "f90244db"
}
```

#### 动态 class

如下例子，使用 动态 class 时，在 props 里面设置 className 的 type 为 JSExpression，设置 className 的 value 为动态 class 表达式

```json
"props": {
  "className": {
    "type": "JSExpression",
    "value": "['header-layout-icon left', {'active': this.state.fixedActive}]"
  }
}
```

```VUE
:class="['header-layout-icon left', { active: state.fixedActive }]"
```

### 生命周期

**生命周期的定义**

```json
{
  "componentName": "Block",
  "fileName": "BlockLifeCycle",
  "css": "",
  "props": {},
  "lifeCycles": {
    "setup": {
      "type": "JSFunction",
      "value": "function({props, state, watch, onMounted }) {\r\n onMounted(() => {\r\n   this.state.checkList = this.props.options.filter(item => item.checked).map(item => item[this.props.label]);\r\n   this.state.checkOptions = this.props.options.filter(item => item.checked)\r\n  \r\n })\r\n}"
    }
  },
  "children": [],
  "schema": {
    "properties": [],
    "events": {}
  },
  "state": {},
  "methods": {},
  "dataSource": {},
  "i18n": {},
  "id": "f90244db"
}
```

**生成的代码（Vue）**

```VUE
const setup = wrap(function ({ props, state, watch, onMounted }) {
    onMounted(() => {
      this.state.checkList = this.props.options.filter((item) => item.checked).map((item) => item[this.props.label])
      this.state.checkOptions = this.props.options.filter((item) => item.checked)
    })
  })
```

#### onMounted

如下例子，使用 onMounted 时，需要搭配 setup 传入 onMounted 去使用

```json
"lifeCycles": {
  "setup": {
    "type": "JSFunction",
    "value": "function setup({ props, state, watch, onMounted }) {\n onMounted(() => {\r\n  console.log('onMounted执行的操作')\r\n})\r\n\r\n  }\r\n\r\n    \n}"
  }
}
```

```VUE
const setup = wrap(function setup({ props, state, watch, onMounted }) {
  onMounted(() => {
        console.log('onMounted执行的操作')
    })
})
```

## 高级特性示例

### 插槽

#### 默认插槽与具名插槽

插槽是一种将内容从父组件注入子组件的绝佳方法

**默认插槽和具名插槽的定义**

```json
{
  "componentName": "Block",
  "fileName": "BlockSlot",
  "css": "",
  "schema": {
    "properties": [],
    "events": {}
  },
  "configure": {},
  "children": [
    {
      "componentName": "div",
      "props": {
        "className": "read-item"
      },
      "children": [
        {
          "componentName": "div",
          "props": {
            "className": "item-label"
          },
          "children": [
            {
              "componentName": "slot",
              "props": {
                "name": "label"
              },
              "children": [
                {
                  "componentName": "span",
                  "children": {
                    "type": "JSExpression",
                    "value": "this.props.label"
                  },
                  "id": "1e162c8d"
                },
                {
                  "componentName": "TinyTooltip",
                  "props": {
                    "className": "help",
                    "placement": "top-start"
                  },
                  "condition": {
                    "type": "JSExpression",
                    "value": "this.props.help"
                  },
                  "children": [
                    {
                      "componentName": "Template",
                      "props": {
                        "slot": {
                          "name": "content"
                        }
                      },
                      "children": [
                        {
                          "componentName": "slot",
                          "props": {
                            "name": "content"
                          },
                          "children": {
                            "type": "JSExpression",
                            "value": "this.props.help"
                          }
                        }
                      ]
                    },
                    {
                      "componentName": "Icon",
                      "props": {
                        "name": "IconHelpCircle"
                      }
                    }
                  ],
                  "id": "244f1faa"
                }
              ],
              "id": "c4d09944"
            }
          ],
          "id": "16e5444e"
        },
        {
          "componentName": "div",
          "props": {
            "className": "item-content"
          },
          "children": [
            {
              "componentName": "slot",
              "props": {
                "name": "default"
              },
              "children": [
                {
                  "componentName": "span",
                  "children": {
                    "type": "JSExpression",
                    "value": "this.props.text"
                  },
                  "id": "226e9648"
                }
              ],
              "id": "823f3bee"
            }
          ],
          "id": "71bf2990"
        }
      ],
      "id": "648d499f"
    }
  ],
  "type": "",
  "component": "",
  "label": "",
  "methods": {}
}
```

**生成的代码（Vue）**

```vue
<template>
  <div>
    <div class="read-item">
      <div class="item-label">
        <slot name="label">
          <span>{{ label }}</span>
          <tiny-tooltip v-if="help" class="help" placement="top-start">
            <template #content>
              <slot name="content">{{ help }}</slot>
            </template>
            <tiny-icon-help-circle></tiny-icon-help-circle>
          </tiny-tooltip>
        </slot>
      </div>
      <div class="item-content">
        <slot name="default">
          <span>{{ text }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  ...
}
</script>
```

**默认插槽和具名插槽的使用**

上面区块 `BlockSlot` 中设置了 `default` 默认插槽和两个 `label`， `content` 具名插槽，在 `BlockTest` 中使用时的协议描述如下：

```json
{
  "componentName": "Block",
  "fileName": "BlockTest",
  "css": "",
  "schema": {
    "properties": [],
    "events": {}
  },
  "children": [
    {
      "componentName": "div",
      "props": {
        "className": "quote-filter"
      },
      "children": [
        {
          "componentName": "div",
          "props": {
            "className": "filter-wrap"
          },
          "children": [
            {
              "componentName": "div",
              "className": "item",
              "loop": {
                "type": "JSExpression",
                "value": "this.props.filters"
              },
              "loopArgs": ["item", "key"],
              "props": {
                "key": {
                  "type": "JSExpression",
                  "value": "key"
                },
                "className": "item"
              },
              "children": [
                {
                  "componentName": "CrmFormItem",
                  "fileName": "CrmFormItem",
                  "children": [
                    {
                      "componentName": "Template",
                      "props": {
                        "slot": "label"
                      },
                      "children": [
                        {
                          "componentName": "div",
                          "props": {
                            "className": "title"
                          },
                          "children": [
                            {
                              "componentName": "span",
                              "children": {
                                "type": "JSExpression",
                                "value": "t(item.title)"
                              },
                              "id": "003175c9"
                            }
                          ],
                          "id": "38050c96"
                        }
                      ]
                    },
                    {
                      "componentName": "Template",
                      "props": {
                        "slot": "default"
                      },
                      "children": [
                        {
                          "componentName": "span",
                          "children": {
                            "type": "JSExpression",
                            "value": "filterItem.key ? t(filterItem.key) : filterItem.label"
                          },
                          "loop": {
                            "type": "JSExpression",
                            "value": "item.list"
                          },
                          "loopArgs": ["filterItem", "index"],
                          "props": {
                            "key": {
                              "type": "JSExpression",
                              "value": "index"
                            },
                            "className": {
                              "type": "JSExpression",
                              "value": "['filter-item', { active: filterItem.active }]"
                            },
                            "onClick": {
                              "type": "JSExpression",
                              "value": "this.change(item, filterItem, key)"
                            }
                          },
                          "id": "f9a7ded0"
                        }
                      ]
                    }
                  ],
                  "id": "503b00a2"
                }
              ],
              "id": "ac695b91"
            }
          ],
          "id": "3dc8f43d"
        }
      ],
      "id": "0dfd6471"
    }
  ],
  "configure": {},
  "methods": {}
}
```

**生成的代码（Vue）**

```vue
<template>
  <div>
    <div class="crm-quote-filter">
      <div class="filter-wrap">
        <div v-for="(item, key) in filters" :key="key" class="item">
          <crm-form-item>
            <template #label>
              <div class="title">
                <span>{{ t(item.title) }}</span>
              </div>
            </template>
            <template #default>
              <span
                v-for="(filterItem, index) in item.list"
                :key="index"
                :class="['filter-item', { active: filterItem.active }]"
                @click="change(item, filterItem, key)"
              >
                {{ filterItem.key ? t(filterItem.key) : filterItem.label }}
              </span>
            </template>
          </crm-form-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  ...
}
</script>
```

#### 作用域插槽

作用域插槽允许我们父组件中的插槽内容访问仅在子组件中找到的数据

**作用域插槽的定义**

```json
{
  "componentName": "Block",
  "fileName": "BlockSlotScoped",
  "css": "",
  "schema": {
    "properties": [],
    "events": {}
  },
  "state": {
    "data": {
      "title": "标题",
      "description": "描述"
    }
  },
  "children": [
    {
      "componentName": "div",
      "children": [
        {
          "componentName": "slot",
          "props": {
            "data": {
              "type": "JSExpression",
              "value": "this.state.data"
            }
          },
          "children": [
            {
              "componentName": "span",
              "children": {
                "type": "JSExpression",
                "value": "this.state.data.title"
              }
            }
          ]
        }
      ]
    }
  ],
  "type": "",
  "component": "",
  "label": "",
  "methods": {}
}
```

**生成的代码（Vue）**

```vue
<template>
  <template>
    <div>
      <slot :data="state.data"> {{ state.data.title }} </slot>
    </div>
  </template>
</template>

<script>
import * as vue from 'vue'

export default {
  ...
  setup(props, context) {
    const wrap = lowcodeWrap(props, context, t)

    const state = vue.reactive({
      data: {
        title: '标题',
        description: '描述'
      }
    })

    const attrs = wrap({
      state
    })

    setup({ props, context, state, ...vue })

    return attrs
  }
}
</script>
```

**作用域插槽的使用**

在 `BlockTest` 区块中使用 `BlockSlotScoped` 作用域限定的插槽来授予访问 data 数据的权限，如下：

```json
{
  "componentName": "Block",
  "fileName": "BlockTest",
  "css": "",
  "schema": {
    "properties": [],
    "events": {}
  },
  "children": [
    {
      "componentName": "div",
      "children": [
        {
          "componentName": "BlockSlotScoped",
          "fileName": "BlockSlotScoped",
          "props": {
            "className": "filter-wrap"
          },
          "children": [
            {
              "componentName": "Template",
              "props": {
                "slot": {
                  "name": "search",
                  "params": "slotScope"
                }
              },
              "children": [
                {
                  "componentName": "span",
                  "children": {
                    "type": "JSExpression",
                    "value": "slotScope.description"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "configure": {},
  "methods": {}
}
```

```VUE
<div>
   <BlockSlotScoped class="filter-wrap">
       <template #search="slotScope">
           <span>{{slotScope.description}}</span>
       </template>
   </BlockSlotScoped>
</div>
```

### 响应式 watch

如下例子，使用 watch 时，需要搭配 setup 传入 watch 去使用

```json
"lifeCycles": {
  "setup": {
    "type": "JSFunction",
    "value": "function setup({ props, state, watch }) {\n   watch(\r\n  () => props.list,\r\n  (list) => {\r\n    cloumnsVisibledSetting(list)\r\n  },\r\n  {\r\n    deep: true\r\n  }\r\n  ) \n}"
  }
}
```

```VUE
const setup = wrap(function setup({ props, state, watch }) {
  watch(
    () => props.list,
    (list) => {
      cloumnsVisibledSetting(list)
    },
    {
      deep: true
    }
  )
})
```

### 循环

当需要渲染多个相同的组件时，可以使用循环特性

使用 v-for 指令时，loop 属性为遍历的数组，loopArgs 属性为数组每一项的表示，key 属性可表示为每一项的索引

**JSON 描述：**

```json
{
  "componentName": "TinyCheckbox",
  "loop": {
    "type": "JSExpression",
    "value": "this.state.cloudData"
  },
  "loopArgs": ["item"],
  "props": {
    "key": {
      "type": "JSExpression",
      "value": "item.field_id"
    },
    "text": {
      "type": "JSExpression",
      "value": "item.field_value"
    },
    "value": {
      "type": "JSExpression",
      "value": "item.selected",
      "model": {
        "prop": ""
      }
    },
    "onChange": {
      "type": "JSExpression",
      "value": "this.percentChange"
    }
  },
  "id": "8cc6f84e"
}
```

**生成代码：**

```VUE
<tiny-checkbox
    v-for="item in state.cloudData"
    :key="item.field_id"
    :text="item.field_value"
    v-model="item.selected"
    @change="percentChange"
></tiny-checkbox>
```

### 条件渲染

条件渲染适用于需要动态显示隐藏页面组件/区块的场景

```json
"condition": {
  "type": "JSExpression",
  "value": "this.state.selected.length > 1"
}
```

```VUE
  v-if="state.selected.length > 1"
```

## API 示例

### ref

如下例子，使用 ref 时，首先对 ref 属性设置为 gridRef，然后通过 this.$('gridRef')去获取

```json
"ref": "gridRef"

"batchEdit": {
  "type": "JSFunction",
  "value": "function batchEdit() {\n  this.$('gridRef').insert({\n    type: 'insert'\n  });\n}"
}
```

```VUE
ref="gridRef"

const batchEdit = wrap(function batchEdit() {
  this.$('gridRef').insert({
    type: 'insert'
  })
})
```

### 工具类 utils

可以通过引入 npm 包工具类或自定义 function 形式添加使用工具类，如下是使用 Pager 工具类

```json
"pagerConfig": {
  "component": {
    "type": "JSResource",
    "value": "this.utils.Pager"
  },
  "attrs": {
    "currentPage": 1,
    "pageSize": 5,
    "pageSizes": [
      5,
      10
    ],
    "total": 180,
    "layout": "total, prev, pager, next, jumper, sizes"
  }
}
```

```VUE
pagerConfig: {
  component: utils.Pager,
  attrs: {
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10],
    total: 180,
    layout: 'total, prev, pager, next, jumper, sizes'
  }
}
```

### emit

如下例子，使用 emit 时，emit 的第一个属性如果有驼峰需要用"-"代替驼峰

```json
"selectChange": {
  "type": "JSFunction",
  "value": "function selectChange(selection) {\n  this.state.selected = selection;\n  this.emit('select-change', selection);\n}"
}
```

```VUE
const selectChange = wrap(function selectChange(selection) {
  this.state.selected = selection
  this.emit('select-change', selection)
})
```

## 应用场景示例

### 表格

#### 请求数据

```json
"fetch-data": {
  "type": "JSExpression",
  "value": "{api:this.getTableData}"
}
```

```VUE
:fetch-data="{ api: getTableData }"
```

### 表格分页配置

```json
"pagerConfig": {
  "component": {
    "type": "JSResource",
    "value": "this.utils.Pager"
  },
  "attrs": {
    "currentPage": 1,
    "pageSize": 5,
    "pageSizes": [
      5,
      10
    ],
    "total": 180,
    "layout": "total, prev, pager, next, jumper, sizes"
  }
}
```

```VUE
pagerConfig: {
  component: utils.Pager,
  attrs: {
    currentPage: 1,
    pageSize: 5,
    pageSizes: [5, 10],
    total: 180,
    layout: 'total, prev, pager, next, jumper, sizes'
  }
}
```

#### 自定义渲染列

可以使用插槽来满足复杂的列渲染需求

**表格列插槽的使用**

**默认插槽**

如下为表格列插槽配置示例，表格默认插槽使用语法为 jsx 语法，当为默认插槽（在 slots 属性使用 default 配置项）时，params 属性表示为传入插槽的数据，表示为表格列的每个单元格使用插槽，插槽内容通过 value 属性设置

```json
{
  "title": {
    "type": "i18n",
    "key": "quotes.quoteconfig.operate"
  },
  "field": "operation",
  "width": "80",
  "slots": {
    "default": {
      "type": "JSSlot",
      "params": ["row"],
      "value": [
        {
          "componentName": "div",
          "children": [
            {
              "componentName": "div",
              "props": {
                "style": "display: flex; justify-content: space-around"
              },
              "condition": {
                "type": "JSExpression",
                "value": "row.type === 'insert'"
              },
              "children": [
                {
                  "componentName": "span",
                  "props": {
                    "style": "text-align: center; color: #5e7ce0; cursor: pointer",
                    "onClick": {
                      "type": "JSFunction",
                      "value": "() => this.sureChangeCategoryBatch(row)"
                    }
                  },
                  "children": {
                    "type": "i18n",
                    "key": "quotes.quotelistmodal.ok"
                  }
                },
                {
                  "componentName": "span",
                  "props": {
                    "style": "text-align: center; color: #5e7ce0; cursor: pointer",
                    "onClick": {
                      "type": "JSFunction",
                      "value": "() => this.cancelBatch(row)"
                    }
                  },
                  "children": {
                    "type": "i18n",
                    "key": "quotes.quotelistmodal.cancel"
                  }
                }
              ]
            },
            {
              "componentName": "span",
              "condition": {
                "type": "JSExpression",
                "value": "row.type !== 'insert'"
              },
              "props": {
                "style": "text-align: center; color: #5e7ce0; cursor: pointer",
                "onClick": {
                  "type": "JSFunction",
                  "value": "() => this.deleteRow(row)"
                }
              },
              "children": {
                "type": "i18n",
                "key": "quotes.voucher.voucher_modal_tip4"
              }
            }
          ]
        }
      ]
    }
  }
}
```

```VUE
{
  title: t('quotes.quoteconfig.operate'),
  field: 'operation',
  width: '80',
  slots: {
    default: ({ row }, h) => (
      <div>
        {row.type === 'insert' && (
          <div style="display: flex; justify-content: space-around">
            <span
              style="text-align: center; color: #5e7ce0; cursor: pointer"
              onClick={() => sureChangeCategoryBatch(row)}
            >
              {t('quotes.quotelistmodal.ok')}
            </span>
            <span style="text-align: center; color: #5e7ce0; cursor: pointer" onClick={() => cancelBatch(row)}>
              {t('quotes.quotelistmodal.cancel')}
            </span>
          </div>
        )}
        {row.type !== 'insert' && (
          <span style="text-align: center; color: #5e7ce0; cursor: pointer" onClick={() => deleteRow(row)}>
            {t('quotes.voucher.voucher_modal_tip4')}
          </span>
        )}
      </div>
    )
  }
}
```

**头部插槽**

表格头部插槽使用语法为 jsx 语法，当为头部插槽（default）时，params 属性表示为传入插槽的数据，表示为表格列的头部使用插槽，插槽内容通过 value 属性设置

json 图片地址：http://image.opentiny.design/tiny-lts/v1/images/056b4787a72e051c115e07422b1fa13a_623x611.png
vue 图片地址：http://image.opentiny.design/tiny-lts/v1/images/f7292d38f50dbff941f2aa9b0b722813_873x156.png

```json
"slots": {
  "header": {
    "type": "JSSlot",
    "params": [
      "column"
    ],
    "value": [
      {
        "componentName": "div",
        "children": [
          {
            "componentName": "span",
            "children": {
              "type": "i18n",
              "key": "quotes.nonofficiallist.cloudservice"
            },
            "id": "0f8e9986"
          },
          {
            "componentName": "Icon",
            "props": {
              "name": "iconHelpCircles",
              "style": "margin-left: 6px; cursor: pointer;vertical-align: top;"
            },
            "id": "33d26513"
          }
        ],
        "id": "6ee0d3fd"
      }
    ]
  }
}
```

```VUE
slots: {
  header: ({ column }, h) => (
    <div>
      <span>{t('quotes.nonofficiallist.cloudservice')}</span>
      <TinyiconHelpCircles style="margin-left: 6px; cursor: pointer;vertical-align: top;"></TinyiconHelpCircles>
    </div>
  )
}
```

### 表单

**插槽**

表单的插槽使用为具名插槽，需要在 slot 属性里配置 name 属性

json 图片地址：http://image.opentiny.design/tiny-lts/v1/images/f80ac1ff2218d61fb37d0cb144b74260_428x647.png
vue 图片地址：http://image.opentiny.design/tiny-lts/v1/images/9fcda3ac2c27986902c8d92e083ae634_674x78.png

```json
{
  "componentName": "Template",
  "props": {
    "slot": {
      "name": "label"
    }
  },
  "children": [
    {
      "componentName": "span",
      "children": {
        "type": "i18n",
        "key": "quotes.voucher.statisticalbillingcycle"
      },
      "id": "c26a6414"
    },
    {
      "componentName": "span",
      "props": {
        "className": "form-label-icon"
      },
      "children": [
        {
          "componentName": "Icon",
          "props": {
            "name": "IconHelpCircle"
          },
          "id": "a354978a"
        }
      ],
      "id": "0b9a10d5"
    }
  ]
}
```

```VUE
<template #label>
  <span>{{ t('quotes.voucher.statisticalbillingcycle') }}</span>
  <span class="form-label-icon"><tiny-icon-help-circle></tiny-icon-help-circle></span>
</template>
```

**表单的作用域插槽**

表单的插槽使用为作用域插槽，需要在 slot 属性里配置 name 属性和 params 属性

```json
"componentName": "Template",
"props": {
  "slot": {
    "name": "search",
    "params": "slotScope"
  },
"children": [
  {
    "componentName": "div",
    "props": {
      "className": "icon-wrap",
      "onClick": {
        "type": "JSExpression",
        "value": "slotScope.searchOp.doSearch(this.state.conditionForm)"
      }
    },
    "children": [
      {
        "componentName": "Icon",
        "props": {
          "name": "IconRefres"
        }
      }
    ]
  }
 }
]
```

```VUE
<template #search="slotScope">
    <div class="icon-wrap" @click="slotScope.searchOp.doSearch(state.conditionForm)">
       <tiny-icon-refres></tiny-icon-refres>
     </div>
</template>
```

## 组件/区块

### 属性元数据

在开发应用过程中，为了尽量复用代码和逻辑，减少重复，往往会把功能可重用的代码封装成公共区块，并通过 `properties` 暴露其属性

**属性设置的协议描述示例**

```json
{
  "componentName": "Block",
  "fileName": "BlockProperties",
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
            "property": "isEdit",
            "type": "Boolean",
            "defaultValue": true,
            "label": {
              "text": {
                "zh_CN": "是否为编辑态"
              }
            },
            "description": {
              "zh_CN": "是否为编辑态，是则可进行配置报价编辑，否则是查看配置报价详情"
            },
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "cols": 12,
            "rules": [],
            "handle": {}
          },
          {
            "property": "showVoucherEdit",
            "type": "Boolean",
            "defaultValue": false,
            "label": {
              "text": {
                "zh_CN": "是否显示编辑阶梯入口按钮"
              }
            },
            "description": {
              "zh_CN": "是否显示编辑阶梯入口按钮，点击编辑按钮可进行阶梯编辑"
            },
            "widget": {
              "component": "MetaSwitch",
              "props": {}
            },
            "cols": 12,
            "rules": [],
            "handle": {}
          },
          {
            "property": "quoteDetail",
            "type": "Object",
            "defaultValue": {},
            "label": {
              "text": {
                "zh_CN": ""
              }
            },
            "cols": 12,
            "rules": [],
            "handle": {
              "getter": "",
              "setter": ""
            },
            "hidden": false,
            "required": true,
            "readOnly": false,
            "disabled": false,
            "widget": {
              "component": "MetaCodeEditor",
              "props": {}
            }
          },
          {
            "property": "siteData",
            "type": "Object",
            "defaultValue": {},
            "label": {
              "text": {
                "zh_CN": "站点信息"
              }
            },
            "cols": 12,
            "rules": [],
            "handle": {
              "getter": "",
              "setter": ""
            },
            "hidden": false,
            "required": true,
            "readOnly": false,
            "disabled": false,
            "widget": {
              "component": "MetaCodeEditor",
              "props": {
                "modelValue": {}
              }
            }
          }
        ]
      }
    ],
    "events": {}
  }
}
```

**生成的代码（Vue）**

```vue
<template>
  <div>...</div>
</template>

<script>
export default {
  props: {
    isEdit: { type: Boolean, default: true },
    showVoucherEdit: { type: Boolean, default: false },
    quoteDetail: { type: Object, default: () => ({}) },
    siteData: { type: Object, default: () => ({}) }
  }
  ...
}
</script>
```

**区块的使用**

封装好的区块 `BlockProperties` 在其他区块中消费

**协议描述**

```json
{
  "componentName": "Block",
  "fileName": "BlockTest",
  "css": "",
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
        "content": []
      }
    ],
    "events": {}
  },
  "state": {},
  "methods": {},
  "children": [
    {
      "componentName": "div",
      "children": [
        {
          "componentName": "div",
          "props": {
            "className": {
              "type": "JSExpression",
              "value": "{'category-header-step': this.props.quoteDetail?.bizStepFlag !== 1 && this.state.selected.length <= 1 && !this.props.isEdit, 'category-header': true}"
            }
          },
          "children": [
            {
              "componentName": "BlockProperties",
              "fileName": "BlockProperties",
              "condition": {
                "type": "JSExpression",
                "value": "this.state.selected.length < 2"
              },
              "props": {
                "isEdit": {
                  "type": "JSExpression",
                  "value": "this.props.isEdit"
                },
                "quoteDetail": {
                  "type": "JSExpression",
                  "value": "this.props.quoteDetail"
                },
                "siteData": {
                  "type": "JSExpression",
                  "value": "this.props.siteData"
                }
              },
              "id": "a5da23ef"
            }
          ]
        }
      ]
    }
  ]
}
```

### 事件元数据

在开发应用过程中，为了尽量复用代码和逻辑，减少重复，往往会把功能可重用的代码封装成公共区块，并通过 `events` 暴露其事件

**事件设置的协议描述示例**

```json
{
  "componentName": "Block",
  "fileName": "BlockEvents",
  "schema": {
    "properties": [],
    "events": {
      "onSelectChange": {
        "label": {
          "zh_CN": "下拉框选择事件"
        },
        "description": {
          "zh_CN": "下拉框选择事件"
        }
      },
      "onSwitchChange": {
        "label": {
          "zh_CN": "切换switch时触发的事件"
        },
        "description": {
          "zh_CN": "切换switch时触发的事件"
        }
      },
      "onShowEditor": {
        "label": {
          "zh_CN": "弹窗打开事件"
        },
        "description": {
          "zh_CN": "弹窗打开事件"
        }
      },
      "onClickChange": {
        "label": {
          "zh_CN": "点击阶梯时触发的事件"
        },
        "description": {
          "zh_CN": "点击阶梯时触发的事件"
        }
      }
    }
  }
}
```

**生成的代码（Vue）**

```vue
<template>
  <div>...</div>
</template>

<script>
export default {
  props: {},
  emits: ['select-change', 'switch-change', 'show-editor', 'click-change'],
  setup(props, context) {
    const wrap = lowcodeWrap(props, context, t)

    const state = vue.reactive({})

    const change = wrap(function change(list) {
      this.emit('click-change', list)
    })

    const selectChange = wrap(function selectChange($event) {
      this.emit('select-change', $event)
    })

    const switchChange = wrap(function switchChange($event) {
      this.emit('switch-change', $event)
    })

    const showEditor = wrap(function showEditor() {
      this.emit('show-editor')
    })

    const attrs = wrap({
      state,
      change,
      selectChange,
      switchChange,
      showEditor
    })

    const setup = wrap(function setup({ props, state, watchEffect, onMounted }) {
      state.showLadder = props.quoteDetail?.bizStepFlag === 1
      if (state.showLadder) {
        state.selected = props.quoteDetail?.termInfos?.filter(
          (item) => item.siteCode === props.siteData.siteCode
        )[0]?.termRows?.[0].LCPeriod
        state.data = props.quoteDetail?.stepInfos
      }
    })

    setup({ props, context, state, ...vue })

    return attrs
  }
  ...
}
</script>
```

**区块的使用**

封装好的区块 `BlockEvents` 在其他区块中消费

**使用协议描述**

```json
{
  "componentName": "Block",
  "fileName": "BlockTest",
  "css": "",
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
        "content": []
      }
    ],
    "events": {}
  },
  "state": {},
  "methods": {},
  "children": [
    {
      "componentName": "div",
      "children": [
        {
          "componentName": "div",
          "props": {
            "className": {
              "type": "JSExpression",
              "value": "{'category-header-step': this.props.quoteDetail?.bizStepFlag !== 1 && this.state.selected.length <= 1 && !this.props.isEdit, 'category-header': true}"
            }
          },
          "children": [
            {
              "componentName": "BlockEvents",
              "fileName": "BlockEvents",
              "condition": {
                "type": "JSExpression",
                "value": "this.state.selected.length < 2"
              },
              "props": {
                "onSelectChange": {
                  "type": "JSExpression",
                  "value": "this.select"
                },
                "onSwitchChange": {
                  "type": "JSExpression",
                  "value": "this.switchChange"
                },
                "onShowEditor": {
                  "type": "JSExpression",
                  "value": "this.showEditor"
                },
                "onClickChange": {
                  "type": "JSExpression",
                  "value": "this.clickChange"
                }
              },
              "id": "a5da23ef"
            }
          ]
        }
      ]
    }
  ]
}
```
