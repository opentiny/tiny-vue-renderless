import { reactive, ref, watch } from 'vue'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'

const componentInitData = {
  name: {
    zh_CN: '按钮'
  },
  component: 'TinyButton',
  icon: 'button',
  description: '常用的操作按钮，提供包括默认按钮、图标按钮、图片按钮、下拉按钮等类型',
  docUrl: '', // 组件文档链接
  screenshot: '', // 缩略图
  tags: '', // 组件标签
  keywords: '',
  devMode: 'proCode', // 组件研发模式
  npm: {
    package: '@opentiny/vue',
    exportName: 'Button',
    version: '3.10.0',
    destructuring: true
  },
  group: 'component', // 当前组件位于组件面板的哪个 tab
  category: '表单组件', // 描述组件位于组件面板同一 tab 的哪个区域
  priority: 2, // 描述组件在同一 category 中的排序
  native: true,
  snippets: [
    {
      name: {
        zh_CN: '按钮'
      },
      icon: 'button',
      screenshot: '',
      snippetName: 'TinyButton',
      schema: {}
    }
  ], // 组件使用的 schema 片段
  schema: {},
  component_metadata: {}, // 组件原始属性事件插槽描述数据
  configure: {
    loop: true,
    condition: true,
    styles: true,
    isContainer: false,
    isModal: false, // 组件是否带浮层，浮层组件拖入设计器时会遮挡画布区域，此时应当辅助一些交互以防止阻挡
    isPopper: false,
    nestingRule: {
      childWhitelist: '', // 子节点类型白名单
      parentWhitelist: '', // 父节点类型白名单
      descendantBlacklist: '', // 后裔节点类型黑名单
      ancestorWhitelist: '' // 祖父节点类型白名单
    },
    isNullNode: false, // 是否存在渲染的根节点
    isLayout: false,
    rootSelector: '', // 组件选中框的 cssSelector
    shortcuts: {
      properties: 'text,size'
    },
    contextMenu: {
      actions: ['copy', 'remove', 'insert', 'updateAttr', 'bindEevent', 'createBlock'],
      disable: []
    },
    invalidity: '', // 画布丢弃的属性
    clickCapture: true, // 是否禁用元素点击事件
    framework: 'Vue' // 组件所属技术栈
  },
  public: 1,
  isOfficial: false, // 是否标识为官方组件
  isDefault: false,
  public_scope_tenants: [],
  framework: 'Vue' // 组件所属技术栈
}

const getComponentData = () => {
  try {
    const component = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.component))

    if (component) {
      component.public_scope_tenants = component.public_scope_tenants?.map(({ id }) => id) || []
    }

    return component || componentInitData
  } catch {
    return componentInitData
  }
}

const componentDataChanged = ref(false)

const resetComponentDataChanged = () => {
  componentDataChanged.value = false
}

const componentData = ref(getComponentData())

const refreshComponentData = () => {
  componentData.value = getComponentData()
}

const getComponentLibData = () => {
  try {
    const component = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.componentLib))

    return component
  } catch {
    return null
  }
}

const setComponentLibData = (data) => {
  sessionStorage.setItem(SESSION_STORAGE.component, JSON.stringify(data))
  refreshComponentLibData()
}

const setComponentData = (data) => {
  if (!data) return

  sessionStorage.setItem(SESSION_STORAGE.component, JSON.stringify(data))

  refreshComponentData()
}

const componentLibData = ref(getComponentLibData())

const refreshComponentLibData = () => {
  componentLibData.value = getComponentLibData()
}

const componentValidate = reactive({
  attrs: true,
  originEvents: true,
  originSlots: true
})

watch(
  () => componentData,
  () => {
    componentDataChanged.value = true
  },
  {
    deep: true
  }
)

export default function () {
  return {
    componentData,
    componentDataChanged,
    componentLibData,
    componentInitData,
    componentValidate,
    setComponentData,
    resetComponentDataChanged,
    setComponentLibData,
    refreshComponentData,
    refreshComponentLibData
  }
}
