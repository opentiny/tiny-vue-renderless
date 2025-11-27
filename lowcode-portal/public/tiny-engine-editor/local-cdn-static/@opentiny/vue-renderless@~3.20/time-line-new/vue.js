import "../chunk-G2ADBYYC.js";
import { handleClick, changeStatus, getStatusCls, getStatus, computedData, getDate, computedCurrent, computedIsReverse, computedStackNodes } from './index.js';
const api = ["state", "handleClick", "getStatusCls", "getStatus", "getDate", "changeStatus"];
const renderless = (props, {
  computed,
  reactive
}, {
  t,
  emit,
  constants
}) => {
  const api2 = {};
  const state = reactive({
    nodes: computed(() => api2.computedData()),
    stackNodes: computed(() => state.showAll ? state.nodes : api2.computedStackNodes()),
    current: computed(() => api2.computedCurrent()),
    isReverse: computed(() => api2.computedIsReverse()),
    showData: false,
    showAll: false
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
    getStatus: getStatus({
      state,
      t
    }),
    handleClick: handleClick({
      emit,
      state,
      api: api2
    }),
    getStatusCls: getStatusCls({
      constants,
      props,
      state
    }),
    computedStackNodes: computedStackNodes({
      state,
      props
    }),
    changeStatus: changeStatus({
      state
    })
  });
  return api2;
};
export { api, renderless };