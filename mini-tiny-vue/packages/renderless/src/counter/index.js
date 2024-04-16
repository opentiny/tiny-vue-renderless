export const increase =
  ({ props, state, emit }) =>
  () => {
    state.value += props.step
    emit('change', state.value)
  }
export const decrease =
  ({ props, state, emit }) =>
  () => {
    state.value -= props.step
    emit('change', state.value)
  }

export const reset =
  ({ state, emit }) =>
  () => {
    state.value = 0
    emit('change', state.value)
  }
