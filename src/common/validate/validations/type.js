import rules from '../rules/index'
import { isEmptyValue } from '../util'
import { hasOwn } from '@opentiny/vue-renderless/common/type'

export default function (rule, checkValue, callback, source, options) {
  const ruleType = rule.type
  const errors = []
  const validate =
    rule.required || (!rule.required && hasOwn.call(source, rule.field))

  if (validate) {
    if (isEmptyValue(checkValue, ruleType) && !rule.required) {
      return callback()
    }

    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options,
      type: ruleType
    })

    if (!isEmptyValue(checkValue, ruleType)) {
      rules.type(rule, checkValue, source, errors, options)
    }
  }

  callback(errors)
}
