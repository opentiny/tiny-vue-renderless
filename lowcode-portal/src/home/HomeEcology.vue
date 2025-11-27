<template>
  <div class="home-ecology">
    <p class="home-ecology-title">{{ state.title }}</p>
    <div class="home-ecology-pc">
      <div class="home-ecology-pc-left">
        <div
          v-for="(item, idx) in state.list"
          :key="item.name"
          :class="['home-ecology-pc-left-item', { active: state.currentIndex === idx }]"
          @mouseenter="pauseAutoSwitch(idx)"
          @mouseleave="resumeAutoSwitch"
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
          :src="state.list[state.currentIndex].imgUrl"
          @animationend="showZoomEffect = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const state = reactive({
      title: '灵活丰富的低代码生态',
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
      imgUrl: `${import.meta.env.BASE_URL}img/home/ec_1.svg`,
      currentIndex: 0,
      autoSwitchEnabled: true,
      switchInterval: null,
      showZoomEffect: true
    })

    const nextItem = () => {
      state.showZoomEffect = true
      if (state.currentIndex === 2) {
        state.currentIndex = 0
      } else {
        state.currentIndex++
      }
    }

    const startAutoSwitch = () => {
      if (state.switchInterval) clearInterval(state.switchInterval)
      state.switchInterval = setInterval(nextItem, 2000)
    }

    const stopAutoSwitch = () => {
      if (state.switchInterval) {
        clearInterval(state.switchInterval)
        state.switchInterval = null
      }
    }

    const pauseAutoSwitch = (idx) => {
      state.currentIndex = idx
      state.autoSwitchEnabled = false
      stopAutoSwitch()
    }

    const resumeAutoSwitch = () => {
      state.autoSwitchEnabled = true
      state.currentIndex++
      startAutoSwitch()
    }

    onMounted(() => {
      startAutoSwitch()
    })

    onUnmounted(() => {
      stopAutoSwitch()
    })

    return {
      state,
      pauseAutoSwitch,
      resumeAutoSwitch
    }
  }
}
</script>

<style lang="less" scoped>
.home-ecology {
  height: 740px;
  max-width: 1360px;
  margin: 0 auto;
  margin-top: 60px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .home-ecology-title {
    text-align: center;
    margin-top: 0;
    margin-bottom: 80px;
    font-size: 40px;
    color: #191919;
    font-weight: 700;
    line-height: 54px;
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
        background: #f8f8f8;
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
        background: #fff;
        box-shadow: 0px 4px 25px 0px #d4e5f6;
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
        width: 80%;
        transition: transform 0.5s ease;
      }

      .home-ecology-pc-right-img.zoom-in {
        animation: zoomIn 0.8s ease-out forwards;
      }

      @keyframes zoomIn {
        from {
          transform: scale(0.8);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .home-ecology-mobile {
      display: none;
    }
  }
}

@media screen and (max-width: 1023px) {
  .home-ecology-pc {
    display: none;
  }
  .home-ecology {
    height: auto;
    padding: 32px 24px;
    .home-ecology-title {
      font-size: 20px;
      margin-bottom: 32px;
      line-height: 26px;
    }
    .tab-item-mobile {
      background: #f5f5f5;
      padding: 32px 0px;
      margin-bottom: 12px;
      text-align: center;
      img {
        width: 100%;
      }
      .tab-item-title,
      .tab-item-text,
      .tab-item-des {
        padding: 0px 23px;
        text-align: left;
      }
      .tab-item-title {
        font-size: 18px;
        color: #191919;
        line-height: 20px;
      }
      .tab-item-text {
        margin-top: 16px;
        font-size: 16px;
      }
      .tab-item-des {
        margin-bottom: 16px;
        padding-right: 81px;
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
}
</style>
