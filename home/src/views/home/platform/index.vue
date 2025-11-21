<template>
  <div class="home-platform">
    <div id="PlatForm" class="platform-wrap">
      <div class="title">{{ $t('platTitle') }}</div>
      <div class="sub-title">开源体系助力Web前端一站式开发</div>
      <div class="plat-tab">
        <template v-if="!isMobile">
          <div class="plat-tab-title">
            <template v-for="(c, idx) in configData" :key="c.title">
              <div class="plat-tab-title-item" @click="selectPlatform(idx)">
                <div class="tab-icon">
                  <img :src="$pub(`images/${c.logo}.svg`)" loading="lazy" />
                </div>
                <div class="tab-desc">
                  <div class="tab-desc-title">
                    {{ c.title }} <TinyTag v-if="c.tag" color="orange" size="small">{{ c.tag }}</TinyTag>
                  </div>
                  <div class="tab-desc-sub-title" v-if="!isMobile">{{ c.desc }}</div>
                </div>
                <div class="platform-tab-line" :class="{ active: platformActive === idx }"></div>
              </div>
            </template>
          </div>
          <div class="plat-content" v-for="(item, idx) in configData" :key="item.title" v-show="idx === platformActive">
            <component v-if="item.component" :is="item.component" />
            <div v-else>
              <div class="plat-tool-desc" v-show="idx === platformActive">
                <div class="tool-title">{{ item.mark }}</div>
                <a class="tool-btn" :href="item.docUrl">
                  <tiny-button ghost :size="isMobile ? '' : 'medium'">
                    {{ $t('useButton') }}
                  </tiny-button>
                </a>
              </div>

              <div v-if="!isMobile" class="iframe">
                <div class="plat-demo" v-if="idx === platformActive">
                  <div :id="`showcontent${idx}`" class="demo-iframe">
                    <img :src="$pub(`images/platform/${item.mobileImg}`)" alt="pro" loading="lazy" />
                  </div>
                  <div v-if="item.code" class="theme-dark demo-code">
                    <div class="demo-code-head">
                      <div class="error"></div>
                      <div class="warning"></div>
                      <div class="success"></div>
                    </div>
                    <pre
                      class="demo-code-content language-js line-numbers"
                    ><code class="language-js">{{ item.code }}</code></pre>
                  </div>
                </div>
              </div>
              <div v-else class="plat-demo-img">
                <img :src="$pub(`images/platform/${item.mobileImg}`)" loading="lazy" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="plat-mobile-wrap">
            <div v-for="(c, idx) in configData" :key="c.title">
              <img :src="$pub(`images/${c.logo}.svg`)" loading="lazy" />
              <div class="tab-desc">
                <div class="tab-desc-title">{{ c.title }}</div>
                <div class="tab-desc-sub-title">{{ c.desc }}</div>
              </div>
              <a class="tool-btn" :href="c.docUrl">
                <img :src="$pub(`images/platform/jump.svg`)" loading="lazy" />
              </a>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { nextTick, ref, onMounted } from 'vue'
import { TinyButton, TinyTag } from '@opentiny/vue'
import { platformList } from './config'
import useWindowSize from '@/tools/useWindowSize.js'
const { isMobile } = useWindowSize()

// tab页的配置项
const platformActive = ref(0)
const configData = ref(platformList)
const isShow = ref(true)

function hightlight() {
  // 每次都要更新一下代码高亮
  nextTick(() => window.Prism.highlightAll())
}
function selectPlatform(name) {
  isShow.value = true
  platformActive.value = name
  hightlight()
}

onMounted(() => {
  selectPlatform(0)
})
</script>
<style lang="less" scoped>
@import '@/mixin.less';

