import "../../../chunk-G2ADBYYC.js";
import { isDate, isRegExp } from './../../../common/type.js';
import isNumber from './isNumber.js';
import isString from './isString.js';
import isBoolean from './isBoolean.js';
import isUndefined from './isUndefined.js';
import keys from './keys.js';
import every from './../array/every.js';
let equalVal;
const helperEqualCompare = ({
  val1,
  val2,
  compare,
  func,
  key,
  obj1,
  obj2
}) => {
  if (val1 === val2) {
    return true;
  }
  if (val1 && val2 && !isNumber(val1) && !isNumber(val2) && !isString(val1) && !isString(val2)) {
    if (isRegExp(val1)) {
      return compare(String(val1), String(val2), key, obj1, obj2);
    }
    if (isDate(val1) || isBoolean(val1)) {
      return compare(Number(val1), Number(val2), key, obj1, obj2);
    }
    return equalVal(val1, val2, func, key, compare);
  }
  return compare(val1, val2, key, obj1, obj2);
};
equalVal = (val1, val2, func, key, compare) => {
  let result, val1Keys, val2Keys;
  let isObj1Arr = Array.isArray(val1);
  let isObj2Arr = Array.isArray(val2);
  if (isObj1Arr || isObj2Arr ? isObj1Arr && isObj2Arr : val1.constructor === val2.constructor) {
    val1Keys = keys(val1);
    val2Keys = keys(val2);
    if (func) {
      result = func(val1, val2, key);
    }
    if (val1Keys.length === val2Keys.length) {
      if (isUndefined(result)) {
        return every(val1Keys, (key2, index) => key2 === val2Keys[index] && helperEqualCompare({
          val1: val1[key2],
          val2: val2[val2Keys[index]],
          compare,
          func,
          key: isObj1Arr || isObj2Arr ? index : key2,
          obj1: val1,
          obj2: val2
        }));
      }
      return !!result;
    }
    return false;
  }
};
var helperEqualCompare_default = helperEqualCompare;
export { helperEqualCompare_default as default };