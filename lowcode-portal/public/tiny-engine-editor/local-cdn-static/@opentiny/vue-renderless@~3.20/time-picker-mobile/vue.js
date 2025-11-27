import "../chunk-G2ADBYYC.js";
import { optionMethod, watchModelValue, watchVisible, confirm, updateVisible, getTimePeriod, computedOptions, clear } from './index.js';
const api = ["state", "confirm", "updateVisible", "clear"];
const renderless = (props, {
  reactive,
  watch,
  computed
}, {
  emit,
  vm,
  dispatch
}) => {
  const api2 = {};
  const state = reactive({
    visible: false,
    dateArr: [],
    seconds: null,
    options: computed(() => api2.computedOptions()),
    value: computed(() => !props.showSeconds && state.seconds !== null ? [...state.dateArr, state.seconds] : state.dateArr)
  });
  Object.assign(api2, {
    state,
    watchModelValue: watchModelValue({
      props,
      state
    }),
    watchVisible: watchVisible({
      api: api2,
      state
    }),
    confirm: confirm({
      emit,
      state
    }),
    clear: clear({
      state,
      emit,
      api: api2,
      vm,
      dispatch
    }),
    updateVisible: updateVisible({
      emit,
      state
    }),
    getTimePeriod: getTimePeriod({
      state,
      props
    }),
    computedOptions: computedOptions({
      state,
      api: api2,
      props
    }),
    optionMethod
  });
  watch(() => props.visible, api2.watchVisible);
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true
  });
  return api2;
};
export { api, renderless };