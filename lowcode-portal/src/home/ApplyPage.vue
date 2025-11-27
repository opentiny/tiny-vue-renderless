<template>
  <div class="apply-page">
    <div class="apply-list">
      <apply-add-to-team v-if="!state.showAddStatus"></apply-add-to-team>
      <create-status
        v-if="state.showAddStatus"
        subTitle="您的信息已提交，稍后会有工作人员与您联系。"
        rightButtonText="返回首页"
        :showTwoBtn="false"
        class="create-status"
        @back="back"
      ></create-status>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import CreateStatus from '../common/components/CreateStatus.vue'
import ApplyAddToTeam from './ApplyAddToTeam.vue'

export default {
  components: {
    CreateStatus,
    ApplyAddToTeam
  },
  setup() {
    const router = useRouter()

    const state = reactive({
      showApplyStatus: false,
      showAddStatus: false
    })

    const back = () => {
      router.push('/home')
    }

    return {
      state,
      back
    }
  }
}
</script>

<style lang="less" scoped>
.apply-page {
  height: 100%;
  width: 100%;
  background: #f2f5fc;
  display: flex;
  justify-content: space-around;
  .apply-list {
    width: 100%;
    padding: 30px;
    margin: 20px;
    background: #fff;
    border-radius: 8px;
  }
  .create-status {
    width: auto;
  }
  :deep(.tiny-form-item__label) {
    padding-right: 12px;
  }
  :deep(.title-wrap) {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 18px;
      font-weight: bold;
      color: #252b3a;
      margin-bottom: 10px;
    }
    .des {
      font-size: 12px;
      color: #adb0b8;
      font-family: 'Microsoft YaHei';
      margin-top: 4px;
    }
  }
  :deep(.create-form) {
    width: 540px;
    margin: 40px auto 0;
    .tiny-form-item.tiny-form-item--small {
      margin-bottom: 24px;
    }
  }

  :deep(.create-confirm) {
    height: 32px;
    line-height: 32px;
    padding: 0 20px;
    margin-top: 36px;
    max-width: none;
  }
}
</style>
