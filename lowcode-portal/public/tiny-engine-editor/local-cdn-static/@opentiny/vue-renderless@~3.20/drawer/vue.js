import "../chunk-G2ADBYYC.js";
import { close, watchVisible, confirm, mousedown, mouseup, mousemove, addDragEvent, removeDragEvent, showScrollbar, hideScrollbar, handleClose, computedWidth, computedHeight, open } from './index.js';
const api = ["state", "close", "confirm", "handleClose", "open"];
const renderless = (props, {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  computed
}, {
  emit,
  vm,
  mode,
  constants,
  designConfig
}) => {
  const lockScrollClass = constants.SCROLL_LOCK_CLASS(mode);
  const api2 = {};
  const state = reactive({
    visible: false,
    width: 0,
    height: 0,
    dragEvent: {
      x: 0,
      y: 0,
      isDrag: false,
      offsetWidth: 0,
      offsetHeight: 0
    },
    computedWidth: computed(() => api2.computedWidth()),
    computedHeight: computed(() => api2.computedHeight())
  });
  Object.assign(api2, {
    state,
    open: open({
      state,
      emit,
      vm
    }),
    confirm: confirm({
      api: api2
    }),
    close: close({
      api: api2
    }),
    handleClose: handleClose({
      emit,
      props,
      state
    }),
    mousedown: mousedown({
      state,
      vm
    }),
    mousemove: mousemove({
      state,
      props,
      emit
    }),
    mouseup: mouseup({
      state
    }),
    addDragEvent: addDragEvent({
      api: api2,
      vm
    }),
    removeDragEvent: removeDragEvent({
      api: api2,
      vm
    }),
    watchVisible: watchVisible({
      state,
      api: api2
    }),
    showScrollbar: showScrollbar(lockScrollClass),
    hideScrollbar: hideScrollbar(lockScrollClass),
    computedWidth: computedWidth({
      state,
      designConfig,
      props,
      constants
    }),
    computedHeight: computedHeight({
      state,
      designConfig,
      props,
      constants
    })
  });
  onMounted(() => {
    props.dragable && api2.addDragEvent();
    if (props.lockScroll && props.visible) {
      api2.showScrollbar();
    }
  });
  onBeforeUnmount(() => {
    props.dragable && api2.removeDragEvent();
    props.lockScroll && api2.hideScrollbar();
  });
  watch(() => props.visible, api2.watchVisible, {
    immediate: true
  });
  watch(() => props.width, () => state.width = 0);
  return api2;
};
export { api, renderless };