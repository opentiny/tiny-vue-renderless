import "../chunk-G2ADBYYC.js";
import { getClientWidth, handleClick, clearTimer, useTouchEvent, onScroll, computedStyle, getExpandList, mounted, getScrollListener } from './index.js';
const api = ["state", "handleClick"];
const renderless = (props, {
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch
}, {
  vm,
  emit,
  nextTick
}) => {
  const state = reactive({
    centerSpace: 0,
    disabled: false,
    initTimer: null,
    scrolling: false,
    commHiddenSpace: "",
    specialHiddenSpace: "",
    stayTime: null,
    lastScrollTop: 0,
    style: computed(() => api2.computedStyle()),
    expandList: null,
    itemTitle: "",
    isExpand: false,
    scrollElement: "",
    elementHeight: 0,
    screenHeight: 0
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    getClientWidth: getClientWidth({
      state,
      vm
    }),
    handleClick: handleClick({
      props,
      state,
      emit
    }),
    clearTimer: clearTimer({
      state,
      api: api2
    }),
    useTouchEvent: useTouchEvent({
      state,
      props,
      nextTick,
      api: api2
    }),
    onScroll: onScroll({
      state,
      api: api2
    }),
    computedStyle: computedStyle({
      props,
      state
    }),
    getExpandList: getExpandList({
      state,
      props
    }),
    mounted: mounted(api2),
    getScrollListener: getScrollListener({
      vm,
      props,
      state
    })
  });
  onMounted(api2.mounted);
  onBeforeUnmount(api2.clearTimer);
  watch(() => props.expandList, api2.getExpandList);
  return api2;
};
export { api, renderless };