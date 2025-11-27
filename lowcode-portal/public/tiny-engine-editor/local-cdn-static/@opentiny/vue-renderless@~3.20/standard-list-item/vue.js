import "../chunk-G2ADBYYC.js";
import { handleEnterDesc, handelIconClick, handleTitleClick, computedOptions } from './index.js';
const api = ["state", "handelIconClick", "handleEnterDesc", "handleTitleClick", "computedOptions"];
const renderless = (props, {
  computed,
  reactive
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({
    descTooltip: "",
    sliceNum: 2,
    iconNum: 3,
    effectOptions: computed(() => api2.computedOptions())
  });
  Object.assign(api2, {
    state,
    handleTitleClick: handleTitleClick({
      props
    }),
    handelIconClick: handelIconClick({
      emit
    }),
    handleEnterDesc: handleEnterDesc({
      state,
      props
    }),
    computedOptions: computedOptions({
      props
    })
  });
  return api2;
};
export { api, renderless };