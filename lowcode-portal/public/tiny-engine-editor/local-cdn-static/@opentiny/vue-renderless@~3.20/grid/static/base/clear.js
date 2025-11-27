import "../../../chunk-G2ADBYYC.js";
import isNull from './isNull.js';
import isObject from './isObject.js';
import assign from './../object/assign.js';
import isPlainObject from './isPlainObject.js';
import objectEach from './../object/objectEach.js';
import helperDeleteProperty from './helperDeleteProperty.js';
const clear = function (obj, defs, assigns) {
  if (!obj) {
    return obj;
  }
  let isDefs = arguments.length > 1 && (isNull(defs) || !isObject(defs));
  let extds = isDefs ? assigns : defs;
  if (isPlainObject(obj)) {
    let eachCallback;
    if (isDefs) {
      eachCallback = (val, key) => {
        obj[key] = defs;
      };
    } else {
      eachCallback = (val, key) => {
        helperDeleteProperty(obj, key);
      };
    }
    objectEach(obj, eachCallback);
    if (extds) {
      assign(obj, extds);
    }
  } else if (Array.isArray(obj)) {
    if (isDefs) {
      let len = obj.length;
      while (len > 0) {
        len--;
        obj[len] = defs;
      }
    } else {
      obj.length = 0;
    }
    if (extds) {
      obj.push.apply(obj, extds);
    }
  }
  return obj;
};
var clear_default = clear;
export { clear_default as default };