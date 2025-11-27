import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { getStyle, watchValue, open, opened, closed, onTouchMove, close, renderOverlay, clickOverlay, updateZIndex } from './index.js';
const api = ["state", "open", "close", "clickOverlay", "onTouchMove", "opened", "closed"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2
}) => {
  const state = reactive({
    transitionName: computed(() => props.transition || props.position === "center" ? "tiny-fade" : `tiny-popup-slide-${props.position}`),
    style: computed(() => api2.getStyle()),
    inited: computed(() => state.inited || props.modelValue),
    opened: false,
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
    direction: "",
    shouldRender: computed(() => state.inited || props.lazyRender),
    context: {
      zIndex: 2e3,
      lockCount: 0,
      stack: []
    },
    zIndex: props.zIndex,
    overlayStyle: computed(() => __spreadValues({
      zIndex: state.zIndex
    }, props.overlayStyle))
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  vm,
  emit,
  nextTick,
  constants
}) => {
  Object.assign(api2, {
    state,
    opened: opened(emit),
    closed: closed(emit),
    getStyle: getStyle(props),
    watchValue: watchValue(api2),
    updateZIndex: updateZIndex({
      vm,
      state
    }),
    clickOverlay: clickOverlay({
      api: api2,
      emit,
      props
    }),
    renderOverlay: renderOverlay({
      api: api2,
      nextTick,
      props,
      state
    }),
    onTouchMove: onTouchMove({
      vm,
      state
    }),
    open: open({
      api: api2,
      constants,
      emit,
      props,
      state
    }),
    close: close({
      api: api2,
      constants,
      emit,
      props,
      state
    })
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  nextTick
}, {
  constants,
  vm,
  emit
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2
  });
  initApi({
    api: api2,
    props,
    state,
    vm,
    emit,
    nextTick,
    constants
  });
  watch(() => props.modelValue, api2.watchValue, {
    immediate: true
  });
  onMounted(() => {
    props.modelValue && api2.open();
  });
  return api2;
};
export { api, renderless };