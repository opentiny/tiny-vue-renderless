# 状态管理

state 是响应式的数据，状态管理面板对 state 的响应式变量进行系统管理，包含添加、变删除、搜索、编辑 state

- 在状态管理面板添加 state 变量。

![添加Sate变量](http://image.opentiny.design/tiny-lts/v1/images/138bc2b5ef32143f09cc2bcbf503fca5_1203x1033.gif)

- 使用添加的 state 变量
  - 在画布中选中需要绑定 state的组件。
  - 在右侧设置面板属性栏中点击代码 icon，选择需要绑定的 state。

![使用state](http://image.opentiny.design/tiny-lts/v1/images/8e63ba072719051e1bb0b8d0b2351619_1818x1033.gif)



- 改变state

我们添加的 state 通常是一个可以随不同状态有不同值的变量，如果想要改变 state，可以在 JS 面板中通过 `this.state.xxx` 获取到 state并且改变之。

![改变state](http://image.opentiny.design/tiny-lts/v1/images/51925726f1d4a3ac0c9dd54abdfaca85_950x530.png)