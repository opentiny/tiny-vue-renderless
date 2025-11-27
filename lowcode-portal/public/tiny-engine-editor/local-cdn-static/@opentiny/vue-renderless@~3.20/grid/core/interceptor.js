import "../../chunk-G2ADBYYC.js";
import { toString, each, remove } from './../static/index.js';
const toType = type => toString(type).replace("_", "").toLowerCase();
const eventTypes = ["created", "mounted", "activated", "beforeDestroy", "destroyed", "event.clearActived", "event.clearFilter", "event.showMenu", "event.keydown"].map(toType);
const _storeMap = {};
const Interceptor = {
  mixin(map) {
    each(map, (callback, type) => Interceptor.add(type, callback));
    return Interceptor;
  },
  get(type) {
    return _storeMap[toType(type)] || [];
  },
  add(type, callback) {
    const selfType = toType(type);
    if (callback && ~eventTypes.indexOf(selfType)) {
      _storeMap[selfType] = _storeMap[selfType] ? _storeMap[selfType] : [];
      _storeMap[selfType].push(callback);
    }
    return Interceptor;
  },
  delete(type, callback) {
    const eList = _storeMap[toType(type)];
    if (eList) {
      remove(eList, cb => cb === callback);
    }
    return Interceptor;
  }
};
var interceptor_default = Interceptor;
export { interceptor_default as default };