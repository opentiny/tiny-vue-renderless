import "../chunk-G2ADBYYC.js";
import { click } from './index.js';
const api = ["state", "click"];
const renderless = (props, {
  reactive
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({});
  Object.assign(api2, {
    state,
    click: click({
      props,
      emit
    })
  });
  return api2;
};
export { api, renderless };