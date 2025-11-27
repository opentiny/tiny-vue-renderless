<template>
  <tiny-form
    ref="componentForm"
    label-width="130px"
    label-position="left"
    validate-type="text"
    validate-position="bottom-start"
    :model="componentData"
    :rules="rules"
  >
    <tiny-row>
      <tiny-col :span="6">
        <tiny-form-item label="组件ID" prop="component">
          <tiny-input
            v-model="componentData.component"
            @change="changeSnippets({ prop: 'snippetName', value: $event })"
          ></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="组件名称" prop="name.zh_CN">
          <tiny-input
            v-model="componentData.name.zh_CN"
            @change="changeSnippets({ prop: 'name', value: $event })"
          ></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="图标" prop="icon">
          <tiny-input
            v-model="componentData.icon"
            @change="changeSnippets({ prop: 'icon', value: $event })"
          ></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <template v-if="!inLib">
        <tiny-col :span="6">
          <tiny-form-item label="缩略图" prop="screenshot">
            <tiny-input
              v-model="componentData.screenshot"
              @change="changeSnippets({ prop: 'screenshot', value: $event })"
            ></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="描述">
            <tiny-input v-model="componentData.description"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="版本号" prop="npm.version">
            <tiny-input v-model="componentData.npm.version"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="技术栈">
            <tiny-select v-model="componentData.configure.framework" :options="framework"></tiny-select>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="文档链接">
            <tiny-input v-model="componentData.docUrl"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="组件标签">
            <tiny-input v-model="componentData.tags" placeholder="请输入标签，以逗号分隔"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="标识成官方组件">
            <tiny-radio v-model="componentData.isOfficial" :label="true">是</tiny-radio>
            <tiny-radio v-model="componentData.isOfficial" :label="false">否</tiny-radio>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="公开范围">
            <div style="display: flex">
              <tiny-radio-group
                v-model="componentData.public"
                :options="[
                  { label: 0, text: '私有' },
                  { label: 1, text: '公开' },
                  { label: 2, text: '半公开' }
                ]"
                @change="publicChange"
              ></tiny-radio-group>
              <tiny-select
                v-if="componentData.public === 2"
                v-model="componentData.public_scope_tenants"
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
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="标识成默认组件">
            <tiny-radio v-model="componentData.isDefault" :label="true">是</tiny-radio>
            <tiny-radio v-model="componentData.isDefault" :label="false">否</tiny-radio>
          </tiny-form-item>
        </tiny-col>
      </template>
      <tiny-col :span="6">
        <tiny-form-item label="schema片段" prop="snippets">
          <tiny-button @click="openDrawer">编辑schema</tiny-button>
          <tiny-drawer width="600px" :visible="isVisible" @update:visible="isVisible = $event">
            <template #header>
              <div class="schema-header">
                <p class="schema-titie">编辑schema</p>
                <a class="import-protocal" :href="protocalUrl" target="_blank">查看用户协议</a>
              </div>
            </template>
            <div class="material-import-monao">
              <monaco-editor
                ref="snippetsEditor"
                style="height: 100%"
                :options="monacoOptions"
                :value="JSON.stringify(componentData.snippets, null, 2)"
              />
            </div>
          </tiny-drawer>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="12">
        <tiny-form-item label="组件属性">
          <attrs
            :key="componentData.id"
            v-model="componentData.schema"
            v-model:metadata="componentData.component_metadata"
          ></attrs>
        </tiny-form-item>
      </tiny-col>
    </tiny-row>
  </tiny-form>
</template>

