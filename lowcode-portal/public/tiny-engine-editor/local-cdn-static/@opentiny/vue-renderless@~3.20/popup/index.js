import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
import { touchStart, touchMove } from './../common/deps/touch.js';
import { getScroller } from './../dropdown-menu/index.js';
import { isNull } from './../common/type.js';
const getStyle = props => () => {
  const style = __spreadValues({}, props.popupStyle);
  if (!isNull(props.duration)) {
    const key = props.position === "center" ? "animationDuration" : "transitionDuration";
    style[key] = `${props.duration}s`;
  }
  return style;
};
const watchValue = api => value => {
  const type = value ? "open" : "close";
  api[type]();
};
const open = ({
  api,
  constants,
  emit,
  props,
  state
}) => () => {
  if (state.opened) {
    return;
  }
  if (props.zIndex !== void 0) {
    state.context.zIndex = props.zIndex;
  }
  api.renderOverlay();
  state.opened = true;
  emit("open");
  if (props.lockScroll) {
    on(document, "touchstart", touchStart);
    on(document, "touchmove", api.onTouchMove);
    if (!state.context.lockCount) {
      document.body.classList.add(constants.OVERFLOWHIDDEN);
    }
    state.context.lockCount++;
  }
};
const close = ({
  api,
  constants,
  emit,
  props,
  state
}) => () => {
  if (!state.opened) {
    return;
  }
  if (props.lockScroll) {
    state.context.lockCount--;
    off(document, "touchstart", touchStart);
    off(document, "touchmove", api.onTouchMove);
    if (!state.context.lockCount) {
      document.body.classList.remove(constants.OVERFLOWHIDDEN);
    }
  }
  state.opened = false;
  emit("update:modelValue", false);
  emit("close");
};
const onTouchMove = ({
  vm,
  state
}) => event => {
  touchMove(event);
  const direction = state.deltaY > 0 ? "10" : "01";
  const el = getScroller()(event.target, vm.$refs.$el);
  const {
    scrollHeight,
    offsetHeight,
    scrollTop
  } = el;
  let status = "11";
  if (scrollTop === 0) {
    status = offsetHeight >= scrollHeight ? "00" : "01";
  } else if (scrollTop + offsetHeight >= scrollHeight) {
    status = "10";
  }
  if (status !== "11" && state.direction === "vertical" && !(parseInt(status, 2) & parseInt(direction, 2))) {
    event.preventDefault();
  }
};
const renderOverlay = ({
  api,
  nextTick,
  props,
  state
}) => () => {
  if (!props.modelValue) {
    return;
  }
  nextTick(() => {
    api.updateZIndex(props.overlay ? 1 : 0);
    if (props.overlay) {
      state.zIndex = state.context.zIndex++;
    }
  });
};
const updateZIndex = ({
  vm,
  state
}) => (value = 0) => vm.$refs.popup.style.zIndex = ++state.context.zIndex + value;
const clickOverlay = ({
  api,
  props,
  emit
}) => () => {
  if (props.closeOnClickOverlay) {
    api.close();
    emit("click-overlay");
  }
};
const closed = emit => () => emit("closed");
const opened = emit => () => emit("opened");
export { clickOverlay, close, closed, getStyle, onTouchMove, open, opened, renderOverlay, updateZIndex, watchValue };