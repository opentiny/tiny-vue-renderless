import "../../chunk-G2ADBYYC.js";
import { on, once } from './dom.js';
var repeat_click_default = (el, binding) => {
  const LONG_PRESS_INTERVAL = 200;
  let interval = null;
  let startTime;
  const handler = () => {
    typeof binding.value === "function" && binding.value.apply();
  };
  const clear = () => {
    if (Date.now() - startTime < LONG_PRESS_INTERVAL) {
      handler();
    }
    clearInterval(interval);
    interval = null;
  };
  on(el, "mousedown", e => {
    if (e.button !== 0) {
      return;
    }
    startTime = Date.now();
    once(document, "mouseup", clear);
    clearInterval(interval);
    interval = setInterval(handler, LONG_PRESS_INTERVAL);
  });
};
export { repeat_click_default as default };