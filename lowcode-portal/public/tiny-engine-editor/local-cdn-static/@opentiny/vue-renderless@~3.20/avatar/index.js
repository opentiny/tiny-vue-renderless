import "../chunk-G2ADBYYC.js";
const handleError = ({ props, state }) => () => {
  const { error } = props;
  const errorFlag = error ? error() : void 0;
  if (errorFlag !== false) {
    if (state.isSrcImageExist) {
      state.isSrcImageExist = false;
    } else {
      state.isDefaultImageExist = false;
    }
  }
};
const computedAvatarClass = (contants) => (props) => {
  const { size, icon, shape } = props;
  let classList = [contants.COMPONENT_PREFIX];
  if (size && typeof size === "string") {
    classList.push(`${contants.COMPONENT_PREFIX}--${size}`);
  }
  if (icon) {
    classList.push(`${contants.COMPONENT_PREFIX}--${contants.icon}`);
  }
  if (shape) {
    classList.push(`${contants.COMPONENT_PREFIX}--${shape}`);
  }
  return classList.join(" ");
};
export {
  computedAvatarClass,
  handleError
};
