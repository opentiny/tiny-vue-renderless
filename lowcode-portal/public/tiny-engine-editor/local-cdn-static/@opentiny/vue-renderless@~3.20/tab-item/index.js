import "../chunk-G2ADBYYC.js";
const computedIsClosable = ({ rootTabs, props }) => () => props.withClose || rootTabs.withClose;
const computedActive = ({ nextTick, props, state }) => () => {
  const active = state.rootTabs.state.currentName === (props.name || state.index);
  if (active) {
    state.loaded = true;
    nextTick(() => {
      state.animateShow = true;
    });
  } else {
    state.animateShow = false;
  }
  return active;
};
const computedPaneName = ({ props, state }) => () => props.name || state.index;
const watchTitle = (parent) => () => parent.$emit("tab-nav-update");
export {
  computedActive,
  computedIsClosable,
  computedPaneName,
  watchTitle
};
