import "../chunk-G2ADBYYC.js";
const handleClick = ({ props, multiSelect }) => (event) => {
  if (props.option.disabled) {
    return;
  }
  event.stopPropagation();
  if (props.disabled !== true && multiSelect.disabled !== true) {
    multiSelect.state.multiSelectEmitter.emit("multiSelectItemClick", props.option);
  }
};
const toggleExpand = ({ props, multiSelect }) => (event) => {
  if (props.option.disabled) {
    return;
  }
  event.stopPropagation();
  if (props.disabled !== true && multiSelect.disabled !== true) {
    multiSelect.state.multiSelectEmitter.emit("toggleItemExpand", props.option);
  }
};
export {
  handleClick,
  toggleExpand
};
