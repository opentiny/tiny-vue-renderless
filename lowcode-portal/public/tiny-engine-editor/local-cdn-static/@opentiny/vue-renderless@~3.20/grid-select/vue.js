import "../chunk-G2ADBYYC.js";
import { buildRadioConfig, buildSelectConfig, filter, radioChange, selectChange } from './index.js';
const api = ["state", "buildRadioConfig", "buildSelectConfig", "filter", "radioChange", "selectChange"];
const renderless = (props, {
  reactive,
  watch
}, {
  vm,
  emit
}) => {
  const api2 = {};
  const state = reactive({
    value: props.modelValue,
    gridData: props.gridOp.data,
    remoteData: [],
    selected: props.multiple ? [] : {}
  });
  Object.assign(api2, {
    state,
    buildRadioConfig: buildRadioConfig({
      props,
      state
    }),
    buildSelectConfig: buildSelectConfig({
      props,
      state
    }),
    filter: filter({
      props,
      state,
      vm
    }),
    radioChange: radioChange({
      props,
      vm,
      emit
    }),
    selectChange: selectChange({
      props,
      vm,
      emit
    })
  });
  watch(() => props.gridOp.data, data => data && (state.gridData = data), {
    immediate: true,
    deep: true
  });
  return api2;
};
export { api, renderless };