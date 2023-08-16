<template>
  <div class="demo-box">
    <h1 class="demo-titile">Vue3</h1>
    <div class="demo-container">
      <config-provider :design="design">
        <PcView></PcView>
      </config-provider>
      <MobileView></MobileView>
      <WatchView></WatchView>
    </div>
  </div>
</template>

<script setup>
import ConfigProvider from '@opentiny/vue-config-provider'
import { alert } from '@opentiny/vue-modal'
import PcView from './views/pc.vue'
import MobileView from './views/mobile.vue'
import WatchView from './views/watch.vue'

const design = {
  name: 'custom-design', // 自定义规范名称
  version: '1.0.0', // 自定义规范版本号
  components: {
    Button: {
      /**
       *
       * @param {object} props 传递给组件的属性
       * @param {object} hooks vue或者composition-api的hooks
       * @param {object} utils OpenTiny封装的工具对象
       * @param {object} api 组件的状态state和方法的集合
       * @param {object} extendOptions 额外参数
       */
      renderless: (props, hooks, { emit }, api, { framework }) => {
        return {
          // 自定义覆盖button组件的点击事件行为
          handleClick(event) {
            console.log(
              console.log(`${framework}框架代码已触发！！！！！！！！！`)
            )
            alert('自定义交互逻辑')
            emit('click', event)
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.demo-box {
  position: relative;
  overflow: hidden;

  .demo-titile {
    width: 80px;
    line-height: 36px;
    margin: 0;
    font-size: 24px;
    padding: 0 5px;
    background: #999;
    text-align: center;
    color: #fefefe;
    position: absolute;
    left: 0;
    top: 0;
  }

  .mode-title {
    width: 100px;
    border-radius: 5px;
    line-height: 36px;
    font-size: 20px;
    color: #fefefe;
    background: #bbb;
    text-align: center;
    margin: 0 auto;
  }

  .demo-container {
    display: flex;
    margin-top: 20px;

    & > div {
      width: 33.3333%;
      h2 {
        text-align: center;
        margin-bottom: 40px;
      }
    }

    .tiny-countdown {
      font-size: 40px;
      text-align: center;
      margin-bottom: 20px;
    }
    .tiny-mobile-countdown {
      font-size: 30px;
      text-align: center;
      margin-bottom: 15px;
    }
    .tiny-watch-countdown {
      font-size: 18px;
      text-align: center;
      color: #fff;
      margin-bottom: 5px;
      margin-top: 5px;
    }

    .tiny-watch-btn {
      display: flex;
      justify-content: center;

      .play-icon {
        fill: #fff;
        font-size: 18px;
      }
    }
    .watch-box {
      text-align: center;
    }
    .btn-box {
      text-align: center;
    }
  }

  .mobile-view-container {
    .tiny-mobile-button {
      margin: 4px;
    }
  }
}
</style>
