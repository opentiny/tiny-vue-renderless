<template>
  <tiny-button @click="state.boxVisibility = true">由源码构建设计器</tiny-button>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :close-on-click-modal="false"
    title="源码构建信息"
    width="700px"
    append-to-body
  >
    <tiny-form
      ref="formRef"
      :model="state.formData"
      show-message
      :rules="rules"
      class="form"
      label-width="120px"
      :label-align="true"
      label-position="left"
    >
      <tiny-form-item label="代码库地址" prop="repositoryUrl">
        <div>
          <tiny-input v-model="state.formData.repositoryUrl"></tiny-input>
          <section class="tip">需以http(s)开头,如https://xxxx.git, 且已添加xxx为代码库成员</section>
        </div>
      </tiny-form-item>
      <tiny-form-item label="代码库分支" prop="repositoryBranch">
        <tiny-input v-model="state.formData.repositoryBranch"></tiny-input>
      </tiny-form-item>
      <tiny-form-item prop="isRegistryFramework">
        <tiny-checkbox v-model="state.formData.isRegistryFramework">使用注册表新架构</tiny-checkbox>
      </tiny-form-item>
      <tiny-form-item prop="isJava">
        <tiny-checkbox v-model="state.formData.isJava">使用 Java 后端</tiny-checkbox>
      </tiny-form-item>
    </tiny-form>
    <template #footer>
      <tiny-button type="primary" @click="confirmBuild"> 确定 </tiny-button>
      <tiny-button @click="state.boxVisibility = false"> 取消 </tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, ref } from 'vue'
import { Button, DialogBox, Input, FormItem, Form, Checkbox } from '@opentiny/vue'
import { formValidate } from 'lowcode-design-controller/utils'
import { updateAndBuildPlatform } from './js/platformCreate'

export default {
  components: {
    TinyButton: Button,
    TinyDialogBox: DialogBox,
    TinyInput: Input,
    TinyFormItem: FormItem,
    TinyForm: Form,
    TinyCheckbox: Checkbox
  },
  setup() {
    const rules = {
      repositoryUrl: [
        { required: true, message: '必填', trigger: 'blur' },
        {
          validator: formValidate('repositoryUrl'),
          trigger: 'blur'
        }
      ],
      repositoryBranch: [{ required: true, message: '必填', trigger: 'blur' }]
    }

    const state = reactive({
      boxVisibility: false,
      formData: {
        repositoryUrl:
          'https://github.com/opentiny/tiny-engine.git',
        repositoryBranch: 'main',
        isRegistryFramework: false,
        isJava: false
      }
    })

    const formRef = ref(null)

    const confirmBuild = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          const buildInfo = {
            params: {
              sourceCodeUrl: state.formData.repositoryUrl,
              sourceCodeBranch: state.formData.repositoryBranch,
              isRegistryFramework: state.formData.isRegistryFramework,
              isJava: state.formData.isJava
            }
          }

          updateAndBuildPlatform(buildInfo)
          state.boxVisibility = false
        }
      })
    }

    return {
      state,
      rules,
      formRef,
      confirmBuild
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: var(--ti-common-space-5x);
}
.tip {
  color: var(--ti-common-color-text-weaken);
  font-size: var(--ti-common-font-size-base);
  margin-top: var(--ti-common-space-2x);
}
</style>
