<template>
  <div class="application-setting-base">
    <div class="meta">
      <div class="title">基本属性</div>
      <tiny-form
        ref="ruleForm"
        :rules="state.rules"
        :model="state.meta"
        :disabled="false"
        label-position="left"
        label-width="95px"
        hide-required-asterisk="true"
      >
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item prop="name">
              <template #label>应用名称 <i class="require-star">*</i></template>
              <tiny-input v-model="state.meta.name"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="应用ID">
              <tiny-input v-model="state.meta.id" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="应用描述">
              <tiny-input v-model="state.meta.description"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="创建者">
              <tiny-input v-model="state.meta.createdBy" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="所属设计器">
              <tiny-input v-model="state.meta.platform" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="所属组织">
              <tiny-input v-model="state.meta.tenant" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="Git仓库分组">
              <tiny-input v-model="state.meta.gitGroup"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item prop="projectUrl">
              <template #label>
                <span>Git仓库地址</span>
              </template>
              <tiny-input v-model="state.meta.projectUrl" placeholder="https://">
                <template #append>
                  <tiny-link
                    v-if="state.downloadLink"
                    :underline="false"
                    type="primary"
                    download
                    :href="state.downloadLink"
                  >
                    应用发布包下载
                  </tiny-link>
                </template>
              </tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item>
              <template #label>
                <span>默认提交分支</span>
              </template>
              <tiny-input v-model="state.meta.branch"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item prop="visitUrl">
              <template #label>
                <span>访问地址</span>
              </template>
              <tiny-input v-model="state.meta.visitUrl" placeholder="https://"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="创建时间">
              <tiny-input v-model="state.meta.createdAt" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="修改时间">
              <tiny-input v-model="state.meta.updatedAt" disabled></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="应用缩略图">
              <select-img v-model="state.meta.image_url"></select-img>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
      </tiny-form>
    </div>
    <div class="config">
      <div class="title">访问地址设置</div>
      <tiny-form :rules="state.rules" :model="state.config" :disabled="false" label-position="left" label-width="128px">
        <tiny-row>
          <tiny-col :span="6">
            <tiny-form-item label="SDK版本">
              <tiny-input v-model="state.config.sdkVersion"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="路由历史模式">
              <tiny-input v-model="state.config.historyMode"></tiny-input>
            </tiny-form-item>
          </tiny-col>
          <tiny-col :span="6">
            <tiny-form-item label="目标根节点ID">
              <tiny-input v-model="state.config.targetRootID"></tiny-input>
            </tiny-form-item>
          </tiny-col>
        </tiny-row>
      </tiny-form>
    </div>
  </div>
  <div class="save">
    <tiny-button type="primary" native-type="button" :reset-time="3000" @click="updateApp">保存</tiny-button>
  </div>
</template>

