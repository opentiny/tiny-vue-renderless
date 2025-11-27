import "../chunk-G2ADBYYC.js";
const handleClose = ({ emit, props, state }) => (event) => {
  if (props.disabled)
    return;
  event.stopPropagation();
  state.show = false;
  const close = () => emit("close", event);
  props.beforeDelete ? props.beforeDelete(close) : close();
};
const handleClick = ({ emit, props, parent, state }) => (event) => {
  if (props.selectable || props.disabled)
    return;
  parent.$parent && parent.$parent.tagSelectable && event.stopPropagation();
  state.selected = !state.selected;
  emit("click", event);
};
export {
  handleClick,
  handleClose
};
