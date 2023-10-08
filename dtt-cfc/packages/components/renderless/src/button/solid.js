import { handleClick, clearTimer } from './index'

export const api = ['state', 'handleClick']

export const renderless = (props, { useReactive }, { emit }) => {
  // 利用 Proxy 实现 useReactive 模拟 Vue 的响应式数据
  const { state, proxy } = useReactive({
    timer: undefined,
    disabled: Boolean(props.disabled),
    plain: props.plain,
    formDisabled: false
  })

  const api = {
    state,
    clearTimer: clearTimer(proxy),
    handleClick: handleClick({ emit, props, state: proxy })
  }

  return api
}
