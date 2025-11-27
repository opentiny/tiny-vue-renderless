<template>
  <div class="home-create">
    <div class="home-create-timeline-wrap">
      <tiny-time-line
        :data="data"
        :active="state.normalActive"
        :horizontal="true"
        text-position="right"
        class="home-create-timeline"
        @click="normalClick"
      ></tiny-time-line>
    </div>
    <div
      :class="[
        'home-create-content',
        {
          'no-padding':
            (state.normalActive === 0 && state.showEditMaterial) || (state.normalActive === 1 && state.showEditPlatform)
        }
      ]"
    >
      <create-material
        v-if="state.normalActive === 0 && !state.showEditMaterial && !state.showMaterialStatus"
        @confirm="showEdit"
      ></create-material>
      <edit-material v-if="state.normalActive === 0 && state.showEditMaterial" @edit="showStatus"></edit-material>
      <create-status
        v-if="state.normalActive === 0 && state.showMaterialStatus"
        buttonText="创建可视化设计器"
        type="物料资产包"
        @create="state.normalActive = 1"
        @back="showCreate"
      ></create-status>
      <create-platform
        v-if="state.normalActive === 1 && !state.showEditPlatform && !state.showPlatformStatus"
        @confirm="showEdit"
      ></create-platform>
      <edit-platform v-if="state.normalActive === 1 && state.showEditPlatform" @edit="showStatus"></edit-platform>
      <create-status
        v-if="state.normalActive === 1 && state.showPlatformStatus"
        subTitle="您已体验完创建流程，加入组织后，可创建属于自己的设计器；"
        buttonText="加入组织"
        type="设计器"
        @create="state.normalActive = 2"
        @back="openLowCodeEditor"
      ></create-status>
      <div v-if="state.normalActive === 2" class="apply-page">
        <apply-add-to-team v-if="!state.showAddStatus"></apply-add-to-team>
        <create-status
          v-if="state.showAddStatus"
          subTitle="您的信息已提交，稍后会有工作人员与您联系。"
          leftButtonText="可视化搭建"
          class="create-status"
          @create="openLowCodeEditor"
          @back="back"
        ></create-status>
      </div>
    </div>
  </div>
</template>

<script>
import { TimeLine } from '@opentiny/vue'
import { ref, reactive, provide } from 'vue'
import { openLowCodeEditor } from 'lowcode-design-controller/utils'
import CreateStatus from '../common/components/CreateStatus.vue'
import CreatePlatform from './CreatePlatform'
import CreateMaterial from './CreateMaterial'
import EditMaterial from './EditMaterial'
import EditPlatform from './EditPlatform'
import ApplyAddToTeam from './ApplyAddToTeam.vue'

export default {
  components: {
    TinyTimeLine: TimeLine,
    CreatePlatform,
    CreateMaterial,
    EditMaterial,
    CreateStatus,
    EditPlatform,
    ApplyAddToTeam
  },
  setup() {
    provide('isExperienceVersion', ref(true))

    const data = [{ name: '创建物料资产包' }, { name: '创建可视化设计器' }, { name: '申请加入' }]

    const state = reactive({
      normalActive: 0,
      showEditMaterial: false,
      showMaterialStatus: false,
      showEditPlatform: false,
      showPlatformStatus: false,
      showApplyStatus: false,
      showAddStatus: false,
      material: {}
    })

    const showStatus = () => {
      if (state.normalActive === 0) {
        state.showMaterialStatus = true
        state.showEditMaterial = false
      } else if (state.normalActive === 1) {
        state.showPlatformStatus = true
        state.showEditPlatform = false
      }
    }

    const showEdit = (data) => {
      if (state.normalActive === 0) {
        state.showMaterialStatus = false
        state.showEditMaterial = true
        state.material = data
      } else if (state.normalActive === 1) {
        state.showPlatformStatus = false
        state.showEditPlatform = true
      }
    }

    const showCreate = () => {
      state.normalActive = 0
      state.showMaterialStatus = false
      state.showEditMaterial = false
    }

    const normalClick = (index) => {
      state.normalActive = index
      state.showMaterialStatus = false
      state.showEditMaterial = false
      state.showPlatformStatus = false
      state.showEditPlatform = false
      state.showApplyStatus = false
    }

    return {
      data,
      state,
      normalClick,
      showStatus,
      showEdit,
      showCreate,
      openLowCodeEditor
    }
  }
}
</script>

<style lang="less" scoped>
.home-create {
  width: 100%;
  height: 100%;

  .home-create-timeline-wrap {
    width: 600px;
    padding: 16px 0;
    background-color: #fff;
    margin: auto;

    :deep(.icon.step-icon) {
      font-size: 12px;
      width: 20px;
      height: 20px;
    }
    :deep(.tiny-steps--text-right .step-content.normal .step-text .name) {
      font-weight: normal;
    }
  }

  .home-create-alert {
    position: absolute;
    width: 480px;
    top: 60px;
    right: 20px;
  }

  .home-create-content {
    width: 100%;
    height: 100%;
    padding: 24px 0 0;
    background-color: #f2f5fc;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    &.no-padding {
      padding: 0;
    }
    .home-create-main {
      width: 97%;
      height: 91%;
      border-radius: 8px;
      background-color: #fff;
      padding: 32px;
      box-sizing: border-box;
      :deep(.tiny-input__inner) {
        width: 400px;
        height: 32px;
      }
      :deep(.tiny-textarea) {
        width: 400px;
      }
    }
    :deep(.tiny-form-item__label) {
      height: 32px;
      line-height: 32px;
      text-align: left;
      padding-left: 0;
      font-size: 14px;
      color: #595959;
    }
    :deep(.title-wrap) {
      display: flex;
      flex-direction: column;
      .title {
        font-size: 18px;
        font-weight: bold;
        color: #252b3a;
      }
      .des {
        font-size: 12px;
        color: #adb0b8;
        font-family: 'Microsoft YaHei';
        margin-top: 4px;
      }
    }
    :deep(.create-form) {
      margin: 24px auto 0;
      .tiny-form-item.tiny-form-item--small {
        margin-bottom: 20px;
      }
    }

    :deep(.create-confirm) {
      height: 32px;
      line-height: 32px;
      padding: 0 20px;
      margin-top: 18px;
      max-width: none;
    }
  }
}
.apply-page {
  width: 80%;
  height: 100%;
  background: #f2f5fc;

  .home-create-main {
    width: 100% !important;
  }
  .create-status {
    width: auto;
  }
}
</style>
