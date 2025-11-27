<template>
  <tiny-form ref="componentForm" label-width="150px" label-position="left" :model="componentData">
    <tiny-row>
      <tiny-col v-if="!inLib" :span="6">
        <tiny-form-item label="包名">
          <tiny-input v-model="componentData.npm.package"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="导出组件名">
          <tiny-input v-model="componentData.npm.exportName"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="研发模式">
          <tiny-input v-model="componentData.devMode"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="关键词">
          <tiny-input v-model="componentData.keywords"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col v-if="!inLib" :span="6">
        <tiny-form-item label="是否解构">
          <tiny-radio v-model="componentData.npm.destructuring" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.npm.destructuring" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="是否循环">
          <tiny-radio v-model="componentData.configure.loop" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.loop" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="是否显示">
          <tiny-radio v-model="componentData.configure.condition" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.condition" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="样式">
          <tiny-radio v-model="componentData.configure.styles" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.styles" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="是否为容器">
          <tiny-radio v-model="componentData.configure.isContainer" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.isContainer" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="是否带弹出层">
          <tiny-radio v-model="componentData.configure.isModal" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.isModal" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="是否带悬浮层">
          <tiny-radio v-model="componentData.configure.isPopper" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.isPopper" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="子节点类型白名单">
          <tiny-input v-model="componentData.configure.nestingRule.childWhitelist"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="父节点类型白名单">
          <tiny-input v-model="componentData.configure.nestingRule.parentWhitelist"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="后裔节点类型黑名单">
          <tiny-input v-model="componentData.configure.nestingRule.descendantBlacklist"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="祖父节点类型白名单">
          <tiny-input v-model="componentData.configure.nestingRule.ancestorWhitelist"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="根节点">
          <tiny-radio v-model="componentData.configure.isNullNode" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.isNullNode" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="布局">
          <tiny-radio v-model="componentData.configure.isLayout" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.isLayout" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="选择器">
          <tiny-input v-model="componentData.configure.rootSelector"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="使用原生组件">
          <tiny-radio v-model="componentData.native" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.native" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="画布丢弃的属性">
          <tiny-input v-model="componentData.configure.invalidity"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="禁用点击事件">
          <tiny-radio v-model="componentData.configure.clickCapture" :label="true">是</tiny-radio>
          <tiny-radio v-model="componentData.configure.clickCapture" :label="false">否</tiny-radio>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="分组">
          <tiny-input v-model="componentData.group"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col v-if="!inLib" :span="6">
        <tiny-form-item label="分类">
          <tiny-input v-model="componentData.category"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="排序">
          <tiny-input v-model="componentData.priority"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="快捷面板属性">
          <tiny-input v-model="componentData.configure.shortcuts.properties"></tiny-input>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="菜单项">
          <tiny-checkbox-group v-model="componentData.configure.contextMenu.actions" type="checkbox" :options="actions">
          </tiny-checkbox-group>
        </tiny-form-item>
      </tiny-col>
      <tiny-col :span="6">
        <tiny-form-item label="禁用菜单">
          <tiny-checkbox-group v-model="componentData.configure.contextMenu.disable" type="checkbox" :options="actions">
          </tiny-checkbox-group>
        </tiny-form-item>
      </tiny-col>
    </tiny-row>
  </tiny-form>
</template>

<script>
import { ref } from 'vue'
import { Form, FormItem, Input, Radio, Row, Col, CheckboxGroup } from '@opentiny/vue'
import useComponent from './js/useComponent'

export default {
  components: {
    TinyForm: Form,
    TinyFormItem: FormItem,
    TinyInput: Input,
    TinyRow: Row,
    TinyCol: Col,
    TinyRadio: Radio,
    TinyCheckboxGroup: CheckboxGroup
  },
  props: {
    inLib: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { componentData } = useComponent()
    const componentForm = ref(null)

    const validate = () => new Promise(componentForm.value.validate)

    const actions = [
      { text: '复制', label: 'copy' },
      { text: '删除', label: 'remove' },
      { text: '插入', label: 'insert' },
      { text: '更新属性', label: 'updateAttr' },
      { text: '事件绑定', label: 'bindEevent' },
      { text: '区块创建', label: 'createBlock' }
    ]

    return {
      componentData,
      componentForm,
      validate,
      actions
    }
  }
}
</script>
<style lang="less" scoped>
.tiny-input,
.tiny-select {
  width: 80%;
}
.iniline {
  height: 100%;
  width: 100%;
}

:deep(.tiny-checkbox-group) {
  width: 430px;
}
</style>
