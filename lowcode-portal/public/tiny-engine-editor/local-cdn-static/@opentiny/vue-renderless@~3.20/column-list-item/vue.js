import "../chunk-G2ADBYYC.js";
import { getModel, setModel, handelIconClick, computedStore, getItemChecked, handleChange, getIsGroup, getSize, isDisabled, computedOptions, getType } from './index.js';
const api = ["state", "handelIconClick", "handleChange"];
const renderless = (props, {
  reactive,
  computed
}, {
  vm,
  parent,
  emit,
  nextTick,
  dispatch,
  constants
}) => {
  const api2 = {};
  const state = reactive({
    columnGroup: {},
    type: computed(() => api2.getType()),
    size: computed(() => api2.getSize()),
    disabled: computed(() => api2.isDisabled()),
    itemChecked: computed(() => api2.getItemChecked()),
    sliceNum: computed(() => props.size === "small" ? 1 : 2),
    iconNum: computed(() => props.size === "small" ? 2 : 3),
    showCheckbox: computed(() => props.showCheckbox || state.columnGroup.showCheckbox),
    showRadio: computed(() => props.showRadio || state.columnGroup.showRadio),
    store: computed(() => api2.computedStore()),
    effectOptions: computed(() => api2.computedOptions()),
    isGroup: computed(() => api2.getIsGroup()),
    model: computed({
      get: () => api2.getModel(),
      set: val => api2.setModel(val)
    })
  });
  Object.assign(api2, {
    state,
    getIsGroup: getIsGroup({
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
    getSize: getSize({
      props,
      state
    }),
    getModel: getModel({
      props,
      state
    }),
    handleChange: handleChange({
      constants,
      dispatch,
      emit,
      state,
      nextTick
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
    }),
    computedOptions: computedOptions({
      props
    }),
    getType: getType({
      props,
      state
    })
  });
  return api2;
};
export { api, renderless };