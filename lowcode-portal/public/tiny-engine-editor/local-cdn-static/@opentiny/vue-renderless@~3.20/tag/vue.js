import "../chunk-G2ADBYYC.js";
import { handleClose, handleClick } from './index.js';
const api = ["state", "handleClose", "handleClick"];
const renderless = (props, {
  reactive,
  computed
}, {
  emit,
  parent
}) => {
  const state = reactive({
    type: computed(() => props.theme || props.type),
    show: true,
    selected: false,
    mini: props.mini,
    color: props.color,
    text: props.text,
    maxWidth: props.maxWidth
  });
  const api2 = {
    state,
    handleClose: handleClose({
      emit,
      props,
      state
    }),
    handleClick: handleClick({
      emit,
      props,
      parent,
      state
    })
  };
  return api2;
};
export { api, renderless };