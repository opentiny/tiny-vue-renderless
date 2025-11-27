<h1 id='tiny-vue'>TinyVue 主题配置指导</h1>

---

<h2 id='creat'>创建主题</h2>

[主题配置系统](/designtheme/home)支持用户创建一个基于组件默认样式的主题，也支持用户复制主题商店中已有的主题。

#### 创建主题

![image-20221101161239495](/src/assets/images/theme/create1-vue.jpg)

![image-20221101161239495](/src/assets/images/theme/create2-vue.png)

#### 复制主题

![image-20221101162400165](/src/assets/images/theme/copy1-vue.png)

![image-20221101162639364](/src/assets/images/theme/copy2-vue.png)

<h2 id='edit'>编辑主题</h2>

支持多人协作的主题编辑功能，满足用户多样化的产品需求。进入[我的主题](/designtheme/userThemes)列表页，点击需要编辑的主题，进入主题编辑页，定制属于自己的主题风格。

+ 样式配置主要分为基础样式类和组件的样式类配置。
+ 基础样式的修改会影响到全局组件的样式。 基础样式包含了TinyVue设计系统中定义的一系列的基础变量（token），如颜色，字体，尺寸等。它们作为基础变量，被Button，Input等基础组件所引用。

#### 基础样式：以颜色为例

品牌色支持基于基色修改并由算法自动生成一套色阶。

![image-20221107160444825](/src/assets/images/theme/basecolor3-vue.png)

支持单个颜色的调整以满足产品的需求

![](/src/assets/images/theme/basecolor2-vue.png)

基础样式颜色变量（token）的修改会影响到组件的风格

![](/src/assets/images/theme/basecolor5-vue.png)

#### 组件样式

TinyVue 组件开放了细粒度的组件配置，在基础样式无法满足要求时，支持用户细粒度的定制组件。

+ 支持边框圆角的配置

![image-20221101172335337](/src/assets/images/theme/config1-vue.png)

+ 支持默认边框色的配置

![image-20221101172403980](/src/assets/images/theme/config2-vue.png)



<h2 id='publish'>发布主题</h2>

点击发布后，将用户的配置转换成代码。 一键式主题发布以及版本管理，让管理更简单；安装后即可使用，让开发者更专注。 

![image-20221101173211152](/src/assets/images/theme/publish-vue.png)



<h2 id='install'>安装使用主题</h2>

发布成功后，用户可以通过npm install的方式安装主题，以` @opentiny/vue-custom1` 为例。

#### 安装

```javascript
npm install @opentiny/vue-custom1
```

#### 在项目中使用

main.js文件中导入主题样式文件

```main.js
`@import '@opentiny/vue-custom1/index.css'` // 新增
```

#### 效果

![image-20221101194449542](/src/assets/images/theme/demo.png)
