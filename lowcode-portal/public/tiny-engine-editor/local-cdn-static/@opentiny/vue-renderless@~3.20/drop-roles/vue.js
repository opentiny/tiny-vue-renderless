import "../chunk-G2ADBYYC.js";
import { init, change, initService } from './index.js';
const api = ["state", "change"];
const renderless = (props, {
  onMounted,
  reactive,
  watch
}, {
  parent,
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
    selectedValue: props.modelValue,
    attrs: parent.$attr
  });
  watch(() => props.modelValue, value => {
    state.selectedValue = value;
  }, {
    immediate: true
  });
  const api2 = {
    state,
    change: change(emit),
    init: init({
      state,
      service: $service,
      emit
    })
  };
  onMounted(api2.init);
  return api2;
};
export { api, renderless };