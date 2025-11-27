# 国际化资源管理
> 考虑到对于同一个项目，可能需要同时支持多个语言，TinyEngine目前提供了中英文切换，在TineEngine能够一键切换多语言，提升开发效率与开发体验。
> 国际化是应用级别的，在任何一个页面或者区块都可以访问。
> 需要注意的是国际化只针对画布中的项目，不针对TinyEngine本身
> 

## 国际化词条主要操作用与使用
### 添加国际化词条与使用
在TineEngine左侧面板中找到国际化插件，点击新增词条，可以编辑 key，中文和英文

![为图片添加点击事件](md-only-prefix/img/docimg/langAdd.png)
### 国际化正确的使用方式
1. 选中button，找到国际化词条，可以搜索自己刚刚创建的词条，也可以在这里新增词条并绑定当前button

![使用方式](md-only-prefix/img/docimg/langUse.gif)
![使用方式](md-only-prefix/img/docimg/langUse1.png)
2.  通过代码绑定变量的方式，首先选中某个文案， 点击右侧的编辑，弹框书写t('cloud'), cloud为词条key值

![使用方式](md-only-prefix/img/docimg/langUse2.png)
### 一键切换国际化多语言
只需要点击上方的多语言切换按钮，一键切换项目国际化词条多语言

![使用方式](md-only-prefix/img/docimg/langSwitch.png)
### 国际化词条其他操作
国际化支持模糊搜索功能，编辑词条，删除词条，以及导入功能(有导入模版)等功能

![其他](md-only-prefix/img/docimg/langOthers.png)
