import "../chunk-G2ADBYYC.js";
import { preventDefault } from './../common/deps/dom.js';
const getOffsetPosition = ({
  touch,
  state
}) => {
  let offsetY = 0;
  let offsetX = 0;
  if (state.current === "default" && state.isFullscreen) {
    offsetY = state.canvasRect.width - touch.clientX + (state.canvasRect.left || 0);
    offsetX = touch.clientY - (state.canvasRect.top || 0);
  } else {
    offsetX = touch.clientX - (state.canvasRect.left || 0);
    offsetY = touch.clientY - (state.canvasRect.top || 0);
  }
  return {
    offsetX,
    offsetY
  };
};
const redraw = ({
  state,
  props,
  nextTick
}) => ({
  oldWidth,
  oldHeight
}) => {
  if (Date.now() - state.lastRedrawDate < 100) {
    return;
  }
  state.lastRedrawDate = Date.now();
  nextTick(() => {
    const context = state.ctx;
    context.lineWidth = props.lineWidth;
    context.strokeStyle = props.penColor;
    context.beginPath();
    state.ctx.lineJoin = "round";
    state.paths.forEach(point => {
      point.offsetX *= state.width / oldWidth;
      point.offsetY *= state.height / oldHeight;
      if (point.isStart) {
        context.moveTo(point.offsetX, point.offsetY);
      } else {
        context.lineTo(point.offsetX, point.offsetY);
        context.stroke();
      }
    });
  });
};
const touchStart = ({
  emit,
  props,
  state,
  vm,
  api,
  useRect
}) => () => {
  if (!state.ctx) {
    return false;
  }
  if (!state.isBeginWrite) {
    api.rewrite(true);
  }
  state.canvasRect = useRect(vm.$refs.canvasRef);
  state.ctx.lineWidth = props.lineWidth;
  state.ctx.strokeStyle = props.penColor;
  const touch = event.touches[0];
  if (!touch.offsetX) {
    const pos = getOffsetPosition({
      touch,
      state
    });
    touch.offsetX = pos.offsetX;
    touch.offsetY = pos.offsetY;
  }
  state.isDrawing = true;
  const point = {
    isStart: true,
    offsetX: touch.offsetX,
    offsetY: touch.offsetY
  };
  state.paths.push(point);
  state.ctx.beginPath();
  state.ctx.lineJoin = "round";
  state.ctx.moveTo(touch.offsetX, touch.offsetY);
  emit("start");
};
const touchMove = ({
  emit,
  state
}) => e => {
  if (!state.ctx) {
    return false;
  }
  preventDefault(e);
  const touch = event.touches[0];
  if (state.isDrawing) {
    if (!touch.offsetX) {
      const pos = getOffsetPosition({
        touch,
        state
      });
      touch.offsetX = pos.offsetX;
      touch.offsetY = pos.offsetY;
    }
    state.ctx.lineTo(touch.offsetX, touch.offsetY);
    state.ctx.stroke();
    const point = {
      isStart: false,
      offsetX: touch.offsetX,
      offsetY: touch.offsetY
    };
    state.paths.push(point);
  }
  emit("signing", event);
};
const touchEnd = ({
  emit,
  state
}) => event2 => {
  state.isDrawing = false;
  preventDefault(event2);
  emit("end");
};
const isCanvasEmpty = (canvas, props) => {
  const empty = document.createElement("canvas");
  const ctx = empty.getContext("2d");
  empty.width = canvas.width;
  empty.height = canvas.height;
  ctx.font = "16px PingFangSC";
  ctx.textAlign = "center";
  ctx.fillStyle = "#AEAEAE";
  ctx.fillText(props.placeholder, empty.width / 2, empty.height / 2);
  return canvas.toDataURL() === empty.toDataURL();
};
const setCanvasBgColor = ({
  props,
  state
}) => () => {
  if (state.ctx && props.backgroundColor) {
    state.ctx.fillStyle = props.backgroundColor;
    state.ctx.fillRect(0, 0, state.width, state.height);
  }
};
const setPlaceholder = ({
  props,
  state
}) => () => {
  if (state.ctx) {
    state.ctx.font = "16px PingFangSC";
    state.ctx.textAlign = "center";
    state.ctx.fillStyle = "#AEAEAE";
    state.ctx.fillText(props.placeholder, state.width / 2, state.height / 2);
  }
};
const getSignatureImage = ({
  props,
  vm,
  Modal,
  t
}) => () => {
  const canvas = vm.$refs.canvasRef;
  if (!canvas) {
    return;
  }
  const isEmpty = isCanvasEmpty(canvas, props);
  let image = "";
  if (isEmpty) {
    Modal.message(t("ui.signature.tips"));
  } else {
    const types = {
      jpg: () => canvas.toDataURL("image/jpeg", 0.8),
      jpeg: () => canvas.toDataURL("image/jpeg", 0.8)
    };
    let type = types[props.type];
    if (type) {
      image = type();
    } else {
      image = canvas.toDataURL(`image/${props.type}`);
    }
  }
  return {
    image,
    canvas
  };
};
const submit = ({
  emit,
  api
}) => () => {
  const {
    image,
    canvas
  } = api.getSignatureImage();
  emit("submit", {
    image,
    canvas
  });
};
const rewrite = ({
  api,
  emit,
  state
}) => isBeginWrite => {
  if (state.ctx) {
    state.value = false;
    state.ctx.clearRect(0, 0, state.width, state.height);
    state.ctx.closePath();
    api.setCanvasBgColor();
    state.isBeginWrite = true;
    if (isBeginWrite === true) return;
    api.setPlaceholder();
    state.isBeginWrite = false;
    state.paths.length = 0;
    emit("rewrite");
  }
};
const cancel = ({
  api,
  emit
}) => () => {
  api.toggleFullscreen();
  emit("cancel");
};
const tranformImage = ({
  api,
  vm,
  props,
  nextTick
}) => ({
  oldWidth,
  oldHeight
}) => {
  const canvas = vm.$refs.canvasRef;
  if (isCanvasEmpty(canvas, props)) {
    nextTick(() => {
      api.setPlaceholder();
    });
  } else {
    nextTick(() => {
      api.redraw({
        oldWidth,
        oldHeight
      });
    });
  }
};
const toggleFullscreen = ({
  nextTick,
  api,
  state
}) => () => {
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;
  const oldWidth = state.width;
  const oldHeight = state.height;
  state.isFullscreen = !state.isFullscreen;
  nextTick(() => {
    if (state.current.value === "default" && state.isFullscreen) {
      state.width = clientHeight;
      state.height = clientWidth;
    } else {
      api.initCanvas();
    }
    api.tranformImage({
      oldWidth,
      oldHeight
    });
  });
};
const initCanvas = ({
  props,
  state,
  vm
}) => () => {
  const canvas = vm.$refs.canvasRef;
  const wrap = vm.$refs.wrapRef;
  const width = wrap.offsetWidth || 0;
  const height = wrap.offsetHeight || 0;
  state.ctx = canvas.getContext("2d");
  state.width = width;
  state.height = props.height || height;
};
const mounted = ({
  vm,
  state,
  api,
  nextTick,
  markRaw
}) => () => {
  const wrap = vm.$refs.wrapRef;
  const resizeObserver = new ResizeObserver(ResizeObserverEntryArr => {
    const [{
      contentRect
    }] = ResizeObserverEntryArr;
    if (contentRect.width && contentRect.height) {
      api.initCanvas();
      if (state.paths.length) {
        api.redraw({
          oldWidth: contentRect.width,
          oldHeight: contentRect.height
        });
      } else {
        nextTick(() => {
          api.setCanvasBgColor();
          api.setPlaceholder();
        });
      }
    }
  });
  state.resizeObserver = markRaw(resizeObserver);
  state.resizeObserver.observe(wrap);
};
const beforeUnmount = ({
  vm,
  state
}) => () => {
  const wrap = vm.$refs.wrapRef;
  state.resizeObserver.unobserve(wrap);
};
export { beforeUnmount, cancel, getSignatureImage, initCanvas, mounted, redraw, rewrite, setCanvasBgColor, setPlaceholder, submit, toggleFullscreen, touchEnd, touchMove, touchStart, tranformImage };