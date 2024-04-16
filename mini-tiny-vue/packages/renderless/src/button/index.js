export const handleClick =
  ({ emit, props, state }) =>
  (event) => {
    if (props.resetTime > 0) {
      state.disabled = true
      state.timer = setTimeout(() => (state.disabled = false), props.resetTime)
    }

    emit('click', event)
  }

export const unmounted = (state) => () => clearTimeout(state.timer)
