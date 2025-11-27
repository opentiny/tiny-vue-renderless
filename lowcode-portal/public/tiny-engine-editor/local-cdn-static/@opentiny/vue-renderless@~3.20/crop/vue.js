import "../chunk-G2ADBYYC.js";
import { watchImageSrc, shortcutKeys, watchVisible, clear, replace, getCroppedCanvas, setCanvasData, setDragMode, setAspectRatio, getImageData, getCanvasData, scale, scaleY, getContainerData, scaleX, destroy, disable, enable, closeCropArea, closeCrop, createCrop, setImage, cropImage, getCropBoxData, getData, move, reset, rotate, setCropBoxData, setData, showFileChooser, zoom } from './index.js';
const api = ["state", "clear", "replace", "getCroppedCanvas", "setCanvasData", "setDragMode", "setAspectRatio", "getCanvasData", "getImageData", "getContainerData", "scaleY", "scale", "scaleX", "destroy", "enable", "closeCropArea", "disable", "closeCrop", "getCropBoxData", "getData", "move", "reset", "rotate", "setCropBoxData", "setData", "showFileChooser", "setImage", "cropImage", "zoom"];
const initRenderIcon = (api2, t) => {
  const renderIcon = [{
    method: () => api2.showFileChooser(),
    icon: "IconNew",
    title: t("ui.crop.choose")
  }, {
    split: true
  }, {
    method: () => api2.zoom(-0.1),
    icon: "IconZoomOut",
    title: t("ui.crop.zoomOut")
  }, {
    method: () => api2.zoom(0.1),
    icon: "IconZoomIn",
    title: t("ui.crop.zoomIn")
  }, {
    method: () => api2.rotate(-45),
    icon: "IconRepeat",
    title: t("ui.crop.rotate_45")
  }, {
    method: () => api2.rotate(45),
    icon: "IconRefres",
    title: t("ui.crop.rotate45")
  }, {
    split: true
  }, {
    method: () => api2.closeCropArea(),
    icon: "IconCrop",
    title: t("ui.crop.closeCropArea")
  }, {
    method: () => api2.reset(),
    icon: "IconConmentRefresh",
    title: t("ui.crop.reset")
  }, {
    split: true
  }, {
    method: () => api2.closeCrop(),
    icon: "IconClose",
    title: t("ui.crop.closeCrop")
  }, {
    method: () => api2.cropImage(),
    icon: "IconYes",
    title: t("ui.crop.cropImage")
  }];
  return renderIcon;
};
const initState = ({
  reactive,
  props,
  api: api2,
  t
}) => {
  const state = reactive({
    src: props.src,
    cropper: "",
    data: null,
    cropvisible: props.cropvisible,
    renderIcon: initRenderIcon(api2, t)
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  emit,
  refs,
  props
}) => {
  Object.assign(api2, {
    state,
    zoom: zoom(state),
    move: move(state),
    clear: clear(state),
    reset: reset(state),
    scale: scale(state),
    rotate: rotate(state),
    enable: enable(state),
    scaleX: scaleX(state),
    scaleY: scaleY(state),
    replace: replace(state),
    setData: setData(state),
    getData: getData(state),
    disable: disable(state),
    destroy: destroy(state),
    setDragMode: setDragMode(state),
    getImageData: getImageData(state),
    watchImageSrc: watchImageSrc(state),
    setCanvasData: setCanvasData(state),
    getCanvasData: getCanvasData(state),
    closeCrop: closeCrop({
      emit,
      state
    }),
    setCropBoxData: setCropBoxData(state),
    setAspectRatio: setAspectRatio(state),
    getCropBoxData: getCropBoxData(state),
    showFileChooser: showFileChooser(refs),
    getCroppedCanvas: getCroppedCanvas(state),
    getContainerData: getContainerData(state),
    createCrop: createCrop({
      emit,
      props,
      refs,
      state
    }),
    // computedCropImages: computedCropImages({ constants, t }),
    shortcutKeys: shortcutKeys(api2),
    closeCropArea: closeCropArea(api2),
    setImage: setImage({
      api: api2,
      state,
      props
    }),
    cropImage: cropImage({
      api: api2,
      emit,
      props,
      state
    }),
    watchVisible: watchVisible({
      api: api2,
      state
    })
  });
};
const initWatch = ({
  watch,
  props,
  api: api2
}) => {
  watch(() => props.cropvisible, api2.watchVisible);
  watch(() => props.src, api2.watchImageSrc, {
    immediate: true
  });
};
const renderless = (props, {
  onMounted,
  reactive,
  watch
}, {
  emit,
  refs,
  t
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    props,
    api: api2,
    t
  });
  initApi({
    api: api2,
    state,
    emit,
    refs,
    props
  });
  onMounted(api2.createCrop);
  initWatch({
    watch,
    props,
    api: api2
  });
  return api2;
};
export { api, renderless };