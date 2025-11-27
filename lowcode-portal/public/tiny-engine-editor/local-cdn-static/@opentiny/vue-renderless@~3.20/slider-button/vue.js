import "../chunk-G2ADBYYC.js";
import { handleChange, getValue, setValue, getGroup, mounted, unMounted, customEvents } from './index.js';
const api = ["state", "handleChange"];
const renderless = (props, {
  computed,
  reactive,
  onMounted,
  inject,
  onBeforeUnmount,
  watch
}, {
  emit,
  parent,
  dispatch,
  constants,
  nextTick,
  vm
}) => {
  const state = reactive({
    disabled: inject("disabled", null) || props.disabled,
    type: inject("sliderType", null),
    value: computed({
      get: () => api2.getValue(),
      set: val => api2.setValue(val)
    }),
    label: computed(() => props.label || props.text),
    sliderButtonGroup: computed(() => api2.getGroup()),
    size: inject("sliderSize", null),
    tabIndex: computed(() => state.sliderButtonGroup && state.value !== (props.label || props.text) ? -1 : 0)
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    mounted: mounted({
      vm,
      props,
      dispatch,
      constants,
      state,
      nextTick
    }),
    unMounted: unMounted({
      props,
      dispatch,
      constants
    }),
    getValue: getValue(state),
    setValue: setValue({
      emit,
      state
    }),
    getGroup: getGroup({
      constants,
      parent
    }),
    handleChange: handleChange({
      constants,
      dispatch,
      nextTick,
      state
    })
  });
  onMounted(() => {
    api2.mounted();
    customEvents({
      props,
      vm,
      type: "add"
    });
  });
  onBeforeUnmount(() => {
    api2.unMounted();
    customEvents({
      props,
      vm,
      type: "remove"
    });
  });
  watch(() => state.label, api2.mounted);
  return api2;
};
export { api, renderless };