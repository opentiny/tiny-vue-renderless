import "../chunk-G2ADBYYC.js";
import { computedIsClosable, computedActive, computedPaneName, watchTitle } from './index.js';
const api = ["state"];
const renderless = (props, {
  computed,
  inject,
  reactive,
  watch
}, {
  parent,
  nextTick
}) => {
  const rootTabs = inject("rootTabs");
  const api2 = {
    watchTitle: watchTitle(parent),
    computedIsClosable: computedIsClosable({
      rootTabs,
      props
    })
  };
  const state = reactive({
    index: null,
    loaded: false,
    animateShow: true,
    rootTabs,
    active: computed(() => api2.computedActive()),
    paneName: computed(() => api2.computedPaneName()),
    isClosable: computed(() => api2.computedIsClosable())
  });
  Object.assign(api2, {
    state,
    computedActive: computedActive({
      nextTick,
      props,
      state
    }),
    computedPaneName: computedPaneName({
      props,
      state
    })
  });
  watch(() => props.title, api2.watchTitle);
  return api2;
};
export { api, renderless };