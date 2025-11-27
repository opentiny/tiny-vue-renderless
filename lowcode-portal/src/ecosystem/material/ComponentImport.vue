<template>
  <div v-if="!inLib" class="material-import-title-wrap" @click="cancelAdd">
    <icon-chevron-left class="material-import-icon"></icon-chevron-left>
    <span class="material-import-title">发布组件</span>
  </div>
  <component-card class="material-import-content-base" :active="active[0]" @clickCard="clickCard">
    <template #content>
      <component-import-base ref="componentBase" inLib></component-import-base>
    </template>
  </component-card>
  <component-card
    step="2"
    title="高级属性（选填）"
    class="material-import-content-tec"
    :active="active[1]"
    @clickCard="clickCard"
  >
    <template #content>
      <component-import-tec ref="componentTec" inLib></component-import-tec>
    </template>
  </component-card>
  <div v-if="!inLib" class="footer">
    <tiny-button type="primary" @click="createComponent">发 布</tiny-button>
    <tiny-button @click="cancelAdd">取 消</tiny-button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useModal } from 'lowcode-design-controller'
import { Button } from '@opentiny/vue'
import { requestCreateComponents, requestUpdateComponents } from '../http'
import ComponentCard from './ComponentCard.vue'
import ComponentImportBase from './ComponentImportBase.vue'
import ComponentImportTec from './ComponentImportTec.vue'
import useComponent from './js/useComponent'

export default {
  components: {
    TinyButton: Button,
    ComponentCard,
    ComponentImportBase,
    ComponentImportTec
  },
  props: {
    inLib: {
      type: Boolean,
      default: false
    }
  },
  expose: ['createComponent'],
  setup(props) {
    const router = useRouter()
    const { message } = useModal()
    const { componentData, componentValidate } = useComponent()
    const componentShow = ref(null)
    const componentBase = ref(null)
    const componentTec = ref(null)
    const active = ref([true, false, false])
    const createFlag = ref(true)

    const isEdit = computed(() => Boolean(componentData.value?.id))

    const snippetValid = (snippet) => Array.isArray(snippet) && snippet.length && snippet[0].constructor === Object

    const getSnippetsData = () => {
      try {
        const snippets = componentBase.value?.getSnippets()
        const snippetsArray = snippets && JSON.parse(snippets)

        if (!snippetValid(snippetsArray)) {
          createFlag.value = false

          return message({ message: 'schema片段必填且为对象数组格式', status: 'error' })
        } else {
          createFlag.value = true

          return snippetsArray
        }
      } catch (error) {
        createFlag.value = false

        const editor = componentBase.value?.snippetsEditor?.getEditor()
        const model = editor.getModel()
        const markers = componentBase.value?.snippetsEditor?.getModelMarkers(model)

        message({ message: `schema片段有语法错误: ${markers[0]?.message || ''}`, status: 'error' })
      }

      return undefined
    }

    const getComponentData = (snippets) => {
      componentData.value.snippets = snippets
      componentData.value.framework = componentData.value.configure.framework

      const configure = componentData.value.configure
      const properties = configure.shortcuts.properties
      const invalidity = configure.invalidity

      configure.shortcuts.properties = properties?.split ? properties.split(/,\s*|\s+/) : properties
      configure.invalidity = invalidity?.split ? invalidity.split(/,\s*|\s+/) : invalidity

      if (isEdit.value) {
        delete componentData.value.mh
        delete componentData.value.updated_at
        delete componentData.value.created_at
      }
    }

    const createFunc = async () => {
      const fn = isEdit.value ? requestUpdateComponents : requestCreateComponents
      const activeName = isEdit.value ? 'myComponent' : 'allComponent'
      const title = isEdit.value ? '更新' : '发布'

      try {
        const res = await fn(componentData.value)

        if (props.inLib) {
          return res
        }

        router.push({ name: 'ecosystemMaterial', params: { activeName } })
      } catch (error) {
        message({ message: `组件${title}失败: ${error.message || error}`, status: 'error' })
      }

      return null
    }

    const validate = async () => {
      const baseValid = await componentBase.value?.validate()
      const tecValid = await componentTec.value?.validate()
      const attrValid = Object.keys(componentValidate).every((item) => componentValidate[item])

      return baseValid && tecValid && attrValid
    }

    const createComponent = async () => {
      const valid = await validate()

      if (!valid) {
        message({ message: '您有必填字段未填或字段格式错误', status: 'warning', zIndex: 2020 })

        return false
      }

      const snippets = getSnippetsData()

      if (createFlag.value) {
        getComponentData(snippets)

        try {
          await createFunc()

          return true
        } catch (error) {
          return false
        }
      }

      return false
    }

    const cancelAdd = () => {
      const activeName = isEdit.value ? 'myComponent' : 'allComponent'

      router.push({ name: 'ecosystemMaterial', params: { activeName } })
    }

    const clickCard = (step) => {
      active.value[step - 1] = !active.value[step - 1]
    }

    return {
      componentShow,
      componentBase,
      componentTec,
      isEdit,
      createComponent,
      cancelAdd,
      clickCard,
      active
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
.material-import-content-base {
  margin-bottom: 20px;
}
.material-import-content-tec {
  margin-bottom: 70px;
}
.material-import-content-show {
  margin: 20px 0 62px;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  padding-left: 34px;
  box-sizing: border-box;
  z-index: 10;
}
</style>
