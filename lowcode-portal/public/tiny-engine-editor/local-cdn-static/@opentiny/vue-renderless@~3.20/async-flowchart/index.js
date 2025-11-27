import "../chunk-G2ADBYYC.js";
import ResizeObserver from './../common/deps/ResizeObserver.js';
const observeContainerSize = ({
  nextTick,
  vm,
  state
}) => () => {
  nextTick(() => {
    const observedElement = vm.$el;
    if (observedElement) {
      state.temporary.observer = new ResizeObserver(() => {
        window.requestAnimationFrame(() => {
          var _a;
          if (vm.$refs.chart) {
            vm.$refs.chart.refresh({
              graphWidth: observedElement.offsetWidth,
              adjustX: -(((_a = state == null ? void 0 : state.config) == null ? void 0 : _a.nodeWrapperSize) || 0) / 2
            });
          }
        });
      });
      state.temporary.observer.observe(observedElement);
      state.temporary.observed = observedElement;
    }
  });
};
const unobserveContainerSize = state => () => {
  if (state.temporary.observer) {
    state.temporary.observer.unobserve(state.temporary.observed);
    state.temporary.observer.disconnect();
    state.temporary.observer = null;
    state.temporary.observed = null;
  }
};
const fetchData = ({
  Loading,
  props,
  state,
  vm,
  markRaw,
  api,
  nextTick
}) => () => {
  if (typeof props.fetch === "function") {
    api.unobserveContainerSize();
    state.loading = true;
    state.temporary.loadingInstance = Loading.service({
      target: vm.$el
    });
    state.temporary.final = true;
    const onFinally = () => {
      if (state.temporary.final) {
        state.temporary.final = false;
        state.temporary.loadingInstance.close();
        state.loading = false;
        nextTick(() => api.observeContainerSize());
      }
    };
    props.fetch().then(({
      data,
      config
    }) => {
      if (data) {
        state.data = markRaw(data);
        state.config = markRaw(config);
      }
    }).then(onFinally).catch(onFinally);
  }
};
const handleClickNode = emit => (afterNode, e) => emit("click-node", afterNode, e);
const handleClickLink = emit => (afterLink, e) => emit("click-link", afterLink, e);
const handleClickBlank = emit => (param, e) => emit("click-blank", param, e);
const handleClickGroup = emit => (afterGroup, e) => emit("click-group", afterGroup, e);
const refresh = api => () => api.fetchData();
export { fetchData, handleClickBlank, handleClickGroup, handleClickLink, handleClickNode, observeContainerSize, refresh, unobserveContainerSize };