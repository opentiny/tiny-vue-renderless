import "../../../chunk-G2ADBYYC.js";
import each from './each.js';
const helperCreateGetObjects = (name, getIndex) => {
  let proMethod = Object[name];
  return obj => {
    let result = [];
    if (!obj) {
      return result;
    }
    if (proMethod) {
      return proMethod(obj);
    }
    let eachCallback;
    if (getIndex > 1) {
      eachCallback = key => {
        result.push([String(key), obj[key]]);
      };
    } else {
      eachCallback = function () {
        result.push(arguments[getIndex]);
      };
    }
    each(obj, eachCallback);
    return result;
  };
};
var helperCreateGetObjects_default = helperCreateGetObjects;
export { helperCreateGetObjects_default as default };