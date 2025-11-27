<template>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :title="title"
    append-to-body
    width="700px"
    top="100px"
    :close-on-click-modal="false"
    @closed="closeDialog"
  >
    <div class="material-create-dialog">
      <tiny-form
        ref="ruleForm"
        :model="state.createData"
        :disabled="false"
        :rules="state.rules"
        label-width="130px"
        :label-align="true"
        label-position="left"
        class="material-create-general-form"
        validate-type="text"
      >
        <div class="mymaterial-content-basicConfig">
          <tiny-alert v-if="state.errorInfo" type="error" :description="state.errorInfo"></tiny-alert>
          <tiny-form-item label="物料包中文名" prop="name_cn">
            <tiny-input v-model="state.createData.name_cn" placeholder="请输入"></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="物料包英文名" prop="name">
            <tiny-input
              v-model="state.createData.name"
              maxlength="50"
              :disabled="isEdit"
              placeholder="以小写字母开头，只能包含小写字母、数字、中划线"
            ></tiny-input>
          </tiny-form-item>
          <tiny-form-item label="选择技术栈" prop="framework">
            <tiny-button-group
              v-model="state.createData.framework"
              :data="framework"
              :text-field="textField"
            ></tiny-button-group>
          </tiny-form-item>
          <tiny-form-item label="物料包描述">
            <tiny-input
              v-model="state.createData.description"
              type="text"
              maxlength="100"
              show-word-limit
              placeholder="请输入"
            >
            </tiny-input>
          </tiny-form-item>

          <tiny-form-item label="预览图片">
            <select-img v-model="state.createData.image_url" type="myMaterial" maxlength="350" placeholder="请输入">
            </select-img>
          </tiny-form-item>
          <tiny-form-item label="业务分类" prop="business_categories">
            <tiny-checkbox-group v-model="state.createData.business_categories">
              <tiny-checkbox
                v-for="item in state.typeList"
                :key="item.name"
                :label="item.id"
                :text="item.name"
              ></tiny-checkbox>
            </tiny-checkbox-group>
          </tiny-form-item>
          <tiny-form-item v-if="isAdmin" label="标识官方物料">
            <tiny-radio v-model="state.createData.isOfficial" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.createData.isOfficial" :label="false">否</tiny-radio>
          </tiny-form-item>
          <tiny-form-item v-if="isAdmin" label="标识默认物料">
            <tiny-radio v-model="state.createData.isDefault" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.createData.isDefault" :label="false">否</tiny-radio>
          </tiny-form-item>
          <tiny-form-item label="公开范围">
            <div style="display: flex">
              <tiny-radio-group
                v-model="state.createData.public"
                :options="[
                  { label: 0, text: '私有' },
                  { label: 1, text: '公开' },
                  { label: 2, text: '半公开' }
                ]"
                @change="publicChange"
              ></tiny-radio-group>
              <tiny-select
                v-if="state.createData.public === 2"
                v-model="state.createData.public_scope_tenants"
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
        </div>
      </tiny-form>
    </div>
    <template #footer>
      <tiny-button type="primary" :disabled="!isFinished" @click="save('createData')">创建</tiny-button>
      <tiny-button @click="closeDialog">取 消</tiny-button>
    </template>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Button,
  ButtonGroup,
  DialogBox,
  Select,
  Input,
  Form,
  FormItem,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Alert
} from '@opentiny/vue'
import { framework, formValidate } from 'lowcode-design-controller/utils'
import SelectImg from '@/common/components/SelectImg.vue'
import { user, useModal, isAdmin } from 'lowcode-design-controller'
import { fetchMaterial, fetchBusinessCategory } from '../http'

