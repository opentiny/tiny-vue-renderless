<template>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :close-on-click-modal="false"
    title="创建可视化设计器"
    width="530px"
    @closed="$emit('cancel')"
  >
    <tiny-form ref="ruleFormVal" :disabled="false" :model="state.platform" show-message :rules="rules">
      <tiny-form-item label="设计器名称" prop="name" show-message validate-type="text">
        <tiny-input v-model="state.platform.name" placeholder="请输入设计器名称"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="设计器描述" prop="description" show-message validate-type="text">
        <tiny-input
          v-model="state.platform.description"
          placeholder="请输入设计器描述"
          type="textarea"
          maxlength="350"
        ></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="预览图片" prop="image_url" class="change-img">
        <select-img v-model="state.platform.image_url" type="myPlatform" maxlength="350"> </select-img>
      </tiny-form-item>
    </tiny-form>
    <tiny-form ref="ruleForm" class="application" :disabled="false" :model="state.platform" show-message :rules="rules">
      <tiny-form-item label="应用扩展" prop="app_extend" class="app-select" :style="{ height: state.height }">
        <tiny-select
          v-model="state.platform.app_extend"
          placeholder="请选择"
          popper-class="drop"
          :popper-append-to-body="false"
          :searchable="true"
          @visible-change="visibleChange"
        >
          <tiny-option
            v-for="item in state.appExtensionList"
            :key="item.name_cn"
            :label="item.name_cn || item.name"
            :value="item.version.id"
            :class="['app-extend-option-item', `app-extend-option-item-${item.id}`]"
          >
            <div class="app-extend-list-item">
              <span class="item-left">
                <tiny-tooltip effect="dark" placement="top">
                  <template #content>
                    <div>{{ item.name_cn || item.name }}</div>
                    <div>{{ item.description }}</div>
                  </template>
                  <div class="item-left-content">
                    {{ item.name_cn || item.name }}
                    <div class="description">{{ item.description }}</div>
                  </div>
                </tiny-tooltip>
              </span>
              <span class="item-right" @click.stop="toSelectAppVersion(item)">
                <span>{{ item.version.version }}</span>
                <icon-down v-if="!item.showAppDialog" class="tiny-svg-size icon-down"></icon-down>
                <icon-up v-else class="tiny-svg-size icon-up"></icon-up>
              </span>
            </div>
          </tiny-option>
        </tiny-select>
      </tiny-form-item>
    </tiny-form>
    <app-extension-versions
      v-if="state.showAppDialog"
      class="item-versions"
      :list="state.selectedItem"
      :style="{
        left: state.extensionVersionPosition.left,
        top: state.extensionVersionPosition.top
      }"
      @selectVersion="selectVersion"
    ></app-extension-versions>
    <template #footer>
      <tiny-button type="primary" @click="createPlatform"> 确 定 </tiny-button>
      <tiny-button @click="state.boxVisibility = false">取 消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref, onMounted } from 'vue'
