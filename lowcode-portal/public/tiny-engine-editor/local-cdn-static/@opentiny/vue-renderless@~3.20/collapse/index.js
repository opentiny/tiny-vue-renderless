import "../chunk-G2ADBYYC.js";
const setActiveNames = ({ emit, props, state }) => (activeNames) => {
  activeNames = [].concat(activeNames);
  const value = props.accordion ? activeNames[0] : activeNames;
  state.activeNames = activeNames;
  emit("update:modelValue", value);
  emit("change", value);
};
const handleItemClick = ({ api, props, state }) => (item) => {
  const activeNames = state.activeNames.slice(0);
  const index = activeNames.indexOf(item == null ? void 0 : item.name);
  const beforeClose = () => {
    let result = props.beforeClose ? props.beforeClose(item, state.activeNames) : true;
    return new Promise((resolve) => {
      if (result && result.then) {
        result.then(() => resolve(true)).catch(() => resolve(false));
      } else {
        resolve(result);
      }
    });
  };
  beforeClose().then((next) => {
    if (props.accordion) {
      if (next || !activeNames.length) {
        api.setActiveNames(activeNames[0] === (item == null ? void 0 : item.name) ? "" : item == null ? void 0 : item.name);
      }
    } else {
      index > -1 ? next && activeNames.splice(index, 1) : activeNames.push(item == null ? void 0 : item.name);
      api.setActiveNames(activeNames);
    }
  });
};
export {
  handleItemClick,
  setActiveNames
};
