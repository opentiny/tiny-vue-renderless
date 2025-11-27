import "../../chunk-G2ADBYYC.js";
var animation_default = ({ options, animation }) => {
  if (!animation) {
    return;
  }
  Object.keys(animation).forEach((key) => {
    options[key] = animation[key];
  });
};
export {
  animation_default as default
};
