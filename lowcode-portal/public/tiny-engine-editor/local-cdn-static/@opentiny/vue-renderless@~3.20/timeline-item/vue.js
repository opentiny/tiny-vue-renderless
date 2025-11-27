import "../chunk-G2ADBYYC.js";
import { handleClick, getStatusCls, computedItemCls, getStatus, getDate, computedCurrent, computedIsReverse, computedWidth, computedItemStyle, computedIconClass } from './index.js';
const api = ["state", "handleClick", "getStatusCls", "getStatus", "getDate", "rootProps"];
const renderless = (props, {
  computed,
  reactive,
  inject,
  onUnmounted
}, {
  t,
  emit,
  constants
}) => {
  const api2 = {};
  const {
    state: rootState,
    props: rootProps
  } = inject("nodesInject");
  if (!rootState.itemsArray.includes(props.node)) {
    rootState.itemsArray.push(props.node);
  }
  onUnmounted(() => {
    if (rootState.itemsArray.includes(props.node)) {
      rootState.itemsArray.splice(rootState.itemsArray.indexOf(props.node), 1);
    }
  });
  const state = reactive({
    nodesLength: computed(() => rootState.nodes.length),
    current: computed(() => api2.computedCurrent()),
    isReverse: computed(() => api2.computedIsReverse()),
    computedSpace: computed(() => api2.computedWidth(props.space || api2.rootProps.space)),
    computedItemCls: computed(() => api2.computedItemCls()),
    computedItemStyle: computed(() => api2.computedItemStyle()),
    computedLineWidth: computed(() => api2.computedWidth(props.lineWidth || api2.rootProps.lineWidth)),
    iconClass: computed(() => api2.computedIconClass())
  });
  Object.assign(api2, {
    state,
    rootProps,
    getDate,
    computedCurrent: computedCurrent({
      state,
      api: api2
    }),
    computedIsReverse: computedIsReverse(api2),
    computedItemCls: computedItemCls({
      props,
      api: api2,
      state
    }),
    computedItemStyle: computedItemStyle({
      props,
      state,
      api: api2
    }),
    computedWidth: computedWidth(),
    getStatus: getStatus({
      state,
      t
    }),
    handleClick: handleClick({
      emit,
      state,
      props
    }),
    getStatusCls: getStatusCls({
      constants,
      state,
      props
    }),
    computedIconClass: computedIconClass({
      props,
      api: api2
    })
  });
  return api2;
};
export { api, renderless };