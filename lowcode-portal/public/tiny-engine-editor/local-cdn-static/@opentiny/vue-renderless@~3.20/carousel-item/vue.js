import "../chunk-G2ADBYYC.js";
import { processIndex, calculateTranslate, translateItem, handleItemClick, computedTransform, resetAnimatingMf, setDelta } from './index.js';
const api = ["state", "hover", "translate", "scale", "active", "ready", "inStage", "animating", "isOblique", "hasTitle", "getTransform", "processIndex", "calculateTranslate", "translateItem", "handleItemClick", "resetAnimatingMf", "setDelta"];
const renderless = (props, {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  inject
}, {
  parent,
  dispatch,
  mode,
  vm
}) => {
  const api2 = {};
  const CARD_SCALE = parent.$constants.CARD_SCALE;
  const TYPE_VERTICAL = parent.$constants.TYPE_VERTICAL;
  const carouselParent = inject("CarouselVm");
  const state = reactive({
    scale: 1,
    translate: 0,
    hover: false,
    ready: false,
    active: false,
    inStage: false,
    animating: false,
    animatingMf: false,
    isOblique: false,
    carouselParent,
    hasTitle: computed(() => !!props.title),
    moving: computed(() => carouselParent.state.moving),
    animate: computed(() => Math.abs(carouselParent.state.delta) > 0 ? !state.animatingMf : state.animating),
    getTransform: computed(() => api2.computedTransform()),
    delta: 0
  });
  Object.assign(api2, {
    state,
    processIndex,
    handleItemClick: handleItemClick({
      state,
      parent,
      carouselParent
    }),
    computedTransform: computedTransform({
      carouselParent,
      TYPE_VERTICAL,
      mode,
      state
    }),
    calculateTranslate: calculateTranslate({
      CARD_SCALE,
      state
    }),
    translateItem: translateItem({
      api: api2,
      CARD_SCALE,
      parent,
      state,
      carouselParent
    }),
    setDelta: setDelta({
      state
    }),
    resetAnimatingMf: resetAnimatingMf(state)
  });
  onMounted(() => {
    dispatch("Carousel", "updateItems", [vm]);
    dispatch("Carousel", "complete", []);
  });
  onUnmounted(() => {
    carouselParent && carouselParent.updateItems();
  });
  return api2;
};
export { api, renderless };