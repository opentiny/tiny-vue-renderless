<template>
  <div class="create-material-wrap home-create-main">
    <div class="create-material-title title-wrap">
      <span class="title">创建物料资产包（体验版）</span>
    </div>
    <tiny-alert
      class="home-create-alert"
      type="info"
      description="当前创建流程仅是教学体验，并不会生成真正的物料包，也不会保存您的数据。"
    ></tiny-alert>
    <tiny-form
      ref="ruleForm"
      class="create-form"
      :disabled="false"
      :model="state.formData"
      :rules="rules"
      show-message
      label-width="140px"
      size="small"
      label-position="left"
      validate-type="text"
    >
      <tiny-form-item label="物料资产包名称" prop="name">
        <tiny-input v-model="state.formData.name" placeholder="请输入"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="选择技术栈" prop="framework">
        <tiny-button-group
          v-model="state.formData.framework"
          :data="framework"
          :text-field="textField"
        ></tiny-button-group>
      </tiny-form-item>
      <tiny-form-item label="物料资产包描述">
        <tiny-input v-model="state.formData.description" type="textarea" maxlength="1000" show-word-limit resize="none">
        </tiny-input>
      </tiny-form-item>
      <tiny-form-item>
        <tiny-button type="primary" class="create-confirm" @click="createMaterial">创建物料资产包</tiny-button>
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { Input, Form, FormItem, Button, Alert, ButtonGroup } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { framework, formValidate } from 'lowcode-design-controller/utils'
import { requestCreateMaterial } from './http'

export default {
  components: {
    TinyInput: Input,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyButton: Button,
    TinyAlert: Alert,
    TinyButtonGroup: ButtonGroup
  },
  setup(props, { emit }) {
    const ruleForm = ref(null)
    const textField = ref('label')
    const { message } = useModal()

    const rules = {
      name: [
        {
          required: true,
          message: '输入不能为空',
          trigger: 'blur'
        },
        {
          validator: formValidate('nameZh'),
          trigger: 'blur'
        }
      ],
      framework: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        }
      ]
    }

    const state = reactive({
      formData: {
        name: '',
        framework: 'Vue',
        description: ''
      }
    })

    const createMaterial = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          requestCreateMaterial(state.formData)
            .then((data) => {
              emit('confirm', data)
            })
            .catch((error) => {
              message({
                message: `创建物料资产包失败: ${error.message || error}`,
                status: 'error'
              })
            })
        }
      })
    }

    return {
      state,
      ruleForm,
      framework,
      rules,
      textField,
      createMaterial
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.tiny-button-group) {
  .tiny-group-item {
    width: 400px;
    display: flex;

    li {
      flex: 1;
      margin: 0;

      button {
        width: 100%;
        border-radius: 0;
        background: #f5f5f5;
        padding: 0 20px;
        border: 0;
      }

      &.active button:not(.disabled) {
        background: #fff;
        color: #191919;
        border: 1px solid #191919;
        border-radius: 6px;
      }

      &:hover:not(.active) button:not(.disabled) {
        color: #191919;
        font-weight: 700;
        background: #f5f5f5;
      }
    }
  }
}
</style>
