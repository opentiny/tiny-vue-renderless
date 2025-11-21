<template>
  <div class="home-slogen">
    <div>
      <div class="home-slogan-top">
        <img class="home-title-svg" :src="$pub('images/home-title.svg')" />
        <div class="home-title">企业智能前端开发解决方案</div>
        <div class="home-title-description">
          以生成式 UI <span>+</span> WebMCP 两大自主核心技术为基础，加速企业应用的智能化改造
        </div>
        <div class="home-title-description1">
          传统应用引入 OpenTiny NEXT 进行智能化改造后，可通过自然语言让智能体代替人自主完成任务
        </div>
        <div class="home-title-buttons">
          <tiny-button :size="isMobile ? 'small' : 'medium'" type="primary" class="link-button" @click="onLearnMore">
            开发文档 <img class="home-title-arrow-icon" :src="$pub('images/home/slogan/arrow.svg')" />
          </tiny-button>
          <tiny-button :size="isMobile ? 'small' : 'medium'" class="link-button" @click="handleExperience">
            立即体验 <img class="home-title-arrow-icon" :src="$pub('images/home/slogan/arrow-black.svg')" />
          </tiny-button>
        </div>
      </div>
      <div class="home-video-wrap">
        <div class="home-video-tag">以企业出差场景为例</div>
        <div class="home-video-content">
          <div class="home-video-item">
            <h3>应用智能化改造前</h3>
            <span>
              员工需要在不同终端手动操作来完成流程，比如在移动端填写出差申请，在Web端填写外出公干申请，在桌面端添加日程安排等
            </span>
          </div>
          <div class="home-video-item">
            <h3>应用智能化改造后</h3>
            <span>
              员工只需在统一的AI对话框，通过自然语言让智能体自主规划任务，自动完成不同端的出差申请、外出公干、添加日程等流程
            </span>
          </div>
        </div>
        <div class="home-video">
          <video
            ref="videoRef"
            id="master_control"
            class="video video-player"
            controls
            preload="metadata"
            width="1080"
            :poster="postUrl"
          >
            <source :src="$pub('images/home/slogan/business_trip.mp4')" type="video/mp4" />
          </video>
        </div>

        <tiny-link class="home-video-link" @click="onLinkClick">
          <template #icon>
            <IconArrowRight></IconArrowRight>
          </template>
          查看其他应用智能化改造后提升效率的案例
        </tiny-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TinyButton, TinyLink } from '@opentiny/vue'
import { $pub } from '../../../tools/utils'
import useWindowSize from '@/tools/useWindowSize.js'
import { onMounted, ref, watchEffect } from 'vue'
import { iconArrowRight } from '@opentiny/vue-icon'

const { isMobile } = useWindowSize()
const IconArrowRight = iconArrowRight()
const videoRef = ref(null)
const onLearnMore = () => window.open('https://docs.opentiny.design', '_blank', 'noopener')
const handleExperience = () => window.open('https://ai.opentiny.design/tar/', '_blank', 'noopener')
const postUrl = $pub('images/home/slogan/video_poster.webp')
const onLinkClick = () => window.open('https://www.bilibili.com/video/BV1YnCKBLE4V', '_blank', 'noopener')
onMounted(() => {
  const posterImg = new Image()
  posterImg.src = postUrl
  posterImg.onload = () => {
    videoRef.value.classList.add('video--fade-in')
  }
})

watchEffect(() => {
  if (isMobile.value) {
    videoRef.value?.classList.remove('video-player')
  } else {
    videoRef.value?.classList.add('video-player')
  }
})
</script>

<style scoped lang="less">
@import '@/mixin.less';

