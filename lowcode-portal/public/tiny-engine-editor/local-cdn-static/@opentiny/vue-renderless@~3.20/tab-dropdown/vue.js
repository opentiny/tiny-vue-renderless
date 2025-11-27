import "../chunk-G2ADBYYC.js";
import { handleClick, setDropdownTabs } from './index.js';
const api = ["state", "handleClick", " setDropdownTabs"];
const renderless = (props, {
  inject,
  reactive
}) => {
  const state = reactive({
    hide: true,
    dropdownTabs: props.tabs || [],
    rootTabs: inject("rootTabs")
  });
  const api2 = {
    state,
    handleClick: handleClick(state),
    setDropdownTabs: setDropdownTabs(state)
  };
  return api2;
};
export { api, renderless };