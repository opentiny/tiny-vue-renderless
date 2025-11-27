import "../chunk-G2ADBYYC.js";
import { emitClick } from './index.js';
const api = ["state", "create"];
const renderless = (props, {
  reactive
}, {
  emit
}) => {
  const state = reactive({
    urlType: props.type
  });
  const api2 = {
    state,
    create: emitClick(emit)
  };
  return api2;
};
export { api, renderless };