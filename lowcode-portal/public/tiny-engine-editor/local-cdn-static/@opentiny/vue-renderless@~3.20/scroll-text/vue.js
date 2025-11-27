import "../chunk-G2ADBYYC.js";
import { computedBindStyle, stopAnimation, startAnimation } from './index.js';
const api = ["state", "startAnimation", "stopAnimation"];
const renderless = (props, {
  computed,
  reactive
}, {
  constants
}) => {
  const api2 = {
    computedBindStyle
  };
  const state = reactive({
    isStop: false,
    bindStyle: computed(() => api2.computedBindStyle({
      constants,
      time: props.time
    }))
  });
  Object.assign(api2, {
    state,
    startAnimation: startAnimation({
      props,
      state
    }),
    stopAnimation: stopAnimation({
      props,
      state
    })
  });
  return api2;
};
export { api, renderless };