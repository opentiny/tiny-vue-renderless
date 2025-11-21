<script setup>
import { TinyButton, TinyLink } from '@opentiny/vue'
import { iconFilletExternalLink } from '@opentiny/vue-icon'
import useWindowSize from '@/tools/useWindowSize.js'

const { isMobile } = useWindowSize()

const TinyIconFilletExternalLink = iconFilletExternalLink()

const onTinyRobot = () => {
  window.open('https://agent.opentiny.design/tiny-robot', '_blank', 'noopener,noreferrer')
}

const onLinkClick = () => {
  window.open('https://docs.opentiny.design/tiny-robot/guide/quick-start.html', '_blank', 'noopener,noreferrer')
}

const cardList = [
  {
    title: '快速实施',
    content: '通过扫码或输入账号快速接入已集成 NEXT SDKS 的 AI 应用'
  },
  {
    title: '搭建敏捷',
    content: '只需几步，轻松构建您的AI产品，并且支持定制多种主题'
  },
  {
    title: '智能操作',
    content: '自动发现与移除 mcp 工具'
  },
  {
    title: '组件丰富',
    content: '提供丰富的AI组件与AI工具'
  }
]
</script>

<template>
  <div
    :class="{
      'platform-engine': true,
      'platform-engine__mobile': isMobile
    }"
  >
    <div class="content">
      <div class="title">马上实现应用智能化</div>
      <div v-if="!isMobile" class="descriptions">
        基于 WebAgent 与 NEXT SDKS 底座，实现同时调用多端，多应用的 AI 产品。
        企业内部也能独立集成TinyRobot，实现应用智能化
      </div>
      <div v-if="!isMobile" class="card-wrap">
        <div class="card" v-for="item in cardList" :key="item.title">
          <img class="card-icon" :src="$pub(`images/platform/icon-airplane.png`)" alt="" />
          <div class="card-title">
            {{ item.title }}
          </div>
          <div class="card-content">
            {{ item.content }}
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="operation">
          <tiny-button class="button" @click="onTinyRobot">即刻体验</tiny-button>
          <tiny-link class="link" @click="onLinkClick">
            <template #icon>
              <TinyIconFilletExternalLink></TinyIconFilletExternalLink>
            </template>
            查看文档
          </tiny-link>
        </div>
      </div>
    </div>
    <img :src="$pub(`images/platform/tiny-robot.png`)" />
  </div>
</template>

<style lang="less" scoped>
@import '@/mixin.less';

.platform-engine {
  display: flex;
  align-items: center;
  .pcRem(padding-top, 60);

  .content {
    .pcRem(width, 616);
    .pcRem(margin-right, 50);

    .card-wrap {
      display: grid;
      gap: 20px;
      grid-template-rows: repeat(2, 1fr);
      grid-template-columns: repeat(2, 1fr);
      .pcRem(margin-top, 26);
    }

    .title {
      font-weight: 600;
      letter-spacing: 1px;
      text-align: left;
      .pcRem(font-size, 32);
      .pcRem(line-height, 45);
    }

    .card {
      background-color: #fff;
      display: flex;
      flex-direction: column;
      .pcRem(padding, 32);
      .pcRem(border-radius, 8);

      &-icon {
        .pcRem(width, 44);
        .pcRem(height, 44);
      }

      &-title {
        color: rgb(25, 25, 25);
        font-weight: 600;
        line-height: 1.5;
        .pcRem(font-size, 16);
        .pcRem(margin-top, 8);
      }

      &-content {
        color: rgb(128, 128, 128);
        line-height: 1.5;
        .pcRem(font-size, 16);
        .pcRem(margin-top, 8);
      }
    }

    .descriptions {
      color: rgb(89, 89, 89);
      line-height: 2;
      .pcRem(font-size, 16);
    }

    .footer {
      .pcRem(margin-top, 30);

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

  & > img {
    width: 50%;
    height: 50%;
  }

  &__mobile {
    flex-direction: column;
    align-items: baseline;

    .content {
      width: 100% !important;

      .footer {
        .pcMargin(90, 0, 32);
      }
    }

    & > img {
      width: 100%;
      height: 100%;
    }
  }
}

@media screen and (max-width: 814px) {
  .platform-engine .content .title {
    font-size: 20px;
    color: #191919;
  }
}
</style>