<script>
import { Form, FormItem, Input, Radio, Row, Col, Select, RadioGroup, Button, Drawer } from '@opentiny/vue'
import { computed, ref } from 'vue'
import { useModal, user } from 'lowcode-design-controller'
import { formValidate, framework, SESSION_STORAGE } from 'lowcode-design-controller/utils'
import useComponent from './js/useComponent'
import MonacoEditor from '@/common/components/VueMonaco'
import Attrs from './componentAttrs.vue'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyRadioGroup: RadioGroup,
    TinyRow: Row,
    TinyCol: Col,
    TinyRadio: Radio,
    TinySelect: Select,
    TinyButton: Button,
    TinyDrawer: Drawer,
    MonacoEditor,
    Attrs
  },
  props: {
    inLib: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { componentData } = useComponent()
    const snippetsEditor = ref(null)
    const componentForm = ref(null)
    const fullscreen = ref(false)
    const isVisible = ref(false)
    const { message } = useModal()
    const monacoOptions = {
      roundedSelection: true,
      automaticLayout: true,
      autoIndent: true,
      language: 'json',
      formatOnPaste: true,
      tabSize: 2,
      theme: 'vs',
      lineNumbers: 'off'
    }

    const protocalUrl = import.meta.env.MODE?.includes('open')
      ? `${import.meta.env.VITE_APP_ORIGIN}/tiny-engine#/protocol/material`
      : `${import.meta.env.VITE_APP_ORIGIN}/platform-center/#/protocol/material`

    const rules = {
      'name.zh_CN': [{ required: true, message: '必填', trigger: 'blur' }],
      icon: [{ required: true, message: '必填', trigger: 'blur' }],
      screenshot: [{ required: true, message: '必填', trigger: 'blur' }],
      component: [
        { required: true, message: '必填', trigger: 'blur' },
        { validator: formValidate('componentId'), trigger: 'blur' }
      ],
      'npm.version': [
        { required: true, message: '必填', trigger: 'blur' },
        { validator: formValidate('version'), trigger: 'blur' }
      ],
      snippets: [{ required: true, trigger: 'blur' }]
    }

    const tenants = computed(() => user.current.tenants)

    const openDrawer = () => {
      isVisible.value = true
    }

    const publicChange = (value) => {
      if (value !== 2) {
        componentData.value.public_scope_tenants = []
      }
    }

    const validate = () => new Promise(componentForm.value.validate)

    const changeSnippets = ({ prop, value }) => {
      try {
        const component = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.component))

        if (component) {
          return
        }

        const snippet = componentData.value.snippets?.[0] || {}

        if (prop === 'name') {
          snippet.name = snippet.name || {}
          snippet.name.zh_CN = value
        } else {
          snippet[prop] = value
        }

        componentData.value.snippets[0] = snippet
      } catch {
        message({ message: '组件格式错误' })
      }
    }
    const getSnippets = () => snippetsEditor.value?.getEditor().getValue()

    return {
      rules,
      componentData,
      tenants,
      componentForm,
      publicChange,
      validate,
      changeSnippets,
      framework,
      fullscreen,
      protocalUrl,
      snippetsEditor,
      getSnippets,
      monacoOptions,
      MonacoEditor,
      openDrawer,
      isVisible
    }
  }
}
</script>
<style lang="less" scoped>
.tiny-form {
  height: 530px;
  overflow-y: auto;
}
.tiny-input {
  width: 70%;
}
.tiny-select {
  width: 70%;
}
.import-protocal {
  display: block;
  margin: 4px 0;
  font-size: 12px;
  color: #526ecc;
}

.schema-header {
  display: flex;
  border-bottom: 1px solid #dfe1e6;
  .schema-titie {
    font-size: 20px;
    color: #191919;
    font-weight: bold;
    margin-right: 20px;
  }
  .import-protocal {
    font-size: 12px;
    color: #191919;
    font-weight: normal;
    text-decoration: underline;
    margin-top: 22px;
  }
}
.material-import-monao {
  margin-top: 12px;
  position: relative;
  height: 280px;
}
.buttons {
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  font-size: 18px;
  z-index: 2;
  .svg-icon {
    fill: #252b3a;
  }
  &.full {
    position: fixed;
    top: 108px;
    z-index: 10;
    left: calc(100% - 60px);
  }
}
.iniline {
  height: 100%;
  width: 100%;
}
.fullscreen {
  position: fixed;
  top: 107px;
  left: 200px;
  right: 20px;
  z-index: 9;
}

:deep(.tiny-drawer .tiny-drawer__main .tiny-drawer__box .tiny-drawer__body) {
  margin-left: 6px;
}
:deep(.tiny-drawer__header-wrapper) {
  padding: 10px 30px 0;
}
:deep(.col-xl-12) {
  width: 88%;
  height: auto;
}
:deep(.tiny-tabs__content) {
  padding: 20px 0 0;
}
</style>
