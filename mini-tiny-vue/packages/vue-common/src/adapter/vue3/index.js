import * as hooks from 'vue'
import { emitter } from '../utils'

const defineComponent = hooks.defineComponent

/** 辅助构建一个同时适配vue2,vue3的公共方法 */
const tools = (context) => {
  const instance = hooks.getCurrentInstance()
  const vm = createVm({}, instance)

  return {
    framework: 'vue3',
    emit: context.emit,
    nextTick: hooks.nextTick,
    vm
  }
}

/** 返回一个函数，充当组件render函数。 该函数用于返回 <view ...props> ...slots < /view> 结构的VNode */
const renderComponent = ({ view, props, context: { attrs, slots }, extend = {} }) => {
  return () => hooks.h(view, { ...props, ...attrs, ...extend }, slots)
}

// 在 vue3 下，创建一个兼容vue2写法的 h 函数。
import { camelize, capitalize } from '@opentiny/renderless/src/common/string'
const parseProps = (propsData) => {
  const props = {}

  for (const name in propsData) {
    if (name === 'class' || name === 'style') {
      props[name] = propsData[name]
    } else if (name === 'on' || name === 'nativeOn') {
      const events = propsData[name]

      for (const eventName in events) props[`on${capitalize(camelize(eventName))}`] = events[eventName]
    } else if (name === 'attrs' || name === 'props' || name === 'domProps') {
      const attrs = propsData[name]

      for (const key in attrs) props[key] = attrs[key]
    } else {
      props[name] = propsData[name]
    }
  }

  return props
}

const h = (component, propsData, childData) => {
  let props = {}
  let children = childData

  if (propsData && typeof propsData === 'object' && !Array.isArray(propsData)) {
    props = parseProps(propsData)
    propsData.scopedSlots && (children = propsData.scopedSlots)
  } else if (typeof propsData === 'string' || Array.isArray(propsData)) {
    childData = propsData
  }

  if (typeof childData === 'string' || Array.isArray(childData))
    children = typeof component !== 'string' ? () => childData : childData

  return hooks.h(component, props, children)
}

const mapping = (content, before, after) => {
  if (typeof content[before] !== 'undefined') {
    const fn = content[before]

    content[after] = (el, binding, vnode) => {
      vnode.context = binding.instance
      fn(el, binding, vnode)
    }

    delete content[before]
  }
}

// 将任意指令转换为vue3兼容的指令
const directive = (directives) => {
  for (const name in directives) {
    const content = directives[name]

    mapping(content, 'bind', 'beforeMount')
    mapping(content, 'update', 'updated')
    mapping(content, 'unbind', 'unmounted')
  }

  return directives
}

// 创建一个Vue3 运行时的兼容 vm 对象
const createVm = (vm, instance) => {
  const { $attrs, $listeners } = generateListeners(instance.attrs)
  const $emitter = emitter()
  const $set = (target, propertyName, value) => (target[propertyName] = value)

  Object.defineProperties(vm, {
    $attrs: { get: () => $attrs },
    $listeners: { get: () => $listeners },
    $el: { get: () => instance.vnode.el },
    $parent: { get: () => instance.parent },
    $children: { get: () => generateChildren(instance.subTree) },
    $nextTick: { get: () => hooks.nextTick },
    $on: { get: () => $emitter.on },
    $once: { get: () => $emitter.once },
    $off: { get: () => $emitter.off },
    $refs: { get: () => instance.refs },
    $slots: { get: () => instance.slots },
    $scopedSlots: { get: () => instance.slots },
    $set: { get: () => $set }
  })

  return vm
}

const regEventPrefix = /^on[A-Z]/

const generateListeners = (attrs) => {
  const $attrs = {}
  const $listeners = {}

  for (const name in attrs) {
    const event = attrs[name]

    if (regEventPrefix.test(name) && typeof event === 'function') {
      $listeners[name.slice(2)] = event
      continue
    }

    $attrs[name] = event
  }

  return { $attrs, $listeners }
}

const generateChildren = (subTree) => {
  const children = []
  children.refs = {}

  if (subTree) {
    const arr = subTree.dynamicChildren || subTree.children

    if (Array.isArray(arr)) {
      arr.forEach((child) => {
        if (child.component) {
          const vm = createVm({}, child.component)

          children.push(vm)
          child.props.ref && (children.refs[child.props.ref] = vm)
        }
      })
    } else if (subTree.component) {
      children.push(createVm({}, subTree.component))
    }
  }

  return children
}


export { hooks, defineComponent, tools, h, renderComponent, directive }
