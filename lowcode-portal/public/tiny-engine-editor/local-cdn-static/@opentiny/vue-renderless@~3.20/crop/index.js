import "../chunk-G2ADBYYC.js";
import { on, off } from './../common/deps/dom.js';
import { toFileSize } from './../common/string.js';
const watchImageSrc = state => value => state.src = value;
const watchVisible = ({
  api,
  state
}) => value => {
  if (value) {
    on(document.body, "keydown", api.shortcutKeys);
  } else {
    off(document.body, "keydown", api.shortcutKeys);
  }
  state.cropvisible = value;
};
const shortcutKeys = api => e => {
  if (e.keyCode === 187 && e.ctrlKey) {
    e.preventDefault();
    api.zoom(0.1);
  }
  if (e.keyCode === 189 && e.ctrlKey) {
    e.preventDefault();
    api.zoom(-0.1);
  }
  if (e.keyCode === 38 && e.ctrlKey) {
    e.preventDefault();
    api.move(0, 1);
  }
  if (e.keyCode === 40 && e.ctrlKey) {
    e.preventDefault();
    api.move(0, -1);
  }
  if (e.keyCode === 37 && e.ctrlKey) {
    e.preventDefault();
    api.move(1, 0);
  }
  if (e.keyCode === 39 && e.ctrlKey) {
    e.preventDefault();
    api.move(-1, 0);
  }
  if (e.keyCode === 27) {
    e.preventDefault();
    api.closeCrop();
  }
};
const closeCrop = ({
  emit,
  state
}) => () => {
  emit("update:cropvisible", false);
  emit("update:visible", false);
};
const createCrop = ({
  emit,
  props,
  refs,
  state
}) => () => {
  const Cropper = props.plugin;
  const cropImage2 = refs.cropImage;
  state.cropper = new Cropper(cropImage2, {
    modal: props.modal,
    guides: props.guides,
    center: props.center,
    movable: props.movable,
    restore: props.restore,
    viewMode: props.viewMode,
    zoomable: props.zoomable,
    autoCrop: props.autoCrop,
    dragMode: props.dragMode,
    rotatable: props.rotatable,
    responsive: props.responsive,
    background: props.background,
    aspectRatio: props.aspectRatio,
    zoomOnWheel: props.zoomOnWheel,
    autoCropArea: props.autoCropArea,
    wheelZoomRatio: props.wheelZoomRatio,
    minCropBoxWidth: props.minCropBoxWidth,
    minCropBoxHeight: props.minCropBoxHeight,
    minContainerWidth: props.minContainerWidth,
    minContainerHeight: props.minContainerHeight,
    ready() {
      emit("ready");
    },
    cropstart(e) {
      emit("cropstart", e);
    },
    cropmove(e) {
      emit("cropmove", e);
    },
    cropend(e) {
      emit("cropend", e);
    },
    crop(e) {
      emit("crop", e);
    }
  });
};
const closeCropArea = api => () => api.clear();
const clear = state => () => state.cropper.clear();
const cropImage = ({
  api,
  emit,
  props,
  state
}) => () => {
  const canvas = api.getCroppedCanvas();
  if (props.cropType.toLowerCase() === "base64") {
    emit("cropdata", canvas.toDataURL("image/jpeg", props.quality));
  } else if (props.cropType.toLowerCase() === "blob") {
    canvas.toBlob(blobObj => emit("cropdata", blobObj), "image/jpeg", props.quality);
  }
  api.closeCrop();
};
const getCroppedCanvas = state => () => state.cropper.getCroppedCanvas();
const getCropBoxData = state => () => state.cropper.getCropBoxData();
const getData = state => rounded => state.cropper.getData(!!rounded);
const move = state => (offsetX, offsetY) => state.cropper.move(offsetX, offsetY);
const reset = state => () => state.cropper.reset();
const setCropBoxData = state => ({
  left,
  top,
  width,
  height
}) => state.cropper.setCropBoxData({
  left,
  top,
  width,
  height
});
const setData = state => data => data !== null && typeof data === "object" && state.cropper.setData(data);
const disable = state => () => state.cropper.disable();
const enable = state => () => state.cropper.enable();
const destroy = state => () => state.cropper.destroy();
const scale = state => (scaleX2, scaleY2) => state.cropper.scale(scaleX2, scaleY2);
const scaleX = state => x => state.cropper.scaleX(x);
const scaleY = state => x => state.cropper.scaleY(x);
const getContainerData = state => () => state.cropper.getContainerData();
const getImageData = state => () => state.cropper.getImageData();
const getCanvasData = state => () => state.cropper.getCanvasData();
const setAspectRatio = state => s => state.cropper.setAspectRatio(s);
const setDragMode = state => s => state.cropper.setDragMode(s);
const setCanvasData = state => ({
  width,
  height,
  left,
  top
}) => state.cropper.setCanvasData({
  width,
  height,
  left,
  top
});
const rotate = state => deg => state.cropper.rotate(deg);
const setImage = ({
  api,
  state,
  props
}) => e => {
  const file = e.target.files[0];
  let unit = props.maxSize.match(/[a-zA-Z]+/gi);
  unit = unit && (unit[0].length > 1 ? unit[0] : unit[0] + "B");
  const size = toFileSize(Number(props.maxSize.match(/[0-9]+/gi)[0]), "B", unit || "B");
  if (file === void 0 || !file.type.includes("image/") || Number(file.size) > Number(size.split("B")[0])) {
    return;
  }
  const reader = new FileReader();
  reader.onload = event => {
    state.src = event.target.result;
    api.replace(event.target.result);
  };
  reader.readAsDataURL(file);
};
const replace = state => url => state.cropper.replace(url);
const showFileChooser = refs => () => refs.cropInput.click();
const zoom = state => percent => state.cropper.zoom(percent);
export { clear, closeCrop, closeCropArea, createCrop, cropImage, destroy, disable, enable, getCanvasData, getContainerData, getCropBoxData, getCroppedCanvas, getData, getImageData, move, replace, reset, rotate, scale, scaleX, scaleY, setAspectRatio, setCanvasData, setCropBoxData, setData, setDragMode, setImage, shortcutKeys, showFileChooser, watchImageSrc, watchVisible, zoom };