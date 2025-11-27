import "../chunk-G2ADBYYC.js";
const handleClick = (state) => (name) => {
  state.rootTabs.setCurrentName(name);
  state.hide = true;
};
const setDropdownTabs = (state) => (data) => {
  state.dropdownTabs = data;
};
export {
  handleClick,
  setDropdownTabs
};
