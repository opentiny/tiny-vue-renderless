import "../chunk-G2ADBYYC.js";
import { handleScroll, update } from './index.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
const api = ["state", "update", "handleScroll"];
const renderless = (props, {
  onBeforeUnmount,
  onMounted,
  reactive
}, {
  vm,
  nextTick,
  emit
}) => {
  const state = reactive({
    sizeWidth: "0",
    sizeHeight: "0",
    moveX: 0,
    moveY: 0
  });
  const api2 = {
    state,
    update: update({
      vm,
      state
    }),
    handleScroll: handleScroll({
      vm,
      state,
      emit
    })
  };
  onMounted(() => {
    if (props.native) {
      return;
    }
    nextTick(api2.update);
    !props.noresize && addResizeListener(vm.$refs.resize, api2.update);
  });
  onBeforeUnmount(() => {
    if (props.native) {
      return;
    }
    !props.noresize && removeResizeListener(vm.$refs.resize, api2.update);
  });
  return api2;
};
export { api, renderless };