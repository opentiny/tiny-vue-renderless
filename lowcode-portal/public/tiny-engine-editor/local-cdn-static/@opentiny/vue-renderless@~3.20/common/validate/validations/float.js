import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function float_default(rule, checkValue, cb, source, options) {
  const errors = [];
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  if (validate) {
    if (isEmptyValue(checkValue) && !rule.required) {
      return cb();
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
      rules.range(rule, checkValue, source, errors, options);
    }
  }
  cb(errors);
}
export { float_default as default };