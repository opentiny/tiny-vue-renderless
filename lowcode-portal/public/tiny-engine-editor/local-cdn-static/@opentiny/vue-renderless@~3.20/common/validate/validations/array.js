import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function array_default(rule, checkValue, callback, source, options) {
  const errors = [];
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  if (validate) {
    if (isEmptyValue(checkValue, "array") && !rule.required) {
      return callback();
    }
    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options,
      type: "array"
    });
    if (!isEmptyValue(checkValue, "array")) {
      rules.type(rule, checkValue, source, errors, options);
      rules.range(rule, checkValue, source, errors, options);
    }
  }
  callback(errors);
}
export { array_default as default };