import "../chunk-G2ADBYYC.js";
import { computedBarStyle } from './index.js';
const api = ["state", "computedBarStyle"];
const renderless = (props, {
  inject,
  reactive
}, {
  parent
}) => {
  const state = reactive({
    rootTabs: inject("rootTabs"),
    barStyle: {},
    separator: inject("separator", null)
  });
  const api2 = {
    state,
    computedBarStyle: computedBarStyle(parent)
  };
  return api2;
};
export { api, renderless };