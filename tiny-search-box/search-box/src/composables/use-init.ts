import { showDropdown, showPopover } from '../utils/dropdown'

export function useInit({ props, state }) {
  const { instance } = state
  const initItems = () => {
    state.groupItems = {}
    state.recordItems.forEach((item) => {
      const { groupKey = '0' } = item
      if (state.groupItems[groupKey]) {
        state.groupItems[groupKey].push({ ...item })
      } else {
        state.groupItems[groupKey] = [{ ...item }]
        state.matchItems[groupKey] = { attr: [], attrValue: [] }
      }
    })
  }

  const handleClick = (e) => {
    const { backupPrevItem, prevItem } = state
    e.stopPropagation()
    state.isResetFlag = true
    if (props.editable) {
      state.popoverVisible = false
      state.currentEditValue = []
      if (state.propItem.label && backupPrevItem && backupPrevItem !== prevItem) {
        state.prevItem = backupPrevItem
      }
    }

    if (!state.isShowPanel || props.items.length === 0) {
      showDropdown(state, false)
    } else {
      showDropdown(state)
    }
  }

  const watchOutsideClick = () => {
    if (!state.isMouseDown) {
      return
    }

    if (props.editable) {
      showPopover(state, false)
    }

    state.isMouseDown = false
    if (instance?.refs?.dropdownRef?.state?.visible) {
      showDropdown(state, false)
    }
  }

  const watchMouseDown = () => {
    state.isMouseDown = true
  }

  const watchMouseMove = () => {
    if (state.isMouseDown) {
      state.isMouseDown = false
    }
  }

  return {
    initItems,
    watchOutsideClick,
    watchMouseDown,
    watchMouseMove,
    handleClick
  }
}
