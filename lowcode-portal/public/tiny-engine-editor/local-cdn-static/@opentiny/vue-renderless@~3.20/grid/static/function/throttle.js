import "../../../chunk-G2ADBYYC.js";
function throttle(callback, wait, options) {
  let args;
  let context;
  let ops = options || {};
  let flag = false;
  let timeout = 0;
  let optLeading = "leading" in ops ? ops.leading : true;
  let optTrailing = "trailing" in ops ? ops.trailing : false;
  let endFn;
  const runFn = function() {
    flag = true;
    callback.apply(context, args);
    timeout = setTimeout(endFn, wait);
  };
  endFn = function() {
    timeout = 0;
    if (!flag && optTrailing === true) {
      runFn();
    }
  };
  const cancelFn = function() {
    let rest = timeout !== 0;
    clearTimeout(timeout);
    flag = false;
    timeout = 0;
    return rest;
  };
  const throttled = function() {
    args = arguments;
    context = this;
    flag = false;
    if (timeout === 0) {
      if (optLeading === true) {
        runFn();
      } else if (optTrailing === true) {
        timeout = setTimeout(endFn, wait);
      }
    }
  };
  throttled.cancel = cancelFn;
  return throttled;
}
var throttle_default = throttle;
export {
  throttle_default as default
};
