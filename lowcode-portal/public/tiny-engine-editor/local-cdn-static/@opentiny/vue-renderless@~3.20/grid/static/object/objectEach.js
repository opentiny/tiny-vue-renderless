import "../../../chunk-G2ADBYYC.js";
import hasOwnProp from './../base/hasOwnProp.js';
const objectEach = (obj, iterate, context) => {
  if (obj) {
    Object.keys(obj).forEach(key => {
      if (hasOwnProp(obj, key)) {
        iterate.call(context, obj[key], key, obj);
      }
    });
  }
};
var objectEach_default = objectEach;
export { objectEach_default as default };