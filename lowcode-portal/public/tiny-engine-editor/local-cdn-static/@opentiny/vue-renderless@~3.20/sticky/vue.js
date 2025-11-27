import "../chunk-G2ADBYYC.js";
import { useRect } from './../common/deps/useRect.js';
import { useWindowSize } from './../common/deps/useWindowSize.js';
import { useEventListener } from './../common/deps/useEventListener.js';
import { useScrollParent } from './../common/deps/dom.js';
import { computedRootStyle, computedStickyStyle, updateRoot, unitToPx, getRootRect, getTarget } from './index.js';
const api = ["state"];
const renderless = (props, hooks, {
  vm,
  emit
}) => {
  const {
    reactive,
    computed,
    unref,
    ref,
    toRef,
    onMounted,
    watch
  } = hooks;
  const state = reactive({
    root: null,
    target: null,
    windowHeight: 0,
    windowWidth: 0,
    rootHeight: 0,
    rootWidth: 0,
    rootTop: 0,
    rootBottom: 0,
    isFixed: false,
    scrollTop: 0,
    transform: 0,
    scrollParent: null,
    targetRect: null,
    offset: 0,
    rootStyle: computed(() => api2.computedRootStyle()),
    stickyStyle: computed(() => api2.computedStickyStyle())
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    computedRootStyle: computedRootStyle({
      props,
      state
    }),
    computedStickyStyle: computedStickyStyle({
      props,
      state
    }),
    updateRoot: updateRoot({
      props,
      state,
      emit,
      api: api2
    }),
    getRootRect: getRootRect({
      vm,
      state,
      api: api2
    }),
    getTarget: getTarget({
      props,
      state,
      api: api2
    }),
    useEventListener: useEventListener(hooks),
    useScrollParent: useScrollParent(hooks),
    useWindowSize: useWindowSize(ref),
    useRect: useRect(unref),
    unitToPx: unitToPx()
  });
  watch(() => state.isFixed, value => {
    emit("change", value);
  });
  watch(() => props.offset, value => {
    state.offset = api2.unitToPx(value);
    api2.updateRoot();
  }, {
    immediate: true
  });
  const {
    width,
    height
  } = api2.useWindowSize();
  state.windowHeight = height;
  state.windowWidth = width;
  state.scrollParent = api2.useScrollParent(toRef(state, "root"));
  api2.useEventListener("scroll", api2.updateRoot, {
    target: toRef(state, "scrollParent"),
    passive: true
  });
  onMounted(() => {
    state.root = vm.$refs.root;
    setTimeout(() => {
      api2.getTarget();
      api2.getRootRect();
      api2.updateRoot();
    });
  });
  return api2;
};
export { api, renderless };