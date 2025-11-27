<template>
  <div class="material-import-title-wrap" @click="cancelCreate">
    <icon-chevron-left class="material-import-icon"></icon-chevron-left>
    <span class="material-import-title">发布区块</span>
  </div>
  <div class="material-import-setting">
    <tiny-alert
      v-if="state.formData.occupier && state.userId !== state.formData.occupier.id"
      type="warning"
      :description="`区块已被“${state.formData.occupier.username}”上锁，请联系该用户解锁。`"
    ></tiny-alert>
    <tiny-alert
      v-if="state.formData.occupier && state.userId === state.formData.occupier.id"
      type="warning"
      description="区块已上锁。"
    ></tiny-alert>
    <tiny-alert
      v-if="state.formData.id && !state.formData.occupier"
      type="info"
      description="区块已解锁。"
    ></tiny-alert>
    <tiny-form
      ref="ruleForm"
      label-width="120px"
      :label-align="true"
      label-position="left"
      :rules="rules"
      :model="state.formData"
    >
      <tiny-row>
        <tiny-col :span="6">
          <tiny-form-item prop="label">
            <template #label>
              区块ID
              <tiny-tooltip class="item" effect="dark" content="用来区分唯一性" placement="top">
                <icon-help-circle title="用来区分唯一性" class="icon-help"></icon-help-circle>
              </tiny-tooltip>
            </template>
            <tiny-input v-model="state.formData.label"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item prop="name_cn">
            <template #label>
              区块名称
              <tiny-tooltip class="item" effect="dark" content="用来展示区块名称" placement="top-start">
                <icon-help-circle title="用来展示区块名称" class="icon-help"></icon-help-circle>
              </tiny-tooltip>
            </template>
            <tiny-input v-model="state.formData.name_cn"></tiny-input>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
      <tiny-row>
        <tiny-col :span="6">
          <tiny-form-item label="描述">
            <tiny-input v-model="state.formData.description"></tiny-input>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="技术栈">
            <tiny-select v-model="state.formData.framework" placeholder="请选择" :options="framework"> </tiny-select>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
      <tiny-row>
        <tiny-col :span="6">
          <tiny-form-item label="标签">
            <div class="tagBody">
              <tiny-tag
                v-for="(tag, index) in state.formData.tags"
                :key="index"
                closable
                class="tag-button"
                @close="deleteTag(tag)"
              >
                <span :title="tag" class="tag-item-text">{{ tag }}</span>
              </tiny-tag>
              <tiny-input
                v-show="state.inputVisible"
                ref="saveTagInput"
                v-model="state.inputTagValue"
                class="add-tag-input"
                size="small"
                @keyup.enter="confirmTagInput"
                @blur="confirmTagInput"
              >
              </tiny-input>
              <tiny-button v-show="!state.inputVisible" class="button-new-tag" size="small" @click="addTag">
                + 标签
              </tiny-button>
            </div>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="官方">
            <tiny-radio v-model="state.formData.isOfficial" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.formData.isOfficial" :label="false">否</tiny-radio>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
      <tiny-row>
        <tiny-col :span="6">
          <tiny-form-item label="默认">
            <tiny-radio v-model="state.formData.isDefault" :label="true">是</tiny-radio>
            <tiny-radio v-model="state.formData.isDefault" :label="false">否</tiny-radio>
          </tiny-form-item>
        </tiny-col>
        <tiny-col :span="6">
          <tiny-form-item label="公开">
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
                placeholder="选择租户"
                collapse-tags
                text-field="tenant_id"
                value-field="id"
                :options="tenants"
              ></tiny-select>
            </div>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
      <tiny-row>
        <tiny-col :span="12">
          <tiny-form-item label="content">
            <div class="material-import-monao">
              <monaco-editor
                ref="monacoEditor"
                style="height: 100%"
                :options="monacoOptions"
                :value="JSON.stringify(state.formData.content, null, 2)"
              />
            </div>
          </tiny-form-item>
        </tiny-col>
      </tiny-row>
    </tiny-form>
    <div class="label-icon">
      <tiny-tooltip class="item" effect="dark" content="点击此按钮解锁" placement="top-start">
        <icon-lock
          v-if="state.formData.occupier"
          class="tiny-svg-size icon-lock"
          @click="lockBlock(state.release)"
        ></icon-lock>
      </tiny-tooltip>
      <tiny-tooltip class="item" effect="dark" content="点击此按钮上锁" placement="top-start">
        <icon-unlock
          v-if="state.formData.id && !state.formData.occupier"
          class="tiny-svg-size icon-unlock"
          @click="lockBlock(state.occupy)"
        ></icon-unlock>
      </tiny-tooltip>
    </div>
  </div>

  <div class="footer">
    <tiny-button type="primary" @click="createBlock">确 定</tiny-button>
    <tiny-button @click="cancelCreate">取 消</tiny-button>
  </div>