.home-platform {
  background: linear-gradient(0deg, rgb(245, 246, 249), rgb(255, 255, 255));
  line-height: 1.5;
  .pcPadding(100, 150);

  .platform-wrap {
    max-width: 1600px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .plat-content {
    height: 685px;
    display: flex;
    align-items: center;
  }

  .plat-tab {
    margin: 0 auto;
    .pcRem(margin-top, 100);
  }

  .plat-tab-title {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-content: center;
    border-bottom: 1px solid #e9edfa;
  }

  .plat-tab-title-item {
    display: flex;
    width: fit-content;
    gap: 16px;
    padding-bottom: 28px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
  }

  .tab-icon {
    width: 40px;

    img {
      width: 40px;
    }
  }

  .tab-desc-title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    color: #191919;
  }

  .tab-desc-sub-title {
    text-align: left;
    font-size: 12px;
    color: #595959;
    margin-top: 4px;
  }

  .platform-tab-line {
    width: 120%;
    position: absolute;
    height: 2px;
    border-radius: 6px;
    bottom: -1px;
    z-index: 1;
    left: 50%;
    transform: translateX(-50%);

    &.active {
      background: #191919;
    }
  }

  .plat-tool-desc {
    display: flex;
    gap: 32px;
    align-items: center;
    .pcMargin(48, 0, 32);
  }

  .tool-title {
    font-size: 0.32rem;
    color: #191919;
    font-weight: bold;
  }

  .plat-demo {
    display: flex;
    gap: 0.18rem;

    .demo-iframe,
    .demo-code {
      box-shadow: 0px 1px 35px 0px rgba(160, 171, 231, 0.35), 0px 1px 3px 0px #fff inset;
      border-radius: 24px;
      overflow: hidden;
    }

    .demo-iframe {
      flex: 1 1 auto;
      min-height: 480px;
      max-width: 864px;

      img {
        width: 100%;
        display: block;
      }
    }
  }

  .demo-code {
    width: 5.7rem;
    max-width: 456px;
    height: 480px;
    background: #000;
    display: flex;
    flex-direction: column;

    .demo-code-head {
      height: 0.54rem;
      display: flex;
      align-items: center;
      padding: 0 0.15rem;
      gap: 0.15rem;

      & > div {
        width: 0.16rem;
        height: 0.16rem;
        border-radius: 50%;

        &.error {
          background: #ee343f;
        }

        &.warning {
          background: #ffbe0c;
        }

        &.success {
          background: #1aa058;
        }
      }
    }

    pre {
      flex: 1 1 auto;
      border-radius: 0 0 0.16rem 0.16rem;
      margin: 0;
      font-size: 14px;
    }
  }

  .iframe {
    position: relative;
    width: 100%;
    height: 100%;

    .tiny-loading {
      border-radius: 16px;
      overflow: hidden;

      svg.circular {
        height: 24px;
        width: 24px;
      }
    }
  }

  .circle {
    width: 30px;
    height: 30px;
    border: 2px solid #5e7ce0;
    border-radius: 50%;
    border-right-color: transparent;
    animation: progress 1s infinite linear;
    margin-bottom: 5px;
  }

  @keyframes progress {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }
  @media screen and (max-width: 1540px) {
    .tab-desc-title {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 1455px) {
    .tab-icon {
      display: none;
    }
  }
  @media screen and (max-width: 1365px) {
    .demo-code {
      width: 4.5rem;
    }

    .demo-code-content {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 1279px) {
    .demo-code {
      display: none;
    }

    .plat-demo .demo-iframe {
      max-width: 100%;
    }
  }

  @media screen and (max-width: @break-point) {
    .mobilePadding(32, 48);
    background: #fff;

    .plat-tab-title {
      justify-content: center;
    }

    .tab-desc-title {
      font-size: 14px;
    }

    .tab-desc-sub-title {
      font-size: 12px;
    }

    .tab-icon {
      width: 28px;
      display: none;
    }

    .tool-title {
      font-size: 20px;
      color: #191919;
    }

    .demo-code {
      display: none;
    }

    .plat-content {
      display: flex;
      margin-top: 32px;
      padding: 0 24px;
      gap: 24px;
      height: auto;
    }

    .plat-demo-img {
      img {
        width: 100%;
      }
    }

    .plat-tool-desc {
      flex-wrap: wrap;
      gap: 16px;
      align-content: center;
      min-width: 180px;
    }

    .plat-tab-title-item {
      padding-bottom: 16px;
    }
  }

  .plat-mobile-wrap {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    & > div {
      display: grid;
      grid-template-columns: 64px auto 18px;
      align-items: center;
      padding: 24px;
      border-radius: 8px;
      background: rgba(247, 248, 250, 1);
    }
  }

  @media screen and (max-width: 600px) {
    .plat-content {
      flex-wrap: wrap;
    }
  }
}
</style>
