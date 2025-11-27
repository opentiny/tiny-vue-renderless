import "../../../chunk-G2ADBYYC.js";
import isObject from './isObject.js';
const isEmpty = obj => {
  if (isObject(obj)) {
    return Object.keys(obj).length === 0;
  }
  return true;
};
var isEmpty_default = isEmpty;
export { isEmpty_default as default };