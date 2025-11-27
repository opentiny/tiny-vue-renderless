<template>
  <div class="myPlatform">
    <div class="myPlatform-main">
      <div class="myPlatform-create">
        <icon-chevron-left class="myPlatform-create-icon" @click="back"></icon-chevron-left>
        <span class="myPlatform-create-title">编辑设计器</span>
        <span class="myPlatform-create-line"></span>
        <span class="myPlatform-create-title">{{ state.platform.name }}</span>
        <span v-if="state.platform.app_extend?.length" class="myPlatform-create-type"
          >（{{ state.platform.app_extend[0].name_cn || state.platform.app_extend[0].name }}）</span
        >
        <span v-if="state.platform.vscode_url" class="myPlatform-create-address"
          >设计器构建地址：<a class="structure-url" :href="state.platform.vscode_url" target="_blank">
            {{ state.platform.vscode_url }}
          </a></span
        >
      </div>
      <tiny-alert
        v-show="state.buildStatus"
        class="myPlatform-success"
        description="恭喜！设计器构建成功。"
      ></tiny-alert>
      <div class="myPlatform-content">
        <div class="myPlatform-content-wrap">
          <div class="myPlatform-content-main">
            <edit-page
              title="构建可视化设计器"
              :timeLineData="state.timeLineData"
              :timeActive="state.timeActive"
              :allData="state.timeLineData[state.timeActive].allData"
              :selectData="state.platform[state.timeLineData[state.timeActive].type]"
              :selectDataAll="state.platform"
              :label="state.timeLineData[state.timeActive].label"
              :type="state.timeLineData[state.timeActive].type"
              :linkParams="state.linkParams"
              :searchGroup="state.businessList"
              :selectGroup="state.selectGroup"
              @line-change="lineChange"
              @add="addItem"
              @delete-item="deleteItem"
              @drag-item="dragItem"
              @update-material="updateMaterial"
              @set-version="setVersion"
              @select-all="selectAll"
            ></edit-page>
          </div>
        </div>
      </div>
      <div class="myPlatform-footer">
        <tiny-button
          type="primary"
          native-type="submit"
          :disabled="platformBtns[state.platform.id] || !state.showBuild"
          @click="updateAndBuildPlatform"
          >构建可视化设计器</tiny-button
        >
        <source-code-build v-if="showSourceCodeBuild"></source-code-build>
      </div>
    </div>
    <div class="myPlatform-progress">
      <tiny-dialog-box
        v-model:visible="state.boxVisibility"
        width="400px"
        top="40%"
        :show-header="false"
        :close-on-click-modal="false"
      >
        <template #footer>
          <tiny-progress
            class="build-progress"
            :percentage="
              state.structureType === structurePlatform
                ? platformPercent[state.platform.id]
                : vscodePercent[state.platform.id]
            "
            :stroke-width="8"
            type="line"
          ></tiny-progress>
          <span>正在构建，请稍后...</span>
        </template>
      </tiny-dialog-box>
    </div>
  </div>
</template>

<script lang="jsx">
import { onMounted, provide, watch } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { Button, Progress, DialogBox, Alert } from '@opentiny/vue'
import { IconChevronLeft } from '@opentiny/vue-icon'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'
import EditPage from '../common/components/EditPage.vue'
import {
  state,
  setVersion,
  lineChange,
  getPlatform,
  addItem,
  deleteItem,
  buildVSCode,
  dragItem,
  updateAndBuildPlatform,
  updateMaterial,
  getAppTypeList,
  platformBtns,
  vscodeBtns,
  platformMessage,
  vscodeMessage,
  vscodePercent,
  platformPercent,
  structurePlatform,
  structureVSCode,
  selectAll
} from './js/platformCreate'
import SourceCodeBuild from './SourceCodeBuild.vue'

export default {
  components: {
    EditPage,
    TinyButton: Button,
    TinyProgress: Progress,
    IconChevronLeft: IconChevronLeft(),
    SourceCodeBuild,
    TinyDialogBox: DialogBox,
    TinyAlert: Alert
  },
  setup() {
    provide('isExperienceVersion', false)

    const platformSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.platformSetting))
    const createPlatformType = sessionStorage.getItem(SESSION_STORAGE.createPlatformType)
    const showSourceCodeBuild = !import.meta.env.MODE?.includes('open')

    state.platform.id = platformSetting?.id ?? ''
    state.createPlatformType = createPlatformType

    onBeforeRouteLeave(() => {
      state.buildStatus = false
    })

    onMounted(() => {
      getPlatform(true)
      getAppTypeList()
    })

    const router = useRouter()

    const back = () => {
      router.push({
        path: '/my-platform'
      })
    }

    watch(
      () => state.buildStatus,

      () => {
        setTimeout(() => {
          back()
        }, 5000)
      }
    )

    return {
      state,
      platformBtns,
      showSourceCodeBuild,
      back,
      addItem,
      deleteItem,
      updateAndBuildPlatform,
      buildVSCode,
      vscodeBtns,
      dragItem,
      platformMessage,
      vscodeMessage,
      platformPercent,
      vscodePercent,
      lineChange,
      structurePlatform,
      structureVSCode,
      updateMaterial,
      setVersion,
      selectAll
    }
  }
}
</script>

