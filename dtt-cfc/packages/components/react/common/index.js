import * as hooks from 'react'
import { useReactive } from 'ahooks' // 使用 ahooks 提供的 useReactive 抹平 Vue 框架的响应式数据
import '@opentiny/vue-theme/base/index.css' // 复用 TinyVue 的样式文件

// 抹平 Vue 框架的事件触发机制
export const emit =
  (props) =>
  (evName, ...args) => {
    if (props[evName] && typeof props[evName] === 'function') {
      props[evName](...args)
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
