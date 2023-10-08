import * as hooks from 'solid-js'
import { createSignal } from 'solid-js'
import '@opentiny/vue-theme/base/index.css'

const EVENTS_PREFIX = 'on'

// 处理 Solid 事件触发机制
export const emit =
  (props) =>
  (evName, ...args) => {
    const eventsName = `${EVENTS_PREFIX}${evName[0].toLocaleUpperCase()}${evName.slice(1)}`
    if (props[eventsName] && typeof props[eventsName] === 'function') {
      props[eventsName](...args)
    }
  }

export const useSetState = (initialState) => {
  const [state, setState] = createSignal(initialState, { equals: false })
  return [state, setState]
}

// props 应该不用做处理， props 都是 . 访问。
export const useReactive = (staticObject) => {
  const [state, setState] = useSetState(staticObject)

  return {
    state,
    proxy: new Proxy(state(), {
      get(target, property) {
        if (typeof target[property] === 'function') {
          return target[property](target)
        } else {
          return target[property]
        }
      },
      set(target, property, value) {
        Reflect.set(target, property, value)
        setState((val) => val)
        return true
      }
    })
  }
}

// 模拟 Vue 框架的 nextTick，等待 dom 更新后触发回调
export const useNextTick = queueMicrotask

// emitEvent, dispatch, broadcast
export const emitEvent = () => {
  return {
    dispatch: () => '',
    broadcast: () => ''
  }
}

export const useSetup = ({
  props, // 模板层传递过来的 props 属性
  renderless // renderless 无渲染函数
}) => {
  const utils = {
    parent: {},
    emit: emit(props)
  }

  const sdk = renderless(props, { ...hooks, useReactive, useNextTick }, utils)

  return {
    ...sdk,
    type: props.type ?? 'default'
  }
}
