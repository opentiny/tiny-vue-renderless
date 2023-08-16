export const handleClick =
  ({ emit, props, state, framework }) =>
  (event) => {
    if (props.nativeType === 'button' && props.resetTime > 0) {
      state.disabled = true
      state.timer = setTimeout(() => {
        state.disabled = false
      }, props.resetTime)
    }

    console.log(`${framework}框架代码已触发！！！！！！！！！`)

    emit('click', event)
  }

export const clearTimer = (state) => () => clearTimeout(state.timer)
