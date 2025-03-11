import { showDropdown } from '../utils/dropdown'
import { getVerifyNumTag } from '../utils/validate'
import { emitChangeModelEvent } from '../utils/tag'

export function useNumRange({ props, state, t, emits }) {
  const { instance } = state
  const sizeChange = async (confirm: boolean) => {
    if (!confirm) {
      state.propItem.label = ''
      return
    }

    const newTag = await getVerifyNumTag(instance, state, props)
    if (newTag) {
      const newValue = props.modelValue.filter((prev) => prev.type !== newTag.type || prev.field !== newTag.field)
      newValue.push(newTag)
      emitChangeModelEvent({ emits, state, newValue })
      showDropdown(state, false)
    } else {
      showDropdown(state)
    }
  }

  /**
   * 创建 type=dateRange 和 type = datetimeRange 的校验规则
   * @param startKey 校验的开始日期名
   * @param endKey 校验的结束日期名
   */
  const createDateRules = (item, startKey, endKey) => {
    const { maxTimeLength = 0 } = item
    return {
      [startKey]: {
        validator: (rule, value, cb) => {
          if (maxTimeLength > 0 && !value) {
            cb(new Error(t('tvp.tvpSearchbox.notBeNull')))
          } else if (!value && !state[endKey]) {
            cb(new Error(t('tvp.tvpSearchbox.rangeDateTitle')))
          } else {
            cb()
          }
        }
      },
      [endKey]: {
        validator: (rule, value, cb) => {
          if (maxTimeLength > 0 && !value) {
            cb(new Error(t('tvp.tvpSearchbox.notBeNull')))
          } else if (!value && !state[startKey]) {
            cb(new Error(t('tvp.tvpSearchbox.rangeDateTitle')))
          } else {
            cb()
          }
        }
      }
    }
  }

  const initFormRule = () => {
    let dateRules = {},
      datetimeRules = {}
    props.items.forEach((item) => {
      if (item.type === 'dateRange') {
        dateRules = createDateRules(item, 'startDate', 'endDate')
      }

      if (item.type === 'datetimeRange') {
        datetimeRules = createDateRules(item, 'startDateTime', 'endDateTime')
      }
    })
    state.formRules = {
      ...dateRules,
      ...datetimeRules
    }
    if (props.editable) {
      state.formRules.inputEditValue = {
        required: true,
        message: t('tvp.tvpSearchbox.notBeNull'),
        trigger: ['change', 'blur']
      }
    }
  }

  return {
    initFormRule,
    sizeChange
  }
}
