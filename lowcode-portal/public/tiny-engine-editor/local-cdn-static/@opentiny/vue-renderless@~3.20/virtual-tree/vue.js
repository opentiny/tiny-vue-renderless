import "../chunk-G2ADBYYC.js";
import { computeState, shouldRender, onVsBoxChange, onTreeChange, getTreeInstance, keepExpandStatus, keepScrollTop, refresh } from './index.js';
const api = ["state", "onVsBoxChange", "onTreeChange", "getTreeInstance", "keepExpandStatus", "keepScrollTop", "refresh"];
const renderless = (props, {
  reactive,
  watch,
  provide
}, {
  nextTick,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    expandeds: [],
    treeOptions: {},
    treeEvents: {},
    vsBoxOptions: {},
    renderRows: [],
    treeStyle: {}
  });
  Object.assign(api2, {
    state,
    computeState: computeState({
      props,
      state
    }),
    shouldRender: shouldRender(state),
    onVsBoxChange: onVsBoxChange({
      props,
      state
    }),
    onTreeChange: onTreeChange({
      nextTick,
      props,
      state,
      vm
    }),
    getTreeInstance: getTreeInstance(vm),
    keepExpandStatus: keepExpandStatus(state),
    keepScrollTop: keepScrollTop(state),
    refresh: refresh({
      api: api2,
      state,
      vm
    })
  });
  provide("TreeAdapter", {
    shouldRender: api2.shouldRender
  });
  watch(() => props.treeOp.data, () => api2.refresh(), {
    immediate: true
  });
  return api2;
};
export { api, renderless };