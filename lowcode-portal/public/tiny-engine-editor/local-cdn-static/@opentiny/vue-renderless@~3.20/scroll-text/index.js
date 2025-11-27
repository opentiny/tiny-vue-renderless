import "../chunk-G2ADBYYC.js";
const computedBindStyle = ({ constants, time }) => ({
  [constants.ANIMATION_DURATION]: parseInt(time, 10) + "s"
});
const stopAnimation = ({ props, state }) => () => {
  if (props.hoverStop) {
    state.isStop = true;
  }
};
const startAnimation = ({ props, state }) => () => {
  if (props.hoverStop) {
    state.isStop = false;
  }
};
export {
  computedBindStyle,
  startAnimation,
  stopAnimation
};