<script lang="jsx">
import { Form, FormItem, Input, Button, Link, Row, Col, Notify } from '@opentiny/vue'
import { format } from '@opentiny/vue-renderless/common/date'
import { reactive, ref, onMounted } from 'vue'
import { LOCAL_STORAGE, SESSION_STORAGE, formValidate } from 'lowcode-design-controller/utils'
import { requestUpdateApplication, fetchDownloadLink } from './http'
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
    TinyLink: Link
  },

  setup() {
    const ruleForm = ref(null)
    const appSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.appSetting))
    const appLocalSetting = JSON.parse(localStorage.getItem(LOCAL_STORAGE.tenant))
    const state = reactive({
      config: {
        sdkVersion: appSetting?.config?.sdkVersion,
        historyMode: appSetting?.config?.historyMode,
        targetRootID: appSetting?.config?.targetRootID
      },
      meta: {
        id: appSetting?.id,
        name: appSetting?.name,
        tenant: appLocalSetting?.tenant_id,
        gitGroup: appSetting?.git_group,
        projectUrl: appSetting?.project_name,
        branch: appSetting?.branch,
        visitUrl: appSetting?.visit_url,
        image_url: appSetting?.image_url || '',
        description: appSetting?.description,
        platform: appSetting?.platform?.name || '无',
        createdBy: appSetting?.createdBy?.username,
        is_default: appSetting?.is_default,
        createdAt: appSetting?.created_at && format(new Date(appSetting.created_at)),
        updatedAt: appSetting?.updated_at && format(new Date(appSetting.updated_at))
      },
      rules: {
        name: [
          { required: true, message: '必填', trigger: 'blur' },
          { validator: formValidate('nameZh'), trigger: 'blur' }
        ],
        projectUrl: [{ validator: formValidate('https'), trigger: 'blur' }],
        visitUrl: [{ validator: formValidate('https'), trigger: 'blur' }]
      },
      downloadLink: '',
      connectSet: '1'
    })
    const updateApp = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          const params = {
            config: state.config,
            name: state.meta.name,
            description: state.meta.description,
            git_group: state.meta.gitGroup,
            project_name: state.meta.projectUrl,
            branch: state.meta.branch,
            visit_url: state.meta.visitUrl,
            image_url: state.meta.image_url
          }

          requestUpdateApplication({ id: appSetting?.id, params })
            .then((data) => {
              sessionStorage.setItem(SESSION_STORAGE.appSetting, JSON.stringify(data))
              Notify({
                type: 'success',
                message: '保存成功',
                position: 'top-right'
              })
            })
            .catch((error) => {
              Notify({
                type: 'error',
                message: `应用设置失败: ${error.message || error}`,
                position: 'top-right'
              })
            })
        }
      })
    }

    onMounted(() => {
      fetchDownloadLink(state.meta?.id).then((res) => {
        state.downloadLink = res
      })
    })

    return {
      state,
      ruleForm,
      updateApp
    }
  }
}
</script>

<style lang="less" scoped>
.application-setting-base {
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  .meta,
  .config {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    padding: 20px 30px;
    border-radius: 10px;
  }

  .meta {
    height: calc(100% - 270px);
    margin-bottom: 20px;
  }

  .config {
    height: 180px;
  }

  .title {
    font-size: 16px;
    font-weight: Bold;
    color: #252b3a;
    line-height: 24px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    margin-bottom: 16px;
  }

  .tiny-button.tiny-button--primary {
    width: 96px;
    height: 32px;
    font-size: 12px;
    line-height: 6px;
    color: #ffffff;
    border-radius: 16px;
    background-color: #191919;
    border-color: #191919;
  }

  .require-star {
    color: red;
  }

  :deep(.tiny-form-item__label) {
    font-size: 12px;
    padding-right: 0;
  }

  :deep(.tiny-form) {
    height: 90%;
  }

  :deep(.tiny-form-item) {
    margin-bottom: 16px;
  }

  :deep(.col-xs-6.col-sm-6.col-md-6.col-lg-6.col-xl-6.tiny-col) {
    padding: 0;
  }

  :deep(.tiny-col) {
    width: 42%;
    margin-right: 80px;
  }

  :deep(.tiny-form--label-left.has-required .tiny-form-item__label) {
    padding-left: 0;
  }

  :deep(.tiny-radio__input.is-checked .tiny-radio__inner) {
    border-color: #000;
  }

  :deep(.tiny-radio__input.is-checked .tiny-radio__inner::after) {
    background-color: #000;
  }

  :deep(.tiny-input__suffix) {
    right: 52px;
  }

  :deep(.tiny-select .tiny-input .tiny-select__caret.is-reverse) {
    font-size: 12px;
  }

  :deep(.tiny-select .tiny-input .tiny-select__caret) {
    font-size: 12px;
  }

  :deep(.popselect) {
    right: 60px;
    color: #191919;
    font-size: 12px;
    line-height: 24px;
    width: 54px;
  }

  :deep(.tiny-link.tiny-link--primary) {
    color: #000;
    font-size: 12px;
  }

  :deep(.content) {
    background-color: #f5f5f5;
  }

  :deep(.tiny-input__inner:focus) {
    border-color: #191919;
  }
}
.save {
  position: absolute;
  bottom: 0;
  height: 70px;
  width: 100%;
  background: #fff;
  margin-left: -20px;
  padding: 20px 0 0 20px;
  box-sizing: border-box;
}
</style>
