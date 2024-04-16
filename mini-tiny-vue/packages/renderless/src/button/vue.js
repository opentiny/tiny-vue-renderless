import { handleClick, unmounted } from './index'

/**  指明哪些变量会暴露到模板上 */
export const api = ['state', 'handleClick']

/** 在每个组件内的setup周期，执行一次，并生成与该组件相关的上下文对象： state, api
 *  第2个参就是hooks
 *  第3个参数是adapter返回的兼容2个框架的对象
 */
export const renderless = (props, { onBeforeUnmount, reactive }, { emit }) => {
  const state = reactive({
    timer: 0,
    disabled: props.disabled
  })

  const api = {
    state,
    unmounted: unmounted(state),
    handleClick: handleClick({ emit, props, state })
  }

  onBeforeUnmount(api.unmounted)

  return api
}
