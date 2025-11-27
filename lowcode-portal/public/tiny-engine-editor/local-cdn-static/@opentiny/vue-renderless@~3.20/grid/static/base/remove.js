import "../../../chunk-G2ADBYYC.js";
import helperDeleteProperty from './helperDeleteProperty.js';
import isFunction from './isFunction.js';
import each from './each.js';
import arrayEach from './../array/arrayEach.js';
import lastEach from './lastEach.js';
import clear from './clear.js';
import eqNull from './eqNull.js';
const pluckProperty = name => (obj, key) => key === name;
const remove = (obj, iterate, context) => {
  if (obj) {
    if (!eqNull(iterate)) {
      let removeIndexs = [];
      let rest = [];
      if (!isFunction(iterate)) {
        iterate = pluckProperty(iterate);
      }
      each(obj, (item, index, rest2) => {
        if (iterate.call(context, item, index, rest2)) {
          removeIndexs.push(index);
        }
      });
      if (Array.isArray(obj)) {
        lastEach(removeIndexs, item => {
          rest.push(obj[item]);
          obj.splice(item, 1);
        });
      } else {
        rest = {};
        arrayEach(removeIndexs, key => {
          rest[key] = obj[key];
          helperDeleteProperty(obj, key);
        });
      }
      return rest;
    }
    return clear(obj);
  }
  return obj;
};
var remove_default = remove;
export { remove_default as default };