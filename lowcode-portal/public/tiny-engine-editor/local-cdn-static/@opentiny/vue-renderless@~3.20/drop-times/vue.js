import "../chunk-G2ADBYYC.js";
import { init, change } from './index.js';
const api = ["state", "change"];
const renderless = (props, {
  onMounted,
  reactive,
  watch
}, {
  emit
}) => {
  const state = reactive({
    options: [],
    selectedValue: props.modelValue
  });
  watch(() => props.modelValue, newValue => state.selectedValue = newValue);
  const api2 = {
    state,
    change: change(emit),
    init: init({
      state,
      props,
      emit
    })
  };
  onMounted(api2.init);
  return api2;
};
export { api, renderless };