import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function method_default(rule, checkValue, callback, source, options) {
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  const errors = [];
  if (validate) {
    if (!rule.required && isEmptyValue(checkValue)) {
      return callback();
    }
    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options
    });
    if (checkValue !== void 0) {
      rules.type(rule, checkValue, source, errors, options);
    }
  }
  callback(errors);
}
export { method_default as default };