import "../chunk-G2ADBYYC.js";
import { filter } from './index.js';
const api = ["state", "filter"];
const renderless = (props, {
  reactive
}, {
  emit,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    fields: null
  });
  Object.assign(api2, {
    state,
    filter: filter({
      emit,
      vm
    })
  });
  return api2;
};
export { api, renderless };