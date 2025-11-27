import "../chunk-G2ADBYYC.js";
const toggle = ({ emit, props, state }) => (event) => {
  event.preventDefault();
  if (state.disabled || props.types === "loading") {
    return;
  }
  const change = () => {
    state.currentValue = state.currentValue === props.trueValue ? props.falseValue : props.trueValue;
    emit("update:modelValue", state.currentValue);
    emit("change", state.currentValue);
  };
  props.beforeChange ? props.beforeChange(change) : change();
};
const computedWarpClasses = ({ prefixCls, props, state }) => () => {
  return [
    {
      [prefixCls]: true,
      [`${prefixCls}-checked`]: state.currentValue === props.trueValue,
      [`${prefixCls}-disabled`]: state.disabled,
      mini: props.mini,
      disabled: state.disabled
    }
  ];
};
const computedInnerClasses = ({ prefixCls }) => () => `${prefixCls}-inner`;
const computedStyle = ({ props, state }) => () => {
  return {
    backgroundColor: props.trueValue === state.currentValue ? props.trueColor : props.falseColor
  };
};
export {
  computedInnerClasses,
  computedStyle,
  computedWarpClasses,
  toggle
};
