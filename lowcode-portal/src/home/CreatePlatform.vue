<template>
  <div class="create-platform-wrap home-create-main">
    <div class="create-platform-title title-wrap">
      <span class="title">创建可视化设计器（体验版）</span>
    </div>
    <tiny-alert
      class="home-create-alert"
      type="info"
      description="当前创建流程仅是教学体验，并不会生成真正的设计器，也不会保存您的数据。"
    ></tiny-alert>
    <tiny-form
      ref="ruleForm"
      :disabled="false"
      :model="state.formData"
      show-message
      :rules="rules"
      label-width="110px"
      size="small"
      class="create-form"
      validate-type="text"
    >
      <tiny-form-item label="设计器名称" prop="name">
        <tiny-input v-model="state.formData.name" placeholder="请输入"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="设计器描述" prop="description">
        <tiny-input v-model="state.formData.description" type="textarea" maxlength="1000" show-word-limit resize="none">
        </tiny-input>
      </tiny-form-item>
      <tiny-form-item>
        <tiny-button type="primary" class="create-confirm" @click="createPlatform">创建可视化设计器</tiny-button>
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script>
import { Button, Input, Form, FormItem, Alert } from '@opentiny/vue'
import { reactive, ref } from 'vue'
import { formValidate } from 'lowcode-design-controller/utils'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyAlert: Alert
  },
  setup(props, { emit }) {
    const ruleForm = ref(null)

    const rules = {
      name: [
        { required: true, message: '输入不能为空', trigger: 'blur' },
        { validator: formValidate('nameZh'), trigger: 'blur' }
      ]
    }

    const state = reactive({
      formData: {
        name: '',
        description: ''
      }
    })

    const createPlatform = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          emit('confirm')
        }
      })
    }

    return {
      rules,
      ruleForm,
      state,
      createPlatform
    }
  }
}
</script>
