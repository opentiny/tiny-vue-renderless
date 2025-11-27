<template>
  <div class="changelog">
    <div class="changelog-title">更新日志</div>
    <tiny-button-group id="changelog-button-group" v-model="state.logLabel" :data="state.groupData"></tiny-button-group>
    <div class="changelog-md">
      <show-marked :md="logData" :isUseContent="false"></show-marked>
    </div>
  </div>
</template>

<script>
import ShowMarked from '../../common/components/ShowMarked'
import 'github-markdown-css/github-markdown-light.css'
import { computed, reactive } from 'vue'
import { ButtonGroup } from '@opentiny/vue'

export default {
  components: {
    ShowMarked,
    TinyButtonGroup: ButtonGroup
  },
  props: {
    changelogPortal: {
      type: String,
      default: ''
    },
    changelogDesign: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const state = reactive({
      logLabel: 'changelogDesign',
      groupData: [
        { text: '设计器', value: 'changelogDesign' },
        { text: '官网', value: 'changelogPortal' }
      ]
    })

    const logData = computed(() => props[state.logLabel])

    return {
      state,
      logData
    }
  }
}
</script>

<style lang="less" scoped>
.changelog {
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  align-items: flex-start;
  margin: 0 auto;
  .changelog-title {
    color: #000000;
    font-size: 24px;
    font-weight: 600;
    margin: 30px 0;
  }

  .changelog-md {
    margin: 27px 0 50px 0;
    .changelog-time {
      text-align: right;
      float: left;
      padding-right: 20px;
      color: #191919;
      font-size: 14px;
    }
  }

  :deep(.timeline) {
    .line {
      height: 256px !important;
    }
    .icon {
      width: 12px;
      height: 12px;
      border: 3px solid #595959;
      left: -5px;
      span {
        display: none;
      }
    }
  }

  #changelog-button-group {
    :deep(.tiny-group-item) {
      li {
        margin-right: 0;
        button {
          background-color: #f5f5f5;
          border: 0;
          color: #595959;
        }
        button:hover {
          color: #191919;
        }
      }
      .active {
        button {
          background-color: #fff;
          border: 1px solid #191919;
          color: #191919;
        }
      }
    }
  }

  :deep(#editor) {
    height: auto;
    overflow-y: hidden;
  }
}
</style>
