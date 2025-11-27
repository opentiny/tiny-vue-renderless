import "../chunk-G2ADBYYC.js";
const handleChange = ({
  constants,
  dispatch,
  emit,
  state,
  nextTick
}) => () => {
  nextTick(() => {
    emit("change", state.model);
    state.isGroup && dispatch(constants.RADIO_GROUP, "handleChange", [state.model]);
  });
};
const isGroup = ({ constants, parent: $parent, state }) => () => {
  let parent = $parent.$parent.$parent;
  while (parent) {
    if (parent.$options.componentName !== constants.RADIO_GROUP) {
      parent = parent.$parent;
    } else {
      state.radioGroup = parent;
      return true;
    }
  }
  return false;
};
const radioSize = ({ props, state }) => () => {
  var _a, _b;
  if (state.isGroup && ((_b = (_a = state.radioGroup) == null ? void 0 : _a.state) == null ? void 0 : _b.radioGroupSize)) {
    return state.radioGroup.state.radioGroupSize;
  } else {
    return props.size;
  }
};
const isDisabled = ({ props, state }) => () => {
  var _a;
  return props.disabled || ((_a = state.radioGroup) == null ? void 0 : _a.disabled) || state.formDisabled;
};
const isDisplayOnly = ({ props }) => () => props.displayOnly;
const tabIndex = ({ props, state }) => () => state.isDisabled || state.isGroup && state.model !== props.label ? -1 : 0;
const getModel = ({ props, state }) => () => state.isGroup && state.radioGroup ? state.radioGroup.modelValue : props.modelValue;
const setModel = ({
  constants,
  dispatch,
  emit,
  props,
  vm,
  state
}) => (val) => {
  if (state.isGroup) {
    dispatch(constants.RADIO_GROUP, "update:modelValue", [val]);
  } else {
    emit("update:modelValue", val);
  }
  vm.$refs.radio && (vm.$refs.radio.checked = state.model === props.label);
};
const toggleEvent = ({ props, vm, type }) => {
  const radioEl = vm.$refs.radio;
  if (radioEl) {
    Object.keys(props.events).forEach((ev) => {
      radioEl[type + "EventListener"](ev, props.events[ev]);
    });
  }
};
export {
  getModel,
  handleChange,
  isDisabled,
  isDisplayOnly,
  isGroup,
  radioSize,
  setModel,
  tabIndex,
  toggleEvent
};
