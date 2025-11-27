import "../../chunk-G2ADBYYC.js";
function throttle_default(delay, noTrailing, callback, debounceMode) {
  let timeoutID;
  let lastExec = 0;
  if (typeof noTrailing !== "boolean") {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = void 0;
  }
  function wrapper() {
    const me = this;
    const elapsed = (/* @__PURE__ */ new Date()).valueOf() - lastExec;
    const args = arguments;
    function exec() {
      lastExec = (/* @__PURE__ */ new Date()).valueOf();
      callback.apply(me, args);
    }
    function clear() {
      timeoutID = void 0;
    }
    if (debounceMode && !timeoutID) {
      exec();
    }
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    const isUndMode = debounceMode === void 0;
    if (isUndMode && elapsed > delay) {
      exec();
    } else if (noTrailing !== true) {
      timeoutID = setTimeout(debounceMode ? clear : exec, isUndMode ? delay - elapsed : delay);
    }
  }
  function cancel() {
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
  }
  wrapper._cancel = cancel;
  return wrapper;
}
export {
  throttle_default as default
};
