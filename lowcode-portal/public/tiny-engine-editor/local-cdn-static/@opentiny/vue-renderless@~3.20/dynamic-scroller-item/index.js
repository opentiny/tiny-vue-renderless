import "../chunk-G2ADBYYC.js";
const computedId = ({ props, state }) => () => {
  if (state.vscrollData.simpleArray)
    return props.index;
  if (Object.prototype.hasOwnProperty.call(props.item, state.vscrollData.keyField)) {
    return props.item[state.vscrollData.keyField];
  }
  throw new Error(`[TINY Error][DynamicScrollerItem] keyField '${state.vscrollData.keyField}' not found in your item`);
};
const computedSize = (state) => () => state.vscrollData.sizes[state.id] || 0;
const computedFinalActive = ({ props, state }) => () => props.active && state.vscrollData.active;
const updateWatchData = ({ api, props, state, watch }) => () => {
  if (props.watchData && !state.temporary.watchData) {
    state.temporary.watchData = watch(props.item, api.onDataUpdate, { deep: true });
  } else if (state.temporary.watchData) {
    state.temporary.watchData();
    state.temporary.watchData = null;
  }
};
const watchId = ({ api, state, vm }) => (value, oldValue) => {
  vm.$el._id = state.id;
  if (!state.size) {
    api.onDataUpdate();
  }
  if (state.temporary.sizeObserved) {
    const oldSize = state.vscrollData.sizes[oldValue];
    const size = state.vscrollData.sizes[value];
    if (oldSize !== null && oldSize !== size) {
      api.applySize(oldSize);
    }
  }
};
const onDataUpdate = (api) => () => {
  api.updateSize();
};
const updateSize = ({ api, state }) => () => {
  if (state.finalActive) {
    if (state.temporary.pendingSizeUpdate !== state.id) {
      state.temporary.pendingSizeUpdate = state.id;
      state.temporary.forceNextVScrollUpdate = null;
      state.temporary.pendingVScrollUpdate = null;
      api.computeSize(state.id);
    }
  } else {
    state.temporary.forceNextVScrollUpdate = state.id;
  }
};
const computeSize = ({ api, nextTick, state, vm }) => (id) => {
  nextTick(() => {
    if (state.id === id) {
      const width = vm.$el.offsetWidth;
      const height = vm.$el.offsetHeight;
      api.applyWidthHeight(width, height);
    }
    state.temporary.pendingSizeUpdate = null;
  });
};
const applyWidthHeight = ({ api, state }) => (width, height) => {
  const size = ~~(state.vscrollParent.props.direction === "vertical" ? height : width);
  if (size && state.size !== size) {
    api.applySize(size);
  }
};
const applySize = ({ emit, props, state, vm }) => (size) => {
  const { vscrollParent } = state;
  if (vscrollParent.state.temporary.undefinedMap[state.id]) {
    vscrollParent.state.temporary.undefinedSizes--;
    vscrollParent.state.temporary.undefinedMap[state.id] = void 0;
  }
  vm.$set(state.vscrollData.sizes, state.id, size);
  if (props.emitResize)
    emit("resize", state.id);
};
const watchFinalActive = ({ api, state }) => (value) => {
  if (!state.size) {
    const { vscrollParent } = state;
    if (value) {
      if (!vscrollParent.state.temporary.undefinedMap[state.id]) {
        vscrollParent.state.temporary.undefinedSizes++;
        vscrollParent.state.temporary.undefinedMap[state.id] = true;
      }
    } else {
      if (vscrollParent.state.temporary.undefinedMap[state.id]) {
        vscrollParent.state.temporary.undefinedSizes--;
        vscrollParent.state.temporary.undefinedMap[state.id] = false;
      }
    }
  }
  if (state.vscrollResizeObserver) {
    if (value) {
      api.observeSize();
    } else {
      api.unobserveSize();
    }
  } else if (value && state.temporary.pendingVScrollUpdate === state.id) {
    api.updateSize();
  }
};
const observeSize = ({ api, state, vm }) => () => {
  if (!state.vscrollResizeObserver)
    return;
  if (state.temporary.sizeObserved)
    return;
  state.vscrollResizeObserver.observe(vm.$el);
  vm.$el._id = state.id;
  vm.$el._onResize = api.onResize;
  state.temporary.sizeObserved = true;
};
const onResize = ({ api, state }) => (id, width, height) => {
  if (state.id === id) {
    api.applyWidthHeight(width, height);
  }
};
const unobserveSize = ({ state, vm }) => () => {
  if (!state.vscrollResizeObserver)
    return;
  if (!state.temporary.sizeObserved)
    return;
  state.vscrollResizeObserver.unobserve(vm.$el);
  vm.$el._onResize = void 0;
  state.temporary.sizeObserved = false;
};
const onVscrollUpdate = ({ api, state }) => ({ force }) => {
  if (!state.finalActive && force) {
    state.temporary.pendingVScrollUpdate = state.id;
  }
  if (state.temporary.forceNextVScrollUpdate === state.id || force || !state.size) {
    api.updateSize();
  }
};
export {
  applySize,
  applyWidthHeight,
  computeSize,
  computedFinalActive,
  computedId,
  computedSize,
  observeSize,
  onDataUpdate,
  onResize,
  onVscrollUpdate,
  unobserveSize,
  updateSize,
  updateWatchData,
  watchFinalActive,
  watchId
};
