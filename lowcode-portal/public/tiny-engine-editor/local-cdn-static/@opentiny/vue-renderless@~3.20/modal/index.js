import "../chunk-G2ADBYYC.js";
import { KEY_CODE } from './../common/index.js';
import { on, off, addClass, hasClass, removeClass } from './../common/deps/dom.js';
import PopupManager from './../common/deps/popup-manager.js';
import { getDomNode } from './../common/deps/dom.js';
import { getViewportWindow } from './../common/global.js';
const DragClass = "is__drag";
const emitZoom = ({
  params,
  parent,
  emit,
  event
}) => {
  let {
    $listeners,
    events = {}
  } = parent;
  if ($listeners.zoom) {
    emit("zoom", params, event);
  } else if (events.zoom) {
    events.zoom.call(parent, params, event);
  }
};
const MsgQueue = [];
const computedIsMsg = () => props => props.type === "message";
const computedBoxStyle = ({
  props,
  isMobileFirstMode
}) => () => {
  if (isMobileFirstMode) {
    return {};
  }
  let width = "";
  let height = "";
  if (props.width) {
    width = isNaN(props.width) ? props.width : `${props.width}px`;
  }
  if (props.height) {
    height = isNaN(props.height) ? props.height : `${props.height}px`;
  }
  return {
    width,
    height
  };
};
const watchValue = api => visible => visible ? api.open() : api.close("hide");
const watchVisible = ({
  api,
  props
}) => visible => {
  if (props.lockScroll) {
    visible ? api.showScrollbar() : api.hideScrollbar();
  }
};
const created = ({
  api,
  props,
  state
}) => () => {
  if (props.modelValue) {
    api.open();
  }
  state.modalZindex = props.zIndex || PopupManager.nextZIndex();
};
const mounted = ({
  api,
  parent,
  props,
  isMobileFirstMode,
  state
}) => () => {
  if (!isMobileFirstMode) {
    let modalBoxElem = api.getBox();
    Object.assign(modalBoxElem.style, {
      width: props.width ? isNaN(props.width) ? props.width : `${props.width}px` : null,
      height: props.height ? isNaN(props.height) ? props.height : `${props.height}px` : null
    });
    if (props.lockScroll && state.visible) {
      api.showScrollbar();
    }
  } else {
    on(window, "resize", api.resetDragStyle);
  }
  if (props.escClosable) {
    on(document, "keydown", api.handleGlobalKeydownEvent);
  }
  on(window, "hashchange", api.handleHashChange);
  document.body.appendChild(parent.$el);
};
const beforeUnmouted = ({
  api,
  parent,
  isMobileFirstMode
}) => () => {
  isMobileFirstMode && off(window, "resize", api.resetDragStyle);
  off(document, "keydown", api.handleGlobalKeydownEvent);
  off(window, "hashchange", api.handleHashChange);
  off(window, "resize", api.resetModalViewPosition);
  api.removeMsgQueue();
  api.hideScrollbar();
  if (parent.$el.parentNode) {
    parent.$el.parentNode.removeChild(parent.$el);
  }
};
const selfClickEvent = ({
  api,
  parent,
  props
}) => event => {
  if (props.maskClosable && event.target === parent.$el) {
    api.close("mask");
  }
};
const mouseEnterEvent = state => () => {
  clearTimeout(state.timer);
};
const mouseLeaveEvent = ({
  api,
  props,
  state
}) => () => {
  api.addMsgQueue();
  state.timer = window.setTimeout(() => {
    api.close("close");
  }, parseFloat(props.duration));
};
const updateZindex = ({
  state,
  props
}) => () => {
  state.modalZindex = props.zIndex || PopupManager.nextZIndex();
};
const handleEvent = ({
  api,
  emit,
  parent,
  props,
  isMobileFirstMode
}) => (type, event, options) => {
  if (~["close", "confirm", "cancel"].indexOf(type) && typeof props.beforeClose === "function" && props.beforeClose(type) === false) {
    return;
  }
  const {
    events = {}
  } = parent;
  const params = {
    type,
    $modal: parent
  };
  if (isMobileFirstMode && type === "confirm") {
    params.options = options;
  }
  emit(type, params, event);
  events[type] && events[type].call(parent, params);
  api.close(type);
};
const closeEvent = api => event => {
  api.handleEvent("close", event);
};
const confirmEvent = ({
  api,
  state
}) => event => {
  api.handleEvent("confirm", event, state.options);
};
const cancelEvent = api => event => {
  api.handleEvent("cancel", event);
};
const open = ({
  api,
  emit,
  nextTick,
  parent,
  props,
  state,
  isMobileFirstMode
}) => () => {
  let {
    $listeners,
    events = {}
  } = parent;
  if (!state.visible) {
    let params = {
      type: "show",
      $modal: parent
    };
    state.visible = true;
    state.contentVisible = false;
    api.updateZindex();
    if (!events.show) {
      emit("update:modelValue", true);
      emit("show", params);
    }
    setTimeout(() => {
      state.contentVisible = true;
      if (!$listeners.show && events.show) {
        nextTick(() => {
          events.show.call(parent, params);
        });
      }
    }, 10);
    if (state.isMsg) {
      api.addMsgQueue();
      state.timer = window.setTimeout(() => {
        api.close(params.type);
      }, parseFloat(props.duration));
    } else {
      nextTick(() => {
        if (!isMobileFirstMode) {
          let modalBoxElem = api.getBox();
          const viewportWindow = getViewportWindow();
          let clientVisibleWidth = viewportWindow.document.documentElement.clientWidth || viewportWindow.document.body.clientWidth;
          let clientVisibleHeight = viewportWindow.document.documentElement.clientHeight || viewportWindow.document.body.clientHeight;
          let width = isNaN(props.width) ? props.width : `${props.width}px`;
          if (width) {
            modalBoxElem.style.left = "calc((100vw - " + width + ") / 2)";
          } else {
            modalBoxElem.style.left = `${clientVisibleWidth / 2 - modalBoxElem.offsetWidth / 2}px`;
          }
          if (modalBoxElem.offsetHeight + modalBoxElem.offsetTop + props.marginSize > clientVisibleHeight) {
            modalBoxElem.style.top = `${props.marginSize}px`;
          }
          on(window, "resize", api.resetModalViewPosition);
        }
        if (props.fullscreen) {
          nextTick(api.maximize);
        } else {
          api.revert();
        }
      });
    }
  }
};
const addMsgQueue = ({
  api,
  parent
}) => () => {
  if (!~MsgQueue.indexOf(parent)) {
    MsgQueue.push(parent);
  }
  api.updateStyle();
};
const removeMsgQueue = ({
  api,
  parent
}) => () => {
  const index = MsgQueue.indexOf(parent);
  if (~index) {
    MsgQueue.splice(index, 1);
  }
  api.updateStyle();
};
const updateStyle = ({
  nextTick,
  props
}) => () => {
  nextTick(() => {
    let offsetTop = 0;
    let distance = props.top;
    MsgQueue.forEach(comp => {
      offsetTop += parseFloat(distance);
      comp.state.modalTop = offsetTop;
      const modalBox = comp.$refs.modalBox;
      offsetTop += modalBox.clientHeight;
      distance = 15;
    });
  });
};
const close = ({
  emit,
  parent,
  props,
  state
}) => type => {
  if (!~["close", "confirm", "cancel"].indexOf(type) && typeof props.beforeClose === "function" && props.beforeClose(type) === false) {
    return;
  }
  let {
    events = {}
  } = parent;
  state.emitter.emit("boxclose", props.isFormReset);
  if (state.visible) {
    state.contentVisible = false;
    setTimeout(() => {
      state.visible = false;
      let params = {
        type,
        $modal: parent
      };
      emit("close", params);
      if (events.hide) {
        events.hide.call(parent, params);
      } else {
        emit("update:modelValue", false);
        emit("hide", params);
      }
    }, 200);
  }
};
const handleGlobalKeydownEvent = api => event => {
  if (event.keyCode === KEY_CODE.Escape) {
    api.close("esc");
  }
};
const handleHashChange = api => () => {
  api.close("hide");
};
const getBox = ({
  vm
}) => () => vm.$refs.modalBox;
const maximize = ({
  api,
  nextTick,
  props,
  state,
  isMobileFirstMode
}) => () => {
  return nextTick().then(() => {
    if (!state.zoomLocat) {
      let marginSize = props.marginSize;
      let modalBoxElement = api.getBox();
      let {
        visibleHeight,
        visibleWidth
      } = getDomNode();
      state.zoomLocat = {
        top: modalBoxElement.offsetTop,
        left: modalBoxElement.offsetLeft,
        width: modalBoxElement.clientWidth,
        height: modalBoxElement.clientHeight
      };
      if (!isMobileFirstMode) {
        Object.assign(modalBoxElement.style, {
          width: `${visibleWidth - marginSize * 2}px`,
          height: `${visibleHeight - marginSize * 2}px`,
          top: `${marginSize}px`,
          left: `${marginSize}px`
        });
      }
      state.emitter.emit("boxdrag");
    }
  });
};
const revert = ({
  api,
  nextTick,
  state,
  isMobileFirstMode
}) => () => {
  return nextTick().then(() => {
    let zoomLocat = state.zoomLocat;
    if (zoomLocat) {
      let modalBoxElement = api.getBox();
      state.zoomLocat = null;
      if (!isMobileFirstMode) {
        Object.assign(modalBoxElement.style, {
          width: `${zoomLocat.width}px`,
          height: `${zoomLocat.height}px`,
          top: `${zoomLocat.top}px`,
          left: `${zoomLocat.left}px`
        });
      }
      state.emitter.emit("boxdrag");
    }
  });
};
const toggleZoomEvent = ({
  api,
  emit,
  parent,
  state,
  isMobileFirstMode
}) => event => {
  let params = {
    type: state.zoomLocat ? "min" : "max",
    $modal: parent
  };
  const callback = state.zoomLocat ? api.revert : api.maximize;
  isMobileFirstMode && api.resetDragStyle();
  return callback().then(() => {
    emitZoom({
      params,
      parent,
      emit,
      event
    });
  });
};
function getEventTargetNode(event, container, queryCls) {
  let targetElem;
  let target = event.target;
  while (target && target.nodeType && target !== document) {
    if (queryCls && hasClass(target, queryCls)) {
      targetElem = target;
    } else if (target === container) {
      return {
        flag: queryCls ? !!targetElem : true,
        container,
        targetElem
      };
    }
    target = target.parentNode;
  }
  return {
    flag: false
  };
}
const mousedownEvent = ({
  api,
  nextTick,
  props,
  state,
  emit,
  isMobileFirstMode
}) => event => {
  let modalBoxElement = api.getBox();
  if (!state.zoomLocat && event.button === 0 && !getEventTargetNode(event, modalBoxElement, "trigger__btn").flag) {
    event.preventDefault();
    let demMousemove = document.onmousemove;
    let demMouseup = document.onmouseup;
    let disX = event.clientX - modalBoxElement.offsetLeft;
    let disY = event.clientY - modalBoxElement.offsetTop;
    let {
      visibleHeight,
      visibleWidth
    } = getDomNode();
    document.onmousemove = event2 => {
      event2.preventDefault();
      state.emitter.emit("boxdrag");
      let offsetWidth = modalBoxElement.offsetWidth;
      let offsetHeight = modalBoxElement.offsetHeight;
      let left = event2.clientX - disX;
      let top = event2.clientY - disY;
      let minX, maxX, minY, maxY;
      if (isMobileFirstMode) {
        minX = offsetWidth / 2 + props.marginSize;
        maxX = visibleWidth - offsetWidth / 2 - props.marginSize;
        minY = offsetHeight / 2 + props.marginSize;
        maxY = visibleHeight - offsetHeight / 2 - props.marginSize;
      } else {
        minX = props.marginSize;
        maxX = visibleWidth - offsetWidth - props.marginSize;
        minY = props.marginSize;
        maxY = visibleHeight - offsetHeight - props.marginSize;
      }
      if (left < minX) {
        left = minX;
      }
      if (left > maxX) {
        left = maxX;
      }
      if (top < minY) {
        top = minY;
      }
      if (top > maxY) {
        top = maxY;
      }
      modalBoxElement.style.left = `${left}px`;
      modalBoxElement.style.top = `${top}px`;
      addClass(modalBoxElement, DragClass);
      emit("custom-mousemove", event2);
    };
    document.onmouseup = event2 => {
      document.onmousemove = demMousemove;
      document.onmouseup = demMouseup;
      nextTick(() => {
        removeClass(modalBoxElement, DragClass);
      });
      emit("custom-mouseup", event2);
    };
    emit("custom-mousedown", event);
  }
};
const computeLeft = ({
  width,
  offsetWidth,
  x,
  minWidth,
  temp,
  offsetLeft,
  marginSize,
  left
}) => {
  width = offsetWidth - x;
  width = width < minWidth ? minWidth : width;
  temp = offsetLeft + offsetWidth - marginSize;
  width = width > temp ? temp : width;
  left = offsetLeft + offsetWidth - width;
  return {
    width,
    left
  };
};
const computeTop = ({
  height,
  offsetHeight,
  y,
  minHeight,
  temp,
  offsetTop,
  marginSize,
  top
}) => {
  height = offsetHeight - y;
  height = height < minHeight ? minHeight : height;
  temp = offsetTop + offsetHeight - marginSize;
  height = height > temp ? temp : height;
  top = offsetTop + offsetHeight - height;
  return {
    height,
    top
  };
};
const computeRight = ({
  width,
  offsetWidth,
  x,
  minWidth,
  temp,
  visibleWidth,
  offsetLeft,
  marginSize
}) => {
  width = offsetWidth + x;
  width = width < minWidth ? minWidth : width;
  temp = visibleWidth - offsetLeft - marginSize;
  width = width > temp ? temp : width;
  return {
    width
  };
};
const computeBottom = ({
  height,
  offsetHeight,
  y,
  minHeight,
  temp,
  visibleHeight,
  offsetTop,
  marginSize
}) => {
  height = offsetHeight + y;
  height = height < minHeight ? minHeight : height;
  temp = visibleHeight - offsetTop - marginSize;
  height = height > temp ? temp : height;
  return {
    height
  };
};
const updateModalBox = ({
  ret: {
    width,
    left,
    height,
    top
  },
  modalBoxElem: modalBoxElement
}) => {
  if (width) {
    modalBoxElement.style.width = `${width}px`;
  }
  if (left) {
    modalBoxElement.style.left = `${left}px`;
  }
  if (height) {
    modalBoxElement.style.height = `${height}px`;
  }
  if (top) {
    modalBoxElement.style.top = `${top}px`;
  }
};
const updateWl = ({
  width,
  offsetWidth,
  x,
  minWidth,
  temp,
  offsetLeft,
  marginSize,
  left,
  modalBoxElem
}) => {
  updateModalBox({
    ret: computeLeft({
      width,
      offsetWidth,
      x,
      minWidth,
      temp,
      offsetLeft,
      marginSize,
      left
    }),
    modalBoxElem
  });
};
const updateWr = ({
  width,
  offsetWidth,
  x,
  minWidth,
  temp,
  visibleWidth,
  offsetLeft,
  marginSize,
  modalBoxElem
}) => {
  updateModalBox({
    ret: computeRight({
      width,
      offsetWidth,
      x,
      minWidth,
      temp,
      visibleWidth,
      offsetLeft,
      marginSize
    }),
    modalBoxElem
  });
};
const updateSt = ({
  height,
  offsetHeight,
  y,
  minHeight,
  temp,
  offsetTop,
  marginSize,
  top,
  modalBoxElem
}) => {
  updateModalBox({
    ret: computeTop({
      height,
      offsetHeight,
      y,
      minHeight,
      temp,
      offsetTop,
      marginSize,
      top
    }),
    modalBoxElem
  });
};
const updateSb = ({
  height,
  offsetHeight,
  y,
  minHeight,
  temp,
  visibleHeight,
  offsetTop,
  marginSize,
  modalBoxElem
}) => {
  updateModalBox({
    ret: computeBottom({
      height,
      offsetHeight,
      y,
      minHeight,
      temp,
      visibleHeight,
      offsetTop,
      marginSize
    }),
    modalBoxElem
  });
};
const setModalBoxStyle = ({
  params,
  delta: {
    x,
    y
  }
}) => {
  const {
    visibleHeight,
    visibleWidth,
    modalBoxElem,
    type,
    props
  } = params;
  const {
    offsetWidth,
    offsetHeight,
    offsetLeft,
    offsetTop
  } = modalBoxElem;
  const {
    minWidth,
    minHeight,
    marginSize
  } = props;
  const [width, left, temp, height, top] = [0, 0, 0, 0, 0];
  switch (type) {
    case "wl":
      updateWl({
        offsetWidth,
        width,
        minWidth,
        x,
        offsetLeft,
        temp,
        marginSize,
        left,
        modalBoxElem
      });
      break;
    case "wr":
      updateWr({
        width,
        offsetWidth,
        x,
        minWidth,
        temp,
        visibleWidth,
        offsetLeft,
        marginSize,
        modalBoxElem
      });
      break;
    case "st":
      updateSt({
        height,
        offsetHeight,
        y,
        minHeight,
        temp,
        offsetTop,
        marginSize,
        top,
        modalBoxElem
      });
      break;
    case "sb":
      updateSb({
        height,
        offsetHeight,
        y,
        minHeight,
        temp,
        visibleHeight,
        offsetTop,
        marginSize,
        modalBoxElem
      });
      break;
    case "swst":
      updateWl({
        width,
        offsetWidth,
        x,
        minWidth,
        temp,
        offsetLeft,
        marginSize,
        left,
        modalBoxElem
      });
      updateSt({
        height,
        offsetHeight,
        y,
        minHeight,
        temp,
        offsetTop,
        marginSize,
        top,
        modalBoxElem
      });
      break;
    case "sest":
      updateWr({
        offsetWidth,
        width,
        x,
        temp,
        minWidth,
        marginSize,
        visibleWidth,
        offsetLeft,
        modalBoxElem
      });
      updateSt({
        height,
        offsetHeight,
        y,
        minHeight,
        temp,
        offsetTop,
        marginSize,
        top,
        modalBoxElem
      });
      break;
    case "swlb":
      updateWl({
        width,
        offsetWidth,
        minWidth,
        x,
        temp,
        marginSize,
        offsetLeft,
        modalBoxElem,
        left
      });
      updateSb({
        height,
        offsetHeight,
        y,
        minHeight,
        temp,
        visibleHeight,
        offsetTop,
        marginSize,
        modalBoxElem
      });
      break;
    case "selb":
      updateWr({
        width,
        offsetWidth,
        minWidth,
        x,
        visibleWidth,
        offsetLeft,
        marginSize,
        temp,
        modalBoxElem
      });
      updateSb({
        height,
        offsetHeight,
        y,
        minHeight,
        temp,
        visibleHeight,
        offsetTop,
        marginSize,
        modalBoxElem
      });
      break;
    default:
      break;
  }
};
const updateDelta = ({
  event,
  delta,
  state
}) => {
  if (state.prevEvent) {
    delta.x += event.screenX - state.prevEvent.screenX;
    delta.y += event.screenY - state.prevEvent.screenY;
  }
  state.prevEvent = event;
};
function _findFormComponent(vm, formList) {
  const children = vm.$children;
  if (children && children.length === 0) {
    return;
  }
  children.forEach(child => {
    const tag = child.$options.componentName;
    if (/^Form$/.test(tag)) {
      formList.push(child);
    }
    _findFormComponent(child, formList);
  });
}
function findFormComponent(vm) {
  const formList = [];
  _findFormComponent(vm, formList);
  return formList;
}
const updateFormTip = parent => {
  const formList = findFormComponent(parent);
  if (formList.length > 0) {
    formList.forEach(form => {
      form.updateTip();
    });
  }
};
const dragEvent = ({
  api,
  emit,
  parent,
  props,
  state
}) => event => {
  var _a;
  event.preventDefault();
  const delta = {
    x: 0,
    y: 0
  };
  const {
    visibleHeight,
    visibleWidth
  } = getDomNode();
  const modalBoxElem = api.getBox();
  const demMousemove = document.onmousemove;
  const demMouseup = document.onmouseup;
  const params = {
    props,
    offsetTop: modalBoxElem.offsetTop,
    offsetLeft: modalBoxElem.offsetLeft,
    visibleWidth,
    modalBoxElem,
    visibleHeight,
    disX: event.clientX,
    disY: event.clientY,
    type: (_a = event.target) == null ? void 0 : _a.dataset.type
  };
  document.onmousemove = event2 => {
    updateFormTip(parent);
    updateDelta({
      event: event2,
      delta,
      state
    });
    setModalBoxStyle({
      params,
      delta
    });
    delta.x = delta.y = 0;
    addClass(modalBoxElem, DragClass);
    emitZoom({
      params: {
        type: "resize",
        $modal: parent
      },
      parent,
      emit,
      event: event2
    });
  };
  document.onmouseup = () => {
    state.zoomLocat = null;
    document.onmousemove = demMousemove;
    document.onmouseup = demMouseup;
    setTimeout(() => {
      removeClass(modalBoxElem, DragClass);
      state.prevEvent = null;
    }, 50);
  };
};
const resetFormTip = (parent, isFormReset = true) => {
  const formList = findFormComponent(parent);
  if (formList.length > 0) {
    formList.forEach(form => {
      isFormReset ? form.resetFields() : form.clearValidate();
    });
  }
};
const resetDragStyle = api => () => {
  const modalBoxElement = api.getBox();
  modalBoxElement.style.left = "";
  modalBoxElement.style.top = "";
};
const showScrollbar = lockScrollClass => () => {
  addClass(document.body, lockScrollClass);
};
const hideScrollbar = lockScrollClass => () => {
  removeClass(document.body, lockScrollClass);
};
const resetModalViewPosition = api => () => {
  const modalBoxElement = api.getBox();
  const viewportWindow = getViewportWindow();
  const clientVisibleWidth = viewportWindow.document.documentElement.clientWidth || viewportWindow.document.body.clientWidth;
  modalBoxElement.style.left = `${clientVisibleWidth / 2 - modalBoxElement.offsetWidth / 2}px`;
};
export { MsgQueue, addMsgQueue, beforeUnmouted, cancelEvent, close, closeEvent, computedBoxStyle, computedIsMsg, confirmEvent, created, dragEvent, getBox, handleEvent, handleGlobalKeydownEvent, handleHashChange, hideScrollbar, maximize, mounted, mouseEnterEvent, mouseLeaveEvent, mousedownEvent, open, removeMsgQueue, resetDragStyle, resetFormTip, resetModalViewPosition, revert, selfClickEvent, showScrollbar, toggleZoomEvent, updateFormTip, updateStyle, updateZindex, watchValue, watchVisible };