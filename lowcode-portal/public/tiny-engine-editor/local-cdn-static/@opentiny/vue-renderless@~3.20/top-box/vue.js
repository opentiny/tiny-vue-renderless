import "../chunk-G2ADBYYC.js";
import { clearTimer, startTimer, close, handleAfterLeave, bindEvent, unBindEvent, destroy, watchClosed, getTypeClass, getOffsetStyle, getZindex } from './index.js';
const api = ["state", "handleAfterLeave", "clearTimer", "startTimer", "close", "getZindex"];
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch
}, {
  vm,
  parent,
  constants
}) => {
  const api2 = {};
  const state = reactive({
    timer: null,
    message: "",
    type: "info",
    iconClass: "",
    onClose: null,
    closed: false,
    center: false,
    buttons: null,
    duration: 3e3,
    visible: false,
    customClass: "",
    showClose: false,
    verticalOffset: 20,
    dangerouslyUseHTMLString: false,
    typeClass: computed(() => api2.getTypeClass()),
    positionStyle: computed(() => api2.getOffsetStyle())
  });
  Object.assign(api2, {
    state,
    getZindex,
    close: close(state),
    destroy: destroy(parent),
    clearTimer: clearTimer(state),
    getOffsetStyle: getOffsetStyle({
      state
    }),
    getTypeClass: getTypeClass({
      constants,
      state
    }),
    bindEvent: bindEvent({
      api: api2,
      state
    }),
    startTimer: startTimer({
      api: api2,
      state
    }),
    unBindEvent: unBindEvent({
      api: api2,
      state
    }),
    handleAfterLeave: handleAfterLeave(api2),
    watchClosed: watchClosed({
      api: api2,
      state
    })
  });
  watch(() => state.closed, api2.watchClosed, {
    immediate: true
  });
  onMounted(() => {
    props.emitter.emit("TopBoxMounted", vm);
    api2.bindEvent();
  });
  onBeforeUnmount(api2.unBindEvent);
  return api2;
};
export { api, renderless };