import "../chunk-G2ADBYYC.js";
import { computedBarSize, analyzeScrolling, createVirtualScroll, onScroll, refresh } from './index.js';
const api = ["state", "onScroll", "refresh"];
const renderless = (props, {
  reactive,
  computed,
  onMounted
}, {
  emit,
  vm,
  nextTick
}) => {
  const api2 = {};
  const state = reactive({
    scrollbarSize: computed(() => api2.computedBarSize()),
    vs: null,
    scrollLeft: -1,
    scrollTop: -1,
    slicedCols: [],
    slicedRows: [],
    ctx: {},
    isReady: false,
    maxLeft: 0,
    maxTop: 0,
    isTop: true,
    isBottom: false,
    isLeft: true,
    isRight: false,
    slotParams: {}
  });
  Object.assign(api2, {
    state,
    computedBarSize: computedBarSize(props),
    analyzeScrolling: analyzeScrolling({
      props,
      state
    }),
    createVirtualScroll: createVirtualScroll({
      api: api2,
      props,
      state
    }),
    onScroll: onScroll({
      emit,
      state
    }),
    refresh: refresh({
      api: api2,
      state,
      vm,
      nextTick
    })
  });
  state.vs = api2.createVirtualScroll();
  api2.onScroll();
  onMounted(() => {
    state.maxTop = vm.$el.scrollHeight - vm.$el.offsetHeight;
    state.maxLeft = vm.$el.scrollWidth - vm.$el.offsetWidth;
    state.isReady = true;
  });
  return api2;
};
export { api, renderless };