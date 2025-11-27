import "../chunk-G2ADBYYC.js";
import { init, change, initService } from './index.js';
const api = ["state", "change", "clear", "visibleChange"];
const renderless = (props, {
  watch,
  reactive
}, {
  emit,
  service
}) => {
  const $service = initService({
    props,
    service
  });
  const state = reactive({
    options: [],
    source: null,
    selectedValue: props.modelValue
  });
  const api2 = {
    state,
    change: change(emit),
    init: init({
      state,
      props,
      service: $service
    })
  };
  watch(() => props.modelValue, propsValue => {
    state.selectedValue = propsValue;
  }, {
    immediate: true
  });
  api2.init();
  return api2;
};
export { api, renderless };