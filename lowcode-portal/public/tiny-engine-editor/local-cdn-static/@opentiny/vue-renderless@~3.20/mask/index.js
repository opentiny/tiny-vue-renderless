import "../chunk-G2ADBYYC.js";
const handleTouch = ({ props, emit }) => (event) => {
  if (props.cancelTouch) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    emit("update:visible", false);
  }
  emit("click", props.visible);
};
export {
  handleTouch
};
