import "../../../chunk-G2ADBYYC.js";
import lastArrayEach from './../array/lastArrayEach.js';
import lastObjectEach from './../object/lastObjectEach.js';
const lastEach = (obj, iterate, context) => {
  if (obj) {
    return Array.isArray(obj) ? lastArrayEach(obj, iterate, context) : lastObjectEach(obj, iterate, context);
  }
  return obj;
};
var lastEach_default = lastEach;
export { lastEach_default as default };