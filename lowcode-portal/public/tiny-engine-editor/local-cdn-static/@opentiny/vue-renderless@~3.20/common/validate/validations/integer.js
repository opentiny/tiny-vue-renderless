import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function integer_default(rule, checkValue, callback, source, options) {
  const errors = [];
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  if (validate) {
    if (isEmptyValue(checkValue) && !rule.required) {
      return callback();
    }
    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options
    });
    if (checkValue !== void 0 && checkValue !== "") {
      rules.type(rule, checkValue, source, errors, options);
      rules.range(rule, checkValue, source, errors, options);
    }
  }
  callback(errors);
}
export { integer_default as default };