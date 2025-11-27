<template>
  <div class="lib-import-title-wrap" @click="cancel">
    <icon-chevron-left class="lib-import-icon"></icon-chevron-left>
    <span class="lib-import-title">{{ `组件配置 / ${componentLibData.name}` }}</span>
  </div>
  <div v-loading="listLoading" class="lib-import">
    <div v-if="!isEmpty" class="lib-import-aside">
      <div class="lib-import-aside-action">
        <tiny-button @click="addComponent">新增组件</tiny-button>
      </div>

      <TransitionGroup name="list" tag="ul">
        <li
          v-for="(comp, index) in state.componentList"
          :key="comp.id"
          :class="{ 'lib-import-aside-item': true, active: index === activeIndex }"
          @click="beforeChangeComponent(comp, index)"
        >
          <span class="lib-import-aside-name">{{ comp.name.zh_CN }}</span>
          <tiny-button :icon="TinyIconDel" type="text" size="mini" @click.stop="deleteComponent(comp, index)">
          </tiny-button>
        </li>
      </TransitionGroup>
    </div>

    <div class="lib-import-content">
      <div class="lib-import-content-header">
        <div class="lib-import-content-header-left">
          <div class="lib-import-content-header-title">
            {{ isEmpty ? '添加组件' : currentComponent.value?.name?.zh_CN }}
          </div>
        </div>

        <div v-if="!isEmpty" class="lib-import-content-header-right">
          <tiny-button @click="() => saveComponent()">保存</tiny-button>
        </div>
      </div>

      <div class="lib-import-content-main">
        <ComponentImport v-if="currentComponent" ref="componentImportRef" inLib></ComponentImport>
        <div v-else class="lib-import-content-empty">
          <div class="lib-import-content-empty-text">
            <svg-icon name="empty"></svg-icon>
            暂无组件
          </div>
          <tiny-button type="primary" @click="addComponent">添加组件</tiny-button>
        </div>
      </div>
    </div>
  </div>
  <tiny-dialog-box
    v-model:visible="state.openAdd"
    :loading="addLoading"
    title="新增组件"
    :close-on-click-modal="false"
    width="500"
    @close="cancelAdd"
  >
    <template #footer>
      <div>
        <tiny-button type="primary" @click="confirmAdd">确定</tiny-button>
        <tiny-button @click="cancelAdd">取消</tiny-button>
      </div>
    </template>

    <tiny-form ref="addForm" label-width="80px" :model="state.componentData" :rules="rules">
      <tiny-form-item label="组件ID" prop="component">
        <tiny-input v-model.trim="state.componentData.component" placeholder="请输入" />
      </tiny-form-item>
      <tiny-form-item label="组件名称" prop="name">
        <tiny-input v-model.trim="state.componentData.name" placeholder="请输入" />
      </tiny-form-item>
      <tiny-form-item label="导出组件名" prop="exportName">
        <tiny-input v-model.trim="state.componentData.exportName" placeholder="请输入" />
      </tiny-form-item>
      <tiny-form-item label="图标" prop="icon">
        <tiny-input v-model.trim="state.componentData.icon" placeholder="请输入" />
      </tiny-form-item>
    </tiny-form>
  </tiny-dialog-box>
  <div v-if="!isEmpty" class="lib-import-footer">
    <TinyButton type="primary" @click="cancel">完成</TinyButton>
  </div>
</template>

<script setup>
import { ref, shallowRef, reactive, computed, onMounted, nextTick } from 'vue'
import {
  Button as TinyButton,
  Input as TinyInput,
  DialogBox as TinyDialogBox,
  Form as TinyForm,
  FormItem as TinyFormItem,
  Notify
} from '@opentiny/vue'
import { IconDel } from '@opentiny/vue-icon'
import ComponentImport from './ComponentImport.vue'
import { formValidate, SESSION_STORAGE } from 'lowcode-design-controller/utils'
import useComponent from './js/useComponent'
import { useRouter } from 'vue-router'
import { useModal } from 'lowcode-design-controller'
import { requestComponentList, requestDeleteComponent, requestCreateComponents } from '../http'

