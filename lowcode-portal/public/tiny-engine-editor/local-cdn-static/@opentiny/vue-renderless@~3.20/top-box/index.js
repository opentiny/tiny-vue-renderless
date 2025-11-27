import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
import { on, off } from './../common/deps/dom.js';
import PopupManager from './../common/deps/popup-manager.js';
const handleAfterLeave = api => () => api.destroy();
const destroy = parent => () => {
  parent.$el.parentNode.removeChild(parent.$el);
};
const bindKeyDown = ({
  api,
  state
}) => event => {
  if (event.keyCode === KEY_CODE.Escape) {
    !state.closed && api.close();
  }
};
const bindEvent = ({
  api
}) => () => on(document, "keydown", api.bindKeyDown);
const unBindEvent = ({
  api
}) => () => off(document, "keydown", api.bindKeyDown);
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
const clearTimer = state => () => clearTimeout(state.timer);
const close = state => () => {
  state.closed = true;
  typeof state.onClose === "function" && state.onClose(state);
};
const watchClosed = ({
  state
}) => value => value && (state.visible = false);
const getZindex = () => PopupManager.nextZIndex();
const getTypeClass = ({
  constants,
  state
}) => () => {
  const typeClass = constants[(state.type || "").toUpperCase()];
  return state.type && !state.iconClass && typeClass ? `${typeClass}` : "";
};
const getOffsetStyle = ({
  state
}) => () => ({
  top: `${state.verticalOffset}px`
});
export { bindEvent, bindKeyDown, clearTimer, close, destroy, getOffsetStyle, getTypeClass, getZindex, handleAfterLeave, startTimer, unBindEvent, watchClosed };