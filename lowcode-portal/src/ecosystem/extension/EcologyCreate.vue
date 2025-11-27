<template>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :close-on-click-modal="false"
    :title="`发布${category}`"
    width="600px"
    @closed="$emit('cancel')"
  >
    <tiny-form
      ref="formRef"
      :model="state.formData"
      label-width="110px"
      :rules="rules"
      :label-align="true"
      label-position="left"
      validate-type="text"
    >
      <tiny-form-item label="插件名称" prop="name_cn">
        <tiny-input v-model="state.formData.name_cn" placeholder="请输入"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="npm包名" prop="name">
        <tiny-input v-model="state.formData.name" placeholder="请输入"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="仓库地址" prop="registry">
        <tiny-input
          v-model="state.formData.registry"
          :placeholder="`请输入${category}的npm包所在的仓库地址`"
        ></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="插件描述">
        <tiny-input
          v-model="state.formData.description"
          type="textarea"
          resize="none"
          :rows="1"
          :maxlength="100"
          show-word-limit
        ></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="预览图片">
        <upload-pic @change="getImgData"></upload-pic>
      </tiny-form-item>
      <tiny-form-item label="版本号" prop="version">
        <tiny-input v-model="state.formData.version" placeholder="请输入"></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="版本描述" prop="versionDes">
        <tiny-input
          v-model="state.formData.versionDes"
          type="textarea"
          resize="none"
          :rows="1"
          :maxlength="100"
          show-word-limit
        ></tiny-input>
      </tiny-form-item>
      <tiny-form-item label="公开范围">
        <div style="display: flex">
          <tiny-radio-group
            v-model="state.formData.public"
            :options="[
              { label: 0, text: '私有' },
              { label: 1, text: '公开' },
              { label: 2, text: '半公开' }
            ]"
            @change="publicChange"
          ></tiny-radio-group>
          <tiny-select
            v-if="state.formData.public === 2"
            v-model="state.formData.public_scope_tenants"
            style="margin-left: 20px"
            multiple
            collapse-tags
            placeholder="选择租户"
            text-field="tenant_id"
            value-field="id"
            :options="tenants"
          ></tiny-select>
        </div>
      </tiny-form-item>
      <tiny-form-item label="标识官方物料">
        <tiny-radio v-model="state.formData.isOfficial" :label="true">是</tiny-radio>
        <tiny-radio v-model="state.formData.isOfficial" :label="false">否</tiny-radio>
      </tiny-form-item>
      <tiny-form-item label="标识默认物料">
        <tiny-radio v-model="state.formData.isDefault" :label="true">是</tiny-radio>
        <tiny-radio v-model="state.formData.isDefault" :label="false">否</tiny-radio>
      </tiny-form-item>
    </tiny-form>
    <template #footer>
      <tiny-button type="primary" @click="createEcology"> 创建 </tiny-button>
      <tiny-button @click="$emit('cancel')">取 消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref, computed } from 'vue'
import { Button, DialogBox, Form, FormItem, Input, Select, RadioGroup, Radio } from '@opentiny/vue'
import { user } from 'lowcode-design-controller'
import { ACTION_ID, formValidate } from 'lowcode-design-controller/utils'
import UploadPic from './UploadPic.vue'

export default {
  components: {
    TinyDialogBox: DialogBox,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyRadioGroup: RadioGroup,
    TinyRadio: Radio,
    TinySelect: Select,
    UploadPic
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    category: {
      type: String,
      default: ''
    }
  },
  emits: ['create', 'cancel'],
  setup(props, { emit }) {
    const formRef = ref(null)

    const rules = {
      name_cn: [{ required: true }, { validator: formValidate('nameZh'), trigger: 'blur' }],
      name: [{ required: true }, { validator: formValidate('npm'), trigger: 'blur' }],
      registry: [{ required: true, message: '必填', trigger: 'blur' }],
      version: [{ required: true }, { validator: formValidate('version'), trigger: 'blur' }],
      versionDes: [{ required: true, message: '必填', trigger: 'blur' }]
    }

    const state = reactive({
      boxVisibility: false,
      formData: {
        name: '',
        name_cn: '',
        registry: '',
        description: '',
        image: '',
        isOfficial: true,
        isDefault: true,
        public: 1,
        public_scope_tenants: [],
        version: '',
        versionDes: '',
        image_name: ''
      }
    })

    const getImgData = (imgData) => {
      state.formData.image = imgData.image.split(',')[1]
      state.formData.image_name = imgData.image_name
    }

    const createEcology = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          const params = { ...state.formData }

          delete params.versionDes

          params.versions = [
            {
              version: state.formData.version,
              description: state.formData.versionDes
            }
          ]

          emit('create', params)
          emit('cancel')
        }
      })
    }

    const tenants = computed(() => user.current.tenants)

    const publicChange = (value) => {
      if (value !== 2) {
        state.formData.public_scope_tenants = []
      }
    }

    watch(
      () => props.visible,
      (value) => {
        state.boxVisibility = value
      }
    )

    return {
      rules,
      state,
      formRef,
      createEcology,
      publicChange,
      tenants,
      ACTION_ID,
      getImgData
    }
  }
}
</script>
<style lang="less" scoped>
:deep(.tiny-dialog-box__body) {
  height: 500px;
  overflow: auto;
  .tiny-form .tiny-form-item {
    margin-bottom: 20px;
    .tiny-form-item__label {
      padding-left: 0;
    }
  }
}
:deep(.tiny-form--label-left.label-align .tiny-form-item.is-required ~ .tiny-form-item .tiny-form-item__label) {
  padding-left: 0;
}
:deep(.tiny-dialog-box__footer) {
  padding: 0 30px 24px;
}
:deep(.tiny-textarea .tiny-input__count) {
  width: 20px;
}
</style>
