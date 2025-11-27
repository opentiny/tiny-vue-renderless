<template>
  <div class="home-carousel">
    <div class="home-carousel-wrap">
      <div class="left-wrap">
        <div v-for="item in state.list" :key="item.title" class="list-item">
          <div class="group">
            <div class="group-title">
              <svg-icon class="svg-icon" :name="item.navIcon"></svg-icon>
              <span class="title">{{ item.title }}</span>
            </div>
            <div class="group-content">
              <div class="group-item">
                <span
                  v-for="(nav, index) in item.navList"
                  :key="nav.des"
                  :class="['item-wrap', { active: nav.navTitle === state.active }]"
                  @click="selectItem(nav, index)"
                >
                  <span class="test">{{ nav.navTitle }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-wrap">
        <div
          v-for="list in state.navList"
          :key="list.des"
          :class="['des-item', { active: list.navTitle === state.active }]"
        >
          <div class="des-title">{{ list.des }}</div>
          <div class="des-sub-title">{{ list.subDes }}</div>
          <div class="img-wrap">
            <img :src="list.img" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'

const stateList = [
  {
    title: '定制化多平台',
    navIcon: 'custom',
    navList: [
      {
        navTitle: '物料',
        des: '开放的物料生态',
        subDes: '官方提供精选的组件和区块，支持接入第三方组件库，用户可以发布自己的物料到生态中心',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/0a2085731261407a213d9e16113983fa_1729x966.jpg'
      },
      {
        navTitle: '插件',
        des: '强大的定制扩展能力',
        subDes: '官方提供核心的工具栏和插件，用户可自由搭配按需选用，也可以自行开发定制工具栏和插件',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/99802beeabf6c71433830ac3c79b8816_1729x966.jpg'
      },
      {
        navTitle: 'DSL',
        des: '灵活的代码输出',
        subDes: '官方提供页面Schema生成源代码的能力，用户可以开发自己的DSL，控制输出的代码及风格',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/f36f2fc5ada30dd4c41a20fb772b387d_1729x966.jpg'
      },
      {
        navTitle: '组织',
        des: '拥有独立设计器的组织',
        subDes: '设计器按组织隔离，每个组织可创建多个设计器，每个设计器可创建多个应用，每个应用可创建多个页面',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/d18e86851c7073dd9f3581e6eb0db0b0_1729x966.jpg'
      }
    ]
  },
  {
    title: '支持跨技术栈',
    navIcon: 'technology',
    navList: [
      {
        navTitle: '多框架',
        des: '支持主流前端框架',
        subDes: '采用WebComponent技术，画布支持Angular、Vue、React组件渲染，未来可支撑更多框架',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/ff4a6ea979bfe89908fc328a02cdd7e2_1729x966.jpg'
      },
      {
        navTitle: '多终端',
        des: '丰富的终端开发支持',
        subDes: '目前支持PC、移动、平板、大屏等终端开发，未来可支持直接生成We码应用、鸿蒙应用等',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/b471ff8a82567ff84369193694252ecc_1729x966.jpg'
      }
    ]
  },
  {
    title: '高低代码混合开发',
    navIcon: 'mixes',
    navList: [
      {
        navTitle: '桥接源',
        des: '连接低代码与高代码的桥梁',
        subDes: '在线下IDE低代码搭建的页面，可调用本地工程其他高代码的能力，实现高低代码互联互通',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/2cd2f0a4496a76abbdca8827df83e869_1729x966.jpg'
      },
      {
        navTitle: '混合开发',
        des: '让低代码也能应对复杂场景',
        subDes: '支持已有的应用使用低代码开发简单的页面，与原有代码一起编译，构建成一个完整的应用',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/bf84e613c9d667991ea5e2dd8c54e689_1729x966.jpg'
      }
    ]
  },
  {
    title: '搭建输出源码',
    navIcon: 'code',
    navList: [
      {
        navTitle: '源码',
        des: '搭建的应用输出为源码',
        subDes: '设计器最终输出的产物为源代码，可直接构建部署，应用运行过程中不需要设计器引擎',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/5a28479b7d1db5a0b4381fe8e24f8861_1729x966.jpg'
      },
      {
        navTitle: '预览',
        des: '还原度更高的页面预览',
        subDes: '页面预览采用ES Module浏览器实时编译源码渲染，无需单独的渲染引擎，速度更快还原度更高',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/deca4803d25fd3bb9ed25006e102d3cd_1729x966.jpg'
      },
      {
        navTitle: '发布',
        des: '支持两种形态的应用发布',
        subDes: '应用发布既支持自动构建部署，也支持源码直接提交到用户的Git仓库，由用户自行构建部署',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/fbe63910081d98e8acb154925b0a929f_1729x966.jpg'
      }
    ]
  },
  {
    title: '物料双向流通',
    navIcon: 'circulation',
    navList: [
      {
        navTitle: '区块',
        des: '可配置的复用区块',
        subDes: '在设计器里用户通过可视化方式，创建一个可以暴露属性配置的区块，在其他页面里复用',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/033dcc432569c6f14cd7892cfa3883b4_1729x966.jpg'
      },
      {
        navTitle: '协议',
        des: '统一的低代码协议',
        subDes: '已发布低代码应用描述协议、物料资产包协议，正协调各设计器统一协议，共建华为低代码生态',
        img: 'http://image.opentiny.design/tiny-lts/v1/images/bfcd39de56d4a6890a29396f6fff0001_1729x966.jpg'
      }
    ]
  }
]

const navList = [
  {
    navTitle: '物料',
    des: '开放的物料生态',
    subDes: '官方提供精选的组件和区块，支持接入第三方组件库，用户可以发布自己的物料到生态中心',
    img: `${import.meta.env.BASE_URL}img/home/material.png`
  },
  {
    navTitle: '插件',
    des: '强大的定制扩展能力',
    subDes: '官方提供核心的工具栏和插件，用户可自由搭配按需选用，也可以自行开发定制工具栏和插件',
    img: `${import.meta.env.BASE_URL}img/home/plugin.png`
  },
  {
    navTitle: 'DSL',
    des: '灵活的代码输出',
    subDes: '官方提供页面Schema生成源代码的能力，用户可以开发自己的DSL，控制输出的代码及风格',
    img: `${import.meta.env.BASE_URL}img/home/dsl.png`
  },
  {
    navTitle: '组织',
    des: '拥有独立设计器的组织',
    subDes: '设计器按组织隔离，每个组织可创建多个设计器，每个设计器可创建多个应用，每个应用可创建多个页面',
    img: `${import.meta.env.BASE_URL}img/home/organization.png`
  },
  {
    navTitle: '多框架',
    des: '支持主流前端框架',
    subDes: '采用WebComponent技术，画布支持Angular、Vue、React组件渲染，未来可支撑更多框架',
    img: `${import.meta.env.BASE_URL}img/home/frame.png`
  },
  {
    navTitle: '多终端',
    des: '丰富的终端开发支持',
    subDes: '目前支持PC、移动、平板、大屏等终端开发，未来可支持直接生成We码应用、鸿蒙应用等',
    img: `${import.meta.env.BASE_URL}img/home/terminal.png`
  },
  {
    navTitle: '桥接源',
    des: '连接低代码与高代码的桥梁',
    subDes: '在线下IDE低代码搭建的页面，可调用本地工程其他高代码的能力，实现高低代码互联互通',
    img: `${import.meta.env.BASE_URL}img/home/bridge.png`
  },
  {
    navTitle: '混合开发',
    des: '让低代码也能应对复杂场景',
    subDes: '支持已有的应用使用低代码开发简单的页面，与原有代码一起编译，构建成一个完整的应用',
    img: `${import.meta.env.BASE_URL}img/home/dev.png`
  },
  {
    navTitle: '源码',
    des: '搭建的应用输出为源码',
    subDes: '设计器最终输出的产物为源代码，可直接构建部署，应用运行过程中不需要设计器引擎',
    img: `${import.meta.env.BASE_URL}img/home/code.png`
  },
  {
    navTitle: '预览',
    des: '还原度更高的页面预览',
    subDes: '页面预览采用ES Module浏览器实时编译源码渲染，无需单独的渲染引擎，速度更快还原度更高',
    img: `${import.meta.env.BASE_URL}img/home/preview.png`
  },
  {
    navTitle: '发布',
    des: '支持两种形态的应用发布',
    subDes: '应用发布既支持自动构建部署，也支持源码直接提交到用户的Git仓库，由用户自行构建部署',
    img: `${import.meta.env.BASE_URL}img/home/release.png`
  },
  {
    navTitle: '区块',
    des: '可配置的复用区块',
    subDes: '在设计器里用户通过可视化方式，创建一个可以暴露属性配置的区块，在其他页面里复用',
    img: `${import.meta.env.BASE_URL}img/home/block.png`
  },
  {
    navTitle: '协议',
    des: '统一的低代码协议',
    subDes: '已发布低代码应用描述协议、物料资产包协议，正协调各设计器统一协议，共建华为低代码生态',
    img: `${import.meta.env.BASE_URL}img/home/agreement.png`
  }
]

export default {
  setup() {
    let globalIndex = 0

    let playFlag = false

    const state = reactive({
      active: '物料',
      list: stateList,
      navList: navList
    })

    const navLength = state.navList.length
    const selectItem = (nav, index) => {
      state.active = nav.navTitle
      globalIndex = index
      playFlag = true
    }

    const runList = () => {
      if (playFlag) {
        return
      }
      if (navLength - 1 === globalIndex) {
        globalIndex = 0
      } else {
        globalIndex++
      }
      state.active = state.navList[globalIndex].navTitle
      setTimeout(() => {
        runList()
      }, 4000)
    }

    onMounted(() => {
      runList()
    })

    return {
      state,
      selectItem
    }
  }
}
</script>

<style lang="less" scoped>
.home-carousel {
  width: 100%;
  background: #fff;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .home-carousel-wrap {
    width: 100%;
    max-width: 1360px;
    padding: 50px 0;
    margin: 0 auto;
    display: flex;
    .list-item {
      &:not(:last-child) {
        margin-bottom: 16px;
      }
    }
    .left-wrap {
      width: 230px;
      .group-title {
        margin-bottom: 4px;
        .svg-icon {
          padding-bottom: 6px;
          font-size: 24px;
        }
        .title {
          font-size: 20px;
          font-weight: 600;
          color: #333333;
          line-height: 20px;
          margin-left: 16px;
        }
      }
      .group-content {
        border-left: 1px dashed #adb0b8;
        margin-top: 10px;
        margin-left: 14px;
      }
      .group-item {
        margin-left: 17px;
        display: flex;
        flex-direction: column;
        .test {
          font-size: 16px;
          color: #8a8e99;
        }
      }
      .item-wrap {
        width: 110px;
        height: 40px;
        line-height: 40px;
        border-radius: 6px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #171a1d;
        padding-left: 10px;
        cursor: pointer;
        white-space: nowrap;
        margin-top: 2px;
        &:hover {
          background-color: #e9edfa;
        }
        &.active {
          background: #e9edfa;
          .test {
            color: #5e7ce0;
          }
        }
        .line {
          display: inline-block;
          height: 4px;
          width: 16px;
          border-radius: 2px;
          background-color: #e5e6e8;
          margin: 0 10px 5px 10px;
        }
      }
    }
    .right-wrap {
      flex: 1;
      .des-item {
        position: relative;
        z-index: 0;
        opacity: 0;
        display: none;
        &.active {
          z-index: 1;
          opacity: 1;
          display: block;
        }
        .des-title {
          font-size: 36px;
          font-weight: 600;
          color: #191919;
          margin-left: 100px;
        }
        .des-sub-title {
          font-size: 18px;
          font-family: PingFangSC-Regular, PingFangSC-Regular-Normal;
          color: #747677;
          margin-left: 100px;
          margin-top: 20px;
          margin-bottom: 40px;
        }
        img {
          margin-left: 100px;
          height: 90%;
        }
      }
      .img-wrap {
        border-radius: 16px;
        max-width: 1080px;
        margin: 0 auto;
        height: 654px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
    }
  }
}
</style>
