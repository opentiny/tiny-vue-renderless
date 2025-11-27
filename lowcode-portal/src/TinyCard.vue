<template>
  <div class="app-extension-wrap">
    <div class="app-extension base">
      <div class="app-extension-title">云服务信息</div>
      <tiny-form label-width="120px" label-position="left" ref="ruleForm" :model="state.business" :rules="baseRules">
        <div class="app-extension-form-grid">
          <tiny-form-item prop="endpointName">
            <template #label>
              <span>云服务名称</span>
              <tiny-tooltip content="云服务中文名称，如：云服务引擎" placement="right">
                <icon-help-query style="margin-left: 4px"></icon-help-query>
              </tiny-tooltip>
            </template>
            <tiny-input v-model="state.business.endpointName"></tiny-input>
          </tiny-form-item>
          <tiny-form-item prop="serviceId">
            <template #label>
              <span>所属服务</span>
              <tiny-tooltip
                content="流水线所属的服务树名称，用于生成部署所需要的 yml、脚本，如：cce-console-static"
                placement="right"
              >
                <icon-help-query style="margin-left: 4px"></icon-help-query>
              </tiny-tooltip>
            </template>
            <tiny-input v-model="state.business.serviceId"> </tiny-input>
          </tiny-form-item>
        </div>
        <div class="app-extension-form-grid">
          <tiny-form-item prop="endpointId">
            <template #label>
              <span>云服务代码</span>
              <tiny-tooltip content="云服务的唯一标识，建议与CMDB上的节点名称保持一致，如：cce" placement="right">
                <icon-help-query style="margin-left: 4px"></icon-help-query>
              </tiny-tooltip>
            </template>
            <tiny-input v-model="state.business.endpointId"></tiny-input>
          </tiny-form-item>

          <tiny-form-item prop="router">
            <template #label>
              <span>云服务路径</span>
              <tiny-tooltip content="访问云服务的context_path，如：/cce2.0" placement="right">
                <icon-help-query style="margin-left: 4px"></icon-help-query>
              </tiny-tooltip>
            </template>
            <tiny-input v-model="state.business.router"> </tiny-input>
          </tiny-form-item>
        </div>
      </tiny-form>
    </div>
    <div class="app-extension">
      <div class="app-extension-title">代理设置</div>
      <tiny-form label-width="120px" label-position="left" :model="state.env">
        <tiny-form-item label="选择代理环境">
          <tiny-checkbox-group v-model="state.environment" type="checkbox" :options="options"> </tiny-checkbox-group>
        </tiny-form-item>
        <tiny-form-item
          class="app-extension-region"
          v-for="(item, index) in state.environment"
          :label="options.find((option) => option.label === item).text"
          :key="index"
        >
          <span class="app-extension-region-add" @click="addRegion({ environment: item })">新增局点</span>
          <region-card
            v-model:regions="state.env[item].regions"
            @delete="deleteRegion({ environment: item, index: $event })"
          ></region-card>
        </tiny-form-item>
        <tiny-form-item label="设置默认环境">
          <tiny-radio-group
            v-model="state.defaultEnvironment"
            :options="options"
            @change="changeEnvironment"
          ></tiny-radio-group>
        </tiny-form-item>
      </tiny-form>
    </div>
    <div class="app-extension-save">
      <tiny-button type="primary" native-type="submit" @click="updateApp">保 存</tiny-button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import { Button, CheckboxGroup, Form, FormItem, Input, RadioGroup, Tooltip } from '@opentiny/vue'
