import "../chunk-G2ADBYYC.js";
import { dragEvent, handleEvent, mousedownEvent, toggleZoomEvent, revert, maximize, getBox, handleGlobalKeydownEvent, close, updateStyle, addMsgQueue, removeMsgQueue, computedIsMsg, watchValue, created, mounted, beforeUnmouted, selfClickEvent, mouseEnterEvent, mouseLeaveEvent, updateZindex, closeEvent, confirmEvent, cancelEvent, open, resetDragStyle, resetModalViewPosition, computedBoxStyle, handleHashChange, showScrollbar, hideScrollbar, watchVisible } from './index.js';
const api = ["state", "dragEvent", "mousedownEvent", "toggleZoomEvent", "revert", "maximize", "getBox", "close", "updateStyle", "selfClickEvent", "mouseEnterEvent", "mouseLeaveEvent", "updateZindex", "closeEvent", "confirmEvent", "cancelEvent", "open", "beforeUnmouted", "resetDragStyle", "resetModalViewPosition"];
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch
}, {
  vm,
  emit,
  emitter,
  nextTick,
  broadcast,
  vm: parent,
  constants,
  mode
}, {
  isMobileFirstMode
}) => {
  const api2 = {};
  const lockScrollClass = constants.SCROLL_LOCK_CLASS(mode);
  const state = reactive({
    emitter: emitter(),
    visible: false,
    contentVisible: false,
    cumsumZindex: 0,
    modalTop: 0,
    modalZindex: 0,
    zoomLocat: null,
    isMsg: computed(() => api2.computedIsMsg(props)),
    prevEvent: null,
    options: [],
    theme: props.tiny_theme,
    boxStyle: computed(() => api2.computedBoxStyle()),
    timer: 0
  });
  Object.assign(api2, {
    state,
    broadcast,
    computedIsMsg: computedIsMsg(),
    updateStyle: updateStyle({
      nextTick,
      props
    }),
    getBox: getBox({
      vm
    }),
    watchValue: watchValue(api2),
    created: created({
      api: api2,
      props,
      state
    }),
    mounted: mounted({
      api: api2,
      parent,
      props,
      isMobileFirstMode,
      state
    }),
    beforeUnmouted: beforeUnmouted({
      api: api2,
      parent,
      isMobileFirstMode
    }),
    selfClickEvent: selfClickEvent({
      api: api2,
      parent,
      props
    }),
    mouseEnterEvent: mouseEnterEvent(state),
    mouseLeaveEvent: mouseLeaveEvent({
      api: api2,
      props,
      state
    }),
    updateZindex: updateZindex({
      state,
      props
    }),
    handleEvent: handleEvent({
      api: api2,
      emit,
      parent,
      props,
      isMobileFirstMode
    }),
    closeEvent: closeEvent(api2),
    confirmEvent: confirmEvent({
      api: api2,
      state
    }),
    cancelEvent: cancelEvent(api2),
    open: open({
      api: api2,
      emit,
      nextTick,
      parent,
      props,
      state,
      isMobileFirstMode
    }),
    addMsgQueue: addMsgQueue({
      api: api2,
      parent
    }),
    removeMsgQueue: removeMsgQueue({
      api: api2,
      parent
    }),
    close: close({
      emit,
      parent,
      props,
      state
    }),
    handleGlobalKeydownEvent: handleGlobalKeydownEvent(api2),
    handleHashChange: handleHashChange(api2),
    maximize: maximize({
      api: api2,
      nextTick,
      props,
      state,
      isMobileFirstMode
    }),
    revert: revert({
      api: api2,
      nextTick,
      state,
      isMobileFirstMode
    }),
    toggleZoomEvent: toggleZoomEvent({
      api: api2,
      emit,
      parent,
      state,
      isMobileFirstMode
    }),
    mousedownEvent: mousedownEvent({
      api: api2,
      nextTick,
      props,
      state,
      emit,
      isMobileFirstMode
    }),
    dragEvent: dragEvent({
      api: api2,
      emit,
      parent,
      props,
      state
    }),
    resetDragStyle: resetDragStyle(api2),
    resetModalViewPosition: resetModalViewPosition(api2),
    computedBoxStyle: computedBoxStyle({
      props,
      isMobileFirstMode
    }),
    watchVisible: watchVisible({
      api: api2,
      props
    }),
    hideScrollbar: hideScrollbar(lockScrollClass),
    showScrollbar: showScrollbar(lockScrollClass)
  });
  watch(() => props.modelValue, api2.watchValue);
  watch(() => state.visible, api2.watchVisible);
  api2.created();
  onMounted(api2.mounted);
  onBeforeUnmount(api2.beforeUnmouted);
  return api2;
};
export { api, renderless };