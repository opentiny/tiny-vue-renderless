import "../../../chunk-G2ADBYYC.js";
import isObject from './isObject.js';
import isString from './isString.js';
const toStringJSON = str => {
  if (isObject(str)) {
    return str;
  } else if (isString(str)) {
    try {
      return JSON.parse(str);
    } catch (error) {}
  }
  return {};
};
var toStringJSON_default = toStringJSON;
export { toStringJSON_default as default };