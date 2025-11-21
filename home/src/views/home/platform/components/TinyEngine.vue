<template>
  <div :class="{
    'platform-engine': true,
    'platform-engine__mobile': isMobile
  }">
    <div class="content">
      <div class="title">
        一句话搭建你的 AI 应用
      </div>
      <div v-if="!isMobile" class="descriptions">
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div>自然语言 / 图片秒生成页面代码，可视化手动改、AI 接着改都灵活</div>
        </div>
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div>模型任选不受限，多模态大模型轻松适配</div>
        </div>
        <div class="description">
          <img :src="$pub('images/platform/engine_1.svg')" alt=""></img>
          <div class="line">
            <div>集成 TinyEngine MCP 工具，AI 对话直调内置能力，</div>
            <div>自定义工具还能扩 AI 边界</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div v-if="!isMobile" class="wait">智能化版本敬请期待...</div>
        <div class="operation">
          <tiny-button class="button" @click="onTinyEngine">即刻体验</tiny-button>
          <tiny-link class="link" @click="onLinkClick">
            <template #icon>
              <TinyIconFilletExternalLink></TinyIconFilletExternalLink>
            </template>
            查看文档
          </tiny-link>
        </div>
      </div>
    </div>
    <img :src="$pub(`images/platform/engine.png`)"></img>
  </div>
</template>

<script setup>
import { TinyButton, TinyLink } from '@opentiny/vue';
import { iconFilletExternalLink } from '@opentiny/vue-icon'
import useWindowSize from '@/tools/useWindowSize.js'

const TinyIconFilletExternalLink = iconFilletExternalLink()
const { isMobile } = useWindowSize()

const onTinyEngine = () => {
  window.open('/tiny-engine#/home', '_blank', 'noopener,noreferrer')
}

const onLinkClick = () => {
  window.open('/tiny-engine#/help-center/course/engine/introduction')
}
</script>

<style lang="less" scoped>
@import '@/mixin.less';

.platform-engine {
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
      .pcRem(margin-bottom, 43);
    }

    .descriptions {
      display: flex;
      flex-direction: column;
      font-weight: 400;
      .pcRem(gap, 40);
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
      .pcRem(margin-left, 28);

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
  .platform-engine .content .title {
    font-size: 20px;
    color: #191919;
  }
}
</style>
