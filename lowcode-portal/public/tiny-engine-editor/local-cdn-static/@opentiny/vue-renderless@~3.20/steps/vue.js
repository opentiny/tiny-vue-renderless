import "../chunk-G2ADBYYC.js";
import { updateStartIndex, isVisibleHandler, computedRightNodePos, computedSpace, handleMouseenter, handleMouseleave } from './index.js';
const api = ["state", "isVisibleHandler", "handleMouseenter", "handleMouseleave"];
const renderless = (props, {
  reactive,
  watch,
  computed
}, {
  vm
}) => {
  const state = reactive({
    startIndex: 0,
    popoverVisible: false,
    popoverContent: "",
    popoverPlacement: "top",
    endIndex: computed(() => state.startIndex + props.visibleNum),
    rightNodePositions: computed(() => api2.computedRightNodePos()),
    computedSpace: computed(() => computedSpace({
      props
    }))
  });
  const api2 = {
    state,
    updateStartIndex: updateStartIndex({
      state,
      props
    }),
    isVisibleHandler: isVisibleHandler({
      state,
      props
    }),
    handleMouseenter: handleMouseenter({
      state,
      vm
    }),
    handleMouseleave: handleMouseleave(state),
    computedRightNodePos: computedRightNodePos({
      state,
      props
    })
  };
  watch(() => props.active, api2.updateStartIndex, {
    immediate: true
  });
  return api2;
};
export { api, renderless };