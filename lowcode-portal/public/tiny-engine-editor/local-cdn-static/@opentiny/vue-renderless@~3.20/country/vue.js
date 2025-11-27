import "../chunk-G2ADBYYC.js";
import { init, change, initService } from './index.js';
const api = ["state", "change", "emit"];
const renderless = (props, {
  watch,
  reactive
}, {
  service,
  emit
}) => {
  const $service = initService({
    props,
    service
  });
  const state = reactive({
    source: null,
    options: [],
    selectedValue: props.modelValue
  });
  const api2 = {
    state,
    emit,
    change: change(emit),
    init: init({
      state,
      service: $service
    })
  };
  watch(() => props.modelValue, newValue => {
    state.selectedValue = newValue;
  }, {
    immediate: true
  });
  api2.init();
  return api2;
};
export { api, renderless };