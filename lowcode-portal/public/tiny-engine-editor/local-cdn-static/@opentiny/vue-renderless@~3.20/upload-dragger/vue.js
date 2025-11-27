import "../chunk-G2ADBYYC.js";
import { onDragOver, onDrop, watchDragover } from './index.js';
const api = ["state", "onDragOver", "onDrop"];
const renderless = (props, {
  inject,
  reactive,
  ref,
  watch
}, {
  emit
}) => {
  const state = reactive({
    dragover: false,
    uploader: inject("uploader") || ref({
      default: ""
    })
  });
  const constants = state.uploader.$constants || {};
  const api2 = {
    state,
    onDragOver: onDragOver({
      props,
      state
    }),
    onDrop: onDrop({
      emit,
      props,
      state
    }),
    watchDragover: watchDragover({
      state,
      constants
    })
  };
  watch(() => state.dragover, () => api2.watchDragover());
  return api2;
};
export { api, renderless };