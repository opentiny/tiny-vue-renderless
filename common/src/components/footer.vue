<script lang="ts" setup>
import footerInfo from '../config/footer.ts'
import DownSvg from '../assets/arrow-down.svg'
import CodeInner from '../assets/code-inner.png'
import CodeOpen from '../assets/code-open.png'
import { reactive } from 'vue'

const envName = import.meta.env.VITE_EnvName
// 底部二维码
const barcodeUrl = envName === 'open' ? CodeOpen : CodeInner
const footerData = footerInfo[envName]

const state = reactive({
  footerData
})
let currentLink: any
function toggleLink(link: any) {
  if (link === currentLink) {
    currentLink.current = !currentLink.current
  } else {
    if (currentLink) {
      currentLink.current = false
    }

    link.current = true
    currentLink = link
  }
}
</script>

<template>
  <div class="opentiny-design-footer">
    <div class="footer-content">
      <div class="contact">
        <div class="group-code">
          <img :src="barcodeUrl" />
        </div>
        <div>
          <div class="footer-one">联系我们</div>
          <div class="footer-two">扫码加入OpenTiny用户群</div>
        </div>
      </div>

      <div class="links">
        <div v-for="link in state.footerData" :key="link.title" class="link-item" :class="{ current: link.current }">
          <div class="footer-title-container" :class="{ current: link.current }" @click="toggleLink(link)">
            <span class="footer-title">{{ link.title }}</span>
            <img :src="DownSvg" class="icon-arrow" />
          </div>
          <div class="footer-text-list" :class="{ current: link.current }">
            <a
              v-for="item in link.links"
              :href="item.href"
              :title="item.title"
              target="_blank"
              rel="noopener noreferrer"
              class="list-item"
              >{{ item.title }}</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <p>Copyright © Huawei Technologies Co., Ltd. 2023-2025. All rights reserved.</p>
      <p>粤ICP备2022156931号-1</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.opentiny-design-footer {
  font-size: 16px;
  color: #191919;
  padding: 64px 160px 32px 160px;
  background-color: #fafafa;
  overflow: hidden;

  .footer-content {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 0.5px solid #c2c2c2;

    .contact {
      width: fit-content;

      .group-code {
        > img {
          width: 150px;
          border: solid 0.55vw #f2f6f9;
        }
      }

      .footer-one {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.8;
        text-align: center;
      }

      .footer-two {
        font-size: 14px;
        line-height: 1.5;
        color: #808080;
        margin-bottom: 32px;
      }
    }

    .links {
      display: flex;
      justify-content: space-around;
      width: 60%;

      .link-item {
        margin-right: 10px;
        .list-item {
          width: 100%;
          display: block;
          text-decoration: none;
          color: #808080;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          &:hover {
            color: #2f5bea;
          }
        }
      }
    }
  }

  .footer-text-list {
    font-size: 14px;
    line-height: 39px;
    white-space: nowrap;
  }

  .footer-title {
    display: inline-block;
    height: 22px;
    line-height: 22px;
    margin-left: 3px;
    font-size: 16px;
    font-weight: 600;
    vertical-align: middle;
  }

  .footer-title-container {
    margin-bottom: 17px;
    display: flex;
    align-items: center;
  }

  .copyright {
    line-height: 22px;
    padding: 16px 0;
    font-size: 14px;
    color: #808080;
    width: 100%;
    display: flex;
    justify-content: space-between;

    p {
      margin: 0;
    }
  }
}

.footer-promotional-container {
  margin: 10px 0;
  padding-left: 1.05vw;
}

.footer-logo-link {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  height: 38px;
}

.footer-logo-link-list {
  height: 26px;
  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }

  img {
    height: 100%;
  }
}

.footer-promotional-label {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  white-space: nowrap;
}

.footer-logo-title {
  display: inline-block;
  height: 38px;
  font-size: 21px;
  font-weight: 700;
  color: #242424;
  margin-left: 0.53vw;
}

.footer-logo {
  vertical-align: middle;
  width: 53px;
}

.footer-logo-s {
  vertical-align: middle;
  width: 16px;
}

.footer-logolist-container {
  margin-top: 10px;
}

.footer-logo-list {
  margin-right: 1.46vw;
}

.icon-arrow {
  display: none;
  width: 16px;
  height: 16px;
  transition: all 0.3s ease-out;
  transform-origin: center center;
  margin-left: 16px;
}

@media screen and (max-width: 814px) {
  .opentiny-design-footer {
    padding: 28px 0 24px 0;

    .footer-content {
      flex-direction: column;
      width: 100%;

      .links {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .link-item {
          text-align: center;
          width: 100%;

          .footer-title-container {
            margin: 13px 00 13px 24px;
          }

          .list-item {
            width: 100%;
          }

          div {
            width: 100%;
            text-align: left;
          }

          &:first-child {
            border-top: 1px solid #c2c2c2;
          }
        }
      }

      .contact {
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;

        .group-code {
          margin: 0;
        }

        .footer-logo-s {
          display: none;
        }

        .footer-title {
          font-size: 16px;
          color: #191919;
          line-height: 22px;
        }
      }

      .footer-text-list {
        height: 0;
        overflow: hidden;
        transition: all 0.5s ease-out;
        border-bottom: 0.5px solid #c2c2c2;

        &.current {
          height: fit-content;
          border-bottom: none;
        }

        a {
          padding-left: 24px;
          border-top: 0.5px solid #c2c2c2;
        }
      }

      .footer-title-container {
        margin: 19px 0;
        position: relative;
        text-align: left;

        .icon-arrow {
          display: block;
        }

        &.current {
          .icon-arrow {
            transform: rotate(180deg);
          }
        }
      }
    }

    .copyright {
      display: flex;
      flex-direction: column;
      justify-content: start;
      background: transparent;

      p {
        font-size: 14px;
        color: #808080;
        line-height: 22px;
        margin: 0 24px;
      }
    }
  }
}
</style>
<style lang="less">
.dark.dark.dark .opentiny-design-footer {
  color: #b3b3b3;
  background-color: #1a1a1a;

  .footer-content {
    border-bottom-color: #979797;

    .footer-text-list {
      border-bottom-color: #979797;
    }
  }

  .footer-title {
    color: #e6e6e6;
  }
}
</style>
