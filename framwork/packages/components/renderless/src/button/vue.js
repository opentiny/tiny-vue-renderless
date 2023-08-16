import { handleClick, clearTimer } from './index'

export const api = ['state', 'handleClick']

export const renderless = (
  props,
  { computed, onBeforeUnmount, reactive, watch, inject },
  { emit, parent },
  { framework }
) => {
  parent.tinyForm = parent.tinyForm || inject('form', null)

  const state = reactive({
    timer: null,
    disabled: props.disabled,
    plain: computed(() => props.plain || (parent.buttonGroup || {}).plain),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    buttonDisabled: computed(
      () =>
        props.disabled ||
        state.disabled ||
        (parent.buttonGroup || {}).disabled ||
        state.formDisabled
    )
  })

  watch(
    () => props.disabled,
    (value) => {
      state.disabled = value
    },
    { immediate: true }
  )

  const api = {
    state,
    clearTimer: clearTimer(state),
    handleClick: handleClick({ emit, props, state, framework })
  }

  onBeforeUnmount(api.clearTimer)

  return api
}
