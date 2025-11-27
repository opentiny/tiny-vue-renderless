import "../chunk-G2ADBYYC.js";
import { computedFormItemSize, computedCheckboxGroupSize } from './index.js';
const api = ["state"];
const renderless = (props, {
  computed,
  reactive,
  watch,
  provide
}, {
  dispatch,
  constants
}) => {
  const api2 = {
    computedFormItemSize: computedFormItemSize(props)
  };
  const formItemSize = computed(() => api2.computedFormItemSize());
  const state = reactive({
    checkboxGroupSize: computed(() => api2.computedCheckboxGroupSize())
  });
  Object.assign(api2, {
    state,
    computedCheckboxGroupSize: computedCheckboxGroupSize({
      props,
      formItemSize
    })
  });
  watch(() => props.modelValue, value => dispatch(constants.FORM_ITEM, constants.FORM_CHANGE, [value]));
  provide("size", props.size);
  provide("vertical", props.vertical);
  provide("iconPosition", props.iconPosition);
  provide("shape", props.shape);
  return api2;
};
export { api, renderless };