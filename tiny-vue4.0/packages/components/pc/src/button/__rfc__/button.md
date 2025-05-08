# Button 设计指南

中文名-按钮,应用于------场景

## 功能点

![button 结构图](./button.dio)

 <details>
  <summary>1. 主题</summary>
  <div>框架统一的主题： theme = 'none' | 'primary' | 'success' | 'warning' | 'danger' | 'info'</div>
</details>
 
## 属性

| 属性  | 类型   | 默认值   | 说明                                                |
| ----- | ------ | -------- | --------------------------------------------------- |
| theme | string | 'normal' | 'primary' , 'success' , 'warning' , 'danger','info' |

## 事件

| 事件名 | 类型     | 说明       |
| ------ | -------- | ---------- |
| click  | ()=>void | 点击时触发 |

## 插槽

| 插槽名 | 参数        | 说明       |
| ------ | ----------- | ---------- |
| root   | {state,api} | 根结点插槽 |

## expose

| 导出成员 | 类型   | 说明 |
| -------- | ------ | ---- |
| state    | Object |      |
| api      | Object |      |

## 检查点

- [ ] 是否需要动画
- [ ] 是依赖指令
- [ ] 是否需要抽取公共hooks的地方
- [ ] 是否嵌套子组件，需要约定上下接口协议 【谨慎选择】
- [ ] 是否为无UI组件，可以抽象为指令，或纯css可实现， 比如原来的水印，文本滚动， layout,container
- [ ] 有无国际化， 国际化放置在组件vm中。

## DOM设计指南

**在此优先设计dom结构， 开发模板时可以复制过去**
<slot name="root" :state="state" :api="api">

  <div class="tiny-button">
  </div>
</slot>

## API设计指南

**在此优先设计 state, api的属性和成员方法**
