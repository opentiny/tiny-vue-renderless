import { toRaw, ref } from 'vue'
import { $t2 } from '@/i18n/index'
import { demoModules } from './demo-modules'
import { isCustomScroll } from '../shared/store'
import { VITE_CONTEXT } from '../shared/const'
const baseUrl = import.meta.env.BASE_URL

/**
 * json clone， 会丢失函数等。
 * @param obj 普通对象或reactive对象
 */
const $clone = (target) => JSON.parse(JSON.stringify(target))

/**
 * 将目标字段分隔后，取相应位置的值
 * @example $split("/project/home","/",-1)   //取出home
 * @param target 目标字符串
 * @param splitor 分隔符
 * @param pos 取数位置，可为-1,-2
 */
const $split = (target, splitor = '/', pos = 0) => target.split(splitor).slice(pos)[0]

/**
 * 延时函数
 * @example $delay(300).then(()=>{   })
 */
const $delay = (time) => new Promise((resolve) => setTimeout(resolve, time))

/**
 * 空闲函数
 * @example $idle().then(()=>{   })
 */
const $idle = () => new Promise((resolve) => (window.requestIdleCallback || window.requestAnimationFrame)(resolve))

const $pub = (url) => baseUrl + url

// 从 https:// 获取 utf-8 文件
const fetchFile = async (path) => {
  const res = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
  if (res.ok) {
    return res.text()
  } else {
    throw new Error(res.statusText)
  }
}

/**
 * 获取i18n字段，用来兼容此项目的各种规范
 * 符合以下3种规范
 *  1. { title: { 'zh-CN': '标题', 'en-US': 'title' } } 'title'
 *  2. { 'zh-CN': '标题', 'en-US': 'title' }
 *  3. { title: '标题', titleEn: 'title' }  'title'
 * @param {object} obj
 * @param {string} field
 * @returns {string} 文本内容
 */
const getI18n = (obj, field) => {
  const isObj = (x) => x && typeof x === 'object'
  if (!isObj(obj)) {
    return obj
  }
  const zhCnLangKey = $t2('zh-CN', 'en-US')
  if (!field) {
    return obj[zhCnLangKey] || obj['zh-CN']
  }
  const zhLangKey = $t2('Cn', 'En')
  const value = obj[field]
  if (typeof value === 'string') {
    return obj[`${field}${zhLangKey}`] || value
  }
  if (!isObj(value)) {
    return value
  }
  return value[zhCnLangKey] || value['zh-CN']
}

const getAllI18n = (obj, field) => {
  const isObj = (x) => x && typeof x === 'object'
  const joinAllFiled = (strings) => strings.filter((i) => typeof i === 'string' && /[^\s]/.test(i)).join(' ')
  if (!isObj(obj)) {
    return obj
  }
  if (!field) {
    return joinAllFiled([obj['zh-CN'], obj['en-US']])
  }
  const value = obj[field]
  if (typeof value === 'string') {
    return joinAllFiled([obj[`${field}Cn`], value, obj[`${field}En`]])
  }
  if (!isObj(value)) {
    return value
  }
  return joinAllFiled([value['zh-CN'], value['en-US']])
}

/**
 * fetch组件库示例静态文件，包括markdown、示例源码和示例配置
 * @param {string} path
 * @returns
 */
const fetchDemosFile = (path) => fetchFile(baseUrl + path)

const getDemoModuleValue = (path) => {
  if (!path) {
    return null
  }
  const demoPath = path.replace(/^@demos\//, '')
  const demoModule = demoModules[demoPath]
  if (!demoModule) {
    const replaceReg = /(?<lan>zh-CN|en-US|cn|en)\.md$/
    const replacedValue = [
      $t2('cn.md', 'en.md'),
      $t2('zh-CN.md', 'en-US.md'),
      $t2('en.md', 'cn.md'),
      $t2('en-US.md', 'zh-CN.md')
    ]
    const relatedModule =
      replaceReg.test(demoPath) &&
      replacedValue.map((suffix) => demoModules[demoPath.replace(replaceReg, suffix)]).find(Boolean)
    if (relatedModule) {
      return relatedModule
    }
  }
  return demoModule
}

const getDemoModule = (path) => {
  const demoModule = getDemoModuleValue(path)
  if (typeof demoModule === 'function') {
    const value = demoModule()
    return typeof value?.then === 'function' ? value.then((res) => res.default) : value?.default ?? value
  } else if (demoModule?.default) {
    return demoModule.default
  }
  return demoModule
}

const hasDemoModule = (path) => Boolean(getDemoModuleValue(path))

const debounce = (fn, delay) => {
  let timer = null
  function debounced(...args) {
    debounced.cancel()
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
  debounced.cancel = () => {
    timer && clearTimeout(timer)
  }

  return debounced
}

const throttle = (fn, delay) => {
  let timer = null
  return function throttled(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
      }, delay)
      return fn.apply(this, args)
    }
    return undefined
  }
}

