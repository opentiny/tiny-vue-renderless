import {
  render,
  CustomSetInterval,
  getRestTime,
  start,
  reset,
  init
} from './index'

export const api = ['state']

export const renderless = (
  props,
  { onBeforeUnmount, reactive, watch },
  { emit, nextTick }
) => {
  const state = reactive({
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    setIntervalInstance: Object.freeze({ stop: () => {} }),
    deadlineTimestamp: Date.now() + props.deadline * 1000
  })

  const renderFn = render({ state, props, nextTick, emit })

  const api = {
    state,
    render: renderFn,
    start: start({ render: renderFn, state, emit, props }),
    reset: reset({ state, props, renderFn })
  }

  init({ api, props, state })

  onBeforeUnmount(() => {
    state.setIntervalInstance.stop()
  })

  return api
}
