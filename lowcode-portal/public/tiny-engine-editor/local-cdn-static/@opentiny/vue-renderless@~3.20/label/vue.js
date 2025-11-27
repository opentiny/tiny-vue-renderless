import "../chunk-G2ADBYYC.js";
import { handleClick, computeLabel, computeLabelClass } from './index.js';
const api = ["state", "handleClick", "computeLabel", "computeLabelStyle", "computeLabelClass"];
const renderless = (props, {
  computed,
  onBeforeUnmount,
  reactive,
  watch,
  inject
}, {
  emit,
  parent
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    label: computed(() => api2.computeLabel()),
    type: props.type,
    color: props.color,
    size: props.size,
    labelClass: computed(() => api2.computeLabelClass()),
    isRequired: props.isRequired
  });
  const api2 = {
    state,
    handleClick: handleClick({
      emit,
      state
    }),
    computeLabel: computeLabel(props),
    // computeLabelStyle: computeLabelStyle(props, state),
    computeLabelClass: computeLabelClass(props)
  };
  return api2;
};
export { api, renderless };