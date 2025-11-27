import "../chunk-G2ADBYYC.js";
import { compute, computeMf, isMf, buildAfterNode, buildAfterLink, drawAfterLink, refresh, getAllItem, initDropdowns, getVars, isLinkHover, omitText, buildHoverState, addListeners, removeListeners, setListeners, hitTest, clearHoverAfterLink, clickNode, clearDropdown, antialiasing, getNodeDef, getNode, clickGroup, setAdjustY, runAdjustYTask } from './index.js';
import throttle from './../common/deps/throttle.js';
const api = ["state", "clearHoverAfterLink", "clickNode", "getVars", "omitText", "refresh", "clearDropdown", "clickGroup"];
const renderless = (props, {
  reactive,
  markRaw,
  onMounted,
  onBeforeUnmount,
  provide
}, {
  vm,
  nextTick,
  emit,
  mode
}, {
  emitter
}) => {
  const state = reactive({
    afterData: null,
    refreshKey: 0,
    wrapperStyle: "",
    dropdowns: {}
  });
  state.temporary = {
    graphWidth: 0,
    adjustX: 0,
    emitter: emitter(),
    customLinks: [],
    lastRowAfterNodes: [],
    adjustY: 0
  };
  const api2 = {
    state,
    omitText,
    getVars: getVars(),
    initDropdowns: initDropdowns(),
    buildAfterNode: buildAfterNode(props),
    buildAfterLink: buildAfterLink(),
    isLinkHover: isLinkHover(state),
    clearDropdown: clearDropdown(state),
    getAllItem: getAllItem(props),
    buildHoverState: buildHoverState(props),
    removeListeners: removeListeners({
      state,
      vm
    }),
    isMf: isMf(mode),
    antialiasing: antialiasing(vm),
    getNodeDef: getNodeDef(props),
    clickGroup: clickGroup(emit)
  };
  Object.assign(api2, {
    compute: compute({
      api: api2,
      markRaw,
      props,
      state
    }),
    computeMf: computeMf({
      api: api2,
      markRaw,
      props,
      state
    }),
    drawAfterLink: drawAfterLink({
      api: api2,
      props,
      state,
      vm
    }),
    refresh: refresh({
      api: api2,
      nextTick,
      state
    }),
    addListeners: addListeners({
      api: api2,
      state,
      vm
    }),
    setListeners: setListeners({
      api: api2,
      emit,
      props,
      state,
      vm
    }),
    hitTest: hitTest({
      api: api2,
      state,
      vm
    }),
    clearHoverAfterLink: throttle(10, clearHoverAfterLink({
      api: api2,
      state,
      vm
    })),
    clickNode: clickNode({
      api: api2,
      emit
    }),
    getNode: getNode(api2),
    setAdjustY: setAdjustY({
      api: api2,
      state
    }),
    runAdjustYTask: runAdjustYTask({
      api: api2,
      state
    })
  });
  provide("graphEmitter", state.temporary.emitter);
  provide("graphInstance", {
    setAdjustY: api2.setAdjustY
  });
  if (api2.isMf()) {
    api2.computeMf();
  } else {
    api2.compute();
  }
  onMounted(() => {
    nextTick(() => {
      api2.antialiasing();
      api2.drawAfterLink();
      api2.addListeners();
    });
  });
  onBeforeUnmount(() => {
    api2.removeListeners();
  });
  return api2;
};
export { api, renderless };