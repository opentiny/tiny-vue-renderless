import { watch, ref } from 'vue'
import Loading from '@opentiny/vue-loading'
import { debounce } from '../../../common/index'
import { hasTagItem, createNewTag, getTagId, emitChangeModelEvent } from '../utils/tag'
import { showDropdown } from '../utils/dropdown'

const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const getHighlightMatch = (labelRegex, label, valueLength) => {
  const match = []
  let lastIndex
  while (labelRegex.exec(label) !== null) {
    lastIndex = labelRegex.lastIndex
    const startIndex = lastIndex - valueLength
    const prevMatch = label.slice(0, startIndex)
    const currentMatch = [label.slice(startIndex, lastIndex)]
    prevMatch && match.push(prevMatch)
    match.push(currentMatch)
  }
  if (lastIndex < label.length) {
    match.push(label.slice(lastIndex))
  }

  return match
}

export function useMatch({ props, state, emits }) {
  const loadingInstance = ref(null)
  watch(
    () => state.inputValue,
    (newInput) => {
      if (!newInput.trim()) {
        state.isShowDropdown = true
      } else {
        state.isShowDropdown = false
      }
      showDropdown(state, false)
    }
  )

  const getMatchList = async (keyword: string) => {
    !loadingInstance.value &&
      (loadingInstance.value = Loading.service({
        target: document.getElementById('potential-loading')
      }))
    state.potentialOptions = await props.potentialOptions.getMatchList(keyword)
    loadingInstance.value && loadingInstance.value.close()
    if (state.potentialOptions.length) {
      state.isShowDropdown = true
    }
    showDropdown(state, state.isShowDropdown)
  }

  const handleSearch = (e) => {
    const { recordItems, propItem } = state
    const inputValue = e.target.value.trim()
    const { maxlength } = props

    if (maxlength && maxlength < inputValue.length) {
      emits('exceed', maxlength)
      return
    }

    if (inputValue.length === 0) {
      return
    }

    Object.keys(state.matchItems).forEach((key) => {
      state.matchItems[key].attr = []
      state.matchItems[key].attrValue = []
    })
    state.isShowDropdown = false

    const value = escapeRegExp(inputValue)
    const patt = new RegExp(value, 'i')
    const hasItem =
      propItem.label || !value ? null : recordItems.find((item) => item.type === 'map' && patt.test(item.label))
    if (hasItem) {
      state.propItem.label = hasItem.label
      state.inputValue = ''
      state.prevItem = hasItem
      state.backupPrevItem = hasItem
      state.backupList = hasItem.options || []
      return
    }

    state.filterList = state.backupList.filter((item) => {
      if (patt.test(item.label)) {
        delete item.isFilter
        if (hasTagItem(state, item.label)) {
          state.checkboxGroup.push(`${state.prevItem.label}${item.label}`)
        }

        return true
      } else {
        item.isFilter = true
        return false
      }
    })

    const labelRegex = new RegExp(value, 'ig')
    const valueLength = inputValue.length

    // 有label，只在backupList搜索
    if (state.propItem.label) {
      state.backupList.forEach((item) => {
        const itemLabel = item.label
        if (patt.test(itemLabel)) {
          item.match = getHighlightMatch(labelRegex, itemLabel, valueLength)
          item.isFilter = false
          state.isShowDropdown = true
        } else {
          item.isFilter = true
        }
      })
      return
    }

    // 无label，需要全局搜
    for (const item of recordItems) {
      const { options = [], groupKey = '0', ...rest } = item
      const itemLabel = rest.label
      if (patt.test(itemLabel)) {
        const match = getHighlightMatch(labelRegex, itemLabel, valueLength)
        state.matchItems[groupKey].attr.push({ ...item, match })
        state.isShowDropdown = true
      }
      for (const option of options) {
        const optionLabel = state.propItem.label ? itemLabel : `${itemLabel}：${option.label}`
        if (patt.test(optionLabel)) {
          const match = getHighlightMatch(labelRegex, optionLabel, valueLength)
          state.matchItems[groupKey].attrValue.push({
            ...option,
            ...rest,
            value: option.label,
            match
          })
          state.isShowDropdown = true
        }
      }
    }

    if (value && props.potentialOptions && props.potentialOptions.getMatchList) {
      getMatchList(value)
    } else {
      showDropdown(state, state.isShowDropdown)
    }
  }

  const handleInput = debounce(handleSearch, 500)

  const resetBackupList = () => {
    state.backupList.forEach((item) => item.isFilter && delete item.isFilter)
  }

  const selectFirstMap = (item, isFirst) => {
    const { options } = item
    const { prevItem, propItem } = state
    if (options) {
      state.propItem.value = `${item.label}=`
      state.isShowTagKey = false
      state.inputValue = ''
      state.backupList = item.options || []
      resetBackupList()

      state.backupList.forEach((subItem) => {
        const value = propItem.value + subItem.label
        subItem.isChecked = hasTagItem(state, value)
      })
    } else {
      if (item.isChecked) {
        return
      }

      state.isShowTagKey = true
      resetBackupList()
      const { field, type } = prevItem
      const value = propItem.value + item.label
      const id = getTagId(props, prevItem, item)
      const newTag = createNewTag({ type, field, label: propItem.label, value, ...id })
      const tagList = [newTag]
      emitChangeModelEvent({ emits, state, tagList })
    }
    if (isFirst) {
      showDropdown(state)
    }
  }

  return {
    handleInput,
    selectFirstMap
  }
}
