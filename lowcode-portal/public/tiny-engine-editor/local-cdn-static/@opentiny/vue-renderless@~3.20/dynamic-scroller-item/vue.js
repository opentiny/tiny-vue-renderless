import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { computedId, computedSize, computedFinalActive, updateWatchData, watchId, onDataUpdate, updateSize, computeSize, applyWidthHeight, applySize, watchFinalActive, observeSize, onResize, unobserveSize, onVscrollUpdate } from './index.js';
const api = ["state"];
const addWatchers = ({
  watch,
  props,
  api: api2,
  state
}) => {
  watch(() => props.watchData, () => api2.updateWatchData());
  watch(() => state.id, (value, oldValue) => api2.watchId(value, oldValue));
  watch(() => state.finalActive, value => api2.watchFinalActive(value));
};
const renderless = (props, {
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  inject,
  markRaw
}, {
  vm,
  nextTick,
  emit
}) => {
  const vscrollData = inject("vscrollData");
  const vscrollParent = inject("vscrollParent");
  const vscrollResizeObserver = markRaw(inject("vscrollResizeObserver"));
  const state = reactive({
    id: computed(() => api2.computedId()),
    size: computed(() => api2.computedSize()),
    finalActive: computed(() => api2.computedFinalActive()),
    vscrollData,
    vscrollParent: {
      props: __spreadValues({}, vscrollParent.props),
      state: __spreadValues({}, vscrollParent.state)
    },
    vscrollResizeObserver
  });
  const api2 = {
    state,
    computedId: computedId({
      props,
      state
    }),
    computedSize: computedSize(state),
    computedFinalActive: computedFinalActive({
      props,
      state
    }),
    applySize: applySize({
      emit,
      props,
      state,
      vm
    }),
    unobserveSize: unobserveSize({
      state,
      vm
    })
  };
  Object.assign(api2, {
    updateWatchData: updateWatchData({
      api: api2,
      props,
      state,
      watch
    }),
    watchId: watchId({
      api: api2,
      state,
      vm
    }),
    onDataUpdate: onDataUpdate(api2),
    updateSize: updateSize({
      api: api2,
      state
    }),
    computeSize: computeSize({
      api: api2,
      nextTick,
      state,
      vm
    }),
    applyWidthHeight: applyWidthHeight({
      api: api2,
      state
    }),
    watchFinalActive: watchFinalActive({
      api: api2,
      state
    }),
    observeSize: observeSize({
      api: api2,
      state,
      vm
    }),
    onResize: onResize({
      api: api2,
      state
    }),
    onVscrollUpdate: onVscrollUpdate({
      api: api2,
      state
    })
  });
  state.temporary = {
    forceNextVScrollUpdate: null
  };
  api2.updateWatchData();
  for (const k in props.sizeDependencies) {
    watch(() => props.sizeDependencies[k], api2.onDataUpdate);
  }
  state.vscrollParent.state.temporary.events.on("vscroll:update", api2.onVscrollUpdate);
  onMounted(() => {
    if (state.finalActive) {
      api2.updateSize();
      api2.observeSize();
    }
  });
  onBeforeUnmount(() => {
    state.vscrollParent.state.temporary.events.off("vscroll:update", api2.onVscrollUpdate);
    api2.unobserveSize();
  });
  addWatchers({
    watch,
    props,
    api: api2,
    state
  });
  return api2;
};
export { api, renderless };