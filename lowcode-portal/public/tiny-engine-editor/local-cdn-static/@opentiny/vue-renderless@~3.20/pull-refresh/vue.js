import "../chunk-G2ADBYYC.js";
import { mountedHandler, beforeUnmountHandler, handlerModelValue, onTouchstart, onTouchmove, onTouchend, onScroll, initPullRefresh, clearPullRefresh } from './index.js';
const api = ["state"];
const renderless = (props, {
  watch,
  onMounted,
  reactive,
  onBeforeUnmount
}, {
  t,
  refs,
  emit,
  nextTick
}) => {
  const api2 = {};
  const state = reactive({
    pullDownReplaces: "",
    refreshStyle: {},
    translate3d: 0,
    draggposition: 0,
    pullUpLoading: false,
    pullDownLoading: false,
    loosingText: "",
    successText: "",
    failedText: "",
    noMoreText: t("ui.pullRefresh.noMore"),
    pullUpLoadingText: props.pullUpLoadingText,
    pullDownLoadingText: props.pullDownLoadingText,
    pullUp: null,
    pullDown: null,
    hasMore: true,
    successDuration: props.successDuration,
    animationDuration: props.animationDuration,
    disabledPullDown: props.disabledPullDown,
    disabledPullUp: props.disabledPullUp,
    pullUpDistance: typeof props.pullUpDistance === "string" ? Number(props.pullUpDistance) : props.pullUpDistance,
    timer: null
  });
  Object.assign(api2, {
    state,
    onTouchstart: onTouchstart(state),
    onTouchmove: onTouchmove({
      state,
      refs
    }),
    onTouchend: onTouchend({
      api: api2,
      props,
      state,
      emit,
      refs
    }),
    onScroll: onScroll({
      state,
      emit,
      refs
    }),
    mountedHandler: mountedHandler({
      api: api2,
      refs
    }),
    beforeUnmountHandler: beforeUnmountHandler({
      api: api2,
      refs
    }),
    handlerModelValue: handlerModelValue({
      api: api2,
      state
    }),
    initPullRefresh: initPullRefresh({
      t,
      props,
      state
    }),
    clearPullRefresh: clearPullRefresh(state)
  });
  watch(() => props.hasMore, value => {
    state.hasMore = value;
  }, {
    immediate: true
  });
  watch(() => props.modelValue, value => {
    if (!value) {
      api2.clearPullRefresh();
    }
  });
  onMounted(() => {
    api2.mountedHandler({
      api: api2,
      refs,
      state
    });
    api2.initPullRefresh({
      t,
      props,
      state
    });
  });
  onBeforeUnmount(api2.beforeUnmountHandler);
  return api2;
};
export { api, renderless };