import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
const PULL_UP_TIME_OUT = 300;
const initPullRefresh = ({
  t,
  props,
  state
}) => () => {
  var _a, _b, _c;
  const defaultOption = {
    pullingUpText: t("ui.pullRefresh.pullingUp"),
    pullingDownText: t("ui.pullRefresh.pullingDown"),
    pullUpDisabled: false,
    pullDownDisabled: false,
    headHeight: 48
  };
  state.pullUp = __spreadValues(__spreadValues({}, defaultOption), props.pullUp);
  state.pullDown = __spreadValues(__spreadValues({}, defaultOption), props.pullDown);
  state.loosingText = (_a = props.loosingText) != null ? _a : t("ui.pullRefresh.loosing");
  state.successText = (_b = props.successText) != null ? _b : t("ui.pullRefresh.success");
  state.failedText = (_c = props.failedText) != null ? _c : t("ui.pullRefresh.failed");
};
const onTouchstart = state => event => {
  state.draggposition = event.touches[0].clientY;
};
const onTouchmove = ({
  state,
  refs
}) => event => {
  if (event.touches[0].clientY > state.draggposition) {
    pullDownTouchMove(state, refs, event);
  }
};
const pullDownTouchMove = (state, refs, event) => {
  if (state.disabledPullDown || state.pullDownLoading) {
    return;
  }
  if (refs.content.scrollTop <= 0 && window.scrollY <= 0 && event.cancelable) {
    event.preventDefault();
    state.translate3d = (event.touches[0].clientY - state.draggposition) / 2;
    state.pullDownReplaces = Math.abs(state.translate3d) > state.pullDown.headHeight ? state.loosingText : state.pullDown.pullingDownText;
  }
  state.animationDuration = 0;
};
const onTouchend = ({
  api,
  props,
  state,
  emit,
  refs
}) => event => {
  state.animationDuration = props.animationDuration;
  if (event.changedTouches[0].clientY < state.draggposition) {
    pullUpTouchEnd(state, emit, refs);
  } else {
    pullDownTouchEnd(api, state, emit);
  }
};
const pullDownTouchEnd = (api, state, emit) => {
  if (Math.abs(state.translate3d) < state.pullDown.headHeight) {
    state.pullDownLoading = false;
    api.clearPullRefresh();
    return;
  }
  state.translate3d = state.pullDown.headHeight;
  state.pullDownLoading = true;
  emit("update:modelValue", true);
  emit("pullDown");
};
const pullUpTouchEnd = (state, emit, refs) => {
  clearTimeout(state.timer);
  state.timer = setTimeout(() => {
    const footNode = refs.foot;
    if (!state.hasMore || !footNode) {
      return;
    }
    const contentNode = refs.content;
    const bottomDis = footNode.offsetTop + footNode.clientHeight - contentNode.scrollTop - contentNode.clientHeight;
    if (bottomDis <= state.pullUpDistance) {
      state.pullUpLoading = true;
      emit("update:modelValue", true);
      emit("pullUp");
    }
  }, PULL_UP_TIME_OUT);
};
const onScroll = ({
  state,
  emit,
  refs
}) => () => {
  pullUpTouchEnd(state, emit, refs);
};
const mountedHandler = ({
  api,
  refs
}) => () => {
  const track = refs.track;
  on(track, "touchstart", api.onTouchstart);
  on(track, "touchmove", api.onTouchmove);
  on(track, "touchend", api.onTouchend);
  on(track, "scroll", api.onScroll);
};
const beforeUnmountHandler = ({
  api,
  refs
}) => () => {
  const track = refs.track;
  off(track, "touchstart", api.onTouchstart);
  off(track, "touchmove", api.onTouchmove);
  off(track, "touchend", api.onTouchend);
  off(track, "scroll", api.onScroll);
};
const handlerModelValue = ({
  api,
  state
}) => (value, result) => {
  state.pullUpLoading = false;
  state.pullDownLoading = false;
  if (value === "down") {
    state.pullDownReplaces = state[`${result}Text`];
  } else {
    state.pullUpStateText = state[`${result}Text`];
  }
  setTimeout(() => {
    api.clearPullRefresh();
  }, state.successDuration);
};
const clearPullRefresh = state => () => {
  state.translate3d = 0;
  state.pullDownReplaces = "";
  state.pullDownLoading = false;
  state.pullUpLoading = false;
};
export { beforeUnmountHandler, clearPullRefresh, handlerModelValue, initPullRefresh, mountedHandler, onScroll, onTouchend, onTouchmove, onTouchstart, pullDownTouchEnd, pullDownTouchMove, pullUpTouchEnd };