const DUPLICATE_CODE = 'CM003'
const TinyIconDel = IconDel()

const uniqIdValidate = (rule, value, callback) => {
  if (state.componentList.some((item) => item.component === value)) {
    callback(new Error('组件ID不能重复！'))

    return
  }

  callback()
}
const uniqNameValidate = (rule, value, callback) => {
  if (state.componentList.some((item) => item.name.zh_CN === value)) {
    callback(new Error('组件名称不能重复！'))

    return
  }

  callback()
}
const rules = {
  name: [
    { required: true, message: '必填', trigger: 'blur' },
    {
      validator: uniqNameValidate,
      trigger: 'blur'
    }
  ],
  component: [
    { required: true, message: '必填', trigger: 'blur' },
    { validator: formValidate('componentId'), trigger: 'blur' },
    {
      validator: uniqIdValidate,
      trigger: 'blur'
    }
  ],
  exportName: [{ required: true, message: '必填', trigger: 'blur' }],
  icon: [{ required: true, message: '必填', trigger: 'blur' }]
}

const { confirm } = useModal()
const router = useRouter()
const { setComponentData, componentInitData, componentDataChanged, resetComponentDataChanged } = useComponent()

const componentLibData = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.componentLib) || null)
const addForm = ref(null)
const componentImportRef = ref(null)
const addLoading = ref(false)
const listLoading = ref(false)
const activeIndex = ref(-1)
const currentComponent = shallowRef(null)
const state = reactive({
  componentList: [],
  componentData: {
    component: '',
    name: '',
    exportName: '',
    icon: 'button'
  }
})

const isEmpty = computed(() => !state.componentList.length)

const defaultComponentData = computed(() => {
  const {
    name,
    packageName,
    version,
    destructuring,
    framework,
    script,
    css,
    isOfficial,
    isDefault,
    dependencies,
    public_scope_tenants
  } = componentLibData

  const defaultData = {
    ...componentInitData,
    version,
    isOfficial,
    isDefault,
    public: componentLibData?.public,
    public_scope_tenants,
    category: name,
    screenshot: '/img/logo.png',
    npm: {
      package: packageName,
      destructuring,
      version,
      script,
      css,
      dependencies
    }
  }

  defaultData.configure.framework = framework

  return defaultData
})

const cancelAdd = () => {
  state.openAdd = false
}

const generateComponentData = () => {
  const { name, component, exportName, icon } = state.componentData
  const componentData = { ...defaultComponentData.value, component, name: { zh_CN: name } }

  componentData.library = componentLibData?.id
  componentData.npm.exportName = exportName
  componentData.tinyReserved = 0 // 是否tiny自有
  componentData.snippets[0].name.zh_CN = name
  componentData.snippets[0].snippetName = component
  componentData.snippets[0].icon = componentData.icon = icon

  return componentData
}

const getComponentList = async () => {
  try {
    const res = await requestComponentList(componentLibData.id)

    return res
  } catch (error) {
    Notify({
      type: 'error',
      message: `获取组件列表失败： ${error.message || error}`,
      position: 'top-right'
    })

    return []
  }
}

const confirmAdd = async () => {
  const valid = await addForm.value.validate()

  if (!valid) return

  addLoading.value = true

  try {
    const res = await requestCreateComponents(generateComponentData())

    state.componentList = await getComponentList()

    if (state.componentList.length === 1) {
      currentComponent.value = res
      initComponentData()
    }

    cancelAdd()
  } catch (error) {
    if (error?.code === DUPLICATE_CODE) {
      Notify({
        type: 'success',
        message: '新增组件失败: 组件ID不能重复',
        position: 'top-right'
      })
    }

    Notify({
      type: 'success',
      message: `新增组件失败: ${error.message || error}`,
      position: 'top-right'
    })
  } finally {
    addLoading.value = false
  }
}

const addComponent = () => {
  state.openAdd = true
}

