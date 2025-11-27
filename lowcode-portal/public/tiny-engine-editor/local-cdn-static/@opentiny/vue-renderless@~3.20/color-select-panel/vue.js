import "../chunk-G2ADBYYC.js";
import { initApi, initState, initWatch } from './index.js';
const api = ["state", "open", "close", "resetColor", "onConfirm", "onCancel", "submitValue", "clear", "onHueReady", "onSvReady", "onAlphaReady", "onPredefineColorClick", "onHistoryClick", "onClickOutside"];
const renderless = (props, hooks, utils) => {
  const state = initState(props, hooks);
  const {
    open,
    close,
    resetColor,
    onConfirm,
    onCancel,
    submitValue,
    clear,
    onHueReady,
    onSvReady,
    onAlphaReady,
    onPredefineColorClick,
    onHistoryClick,
    onClickOutside
  } = initApi(props, state, utils);
  const api2 = {
    state,
    open,
    close,
    resetColor,
    onConfirm,
    onCancel,
    submitValue,
    clear,
    onHueReady,
    onSvReady,
    onAlphaReady,
    onPredefineColorClick,
    onHistoryClick,
    onClickOutside
  };
  initWatch(state, props, hooks, utils);
  hooks.onMounted(() => {
    if (props.modelValue) {
      state.input = state.currentColor;
    }
  });
  return api2;
};
export { api, renderless };