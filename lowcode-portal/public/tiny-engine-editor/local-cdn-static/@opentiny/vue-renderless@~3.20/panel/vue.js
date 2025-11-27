import "../chunk-G2ADBYYC.js";
import { collapse, expand, toggle } from './index.js';
const api = ["state", "toggle"];
const renderless = (props, {
  reactive
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({
    isShow: props.expand
  });
  Object.assign(api2, {
    state,
    collapse: collapse({
      emit,
      state
    }),
    expand: expand({
      emit,
      state
    }),
    toggle: toggle({
      api: api2,
      state
    })
  });
  return api2;
};
export { api, renderless };