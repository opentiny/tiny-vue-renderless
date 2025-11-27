import "../chunk-G2ADBYYC.js";
import { computedMessage, computedStyle, computedFontSize, computedLabel, getInternalValue, handleClick, mouseEnter } from './index.js';
const api = ["state", "handleClick", "mouseEnter"];
const renderless = (props, {
  reactive,
  computed,
  inject
}, {
  mode,
  emit
}) => {
  const groupSize = inject("groupSize", null);
  const state = reactive({
    internalValue: computed(() => api2.getInternalValue()),
    label: computed(() => api2.computedLabel()),
    style: computed(() => api2.computedStyle()),
    message: computed(() => api2.computedMessage()),
    fontSize: computed(() => api2.computedFontSize()),
    size: groupSize || props.size,
    color: inject("color", null) || props.color,
    backgroundColor: inject("backgroundColor", null) || props.backgroundColor
  });
  const api2 = {
    state,
    computedLabel: computedLabel({
      state,
      props
    }),
    computedStyle: computedStyle({
      state,
      props
    }),
    computedMessage: computedMessage({
      props
    }),
    computedFontSize: computedFontSize({
      props,
      state,
      mode
    }),
    getInternalValue: getInternalValue({
      props
    }),
    handleClick: handleClick(emit),
    mouseEnter: mouseEnter(emit)
  };
  return api2;
};
export { api, renderless };