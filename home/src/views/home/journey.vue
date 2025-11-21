<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { $pub } from '@/tools'
import useWindowSize from '@/tools/useWindowSize.js'
const { isMobile } = useWindowSize()

const desinImg = computed(() => {
  if (isMobile.value) {
    return $pub('images/journey/mobile-design.svg')
  }
  return $pub('images/journey/design.png')
})

const devImg = computed(() => {
  if (isMobile.value) {
    return $pub('images/journey/mobile-dev.svg')
  }
  return $pub('images/journey/dev.png')
})

const router = useRouter()

const jumpToResource = () => {
  router.push('/opentiny-design/design-develop/console')
}

const jumpToDev = () => {
  window.open('/tiny-vue/zh-CN/os-theme/overview', '_self')
}
</script>

<template>
  <div class="home-journey">
    <div class="home-journey-title">即刻开启你的体验旅程</div>
    <div class="home-journey-card-box">
      <div class="home-journey-card">
        <div class="home-journey-card-top">
          <div :style="{ backgroundImage: `url(${desinImg})` }" class="home-journey-card-bg"></div>
        </div>
        <div class="home-journey-card-bottom">
          <div class="home-journey-card-bottom-title">我是设计师</div>
          <div class="home-journey-card-bottom-desc">
            了解 OpenTiny 的设计思想，这里有包括全局色、文字、图标和布局的指南
          </div>
          <div class="home-journey-card-bottom-input flex-center" @click="jumpToResource">
            <span>UX体验设计规范</span>
          </div>
        </div>
      </div>
      <div class="home-journey-card">
        <div class="home-journey-card-top is-right">
          <div :style="{ backgroundImage: `url(${devImg})` }" class="home-journey-card-bg"></div>
        </div>
        <div class="home-journey-card-bottom">
          <div class="home-journey-card-bottom-title">我是工程师</div>
          <div class="home-journey-card-bottom-desc">
            组件用于更快速、更简便的 web 开发。你也可以建立你自己的设计系统，或者从 OpenTiny 开始
          </div>
          <div class="home-journey-card-bottom-input flex-between" @click="jumpToDev">
            <span class="text-command">> npm i @opentiny/vue</span>
            <div class="copy-block">
              <img :src="$pub('images/journey/copy.svg')" alt="copy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';
.home-journey {
  .pcPadding(60);
  text-align: center;
  .home-journey-card-bg {
    background-size: cover;
    background-position: center;
  }
  &-title {
    color: rgb(25, 25, 25);
    .pcRem(font-size, 44);
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    padding-bottom: 48px;
  }
  &-card-box {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin: 0 auto;
    max-width: 1600px;
  }
  &-card {
    max-width: 784px;
    width: calc(50% - 16px);
    border-radius: 16px;
    background: rgb(247, 247, 247);
    overflow: hidden;
    &:hover {
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    }
    &-bg {
      width: 100%;
      height: 100%;
    }
    &-top {
      .pcRem(height, 360);
      background: linear-gradient(to bottom right, #ff9546, #ffd963);
      &.is-right {
        background: linear-gradient(to bottom right, #b4a0ff, #dbdbff);
      }
    }
    &-bottom {
      max-height: 360px;
      .pcPadding(0, 78);
      &-title {
        color: rgb(25, 25, 25);
        .pcRem(font-size, 32);
        font-weight: 600;
        line-height: 1.5;
        text-align: center;
        .pcRem(padding-top, 40);
        padding-bottom: 24px;
      }
      &-desc {
        color: rgb(89, 89, 89);
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0px;
        text-align: center;
        max-width: 450px;
        margin: 0 auto;
      }
      &-input {
        box-sizing: border-box;
        border: 1px solid rgb(89, 89, 89);
        border-radius: 32px;
        height: 48px;
        .pcMargin(64, 0, 80);
        font-size: 14px;
        color: rgb(25, 25, 25);
        cursor: pointer;
      }
    }
    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .flex-between {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text-command {
        padding-left: 24px;
      }
      .copy-block {
        border-left: 1px solid rgb(89, 89, 89);
        height: 20px;
        padding-left: 24px;
        padding-right: 24px;
        display: flex;
        align-items: center;
        img {
          cursor: pointer;
        }
      }
    }
  }
  @media screen and (max-width: @break-point) {
    .mobilePadding(32, 48);
    .home-journey-title {
      font-size: 24px;
      padding-bottom: 32px;
    }
    .home-journey-card {
      width: 100%;
      &-bottom {
        .mobilePadding(0, 30px, 40);
      }
      &-bottom-title {
        font-size: 20px;
        padding: 20px 0 12px 0;
      }
      &-bottom-desc {
        font-size: 14px;
        max-width: 100%;
      }
      &-bottom-input {
        max-width: 430px;
        margin: 0 auto;
      }
    }
    .home-journey-card-top {
      .mobileRem(height, 184);
    }
    .home-journey-card-bottom-input {
      height: 36px;
      .mobileRem(margin-top, 40);
    }
  }
}
</style>
