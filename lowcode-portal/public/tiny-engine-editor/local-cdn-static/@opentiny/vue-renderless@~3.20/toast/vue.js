import "../chunk-G2ADBYYC.js";
import { timeout } from './index.js';
const api = ["state", "timeout"];
const renderless = (props, {
  reactive
}, {
  vm,
  emit
}) => {
  const state = reactive({
    text: props.text,
    type: props.type,
    time: props.time
  });
  const api2 = {
    state,
    timeout: timeout(emit)
  };
  return api2;
};
export { api, renderless };