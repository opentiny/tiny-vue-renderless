import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { afterEnter, afterLeave, computedAnimationName, computedStyle, handleConfirm, handleCancel, watchVisible, hide, handleClose, handleWrapperClick, useMouseEventDown, useMouseEventUp, mounted, unMounted, updatePopper, handleDrag, showScrollbar, hideScrollbar, toggleFullScreen } from './index.js';
import usePopup from './../common/deps/vue-popup.js';
const api = ["afterEnter", "afterLeave", "handleClose", "handleWrapperClick", "useMouseEventDown", "useMouseEventUp", "handleCancel", "handleConfirm", "handleDrag", "toggleFullScreen", "state"];
const initState = ({
  reactive,
  computed,
  api: api2,
  emitter,
  props,
  useBreakpoint
}) => {
  const {
    current
  } = useBreakpoint();
  const state = reactive({
    emitter: emitter(),
    key: 0,
    x: null,
    y: null,
    top: null,
    left: null,
    max: null,
    move: false,
    closed: false,
    dragable: false,
    isFull: props.fullscreen,
    style: computed(() => api2.computedStyle()),
    animationName: computed(() => api2.computedAnimationName()),
    current,
    dragStyle: null
  });
  return state;
};
const mergeState = ({
  reactive,
  state,
  toRefs,
  usePopups
}) => {
  const {
    opened,
    rendered
  } = usePopups;
  const merge = reactive(__spreadValues({
    opened,
    rendered
  }, toRefs(state)));
  return merge;
};
const initApi = ({
  emit,
  api: api2,
  state,
  parent,
  props,
  lockScrollClass,
  constants,
  usePopups,
  nextTick,
  broadcast,
  designConfig,
  vm
}) => {
  const {
    open,
    close
  } = usePopups;
  Object.assign(api2, {
    state,
    open,
    close,
    broadcast,
    handleCancel: handleCancel({
      api: api2,
      emit
    }),
    handleConfirm: handleConfirm({
      api: api2,
      emit
    }),
    updatePopper: updatePopper({
      api: api2,
      constants
    }),
    handleWrapperClick: handleWrapperClick({
      api: api2,
      props,
      state
    }),
    useMouseEventDown: useMouseEventDown({
      state
    }),
    useMouseEventUp: useMouseEventUp({
      state
    }),
    hide: hide({
      api: api2,
      emit,
      state,
      props
    }),
    handleClose: handleClose({
      api: api2,
      constants,
      emit,
      parent,
      props
    }),
    watchVisible: watchVisible({
      api: api2,
      constants,
      emit,
      nextTick,
      parent,
      props,
      vm,
      state
    }),
    computedStyle: computedStyle({
      state,
      props,
      designConfig
    }),
    mounted: mounted({
      api: api2,
      parent,
      props
    }),
    unMounted: unMounted({
      api: api2,
      parent,
      props
    }),
    computedAnimationName: computedAnimationName({
      constants,
      props
    }),
    afterEnter: afterEnter(emit),
    afterLeave: afterLeave(emit),
    hideScrollbar: hideScrollbar(lockScrollClass),
    showScrollbar: showScrollbar(lockScrollClass),
    handleDrag: handleDrag({
      parent,
      props,
      state,
      emit,
      vm
    }),
    // tiny 新增
    toggleFullScreen: toggleFullScreen({
      state,
      emit,
      nextTick,
      vm
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props
}) => {
  watch(() => props.visible, api2.watchVisible);
  watch(() => props.fullscreen, value => {
    state.isFull = value;
  });
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  toRefs,
  reactive,
  watch
}, {
  vm,
  emitter,
  parent,
  emit,
  constants,
  nextTick,
  mode,
  broadcast,
  designConfig,
  useBreakpoint
}) => {
  const api2 = {};
  const lockScrollClass = constants.SCROLL_LOCK_CLASS(mode);
  let state = initState({
    reactive,
    computed,
    api: api2,
    emitter,
    props,
    useBreakpoint
  });
  const usePopups = usePopup({
    api: api2,
    nextTick,
    onBeforeUnmount,
    onMounted,
    props,
    reactive,
    toRefs,
    vm,
    watch
  });
  initApi({
    api: api2,
    state,
    parent,
    props,
    emit,
    constants,
    usePopups,
    lockScrollClass,
    nextTick,
    vm,
    broadcast,
    designConfig
  });
  state = mergeState({
    reactive,
    state,
    toRefs,
    usePopups
  });
  initWatch({
    watch,
    state,
    api: api2,
    props
  });
  onMounted(api2.mounted);
  onBeforeUnmount(api2.unMounted);
  return api2;
};
export { api, renderless };