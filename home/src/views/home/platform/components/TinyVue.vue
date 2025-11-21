<template>
  <div :class="{
    'platform-vue': true,
    'platform-vue__mobile': isMobile
  }">
    <div class="content">
      <div class="title">
        智能组件 128+ 开箱即用
      </div>
      <div v-if="!isMobile" class="descriptions">
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div>跨端、跨框架，支持自定义主题和交互逻辑</div>
        </div>
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div>丰富的组件MCP工具</div>
        </div>
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div>
            支持配置业务逻辑，精确操作Web应用
          </div>
        </div>
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div>
            支持 AI 对话框、MCP Host 和智能体搭建平台
          </div>
        </div>
      </div>
      <div class="footer">
        <div v-if="!isMobile" class="sub-description">
          使用 TinyVue 智能组件库搭建出来的 Web 应用天然是AI友好的、可被AI操控的智能 Web 应用。
        </div>
        <div class="operation">
          <tiny-button class="button" @click="onTinyVue">即刻体验</tiny-button>
        </div>
      </div>
    </div>
    <img :src="$pub(`images/platform/vue.svg`)"></img>
  </div>
</template>

<script setup>
import { TinyButton } from '@opentiny/vue';
import useWindowSize from '@/tools/useWindowSize.js'

const { isMobile } = useWindowSize()

const onTinyVue = () => {
  window.open('/tiny-vue', '_blank', 'noopener,noreferrer')
}
</script>

<style lang="less" scoped>
@import '@/mixin.less';

.platform-vue {
  display: flex;
  align-items: center;
  .pcRem(padding-top, 60);

  .content {
    .pcRem(width, 616);
    .pcRem(margin-right, 50);

    .title {
      font-weight: bold;
      letter-spacing: 1px;
      text-align: left;
      .pcRem(font-size, 32);
      .pcRem(line-height, 45);
      .pcRem(margin-bottom, 46);
    }

    .descriptions {
      display: flex;
      flex-direction: column;
      font-weight: 400;
      .pcRem(gap, 15);
      .pcRem(font-size, 16);
      .pcRem(line-height, 29);
      .pcRem(padding-bottom, 25);

      .description {
        display: flex;
        align-items: flex-start;

        img {
          .pcRem(margin-right, 8);
          .pcRem(margin-top, 4);
        }
      }
    }

    .footer {
      color: rgb(89, 89, 89);
      font-weight: 400;
      .pcRem(font-size, 16);
      .pcRem(line-height, 36);

      .sub-description {
        .pcRem(margin-bottom, 15);
      }

      .wait {
        color: rgb(20, 118, 255);
        font-weight: 400;
        .pcRem(font-size, 16);
        .pcRem(line-height, 22);
        .pcMargin(25, 0, 20, 0);
      }

      .operation {
        .button {
          .pcRem(margin-right, 16);
        }
      }
    }
  }


  &>img {
    width: 50%;
    height: 50%;
  }


  &__mobile {
    flex-direction: column;
    align-items: baseline;


  }

  &__mobile {
    flex-direction: column;
    align-items: baseline;

    .content {
      width: 100% !important;

      .footer {
        .pcMargin(90, 0, 32)
      }
    }

    &>img {
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (max-width: 814px) {
  .platform-vue .content .title {
    font-size: 20px;
    color: #191919;
  }
}
</style>
