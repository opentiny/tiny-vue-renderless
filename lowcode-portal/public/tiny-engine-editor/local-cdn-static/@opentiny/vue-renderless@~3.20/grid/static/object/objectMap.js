import "../../../chunk-G2ADBYYC.js";
import each from './../base/each.js';
import isFunction from './../base/isFunction.js';
import property from './../function/property.js';
const objectMap = (obj, iterate, context) => {
  let result = {};
  if (obj) {
    if (iterate) {
      if (!isFunction(iterate)) {
        iterate = property(iterate);
      }
      each(obj, (val, index) => {
        result[index] = iterate.call(context, val, index, obj);
      });
    } else {
      return obj;
    }
  }
  return result;
};
var objectMap_default = objectMap;
export { objectMap_default as default };