.home-slogen {
  & > div {
    max-width: 1280px;
    margin: 0 auto;
  }
  .home-slogan-top {
    .home-title {
      .pcRem(font-size, 52);
      font-weight: 600;
      background: linear-gradient(90deg, rgba(203, 67, 168, 1), rgba(44, 95, 239, 1) 56%);
      color: transparent;
      background-clip: text;
    }

    .home-title-svg {
      .pcRem(width, 532);
      .pcPadding(80, 0, 28);
    }

    .home-title-description {
      .pcRem(font-size, 24);
      line-height: 32px;
      .pcMargin(20, auto, 10);
      > span {
        color: #1476ff;
      }
    }
    .home-title-description1 {
      color: rgba(128, 128, 128, 1);
      .pcRem(font-size, 18);
      .pcRem(margin-bottom, 32);
      font-weight: 300;
      line-height: 28px;
    }
    .link-button:hover .home-title-arrow-icon {
      animation: arrow 1s linear infinite;
    }
    @keyframes arrow {
      0% {
        transform: translate(0);
      }

      50% {
        transform: translate(8px);
      }
      100% {
        transform: translate(0);
      }
    }
    .link-button {
      gap: 8px;
    }

    @media screen and (max-width: @break-point) {
      text-align: center;

      .home-title-svg {
        width: 280px;
        .mobilePadding(60, 0, 14);
      }

      .home-title {
        font-size: 20px;
      }

      .home-title-description {
        font-size: 16px;
        line-height: 20px;
        margin: 12px 0;
        font-weight: 200;
      }
      .home-title-description1 {
        display: none;
      }
    }
  }

  .btn-container {
    cursor: pointer;
  }

  background: no-repeat bottom url(@/assets/images/home_slogan_bg.webp);
  background-size: 100%;
  .pcPadding(38, 150, 100);

  .home-video-wrap {
    box-sizing: border-box;
    border-radius: 24.03px;
    .home-video-tag {
      margin: 38px 0 10px;
      padding: 6px 18px 6px 18px;
      border-radius: 105px;
      width: fit-content;
      background: rgba(93, 24, 255, 0.1);
      color: rgba(131, 47, 214, 1);
      font-size: 12px;
      line-height: 17px;
    }
    .home-video-content {
      display: flex;
      justify-content: space-between;
      gap: 20px;
      .pcRem(margin-bottom, 20);
      .home-video-item {
        border-radius: 24.03px;
        backdrop-filter: blur(8.8464241027832px);
        background: linear-gradient(229.4deg, rgba(245, 226, 255, 0.3), rgba(229, 239, 255, 0.3) 100%);
        padding: 24px 36px;
        flex: 1;
        h3 {
          font-size: 18px;
          font-weight: 600;
          line-height: 22px;
          .pcRem(margin-bottom, 8);
        }
        span {
          font-size: 16px;
          line-height: 30px;
        }
      }
    }
    .home-video {
      .video {
        width: 100%;
        box-sizing: border-box;
        border: 4px solid rgba(25, 25, 25, 0.6);
        border-radius: 40px;
        box-shadow: 0px 11px 38px 0px rgba(129, 154, 188, 0.36);
        background: rgba(255, 255, 255, 0.3);
        opacity: 0;
        /* 初始位置：从容器底部向上偏移 50px */
        transform: translateY(50px);
        /* 动画过渡：1秒时长，缓入缓出 */
        transition: opacity 1s ease-out, transform 1s ease-out;
      }
      /* 封面渐显动画：添加类后触发 */
      .video--fade-in {
        opacity: 1;
        transform: translateY(0); /* 回到原位置 */
      }
    }
    .home-video-link {
      margin: 32px auto 0;
      width: fit-content;
      display: block;
    }
  }

  // /* 默认隐藏所有控件 */
  .video-player::-webkit-media-controls {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* 悬浮时显示控件 */
  .video-player:hover::-webkit-media-controls {
    opacity: 1;
  }

  @media screen and (max-width: @break-point) {
    .mobilePadding(48);

    .home-title {
      font-size: 18px;
    }

    .home-title-description {
      font-size: 14px;
      line-height: 20px;
    }
    .home-title-description1 {
      font-size: 12px;
      line-height: 18px;
    }
    .home-video-wrap {
      .home-video-tag {
        margin: 32px 0 10px;
      }
      .home-video-content {
        flex-direction: column;
        gap: 20px;

        .pcRem(margin-bottom, 40);
        .home-video-item {
          padding: 16px;
          border-radius: 12px;
          h3 {
            font-size: 16px;
            line-height: 22px;
            .pcRem(margin-bottom, 8);
          }
          span {
            font-size: 14px;
            line-height: 20px;
            color: rgba(89, 89, 89, 1);
          }
        }
      }
      .home-video {
        .video {
          border-radius: 18px;
          margin-top: 12px;
        }
      }
      .home-video-link {
        margin: 20px auto 0;
      }
    }
  }
}
</style>
