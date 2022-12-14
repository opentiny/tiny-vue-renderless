import * as util from '../util'
import { isNumber } from '@opentiny/vue-renderless/common/type'
import { getLength } from '@opentiny/vue-renderless/common/string'

function getErro({ min, max, val, key, rule, errors, util, options }) {
  if (min && !max && val < rule.min) {
    errors.push(
      util.format(options.messages[key].min, rule.fullField, rule.min)
    )
  } else if (max && !min && val > rule.max) {
    errors.push(
      util.format(options.messages[key].max, rule.fullField, rule.max)
    )
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(
      util.format(
        options.messages[key].range,
        rule.fullField,
        rule.min,
        rule.max
      )
    )
  }
}

export default function (rule, checkValue, source, errors, options) {
  const len = isNumber(rule.len)
  const min = isNumber(rule.min)
  const max = isNumber(rule.max)
  let val = checkValue
  let key = null
  const num = isNumber(checkValue)
  const str = typeof checkValue === 'string'
  const arr = Array.isArray(checkValue)

  if (num) {
    key = 'number'
  } else if (str) {
    key = 'string'
  } else if (arr) {
    key = 'array'
  }

  if (!key) {
    return false
  }

  if (arr) {
    val = checkValue.length
  }

  if (str) {
    val = getLength(checkValue, 'string')
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(
        util.format(options.messages[key].len, rule.fullField, rule.len)
      )
    }
  } else {
    getErro({ min, max, val, key, rule, errors, util, options })
  }
}
