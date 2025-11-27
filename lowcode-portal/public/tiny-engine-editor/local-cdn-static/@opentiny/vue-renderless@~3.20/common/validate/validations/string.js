import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function string_default(rule, checkValue, callback, source, options) {
  const errors = [];
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  if (validate) {
    if (isEmptyValue(checkValue, "string") && !rule.required) {
      return callback();
    }
    rules.required({
      rule,
      checkValue,
      source,
      errors,
      options,
      type: "string"
    });
    if (!isEmptyValue(checkValue, "string")) {
      rules.type(rule, checkValue, source, errors, options);
      rules.range(rule, checkValue, source, errors, options);
      rules.pattern(rule, checkValue, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, checkValue, source, errors, options);
      }
    }
  }
  callback(errors);
}
export { string_default as default };