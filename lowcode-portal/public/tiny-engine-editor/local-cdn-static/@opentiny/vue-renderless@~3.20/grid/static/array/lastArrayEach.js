import "../../../chunk-G2ADBYYC.js";
const lastArrayEach = (obj, iterate, context) => {
  for (let len = obj.length - 1; len >= 0; len--) {
    iterate.call(context, obj[len], len, obj);
  }
};
var lastArrayEach_default = lastArrayEach;
export {
  lastArrayEach_default as default
};
