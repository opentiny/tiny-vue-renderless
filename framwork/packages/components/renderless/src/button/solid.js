import { handleClick, clearTimer } from './index'

export const api = ['state', 'handleClick']

export default function renderless(
  props,
  { useReactive },
  { emit },
  { framework }
) {
  const state = useReactive({
    timer: null,
    disabled: !!props.disabled,
    plain: props.plain,
    formDisabled: false,
    buttonDisabled: (curState) =>
      curState.disabled || !!props.disabled || curState.formDisabled
  })

  state.disabled = !!props.disabled

  const api = {
    state,
    clearTimer: clearTimer(state),
    handleClick: handleClick({ emit, props, state, framework })
  }

  return api
}
