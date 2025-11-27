<template>
  <div class="home-core-scenarios">
    <div class="home-core-scenarios-main">
      <p class="title">{{ state.title }}</p>
      <div class="list-bg">
        <ul class="list">
          <li v-for="(item, index) in state.list" :key="index" class="list-item">
            <span><img class="item-img" :src="item.imgUrl" alt="" /></span>
            <span class="item-title">{{ item.title }}</span>
            <span class="item-des">{{ item.des }}</span>
            <span class="item-user"
              ><div class="item-use">
                {{ item.user }}
              </div>
              <div class="item-use item-use-two">
                {{ item.use }}
              </div></span
            >
            <span class="item-difficulty">
              <span class="item-difficulty-text">技术难度</span>
              <img v-for="rate in item.rate" :key="rate" class="icon-star-active" :src="state.starUrl" />
            </span>
            <img v-if="index < state.list.length - 1" class="flow-arrow" :src="state.arrowUrl" />
            <img v-if="index < state.list.length - 1" class="flow-arrow-mobile" :src="state.arrowMobileUrl" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      title: '三大核心场景',
      list: [
        {
          title: '低代码引擎',
          des: '低代码平台基础能力建设，包括：制定低代码协议规范、开发可视化设计器、物料区块管理、创建和维护低代码平台等。',
          imgUrl: `${import.meta.env.BASE_URL}img/home/hx1.svg`,
          user: '引擎开发人员',
          use: '能力建设',
          rate: 5 // 难度评分
        },
        {
          title: '低代码平台',
          des: '创建和维护各业务领域的低代码平台，比如：抽象业务逻辑和封装业务模块，开发相应的物料区块、平台扩展插件等。',
          imgUrl: `${import.meta.env.BASE_URL}img/home/hx2.svg`,
          user: '平台开发人员',
          use: '物料生态',
          rate: 3
        },
        {
          title: '低代码应用',
          des: '负责在各领域低代码平台上开发低代码业务应用，使用已抽象封装的物料区块，以搭积木的方式快速编排并生成应用。',
          imgUrl: `${import.meta.env.BASE_URL}img/home/hx3.svg`,
          user: '应用开发人员',
          use: '业务实现',
          rate: 1
        }
      ],
      readiconclass: 'icon-starDisable',
      starUrl: `${import.meta.env.BASE_URL}img/home/hx_star.svg`,
      arrowUrl: `${import.meta.env.BASE_URL}img/home/hx_arrow.svg`,
      arrowMobileUrl: `${import.meta.env.BASE_URL}img/home/arrow-mobile.png`
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.home-core-scenarios {
  width: 100%;
  &-main {
    width: 100%;
    max-width: 1360px;
    box-sizing: border-box;
    padding: 100px 0;
    margin: 0 auto;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    .title {
      text-align: center;
      margin-bottom: 80px;
      font-size: 40px;
      color: #191919;
      font-weight: 600;
      line-height: 40px;
    }
    .list-bg {
      padding: 6px;
      background: #e4ecff;
      border-radius: 40px;
    }
    .list-bg:hover {
      background-image: linear-gradient(to right, #bfe1ff, #9983ff);
    }
    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 14%;
      background: #fff;
      border-radius: 36px;
      padding: 80px 92px;
    }
    .list-item {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      text-align: center;
      position: relative;
      .item-img {
        width: 72px;
        height: 72px;
        margin-bottom: 28px;
      }
      .item-title {
        line-height: 40px;
        font-size: 30px;
        color: #191919;
        font-weight: 600;
        margin-bottom: 20px;
      }
      .item-des {
        font-size: 16px;
        color: #808080;
        line-height: 24px;
      }
      .item-user {
        display: flex;
        justify-content: center;
        margin-top: 34px;
      }
      .item-use {
        background: #f5f5f5;
        border-radius: 8px;
        color: #191919;
        line-height: 40px;
        font-size: 16px;
        font-weight: 600;
        height: 40px;
        text-align: center;
        padding: 0 20px;
      }
      .item-use-two {
        margin-left: 12px;
      }
      .item-difficulty {
        margin-top: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        .item-difficulty-text {
          margin-right: 12px;
          font-size: 16px;
          color: #808080;
        }
        .icon-star-active {
          width: 20px;
          height: 20px;
          margin-right: 4px;
        }
      }
      .flow-arrow {
        position: absolute;
        right: -50%;
        top: 40%;
        width: 120px;
        height: 66px;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .flow-arrow-mobile {
    display: none;
  }
}

@media screen and (max-width: 1023px) {
  .home-core-scenarios {
    height: auto;
    .home-core-scenarios-main {
      padding: 32px 0;
      .title {
        margin-bottom: 32px;
        font-size: 20px;
        line-height: 26px;
      }
      .list {
        margin: 0 23px;
        display: grid;
        grid-template-columns: repeat(1, 1fr);

        .list-item {
          height: auto;
          padding: 32px;
          margin-bottom: 60px;
          .item-img {
            width: 240px;
            height: 180px;
          }
          .item-title {
            font-size: 20px;
          }
          .item-des {
            font-size: 14px;
          }
        }
      }
      .flow-arrow {
        display: none;
      }
      .flow-arrow-mobile {
        position: absolute;
        right: 44%;
        bottom: -45px;
        width: 28px;
        height: 28px;
      }
    }
  }
}
</style>
