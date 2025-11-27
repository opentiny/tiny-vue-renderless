import "../chunk-G2ADBYYC.js";
import { handleClick, flagOperate, getMileIcon, getMileContent, getLineColor, handleFlagClick, hexToRgb, getFlagStyle } from './index.js';
const api = ["state", "showTip", "handleClick", "handleFlagClick", "flagOperate", "getMileIcon", "getMileContent", "getMileFlagStyle", "getLineColor", "getStatus", "hexToRgb", "getFlagStyle"];
const renderless = (props, {
  reactive
}, {
  emit,
  refs,
  constants
}) => {
  const state = reactive({
    tipContent: ""
  });
  const api2 = {
    state,
    getLineColor: getLineColor(props),
    getMileContent: getMileContent(props),
    handleFlagClick: handleFlagClick(emit),
    handleClick: handleClick({
      emit
    }),
    getMileIcon: getMileIcon({
      constants,
      props
    }),
    flagOperate: flagOperate({
      constants,
      refs,
      state
    }),
    hexToRgb,
    getFlagStyle: getFlagStyle(props)
  };
  return api2;
};
export { api, renderless };