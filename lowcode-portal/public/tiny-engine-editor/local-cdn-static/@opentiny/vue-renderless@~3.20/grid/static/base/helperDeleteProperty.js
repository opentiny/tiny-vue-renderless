import "../../../chunk-G2ADBYYC.js";
const helperDeleteProperty = (obj, property) => {
  try {
    delete obj[property];
  } catch (e) {
    obj[property] = void 0;
  }
};
var helperDeleteProperty_default = helperDeleteProperty;
export {
  helperDeleteProperty_default as default
};
