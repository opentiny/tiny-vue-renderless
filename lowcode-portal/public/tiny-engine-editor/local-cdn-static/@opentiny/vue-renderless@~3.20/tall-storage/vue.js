import "../chunk-G2ADBYYC.js";
import { mousedown, selectItem, keydown } from './index.js';
import { on, off } from './../common/deps/dom.js';
const api = ["state", "mousedown", "selectItem"];
const renderless = (props, {
  onUnmounted,
  reactive,
  watch
}, {
  emit
}) => {
  const state = reactive({
    hoverValue: ""
  });
  const api2 = {
    state,
    mousedown,
    selectItem: selectItem({
      emit,
      state
    }),
    keydown: keydown({
      emit,
      props,
      state
    })
  };
  watch(() => props.isMemoryStorage, value => !value && (state.hoverValue = ""), {
    immediate: true
  });
  onUnmounted(() => {
    state.hoverValue = "";
    off(document, "keydown", api2.keydown);
  });
  on(document, "keydown", api2.keydown);
  return api2;
};
export { api, renderless };