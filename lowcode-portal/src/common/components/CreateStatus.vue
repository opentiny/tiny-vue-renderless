<template>
  <div class="home-status">
    <div v-if="status" class="home-status-icon success">
      <icon-yes></icon-yes>
    </div>
    <div v-else class="home-status-icon fail">
      <icon-close></icon-close>
    </div>
    <div class="home-status-title">{{ state.title }}</div>
    <div class="home-status-sub-title">{{ subTitle }}</div>
    <div v-if="status" class="home-status-button">
      <tiny-button @click="$emit('create')">{{ buttonText }}</tiny-button>
    </div>
    <div v-else class="home-status-button">
      <tiny-button type="primary" @click="$emit('back')">返回创建流程</tiny-button>
      <tiny-button @click="$emit('help')">查看帮助文档</tiny-button>
    </div>
  </div>
</template>

<script>
import { Button } from '@opentiny/vue'
import { IconClose, IconYes } from '@opentiny/vue-icon'
import { reactive, computed } from 'vue'

export default {
  components: {
    TinyButton: Button,
    IconClose: IconClose(),
    IconYes: IconYes()
  },
  props: {
    status: {
      type: Boolean,
      default: true
    },
    subTitle: {
      type: String,
      default: '您已成功构建物料资产包，继续构建可视化设计器吧'
    },
    buttonText: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const state = reactive({
      title: computed(() => (props.status ? `${props.type}创建成功` : `${props.type}创建失败`))
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.home-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 80px);
  margin: 0 20px 0 20px;
  background-color: #fff;
  box-sizing: border-box;
  padding-top: 173px;

  .home-status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 68px;
    height: 68px;
    border-radius: 50%;

    &.success {
      background: #00b336;
    }

    &.fail {
      background: #e94e4c;
    }

    .tiny-svg {
      width: 32px;
      height: 32px;
      fill: #fff;
    }
  }

  .home-status-title {
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    color: #191919;
    font-weight: 600;
    margin-top: 12px;
    margin-bottom: 8px;
  }

  .home-status-sub-title {
    font-size: 12px;
    font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    color: #595959;
    line-height: 18px;
  }

  .home-status-button {
    margin-top: 20px;
    .tiny-button {
      max-width: none;
    }
  }
}
</style>
