import "../chunk-G2ADBYYC.js";
const getHorizontalWidth = (props) => () => {
  if (props.showMax) {
    return props.groupSize * 6 + 12 - (props.groupSize + 2) / 4 * 5;
  }
  return props.groupSize * 4 + 8 - (props.groupSize + 2) / 4 * 3;
};
const getMinHeight = (props) => () => props.groupSize * 2 + 2;
const getWidth = (props) => () => props.groupSize * 2 + 2;
const getHorizontalLeft = (props) => () => (props.groupSize + 2) / 4;
const handleClick = (emit) => (event) => emit("click", event);
const mouseEnter = (emit) => (event) => emit("mouseenter", event);
export {
  getHorizontalLeft,
  getHorizontalWidth,
  getMinHeight,
  getWidth,
  handleClick,
  mouseEnter
};
