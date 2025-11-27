import "../../../chunk-G2ADBYYC.js";
const helperCreateIndexOf = (name, callback) => (obj, val) => {
  if (!obj) {
    return -1;
  }
  if (typeof obj === "string" || Array.isArray(obj)) {
    if (obj[name]) {
      return obj[name](val);
    }
    return callback(obj, val);
  }
  for (let key of Object.keys(obj)) {
    if (val === obj[key]) {
      return key;
    }
  }
  return -1;
};
var helperCreateIndexOf_default = helperCreateIndexOf;
export {
  helperCreateIndexOf_default as default
};
