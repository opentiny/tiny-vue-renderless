import "../../../chunk-G2ADBYYC.js";
import isFunction from './isFunction.js';
import isString from './isString.js';
import hasOwnProp from './hasOwnProp.js';
const helperCreateiterateIndexOf = callback => (obj, iterate, context) => {
  if (!obj || !isFunction(iterate)) {
    return -1;
  }
  if (Array.isArray(obj) || isString(obj)) {
    return callback(obj, iterate, context);
  }
  for (let key of Object.keys(obj)) {
    if (hasOwnProp(obj, key) && iterate.call(context, obj[key], key, obj)) {
      return key;
    }
  }
  return -1;
};
var helperCreateiterateIndexOf_default = helperCreateiterateIndexOf;
export { helperCreateiterateIndexOf_default as default };