import { Button, DialogBox, Form, FormItem, Input, Select, Option, Tooltip } from '@opentiny/vue'
import { formValidate } from 'lowcode-design-controller/utils'
import SelectImg from '../common/components/SelectImg.vue'
import AppExtensionVersions from './AppExtensionVersions.vue'
import { fetchEcology } from '../ecosystem/http'
import { useModal } from 'lowcode-design-controller'
import { IconDown, IconUp } from '@opentiny/vue-icon'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyDialogBox: DialogBox,
    TinySelect: Select,
    TinyOption: Option,
    TinyTooltip: Tooltip,
    SelectImg,
    AppExtensionVersions,
    IconDown: IconDown(),
    IconUp: IconUp()
  },
  props: {
    boxVisibility: {
      type: Boolean,
      default: false
    }
  },
  emits: ['cancel', 'create'],
  setup(props, { emit }) {
    const ruleFormVal = ref(null)
    const { message } = useModal()

    const rules = {
      name: [
        { required: true, message: '必填' },
        { min: 1, max: 50, trigger: 'blur', message: '设计器名称不能超过50字符' },
        { validator: formValidate('nameZh'), trigger: 'blur' }
      ],
      description: [
        { required: true, message: '必填' },
        { min: 1, max: 100, trigger: 'blur', message: '描述内容不能超过100字符' }
      ]
    }
    const state = reactive({
      boxVisibility: props.boxVisibility,
      showAppDialog: false,
      platform: {
        name: '',
        description: '',
        image_url: '',
        app_extend: null
      },
      appExtensionList: [],
      selectedItem: [],
      height: '40px',
      extensionVersionPosition: {
        left: 'calc((100vw + 450px) / 2)',
        top: '53%'
      }
    })

    const createPlatform = () => {
      ruleFormVal.value.validate((valid) => {
        if (valid) {
          const params = { ...state.platform }

          params.app_extend = state.platform.app_extend ? [state.platform.app_extend] : []

          emit('create', params)
        }
      })
    }

    const getAppExtensionList = () => {
      fetchEcology({ category: 'appExtension' })
        .then((data) => {
          state.appExtensionList = data
          state.appExtensionList.forEach((item) => {
            if (item.versions.length) {
              item.version = item.versions[0]
              item.versions[0].selected = true
            } else {
              item.version = {}
            }

            item.showAppDialog = false
          })
        })
        .catch((error) => {
          message({
            message: `获取应用扩展列表失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const toSelectAppVersion = (item) => {
      // 已经展开状态下，再次点击则收起
      if (state.selectedItem.id === item.id) {
        state.showAppDialog = false
        item.showAppDialog = false
        state.selectedItem = []

        return
      }

      if (state.selectedItem) {
        state.selectedItem.showAppDialog = false
      }

      const selectItemEle = document.querySelector(`.app-extend-option-item-${item.id}`)

      if (selectItemEle) {
        const { right, top } = selectItemEle.getBoundingClientRect()

        // right + 4 把应用拓展版本放到下拉选项右边 + 4px 的位置
        state.extensionVersionPosition.left = `${right + 4}px`
        // top 为当前 list-item 的 top 位置，即顶部对齐
        state.extensionVersionPosition.top = `${top}px`
      }

      state.showAppDialog = true
      state.selectedItem = item
      item.showAppDialog = true
    }

    const selectVersion = (item) => {
      state.showAppDialog = false

      state.appExtensionList.forEach((app) => {
        if (app.id === state.selectedItem.id) {
          app.version = item
          app.showAppDialog = false
          state.selectedItem.versions.forEach((version) => {
            version.selected = version.id === item.id
          })
        }
      })
    }

    const visibleChange = (status) => {
      state.height = status ? '260px' : '40px'
      if (!status) {
        state.showAppDialog = false
      }

      if (state.selectedItem) {
        state.selectedItem.showAppDialog = false
      }
    }

    watch(
      () => props.boxVisibility,
      (value) => {
        state.boxVisibility = value
      }
    )

    onMounted(getAppExtensionList)

    return {
      rules,
      ruleFormVal,
      state,
      createPlatform,
      toSelectAppVersion,
      selectVersion,
      visibleChange
    }
  }
}
</script>
<style lang="less" scoped>
.item-left {
  &-content {
    width: 270px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .description {
    color: #adb0b8;
    font-size: 12px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.item-right {
  font-size: 12px;
  display: flex;
  align-items: center;
  .tiny-svg-size {
    margin-left: 10px;
  }
}
.item-versions {
  height: 180px;
  width: 282px;
  position: fixed;
}
:deep(.selected) {
  background: #f5f5f5 !important;
}
:deep(.versions-item):hover {
  background: #f5f5f5 !important;
}
:deep(.tiny-dialog-box) {
  max-height: 600px;
  overflow: visible;
  .tiny-dialog-box__header {
    padding: 32px 32px 27px 32px;
  }

  .tiny-form-item {
    margin-bottom: 20px;
  }
  .tiny-form-item__label {
    text-align: left;
  }
  .tiny-dialog-box__body {
    max-height: 308px;
    overflow: visible;
  }
  .tiny-input-display-only {
    width: 300px !important;
  }
  .popselect {
    font-size: 12px;
    line-height: 28px;
    height: 50px;
  }
  .tiny-select-dropdown {
    margin-top: 10px;
    width: 358px;
    height: 300px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
  }
  .app-extension-versions {
    left: calc((100vw + 490px) / 2);
  }
}

:deep(.tiny-select-dropdown) {
  .tiny-select-dropdown__item {
    height: auto;
    border-bottom: 1px solid #dfe1e6;
    padding: 8px;
  }
}
:deep(.tiny-dialog-box__footer) {
  padding: 32px;
}

:deep(.change-img) {
  height: auto;
  margin: 0 !important;
  .tiny-input-suffix {
    height: 30px;
    width: 88px;
    border: 1px solid var(--ti-input-border-color);
    border-radius: 17px;
    .tiny-input__inner {
      display: none;
    }
    .tiny-input__suffix {
      left: 20px;
    }
  }
  :deep(.tiny-input-suffix):hover {
    border: 1px solid var(--ti-common-color-text-primary);
  }
}
:deep(.tiny-select-dropdown) {
  left: -5px !important;
  .tiny-input__inner {
    background: #f5f5f5;
  }
  .tiny-scrollbar__view {
    .tiny-option {
      display: flex;
      padding: 8px 20px;
      justify-content: space-between;
      border: none;
    }
  }
}
:deep(.application) {
  margin-top: 10px;
  height: 32px;
  overflow: visible;
}
.app-extend-list-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