const scrollSmooth = async (scrollContainer, scrollTop, scrollTime = 350) => {
  isCustomScroll.value = true
  try {
    if (scrollContainer) {
      const getTargetScrollTop = () => (typeof scrollTop === 'function' ? scrollTop() : scrollTop)
      scrollContainer.style.scrollBehavior = 'auto'
      const changedScrollTop = getTargetScrollTop()
      const containerScrollTop = scrollContainer?.scrollTop
      const scrollStart = Date.now()
      let consumedTime = 0
      // 200ms内滚动至目标位置
      while (consumedTime < scrollTime) {
        scrollContainer.scrollTop =
          containerScrollTop + (consumedTime / scrollTime) * (changedScrollTop - containerScrollTop)
        await new Promise((r) => requestAnimationFrame(() => r()))
        consumedTime = Date.now() - scrollStart
      }
      scrollContainer.scrollTop = getTargetScrollTop()
      scrollContainer.style.scrollBehavior = ''
    }
  } finally {
    isCustomScroll.value = false
  }
}

const getElementById = (id) =>
  typeof id === 'string' && id && (document.getElementById(id) || document.getElementById(encodeURIComponent(id)))

const findParent = (dom, fn) => {
  if (!dom) {
    return dom
  }
  const parent = dom.parentElement || dom.parentNode
  if (!parent) {
    return null
  }
  return fn(parent) ? parent : findParent(parent, fn)
}

const findNextElementSibling = (dom, fn) => {
  if (!dom) {
    return dom
  }
  const { nextElementSibling } = dom
  if (!nextElementSibling) {
    return null
  }
  return fn(nextElementSibling) ? nextElementSibling : findNextElementSibling(nextElementSibling, fn)
}
const getNativeElement = (refInstance) => {
  const refValue = toRaw(refInstance)
  return refValue && (refValue instanceof HTMLElement ? refValue : refValue.$el)
}

const getBoundingClientRect = (refInstance) => getNativeElement(refInstance)?.getBoundingClientRect?.()

/**
 * 线段是否重叠
 * @param param0 线段1起始，如 [0,1]
 * @param param1 线段2起始，如 [1,2]
 * @returns 重叠 true
 */
const isOverlap = ([left1, right1], [left2, right2]) =>
  (left1 - left2) * (left1 - right2) <= 0 ||
  (right1 - left2) * (right1 - right2) <= 0 ||
  (left2 - left1) * (left2 - right1) <= 0 ||
  (right2 - left1) * (right2 - right1) <= 0

/**
 * 元素是否在视窗之内
 * @param element dom元素 / Ref<dom> / Ref<VueComponent>
 * @param rootMargin 根元素的外边距，如 {top: 10, bottom: 10, left:10, right: 10}
 * @returns 视窗内 true
 */
const isInView = (element, rootMargin = {}) => {
  const domRect = getBoundingClientRect(element)
  if (!domRect) {
    return false
  }
  const { top = 0, bottom = 0, left = 0, right = 0 } = rootMargin
  const viewHeight = window.innerHeight || document.documentElement.clientHeight
  const viewWidth = window.innerWidth || document.documentElement.clientWidth

  return (
    isOverlap([domRect.top, domRect.bottom], [top, viewHeight - bottom]) &&
    isOverlap([domRect.left, domRect.right], [left, viewWidth - right])
  )
}

const removeDupSplitor = (str) => str.replace(/[/]{2,}/g, '/')

const originTitle = 'OpenTiny NEXT - 企业智能前端开发解决方案'
const geneTitle = (title) => (title ? `${originTitle} | ${title}` : originTitle)

