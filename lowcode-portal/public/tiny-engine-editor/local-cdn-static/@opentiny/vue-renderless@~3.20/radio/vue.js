import "../chunk-G2ADBYYC.js";
import { handleChange, isGroup, radioSize, isDisabled, isDisplayOnly, tabIndex, getModel, setModel, toggleEvent } from './index.js';
const api = ["state", "handleChange"];
const renderless = (props, {
  onMounted,
  onBeforeUnmount,
  computed,
  reactive,
  inject
}, {
  vm,
  parent,
  emit,
  constants,
  nextTick,
  dispatch
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const api2 = {};
  const state = reactive({
    vertical: inject("radioVertical", false),
    size: computed(() => props.size || inject("size", null) || (parent.tinyForm || {}).size),
    focus: false,
    radioGroup: null,
    isGroup: computed(() => api2.isGroup()),
    radioSize: computed(() => api2.radioSize()),
    isDisabled: computed(() => api2.isDisabled()),
    isDisplayOnly: computed(() => api2.isDisplayOnly() || (parent.tinyForm || {}).displayOnly),
    tabIndex: computed(() => api2.tabIndex()),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    model: computed({
      get: () => api2.getModel(),
      set: val => api2.setModel(val)
    })
  });
  Object.assign(api2, {
    state,
    radioSize: radioSize({
      props,
      state
    }),
    getModel: getModel({
      props,
      state
    }),
    isGroup: isGroup({
      constants,
      parent,
      state
    }),
    tabIndex: tabIndex({
      props,
      state
    }),
    isDisabled: isDisabled({
      props,
      state
    }),
    isDisplayOnly: isDisplayOnly({
      props
    }),
    setModel: setModel({
      constants,
      dispatch,
      emit,
      props,
      vm,
      state
    }),
    handleChange: handleChange({
      constants,
      dispatch,
      emit,
      state,
      nextTick
    })
  });
  onMounted(() => {
    dispatch("Tooltip", "tooltip-update");
    toggleEvent({
      props,
      vm,
      type: "add"
    });
  });
  onBeforeUnmount(() => {
    toggleEvent({
      props,
      vm,
      type: "remove"
    });
  });
  return api2;
};
export { api, renderless };