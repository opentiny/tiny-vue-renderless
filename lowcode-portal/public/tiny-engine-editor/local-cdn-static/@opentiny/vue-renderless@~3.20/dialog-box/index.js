import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { on, off, addClass, removeClass } from './../common/deps/dom.js';
import { emitEvent } from './../common/event.js';
import { getDomNode } from './../common/deps/dom.js';
const computedAnimationName = ({
  constants,
  props
}) => () => props.rightSlide ? constants.DIALOG_SLIDER_RIGHT : constants.DIALOG_FADE;
const computedAddUnit = value => isNaN(Number(value)) ? value : value + "px";
const computedStyle = ({
  props,
  state,
  designConfig
}) => () => {
  var _a;
  let style = {};
  let {
    width,
    top,
    rightSlide,
    maxHeight
  } = props;
  if (top === void 0) {
    top = rightSlide ? "0" : ((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.top) ? "" : "15vh";
  }
  width = computedAddUnit(width);
  top = computedAddUnit(top);
  maxHeight = computedAddUnit(maxHeight);
  if (!state.isFull) {
    style.width = width;
    style.top = state.top || top;
    style.maxHeight = maxHeight;
    if (rightSlide) {
      style.right = 0;
      style.height = "calc(100vh - " + style.top + ")";
    } else {
      style.left = state.left || "calc((100vw - " + width + ") / 2)";
    }
  }
  if (state.dragStyle) {
    style = __spreadValues(__spreadValues({}, style), state.dragStyle);
    if (state.isFull) {
      style = {
        left: "0px",
        top: "0px"
      };
    }
  }
  return style;
};
const watchVisible = ({
  api,
  constants,
  emit,
  nextTick,
  parent,
  props,
  vm,
  state
}) => val => {
  const el = parent.$el;
  if (props.lockScroll) {
    val ? api.showScrollbar() : api.hideScrollbar();
  }
  state.move = false;
  state.isFull = props.fullscreen;
  emit("update:visible", val);
  if (val) {
    state.closed = false;
    emit("open");
    on(el, "scroll", api.updatePopper);
    nextTick(() => {
      vm.$refs.dialog.scrollTop = 0;
    });
    if (props.appendToBody) {
      document.body.appendChild(el);
    }
  } else {
    off(el, "scroll", api.updatePopper);
    if (!state.closed) {
      state.emitter.emit("boxclose", props.isFormReset);
      emit("close");
    }
    if (props.destroyOnClose) {
      nextTick(() => state.key++);
    }
    if (props.rightSlide) {
      const dialogBoxDom = el.querySelector(constants.DIALOG_BOX_CLASS) || el;
      dialogBoxDom.style.left = "";
    }
  }
};
const mounted = ({
  api,
  parent,
  props
}) => () => {
  if (props.lockScroll && props.visible) {
    api.showScrollbar();
  }
  if (props.visible) {
    const el = parent.$el;
    api.open();
    if (props.appendToBody) {
      document.body.appendChild(el);
    }
  }
};
const unMounted = ({
  api,
  parent,
  props
}) => () => {
  const el = parent.$el;
  api.hideScrollbar();
  if (props.appendToBody && el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};
const useMouseEventDown = ({
  state
}) => event => {
  state.mouseDownWrapperFlag = false;
  if (/tiny-dialog-box__wrapper/.test(event.target.className) && event.type === "mousedown") {
    state.mouseDownWrapperFlag = true;
  }
};
const useMouseEventUp = ({
  state
}) => event => {
  state.mouseUpWrapperFlag = false;
  if (/tiny-dialog-box__wrapper/.test(event.target.className) && event.type === "mouseup") {
    state.mouseUpWrapperFlag = true;
  }
};
const handleWrapperClick = ({
  api,
  props,
  state
}) => () => {
  if (!props.closeOnClickModal) {
    return;
  }
  if (state.mouseDownWrapperFlag && state.mouseUpWrapperFlag) {
    api.handleClose("mask");
  }
};
const handleClose = ({
  api,
  constants,
  emit,
  parent,
  props
}) => (type = "close") => {
  if (typeof props.beforeClose === "function" && props.beforeClose(type) === false) {
    return;
  }
  const el = parent.$el;
  if (props.rightSlide) {
    const dialogBoxDom = el.querySelector(constants.DIALOG_BOX_CLASS) || el;
    dialogBoxDom.style.left = "";
  }
  if (!emitEvent(emit, "before-close", api.hide)) {
    return;
  }
  api.hide(type);
};
const hide = ({
  api,
  emit,
  state,
  props
}) => cancel => {
  if (cancel !== false) {
    state.emitter.emit("boxclose", props.isFormReset);
    emit("update:visible", false);
    emit("change", false);
    emit("close", cancel);
    state.closed = true;
    api.hideScrollbar();
  }
};
const handleConfirm = ({
  api,
  emit
}) => () => {
  emit("confirm");
  api.handleClose("confirm");
};
const handleCancel = ({
  api,
  emit
}) => () => {
  emit("cancel");
  api.handleClose("cancel");
};
const updatePopper = ({
  api,
  constants
}) => () => {
  api.broadcast(constants.SELECT_DROPDOWN, "updatePopper");
  api.broadcast(constants.DROPDOWN_MENU, "updatePopper");
};
const afterEnter = emit => () => {
  emit("opened");
};
const afterLeave = emit => () => {
  emit("closed");
};
const findPopoverComponent = ({
  vm,
  componentList
}) => {
  const children = vm.$children;
  if (!children || children.length === 0) {
    return [];
  }
  children.forEach(child => {
    const tag = child.$options.componentName;
    if (tag === "Select") {
      componentList.push(child);
    }
    findPopoverComponent({
      vm: child,
      componentList
    });
  });
  return componentList;
};
const closeAllPopover = parent => {
  findPopoverComponent({
    vm: parent,
    componentList: []
  }).forEach(component => {
    component.state.visible = false;
  });
};
const handleDrag = ({
  parent,
  props,
  state,
  emit,
  vm
}) => event => {
  if (!props.draggable || state.isFull) {
    return;
  }
  let modalBoxElem = vm.$refs.dialog;
  event.preventDefault();
  let demMousemove = document.onmousemove;
  let demMouseup = document.onmouseup;
  let disX = event.clientX - modalBoxElem.offsetLeft;
  let disY = event.clientY - modalBoxElem.offsetTop;
  let {
    visibleHeight,
    visibleWidth
  } = getDomNode();
  document.onmousemove = event2 => {
    event2.preventDefault();
    if (!state.move) {
      emit("drag-start", event2);
      closeAllPopover(parent);
      state.move = true;
    }
    let offsetWidth = modalBoxElem.offsetWidth;
    let offsetHeight = modalBoxElem.offsetHeight;
    let left;
    let top;
    if (!props.dragOutsideWindow) {
      let maxX = Math.max(visibleWidth - offsetWidth, 0);
      let maxY = Math.max(visibleHeight - offsetHeight, 0);
      left = event2.clientX - disX;
      top = event2.clientY - disY;
      left = left < 0 ? 0 : left > maxX ? maxX : left;
      top = top < 0 ? 0 : top > maxY ? maxY : top;
    } else {
      let maxX = visibleWidth - 10;
      let maxY = visibleHeight - 10;
      left = event2.clientX - disX;
      top = event2.clientY - disY;
      left = event2.clientX < 0 ? -disX : left > maxX ? maxX : left;
      top = event2.clientY < 0 ? -disY : top > maxY ? maxY : top;
    }
    if (!state.isFull) {
      state.dragStyle = {
        left: `${left}px`,
        top: `${top}px`
      };
    }
    state.left = `${left}px`;
    state.top = `${top}px`;
    state.emitter.emit("boxdrag");
    emit("drag-move", event2);
  };
  document.onmouseup = () => {
    document.onmousemove = demMousemove;
    document.onmouseup = demMouseup;
    props.draggable && state.move && emit("drag-end", event);
    state.move = false;
  };
};
const showScrollbar = lockScrollClass => () => {
  addClass(document.body, lockScrollClass);
};
const hideScrollbar = lockScrollClass => () => {
  removeClass(document.body, lockScrollClass);
};
const toggleFullScreen = ({
  state,
  emit,
  nextTick,
  vm
}) => isFull => {
  state.isFull = isFull;
  nextTick(() => {
    emit("resize", {
      fullscreen: isFull,
      dialog: vm.$refs.dialog
    });
  });
};
export { afterEnter, afterLeave, computedAddUnit, computedAnimationName, computedStyle, handleCancel, handleClose, handleConfirm, handleDrag, handleWrapperClick, hide, hideScrollbar, mounted, showScrollbar, toggleFullScreen, unMounted, updatePopper, useMouseEventDown, useMouseEventUp, watchVisible };