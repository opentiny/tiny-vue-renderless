<template>
  <div class="platform-setting-base">
    <div class="meta">
      <div class="title">基本属性</div>
      <tiny-form
        ref="ruleForm"
        :rules="state.rules"
        :model="state.meta"
        :disabled="false"
        label-position="left"
        label-width="110px"
      >
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item label="设计器名称" prop="name">
              <tiny-input v-model="state.meta.name" :disabled="true"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="设计器描述">
              <tiny-input v-model="state.meta.description"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="组织名称">
              <tiny-input v-model="state.meta.tenant"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="创建者">
              <tiny-input v-model="state.meta.createdBy" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="创建时间">
              <tiny-input v-model="state.meta.created_at" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="修改时间">
              <tiny-input v-model="state.meta.updated_at" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="应用缩略图">
              <select-img v-model="state.meta.image_url" type="myPlatform"></select-img>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
      </tiny-form>
    </div>
    <div :class="['config', { heights: isOpen }]">
      <div class="title">代码风格配置</div>
      <div class="config-content">
        <div class="config-example-box">
          <div class="config-tip">Prettier 统一代码风格，配置示例如下</div>
          <div :class="['config-toggle', { active: isOpen }]" @click="toggle">
            <span>{{ isOpen ? '收起' : '打开' }}</span>
          </div>
        </div>
        <div v-if="isOpen" class="config-example">
          <div>{</div>
          <div class="config-example-item">"printWidth": 120,</div>
          <div class="config-example-item">"semi": false,</div>
          <div class="config-example-item">"singleQuote": true,</div>
          <div class="config-example-item">
            "trailingComma":
            <span class="config-example-item-spec">"none"</span>
          </div>
          <div>}</div>
        </div>
        <div class="config-tip">未配置时，会自动使用如上默认配置（非必填）</div>
        <div class="develop-config">
          <monaco-editor
            ref="schemaEditor"
            style="height: 100%"
            language="json"
            :options="monacoOptions"
            :value="JSON.stringify(state.meta.prettier_opts, null, 2)"
          />
        </div>
      </div>
    </div>
    <div class="save">
      <tiny-button type="primary" native-type="submit" @click="updatePlatform">保存</tiny-button>
    </div>
  </div>
</template>

<script lang="jsx">
import { Form, FormItem, Input, Button, Row, Col, Notify } from '@opentiny/vue'
import { format } from '@opentiny/vue-renderless/common/date'
import { reactive, ref } from 'vue'
import MonacoEditor from '@/common/components/VueMonaco'
import { requestUpdatePlatform } from './http'
import { LOCAL_STORAGE, SESSION_STORAGE, formValidate } from 'lowcode-design-controller/utils'
import SelectImg from '../common/components/SelectImg.vue'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyRow: Row,
    TinyCol: Col,
    SelectImg,
    MonacoEditor
  },
  setup() {
    const isOpen = ref(true)
    const ruleForm = ref(null)
    const schemaEditor = ref(null)
    const platformSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.platformSetting))
    const platformLocalSetting = JSON.parse(localStorage.getItem(LOCAL_STORAGE.tenant))
    const monacoOptions = {
      roundedSelection: true,
      automaticLayout: true,
      autoIndent: true,
      formatOnPaste: true,
      tabSize: 2,
      theme: 'vs-dark'
    }

    const state = reactive({
      meta: {
        id: platformSetting?.id,
        name: platformSetting?.name,
        tenant: platformLocalSetting?.tenant_id,
        description: platformSetting?.description,
        createdBy: platformSetting?.createdBy?.username,
        created_at: platformSetting?.created_at && format(new Date(platformSetting.created_at)),
        updated_at: platformSetting?.updated_at && format(new Date(platformSetting.updated_at)),
        image_url: platformSetting.image_url || '',
        prettier_opts: platformSetting.prettier_opts || {}
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('nameZh'), trigger: 'blur' }
        ]
      }
    })
    const toggle = () => {
      isOpen.value = !isOpen.value
    }
    const updatePlatform = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          try {
            state.meta.prettier_opts = JSON.parse(schemaEditor.value?.getEditor().getValue())
          } catch (error) {
            Notify({
              message: '请输入正确的格式',
              type: 'error',
              position: 'top-right'
            })

            return
          }
          const params = {
            id: state.meta.id,
            name: state.meta.name,
            description: state.meta.description,
            image_url: state.meta.image_url
          }

          if (state.meta.prettier_opts && state.meta.prettier_opts !== '{}') {
            Object.assign(params, { prettier_opts: state.meta.prettier_opts })
          }

          requestUpdatePlatform(params)
            .then((data) => {
              sessionStorage.setItem(SESSION_STORAGE.platformSetting, JSON.stringify(data))
              Notify({
                message: '保存成功',
                type: 'success',
                position: 'top-right'
              })
            })
            .catch((error) => {
              Notify({
                message: `设计器设置失败: ${error.message || error}`,
                type: 'error',
                position: 'top-right'
              })
            })
        }
      })
    }

    return {
      state,
      ruleForm,
      updatePlatform,
      monacoOptions,
      schemaEditor,
      toggle,
      isOpen
    }
  }
}
</script>

