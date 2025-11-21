<script setup>
import { CONTRIBUTORS } from './config'
import { i18n } from '@/i18n'
const t = i18n.global.t
</script>

<template>
  <div class="home-contributor">
    <div class="contributor-box">
      <div class="title">{{ t('home.contributor') }}</div>
      <div class="sub-title">{{ t('home.contributorSub') }}</div>
      <ul class="contributor-list">
        <li v-for="contributor in CONTRIBUTORS" :key="contributor">
          <a :href="contributor.homepage">
            <img :src="contributor.avatar" alt="" class="avatar" loading="lazy" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';

.home-contributor {
  background: #f5f5f5;
  .pcPadding(80, 60);
}

.contributor-box {
  max-width: 1600px;
  margin: 0 auto;

  .title {
    .pcRem(margin-top, 40);
  }

  .sub-title {
    .pcRem(margin-bottom, 80);
  }
}

.contributor-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;

  li {
    margin: 0 8px 30px 0;

    a {
      text-decoration: none;
    }

    img {
      border-radius: 50%;
      width: 42px;
      height: 42px;
    }
  }

  @media screen and (max-width: @break-point) {
    justify-content: center;

    li {
      margin-bottom: 20px;

      img {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
