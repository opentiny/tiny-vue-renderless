import "../chunk-G2ADBYYC.js";
import { mounted, reRenderWatermark, unmounted, watchProps } from './index.js';
const api = ["reRenderWatermark"];
const renderless = (props, {
  onMounted,
  reactive,
  watch,
  computed,
  onUnmounted
}, {
  constants,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    watermarkDiv: null,
    observerInstance: null,
    flag: 0,
    font: computed(() => Object.assign(constants.font, props.font))
  });
  Object.assign(api2, {
    state,
    reRenderWatermark: reRenderWatermark({
      state
    }),
    mounted: mounted({
      vm,
      state,
      props
    }),
    unmounted: unmounted({
      state
    }),
    watchProps: watchProps({
      state,
      vm,
      props
    })
  });
  onMounted(api2.mounted);
  onUnmounted(api2.unmounted);
  watch([props, () => state.flag], api2.watchProps);
  return api2;
};
export { api, renderless };