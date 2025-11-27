import "../chunk-G2ADBYYC.js";
import { computedContent, computedValueRef, computedTransform } from './index.js';
import { xss } from './../common/xss.js';
const api = ["state"];
const renderless = (props, {
  computed,
  reactive
}, {
  designConfig
}) => {
  const state = reactive({
    isOverstep: false,
    valueRef: computed(() => api2.computedValueRef()),
    content: computed(() => api2.computedContent()),
    href: computed(() => xss.filterUrl(props.href)),
    transform: computed(() => api2.computedTransform())
  });
  const api2 = {
    state,
    computedValueRef: computedValueRef({
      props
    }),
    computedContent: computedContent({
      props,
      state
    }),
    computedTransform: computedTransform({
      props,
      designConfig
    })
  };
  return api2;
};
export { api, renderless };