import "../chunk-G2ADBYYC.js";
import emulate from './../common/deps/touch-emulator.js';
import { onTouchstart, onTouchmove, clearScroll } from './index.js';
emulate();
const api = ["state", "onTouchstart", "onTouchmove", "clearScroll"];
const renderless = (props, {
  reactive
}, {
  vm
}) => {
  const api2 = {};
  const state = reactive({
    last: -1
  });
  Object.assign(api2, {
    state,
    onTouchstart: onTouchstart(state),
    onTouchmove: onTouchmove({
      props,
      state,
      vm
    }),
    clearScroll: clearScroll(vm)
  });
  return api2;
};
export { api, renderless };