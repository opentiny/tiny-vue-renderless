import { computed } from 'vue'
import { hasTagItem, createNewTag, getTagId, emitChangeModelEvent } from '../utils/tag'
import { deepClone, omitObj } from '../utils/clone'

export function useCheckbox({ props, state, emits }) {
  const selectCheckbox = (confirm: boolean) => {
    const { checkboxGroup, prevItem, propItem } = state
    const rest = omitObj(prevItem)
    state.hiden = true
    if (confirm) {
      const tagList = []
      const oldValue = deepClone(state.innerModelValue)
      const { mergeTag, operators, label: prevLabel } = prevItem
      if (mergeTag) {
        let value = ''
        const options = []
        const { indexMap } = state
        const hasTagIndex = indexMap.get(prevLabel)
        hasTagIndex !== undefined && state.innerModelValue.splice(hasTagIndex, 1)

        state.backupList.forEach((item) => {
          const { label } = item
          const checkboxLabel = `${prevLabel}${label}`
          const hasItem = checkboxGroup.includes(checkboxLabel)
          if (hasItem) {
            delete item.isFilter
            const id = getTagId(props, prevItem, item)
            const newOptions = { label: item.label, ...id }
            value += !value ? label : ` | ${label}`
            options.push(newOptions)
          }
        })
        if (options.length > 0) {
          const newTag = { ...rest, value, options }
          tagList.push(newTag)
        }
      } else {
        const { valueMap } = state
        const indexList = []
        state.backupList.forEach((item) => {
          const { label } = item
          const value = `${prevLabel}${label}`
          const hasItem = checkboxGroup.includes(value)
          if (hasItem && !hasTagItem(state, label)) {
            const id = getTagId(props, prevItem, item)
            const operator = state.operatorValue && operators ? { operator: state.operatorValue } : null
            const newTag = createNewTag({ ...rest, label: propItem.label, value: label, ...id, ...operator })
            tagList.push(newTag)
            item.isChecked = true
          } else if (!hasItem && hasTagItem(state, label)) {
            item.isChecked = false
            const index = valueMap.get(value)
            indexList.push(index)
          }
        })
        if (indexList.length) {
          state.innerModelValue = state.innerModelValue.filter((item, index) => item && !indexList.includes(index))
        }
      }
      emitChangeModelEvent({ emits, state, tagList, oldValue })
    } else {
      propItem.label = ''
      state.inputValue = ''
    }
  }

  const isIndeterminate = computed(
    () => state.checkboxGroup.length > 0 && state.checkboxGroup.length !== state.filterList.length
  )

  const checkAll = computed({
    get: () => state.checkboxGroup.length && state.checkboxGroup.length === state.filterList.length,
    set: (val) => {
      if (val) {
        state.checkboxGroup = state.filterList.flatMap((item) => `${state.prevItem.label}${item.label}`)
      } else {
        state.checkboxGroup = []
      }
    }
  })

  const isShowClose = computed(() => props.modelValue.length || state.propItem.label || state.inputValue)

  return {
    selectCheckbox,
    isIndeterminate,
    checkAll,
    isShowClose
  }
}
