import "../chunk-G2ADBYYC.js";
import { computedIsSingle, watchVisible, computedIsFirst, computedIsLast, computedCurrentImg, computedImgStyle, hide, deviceSupportInstall, deviceSupportUninstall, handleImgLoad, handleImgError, handleMouseDown, reset, toggleMode, prev, next, handleActions, handleVisible, getImageWidth, swipeLeft, swipeRight, handleDelete, touchstart, touchmove, touchend, computeZIndex, activeItems, imagePreview, initPage, beforeDestroy, itemClick, selectOption, langClick, getLastPrev, getDefaultPrev, getCenterPosition, filterImageUrl } from './index.js';
const api = ["state", "zIndex", "touchstart", "touchmove", "touchend", "urlList", "hide", "prev", "next", "handleActions", "toggleMode", "handleImgLoad", "handleImgError", "handleMouseDown", "handleVisible", "swipeLeft", "swipeRight", "handleDelete", "activeItems", "imagePreview", "itemClick", "selectOption", "langClick"];
const initState = ({
  reactive,
  computed,
  api: api2,
  mode,
  props,
  constants,
  inject
}) => {
  const state = reactive({
    originScale: "",
    moveable: false,
    pageX: "",
    pageY: "",
    pageY2: "",
    pageX2: "",
    mfPreviewVisible: inject("mfPreviewVisible", null),
    scale: 1,
    time: null,
    index: mode === "pc" || mode === "mobile-first" ? 0 : props.startPosition,
    imageName: "",
    isShow: false,
    infinite: true,
    loading: false,
    transform: {
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      objfit: "contain",
      enableTransition: false
    },
    urlList: props.urlList || Array.isArray(inject("urlList")) && inject("urlList").length !== 0 ? inject("urlList") : null,
    mode: constants.MODE.CONTAIN,
    previewVisible: props.previewVisible,
    fullScreen: props.imageFullCurrent,
    hammer: null,
    imageItemWidth: 0,
    imageAllWidth: 0,
    imageTransform: 0,
    imageTransformSize: 0,
    imageTransition: 300,
    imageList: null,
    arrowStyle: null,
    delete: false,
    isLast: computed(() => api2.computedIsLast()),
    isFirst: computed(() => api2.computedIsFirst()),
    isSingle: computed(() => api2.computedIsSingle()),
    imgStyle: computed(() => api2.computedImgStyle()),
    currentImg: computed(() => api2.computedCurrentImg()),
    zIndex: computed(() => api2.computeZIndex()),
    currentIndex: 0,
    mobileCurrentIndex: -1,
    isImagePreview: false,
    hiddenThumbnail: false,
    firstX: 0,
    endX: 0,
    showImageViewer: true,
    isThumbnail: props.isThumbnail,
    isMenuView: props.isMenuView,
    showFlag: 0,
    boxVisibility: false,
    fileName: "",
    scrollTop: 0,
    thumbnailTop: constants.THUMBNAILTOP,
    menuTop: constants.MENUTOP,
    centerIndex: -1
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  props,
  parent,
  nextTick,
  emit,
  t,
  constants,
  vm,
  mode
}) => {
  Object.assign(api2, {
    state,
    touchstart: touchstart({
      state,
      mode,
      api: api2
    }),
    touchmove: touchmove(state),
    touchend: touchend(state),
    reset: reset(state),
    prev: prev({
      state,
      api: api2,
      vm
    }),
    next: next({
      state,
      api: api2,
      vm
    }),
    getImageWidth: getImageWidth({
      state,
      parent,
      props,
      nextTick,
      vm,
      mode
    }),
    handleVisible: handleVisible({
      state,
      emit,
      props
    }),
    handleActions: handleActions(state, props, emit),
    handleImgLoad: handleImgLoad(state),
    handleMouseDown: handleMouseDown(state),
    computedIsFirst: computedIsFirst(state),
    computedIsSingle: computedIsSingle(props),
    handleImgError: handleImgError({
      state,
      t
    }),
    computedIsLast: computedIsLast({
      state,
      props
    }),
    watchVisible: watchVisible(state),
    deviceSupportUninstall: deviceSupportUninstall({
      state,
      mode
    }),
    computedCurrentImg: computedCurrentImg({
      state,
      api: api2
    }),
    computedImgStyle: computedImgStyle({
      state,
      constants
    }),
    computeZIndex: computeZIndex({
      constants,
      props
    }),
    hide: hide({
      props,
      api: api2,
      state
    }),
    deviceSupportInstall: deviceSupportInstall({
      state,
      api: api2,
      mode
    }),
    toggleMode: toggleMode({
      state,
      constants,
      api: api2
    }),
    swipeRight: swipeRight({
      api: api2,
      state,
      emit
    }),
    swipeLeft: swipeLeft({
      api: api2,
      state,
      emit
    }),
    handleDelete: handleDelete({
      api: api2,
      state,
      emit
    }),
    activeItems: activeItems(state),
    imagePreview: imagePreview(state),
    initPage: initPage({
      state,
      nextTick,
      api: api2
    }),
    beforeDestroy: beforeDestroy({
      api: api2,
      state
    }),
    itemClick: itemClick({
      state,
      vm,
      nextTick
    }),
    selectOption: selectOption({
      state,
      api: api2
    }),
    langClick: langClick(state),
    getLastPrev: getLastPrev({
      state,
      vm
    }),
    getDefaultPrev: getDefaultPrev({
      state,
      vm
    }),
    getCenterPosition: getCenterPosition({
      state,
      vm
    }),
    filterImageUrl: filterImageUrl()
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props,
  nextTick,
  vm
}) => {
  watch(() => state.index, value => {
    if (!props.keepStyle) {
      api2.reset();
    }
    props.onSwitch(value);
  }, {
    immediate: true
  });
  watch(() => props.previewVisible, value => {
    api2.watchVisible(value);
    if (props.previewVisible || state.mfPreviewVisible) {
      nextTick(() => {
        api2.getImageWidth();
      });
    }
  }, {
    immediate: true
  });
  watch(() => state.currentImg, value => {
    nextTick(() => {
      const index = state.urlList.indexOf(value);
      let imageIns = vm.$refs[`img_${index}`];
      if (Array.isArray(imageIns)) {
        imageIns = imageIns[0];
      }
      if (imageIns) {
        state.loading = !imageIns.complete;
      }
    });
  }, {
    immediate: true
  });
  watch(() => state.isImagePreview, () => nextTick(() => {
    api2.getImageWidth();
  }));
  watch(() => props.urlList, () => {
    state.urlList = props.urlList;
  }, {
    deep: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  reactive,
  watch,
  inject,
  provide
}, {
  t,
  parent,
  nextTick,
  emit,
  constants,
  vm,
  mode
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    api: api2,
    mode,
    props,
    constants,
    inject
  });
  initApi({
    api: api2,
    state,
    props,
    parent,
    nextTick,
    emit,
    t,
    constants,
    vm,
    mode
  });
  initWatch({
    watch,
    state,
    api: api2,
    props,
    nextTick,
    vm
  });
  onMounted(api2.deviceSupportInstall);
  onUpdated(() => {
    if (props.asyncClose) {
      setTimeout(() => {
        state.previewVisible = false;
        emit("update:preview-visible", false);
      }, 3e3);
    }
  });
  onBeforeUnmount(api2.beforeDestroy);
  provide("change-size", true);
  return api2;
};
export { api, renderless };