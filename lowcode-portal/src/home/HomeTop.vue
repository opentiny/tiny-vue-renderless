<template>
  <div class="home-top">
    <div class="home-top-banner">
      <div class="message">
        <div class="title">
          <span class="title-one">TinyEngine低代码引擎</span>
          <img :src="state.commaUrl" />
          <span class="title-two">AI时代的智能低代码基座</span>
        </div>

        <div class="description">
          <div>支持开发者二次开发定制，构建智能化低代码平台</div>
        </div>
        <div class="btn-wrap">
          <tiny-button @click="gotoEditor">
            <span>立即体验</span>
          </tiny-button>
          <tiny-button class="to-build" @click="gotoHelp">
            <span>产品文档</span>
          </tiny-button>
        </div>
        <div class="home-image">
          <img class="image-bg1" :src="state.bg1Url" />
          <img class="image-bg2" :src="state.bg2Url" />
          <div class="image-copy">
            <div class="image"></div>
            <div class="image-copy-content">
              <div class="content-one">支持命令行创建设计器二次开发</div>
              <div class="content-two">
                <span>npx @opentiny/tiny-engine-cli@latest create</span>
                <svg-icon class="home-svg-icon" name="copy" @click="copy"></svg-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { Button } from '@opentiny/vue'
import { useRouter } from 'vue-router'
import { openEditor } from '@/utils/editor'
import { EXPERIENCE_URL } from 'lowcode-design-controller/utils'

export default {
  components: {
    TinyButton: Button
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      commaUrl: `${import.meta.env.BASE_URL}img/home/banner_comma.svg`,
      bg1Url: `${import.meta.env.BASE_URL}img/home/banner_bg1.svg`,
      bg2Url: `${import.meta.env.BASE_URL}img/home/banner_bg2.svg`,
      routerName: 'helpCenter'
    })

    const gotoHelp = () => {
      router.push({ name: state.routerName })
    }

    const gotoEditor = () => {
      openEditor(router, EXPERIENCE_URL)
    }

    const copy = () => {
      const textarea = document.createElement('textarea')

      textarea.value = 'npx @opentiny/tiny-engine-cli@latest create'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    return {
      state,
      gotoEditor,
      gotoHelp,
      copy
    }
  }
}
</script>

<style lang="less" scoped>
.home-top {
  height: 1160px;
  width: 100%;
  background-image: url(/img/home/top-banner.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .home-br {
    display: none;
  }
  .home-top-banner {
    width: 100%;
    padding-top: 84px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;

    .message {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: 50px;
        font-weight: 600;
        line-height: 80px;
        .title-one {
          color: #191919;
          margin-right: 20px;
        }
        .title-two {
          color: #1476ff;
          margin-left: 20px;
        }
      }
      .description {
        margin-top: 14px;
        font-size: 22px;
        color: #595959;
        line-height: 30px;
      }

      .btn-wrap {
        display: flex;
        align-items: center;
        margin-top: 40px;

        :deep(.tiny-button) {
          width: 152px;
          height: 48px;
          line-height: 48px;
          background: #191919;
          border-radius: 27px;
          border: none;
          font-size: 16px;
          color: #ffffff;
        }
        :deep(.tiny-button):hover {
          background: #595959;
        }
        .to-build {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid #191919;
          color: #191919;
          margin-left: 24px;
        }
        .to-build:hover {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid #c2c2c2;
        }
      }
      .home-image {
        width: 100%;
        height: 794px;
        margin-top: 20px;
        position: relative;
        .image-bg1 {
          // width: 80%;
          height: 90%;
          position: absolute;
          top: 50px;
          left: 0;
          z-index: 1;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
          border-radius: 24px;
        }
        .image-bg2 {
          // width: 40%;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
          box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.08);
          border-radius: 24px;
        }
        .image-copy {
          display: flex;
          position: absolute;
          bottom: 74px;
          left: 34px;
          width: 468px;
          height: 70px;
          z-index: 2;
          background: #ffffff;
          box-shadow: 0 0 50px 0 rgba(208, 226, 249, 1);
          border-radius: 20px;
          padding: 22px 26px;
          .image {
            width: 68px;
            height: 68px;
            background-image: url(/img/home/banner_icon_default.svg);
          }
          .image-copy-content {
            margin-left: 14px;
            padding-top: 6px;
            .content-one {
              color: #191919;
              font-size: 20px;
              font-weight: 600;
              line-height: 28px;
            }
            .content-two {
              margin-top: 8px;
              color: #595959;
              font-size: 14px;
              .home-svg-icon {
                margin-left: 8px;
                cursor: pointer;
              }
            }
          }
        }
        .image-copy:hover {
          background: #1476ff;
          .image {
            background-image: url(/img/home/banner_icon__hover.svg);
          }
          .content-one,
          .content-two,
          .home-svg-icon {
            color: #ffffff;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  .home-image {
    display: none;
  }

  .home-top {
    height: 530px;
    padding-top: 50px;
    background-image: url(/img/home/top-banner-mobile.jpg);
    .home-top-banner {
      padding: 0;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      .home-br {
        display: inline-block;
      }
      .message {
        .title {
          font-size: 24px;
          line-height: 40px;
        }
        .description {
          font-size: 14px;
          line-height: 26px;
        }
        .btn-wrap {
          margin-top: 18px;
          :deep(.tiny-button) {
            width: 120px;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            .svg-icon {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
