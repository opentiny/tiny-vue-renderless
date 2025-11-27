import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
const ENUM = "enum";
function enum_default(rule, checkValue, callback, source, options) {
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
    if (checkValue !== void 0) {
      rules[ENUM](rule, checkValue, source, errors, options);
    }
  }
  callback(errors);
}
export { enum_default as default };