</template>

<script>
import { reactive, ref, computed, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { user, useModal } from 'lowcode-design-controller'
import MonacoEditor from '@/common/components/VueMonaco'
import { Button, Form, FormItem, Input, Select, Tag, Row, Col, Alert, Tooltip, RadioGroup, Radio } from '@opentiny/vue'
import { requestCreateBlock, requestUpdateBlock, fetchLock, fetchBlocksById } from '../http'
import { IconLock, IconUnlock, IconHelpCircle } from '@opentiny/vue-icon'
import { SESSION_STORAGE, framework, formValidate } from 'lowcode-design-controller/utils'

export default {
  components: {
    TinyButton: Button,
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinySelect: Select,
    TinyRow: Row,
    TinyCol: Col,
    TinyAlert: Alert,
    TinyRadioGroup: RadioGroup,
    TinyTooltip: Tooltip,
    TinyRadio: Radio,
    TinyTag: Tag,
    IconLock: IconLock(),
    IconUnlock: IconUnlock(),
    IconHelpCircle: IconHelpCircle(),
    MonacoEditor
  },
  setup() {
    const { message } = useModal()
    const router = useRouter()
    const monacoEditor = ref(null)
    const block = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.block))
    const userId = user.current.id
    const isUpdate = 'isUpdate'
    const ruleForm = ref(null)
    const saveTagInput = ref(null)

    if (block) {
      block.public_scope_tenants = block.public_scope_tenants?.map(({ id }) => id) || []
    }

    const rules = {
      label: [{ required: true }, { validator: formValidate('componentId') }],
      name_cn: [{ required: true }, { validator: formValidate('nameZh') }]
    }

    const monacoOptions = {
      roundedSelection: true,
      automaticLayout: true,
      autoIndent: true,
      language: 'json',
      formatOnPaste: true,
      tabSize: 2,
      theme: 'vs-dark'
    }

    const tenants = computed(() => user.current.tenants)

    const state = reactive({
      formData: block || {
        label: '',
        name_cn: '',
        screenshot: '',
        framework: 'Vue',
        description: '',
        tags: [],
        version: '',
        content: {},
        public: 1,
        public_scope_tenants: [],
        isOfficial: true,
        isDefault: true
      },
      userId: userId,
      type: 'block',
      occupy: 'occupy',
      release: 'release',
      inputTagValue: ''
    })

    const createRequest = () => {
      const fn = block ? requestUpdateBlock : requestCreateBlock
      const formDataCopy = JSON.parse(JSON.stringify(state.formData))

      if (!Object.keys(formDataCopy.content)?.length && block) {
        delete formDataCopy.content
      }
      fn(formDataCopy)
        .then(() => {
          if (block) {
            lockBlock(state.release, isUpdate)
          } else {
            router.push({
              name: 'ecosystemMaterial',
              params: { activeName: 'allBlock' }
            })
          }
        })
        .catch((error) => {
          if (block) {
            getBlocksById(state.formData.id)
          }

          message({
            message: `${block ? '区块更新失败' : '区块录入失败'}: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const validate = () => new Promise(ruleForm.value.validate)

    const createBlock = async () => {
      if (block && !state.formData.occupier) {
        message({ message: '区块未上锁，请上锁后再录入。', status: 'warning' })

        return
      }

      if (block && state.formData.occupier && state.userId !== state.formData.occupier.id) {
        message({ message: `区块已被“${state.formData.occupier.username}”上锁，请联系该用户解锁。`, status: 'warning' })

        return
      }

      const valid = await validate()

      if (valid) {
        state.formData.tags = state.formData.tags?.split ? state.formData.tags.split(/,\s*|\s+/) : state.formData.tags

        try {
          const content = monacoEditor.value?.getEditor().getValue()

          state.formData.content = (content && JSON.parse(content)) || {}
          createRequest()
        } catch {
          const editor = monacoEditor.value?.getEditor()
          const model = editor.getModel()
          const markers = monacoEditor.value?.getModelMarkers(model)

          message({ message: `content字段有语法错误: ${markers[0]?.message || ''}`, status: 'error' })
        }
      }
    }

    const cancelCreate = () => {
      if (block) {
        lockBlock(state.release, isUpdate)
        router.push({
          name: 'ecosystemMaterial',
          params: { activeName: 'allBlock' }
        })
      } else {
        router.push({
          name: 'ecosystemMaterial',
          params: { activeName: 'allBlock' }
        })
      }
    }

    const lockBlock = (data, finish) => {
      if (!finish && state.formData.occupier && state.userId !== state.formData.occupier.id) {
        message({ message: `区块已被“${state.formData.occupier.username}”上锁，请联系该用户解锁。`, status: 'warning' })

        return
      }

      const params = {
        id: state.formData.id,
        state: data,
        type: state.type
      }

      fetchLock(params)
        .then((data) => {
          if (finish) {
            router.push({
              name: 'ecosystemMaterial',
              params: { activeName: 'allBlock' }
            })
          } else {
            state.formData.occupier = data.occupier
            sessionStorage.setItem(SESSION_STORAGE.block, JSON.stringify(state.formData))
          }
        })
        .catch((error) => {
          message({
            message: `${data === state.occupy ? '上锁' : '解锁'}失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const getBlocksById = (id) => {
      fetchBlocksById(id).then((data) => {
        state.formData = data[0]
        sessionStorage.setItem(SESSION_STORAGE.block, JSON.stringify(state.formData))
      })
    }

    const publicChange = (value) => {
      if (value !== 2) {
        state.formData.public_scope_tenants = []
      }
    }

    const deleteTag = (tag) => {
      const index = state.formData.tags.findIndex((item) => item === tag)

      state.formData.tags.splice(index, 1)
    }

    const confirmTagInput = () => {
      const inputTagValue = state.inputTagValue

      if (inputTagValue) {
        state.formData.tags.push(inputTagValue)
      }

      state.inputVisible = false
      state.inputTagValue = ''
    }

    const addTag = () => {
      state.inputVisible = true

      nextTick(() => {
        saveTagInput.value.getInput().focus()
      })
    }

    return {
      monacoOptions,
      monacoEditor,
      framework,
      state,
      ruleForm,
      saveTagInput,
      rules,
      createBlock,
      cancelCreate,
      lockBlock,
      tenants,
      publicChange,
      deleteTag,
      confirmTagInput,
      addTag
    }
  }
}
</script>
<style lang="less" scoped>
.material-import-title-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: #ffffff;
  border-bottom: 1px solid #dfe1e6;
  display: flex;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  cursor: pointer;
  z-index: 10;
  .material-import-icon {
    width: 16px;
    height: 16px;
    color: rgba(0, 0, 0, 0.2);
  }
  .material-import-title {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: Bold;
    color: #252b3a;
    margin-left: 8px;
  }
}
.material-import-setting {
  margin: 52px 4px;
  width: 100%;
  background: #fff;
  border-radius: 8px;
  padding: 30px 24px 2px;
  box-sizing: border-box;
  position: relative;
  .tiny-input,
  .tiny-select {
    width: 80%;
  }
  .tiny-alert {
    margin-bottom: 20px;
  }
  .tagBody {
    width: 580px;
  }
  .tag-button {
    color: var(--ti-lowcode-block-config-tag-color);
    background-color: var(--ti-lowcode-block-config-tag-bg);
    height: 28px;
    &:hover {
      color: var(--ti-lowcode-block-config-tag-hover-color);
      background-color: var(--ti-lowcode-block-config-tag-hover-bg);
    }
    .tag-item-text {
      max-width: 280px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .tiny-button.button-new-tag {
    height: 28px;
    line-height: 20px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .add-tag-input {
    width: 90px;
    height: 22px;
    line-height: 20px;
    vertical-align: middle;
  }

  .tiny-tag {
    & + .tiny-tag,
    & + .tiny-input,
    & ~ .button-new-tag {
      margin-right: 10px;
    }
  }

  :deep(.tiny-input__inner) {
    height: 26px;
  }
  :deep(.tiny-form-item .tiny-form-item--default) {
    --ti-form-item-margin-bottom-default: 16px;
  }
}
.material-import-monao {
  height: 440px;
}
.label-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 38%;
  left: 82px;
  cursor: pointer;
  .icon-lock,
  .icon-unlock {
    font-size: 20px;
  }
  .icon-lock {
    color: #fa9841;
  }
  .icon-unlock {
    color: #2496ff;
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 62px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 34px;
  box-sizing: border-box;
  z-index: 10;
}
.icon-help {
  margin-left: 12px;
  font-size: 16px;
  fill: #191919;
  cursor: pointer;
}
</style>
