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
  { useReactive, useNextTick: nextTick },
  { emit }
) {
  const { state, proxy } = useReactive({
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    // 每秒执行（实例）
    setIntervalInstance: Object.freeze({ stop: () => {} }),
    deadlineTimestamp: Date.now() + props.deadline * 1000
  })
  const renderFn = render({ state: proxy, props, nextTick, emit })

  const api = {
    state,
    render: renderFn,
    start: start({ render: renderFn, state: proxy, emit, props }),
    reset: reset({ state: proxy, props, renderFn })
  }

  init({ api, props, state: proxy })

  return api
}