<style lang="less" scoped>
.platform-setting-base {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .meta,
  .config,
  .save {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    padding: 20px 30px;
  }
  .meta {
    height: 330px;
    margin-bottom: 18px;
    border-radius: 8px;
  }
  .config {
    height: calc(100% - 560px);
    border-radius: 8px;
    &.heights {
      height: calc(100% - 350px);
    }
  }

  .save {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 70px;
    display: flex;
    align-items: center;
    padding-left: 44px;
    box-sizing: border-box;
    z-index: 10;
  }
  .title {
    font-size: 16px;
    font-weight: Bold;
    color: #252b3a;
    line-height: 24px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    margin-bottom: 16px;
  }
  :deep(.tiny-form-item__label) {
    font-size: 12px;
  }
  :deep(.col-xs-6.col-sm-6.col-md-6.col-lg-6.col-xl-6.tiny-col) {
    padding: 0;
  }
  :deep(.tiny-form--label-left.has-required .tiny-form-item__label) {
    padding-left: 0;
  }
  :deep(.tiny-form-item) {
    margin-bottom: 16px;
  }
  :deep(.tiny-input) {
    width: 65%;
    height: 28px;
  }
  :deep(.tiny-input__inner) {
    border-radius: 6px;
  }
  .config-content {
    height: 90%;
    overflow-y: scroll;
  }
  .config-example {
    padding: 14px 20px;
    margin-bottom: 10px;
    background: #f5f2f0;
    color: #905;
    border-radius: 8px;
    font-size: 12px;
    &-item {
      margin: 5px 0 5px 10px;
      &-spec {
        color: #690;
      }
    }
  }
  .config-tip {
    margin: 0 8px 8px 0;
    font-size: 12px;
    color: #595959;
  }
  .config-example-box {
    display: flex;
    justify-content: start;
    .config-tip {
      margin: 0 8px 8px 0;
      font-size: 12px;
      color: #595959;
    }
    .config-toggle {
      cursor: pointer;
      font-size: 12px;
      color: #333;
      ::after {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-top: 1px solid #656565;
        border-left: 1px solid #656565;
        transform: rotate(45deg);
        margin: 0 0 -2px 4px;
      }
      &.active {
        ::after {
          transform: rotate(222deg);
          margin: 0 0 2px 3px;
        }
      }
    }
  }
  .develop-config {
    height: 140px;
    border-radius: 8px;

    :deep(.monaco-editor) {
      border-radius: 8px;
    }
  }

  :deep(.overflow-guard) {
    border-radius: 8px;
  }
  :deep(.tiny-button.tiny-button--primary) {
    border-radius: 16px;
    background-color: #191919;
    width: 96px;
    height: 30px;
    color: #fff;
    border: 0;
  }
}
</style>
