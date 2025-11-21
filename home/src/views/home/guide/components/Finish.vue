<template>
  <div class="step-five">
    <div class="step-five-content">
      <div class="step-five-content-top">
        <img :src="IntegratedGuide4" alt="" />
        <span> OK,完成啦~就这么简单~ </span>
        <span> 快去试试吧 </span>
        <!-- <tiny-button class="to-use" type="primary" round @click="goToGuide">立即使用</tiny-button> -->
      </div>
      <div class="step-five-content-bottom">
        <span>我们即将推出专属 SDK，敬请等待</span>
        <img :src="IntegratedGuide3" alt=""></img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TinyButton } from '@opentiny/vue'
import IntegratedGuide3 from '@/assets/images/integrated-guide-3.png'
import IntegratedGuide4 from '@/assets/images/integrated-guide-4.svg'
import { nextSdkGuideUrl } from '../config'

function goToGuide() {
  window.open(nextSdkGuideUrl, '_blank', 'noopener')
}
</script>

<style lang="less" scoped>
@import '@/mixin.less';

.step-five {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  &-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;

    &-top {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 600;
      .pcRem(font-size, 16);
      .pcRem(line-height, 36);

      img {
       width: 70px;
      }

      &::after {
        content: '';
        width: 100%;
        border: 1px dashed rgb(219, 219, 219);
        .pcMargin(36, 0, 27, 0)
      }

      .to-use {
        .pcRem(margin-top, 10);
      }
    }

    &-bottom {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 400;
      .pcRem(margin-top, 42);
      .pcRem(font-size, 16);
      .pcRem(line-height, 22);

      img {
        .pcRem(margin-top, 27);
      }
    }
  }
  @media screen and (max-width: @break-point) {
    &-content {
      &-top {
        font-size: 14px;
        line-height: 20px;
      }
      img {
      width: 50px;
      }
      &-bottom {
        font-size: 14px;
        line-height: 20px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
