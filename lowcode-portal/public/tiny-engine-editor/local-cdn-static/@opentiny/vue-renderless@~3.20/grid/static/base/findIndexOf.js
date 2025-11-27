import "../../../chunk-G2ADBYYC.js";
import helperCreateiterateIndexOf from './helperCreateiterateIndexOf.js';
const findIndexOf = helperCreateiterateIndexOf((obj, iterate, context) => {
  for (let index = 0, len = obj.length; index < len; index++) {
    if (iterate.call(context, obj[index], index, obj)) {
      return index;
    }
  }
  return -1;
});
var findIndexOf_default = findIndexOf;
export { findIndexOf_default as default };