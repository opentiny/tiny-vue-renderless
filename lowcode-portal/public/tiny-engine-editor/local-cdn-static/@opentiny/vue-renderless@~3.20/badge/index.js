import "../chunk-G2ADBYYC.js";
const computedContent = ({ props, state }) => () => (typeof props.value === "number" || typeof props.value === "string") && typeof props.max === "number" ? props.max < Number(state.valueRef) ? `${props.max}+` : state.valueRef : state.valueRef;
const computedValueRef = ({ props }) => () => {
  if (typeof props.value === "number" || typeof props.value === "string") {
    return props.value;
  } else {
    return void 0;
  }
};
const computedTransform = ({ designConfig, props }) => () => {
  if ((designConfig == null ? void 0 : designConfig.transform) === "unset") {
    return null;
  }
  return {
    transform: `translate(
        ${props.offset[0]}${typeof props.offset[0] === "number" ? "px" : ""},
        ${props.offset[1]}${typeof props.offset[1] === "number" ? "px" : ""}
      )`
  };
};
export {
  computedContent,
  computedTransform,
  computedValueRef
};
