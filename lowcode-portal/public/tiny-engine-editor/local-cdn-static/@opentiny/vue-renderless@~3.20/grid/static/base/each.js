import "../../../chunk-G2ADBYYC.js";
import arrayEach from './../array/arrayEach.js';
import objectEach from './../object/objectEach.js';
const each = (obj, iterate, context) => {
  if (obj) {
    return Array.isArray(obj) ? arrayEach(obj, iterate, context) : objectEach(obj, iterate, context);
  }
  return obj;
};
var each_default = each;
export { each_default as default };