1. 统一状态值：
   theme: dark `light` success info warn error ----- dark 代替primary, 如果需要再增加brand主题
   size: large `normal` small mini
   speed: slow,`normal`,fast
   状态： active, hover, disabled

2. sc- 组件； st- 组件上的状态 su- utils css;

   为什么加 s\*- 的前缀？
   即是防止跟组件库类名冲突， 也防止其它第三方组件库冲突。 示例：
   class="tiny-button sc-button st-disabled st-plain su-ellipsis"

3. 所有状态类的编写必须`附带`上容器或工具的选择类，比如：
   .su-wave.st-fast{} .sc-btn.st-large{}------- 这样避免 st-\*的规则，影响到子元素上。。
