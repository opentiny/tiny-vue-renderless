import "../chunk-G2ADBYYC.js";
import { getIntegerAndDecimal } from './index.js';
const api = ["state", "getIntegerAndDecimal"];
const renderless = (props, hooks) => {
  const api2 = {
    getIntegerAndDecimal: getIntegerAndDecimal({
      props
    })
  };
  const {
    reactive,
    computed
  } = hooks;
  const state = reactive({
    value: computed(() => api2.getIntegerAndDecimal(props))
  });
  Object.assign(api2, {
    state
  });
  return api2;
};
export { api, renderless };