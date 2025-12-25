<template>
  <div class="home-ecology">
    <p class="home-ecology-title">{{ state.title }}</p>
    <div class="home-ecology-sub-title">{{ state.subTitle }}</div>
    <div class="home-ecology-pc">
      <div class="home-ecology-pc-left">
        <div
          v-for="(item, idx) in state.list"
          :key="item.name"
          :class="['home-ecology-pc-left-item', { active: state.currentIndex === idx }]"
          @mouseenter="pauseAutoSwitch(idx)"
          @mouseleave="startAutoSwitch"
        >
          <div class="home-ecology-pc-left-item-title">
            <img :src="item.icon" />
            <div class="title">{{ item.text }}</div>
          </div>
          <div class="home-ecology-pc-left-item-des">{{ item.des }}</div>
        </div>
      </div>
      <div class="home-ecology-pc-right">
        <img
          :class="['home-ecology-pc-right-img', { 'zoom-in': state.showZoomEffect }]"
          :src="currentImg"
          @animationend="state.showZoomEffect = false"
        />
      </div>
    </div>
    <div class="home-ecology-mobile">
      <div class="home-ecology-mobile-container">
        <div
          v-for="(item, idx) in state.list"
          :key="item.name"
          class="home-ecology-mobile-item"
          @click="pauseAutoSwitch(idx)"
        >
          <div class="home-ecology-mobile-item-title">
            <img :src="item.icon" />
            <div class="title">{{ item.text }}</div>
          </div>
          <div class="home-ecology-mobile-item-des">{{ item.des }}</div>
          <div :class="['home-ecology-mobile-img', { active: state.currentIndex === idx }]">
            <img :src="item.imgUrl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      title: '灵活丰富的低代码生态',
      subTitle: '开放融合、多元共建、广泛赋能',
      list: [
        {
          name: 'material',
          text: '打破物料孤岛，扩展周边生态',
          des: '构建开放生态，支持三方引入与个人发布，实现共建共享',
          icon: `${import.meta.env.BASE_URL}img/home/ec_icon1.svg`,
          imgUrl: `${import.meta.env.BASE_URL}img/home/ec_1.svg`,
          mobileImgUrl: `${import.meta.env.BASE_URL}img/home/home-ecology-mobile1.png`
        },
        {
          name: 'plugin',
          text: '丰富多样化的插件生态',
          des: '插件功能赋予低代码引擎更高的灵活性，用户可按需选择',
          icon: `${import.meta.env.BASE_URL}img/home/ec_icon2.svg`,
          imgUrl: `${import.meta.env.BASE_URL}img/home/ec_2.svg`,
          mobileImgUrl: `${import.meta.env.BASE_URL}img/home/home-ecology-mobile2.png`
        },
        {
          name: 'platform',
          text: '多行业多场景低代码平台',
          des: '帮助开发者构建云原生服务',
          icon: `${import.meta.env.BASE_URL}img/home/ec_icon3.svg`,
          imgUrl: `${import.meta.env.BASE_URL}img/home/ec_3.svg`,
          mobileImgUrl: `${import.meta.env.BASE_URL}img/home/home-ecology-mobile3.png`
        }
      ],
      currentIndex: 0,
      autoSwitchEnabled: true,
      switchInterval: null,
      showZoomEffect: true
    })
    const currentImg = computed(() => state.list[state.currentIndex].imgUrl)

    const nextItem = () => {
      if (state.currentIndex === 2) {
        state.currentIndex = 0
      } else {
        state.currentIndex++
      }
      state.showZoomEffect = true
    }

    const startAutoSwitch = () => {
      if (state.switchInterval) clearInterval(state.switchInterval)
      state.switchInterval = setInterval(nextItem, 4000)
    }

    const stopAutoSwitch = () => {
      if (state.switchInterval) {
        clearInterval(state.switchInterval)
        state.switchInterval = null
      }
    }

    const pauseAutoSwitch = (idx) => {
      state.currentIndex = idx
      state.showZoomEffect = true
      state.autoSwitchEnabled = false
      stopAutoSwitch()
    }

    onMounted(() => {
      startAutoSwitch()
    })

    onUnmounted(() => {
      stopAutoSwitch()
    })

    return {
      state,
      currentImg,
      pauseAutoSwitch,
      startAutoSwitch
    }
  }
}
</script>

<style lang="less" scoped>
.home-ecology {
  margin: 0 auto;
  margin-top: 120px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .home-ecology-title {
    text-align: center;
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 40px;
    color: #191919;
    font-weight: 700;
    line-height: 54px;
  }
  .home-ecology-sub-title {
    margin-bottom: 60px;
    color: #808080;
    font-size: 20px;
    line-height: 34px;
    text-align: center;
  }
  .home-ecology-pc {
    display: flex;
    .home-ecology-pc-left {
      width: 40%;
      .home-ecology-pc-left-item {
        box-sizing: border-box;
        width: 100%;
        height: 144px;
        border-radius: 20px;
        background: #fff;
        margin-bottom: 36px;
        padding: 38px 34px;
        .home-ecology-pc-left-item-title {
          display: flex;
          margin-bottom: 14px;
          img {
            width: 32px;
            height: 32px;
            margin-right: 12px;
          }
          .title {
            color: #191919;
            font-size: 24px;
            line-height: 32px;
            font-weight: 600;
          }
        }
        .home-ecology-pc-left-item-des {
          color: #808080;
          font-size: 16px;
          line-height: 20px;
        }
      }
      .home-ecology-pc-left-item:hover,
      .active {
        background: #f6f6f6;
      }
    }
    .home-ecology-pc-right {
      width: 60%;
      border-radius: 24px;
      margin-left: 90px;
      background-image: url(/img/home/ec_bg.svg);
      display: flex;
      justify-content: center;
      .home-ecology-pc-right-img {
        width: 95%;
        transition: transform 0.5s ease;
      }

      .zoom-in {
        animation: slideIn 0.8s ease forwards;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .home-ecology-mobile {
      display: none;
    }
  }
  @media screen and (max-width: 1023px) {
    margin-top: 30px;
    height: auto;
    .home-ecology-pc {
      display: none;
    }
    .home-ecology-title {
      font-size: 22px;
      margin-bottom: 8px;
      line-height: 26px;
    }
    .home-ecology-sub-title {
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 18px;
    }
    .home-ecology-mobile {
      .home-ecology-mobile-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        .home-ecology-mobile-item {
          padding: 20px;
          background: #f8f8f8;
          border-radius: 10px;
          width: 100%;
          .home-ecology-mobile-item-title {
            display: flex;
            align-items: center;
            gap: 10px;
            img {
              width: 21px;
              height: 21px;
            }
            .title {
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
        .home-ecology-mobile-item-des {
          color: #808080;
          font-size: 12px;
          line-height: 16px;
          margin-top: 10px;
        }
        .home-ecology-mobile-img {
          display: none;
          margin-top: 20px;
          background-image: url(/img/home/ec_bg.svg);
          background-size: cover;
          background-repeat: no-repeat;
          padding: 10px;
          border-radius: 8px;
          img {
            width: 100%;
          }
        }
        .active {
          display: block;
        }
      }
    }
  }
}
</style>
