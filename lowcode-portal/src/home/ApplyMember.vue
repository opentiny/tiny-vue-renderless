<template>
  <tiny-dialog-box
    v-show="showCreateDialog"
    title="创建组织"
    width="640px"
    :close-on-click-modal="false"
    @close="closeFn"
  >
    <tiny-alert type="info">
      <template #description>
        <span class="des">
          创建自己的组织，您可以在创建成功后联系
          <a v-if="isInternalEnv()" href="im:l30028747" class="item-talk">30028747</a>
          <span v-else>系统管理员 </span>审批，审批通过后，您将成为该组织的组织管理员
        </span>
      </template>
    </tiny-alert>
    <tiny-form
      ref="ruleForm"
      class="mt20"
      :model="state.formData"
      show-message
      :rules="rules"
      label-width="130px"
      :label-align="true"
      label-position="left"
      validate-type="text"
      :inline-message="true"
    >
      <tiny-form-item label="申请人" prop="username">
        <tiny-input v-model="userInfo" disabled validate-event></tiny-input>
      </tiny-form-item>
      <tiny-form-item class="organization_id" label="组织ID" prop="tenantId" validate-position="right-start">
        <tiny-input v-model="state.formData.tenantId"></tiny-input>
      </tiny-form-item>
      <span class="tip mt8"> 组织ID是唯一识别，以字母、下划线开头，允许数字、字母、点、下划线与中划线。</span>
      <tiny-form-item label="组织名称" prop="nameCn">
        <tiny-input v-model="state.formData.nameCn"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="组织英文名称" prop="nameEn">
        <tiny-input v-model="state.formData.nameEn"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="组织介绍" prop="projectDescription">
        <tiny-input v-model="state.formData.projectDescription" type="textarea" maxlength="350"></tiny-input>
      </tiny-form-item>
    </tiny-form>
    <template #footer>
      <tiny-button type="primary" @click="ApplyMember">提交</tiny-button>
      <tiny-button @click="closeFn">取消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { Button, Input, Form, FormItem, DialogBox, Alert, Notify } from '@opentiny/vue'
import { computed, reactive, ref } from 'vue'
import { user, useModal } from 'lowcode-design-controller'
import { formValidate } from 'lowcode-design-controller/utils'
import { isInternalEnv } from '@/utils/env'
import { requestApply } from './http'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyDialogBox: DialogBox,
    TinyAlert: Alert
  },
  props: {
    showCreateDialog: {
      type: Boolean,
      default: () => false
    },
    allTenants: {
      type: Array,
      default: () => []
    }
  },
  emits: ['apply', 'close'],
  setup(props, { emit }) {
    const { message } = useModal()
    const ruleForm = ref(null)

    const validTenantId = (rule, value, callback) => {
      const hasExist = props.allTenants.some((item) => item.tenant_id === value)

      if (hasExist) {
        callback(new Error('组织ID重复'))

        return
      }

      callback()
    }

    const rules = {
      username: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        }
      ],
      account: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        }
      ],
      tenantId: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        },
        {
          validator: formValidate('nameId'),
          trigger: 'blur'
        },
        { validator: validTenantId }
      ],
      nameCn: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        }
      ],
      nameEn: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        }
      ],
      projectDescription: [
        {
          required: true,
          message: '必填',
          trigger: 'blur'
        }
      ]
    }

    const state = reactive({
      formData: {
        username: user.current.username,
        account: user.current.resetPasswordToken,
        nameCn: '',
        nameEn: '',
        tenantId: '',
        projectDescription: ''
      }
    })

    const userInfo = computed(() => `${state.formData.username}(${state.formData.account})`)

    const ApplyMember = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          const params = {
            action: 'createTenant',
            tenant_id: state.formData.tenantId,
            name_cn: state.formData.nameCn,
            name_en: state.formData.nameEn,
            project_desc: state.formData.projectDescription,
            status: 0
          }

          applyTenant(params)
          closeFn()
        }
      })
    }

    const applyTenant = (params) => {
      requestApply(params)
        .then(() => {
          const { name_cn } = params

          const notifyMsg = isInternalEnv()
            ? `您创建【${name_cn}】的申请已提交，请联系管理员  30028747 审批`
            : '您的信息已提交，稍后会有工作人员联系您。'

          Notify({
            type: 'success',
            title: '创建成功',
            message: notifyMsg,
            position: 'top-right'
          })
        })
        .catch((error) => {
          message({
            message: `申请失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const closeFn = () => {
      ruleForm.value.clearValidate()
      state.formData.tenantId = ''
      state.formData.nameCn = ''
      state.formData.nameEn = ''
      state.formData.projectDescription = ''
      emit('close')
    }

    return {
      rules,
      state,
      ruleForm,
      ApplyMember,
      closeFn,
      userInfo,
      isInternalEnv
    }
  }
}
</script>

<style lang="less" scoped>
.item-talk {
  color: #5e7ce0;
  font-weight: 600;
}

.mt8 {
  margin-top: var(--ti-common-space-2x);
}

.mt20 {
  margin-top: var(--ti-common-space-5x);
}

.tenantId {
  display: flex;
  align-items: center;

  .item {
    margin-left: 4px;
  }
}

.tip {
  color: #e37d29;
  font-size: 14px;
  font-family: Microsoft YaHei;
  line-height: 22px;
  width: 436px;
  margin: 0 0 20px 130px;
  display: block;
}

:deep(.tiny-form) {
  overflow: auto;
  overflow-x: hidden;
}

:deep(.tiny-form-item) {
  margin-bottom: 20px;
}

:deep(.tiny-dialog-box__footer) {
  padding-top: 4px;
}

:deep(.tiny-dialog-box__header) {
  padding-bottom: 0;
}

.organization_id {
  margin-bottom: 4px;
}
</style>
