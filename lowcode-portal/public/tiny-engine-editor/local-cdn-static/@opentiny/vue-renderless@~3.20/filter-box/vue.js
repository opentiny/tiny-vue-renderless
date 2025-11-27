import "../chunk-G2ADBYYC.js";
import { handleClear, handeClick } from './index.js';
const api = ["state", "handleClear", "focus", "blur", "handeClick"];
const renderless = (props, {
  reactive
}, {
  dispatch,
  emit,
  designConfig
}) => {
  var _a;
  const state = reactive({
    expandButtonIcon: ((_a = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _a.expandButton) || "IconDownWard"
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    focus: () => state,
    blur: () => state,
    handleClear: handleClear({
      dispatch,
      emit
    }),
    handeClick: handeClick({
      props,
      emit
    })
  });
  return api2;
};
export { api, renderless };