import "../chunk-G2ADBYYC.js";
import { computedGetImageStyle, computedGetAlignCenter, computedGetPreview, loadImage, handleLoad, handleError, handleLazyLoad, addLazyLoadListener, removeLazyLoadListener, getImageStyle, clickHandler, closeViewer, mounted, deleteHander, filterImageUrl, handleSwitch } from './index.js';
const api = ["state", "src", "zIndex", "previewSrcList", "loadImage", "clickHandler", "closeViewer", "handleLoad", "handleError", "deleteHander", "handleSwitch"];
const initState = ({
  reactive,
  computed,
  api: api2,
  props,
  images
}) => {
  const state = reactive({
    mfPreviewVisible: props.previewVisible,
    /** mobile-first传入的一张image-error的图片 */
    images,
    error: false,
    loading: true,
    imageWidth: 0,
    imageHeight: 0,
    show: !props.lazy,
    showViewer: false,
    getPreview: computed(() => api2.computedGetPreview()),
    getImageStyle: computed(() => api2.computedGetImageStyle()),
    getAlignCenter: computed(() => api2.computedGetAlignCenter()),
    src: computed(() => api2.filterImageUrl())
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  emit,
  props,
  vm,
  constants,
  nextTick,
  attrs
}) => {
  Object.assign(api2, {
    state,
    closeViewer: closeViewer(state),
    clickHandler: clickHandler(state),
    handleLoad: handleLoad({
      state,
      emit
    }),
    handleError: handleError({
      state,
      emit
    }),
    computedGetPreview: computedGetPreview(props),
    removeLazyLoadListener: removeLazyLoadListener(state),
    getImageStyle: getImageStyle({
      state,
      vm,
      constants
    }),
    computedGetAlignCenter: computedGetAlignCenter({
      props,
      constants
    }),
    mounted: mounted({
      api: api2,
      props
    }),
    handleLazyLoad: handleLazyLoad({
      api: api2,
      state,
      vm,
      nextTick
    }),
    loadImage: loadImage({
      api: api2,
      state,
      props,
      attrs
    }),
    computedGetImageStyle: computedGetImageStyle({
      api: api2,
      props
    }),
    addLazyLoadListener: addLazyLoadListener({
      api: api2,
      props,
      state,
      vm
    }),
    deleteHander: deleteHander(emit),
    filterImageUrl: filterImageUrl(props),
    handleSwitch: handleSwitch({
      emit
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props
}) => {
  watch(() => props.src, (value, oldValue) => value !== oldValue && state.show && api2.loadImage());
  watch(() => state.show, value => value && api2.loadImage());
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
  provide
}, {
  vm,
  emit,
  constants,
  nextTick,
  attrs
}, {
  images
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    api: api2,
    props,
    images
  });
  initApi({
    api: api2,
    state,
    emit,
    props,
    vm,
    constants,
    nextTick,
    attrs
  });
  initWatch({
    watch,
    state,
    api: api2,
    props
  });
  onMounted(api2.mounted);
  onBeforeUnmount(() => props.lazy && api2.removeLazyLoadListener());
  provide("mfPreviewVisible", state.mfPreviewVisible);
  provide("urlList", props.previewSrcList);
  return api2;
};
export { api, renderless };