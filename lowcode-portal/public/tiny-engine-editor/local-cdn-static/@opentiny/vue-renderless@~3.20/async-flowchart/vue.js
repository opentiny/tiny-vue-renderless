import "../chunk-G2ADBYYC.js";
import { observeContainerSize, unobserveContainerSize, fetchData, handleClickNode, handleClickLink, handleClickBlank, handleClickGroup, refresh } from './index.js';
const api = ["state", "handleClickNode", "handleClickLink", "handleClickBlank", "handleClickGroup", "refresh"];
const renderless = (props, {
  reactive,
  onMounted,
  onBeforeUnmount,
  markRaw
}, {
  nextTick,
  vm,
  emit
}, {
  Loading
}) => {
  const state = reactive({
    loading: true,
    data: null,
    config: null
  });
  state.temporary = {};
  const api2 = {
    state,
    observeContainerSize: observeContainerSize({
      nextTick,
      vm,
      state
    }),
    unobserveContainerSize: unobserveContainerSize(state),
    handleClickNode: handleClickNode(emit),
    handleClickLink: handleClickLink(emit),
    handleClickBlank: handleClickBlank(emit),
    handleClickGroup: handleClickGroup(emit)
  };
  Object.assign(api2, {
    fetchData: fetchData({
      Loading,
      props,
      state,
      vm,
      markRaw,
      api: api2,
      nextTick
    }),
    refresh: refresh(api2)
  });
  onMounted(api2.fetchData);
  onBeforeUnmount(() => api2.unobserveContainerSize());
  return api2;
};
export { api, renderless };