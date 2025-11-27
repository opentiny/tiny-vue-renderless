import "../chunk-G2ADBYYC.js";
import { clickList, check, clickErrorText } from './index.js';
import { getScrollParent } from './../common/deps/dom.js';
import { useRect } from './../common/deps/useRect.js';
import { useEventListener } from './../common/deps/useEventListener.js';
import debounce from './../common/deps/debounce.js';
const api = ["state", "clickList", "check", "clickErrorText"];
const renderless = (props, {
  inject,
  reactive,
  computed,
  onMounted,
  unref,
  watch,
  onUpdated,
  isRef,
  onUnmounted,
  onActivated,
  onDeactivated,
  toRef
}, {
  emit,
  vm,
  nextTick
}) => {
  const api2 = {};
  const state = reactive({
    loading: props.loading,
    tabStatus: inject("TabStatus", null),
    scrollParent: null,
    scroller: computed(() => props.scroller || state.scrollParent)
  });
  Object.assign(api2, {
    state,
    clickList: clickList({
      emit,
      props
    }),
    useRect: useRect(unref),
    check: debounce(+props.delay, check({
      api: api2,
      emit,
      props,
      state,
      vm
    })),
    clickErrorText: clickErrorText({
      api: api2,
      emit
    }),
    useEventListener: useEventListener({
      unref,
      isRef,
      watch,
      nextTick,
      onMounted,
      onUnmounted,
      onActivated,
      onDeactivated
    })
  });
  watch(() => [props.loading, props.finished, props.error], () => api2.check());
  watch(() => state.tabStatus, tabActive => tabActive && api2.check());
  api2.useEventListener("scroll", api2.check, {
    target: toRef(state, "scroller"),
    passive: true
  });
  onUpdated(() => {
    state.loading = props.loading;
  });
  onMounted(() => {
    state.scrollParent = getScrollParent(vm.$el);
    if (props.immediateCheck) {
      api2.check();
    }
  });
  return api2;
};
export { api, renderless };