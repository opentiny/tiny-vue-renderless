export const handleFocus = ({ state, interval }) => () => {
  setTimeout(() => {
    if (!state.isClick) {
      state.focusing = true
    } else {
      state.isClick = false
    }
  }, interval)
}

export const handleHeaderClick = ({ componentName, dispatch, eventName, props, parent, state }) => () => {
  if (props.disabled) {
    return
  }

  dispatch(componentName, eventName, parent)

  state.focusing = false
  state.isClick = true
}

export const handleEnterClick = ({ componentName, dispatch, eventName, parent }) => () =>
  dispatch(componentName, eventName, parent)
