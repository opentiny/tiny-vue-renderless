import "../../../chunk-G2ADBYYC.js";
import * as util from './../util.js';
import { isNumber } from './../../type.js';
import { getLength } from './../../string.js';
function getErro({
  min,
  max,
  val,
  key,
  rule,
  errors,
  util: util2,
  options
}) {
  if (min && !max && val < rule.min) {
    errors.push(util2.format(options.messages[key].min, "", rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(util2.format(options.messages[key].max, "", rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(util2.format(options.messages[key].range, "", rule.min, rule.max));
  }
}
function range_default(rule, checkValue, source, errors, options) {
  const len = isNumber(rule.len);
  const min = isNumber(rule.min);
  const max = isNumber(rule.max);
  let val = checkValue;
  let key = null;
  const num = isNumber(Number(checkValue));
  const str = typeof checkValue === "string";
  const arr = Array.isArray(checkValue);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = checkValue.length;
  }
  if (str) {
    val = getLength(checkValue, "string");
  }
  if (rule.type === "number") {
    val = checkValue;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(util.format(options.messages[key].len, "", rule.len));
    }
  } else {
    getErro({
      min,
      max,
      val,
      key,
      rule,
      errors,
      util,
      options
    });
  }
}
export { range_default as default };