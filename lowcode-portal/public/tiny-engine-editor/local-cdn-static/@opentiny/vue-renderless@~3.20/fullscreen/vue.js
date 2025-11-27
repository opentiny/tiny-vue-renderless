import "../chunk-G2ADBYYC.js";
import sf from './../common/deps/fullscreen/screenfull.js';
import { exit, enter, toggle, request, getState, shadeClick, keypressCallback, fullScreenCallback, onChangeFullScreen, computeWrapperStyle } from './index.js';
const api = ["state", "exit", "enter", "toggle", "request", "getState", "shadeClick", "keypressCallback", "fullScreenCallback", "onChangeFullScreen"];
const renderless = (props, {
  reactive,
  computed,
  watch
}, {
  vm,
  emit
}) => {
  const api2 = {};
  const state = reactive({
    isFullscreen: false,
    isEnabled: false,
    support: computed(() => state.isEnabled),
    // 如果不支持浏览器全屏，改用网页全屏
    isPageOnly: computed(() => props.pageOnly || !sf.isEnabled),
    wrapperStyle: computed(() => api2.computeWrapperStyle())
  });
  Object.assign(api2, {
    state,
    getState: getState(state),
    enter: enter(api2),
    exit: exit({
      state,
      api: api2,
      sf,
      props
    }),
    toggle: toggle({
      state,
      api: api2
    }),
    keypressCallback: keypressCallback(api2),
    shadeClick: shadeClick({
      props,
      vm,
      api: api2
    }),
    request: request({
      props,
      state,
      vm,
      sf,
      api: api2
    }),
    fullScreenCallback: fullScreenCallback({
      state,
      sf,
      api: api2
    }),
    computeWrapperStyle: computeWrapperStyle({
      props,
      state
    }),
    onChangeFullScreen: onChangeFullScreen({
      props,
      state,
      vm,
      emit
    })
  });
  watch(() => props.fullscreen, value => {
    if (value !== state.isFullscreen) {
      value ? api2.request() : api2.exit();
    }
  }, {
    lazy: true
  });
  state.isEnabled = sf.isEnabled;
  return api2;
};
export { api, renderless };