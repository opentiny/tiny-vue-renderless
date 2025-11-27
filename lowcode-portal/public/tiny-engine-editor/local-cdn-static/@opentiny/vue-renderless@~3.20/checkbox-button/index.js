import "../chunk-G2ADBYYC.js";
const handleChange = ({ state, props, emit, nextTick, dispatch, constants }) => (event) => {
  if (state.isLimitExceeded) {
    return;
  }
  let value;
  if (event.target.checked) {
    value = props.trueLabel === void 0 ? true : props.trueLabel;
  } else {
    value = props.falseLabel === void 0 ? false : props.falseLabel;
  }
  emit("change", value, event);
  nextTick(() => {
    if (state.checkboxGroup) {
      dispatch(constants.CHECKBOX_GROUP, "change", [state.checkboxGroup.modelValue]);
    }
  });
};
const computedGetModelGet = ({ state, props }) => () => state.checkboxGroup ? state.store : props.modelValue !== void 0 ? props.modelValue : state.selfModel;
const computedGetModelSet = ({ state, props, emit, dispatch, constants }) => (value) => {
  if (state.checkboxGroup) {
    state.isLimitExceeded = false;
    state.checkboxGroup.min !== void 0 && value.length < state.checkboxGroup.min && (state.isLimitExceeded = true);
    state.checkboxGroup.max !== void 0 && value.length > state.checkboxGroup.max && (state.isLimitExceeded = true);
    state.isLimitExceeded === false && dispatch(constants.CHECKBOX_GROUP, "update:modelValue", [value]);
  } else if (props.modelValue !== void 0) {
    emit("update:modelValue", value);
  } else {
    state.selfModel = value;
  }
};
const computedCheckboxGroup = ({ parent, constants }) => () => {
  let parentObj = parent.$parent;
  while (parentObj) {
    if (parentObj.$options.componentName !== constants.CHECKBOX_GROUP) {
      parentObj = parentObj.$parent;
    } else {
      return parentObj;
    }
  }
  return false;
};
const computedIsDisabled = ({ state, props }) => () => state.checkboxGroup ? state.checkboxGroup.disabled || props.disabled || state.isLimitDisabled : props.disabled;
const computedActiveStyle = (state) => () => ({
  backgroundColor: state.checkboxGroup.fill || "",
  borderColor: state.checkboxGroup.fill || "",
  color: state.checkboxGroup.textColor || "",
  "box-shadow": "-1px 0 0 0 " + state.checkboxGroup.fill
});
const computedFormItemSize = (props) => () => (props.formItem || {}).formItemSize;
const computedSize = ({ state, formItemSize }) => () => state.checkboxGroup && state.checkboxGroup.state.checkboxGroupSize || formItemSize.value;
const toggleEvent = ({ parent, props, type }) => {
  const inputEl = parent.$el.querySelector("input");
  Object.keys(props.events).forEach((ev) => {
    inputEl[type + "EventListener"](ev, props.events[ev]);
  });
};
export {
  computedActiveStyle,
  computedCheckboxGroup,
  computedFormItemSize,
  computedGetModelGet,
  computedGetModelSet,
  computedIsDisabled,
  computedSize,
  handleChange,
  toggleEvent
};
