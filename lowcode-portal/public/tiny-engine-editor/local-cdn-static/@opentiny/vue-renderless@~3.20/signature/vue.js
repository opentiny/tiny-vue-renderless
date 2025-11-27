import "../chunk-G2ADBYYC.js";
import emulate from './../common/deps/touch-emulator.js';
import { useRect as _useRect } from './../common/deps/useRect.js';
import { touchStart, touchMove, touchEnd, setCanvasBgColor, submit, cancel, rewrite, mounted, beforeUnmount, setPlaceholder, toggleFullscreen, initCanvas, tranformImage, redraw, getSignatureImage } from './index.js';
emulate();
const api = ["state", "touchStart", "touchMove", "touchEnd", "rewrite", "submit", "toggleFullscreen", "initCanvas", "cancel", "tranformImage", "redraw", "getSignatureImage"];
const renderless = (props, {
  unref,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
  markRaw
}, {
  emit,
  vm,
  nextTick,
  t,
  useBreakpoint
}, {
  Modal
}) => {
  const {
    current
  } = useBreakpoint();
  const state = reactive({
    width: 0,
    height: 0,
    ctx: null,
    isBeginWrite: false,
    isFullscreen: false,
    current,
    canvasRect: null,
    isDrawing: false,
    paths: markRaw([]),
    resizeObserver: null,
    value: props.value,
    lastRedrawDate: 0
  });
  watch(() => props.value, newValue => {
    if (newValue) {
      state.value = newValue;
    }
  });
  const useRect = _useRect(unref);
  const api2 = {
    state,
    touchMove: touchMove({
      emit,
      state
    }),
    touchEnd: touchEnd({
      emit,
      state
    }),
    setCanvasBgColor: setCanvasBgColor({
      props,
      state
    }),
    setPlaceholder: setPlaceholder({
      props,
      state
    }),
    getSignatureImage: getSignatureImage({
      props,
      vm,
      Modal,
      t
    })
  };
  Object.assign(api2, {
    touchStart: touchStart({
      emit,
      props,
      state,
      vm,
      api: api2,
      useRect
    }),
    rewrite: rewrite({
      api: api2,
      emit,
      state
    }),
    mounted: mounted({
      state,
      api: api2,
      vm,
      nextTick,
      markRaw
    }),
    onBeforeUnmount: beforeUnmount({
      state,
      vm
    }),
    initCanvas: initCanvas({
      props,
      state,
      vm
    }),
    toggleFullscreen: toggleFullscreen({
      api: api2,
      nextTick,
      state
    }),
    cancel: cancel({
      api: api2,
      emit
    }),
    redraw: redraw({
      props,
      state,
      nextTick
    }),
    tranformImage: tranformImage({
      api: api2,
      vm,
      props,
      nextTick
    }),
    submit: submit({
      emit,
      api: api2
    })
  });
  onMounted(() => api2.mounted());
  onBeforeUnmount(() => api2.onBeforeUnmount());
  return api2;
};
export { api, renderless };