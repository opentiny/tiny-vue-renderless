import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
import { isEmptyValue } from './../util.js';
import { hasOwn } from './../../type.js';
function date_default(rule, checkValue, callback, source, options) {
  const errors = [];
  const validate = rule.required || !rule.required && hasOwn.call(source, rule.field);
  const isValidDateStr = value => value && typeof value === "string" && new Date(value).toString() !== "Invalid Date";
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
    if (!isEmptyValue(checkValue)) {
      let dateObject;
      if (typeof checkValue === "number" || isValidDateStr(checkValue)) {
        dateObject = new Date(checkValue);
      } else {
        dateObject = checkValue;
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject && typeof dateObject.getTime === "function") {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
}
export { date_default as default };