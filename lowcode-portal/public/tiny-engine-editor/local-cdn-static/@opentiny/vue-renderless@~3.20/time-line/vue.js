import "../chunk-G2ADBYYC.js";
import { handleClick, getStatusCls, getStatus, computedData, getDate, computedCurrent, computedIsReverse, changeStatus, computedStackNodes, computedSpace, computedWrapperClass, toggleFold } from './index.js';
const api = ["state", "handleClick", "getStatusCls", "getStatus", "getDate", "changeStatus", "toggleFold"];
const renderless = (props, {
  computed,
  reactive,
  provide,
  watch
}, {
  t,
  emit,
  constants
}) => {
  const api2 = {};
  const state = reactive({
    // 当标签式使用时，记录有多少个 item 的标签
    itemsArray: [],
    nodes: computed(() => api2.computedData()),
    current: computed(() => api2.computedCurrent()),
    isReverse: computed(() => api2.computedIsReverse()),
    stackNodes: computed(() => state.showAll ? state.nodes : api2.computedStackNodes()),
    computedSpace: computed(() => api2.computedSpace()),
    showData: false,
    showAll: false,
    computedWrapperClass: computed(() => api2.computedWrapperClass())
  });
  Object.assign(api2, {
    state,
    getDate,
    computedData: computedData({
      props,
      state
    }),
    computedCurrent: computedCurrent({
      props,
      state
    }),
    computedIsReverse: computedIsReverse(props),
    computedSpace: computedSpace({
      props
    }),
    getStatus: getStatus({
      state,
      t
    }),
    handleClick: handleClick({
      emit,
      state
    }),
    getStatusCls: getStatusCls({
      constants,
      state
    }),
    computedStackNodes: computedStackNodes({
      state,
      props
    }),
    changeStatus: changeStatus({
      state
    }),
    computedWrapperClass: computedWrapperClass({
      props
    }),
    toggleFold: toggleFold({
      props
    })
  });
  provide("nodesInject", {
    state,
    props
  });
  return api2;
};
export { api, renderless };