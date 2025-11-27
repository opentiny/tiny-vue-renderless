import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { createShepherd, mounted, beforeUnmount } from './index.js';
const api = ["state"];
const renderless = (props, {
  reactive,
  onMounted,
  onBeforeUnmount,
  watch
}, {
  designConfig
}, {
  Shepherd,
  offset
}) => {
  const state = reactive({
    tour: null,
    tour1: null,
    showStep: false,
    domData: props.domData || null,
    mainAxis: props.mainAxis,
    crossAxis: props.crossAxis,
    alignmentAxis: props.alignmentAxis,
    popPosition: props.popPosition,
    modalOverlayOpeningPadding: props.modalOverlayOpeningPadding,
    modalOverlayOpeningRadius: props.modalOverlayOpeningRadius,
    arrow: props.arrow,
    lightClass: props.lightClass
  });
  let baseApi = {
    state,
    createShepherd: createShepherd({
      state,
      props,
      Shepherd,
      offset,
      designConfig
    })
  };
  const api2 = __spreadProps(__spreadValues({}, baseApi), {
    mounted: mounted({
      state,
      api: baseApi
    }),
    beforeUnmount: beforeUnmount(state)
  });
  watch(() => props.showStep, api2.createShepherd);
  onMounted(api2.mounted);
  onBeforeUnmount(api2.beforeUnmount);
  return api2;
};
export { api, renderless };