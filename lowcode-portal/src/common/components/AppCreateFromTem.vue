<template>
  <tiny-dialog-box
    v-model:visible="state.boxVisibility"
    :title="title"
    :close-on-click-modal="false"
    width="80%"
    @closed="closeDialog"
  >
    <div class="app-create-from-tem">
      <div class="app-create-from-tem-select">
        <tiny-select ref="selectRef" v-model="state.appType" placeholder="请选择" filterable :filter-method="filter">
          <tiny-option
            v-for="(item, idx) in state.templateTypeList"
            v-show="!item.filter"
            :key="idx"
            :label="item.label"
            :value="item.value"
          >
          </tiny-option>
        </tiny-select>
      </div>
      <div class="app-create-from-tem-main">
        <div class="app-create-from-tem-main-left">
          <app-template-card-list
            :data="state.templateData"
            :height="'80px'"
            @select="selectApp"
          ></app-template-card-list>
        </div>
        <div class="app-create-from-tem-main-right">
          <div class="main-right-top">
            <div class="main-right-top-content">
              <tiny-form
                ref="createDataRef"
                :model="state.createData"
                :disabled="false"
                :rules="state.rules"
                label-position="right"
                validate-type="text"
                label-width="100px"
                class="app-create-general-form"
              >
                <div class="app-content-basic-config">
                  <tiny-form-item label="应用名称" prop="name">
                    <tiny-input v-model="state.createData.name"></tiny-input>
                  </tiny-form-item>
                  <tiny-form-item label="应用描述">
                    <tiny-input v-model="state.createData.description" type="textarea" maxlength="350"> </tiny-input>
                  </tiny-form-item>
                  <tiny-form-item label="预览图片">
                    <select-img v-model="state.createData.image_url"></select-img>
                  </tiny-form-item>
                  <tiny-form-item>
                    <tiny-button type="primary" native-type="submit" @click="save">启用此模板创建</tiny-button>
                  </tiny-form-item>
                </div>
              </tiny-form>
            </div>
            <div class="main-right-top-btn"></div>
          </div>
        </div>
      </div>
    </div>
  </tiny-dialog-box>
</template>

<script>
import { reactive, watch, ref, onMounted } from 'vue'
import { DialogBox, Select, Option, Button, Input, Form, FormItem } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { appTemplateTypeList, formValidate } from 'lowcode-design-controller/utils'
import AppTemplateCardList from './AppTemplateCardList'
import SelectImg from './SelectImg.vue'
import { fetchAppTemplateList } from '../../permission/http'
import { fetchPlatformById } from '../../platform/http'

export default {
  components: {
    TinyDialogBox: DialogBox,
    TinySelect: Select,
    TinyOption: Option,
    TinyButton: Button,
    TinyInput: Input,
    TinyForm: Form,
    TinyFormItem: FormItem,
    AppTemplateCardList,
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
    platform: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['cancel', 'save'],
  setup(props, { emit }) {
    const selectRef = ref(null)
    const createDataRef = ref(null)
    const { message } = useModal()

    let options = appTemplateTypeList.slice(0)

    options.unshift({
      label: '全部',
      value: 'all'
    })

    const state = reactive({
      boxVisibility: props.boxVisibility,
      createData: {
        id: null,
        name: '',
        description: '',
        image_url: ''
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('nameZh'), trigger: 'blur' }
        ]
      },
      templateTypeList: options,
      appType: 'all',
      templateData: [],
      templateAllData: [],
      showEdit: false,
      platform: props.platform
    })

    const closeDialog = () => {
      state.createData.image_url = ''
      emit('cancel')
    }

    const save = () => {
      if (!state.createData.id) {
        message({ message: '请选择模板', status: 'info' })

        return
      }

      createDataRef.value.validate((vaild) => {
        if (vaild) {
          emit('save', state.createData)
          closeDialog()
        }
      })
    }

    const filter = (value) => {
      selectRef.value.state.cachedOptions.forEach((item) => {
        value ? (item.state.visible = item.label.indexOf(value) > -1) : (item.state.visible = true)
      })
    }

    const selectImg = (idx) => {
      state.srcList.forEach((item, index) => {
        item.selected = idx === index ? true : false
      })
    }

    const selectApp = (app) => {
      state.templateData.forEach((item) => {
        item.selected = item.id === app.id ? true : false
      })
      state.createData = { ...app }
      state.createData.name = ''
    }

    const getTemplate = () => {
      fetchPlatformById(state.platform.id)
        .then((platform) => {
          fetchAppTemplateList({ framework: platform?.material_history?.framework })
            .then((data) => {
              state.templateAllData = data.list
              state.templateData = data.list
            })
            .catch((error) => {
              message({ message: `获取模板列表失败: ${error.message || error}`, status: 'error' })
            })
        })
        .catch((error) => {
          message({ message: `获取设计器信息失败: ${error.message || error}`, status: 'error' })
        })
    }

    onMounted(getTemplate)

    watch(
      () => props.boxVisibility,
      (value) => {
        state.boxVisibility = value
      }
    )

    watch(
      () => props.data,
      (value) => {
        state.createData = value
      }
    )

    watch(
      () => state.appType,
      (value) => {
        if (value === 'all') {
          state.templateData = state.templateAllData
        } else {
          state.templateData = state.templateAllData.filter((item) => value === item.template_type)
        }
      }
    )

    return {
      state,
      selectRef,
      createDataRef,
      closeDialog,
      save,
      filter,
      selectImg,
      selectApp
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.app-create-from-tem {
  width: 100%;
  height: 100%;
  padding: 10px 0;
  &-select {
    height: 30px;
    line-height: 30px;
    width: 20%;
    margin-bottom: 20px;
  }
  &-main {
    height: 80%;
    display: flex;
    justify-content: space-around;
    &-left {
      flex: 2;
      height: 100%;
      overflow-y: scroll;
    }
    &-right {
      flex: 3;
      height: 100%;
      background: #f2f5fc;
      margin-left: 20px;
      padding: 16px 20px;
      .main-right-top {
        height: 100px;
        display: flex;
        .main-right-top-content {
          flex: 2;
          .title {
            height: 36px;
            line-height: 36px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Normal;
            font-weight: Normal;
            color: #252b3a;
          }
          .explain,
          .img-url {
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            font-family: 'Microsoft Yahei', 'Microsoft Yahei'-Normal;
            font-weight: Normal;
            color: #999999;
          }
        }
        .main-right-top-btn {
          flex: 1;
          text-align: center;
          padding-top: 2%;
        }
      }
      .main-right-img {
        width: 100%;
        height: 80%;
        .right-img {
          width: 100%;
        }
        .right-box {
          width: 100%;
          text-align: center;
          .itemBox {
            display: inline-block;
            width: 20px;
            height: 4px;
            background: #c2c5cd;
            margin-right: 10px;
            cursor: pointer;
          }
          .active {
            background: #5e7ce0;
          }
        }
      }
    }
  }
}
:deep(.tiny-dialog-box) {
  height: 640px;
}
:deep(.tiny-dialog-box__body) {
  height: 96%;
}
:deep(.tiny-button) {
  width: 60%;
  max-width: 260px;
}
</style>
