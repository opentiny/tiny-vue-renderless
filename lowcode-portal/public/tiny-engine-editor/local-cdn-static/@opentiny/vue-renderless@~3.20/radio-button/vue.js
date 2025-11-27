import "../chunk-G2ADBYYC.js";
import { handleChange, getValue, setValue, getGroup, getStyle, toggleEvents, keydownHandle, handleFocus, handleBlur } from './index.js';
const api = ["state", "handleChange", "keydownHandle", "handleFocus", "handleBlur"];
const renderless = (props, {
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  inject
}, {
  parent,
  dispatch,
  constants,
  nextTick,
  vm
}) => {
  const api2 = {
    getGroup: getGroup({
      constants,
      parent
    }),
    toggleEvents: toggleEvents({
      vm,
      props
    })
  };
  const state = reactive({
    focus: false,
    value: computed({
      get: () => api2.getValue(),
      set: val => api2.setValue(val)
    }),
    radioGroup: computed(() => api2.getGroup()),
    activeStyle: computed(() => api2.getStyle()),
    size: computed(() => {
      var _a;
      return (_a = state.radioGroup) == null ? void 0 : _a.state.radioGroupSize;
    }),
    isDisabled: computed(() => {
      var _a;
      return props.disabled || ((_a = state.radioGroup) == null ? void 0 : _a.disabled);
    }),
    tabIndex: computed(() => state.isDisabled || state.radioGroup && state.value !== props.label ? -1 : 0),
    showTips: inject("showTips", false),
    tipContent: props.tipContent
  });
  Object.assign(api2, {
    state,
    getValue: getValue(state),
    getStyle: getStyle(state),
    setValue: setValue({
      state
    }),
    handleChange: handleChange({
      constants,
      dispatch,
      nextTick,
      state
    }),
    keydownHandle: keydownHandle({
      state,
      props
    }),
    handleFocus: handleFocus(state),
    handleBlur: handleBlur(state)
  });
  onMounted(() => {
    api2.toggleEvents(false);
  });
  onBeforeUnmount(() => {
    api2.toggleEvents(true);
  });
  return api2;
};
export { api, renderless };