export default {
  components: {
    TinyButton: Button,
    TinyButtonGroup: ButtonGroup,
    TinyDialogBox: DialogBox,
    TinyRadioGroup: RadioGroup,
    TinySelect: Select,
    TinyInput: Input,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyRadio: Radio,
    TinyCheckbox: Checkbox,
    TinyCheckboxGroup: CheckboxGroup,
    TinyAlert: Alert,
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
    },
    data: {
      type: Object,
      default: () => ({})
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    errInfo: {
      type: String,
      default: ''
    }
  },
  emits: ['cancel', 'save'],
  setup(props, { emit }) {
    const ruleForm = ref(null)
    const textField = ref('label')
    const tenants = computed(() => user.current.tenants)
    const { message } = useModal()

    const state = reactive({
      boxVisibility: props.boxVisibility,
      createData: {
        name: props.data.name || '',
        name_cn: props.data.name_cn || '',
        framework: 'Vue',
        description: props.data.description || '',
        image_url: props.data.image_url || '',
        public: props.data.public || 1,
        public_scope_tenants: props.data.public_scope_tenants?.map((item) => item.id) || [],
        isOfficial: props.data.isOfficial || false,
        isDefault: props.data.isDefault || false,
        business_categories: props.data.business_categories || []
      },
      isValidate: true,
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('material'), trigger: 'blur' }
        ],
        name_cn: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('nameZh'), trigger: 'blur' }
        ],
        framework: [{ required: true, message: '必填', trigger: 'blur' }],
        business_categories: [{ required: true, message: '必选', trigger: 'blur' }]
      },
      typeList: [],
      errorInfo: props.errInfo,
      timer: null
    })

    const isFinished = computed(() => {
      const keyList = ['name', 'name_cn', 'framework', 'business_categories']

      return keyList.every((key) => Boolean(state.createData[key]?.length))
    })

    const closeDialog = () => {
      if (!props.isEdit) {
        state.createData.image_url = ''
      }
      emit('cancel')
    }

    const save = () => {
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          const params = { ...state.createData }

          const data = await fetchMaterial()

          if (
            data.find((item) => {
              return item.name === state.createData.name
            })
          ) {
            state.errorInfo = '英文名称重复，请重新输入'
            setTimeout(() => {
              state.errorInfo = ''
            }, 5000)
          } else {
            emit('save', params)
          }
        }
      })
    }

    const publicChange = (value) => {
      if (value !== 2) {
        state.createData.public_scope_tenants = []
      }
    }

    const getAppTypeList = () => {
      fetchBusinessCategory()
        .then((data) => {
          state.typeList = data
          state.createData.business_categories = [data[0].id]
        })
        .catch((error) => {
          message({
            message: `获取业务分类列表失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    watch(
      () => props.errInfo,
      () => {
        state.errorInfo = props.errInfo
        state.timer = setTimeout(() => {
          state.errorInfo = ''
        }, 5000)
      },
      { immediate: true }
    )

    watch(
      () => props.boxVisibility,
      (value) => {
        state.boxVisibility = value
      }
    )

    watch(
      () => props.data,
      (value) => {
        state.createData = { ...value, public_scope_tenants: value.public_scope_tenants?.map((item) => item.id) || [] }
      }
    )

    onMounted(() => {
      getAppTypeList()
    })

    onUnmounted(() => {
      clearTimeout(state.timer)
      state.timer = null
    })

    return {
      state,
      framework,
      ruleForm,
      textField,
      isFinished,
      closeDialog,
      save,
      tenants,
      publicChange,
      isAdmin
    }
  }
}
</script>

<style lang="less" scoped>
.material-create-dialog {
  width: 100%;
  height: 100%;
  :deep(.tiny-button-group) {
    .tiny-group-item li {
      width: 125px;
      margin: 0;
      button {
        width: 125px;
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
      }
    }
  }
}
:deep(.tiny-form--label-left.label-align .tiny-form-item.is-required .tiny-form-item__label) {
  padding-left: 0;
  margin-right: 0;
}
:deep(.tiny-form--label-left.label-align .tiny-form-item.is-required ~ .tiny-form-item .tiny-form-item__label) {
  padding-left: 0;
}
:deep(.tiny-dialog-box .tiny-dialog-box__footer) {
  padding: 0 10px 20px;
}
</style>
