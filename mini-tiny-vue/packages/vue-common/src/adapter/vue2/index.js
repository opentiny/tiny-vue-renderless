import Vue from 'vue'
import * as hooks from '@vue/composition-api'

const defineComponent = hooks.defineComponent

/** 辅助构建一个同时适配vue2,vue3的公共方法 */
const tools = (context) => {
  const instance = hooks.getCurrentInstance()
  const vm = createVm({}, instance)

  return {
    framework: 'vue2',
    emit: context.emit,
    nextTick: hooks.nextTick,
    vm
  }
}
const h = hooks.h

Vue.use(hooks.default)

/** 返回一个函数，充当组件render函数。 该函数用于返回 <view ...props> ...slots < /view> 结构的VNode */
const renderComponent = ({ view, props, context: { attrs, listeners: on, slots }, extend = {} }) => {
  return () => h(view, Object.assign({ props, attrs, on, scopedSlots: { ...slots } }, extend))
}

const mapping = (content, before, after) => {
  if (typeof content[before] !== 'undefined') {
    const fn = content[before]

    content[after] = (el, binding, vnode) => {
      binding.instance = vnode.context
      fn(el, binding, vnode)
    }

    delete content[before]
  }
}

// 将任意指令转换为vue3兼容的指令
const directive = (directives) => {
  for (const name in directives) {
    const content = directives[name]

    mapping(content, 'beforeMount', 'bind')
    mapping(content, 'updated', 'update')
    mapping(content, 'unmounted', 'unbind')
  }

  return directives
}

// 创建一个Vue2 运行时的兼容 vm 对象
const createVm = (vm, _instance) => {
  const instance = _instance.proxy
  Object.defineProperties(vm, {
    $attrs: { get: () => instance.$attrs },
    $listeners: { get: () => instance.$listeners },
    $el: { get: () => instance.$el },
    $parent: { get: () => instance.$parent },
    $children: { get: () => instance.$children },
    $nextTick: { get: () => hooks.nextTick },
    $on: { get: () => instance.$on.bind(instance) },
    $once: { get: () => instance.$once.bind(instance) },
    $off: { get: () => instance.$off.bind(instance) },
    $refs: { get: () => instance.$refs },
    $slots: { get: () => instance.$scopedSlots },
    $scopedSlots: { get: () => instance.$scopedSlots },
    $set: { get: () => instance.$set }
  })

  return vm
}

export { hooks, defineComponent, tools, h, renderComponent, directive }
