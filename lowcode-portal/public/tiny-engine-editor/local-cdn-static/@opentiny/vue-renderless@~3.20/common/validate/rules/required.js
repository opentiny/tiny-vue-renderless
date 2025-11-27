import "../../../chunk-G2ADBYYC.js";
import * as util from './../util.js';
import { hasOwn } from './../../type.js';
function required_default({
  rule,
  checkValue,
  source,
  errors,
  options,
  type
}) {
  if (rule.required && (!hasOwn.call(source, rule.field) || util.isEmptyValue(checkValue, type || rule.type))) {
    errors.push(util.format(options.messages.required, ""));
  }
}
export { required_default as default };