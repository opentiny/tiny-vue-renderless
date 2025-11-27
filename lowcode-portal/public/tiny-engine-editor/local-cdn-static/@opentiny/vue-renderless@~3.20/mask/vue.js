import "../chunk-G2ADBYYC.js";
import { handleTouch } from './index.js';
const api = ["state", "handleTouch"];
const renderless = (props, {
  reactive,
  computed
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({
    calcStyle: computed(() => ({
      zIndex: props.zIndex
    }))
  });
  Object.assign(api2, {
    state,
    handleTouch: handleTouch({
      props,
      emit
    })
  });
  return api2;
};
export { api, renderless };