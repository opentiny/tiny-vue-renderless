import "../../chunk-G2ADBYYC.js";
const _storeMap = {};
const storeMap = {
  mixin(map) {
    Object.assign(_storeMap, map);
    return storeMap;
  },
  get(type) {
    return _storeMap[type];
  },
  add(type, callback) {
    _storeMap[type] = callback;
    return storeMap;
  },
  delete(type) {
    delete _storeMap[type];
    return storeMap;
  }
};
var storeMap_default = storeMap;
export {
  storeMap_default as default
};
