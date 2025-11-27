import "../../../chunk-G2ADBYYC.js";
import rules from './../rules/index.js';
function required_default(rule, checkValue, callback, source, options) {
  const errors = [];
  const type = Array.isArray(checkValue) ? "array" : typeof checkValue;
  rules.required({
    rule,
    checkValue,
    source,
    errors,
    options,
    type
  });
  callback(errors);
}
export { required_default as default };