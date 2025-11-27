<template>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :close-on-click-modal="false"
    :title="title"
    width="480px"
    @closed="closeDialog"
  >
    <div class="app-create-dialog">
      <tiny-form
        ref="createDataRef"
        :model="state.createData"
        :disabled="false"
        :rules="state.rules"
        label-position="right"
        label-width="100px"
        class="app-create-general-form"
        validate-type="text"
      >
        <div class="app-content-basicConfig">
          <tiny-form-item label="应用名称" prop="name">
            <tiny-input v-model="state.createData.name"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="应用描述">
            <tiny-input v-model="state.createData.description" type="textarea" maxlength="350"> </tiny-input>
          </tiny-form-item>
          <tiny-form-item label="预览图片">
            <select-img v-model="state.createData.image_url"></select-img>
          </tiny-form-item>
        </div>
      </tiny-form>
    </div>
    <template #footer>
      <tiny-button type="primary" native-type="submit" @click="save('createData')">保 存</tiny-button>
      <tiny-button @click="closeDialog">取 消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref } from 'vue'
import { Button, DialogBox, Input, Form, FormItem } from '@opentiny/vue'
import { formValidate } from 'lowcode-design-controller/utils'
import SelectImg from './SelectImg.vue'

export default {
  components: {
    TinyButton: Button,
    TinyDialogBox: DialogBox,
    TinyInput: Input,
    TinyForm: Form,
    TinyFormItem: FormItem,
    SelectImg
  },
  props: {
    boxVisibility: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  emits: ['cancel', 'save'],
  setup(props, { emit }) {
    const createDataRef = ref(null)

    const state = reactive({
      boxVisibility: props.boxVisibility,
      createData: {
        name: '',
        description: '',
        image_url: ''
      },
      isValidate: true,
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('nameZh'), trigger: 'blur' }
        ]
      }
    })

    const closeDialog = () => {
      state.createData.image_url = ''
      emit('cancel')
    }

    const save = () => {
      createDataRef.value.validate((vaild) => {
        if (vaild) {
          emit('save', state.createData)
          closeDialog()
        }
      })
    }

    watch(
      () => props.boxVisibility,
      (value) => {
        state.boxVisibility = value
      }
    )

    return {
      state,
      createDataRef,
      closeDialog,
      save
    }
  }
}
</script>

<style lang="less" scoped>
.app-create-dialog {
  width: 100%;
  height: 100%;
  padding-top: 10px;
}

:deep(.tiny-dialog-box__footer) {
  padding-top: 0;
}
</style>