<style lang="less" scoped>
.myPlatform {
  width: 100%;
  height: calc(100% - 50px);
  min-height: 760px;
  position: relative;
  .myPlatform-main {
    width: 100%;
    height: 100%;
    min-height: 760px;
  }
  .myPlatform-success {
    width: 260px;
    position: absolute;
    top: -10px;
    right: 20px;
    z-index: 15;
  }
  .myPlatform-create {
    display: flex;
    align-items: center;
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    &-icon {
      cursor: pointer;
      color: #ccc;
      font-size: 18px;
    }
    &-line {
      display: inline-block;
      background: #000000;
      width: 1px;
      height: 16px;
      margin: 12px 10px;
      opacity: 0.3;
    }
    &-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
      margin-left: 10px;
    }
    &-type {
      color: #8a8e99;
      font-size: 14px;
    }
    &-address {
      display: inline-block;
      margin: 24%;
      font-size: 12px;
      color: #1476ff;
    }
  }

  &-content-tool {
    padding: 30px;
    display: flex;
    justify-content: space-around;
    .tiny-input {
      width: 250px;
    }
    .tiny-select {
      width: 250px;
    }
  }
  &-content {
    width: 100%;
    height: calc(100% - 60px);
    padding: 10px 20px 30px;
    background-color: #f5f5f5;
    box-sizing: border-box;
    &-wrap {
      background-color: #f5f5f5;
      height: 100%;
      box-sizing: border-box;
    }
    .myPlatform-content-structure {
      box-sizing: border-box;
      width: 100%;
      max-height: 130px;
      background: #f5f5f5;
      padding: 16px 22px;
      .myPlatform-content-structure-text {
        height: 26px;
        line-height: 26px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Normal;
        font-weight: Normal;
        color: #575d6c;
        span {
          margin-left: 10px;
          cursor: pointer;
          color: #333;
          .icon-writing {
            margin-left: 2px;
          }
        }
        .structure-url {
          color: #2496ff;
          margin-left: 10px;
        }
      }
      .material-content-status {
        line-height: 26px;
        .build-progress {
          width: 240px;
          margin-top: 8px;
          display: inline-block;
          :deep(.tiny-progress-bar__outer) {
            background-color: var(--ti-common-color-line-dividing);
          }
        }
        .platform-create-content-header-status {
          font-size: 14px;
        }
      }
    }
    .myPlatform-content-main {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      margin: 10px 0;
      display: flex;
      .edit-page {
        height: 100%;
        padding: 0;
      }
      :deep(.tiny-steps-timeline > .timeline) {
        height: 68px !important;
      }
      @media only screen and (max-width: 1600px) {
        :deep(.tiny-steps-timeline > .timeline) {
          height: 48px !important;
        }
        :deep(.tiny-steps-timeline .timeline:not(:last-child) .line) {
          height: 48px !important;
        }
      }
    }
  }
  &-footer {
    position: fixed;
    bottom: 0px;
    height: 60px;
    line-height: 60px;
    width: 100%;
    text-align: center;
    background: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.1);
    border-top: 1px solid #f1f2f3;
    z-index: 16;
    .tiny-button {
      max-width: 300px;
    }
    .myPlatform-footer-tips {
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Normal;
      font-weight: Normal;
      color: #8a8e99;
      line-height: 18px;
      padding-left: 10px;
    }
  }
  .btndisabled {
    color: #8994aa !important;
    cursor: not-allowed !important;
  }
  :deep(.tiny-steps.is-horizontal .tiny-steps-normal .normal) {
    width: 30% !important;
  }
  :deep(.tiny-steps.is-horizontal .tiny-steps-normal .normal:last-child) {
    width: 90px !important;
  }
  .vscode-tip {
    position: fixed;
    z-index: 1101;
    max-width: 800px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    overflow: hidden;
    white-space: nowrap;
    padding: 6px 20px;
    background: rgb(70, 76, 89);
    border: 1px solid var(--ti-common-color-line-active);
    border-radius: 2px;
    font-size: 12px;
    right: 1%;
    top: 20%;
    :deep(.tiny-alert__description) {
      color: #fff;
    }
  }
  .vscodeBtn {
    position: relative;
  }
  .icon-HelpQuery {
    position: absolute;
    bottom: 7px;
    right: 4px;
    font-size: 13px;
  }
}
.vscode-help {
  &-img {
    margin: 10px 0 !important;
  }
  &-dom {
    color: #2496ff !important;
    cursor: pointer !important;
  }
}
.myPlatform-progress {
  .build-progress {
    margin: 6px 0 16px 0;
  }
}
</style>
