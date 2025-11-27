import "../chunk-G2ADBYYC.js";
const handleClick = ({ emit, props, state }) => (event) => {
  if (!state.disabled && !props.href) {
    emit("click", event);
  }
};
export {
  handleClick
};
