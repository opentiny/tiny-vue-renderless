import "../chunk-G2ADBYYC.js";
import { mountedHandler, beforeUnmountHandler, onTouchstart, onTouchmove, onTouchend, isTouchable, ease, setStatus, getStatusText, showSuccessTip, checkPosition, onTouchStart, onTouchMove, onTouchEnd, watchModelValueChange, watchStatusChange, parseHeaderHeight, checkSelfSimulate } from './index.js';
import { getScrollParent } from './../common/deps/dom.js';
import { useTouch } from './../common/deps/useTouch.js';
import { useEventListener } from './../common/deps/useEventListener.js';
import emulate from './../common/deps/touch-emulator.js';
emulate();
const api = ["state", "constants", "onTouchStart", "onTouchEnd", "getStatusText"];
const renderless = (props, {
  ref,
  unref,
  toRef,
  isRef,
  reactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated
}, {
  vm,
  emit,
  constants,
  t,
  nextTick,
  slots
}, {
  Loading
}) => {
  const api2 = {};
  const state = reactive({
    replaces: "",
    styleObj: {},
    translate3d: 0,
    draggposition: 0,
    value: props.modelValue,
    checkStatus: false,
    headHeight: props.headHeight,
    pullingText: props.pullingText,
    loosingText: props.loosingText,
    successText: props.successText,
    successDuration: props.successDuration,
    animationDuration: props.animationDuration,
    disabled: computed(() => props.disabled),
    /* mf state */
    reachTop: false,
    scrollParent: null,
    scrollTrack: null,
    status: constants.STATUS.NORMAL,
    distance: 0,
    duration: 0,
    headerHeight: ""
  });
  const touchState = {};
  Object.assign(api2, {
    state,
    constants,
    onTouchstart: onTouchstart({
      state
    }),
    onTouchmove: onTouchmove({
      vm,
      state
    }),
    onTouchend: onTouchend({
      emit,
      props,
      state
    }),
    mountedHandler: mountedHandler({
      api: api2,
      vm,
      state
    }),
    beforeUnmountHandler: beforeUnmountHandler({
      api: api2,
      vm
    }),
    useTouch: useTouch(ref),
    useEventListener: useEventListener({
      unref,
      isRef,
      watch,
      nextTick,
      onMounted,
      onUnmounted,
      onActivated,
      onDeactivated
    }),
    isTouchable: isTouchable({
      props,
      state,
      constants
    }),
    ease: ease({
      state,
      props
    }),
    setStatus: setStatus({
      emit,
      props,
      state,
      constants
    }),
    getStatusText: getStatusText({
      props,
      state,
      t,
      constants
    }),
    showSuccessTip: showSuccessTip({
      api: api2,
      props,
      state,
      constants
    }),
    checkPosition: checkPosition({
      state,
      touchState
    }),
    onTouchStart: onTouchStart(api2),
    onTouchMove: onTouchMove({
      api: api2,
      state,
      touchState
    }),
    onTouchEnd: onTouchEnd({
      api: api2,
      emit,
      nextTick,
      state,
      props,
      touchState,
      constants
    }),
    watchModelValueChange: watchModelValueChange({
      api: api2,
      slots,
      state,
      props
    }),
    watchStatusChange: watchStatusChange({
      api: api2,
      state,
      props,
      Loading,
      vm,
      constants,
      slots
    }),
    parseHeaderHeight: parseHeaderHeight({
      state,
      props,
      constants
    }),
    checkSelfSimulate: checkSelfSimulate({
      state,
      props
    })
  });
  watch(() => props.modelValue, value => api2.watchModelValueChange(value));
  watch(() => state.status, (value, oldValue) => api2.watchStatusChange(value, oldValue));
  watch(() => props.headHeight, () => api2.parseHeaderHeight(), {
    immediate: true
  });
  Object.assign(touchState, api2.useTouch());
  state.stopHandle = api2.useEventListener("touchmove", api2.onTouchMove, {
    target: toRef(state, "scrollTrack")
  });
  onMounted(() => {
    state.scrollParent = getScrollParent(vm.$refs.root);
    state.scrollTrack = vm.$refs.track;
  });
  onUnmounted(() => {
    typeof state.stopHandle === "function" && state.stopHandle();
    state.scrollParent = null;
    state.scrollTrack = null;
  });
  return api2;
};
export { api, renderless };