const firstRoutes = ['design-principle', 'design-develop', 'guide', 'case-library', 'resouce-library', 'about']

const getRoutePath = (p) => {
  if (!p || typeof p !== 'string') {
    return ''
  }
  const relativePath = p.replace(location.origin, '').replace(/^\//, '')
  switch (true) {
    case relativePath === '':
      return VITE_CONTEXT
    case relativePath.startsWith('opentiny-design'):
      return removeDupSplitor(`${VITE_CONTEXT}${relativePath}`)
    case firstRoutes.some((r) => relativePath.startsWith(r)):
      return removeDupSplitor(`${VITE_CONTEXT}opentiny-design/${relativePath}`)
    default:
      return ''
  }
}
const dealedEle = new WeakSet()

const dealHrefElement = debounce(() => {
  const eles = Array.from(document.querySelectorAll('.click-captrue a[href],.markdown-body a[href]') || [])
  eles.forEach((ele) => {
    if (dealedEle.has(ele)) {
      return
    }
    dealedEle.add(ele)
    const attrHref = ele.getAttribute('href')?.replace?.(/^\//, '')
    const isRoute = attrHref && firstRoutes.some((item) => attrHref.startsWith(item))
    if (isRoute) {
      ele.setAttribute('href', removeDupSplitor(`/opentiny-design/${attrHref}`))
    }
  })
}, 200)

const searchMenuItem = (menu, searchValue) => {
  if (!searchValue) {
    return menu
  }
  if (!menu) {
    return null
  }
  if (Array.isArray(menu)) {
    return menu.map((item) => searchMenuItem(item, searchValue)).filter(Boolean)
  }
  const { children, label, searchKey } = menu
  const isInclude = (a, b) =>
    typeof a === 'string' && typeof b === 'string' && a.toLowerCase().includes(b.toLowerCase())
  if (isInclude(searchKey, searchValue)) {
    return menu
  }
  if (isInclude(label, searchValue)) {
    return menu
  }

  const searchedChlid = searchMenuItem(children, searchValue)
  if (Array.isArray(searchedChlid) && searchedChlid.length) {
    return {
      ...menu,
      children: searchedChlid
    }
  }
  return Array.isArray(menu) ? [] : null
}

const pathJoin = (path1, path2) => {
  let allPaths = path1
    .split(/[/\//]+/g)
    .map((item) => item.trim())
    .slice(0, -1)
    .filter((i) => i)
  const paths2 = path2
    .split(/[/\//]+/g)
    .map((item) => item.trim())
    .filter((i) => i)

  for (let index = 0; index < paths2.length; index++) {
    const element = paths2[index]
    // .. 移除上一个目录
    if (element === '..') {
      allPaths.pop()
    } else if (element !== '.') {
      allPaths.push(element)
    }
  }
  return allPaths.join('/')
}

export const useCopy = () => {
  const copyTip = ref('复制')
  const resetTip = debounce(() => {
    copyTip.value = '复制'
    copyIcon.value = 'i-ti-copy'
  }, 1000)
  const copyIcon = ref('i-ti-copy')
  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    copyTip.value = '复制成功'
    copyIcon.value = 'i-ti-check'
    resetTip()
  }

  return [copyTip, copyText, copyIcon]
}

const single = (fn) => {
  let callingPromise
  return async function (...args) {
    if (callingPromise) {
      return callingPromise
    }
    try {
      callingPromise = fn.apply(this, args)
      const result = await callingPromise
      callingPromise = null
      return result
    } catch (e) {
      callingPromise = null
      throw e
    }
  }
}

const isObject = (x) => x !== null && typeof x === 'object'

const isEmpty = (value) => (isObject(value) ? Object.keys(value).length === 0 : ['', undefined].includes(value))

export {
  $clone,
  $split,
  $delay,
  $idle,
  $pub,
  fetchDemosFile,
  fetchFile,
  getI18n,
  getDemoModule,
  hasDemoModule,
  debounce,
  throttle,
  scrollSmooth,
  getElementById,
  findParent,
  findNextElementSibling,
  isOverlap,
  isInView,
  getBoundingClientRect,
  getNativeElement,
  getAllI18n,
  removeDupSplitor,
  geneTitle,
  getRoutePath,
  dealHrefElement,
  searchMenuItem,
  pathJoin,
  single,
  isObject,
  isEmpty
}
