import "../chunk-G2ADBYYC.js";
import { computedItemsWithSize, onScrollerResize, onScrollerVisible, forceUpdate, prepareProvide, watchItemsWithSize, scrollToItem, getItemSize, scrollToBottom } from './index.js';
const api = ["state", "onScrollerResize", "onScrollerVisible", "forceUpdate", "scrollToItem", "getItemSize", "scrollToBottom"];
const addWatchers = ({
  watch,
  props,
  api: api2,
  state
}) => {
  watch(() => props.items, () => api2.forceUpdate());
  watch(() => state.simpleArray, value => state.vscrollData.simpleArray = value, {
    immediate: true
  });
  watch(() => props.direction, value => api2.forceUpdate(value));
  watch(() => props.itemsWithSize, (next, prev) => api2.watchItemsWithSize(next, prev));
};
const renderless = (props, {
  reactive,
  computed,
  onActivated,
  onDeactivated,
  watch,
  provide,
  toRef,
  toRefs
}, {
  vm,
  nextTick,
  emit
}, {
  emitter
}) => {
  const state = reactive({
    simpleArray: computed(() => props.items.length && typeof props.items[0] !== "object"),
    itemsWithSize: computed(() => api2.computedItemsWithSize()),
    vscrollData: {
      active: true,
      sizes: {},
      keyField: props.keyField,
      simpleArray: false
    }
  });
  const api2 = {
    state,
    computedItemsWithSize: computedItemsWithSize({
      props,
      state
    }),
    onScrollerVisible: onScrollerVisible({
      emit,
      state
    }),
    forceUpdate: forceUpdate(state),
    watchItemsWithSize: watchItemsWithSize({
      props,
      vm
    }),
    scrollToItem: scrollToItem(vm),
    getItemSize: getItemSize({
      props,
      state
    }),
    scrollToBottom: scrollToBottom({
      state,
      vm,
      nextTick
    })
  };
  Object.assign(api2, {
    onScrollerResize: onScrollerResize({
      api: api2,
      emit,
      vm
    })
  });
  state.temporary = {
    updates: [],
    undefinedSizes: 0,
    undefinedMap: {},
    events: emitter(),
    resizeObserver: null
  };
  prepareProvide(state);
  provide("vscrollData", toRef(state, "vscrollData"));
  provide("vscrollParent", {
    props: toRefs(props),
    state: toRefs(state)
  });
  provide("vscrollResizeObserver", state.temporary.resizeObserver);
  onActivated(() => {
    state.vscrollData.active = true;
  });
  onDeactivated(() => {
    state.vscrollData.active = false;
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