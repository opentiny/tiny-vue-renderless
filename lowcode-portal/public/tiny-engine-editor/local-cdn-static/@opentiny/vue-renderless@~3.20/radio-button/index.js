import "../chunk-G2ADBYYC.js";
const handleChange = ({
  constants,
  nextTick,
  dispatch,
  state
}) => () => {
  nextTick(() => {
    dispatch(constants.RADIO_GROUP, "handleChange", [state.value]);
  });
};
const getValue = (state) => () => {
  var _a;
  return (_a = state.radioGroup) == null ? void 0 : _a.modelValue;
};
const setValue = ({ state }) => (val) => {
  var _a;
  return (_a = state.radioGroup) == null ? void 0 : _a.$emit("update:modelValue", val);
};
const getGroup = ({ constants, parent: $parent }) => () => {
  let parent = $parent.$parent;
  while (parent) {
    if (parent.$options.componentName !== constants.RADIO_GROUP) {
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return null;
};
const getStyle = (state) => () => {
  var _a, _b, _c, _d;
  return {
    backgroundColor: ((_a = state.radioGroup) == null ? void 0 : _a.fill) || "",
    borderColor: ((_b = state.radioGroup) == null ? void 0 : _b.fill) || "",
    boxShadow: ((_c = state.radioGroup) == null ? void 0 : _c.fill) ? `-1px 0 0 0 ${state.radioGroup.fill}` : "",
    color: ((_d = state.radioGroup) == null ? void 0 : _d.textColor) || ""
  };
};
const toggleEvents = ({ vm, props }) => (isUnBind = false) => {
  const radioEl = vm.$refs.radio;
  Object.keys(props.events).forEach((ev) => {
    radioEl[(isUnBind ? "remove" : "add") + "EventListener"](ev, props.events[ev]);
  });
};
const keydownHandle = ({ state, props }) => () => {
  state.value = state.isDisabled ? state.value : props.label;
};
const handleFocus = (state) => () => state.focus = true;
const handleBlur = (state) => () => state.focus = false;
export {
  getGroup,
  getStyle,
  getValue,
  handleBlur,
  handleChange,
  handleFocus,
  keydownHandle,
  setValue,
  toggleEvents
};
