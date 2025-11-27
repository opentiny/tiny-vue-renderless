import "../chunk-G2ADBYYC.js";
import { mouseover, mouseout, clickActive, computePx, reRender, arrowClick, overContent, mounted, beforeDestroy, computeLeft, computeData } from './index.js';
const api = ["state", "fall", "arrowClick", "mouseover", "mouseout", "clickActive", "overContent", "reRender", "left"];
const initState = ({
  reactive,
  computed,
  api: api2,
  props
}) => {
  const state = reactive({
    pager: 1,
    level2data: [],
    activeNode: null,
    isActive: props.value,
    pagerData: {
      data: [],
      offset: [],
      index: []
    },
    left: computed(() => api2.computeLeft()),
    data: computed(() => api2.computeData()),
    active: 0
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  fall,
  props,
  refs
}) => {
  Object.assign(api2, {
    fall,
    state,
    computePx: computePx({
      props,
      refs,
      state
    }),
    mounted: mounted({
      api: api2
    }),
    computeLeft: computeLeft({
      state
    }),
    beforeDestroy: beforeDestroy(api2),
    computeData: computeData({
      props
    }),
    arrowClick: arrowClick(state),
    overContent: overContent(state),
    mouseout: mouseout(state),
    mouseover: mouseover({
      props,
      fall,
      state
    }),
    clickActive: clickActive(state),
    reRender: reRender({
      api: api2,
      state
    })
  });
};
const renderless = (props, {
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  ref
}, {
  refs
}) => {
  const api2 = {};
  const fall = ref(null);
  const state = initState({
    reactive,
    computed,
    api: api2,
    props
  });
  initApi({
    api: api2,
    state,
    fall,
    props,
    refs
  });
  onMounted(api2.mounted);
  onBeforeUnmount(api2.beforeDestroy);
  return api2;
};
export { api, renderless };