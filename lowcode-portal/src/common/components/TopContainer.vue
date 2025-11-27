<template>
  <div class="top-container">
    <div class="top-container-wrap">
      <div class="top-container-title">
        <div class="title">应用中心</div>
        <div class="sub-title">{{ subTitle }}</div>
      </div>
      <div v-if="showBtn" class="top-container-button">
        <tiny-button size="small" type="primary" :icon="IconPlusCircle" @click="$emit('create')">{{
          buttonText
        }}</tiny-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { Button } from '@opentiny/vue'
import { IconPlusCircle } from '@opentiny/vue-icon'

export default {
  components: {
    TinyButton: Button
  },
  props: {
    buttonText: {
      type: String,
      default: '创建应用'
    },
    userName: {
      type: String,
      default: 'Tiny'
    },
    subTitle: {
      type: String,
      default: '您可以从这里开始创建应用～'
    },
    showBtn: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {
      IconPlusCircle: IconPlusCircle()
    }
  }
}
</script>

<style lang="less" scoped>
.top-container {
  width: 100%;
  height: 250px;
  background-image: url('../../assets/applicationBanner.jpg');
  .top-container-wrap {
    max-width: 1220px;
    margin: 0 auto;
    height: 100%;
    padding: 0 24px;
    .top-container-title {
      padding-top: 60px;
    }
  }
  .top-container-button {
    .tiny-button {
      height: 32px;
      max-width: none;
      border-color: #526ecc;
      background-color: #526ecc;
      border-radius: 2px;
      font-size: 16px;
      &:hover {
        border-color: #5e7ce0;
        background-color: #5e7ce0;
      }
    }
  }
  .title {
    font-size: 36px;
    color: #191919;
    font-family: 'Microsoft YaHei';
  }
  .sub-title {
    width: 416px;
    font-size: 16px;
    line-height: 22px;
    color: #595959;
    font-family: 'Microsoft YaHei';
    margin-top: 16px;
  }
}
</style>
