import "../chunk-G2ADBYYC.js";
import { parsePercentage, handleClick, picturefilePreview, getDeleteData, downloadFile, play, pause, handleLoadedmetadata, handleTimeupdate, destroyed, showOperatePanel, getFileType, getFileIcon, mounted, calcUploadListLiWidth, reUpload, remove, handleTriggerClick, chooseFile, calcVisible, getNotSuccessFiles } from './index.js';
import { getToken, initService } from './../file-upload/index.js';
import { formatFileSize } from './../common/string.js';
import { getApi } from './../file-upload/vue.js';
const api = ["t", "state", "parsePercentage", "handleClick", "handlePreview", "picturefilePreview", "getDeleteData", "downloadFile", "play", "pause", "handleLoadedmetadata", "handleTimeupdate", "showOperatePanel", "getFileType", "getFileIcon", "reUpload", "remove", "handleTriggerClick", "chooseFile", "formatFileSize"];
const renderless = (props, {
  reactive,
  onMounted,
  onUnmounted,
  watch,
  inject,
  computed
}, {
  t,
  parent,
  mode,
  emit,
  service,
  vm,
  nextTick,
  designConfig,
  useBreakpoint
}, {
  Modal
}) => {
  var _a, _b, _c, _d, _e;
  const api2 = {
    getApi
  };
  parent = inject("uploader").$children[0];
  const constants = parent.$constants;
  const $service = initService({
    props,
    service
  });
  const {
    current
  } = useBreakpoint();
  const state = reactive({
    focusing: false,
    shows: false,
    currentBreakpoint: current,
    progressType: ((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.progressType) || "line",
    progressWidth: (designConfig == null ? void 0 : designConfig.state) && Object.hasOwnProperty.call(designConfig.state, "progressWidth") ? designConfig.state.progressWidth : "68",
    progressStrokeWidth: ((_b = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _b.progressStrokeWidth) || 4,
    tooltipDisabled: (_d = (_c = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _c.tooltipDisabled) != null ? _d : false,
    closeComponent: ((_e = designConfig == null ? void 0 : designConfig.icons) == null ? void 0 : _e.closeComponent) || "icon-del",
    preViewComponent: (designConfig == null ? void 0 : designConfig.icons) && Object.hasOwnProperty.call(designConfig.icons, "preViewComponent") ? designConfig.icons.preViewComponent : "icon-fullscreen-left",
    failUploadFileCount: computed(() => props.files.reduce((total, item) => total += item.status === "fail" ? 1 : 0, 0)),
    startPostion: 0,
    screenType: mode === "mobile",
    showPanel: false,
    showTriggerPanel: false,
    triggerClickType: "",
    showAudioPanel: false,
    files: computed(() => api2.getNotSuccessFiles()),
    currentFile: null
  });
  parent.getToken = getToken({
    constants,
    props: parent,
    state: parent.state,
    t,
    Modal
  });
  Object.assign(api2, {
    state,
    getDeleteData: getDeleteData(emit),
    parsePercentage: parsePercentage(),
    downloadFile: downloadFile($service),
    picturefilePreview: picturefilePreview(state),
    handleClick: handleClick({
      props,
      api: api2,
      parent
    }),
    play: play({
      vm,
      api: api2,
      props
    }),
    pause: pause({
      vm,
      props
    }),
    handleLoadedmetadata: handleLoadedmetadata({
      vm
    }),
    handleTimeupdate: handleTimeupdate(),
    destroyed: destroyed({
      props,
      vm
    }),
    showOperatePanel: showOperatePanel({
      state
    }),
    getFileType: getFileType(),
    getFileIcon: getFileIcon({
      constants
    }),
    mounted: mounted({
      api: api2,
      vm
    }),
    calcUploadListLiWidth: calcUploadListLiWidth({
      vm,
      nextTick,
      props,
      constants
    }),
    reUpload: reUpload({
      emit,
      props,
      parent
    }),
    remove: remove({
      emit
    }),
    handleTriggerClick: handleTriggerClick({
      state,
      props
    }),
    chooseFile: chooseFile({
      state,
      constants
    }),
    calcVisible: calcVisible({
      props,
      constants,
      emit
    }),
    getNotSuccessFiles: getNotSuccessFiles({
      props,
      constants
    }),
    formatFileSize
  });
  props.listType === constants.LIST_TYPE.DRAG_SINGLE && watch(() => props.files && props.files[0], file => {
    if (file && file.status === constants.FILE_STATUS.FAIL) {
      setTimeout(() => {
        api2.remove({
          file
        });
      }, 2e3);
    }
  }, {
    immediate: true,
    deep: true
  });
  watch(() => props.files, api2.calcUploadListLiWidth);
  if (props.mode === constants.MODE.BUBBLE && props.listType === constants.LIST_TYPE.TEXT) {
    constants && watch(() => props.files, api2.calcVisible, {
      immediate: true,
      deep: true
    });
  }
  onMounted(api2.mounted);
  onUnmounted(api2.destroyed);
  return api2;
};
export { api, renderless };