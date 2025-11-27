import "../../chunk-G2ADBYYC.js";
import throttle from './throttle.js';
function debounce_default(delay, atBegin, callback) {
  return callback === void 0 ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}
export { debounce_default as default };