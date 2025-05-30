import { ref, watch } from 'vue'

export function usePlaceholder({ props, state, t }) {
  const placeholder = ref(props.emptyPlaceholder)

  const setPlaceholder = (placeholderValue: string) => {
    placeholder.value = placeholderValue
  }

  if (props.modelValue.length > 0) {
    setPlaceholder(t('tvp.tvpSearchbox.addPlaceholder'))
  }

  watch(
    () => state.propItem.label,
    (newValue) => {
      if (newValue) {
        const { placeholder, type } = state.prevItem
        if (placeholder) {
          setPlaceholder(placeholder)
        } else if (type === 'map') {
          setPlaceholder(t('tvp.tvpSearchbox.tagPlaceholder'))
        } else if (state.backupList?.length) {
          setPlaceholder(t('tvp.tvpSearchbox.dynamicPlaceholder', { newValue }))
        } else {
          setPlaceholder(t('tvp.tvpSearchbox.addPlaceholder'))
        }
      } else {
        if (props.modelValue.length > 0) {
          setPlaceholder(t('tvp.tvpSearchbox.addPlaceholder'))
        } else {
          setPlaceholder(props.emptyPlaceholder)
        }
      }
    }
  )

  return {
    placeholder,
    setPlaceholder
  }
}
