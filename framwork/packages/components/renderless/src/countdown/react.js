import {
  render,
  CustomSetInterval,
  getRestTime,
  start,
  reset,
  init
} from './index'

export const api = ['state']

export default function renderless(
  props,
  { useReactive, useEffect, useNextTick: nextTick, use },
  { emit }
) {
  const state = useReactive({
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    // 每秒执行（实例）
    setIntervalInstance: Object.freeze({ stop: () => {} }),
    deadlineTimestamp: Date.now() + props.deadline * 1000,
    time: 0
  })

  const renderFn = render({ state, props, nextTick, emit })

  const api = {
    state,
    render: renderFn,
    start: start({ render: renderFn, state, emit, props }),
    reset: reset({ state, props, renderFn })
  }

  nextTick(() => {
    if (!state.time) {
      init({ api, props, state })
      state.time++
    }
  })

  return api
}
