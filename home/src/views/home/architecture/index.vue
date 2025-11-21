<template>
  <div class="home-architecture">
    <div>
      <div class="title">如何实现应用智能化?</div>
      <div class="sub-title">将应用的功能转成 Agent 智能体可以调用的 MCP 工具</div>
      <div class="archi-content">
        <div class="archi-content-core">
          <component :is="renderLogo(core.icon, core.title)" />
          <div>{{ core.content }}</div>
          <img :src="core.img" @click="showZoom = true" />
          <div v-if="showZoom" class="zoom-overlay" @click="showZoom = false">
            <img :src="core.img" alt="放大预览" class="zoom-preview-img" />
          </div>
        </div>
        <div class="archi-content-steps">
          <div class="archi-content-steps-item" v-for="step in steps" :key="step.name">
            <div class="archi-content-steps-item-header">
              <component :is="step.extraImg ? renderLogo(step.extraImg, '整体步骤') : 'span'" />
              <p>
                {{ step.step }}
                <img :src="step.icon" />
              </p>
            </div>
            <img :src="step.img" class="archi-content-steps-item-img" />
            <h3>{{ step.name }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
        <div class="archi-content-core archi-content-advance">
          <component :is="renderLogo(advances.icon, advances.title)" />
          <div class="archi-content-advance-wrap">
            <div class="archi-content-advance-item" v-for="advance in advances.content" :key="advance.title">
              <p>
                <img :src="advance.icon" />
                {{ advance.title }}
              </p>
              <div>
                {{ advance.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
import { onMounted, onUnmounted, ref } from 'vue'
import { advances, core, steps } from './config'
const showZoom = ref(false)

const renderLogo = (icon, content) => {
  return (
    <div className="home-logo">
      <img src={icon} />
      {content}
    </div>
  )
}

const handleEscKey = (e) => {
  if (e.key === 'Escape' && showZoom.value) {
    showZoom.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscKey)
})
</script>

<style scoped lang="less">
@import '@/mixin.less';

.home-architecture {
  .pcPadding(100, 150);
  background: rgba(223, 236, 255, 0.25);
  font-size: 14px;

  & > div {
    max-width: 1600px;
    margin: 0 auto;
  }
  .title {
    background: linear-gradient(90deg, rgba(203, 67, 168, 1), rgba(44, 95, 239, 1) 56%);
    width: fit-content;
    color: transparent;
    background-clip: text;
    margin: 0 auto 16px;
  }

  .archi-content {
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    gap: 16px;
    color: rgba(89, 89, 89, 1);
    line-height: 24px;

    .archi-content-core {
      background-color: #fff;
      border: 1px solid rgba(240, 240, 240, 1);
      border-radius: 20px;
      padding: 24px 32px 12px 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;

      & > img {
        width: 100%;
        transition: transform 0.3s ease;
      }
      & > img:hover {
        transform: scale(1.01);
      }
      .zoom-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease;
      }

      /* 放大后的图片：自适应屏幕，点击可关闭 */
      .zoom-preview-img {
        max-width: 95vw;
        max-height: 95vh;
        object-fit: contain;
        transition: transform 0.3s ease;
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        cursor: pointer;
        border-radius: 30px;
        padding: 10px;
        background-color: #fff;
      }
      /* 淡入动画 */
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }

    .archi-content-steps {
      grid-row: span 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      .archi-content-steps-item {
        white-space: pre-line;
        padding: 26px 32px;
        border: 1px solid rgba(240, 240, 240, 1);
        border-radius: 20px;
        background: linear-gradient(37.46deg, rgba(255, 255, 255, 1), rgba(216, 239, 255, 0.5) 100%);
        .archi-content-steps-item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 32px;
          > p {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            color: rgba(242, 48, 48, 1);
            line-height: 17px;
            border: 1px solid rgba(255, 224, 194, 1);
            border-radius: 110px;
            background: rgba(255, 244, 235, 1);
            padding: 4px 16px 4px 16px;
            font-size: 12px;
          }
        }
        > h3 {
          font-size: 16px;
          font-weight: 600;
          line-height: 22px;
          color: #191919;
          margin: 24px 0 16px;
        }
        .archi-content-steps-item-img {
          width: 100%;
        }
      }
    }
    .archi-content-advance {
      gap: 70px;
      .archi-content-advance-wrap {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px 30px;
        .archi-content-advance-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          line-height: 28px;
          > p {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 16px;
            font-weight: 600;
            line-height: 22px;
            color: #191919;
          }
        }
      }
    }
  }
  .home-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: rgba(20, 118, 255, 1);
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    box-sizing: border-box;
    border: 1px solid rgba(20, 118, 255, 0.3);
    border-radius: 110px;
    background: rgba(20, 118, 255, 0.1);
    padding: 4px 16px 4px 16px;
    width: fit-content;
  }
  .home-step {
  }
  @media screen and (max-width: @break-point) {
    .mobilePadding(32, 48);
    .title {
      margin: 0 auto 8px;
    }
    .archi-content {
      grid-template-columns: 1fr;
      margin-top: 30px;
      grid-template-rows: auto;

      .archi-content-steps {
        grid-row: span 1;
        display: grid;
        grid-template-columns: 1fr;
        .archi-content-steps-item {
          .archi-content-steps-item-header {
            margin-bottom: 0;
          }
        }
      }
      .archi-content-advance {
        gap: 27px;
        .archi-content-advance-wrap {
          grid-template-columns: 1fr;
          gap: 22px;
        }
      }
    }
  }
}
</style>
