import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
import { on, off } from './../common/deps/dom.js';
import PopupManager from './../common/deps/popup-manager.js';
const startTimer = ({
  api,
  state
}) => () => {
  if (state.duration > 0) {
    state.timer = setTimeout(() => {
      !state.closed && api.close();
    }, state.duration);
  }
};
const clearTimer = state => () => {
  clearTimeout(state.timer);
  state.timer = null;
};
const click = ({
  emit,
  state
}) => () => {
  typeof state.onClick === "function" && (void 0).onClick();
  emit("click", "");
};
const close = ({
  state,
  props
}) => () => {
  if (!props.beforeClose || typeof props.beforeClose === "function" && props.beforeClose()) {
    typeof props.onClose === "function" && props.onClose();
    state.closed = true;
  }
};
const watchClosed = state => value => {
  if (value) {
    state.visible = false;
  }
};
const getTypeClass = constants => state => state.type && constants[state.type.toUpperCase()] ? `icon-${constants[state.type]}` : "";
const getOffsetStyle = state => {
  const side = {};
  side[state.verticalProperty] = `${state.verticalOffset}px`;
  return side;
};
const getZindex = () => PopupManager.nextZIndex();
const getPositionSide = state => state.position.startsWith("top-") ? "top" : "bottom";
const bindKeyDown = ({
  api,
  state
}) => event => {
  if (event.keyCode === KEY_CODE.Delete || event.keyCode === KEY_CODE.Backspace) {
    api.clearTimer();
  } else if (event.keyCode === KEY_CODE.Escape) {
    !state.closed && api.close();
  } else {
    api.startTimer();
  }
};
const bindEvent = ({
  api,
  state
}) => () => {
  if (state.timer) {
    api.clearTimer();
  }
  api.startTimer();
  on(document, "keydown", api.bindKeyDown);
};
const unBindEvent = api => () => off(document, "keydown", api.bindKeyDown);
export { bindEvent, bindKeyDown, clearTimer, click, close, getOffsetStyle, getPositionSide, getTypeClass, getZindex, startTimer, unBindEvent, watchClosed };