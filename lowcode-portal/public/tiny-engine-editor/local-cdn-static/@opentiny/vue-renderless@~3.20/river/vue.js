import "../chunk-G2ADBYYC.js";
import { buildOption, getRenderNode, getRenderLink, getRenderIcon, getRenderLege, getTooltip, getMarkLine, setChartOption, setListeners, setRiverRgbaOpacity, lightUp, setRiverIconStyle, style, computeCanvasStyle, getContainerWidth, resizeListener } from './index.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
const api = ["state", "lightUp", "style"];
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  reactive
}, {
  vm,
  emit,
  parent
}, {
  echarts
}) => {
  const state = reactive({
    myChart: null,
    markLineShow: false,
    lighting: [],
    nameInfo: null,
    styling: [],
    option: null,
    canvasStyle: computed(() => api2.computeCanvasStyle()),
    canvasWidth: null,
    canvasTransformOrigin: "left top",
    canvasTransform: null
  });
  const api2 = {
    state,
    getRenderLege: getRenderLege(),
    getTooltip: getTooltip(),
    getMarkLine: getMarkLine(),
    setChartOption: setChartOption(state),
    setRiverRgbaOpacity: setRiverRgbaOpacity({
      props,
      state
    }),
    setRiverIconStyle: setRiverIconStyle(state),
    computeCanvasStyle: computeCanvasStyle({
      props,
      state
    }),
    getContainerWidth: getContainerWidth(state),
    resizeListener: resizeListener({
      props,
      state
    })
  };
  Object.assign(api2, {
    buildOption: buildOption({
      api: api2,
      emit,
      props,
      state,
      vm
    }),
    getRenderNode: getRenderNode({
      api: api2,
      echarts
    }),
    getRenderLink: getRenderLink({
      api: api2,
      echarts
    }),
    getRenderIcon: getRenderIcon({
      api: api2
    }),
    setListeners: setListeners({
      api: api2,
      emit,
      state
    }),
    lightUp: lightUp({
      api: api2,
      state
    }),
    style: style({
      api: api2,
      state
    })
  });
  onMounted(() => {
    state.myChart = echarts.init(vm.$el);
    state.containerEl = parent.$parent.$el;
    const option = state.option = api2.buildOption();
    api2.setChartOption(option);
    api2.setListeners(option);
    state.containerEl && addResizeListener(state.containerEl, api2.resizeListener);
  });
  onBeforeUnmount(() => {
    state.myChart.off("mousemove");
    state.myChart.getZr().off("mousemove");
    state.myChart.off("click");
    state.myChart = null;
    state.containerEl && removeResizeListener(state.containerEl, api2.resizeListener);
    state.containerEl = null;
  });
  return api2;
};
export { api, renderless };