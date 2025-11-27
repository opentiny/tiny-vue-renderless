import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function type_default(rule, checkValue, callback, source, options) {
  const ruleType = rule.type;
  const errors = [];
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  if (validate) {
    if (isEmptyValue(checkValue, ruleType) && !rule.required) {
      return callback();
    }
    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options,
      type: ruleType
    });
    if (!isEmptyValue(checkValue, ruleType)) {
      rules.type(rule, checkValue, source, errors, options);
    }
  }
  callback(errors);
}
export { type_default as default };