import "../../../chunk-G2ADBYYC.js";
import each from './../base/each.js';
import isFunction from './../base/isFunction.js';
import property from './../function/property.js';
const map = function (obj, iterate, context) {
  let result = [];
  if (obj && arguments.length > 1) {
    if (!isFunction(iterate)) {
      iterate = property(iterate);
    }
    if (obj.map) {
      return obj.map(iterate, context);
    } else {
      each(obj, (...args) => {
        result.push(iterate.apply(context, args));
      });
    }
  }
  return result;
};
var map_default = map;
export { map_default as default };