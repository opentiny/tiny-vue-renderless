import "../chunk-G2ADBYYC.js";
import { on, off, getScrollContainer, isInContainer } from './../common/deps/dom.js';
import { typeOf } from './../common/type.js';
import { rafThrottle } from './../image-viewer/index.js';
import { xss } from './../common/xss.js';
const isSupportObjectFit = () => document.documentElement.style.objectFit !== void 0;
const isHtmlElement = node => node && node.nodeType === Node.ELEMENT_NODE;
const computedGetImageStyle = ({
  props,
  api
}) => () => {
  const {
    fit
  } = props;
  if (fit) {
    return isSupportObjectFit() ? {
      "object-fit": fit
    } : api.getImageStyle(fit);
  }
  return {};
};
const computedGetAlignCenter = ({
  props,
  constants
}) => () => !isSupportObjectFit() && props.fit !== constants.FILL;
const computedGetPreview = props => () => Array.isArray(props.previewSrcList) && props.previewSrcList.length > 0;
const loadImage = ({
  state,
  api,
  attrs,
  props
}) => () => {
  state.loading = true;
  state.error = false;
  const img = new Image();
  img.onload = event => api.handleLoad(event, img);
  img.onerror = api.handleError;
  Object.keys(attrs).forEach(key => {
    if (key !== "onError" && key !== "onLoad") {
      const value = attrs[key];
      img.setAttribute(key, value);
    }
  });
  img.src = props.src || "";
};
const handleLoad = ({
  state,
  emit
}) => (event, img) => {
  state.imageWidth = img.width;
  state.imageHeight = img.height;
  state.loading = false;
  emit("load", event);
};
const deleteHander = emit => event => {
  emit("delete", event);
};
const handleError = ({
  state,
  emit
}) => event => {
  state.loading = false;
  state.error = true;
  emit("error", event);
};
const handleSwitch = ({
  emit
}) => index => {
  emit("change-index", index);
};
const handleLazyLoad = ({
  state,
  api,
  vm,
  nextTick
}) => () => {
  if (isInContainer(vm.$el, state._scrollContainer)) {
    nextTick(() => state.show = true);
    api.removeLazyLoadListener();
  }
};
const addLazyLoadListener = ({
  props,
  state,
  api,
  vm
}) => () => {
  const {
    scrollContainer
  } = props;
  let _scrollContainer = null;
  if (isHtmlElement(scrollContainer)) {
    _scrollContainer = scrollContainer;
  } else if (typeOf(scrollContainer) === "string") {
    _scrollContainer = document.querySelector(scrollContainer);
  } else {
    _scrollContainer = getScrollContainer(vm.$el);
  }
  if (_scrollContainer) {
    state._scrollContainer = _scrollContainer;
    state._lazyLoadHandler = rafThrottle(api.handleLazyLoad);
    on(_scrollContainer, "scroll", state._lazyLoadHandler);
    api.handleLazyLoad();
  }
};
const removeLazyLoadListener = state => () => {
  const {
    _scrollContainer,
    _lazyLoadHandler
  } = state;
  if (!_scrollContainer || !_lazyLoadHandler) {
    return;
  }
  off(_scrollContainer, "scroll", _lazyLoadHandler);
  state._scrollContainer = null;
  state._lazyLoadHandler = null;
};
const getImageStyle = ({
  state,
  vm,
  constants
}) => fit => {
  const {
    imageWidth,
    imageHeight
  } = state;
  const {
    clientWidth: containerWidth,
    clientHeight: containerHeight
  } = vm.$el;
  if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) {
    return {};
  }
  const vertical = imageWidth / imageHeight < 1;
  if (fit === constants.SCALE_DOWN) {
    const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
    fit = isSmaller ? constants.NONE : constants.CONTAIN;
  }
  if (fit === constants.NONE) {
    return {
      width: "auto",
      height: "auto"
    };
  }
  if (fit === constants.CONTAIN) {
    return vertical ? {
      width: "auto"
    } : {
      height: "auto"
    };
  }
  if (fit === constants.COVER) {
    return vertical ? {
      height: "auto"
    } : {
      width: "auto"
    };
  }
  return {};
};
const clickHandler = state => () => {
  state.showViewer = true;
  state.mfPreviewVisible = true;
};
const closeViewer = state => () => state.showViewer = false;
const mounted = ({
  props,
  api
}) => () => {
  if (props.lazy) {
    api.addLazyLoadListener();
  } else {
    api.loadImage();
  }
};
const filterImageUrl = props => () => {
  const isBase64 = /^data:image\/(png|jpg|jpeg|gif);base64,([a-zA-Z0-9+/]+={0,2})/;
  return isBase64.test(props.src) ? props.src : xss.filterUrl(props.src);
};
export { addLazyLoadListener, clickHandler, closeViewer, computedGetAlignCenter, computedGetImageStyle, computedGetPreview, deleteHander, filterImageUrl, getImageStyle, handleError, handleLazyLoad, handleLoad, handleSwitch, loadImage, mounted, removeLazyLoadListener };