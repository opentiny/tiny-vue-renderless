import "../chunk-G2ADBYYC.js";
const handleClear = ({ dispatch, emit }) => ($event) => {
  dispatch("Picker", "handle-clear", $event);
  dispatch("Select", "handle-clear", $event);
  dispatch("Cascader", "handle-clear", $event);
  dispatch("Amount", "handle-clear", $event);
  emit("handle-clear");
};
const handeClick = ({ props, emit }) => ($event) => {
  if (props.disabled)
    return;
  $event.stopPropagation();
  emit("click", $event);
};
export {
  handeClick,
  handleClear
};
