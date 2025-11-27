# 添加页面变量

## 使用说明

页面状态变量仅适用于当前页面。

## 操作步骤

1. 在左侧插件栏中，单击![](figures/icon-var.png)，展开状态管理页面。
2. 选择“页面状态”，单击“添加变量“。
3. 设置变量基本信息。
    - 变量名：输入变量名称。
    - 初始值类型：可选择“JSON类型”和“JS表达式类型”
    - 初始值：数据写法和JS写法一致。

        - 字符串: "string"
        - 数字: 123
        - 布尔值: true/false
        - 对象: \{"name": "xxx"\}
        - 数组: \["1", "2"\]
        - 空值: null
        - JS表达式: \(需要先选择JS表达式类型\)

          示例1： t\('i18nkey1'\)

          示例2： function fnName\(\) \{\}

          示例3： \{ getValue: \(\) =\> \{\} \}

      注意：使用JS表达式定义state变量的时候无法调用state其他变量定义，另由于JS函数定义在变量之后，也无法调用JS面板定义的函数。

      **图 1**  添加变量  
      ![](figures/addVar-27.png "添加变量-27")

4. （可选）设置变量高级配置。
    - getter：用于获取（读取）类的私有属
    - 性的值。Getter方法通常没有参数，并且返回属性的值。

      示例：

      ```
      function getter() {
         this.state.name = `${this.props.firstName} ${this.props.lastName}`
      }
      ```

    - setter：用于设置（写入）类的私有属性的值。Setter方法通常接受一个参数，该参数是要设置的新值，并且可能包括一些逻辑来验证或处理这个值，然后才将其赋给属性。示例：

      ```
      function setter() {
         const [firstName, lastName] = this.state.name.split(' ')
         this.emit('update:firstName', firstName)
         this.emit('update:lastName', lastName)
      }
      ```

5. 单击“保存”，完成变量添加。

