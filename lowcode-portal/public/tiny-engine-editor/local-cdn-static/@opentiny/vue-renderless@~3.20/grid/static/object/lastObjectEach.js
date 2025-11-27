import "../../../chunk-G2ADBYYC.js";
import lastArrayEach from './../array/lastArrayEach.js';
import keys from './../base/keys.js';
const lastObjectEach = (obj, iterate, context) => {
  lastArrayEach(keys(obj), key => {
    iterate.call(context, obj[key], key, obj);
  });
};
var lastObjectEach_default = lastObjectEach;
export { lastObjectEach_default as default };