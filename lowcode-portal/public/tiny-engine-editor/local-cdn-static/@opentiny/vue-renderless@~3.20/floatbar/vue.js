import "../chunk-G2ADBYYC.js";
import { computeData } from './index.js';
const api = ["state"];
const renderless = (props, {
  computed,
  reactive
}) => {
  const state = reactive({
    data: computed(() => computeData({
      props
    }))
  });
  const api2 = {
    state
  };
  return api2;
};
export { api, renderless };