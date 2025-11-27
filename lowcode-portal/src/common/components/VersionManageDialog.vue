<template>
  <tiny-dialog-box
    v-model:visible="state.showVersionManage"
    :title="title"
    width="480px"
    :close-on-click-modal="false"
    @closed="closeDialog"
  >
    <div class="version-manage-dialog">
      <tiny-alert
        type="info"
        :closable="false"
        description="每构建一次物料包，生成一个新版本，历史版本可在详情信息中查看"
      ></tiny-alert>
      <tiny-form
        ref="versionDataRef"
        :model="state.versionData"
        :disabled="false"
        :rules="state.rules"
        label-position="left"
        label-width="90px"
        class="version-manage-general-form"
      >
        <div class="version-content-basicConfig">
          <tiny-form-item label="版本号" prop="version" required>
            <tiny-input v-model="state.versionData.version" placeholder="示例：1.0.0"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="版本描述" prop="description" required>
            <tiny-input v-model="state.versionData.description" type="textarea" show-word-limit maxlength="1000">
            </tiny-input>
          </tiny-form-item>
        </div>
      </tiny-form>
    </div>
    <template #footer>
      <tiny-button type="primary" :disabled="!state.isFinished" @click="save">确认</tiny-button>
      <tiny-button @click="closeDialog">取消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref } from 'vue'
import { Button, DialogBox, Input, Form, FormItem, Alert } from '@opentiny/vue'
import { formValidate } from 'lowcode-design-controller/utils'

export default {
  components: {
    TinyButton: Button,
    TinyDialogBox: DialogBox,
    TinyInput: Input,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyAlert: Alert
  },
  props: {
    showVersionManage: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '版本管理'
    }
  },
  emits: ['cancel', 'save'],
  setup(props, { emit }) {
    const versionDataRef = ref(null)

    const state = reactive({
      showVersionManage: props.showVersionManage,
      versionData: {
        version: '',
        description: ''
      },
      rules: {
        version: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('version'), trigger: 'blur' }
        ]
      },
      isFinished: false
    })

    const closeDialog = () => {
      emit('cancel')
    }

    const save = () => {
      versionDataRef.value.validate((vaild) => {
        if (vaild) {
          emit('save', state.versionData)
          closeDialog()
        }
      })
    }

    watch(
      () => state.versionData,
      () => {
        state.isFinished = Object.values(state.versionData).every((val) => val !== '')
      },
      { deep: true }
    )

    watch(
      () => props.showVersionManage,
      (value) => {
        state.showVersionManage = value
      }
    )

    return {
      state,
      versionDataRef,
      closeDialog,
      save
    }
  }
}
</script>

<style lang="less" scoped>
.version-manage-dialog {
  width: 100%;
  height: 100%;
}
:deep(.tiny-dialog-box) {
  height: 350px !important;
  width: 550px !important;
  .tiny-dialog-box__header {
    height: 26px;
    margin-top: 10px;
    padding-bottom: 10px;
  }
  .tiny-dialog-box__footer {
    padding: 6px 32px 28px;
  }
  .tiny-alert {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    &.tiny-alert--normal .tiny-alert__content {
      max-width: calc(100% - 18px);
    }
  }
  .tiny-form {
    .tiny-form-item__label {
      font-size: 12px;
      color: #575d6c;
      padding: 0;
    }
  }
}
</style>
