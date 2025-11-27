import "../chunk-G2ADBYYC.js";
import { clearTimer, startTimer, close, bindEvent, unBindEvent, click, watchClosed, getOffsetStyle, getPositionSide, getZindex } from './index.js';
const api = ["state", "clearTimer", "startTimer", "close", "bindEvent", "unBindEvent", "click", "watchClosed", "getOffsetStyle", "getPositionSide", "getZindex"];
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch
}, {
  emit
}) => {
  const api2 = {};
  const state = reactive({
    timer: null,
    closed: false,
    visible: true,
    duration: computed(() => props.duration),
    showClose: true,
    verticalOffset: 0,
    position: computed(() => props.position),
    dangerouslyUseHTMLString: false,
    positionStyle: computed(() => api2.getOffsetStyle(state)),
    verticalProperty: computed(() => api2.getPositionSide(state)),
    customClass: computed(() => props.customClass)
  });
  Object.assign(api2, {
    state,
    getZindex,
    getOffsetStyle,
    getPositionSide,
    close: close({
      state,
      props
    }),
    click: click({
      emit,
      state
    }),
    clearTimer: clearTimer(state),
    bindEvent: bindEvent({
      api: api2,
      state
    }),
    unBindEvent: unBindEvent(api2),
    startTimer: startTimer({
      api: api2,
      state
    }),
    watchClosed: watchClosed(state)
  });
  watch(() => state.closed, api2.watchClosed, {
    immediate: true
  });
  onMounted(api2.bindEvent);
  onBeforeUnmount(api2.unBindEvent);
  return api2;
};
export { api, renderless };