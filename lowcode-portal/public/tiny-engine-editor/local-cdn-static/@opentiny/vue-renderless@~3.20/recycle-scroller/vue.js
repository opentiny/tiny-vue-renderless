import "../chunk-G2ADBYYC.js";
import { handleVisibilityChange, updateVisibleItems, computedSizes, computedItemIndexByKey, getScroll, unuseView, addView, sortViews, handleScroll, handleResize, applyPageMode, addListeners, removeListeners, getListenerTarget, scrollToPosition, scrollToItem, computeViewStyle, computeViewEvent, resetTemporary, init } from './index.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
const api = ["state", "handleVisibilityChange", "handleScroll", "scrollToItem", "computeViewStyle", "computeViewEvent", "updateVisibleItems", "resetTemporary"];
const addWatchers = ({
  watch,
  props,
  api: api2,
  state
}) => {
  watch(() => props.items, () => api2.init());
  watch(() => props.pageMode, () => {
    api2.applyPageMode();
    api2.updateVisibleItems(false);
  });
  watch(() => state.sizes, () => api2.updateVisibleItems(false), {
    deep: true
  });
  watch(() => props.gridItems, () => api2.updateVisibleItems(true));
  watch(() => props.itemSecondarySize, () => api2.updateVisibleItems(true));
};
const checkProps = props => {
  if (props.gridItems && !props.itemSize) {
    throw new Error("[TINY Error][RecycleScroller] You must provide an itemSize when using gridItems");
  }
};
const renderless = (props, {
  reactive,
  computed,
  onBeforeUnmount,
  onMounted,
  onActivated,
  watch,
  markRaw,
  shallowReactive
}, {
  vm,
  nextTick,
  emit
}) => {
  const state = reactive({
    pool: [],
    totalSize: 0,
    ready: false,
    hoverKey: null,
    simpleArray: computed(() => props.items.length && typeof props.items[0] !== "object"),
    sizes: computed(() => api2.computedSizes()),
    itemIndexByKey: computed(() => api2.computedItemIndexByKey())
  });
  const api2 = {
    state,
    computedSizes: computedSizes({
      props,
      state
    }),
    computedItemIndexByKey: computedItemIndexByKey(props),
    getScroll: getScroll({
      props,
      vm
    }),
    unuseView: unuseView(state),
    addView: addView({
      markRaw,
      shallowReactive
    }),
    sortViews: sortViews(state),
    getListenerTarget: getListenerTarget({
      props,
      vm
    }),
    scrollToPosition: scrollToPosition({
      props,
      vm
    }),
    computeViewStyle: computeViewStyle({
      props,
      state
    }),
    computeViewEvent: computeViewEvent({
      props,
      state
    })
  };
  Object.assign(api2, {
    handleVisibilityChange: handleVisibilityChange({
      api: api2,
      emit,
      state
    }),
    updateVisibleItems: updateVisibleItems({
      api: api2,
      emit,
      props,
      state,
      vm
    }),
    handleScroll: handleScroll({
      api: api2,
      props,
      state
    }),
    handleResize: handleResize({
      api: api2,
      emit,
      state
    }),
    applyPageMode: applyPageMode({
      api: api2,
      props
    }),
    addListeners: addListeners({
      api: api2,
      state
    }),
    removeListeners: removeListeners({
      api: api2,
      state
    }),
    scrollToItem: scrollToItem({
      api: api2,
      props,
      state
    }),
    resetTemporary: resetTemporary({
      state
    }),
    init: init({
      api: api2
    })
  });
  state.temporary = {
    startIndex: 0,
    endIndex: 0,
    views: /* @__PURE__ */new Map(),
    unusedViews: /* @__PURE__ */new Map(),
    scrollDirty: false,
    lastUpdateScrollPosition: 0
  };
  if (props.prerender) {
    state.temporary.prerender = true;
    api2.updateVisibleItems(false);
  }
  checkProps(props);
  onActivated(() => {
    const lastPosition = state.temporary.lastUpdateScrollPosition;
    if (typeof lastPosition === "number") {
      nextTick(() => {
        api2.scrollToPosition(lastPosition);
      });
    }
  });
  onMounted(() => {
    addResizeListener(vm.$el, api2.handleResize);
    api2.applyPageMode();
    nextTick(() => {
      state.temporary.prerender = false;
      api2.updateVisibleItems(true);
      state.ready = true;
    });
  });
  onBeforeUnmount(() => {
    removeResizeListener(vm.$el, api2.handleResize);
    api2.removeListeners();
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