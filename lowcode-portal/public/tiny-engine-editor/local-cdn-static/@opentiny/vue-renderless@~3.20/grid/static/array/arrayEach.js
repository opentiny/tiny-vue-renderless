import "../../../chunk-G2ADBYYC.js";
const arrayEach = (obj, iterate, context) => {
  if (obj) {
    if (obj.forEach) {
      obj.forEach(iterate, context);
    } else {
      for (let index = 0, len = obj.length; index < len; index++) {
        iterate.call(context, obj[index], index, obj);
      }
    }
  }
};
var arrayEach_default = arrayEach;
export {
  arrayEach_default as default
};
