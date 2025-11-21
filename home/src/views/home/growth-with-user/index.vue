<script setup>
import { computed, ref } from 'vue'
import { TinyButton, TinyCarousel, TinyCarouselItem } from '@opentiny/vue'

import { USERS_DATA } from './config.js'
import useWindowSize from '@/tools/useWindowSize.js'
const { isMobile, width } = useWindowSize()


const userList = ref([...USERS_DATA, ...USERS_DATA])

const chunkArr = (arr, size) => {
  if (!arr?.length || size < 1) {
    return []
  }
  let [start, end, result] = [null, null, []]
  for (let i = 0; i < Math.ceil(arr.length / size); i++) {
    start = i * size
    end = start + size
    result.push(arr.slice(start, end))
  }
  return result
}

const mobileUserList = computed(() => chunkArr(USERS_DATA, width.value < 600 ? 1 : 2)) 


// for (let i = 0; i < USERS_DATA.length; i += 3) {
//   userList.value.push([...USERS_DATA.slice(i, i + 3)])
// }
</script>

<template>
  <div class="home-growth-with-user">
    <div class="growth-with-user-box">
      <div class="user-stat">
        <div v-if="!isMobile">
          <img :src="$pub('images/main-logo.svg')" alt="logo" />
        </div>
        <div class="text-slogen mt16">
          <div>和更多<span class="text-bold text-purple ml16">开发者设计师</span></div>
          <div>一起<span class="text-bold">成长</span></div>
          <div>一起<span class="text-bold">创造价值</span></div>
        </div>
        <div class="flex-box">
          <div>
            <div class="text-purple text-num">100+</div>
            <div class="text-desc">贡献者</div>
          </div>
          <div>
            <div class="text-purple text-num">210W+</div>
            <div class="text-desc">总下载量</div>
          </div>
        </div>
        <a href="/tiny-vue">
          <tiny-button v-if="!isMobile" type="primary" size="medium">{{ $t('home.tryBtn') }}</tiny-button>
        </a>
      </div>
      <div v-if="!isMobile" class="user-list-box">
        <div class="user-list-comma">“</div>
        <div class="user-list-card-box">
          <div class="user-list">
            <div class="user-card" v-for="user in userList" :key="user">
              <p class="user-comments">{{ user.comments }}</p>
              <div class="user-card-bottom">
                <span class="user-name">{{ user.name }}</span
                ><span class="user-location">{{ $t('home.from') }}{{ user.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tiny-carousel v-if="isMobile" ref="carouselRef" height="204px" arrow="never" indicator-position="outside">
      <tiny-carousel-item class="carousel-item-demo" v-for="(list, index) in mobileUserList" :key="index">
        <template #default>
          <div class="card-container">
            <div class="user-card" v-for="(user, userIdx) in list" :key="userIdx">
              <p class="user-comments">
                <div class="user-comments-inner">
                {{ user.comments }}
                </div>
                </p>
              <div class="user-card-bottom">
                <span class="user-name">{{ user.name }}</span
                ><span class="user-location">{{ $t('from') }}{{ user.location }}</span>
              </div>
            </div>
          </div>
        </template>
      </tiny-carousel-item>
    </tiny-carousel>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';
.home-growth-with-user {
  .pcPadding(80, 60);
  width: 100%;
  background: linear-gradient(180deg, rgb(166, 181, 255), rgba(196, 196, 196, 0) 100%);
  height: 820px;
  overflow: hidden;

  .user-stat {
    padding-top: 50px;
  }

  .text-slogen {
    color: #191919;
    .pcRem(font-size, 44);
    line-height: 1.5;
  }
  .text-bold {
    font-weight: bold;
  }
  .text-purple {
    color: rgb(94, 89, 247);
  }
  .text-desc {
    color: rgb(89, 89, 89);
    font-size: 24px;
    font-weight: 400;
    line-height: 1.5;
  }
  .text-num {
    .pcRem(font-size, 60);
    font-weight: bold;
    line-height: 1.5;
  }

  .flex-box {
    display: flex;
    .pcRem(margin-top, 91);
    margin-bottom: 38px;
    > div + div {
      .pcRem(margin-left, 100);
    }
  }

  .growth-with-user-box {
    display: flex;
    max-width: 1600px;
    justify-content: space-around;
    margin: 0 auto;
  }

  @keyframes infiniteScroll {
    from {
      margin-top: 0;
    }
    to {
      margin-top: -1641px;
    }
  }
  .user-list-comma {
    font-family: arial;
    position: absolute;
    color: rgb(94, 89, 247);
    font-size: 130px;
    font-weight: 700;
    line-height: 200px;
    letter-spacing: 0px;
    z-index: 10;
    left: -100px;
    top: -80px;
  }
  .user-list-box {
    position: relative;
  }
  .user-list-card-box {
    height: 700px;
    overflow: hidden;
  }

  .user-list {
    .pcRem(width, 660);
    animation: infiniteScroll 30s linear infinite;
    &:hover {
      animation-play-state: paused;
    }
  }

  .user-card {
    flex: 1;
    /* 防止内容溢出列 */
    break-inside: avoid;
    .pcPadding(32, 32);
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 45px 0 rgba(160, 171, 231, 0.15);
    .pcRem(width, 660);
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    .user-card-bottom {
      padding-top: 16px;
      text-align: right;

      .user-name {
        font-size: 14px;
        font-weight: bold;
        color: #191919;
        line-height: 24px;
      }

      .user-location {
        margin-left: 12px;
        color: rgb(89, 89, 89);
        font-size: 14px;
        line-height: 20px;
        line-height: 24px;
      }
    }

    .user-comments {
      font-size: 14px;
      color: rgb(89, 89, 89);
      line-height: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgb(240, 240, 240);
    }
  }

  .user-carousel {
    .tiny-carousel__indicators {
      justify-content: center !important;
    }
  }

  @media screen and (max-width: @break-point) {
    height: auto;
    text-align: center;
    .mobilePadding(32, 48);
    .home-slogen-text {
      font-size: 24px;
    }
    .user-stat {
      padding-top: 0;
    }

    .text-slogen {
      font-size: 24px;
      font-weight: bold;
    }

    .ml16 {
      margin-left: 8px;
    }

    .flex-box {
      margin: 16px;
    }

    .text-desc {
      font-size: 12px;
    }
    .text-num {
      font-size: 24px;
    }

    .card-container {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    .user-card {
      height: 204px;
      max-width: 318px;
      padding: 24px;
    }
    .user-comments-inner {
      font-size: 12px;
      text-align: left;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
    }
    .user-comments {
      height: 116px;
    }
    :deep(.tiny-carousel) {
      margin-top: 14px;
      .tiny-carousel__indicator .tiny-carousel__button {
        background: #c4c4c4;
      }
    }
  }
}
</style>
