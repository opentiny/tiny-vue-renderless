<script setup>
import ScollCardList from '../common/ScollCardList.vue'
import { activityList } from './config'
</script>
<template>
  <div class="home-activity">
    <div class="title">
      {{ $t('home.activityTitle') }}
    </div>
    <div class="home-activity-desc sub-title">
      {{ $t('home.activitySub') }}
    </div>
    <scoll-card-list :list="activityList" title-key="titleCN">
      <template v-slot="{ data }">
        <div class="activity-item-desc" :title="data.descCN">{{ data.descCN }}</div>
      </template>
    </scoll-card-list>
  </div>
</template>

<style scoped lang="less">
@import '@/mixin.less';
.home-activity {
  .pcPadding(80, 60);
  margin: 0 auto;
  line-height: 1.5;
  width: 100%;
  overflow: hidden;

  .sub-title {
    .pcRem(margin-bottom, 60);
  }

  :deep(.common-card) {
    height: 458px;
  }
  :deep(.common-card-body) {
    background: rgb(250, 250, 250);
    height: 100%;

    .activity-item-desc {
      font-size: 14px;
      display: -webkit-box;
      overflow: hidden;
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    .tiny-button {
      position: absolute;
      bottom: 32px;
    }
  }

  @media screen and (max-width: @break-point) {
    .sub-title {
      margin-bottom: 32px;
      padding: 0 32px;
    }
    :deep(.common-card) {
      height: 400px;
    }
  }
}
</style>
