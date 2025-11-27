<template>
  <div class="home-vertical">
    <div class="home-vertical-warp">
      <p class="title">{{ state.title }}</p>
      <div class="content">
        <div class="img-wrap" :style="{ backgroundImage: `url(${state.backgroundUrl})` }">
          <img :src="state.img" alt="" />
        </div>
        <div class="right">
          <div
            v-for="(item, index) in state.list"
            :key="item.title"
            :class="['des-item', { active: item.selected }]"
            @click="selectItem(item, index)"
          >
            <div class="right-title">
              <svg-icon class="svg-icon" :name="item.icon"></svg-icon>
              <div class="des-title">{{ item.title }}</div>
              <a v-if="item.selected" :href="item.link" class="link" :target="item.link ? '_blank' : ''"
                >体验Demo <icon-arrow-right></icon-arrow-right>
              </a>
            </div>
            <div v-if="item.selected" class="right-content">
              <div class="content">
                <div v-for="content in item.contentList" :key="content.title">
                  <div class="content-title">{{ content.title }}</div>
                  <div class="content-des">{{ content.des }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { IconArrowRight } from '@opentiny/vue-icon'
import { EXPERIENCE_URL_FLOW, EXPERIENCE_URL_CONSOLE, EXPERIENCE_URL_BDVIEW } from 'lowcode-design-controller/utils'

export default {
  components: {
    IconArrowRight: IconArrowRight()
  },
  setup() {
    let globalIndex = -1

    let playFlag = false

    const state = reactive({
      title: '垂直领域，定制化服务',
      list: [
        {
          title: '图元编排设计器',
          contentList: [
            {
              title: '1. 领域专属 部署多样',
              des: '按需自主新建特定领域专属图元构建设计器，线上构建部署、本地命令行部署全都有。'
            },
            {
              title: '2. 随心拖拽 人性智能',
              des: '完备的画布拖拽绘图核心能力，结合人性化的交互，和智能化的层级与布局调整，为用户提供强大的在线设计器。'
            },
            {
              title: '3. 属性配置 强大高效',
              des: '多种属性配置组件自由选择，自定义校验、静态或远程数据源加载、动态JS表达式与JS方法全支持，通过图形化界面提升配置效率。'
            },
            {
              title: '4. 布局自由 灵活集成',
              des: '自由布局，满足用户随心调整，可以灵活嵌入各类系统，包括但不限于Console业务中。'
            },
            {
              title: '5. 业务为先 灵活拓展',
              des: '插件化架构，业务的正向DSL、逆向DSL转换都可以成为一个插件，可以满足多种业务不同的诉求，灵活而强大。'
            },
            {
              title: '6. 模块联动 极致体验',
              des: '属性配置、画布、代码区等各个设计器模块除了各身的强大的功能，相互联动，相辅相成，省去您繁杂的操作步骤，所见即得，一键即达。'
            }
          ],
          icon: 'element',
          link: EXPERIENCE_URL_FLOW,
          img: `${import.meta.env.BASE_URL}img/home/element.png`,
          selected: true
        },
        {
          title: 'Console服务开发',
          contentList: [
            {
              title: '1. 领域专属，开箱即用',
              des: '汇聚Console公共能力，后端人员也能轻松上手进行 Console页面开发，实现快速前端开发与交付。'
            },
            {
              title: '2. 开发上线，一气呵成',
              des: '全程在线可视化配置，打通链路断点，无需关注 Tiny Pro/Plus、CF UI/CF2，Console 应用一键部署上线。'
            },
            {
              title: '3. 物料流动，良性循环',
              des: '平台与业务双向奔赴，让最佳实践与交互体验，快速落地，积累Console物料，支撑体验会战。'
            }
          ],
          icon: 'console',
          link: EXPERIENCE_URL_CONSOLE,
          img: `${import.meta.env.BASE_URL}img/home/console.png`,
          selected: false
        },
        {
          title: '大屏编排设计器',
          contentList: [
            {
              title: '1. 排版布局，一秒搞定',
              des: '提供多种页面布局模式，轻松点击即可生成页面结构，用户无需过多关注样式，快速完成大屏整体架构。'
            },
            {
              title: '2. 丰富图表，灵活适配',
              des: '不断添加新的图表组件，包括A-Charts等，不断完善的大屏区块，在统计汇总、业务监控业务场景试用。'
            },
            {
              title: '3. 简单设置，快速搭建',
              des: '目标是让用户只需简单的拖拽，少量设置，3分钟完成页面搭建，功能对标DMax与DataV等业界产品。'
            }
          ],
          icon: 'screen',
          link: EXPERIENCE_URL_BDVIEW,
          img: `${import.meta.env.BASE_URL}img/home/screen.png`,
          selected: false
        }
      ],
      img: `${import.meta.env.BASE_URL}img/home/element.png`,
      backgroundUrl: `${import.meta.env.BASE_URL}img/home/vertical.jpg`
    })

    const selectItem = (item, index) => {
      state.list.forEach((listItem) => {
        listItem.selected = item.title === listItem.title
      })
      state.img = item.img
      playFlag = true
    }

    const runList = () => {
      if (playFlag) {
        return
      }

      if (state.list.length - 1 === globalIndex) {
        globalIndex = 0
      } else {
        globalIndex++
      }

      state.list.forEach((listItem) => {
        listItem.selected = state.list[globalIndex].title === listItem.title
      })
      state.img = state.list[globalIndex].img

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
.home-vertical {
  box-sizing: border-box;
  width: 100%;
  height: 870px;
  background: #f2f6fa;
  padding: 70px 80px 0 80px;
  margin-bottom: 40px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .home-vertical-warp {
    width: 100%;
    max-width: 1360px;
    margin: 0 auto;
    .title {
      text-align: center;
      height: 60px;
      font-size: 36px;
      color: #191919;
      font-weight: 600;
      line-height: 20px;
    }
    .content {
      background: #ffffff;
      border-radius: 20px;
      width: 100%;
      height: 570px;
      display: flex;
      flex-direction: row;
    }
    .img-wrap {
      box-sizing: border-box;
      height: 570px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      border-radius: 20px 0 0 20px;
      display: flex;
      justify-content: center;
      padding: 56px 40px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .right {
      box-sizing: border-box;
      width: 500px;
      margin: 30px 32px;
      .des-item {
        cursor: pointer;
        box-sizing: border-box;
        line-height: 60px;
        border-radius: 4px;
        flex-direction: row;
        border: 1px solid #dfe3e9;
        margin-bottom: 6px;
        .right-title {
          padding: 0 20px;
          height: 48px;
          line-height: 50px;
          display: flex;
          align-items: center;
          .svg-icon {
            font-size: 24px;
            margin-top: 2px;
          }
          .des-title {
            margin-left: 12px;
            width: 70%;
            font-size: 18px;
            font-weight: 600;
            color: #262626;
            height: 50px;
          }
          .des-sub-title {
            font-size: 16px;
            color: #8a8e99;
            margin-bottom: 20px;
          }
          .link {
            font-size: 14px;
            color: #5e7ce0;
          }
        }
        .right-content {
          cursor: default;
          height: 310px;
          padding: 20px;
          .content {
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            height: 310px;
            .content-title {
              font-size: 16px;
              color: #202e54;
              line-height: 22px;
            }
            .content-des {
              font-size: 13px;
              color: #8a8e99;
              line-height: 20px;
              margin-bottom: 16px;
            }
          }
          ::-webkit-scrollbar-thumb {
            background: rgb(233, 233, 233);
          }
        }
        &.active {
          background: #fff;
          .right-title {
            background: #f2f5fc;
          }
        }
      }
    }
  }
}
</style>
