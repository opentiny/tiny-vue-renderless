import "../chunk-G2ADBYYC.js";
import { handelIconClick, getSliceNum, getIconNum, handleChange, isGroup, getSize, isDisabled, getModel, setModel, computedStore, getItemChecked, cardClick } from './index.js';
const api = ["state", "handelIconClick", "handleChange", "cardClick"];
const renderless = (props, {
  reactive,
  watch,
  computed
}, {
  vm,
  parent,
  emit,
  constants,
  nextTick,
  dispatch
}) => {
  const api2 = {};
  const state = reactive({
    cardGroup: {},
    selfModel: false,
    itemChecked: computed(() => api2.getItemChecked()),
    sliceNum: computed(() => api2.getSliceNum()),
    iconNum: computed(() => api2.getIconNum()),
    effectOptions: computed(() => props.options.filter(item => !item.hidden)),
    store: computed(() => api2.computedStore()),
    customClass: computed(() => props.customClass || state.cardGroup.customClass || ""),
    autoWidth: computed(() => props.autoWidth || state.cardGroup.autoWidth),
    height: computed(() => props.height || state.cardGroup.height),
    status: computed(() => props.status || state.cardGroup.status || "default"),
    checkType: computed(() => props.checkType || state.cardGroup.checkType),
    type: computed(() => props.type || state.cardGroup.type || "text"),
    isCheckbox: computed(() => state.checkType === "checkbox"),
    isGroup: computed(() => api2.isGroup()),
    size: computed(() => api2.getSize()),
    disabled: computed(() => api2.isDisabled()),
    model: computed({
      get: () => api2.getModel(),
      set: val => api2.setModel(val)
    }),
    checkMode: computed(() => props.checkMode)
  });
  Object.assign(api2, {
    state,
    getSize: getSize({
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
    isDisabled: isDisabled({
      props,
      state
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
    }),
    cardClick: cardClick({
      emit,
      state,
      props
    }),
    getSliceNum: getSliceNum({
      state,
      props
    }),
    getIconNum: getIconNum({
      state,
      props
    }),
    computedStore: computedStore({
      state,
      props
    }),
    handelIconClick: handelIconClick({
      emit
    }),
    getItemChecked: getItemChecked({
      state,
      props
    })
  });
  watch(() => state.disabled, () => {
    state.effectOptions.forEach(item => {
      item.disabled = item.disabled || state.disabled;
    });
  }, {
    immediate: true
  });
  return api2;
};
export { api, renderless };