import { extend } from '@opentiny/vue-renderless/common/object'
import { useModal } from './controller'
import { SESSION_STORAGE, formValidate } from './controller/utils'
import RegionCard from './common/components/RegionCard.vue'
import { requestUpdateApplication } from './application/http'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyButton: Button,
    TinyCheckboxGroup: CheckboxGroup,
    TinyRadioGroup: RadioGroup,
    TinyTooltip: Tooltip,
    RegionCard
  },
  setup() {
    const appSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.appSetting))
    const { message } = useModal()
    const ruleForm = ref(null)
    const options = [
      { text: '奥丁', label: 'alpha' },
      { text: '乌兰203', label: 'beta' },
      { text: '开发环境', label: 'dev' }
    ]
    const env = {
      alpha: {
        regions: [
          {
            name: 'cn-north-7',
            baseUrl: 'https://opentiny.design/',
            isDefault: true
          }
        ],
        isDefault: true
      },
      beta: {
        regions: [
          {
            name: 'cn-north-7',
            baseUrl: 'https://opentiny.design/',
            isDefault: true
          }
        ],
        isDefault: false
      },
      prod: {
        regions: [
          {
            name: '',
            baseUrl: 'https://console.huaweicloud.com/',
            isDefault: true
          }
        ],
        isDefault: false
      },
      dev: {
        regions: [
          {
            name: '',
            baseUrl: '',
            isDefault: true
          }
        ],
        isDefault: false
      }
    }
    const baseRules = {
      endpointId: [{ required: true }, { validator: formValidate('nameEn'), trigger: 'blur' }],
      endpointName: [{ required: true }, { validator: formValidate('nameZh'), trigger: 'blur' }],
      serviceId: [{ required: true }, { validator: formValidate('nameEn'), trigger: 'blur' }],
      router: [{ required: true }]
    }
    const state = reactive({
      environment: appSetting?.extend_config?.env ? Object.keys(appSetting?.extend_config?.env) : ['beta'],
      defaultEnvironment: 'beta',
      env: extend(true, {}, env, appSetting?.extend_config?.env),
      business: appSetting?.extend_config?.business || {
        endpointId: '',
        endpointName: '',
        serviceId: '',
        router: ''
      }
    })

    const changeEnvironment = () => {
      Object.keys(state.env).forEach((key) => {
        state.env[key].isDefault = key === state.defaultEnvironment
      })
    }

    const deleteRegion = (params) => {
      state.env[params.environment].regions.splice(params.index, 1)
    }

    const addRegion = (params) => {
      const region = state.env[params.environment].regions[0]
        ? extend(true, {}, state.env[params.environment].regions[0])
        : {
            name: '',
            baseUrl: '',
            isDefault: false
          }

      region.isDefault = false
      state.env[params.environment].regions.push({ ...region })
    }

    const getParams = () => {
      const env = extend(true, {}, state.env)

      for (const key in state.env) {
        if (!state.environment.includes(key)) {
          delete env[key]
        }
      }

      const params = {
        extend_config: { ...appSetting?.extend_config, ...{ env, business: state.business } }
      }

      return params
    }

    const updateApp = () => {
      ruleForm.value.validate((valid) => {
        if (valid) {
          const params = getParams()

          requestUpdateApplication({ id: appSetting?.id, params })
            .then((data) => {
              data && sessionStorage.setItem(SESSION_STORAGE.appSetting, JSON.stringify(data))
              message({ message: '保存成功', status: 'success' })
            })
            .catch((error) => {
              message({ message: `应用扩展设置失败: ${error.message || error}`, status: 'error' })
            })
        }
      })
    }

    onMounted(() => {
      const env = Object.keys(appSetting?.extend_config?.env || {})

      for (let i = 0; i < env.length; i++) {
        if (appSetting?.extend_config?.env?.[env[i]].isDefault) {
          state.defaultEnvironment = env[i]

          return
        }
      }
    })

    return {
      state,
      options,
      baseRules,
      ruleForm,
      deleteRegion,
      addRegion,
      updateApp,
      changeEnvironment
    }
  }
}
</script>

<style lang="less" scoped>
.app-extension-wrap {
  width: 100%;
  height: 100%;
  background: #f2f5fc;
  .app-extension {
    width: 100%;
    height: calc(100% - 240px);
    background: #ffffff;
    box-sizing: border-box;
    padding: 20px 24px;
    overflow-y: scroll;
    &.base {
      height: 164px;
      margin-bottom: 16px;
    }
    .app-extension-title {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: Bold;
      color: #252b3a;
      line-height: 24px;
      margin-bottom: 20px;
    }
    .app-extension-form-grid {
      width: 90%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .tiny-input {
        width: 80%;
      }
    }
    .app-extension-region {
      .app-extension-region-add {
        display: inline-block;
        font-size: 12px;
        font-family: 'Microsoft YaHei';
        color: #526ecc;
        line-height: 18px;
        margin-bottom: 8px;
        cursor: pointer;
      }
    }
  }
  .app-extension-save {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    padding: 20px 24px;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 44px;
    box-sizing: border-box;
    z-index: 10;
  }
}
</style>
