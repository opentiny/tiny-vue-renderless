import * as vue2 from './adapter/vue2'
import * as vue3 from './adapter/vue3'

const vue = VUE_VERSION == 2 ? vue2 : vue3

const { hooks, defineComponent, tools, h, renderComponent, directive } = vue
export { hooks, defineComponent, tools, h, renderComponent, directive }

import '@opentiny/vue-theme/src/base/index.less'

// 全局一些变量
export const $prefix = 'Tiny'

/** 组件逻辑插注入函数。
 * 一边传入组件的props,context, 一边传入无状态的renderless函数。
 * 它调用 renderless,并返回与当前组件关联的上下文变量/函数，供模板绑定。 */
export const setup = ({ props, context, renderless, api }) => {
  const utils = {
    $prefix,
    ...tools(context)
  }

  const sdk = renderless(props, hooks, utils)

  const attrs = {}

  api.forEach((name) => (attrs[name] = sdk[name]))

  return attrs
}

export const $props = {
  'tiny_mode': String
  // ... 其它公共属性, 此mini工程仅使用到 tiny_mode
}
export const props = ['tiny_mode']

const isRightMode = (mode) => ~['pc', 'mobile'].indexOf(mode)

export const resolveMode = (props) => {
  return isRightMode(props.tiny_mode) ? props.tiny_mode : 'pc'
}

/** 该函数在组件的index.js的组件中调用，模板视图选择器 */
export const $setup = ({ props, context, template, extend = {} }) => {
  const mode = resolveMode(props, context)

  const view = template(mode, props)

  return renderComponent({ view, props, context, extend })
  // return () => h(view, Object.assign({ props, attrs, on, scopedSlots: { ...slots } }, extend))
}

 