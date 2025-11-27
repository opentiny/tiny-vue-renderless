import "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import { addClass, removeClass } from './../common/deps/dom.js';
const computedWidth = ({
  state,
  designConfig,
  props,
  constants
}) => () => {
  var _a;
  if (state.width) {
    return state.width + "px";
  }
  return props.width || ((_a = designConfig == null ? void 0 : designConfig.constants) == null ? void 0 : _a.DEFAULT_WIDTH) || constants.DEFAULT_WIDTH;
};
const computedHeight = ({
  state,
  designConfig,
  props,
  constants
}) => () => {
  var _a;
  if (state.height) {
    return state.height + "px";
  }
  return props.height || ((_a = designConfig == null ? void 0 : designConfig.constants) == null ? void 0 : _a.DEFAULT_HEIGHT) || constants.DEFAULT_HEIGHT;
};
const close = ({
  api
}) => (force = true) => {
  api.handleClose("close", typeof force === "boolean" ? force : false);
};
const watchVisible = ({
  state,
  api
}) => value => {
  value ? api.open() : api.close();
};
const open = ({
  state,
  emit,
  vm
}) => () => {
  if (!state.visible) {
    setTimeout(() => {
      state.visible = true;
      emit("open", vm);
      emit("update:visible", true);
    }, 0);
  }
};
const confirm = ({
  api
}) => () => {
  api.handleClose("confirm");
};
const handleClose = ({
  emit,
  props,
  state
}) => (type, force) => {
  const isMaskNotClosable = type === "mask" && !props.maskClosable;
  const isBlockClose = !force && typeof props.beforeClose === "function" && props.beforeClose(type) === false;
  if (isMaskNotClosable || isBlockClose) {
    return;
  }
  if (state.visible) {
    state.visible = false;
    setTimeout(() => {
      emit("update:visible", false);
      emit(["close", "confirm"].includes(type) ? type : "close");
    }, 200);
  }
};
const mousedown = ({
  state,
  vm
}) => event => {
  event.preventDefault();
  const touch = event.touches ? event.touches[0] : event;
  const drawerBox = vm.$refs.drawerBox;
  state.dragEvent.isDrag = true;
  state.dragEvent.x = touch.clientX;
  state.dragEvent.y = touch.clientY;
  state.dragEvent.offsetWidth = drawerBox.offsetWidth;
  state.dragEvent.offsetHeight = drawerBox.offsetHeight;
};
const mousemove = ({
  state,
  props,
  emit
}) => debounce(1, event => {
  if (!state.dragEvent.isDrag) {
    return;
  }
  event.preventDefault();
  const {
    placement
  } = props;
  const {
    dragEvent: {
      x,
      y,
      offsetWidth,
      offsetHeight
    }
  } = state;
  const {
    touches,
    targetTouches,
    changedTouches
  } = event;
  const touch = touches && touches[0] || targetTouches && targetTouches[0] || changedTouches && changedTouches[0];
  const {
    clientX,
    clientY
  } = touch || event;
  const offsetX = clientX - x;
  const offsetY = clientY - y;
  if (placement === "left") {
    state.width = offsetWidth + offsetX;
  } else if (placement === "right") {
    state.width = offsetWidth - offsetX;
  } else if (placement === "top") {
    const height = offsetHeight + offsetY;
    state.height = height > 10 ? height : 10;
  } else if (placement === "bottom") {
    const height = offsetHeight - offsetY;
    state.height = height > 10 ? height : 10;
  }
  emit("drag", {
    width: state.width,
    height: state.height
  });
});
const mouseup = ({
  state
}) => event => {
  if (!state.dragEvent.isDrag) {
    return;
  }
  event.preventDefault();
  state.dragEvent.isDrag = false;
};
const addDragEvent = ({
  api,
  vm
}) => () => {
  const el = vm.$refs.dragBar;
  el.addEventListener("mousedown", api.mousedown);
  document.addEventListener("mousemove", api.mousemove);
  document.addEventListener("mouseup", api.mouseup);
  el.addEventListener("touchstart", api.mousedown);
  el.addEventListener("touchmove", api.mousemove);
  el.addEventListener("touchend", api.mouseup);
};
const removeDragEvent = ({
  api,
  vm
}) => () => {
  const el = vm.$refs.dragBar;
  el.removeEventListener("mousedown", api.mousedown);
  document.removeEventListener("mousemove", api.mousemove);
  document.removeEventListener("mouseup", api.mouseup);
  el.removeEventListener("touchstart", api.mousedown);
  el.removeEventListener("touchmove", api.mousemove);
  el.removeEventListener("touchend", api.mouseup);
};
const showScrollbar = lockScrollClass => () => {
  addClass(document.body, lockScrollClass);
};
const hideScrollbar = lockScrollClass => () => {
  removeClass(document.body, lockScrollClass);
};
export { addDragEvent, close, computedHeight, computedWidth, confirm, handleClose, hideScrollbar, mousedown, mousemove, mouseup, open, removeDragEvent, showScrollbar, watchVisible };