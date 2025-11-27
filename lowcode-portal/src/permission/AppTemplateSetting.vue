<template>
  <div class="app-template-setting">
    <tiny-form ref="ruleForm" :model="state.createData" :label-align="true" label-position="left" label-width="100px">
      <tiny-form-item label="选择应用" prop="appId">
        <tiny-select
          ref="appRef"
          v-model="state.createData.appId"
          placeholder="请选择"
          filterable
          :filter-method="filter"
          clearable
        >
          <tiny-option v-for="(item, idx) in appList" :key="idx" :label="item.name" :value="item.id"> </tiny-option>
        </tiny-select>
      </tiny-form-item>
      <tiny-form-item label="应用分类" prop="template_type">
        <tiny-select ref="selectRef" v-model="state.createData.template_type" placeholder="请选择">
          <tiny-option v-for="(item, idx) in state.templateTypeList" :key="idx" :label="item.label" :value="item.value">
          </tiny-option>
        </tiny-select>
      </tiny-form-item>
      <tiny-form-item>
        <tiny-button type="primary" @click="saveTemplate">设置成模板</tiny-button>
      </tiny-form-item>
    </tiny-form>
  </div>
</template>

<script lang="jsx">
import { reactive, watch, ref } from 'vue'
import { Form, FormItem, Button, Select, Option } from '@opentiny/vue'
import { useModal } from 'lowcode-design-controller'
import { appTemplateTypeList } from 'lowcode-design-controller/utils'
import { requestCreateAppTemplate } from './http'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinySelect: Select,
    TinyOption: Option,
    TinyButton: Button
  },
  props: {
    appList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['getAppList'],
  setup(props, { emit }) {
    const { message } = useModal()
    const appRef = ref(null)

    const state = reactive({
      createData: {
        appId: null,
        template_type: 'personnelManagement'
      },
      templateTypeList: appTemplateTypeList,
      appList: []
    })

    const saveTemplate = () => {
      if (!state.createData.appId) {
        message({ message: '请选择应用', status: 'error' })

        return
      }

      const id = state.createData.appId
      const params = {
        template_type: state.createData.template_type
      }

      requestCreateAppTemplate(id, params)
        .then(() => {
          message({ message: '模板添加成功', status: 'success' })
          state.createData.appId = null
          emit('getAppList')
        })
        .catch((error) => {
          message({ message: `模板添加失败: ${error.message || error}`, status: 'error' })
        })
    }

    const filter = (value) => {
      appRef.value.state.cachedOptions.forEach((item) => {
        value
          ? (item.state.visible = item.label.toLowerCase().indexOf(value.toLowerCase()) > -1)
          : (item.state.visible = true)
      })
    }

    watch(
      () => props.appList,
      (value) => {
        state.createData.app = state.appList.length ? state.appList[0].id : ''
      }
    )

    return {
      state,
      appRef,
      saveTemplate,
      filter
    }
  }
}
</script>

<style lang="less" scoped>
.app-template-setting {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 32px 60% 24px 20px;
  :deep(.tiny-button) {
    margin-top: 20px;
  }
}
</style>