const confirmDeleteComponent = async (comp, index) => {
  try {
    await requestDeleteComponent(comp.id)

    state.componentList = await getComponentList()

    if (!state.componentList.length) {
      activeIndex.value = -1
      currentComponent.value = null

      return
    }

    if (currentComponent.value.id === comp.id) {
      activeIndex.value = 0
      currentComponent.value = state.componentList[activeIndex.value]

      setComponentData(currentComponent.value)
    }
  } catch (error) {
    Notify({
      type: 'error',
      message: `删除组件 ${comp.name.zh_CN} 失败： ${error.message || error}`,
      position: 'top-right'
    })
  }
}

const deleteComponent = (comp, index) => {
  confirm({
    title: '删除组件',
    status: 'warning',
    message: `您确定要删除 ${comp.name.zh_CN} 吗？`,
    exec: () => confirmDeleteComponent(comp, index)
  })
}

const saveComponent = async () => {
  const name = currentComponent.value.name.zh_CN

  try {
    const res = await componentImportRef.value.createComponent()

    if (res) {
      state.componentList = await getComponentList()

      Notify({
        type: 'success',
        message: `组件 ${name} 保存成功!`,
        position: 'top-right'
      })

      resetComponentDataChanged()
    }

    return res
  } catch (error) {
    return Notify({
      type: 'success',
      message: `组件 ${name} 保存失败：${error.message || error}`,
      position: 'top-right'
    })
  }
}

const initComponentData = async () => {
  activeIndex.value = 0
  currentComponent.value = state.componentList[0]

  setComponentData(currentComponent.value)

  await nextTick()

  resetComponentDataChanged()
}

const changeComponent = async (comp, index) => {
  activeIndex.value = index
  currentComponent.value = comp

  setComponentData(comp)

  await nextTick()

  resetComponentDataChanged()
}

const saveAndChange = async (comp, index) => {
  await saveComponent()
  changeComponent(comp, index)
}

const beforeChangeComponent = (comp, index) => {
  if (!componentDataChanged.value) {
    changeComponent(comp, index)

    return
  }

  confirm({
    title: '切换组件',
    status: 'custom',
    message: `组件${currentComponent.value.name.zh_CN}有更改，是否保存？`,
    exec: () => saveAndChange(comp, index)
  })
}

const cancel = () => {
  router.push({ name: 'ecosystemMaterial', params: { activeName: 'allComponentLib' } })
}

onMounted(async () => {
  listLoading.value = true

  state.componentList = await getComponentList()

  listLoading.value = false

  if (!state.componentList.length) return

  initComponentData()
})
</script>

<style lang="less" scoped>
.lib-import-title-wrap {
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
  .lib-import-icon {
    width: 16px;
    height: 16px;
    color: rgba(0, 0, 0, 0.2);
  }
  .lib-import-title {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: Bold;
    color: #252b3a;
    margin-left: 8px;
  }
}
.lib-import {
  display: flex;
  margin-bottom: 30px;
  height: calc(100% - 130px);
  &-aside {
    background-color: #fff;
    border-right: 1px solid #dfe1e6;
    width: 200px;
    margin-bottom: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    &-action {
      height: 60px;
      line-height: 60px;
      text-align: center;
      :deep(.tiny-button) {
        width: 120px;
      }
    }
    &-list {
      flex: 1;
      overflow-y: auto;
    }
    &-item {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: #f5f5f5;
      }
      &.active {
        background-color: #f5f5f5;
      }
    }
    &-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 6px;
    }
  }
  &-content {
    flex: 1;
    border-right: 1px solid #dfe1e6;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    &-header {
      padding: 20px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title {
        font-size: 18px;
        font-weight: 700;
      }
    }
    &-main {
      background-color: #fff;
      margin: 20px 20px 0;
      border-radius: 8px;
      flex: 1;
      overflow: auto;
      position: relative;
    }
    &-empty {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      &-text {
        color: #808080;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .svg-icon {
          margin-bottom: 20px;
          width: 64px;
          height: 64px;
        }
      }
      .tiny-button {
        width: 150px;
      }
    }
  }
  &-help {
    width: 300px;
    padding: 20px;
  }
  &-footer {
    position: absolute;
    width: calc(100% - 50px);
    bottom: 0;
    left: 0;
    height: 80px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-top: 1px solid #dfe1e6;
    background-color: #fff;
    z-index: 2;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
