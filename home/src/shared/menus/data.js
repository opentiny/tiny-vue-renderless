import { computed } from 'vue'
import { getI18n, $t, getAllI18n, removeDupSplitor } from '@/tools'
import { VITE_CONTEXT } from '@/shared/const'

const mode = import.meta.env.VITE_ENV_MODE
const isOpen = mode === 'open'

const getSuffix = (dirName) => dirName?.match?.(/([^/]+)\/?$/)?.[1] || dirName

// 生成所有的菜单
function getComponentMenus(cmpMenus, baseContext) {
  const standaloneOptions = []
  const cmpOptions = cmpMenus.map((menu, index) => ({
    ...menu,
    key: `${baseContext}${menu.key || index}`,
    children: menu.children?.map((page) => ({
      ...page,
      // key: `${baseContext}${page.key}`,
      key: removeDupSplitor(`${baseContext}/${page.key}`),
      searchKey: getAllI18n(page, 'name'),
      label: getAllI18n(page, 'name')
    }))
  }))
  return [...standaloneOptions, ...cmpOptions]
}

const getDesignMenus = (menus, basePath) =>
  menus.map((item, index) => ({
    ...item,
    key: `${basePath}/${getSuffix(item.sourceDir) || index}`,
    searchKey: getAllI18n(item, 'title'),
    label: getI18n(item, 'title'),
    children: item.children?.map((child) => ({
      ...child,
      key: removeDupSplitor(`${basePath}/${getSuffix(item.sourceDir) || ''}/${getSuffix(child.sourceDir)}`),
      searchKey: getAllI18n(child, 'title'),
      label: getI18n(child, 'title')
    }))
  }))

const getGuidePath = (key) => `${VITE_CONTEXT}opentiny-design/guide/${key}`

export const guideMenus = [
  { label: 'Tiny Vue', 'titleEn': 'Tiny Vue', 'key': getGuidePath('introduce') },
  { label: '环境准备', 'titleEn': 'envpreparation', 'key': getGuidePath(`envpreparation${isOpen ? '-open' : ''}`) },
  { label: '安装', 'titleEn': 'installation', 'key': getGuidePath('installation') },
  { label: '更新日志', 'titleEn': 'Changelog', 'key': getGuidePath('changelog') },
  { label: '引入组件', 'titleEn': 'importComponents', 'key': getGuidePath('import-components') },
  { label: '国际化', 'titleEn': 'i18n', 'key': getGuidePath('i18n') },
  {
    label: '主题配置',
    'titleEn': 'theme',
    'key': getGuidePath('theme'),
    showScene: {
      theme: ['default']
    }
  },
  {
    label: '深色模式',
    'titleEn': 'Theme Dark',
    'key': getGuidePath('theme-dark'),
    showScene: {
      theme: ['default']
    }
  },
  { label: '智能化', 'titleEn': 'MCP', 'key': getGuidePath('mcp') },
  { label: '表单校验配置', 'titleEn': 'formValid', 'key': getGuidePath('form-valid') },
  { label: '常见问题', 'titleEn': 'faq', 'key': getGuidePath('faq') }
]

if (!isOpen) {
  guideMenus.push({ label: '社区求助', 'titleEn': 'help', 'key': getGuidePath('help') })
}

const reduceDeep = (reduceItem, reduceFn, preValue) => {
  if (!Array.isArray(reduceItem)) {
    return reduceFn(preValue, reduceItem)
  }
  return reduceItem.reduce((memo, item) => {
    memo = reduceFn(memo, item)
    return reduceDeep(item.children || [], reduceFn, memo)
  }, preValue)
}

export const menuPathMap = computed(() =>
  reduceDeep(
    [],
    (memo, item) => {
      memo.set(item.key, item)
      return memo
    },
    new Map()
  )
)
