<template>
  <div class="why-opentiny">
    <div>
      <div class="title">为什么选择 OpenTiny NEXT？</div>
      <div class="sub-title">是现阶段前端应用快速智能化改造的最佳方案</div>
      <div class="why-opentiny-content">
        <div class="why-opentiny-content-item" v-for="(card, idx) in data" :key="card.title">
          <component :is="renderLogo(card.tag.icon, card.tag.title, idx)" />
          <h2 :class="`content-item-title-${idx}`">
            {{ isMobile && card.mobileTitle ? card.mobileTitle : card.title }}
          </h2>
          <span>{{ card.description }}</span>

          <div :class="['item-advances', `item-advances-${idx}`]">
            <div class="item-advance" v-for="advance in card.advances" :key="advance.title">
              <div :class="['advance-header', `advance-header-${idx}`]">
                <img :src="advance.icon" loading="lazy" />
                <strong>{{ advance.title }}</strong>
              </div>
              <div :class="['advance-description', `advance-description-${idx}`]">
                {{ advance.description }}
              </div>
            </div>
            <img :class="[`item-advance-img-${idx}`]" v-if="card.img" :src="card.img" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="jsx">
import useWindowSize from '@/tools/useWindowSize.js'
import { data } from './config'

const { isMobile } = useWindowSize()

const renderLogo = (icon, content, idx) => {
  return (
    <div className={`home-logo home-logo-${idx}`}>
      <img src={icon} />
      {content}
    </div>
  )
}
</script>

<style scoped lang="less">
@import '@/mixin.less';
.why-opentiny {
  .pcPadding(100, 150);
  background: linear-gradient(0deg, rgba(245, 246, 249, 0.8), rgba(255, 255, 255, 1) 100%), rgba(223, 236, 255, 0.1);
  & > div {
    max-width: 1600px;
    margin: 0 auto;
  }
  .why-opentiny-content {
    margin-top: 60px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 30px;
    .why-opentiny-content-item {
      position: relative;
      border-radius: 20px;
      background: linear-gradient(180.58deg, rgba(241, 245, 254, 1), rgba(255, 255, 255, 1) 100%);
      padding: 32px 40px 24px 40px;
      > h2 {
        font-size: 20px;
        font-weight: 600;
        line-height: 36px;
        margin-top: 24px;
      }
      .content-item-title-1 {
        font-size: 24px;
        background: linear-gradient(90deg, rgba(203, 67, 168, 1), rgba(44, 95, 239, 1) 56%);
        background-clip: text;
        color: transparent;
        font-size: 24px;
      }
      > span {
        color: rgba(89, 89, 89, 1);
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
      }
      .item-advances {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        font-size: 14px;
        .item-advance {
          .advance-header {
            display: flex;
            align-items: center;
            gap: 4px;
            line-height: 38px;
            > strong {
              font-weight: 600;
            }
          }
          .advance-header-1 {
            > strong {
              color: rgba(20, 118, 255, 1);
            }
          }
          .advance-description {
            font-size: 14px;
            font-weight: 400;
            color: rgba(89, 89, 89, 1);
            line-height: 22px;
          }
          .advance-description-1 {
            margin-right: 330px;
            max-width: 320px;
          }
        }
        > img {
          object-fit: contain;
        }
        .item-advance-img-0 {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 252px;
          height: 288px;
        }
        .item-advance-img-1 {
          position: absolute;
          right: 0;
          bottom: -40px;
          width: 412px;
          height: 488px;
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
  .home-logo-1 {
    border: 1px solid rgba(181, 14, 101, 0.3);
    background: rgba(181, 14, 101, 0.1);
    color: rgba(181, 14, 101, 1);
  }

  @media screen and (max-width: 1570px) {
    .advance-description-1 {
      margin-right: 220px !important;
    }
    .item-advance-img-1 {
      width: 300px !important;
    }
  }
  @media screen and (max-width: 1300px) {
    .advance-description-1 {
      margin-right: 160px !important;
    }
    .item-advance-img-1 {
      width: 242px !important;
    }
  }
  @media screen and (max-width: @break-point) {
    .mobilePadding(32, 48);
    .why-opentiny-content {
      margin-top: 30px;
      grid-template-columns: 1fr;
      gap: 30px;
      .why-opentiny-content-item {
        position: relative;
        border-radius: 20px;
        background: linear-gradient(180.58deg, rgba(241, 245, 254, 1), rgba(255, 255, 255, 1) 100%);
        padding: 32px 40px 24px 40px;
        > h2 {
          font-size: 16px;
          margin-top: 20px;
        }
        .content-item-title-1 {
          font-size: 16px;
        }
        > span {
          color: rgba(89, 89, 89, 1);
          font-size: 14px;
          line-height: 26px;
        }
        .item-advances {
          margin-top: 20px;
          gap: 12px;
          font-size: 14px;
          .item-advance {
            .advance-header {
              display: flex;
              align-items: center;
              gap: 4px;
              line-height: 38px;
              > strong {
                font-weight: 600;
              }
            }
            .advance-description {
              font-size: 14px;
              font-weight: 400;
              color: rgba(89, 89, 89, 1);
              line-height: 22px;
            }
            .advance-description-1 {
              margin-right: 0px;
              max-width: 320px;
            }
          }
          > img {
            object-fit: contain;
          }
          .item-advance-img-0 {
            display: none;
          }
          .item-advance-img-1 {
            display: none;
          }
        }
      }
    }
  }
}
</style>
