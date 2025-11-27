import "../chunk-G2ADBYYC.js";
const handleChange = ({ constants, nextTick, dispatch, state }) => () => {
  nextTick(() => {
    dispatch(constants.SLIDER_BUTTON_GROUP, "handleChange", [state.value]);
  });
};
const getValue = (state) => () => state.sliderButtonGroup.modelValue;
const setValue = ({ state }) => (val) => {
  if (state.disabled)
    return;
  return state.sliderButtonGroup.$emit("update:modelValue", val);
};
const getGroup = ({ constants, parent: $parent }) => () => {
  let parent = $parent.$parent;
  while (parent) {
    if (parent.$options.componentName !== constants.SLIDER_BUTTON_GROUP) {
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return parent;
};
const mounted = ({ vm, props, dispatch, constants }) => () => {
  dispatch(constants.SLIDER_BUTTON_GROUP, "eachBlock", [
    vm.$refs.sliderButton.offsetLeft,
    vm.$refs.sliderButton.offsetWidth,
    vm.$refs.sliderButton.offsetHeight,
    props.label || props.text,
    vm.$refs.sliderButton
  ]);
};
const unMounted = ({ props, dispatch, constants }) => () => {
  dispatch(constants.SLIDER_BUTTON_GROUP, "delBlock", [props.label || props.text]);
};
const customEvents = ({ props, vm, type }) => {
  const sliderInput = vm.$refs.sliderInput;
  for (let ev in props.events) {
    sliderInput[type + "EventListener"](ev, props.events[ev]);
  }
};
export {
  customEvents,
  getGroup,
  getValue,
  handleChange,
  mounted,
  setValue,
  unMounted
};
