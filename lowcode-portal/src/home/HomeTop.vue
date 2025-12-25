<template>
  <div class="home-top">
    <div class="home-top-banner">
      <div class="message">
        <div class="title">
          <div class="title-one">TinyEngine低代码引擎</div>
          <div class="title-two">AI时代的智能低代码基座</div>
        </div>

        <div class="description">
          <div>支持在线实时构建</div>
          <div>支持设计器命令行二次开发</div>
          <div>支持插件灵活扩展</div>
        </div>
        <div class="btn-wrap">
          <tiny-button @click="gotoEditor">
            <span>立即体验</span>
          </tiny-button>
          <tiny-button class="to-build" @click="gotoHelp">
            <span>产品文档</span>
          </tiny-button>
        </div>
      </div>
      <div class="home-image">
        <img class="image-bg1" :src="state.bgUrl" />
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
      bgUrl: `${import.meta.env.BASE_URL}img/home/banner_bg.webp`,
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
      const copyElement = document.querySelector('.copy-success')

      setTimeout(() => {
        copyElement.style.display = 'block'
      }, 300)
      setTimeout(() => {
        copyElement.style.display = 'none'
      }, 1500)
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
@keyframes slideUpFadeIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.home-top {
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
    padding-top: 80px;
    padding-bottom: 80px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 70px;
    .message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .title {
        font-size: clamp(20px, 4vw, 50px);
        font-weight: 700;
        line-height: 70px;
        .title-one {
          color: #191919;
          margin-bottom: 4px;
        }
        .title-two {
          background: linear-gradient(90deg, #ad48ff, #2981ff);
          background-clip: text;
          color: transparent;
        }
      }
      .description {
        margin-top: 28px;
        font-size: 20px;
        color: #808080;
        line-height: 32px;
      }

      .btn-wrap {
        display: flex;
        align-items: center;
        margin-top: 70px;

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
    }
    .home-image {
      max-width: 950px;
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.08);
      animation: slideUpFadeIn 0.8s ease forwards;
      border-radius: 24px;
      .image-bg1 {
        width: 100%;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.08);
        border-radius: 24px;
      }
    }
  }
}

@media screen and (max-width: 1023px) {
  .home-top {
    padding-top: 40px;
    .home-top-banner {
      padding: 0;
      display: flex;
      justify-content: center;
      align-content: flex-start;
      flex-direction: column;
      gap: 0;
      .home-br {
        display: inline-block;
      }
      .message {
        .title {
          font-size: 24px;
          line-height: 40px;
          text-align: center;
          .title-one {
            margin-bottom: 0;
          }
        }
        .description {
          font-size: 12px;
          line-height: 26px;
          margin-top: 12px;
          text-align: center;
        }
        .btn-wrap {
          margin-top: 24px;
          justify-content: center;
          :deep(.tiny-button) {
            width: 108px;
            height: 32px;
            line-height: 32px;
            font-size: 12px;
            .svg-icon {
              display: none;
            }
          }
        }
      }
      .home-image {
        margin: 10px -10px;
        .image-bg1 {
          border-radius: 6px;
        }
      }
    }
  }
}
</style>
