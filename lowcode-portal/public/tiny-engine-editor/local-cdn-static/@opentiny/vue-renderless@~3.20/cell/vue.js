import "../chunk-G2ADBYYC.js";
const api = ["state"];
const renderless = (props, { reactive, computed, inject }, { parent }) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    isDisplayOnly: computed(() => (parent.tinyForm || {}).displayOnly),
    isDisabled: computed(() => props.disabled || (parent.tinyForm || {}).disabled)
  });
  const api2 = {
    state
  };
  return api2;
};
export {
  api,
  renderless
};
