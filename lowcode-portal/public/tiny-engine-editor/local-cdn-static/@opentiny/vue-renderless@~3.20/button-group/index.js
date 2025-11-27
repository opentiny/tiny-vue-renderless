import "../chunk-G2ADBYYC.js";
const handleChange = ({ emit, state }) => () => {
  if (!state.disabled) {
    emit("change", state.value);
  }
};
const handleClick = ({ emit, props, state }) => (node) => {
  if (!state.disabled && !node.disabled && state.value !== node[props.valueField]) {
    state.value = node[props.valueField];
    emit("update:modelValue", state.value);
  }
};
const moreNodeClick = ({ emit, props, state }) => (node) => {
  if (!state.disabled) {
    const index = state.moreData.indexOf(node);
    state.moreData.splice(index, 1, state.buttonData[state.buttonData.length - 1]);
    state.buttonData.splice(state.buttonData.length - 1, 1, node);
    state.value = node[props.valueField];
    emit("update:modelValue", state.value);
  }
};
const getItemClass = ({ props, state }) => (node) => {
  if (state.disabled || node.disabled) {
    return { disabled: true };
  }
  return props.plain ? {
    plain: props.plain,
    medium: props.size === "medium",
    small: props.size === "small",
    mini: props.size === "mini"
  } : {};
};
export {
  getItemClass,
  handleChange,
  handleClick,
  moreNodeClick
};
