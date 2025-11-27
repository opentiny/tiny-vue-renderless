import "../chunk-G2ADBYYC.js";
import { clickList } from './index.js';
const api = ["state", "clickList"];
const renderless = (props, {
  reactive
}, {
  emit
}) => {
  const state = reactive({
    test: "1"
  });
  const api2 = {
    state,
    clickList: clickList({
      emit,
      props
    })
  };
  return api2;
};
export { api, renderless };