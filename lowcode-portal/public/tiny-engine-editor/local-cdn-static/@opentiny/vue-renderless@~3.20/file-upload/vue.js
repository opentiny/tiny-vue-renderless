import "../chunk-G2ADBYYC.js";
import { downloadFile as ordinaryDownload } from './../upload-list/index.js';
import { formatFileSize } from './../common/string.js';
import { initService, getNewTabPreviewUrl, previewFile, getToken, downloadFile, downloadFileSingleInner, batchSegmentUpload, segmentUpload, sliceChunk, segmentUploadInit, largeDocumentUpload, getFormData, abort, clearFiles, computedUploadDisabled, getFile, handleStart, handleProgress, handleSuccess, handleError, handleRemove, handleReUpload, handleReUploadTotal, onBeforeDestroy, submit, watchListType, watchFileList, handleClick, handleFileClick, getFileUploadUrl, updateUrl, previewImage, startUpload, getDialogConfigObj, computeDocChunkSize, updateFile, getPreviewUrlSync, beforeUpload, computedUploadingSize, clearUploadingFiles, calcUploadingFilesInfo, properFileSize, addFileToList, getDownloadFileInfo, largeDocumentDownload, sliceDownloadChunk, batchSegmentDownload, downloadFileInner, setWriterFile, afterDownload, getFileHash, modifyServiceUrlSingle, getKiaScanTip, downloadFileSingle, downloadFileBatch, downloadFileSingleHwh5, downloadAsyncPackage, validateDownloadStatus, mounted, handleChange, previewFileSingle, previewFileBatch, previewImageSingle, previewImageBatch, abortDownload, createDownloadCancelToken, handleClickFileList, computedSourcetype, getFileSourceType, encryptDialogConfirm, handleTriggerClick, closeRecordPanel, getTipMessage } from './index.js';
import { isEmptyObject } from './../common/type.js';
const api = ["state", "getNewTabPreviewUrl", "previewFile", "downloadFile", "abort", "clearFiles", "getFile", "handleStart", "handleProgress", "handleSuccess", "handleError", "handleRemove", "handleReUpload", "handleReUploadTotal", "submit", "handleClick", "handleFileClick", "getFileUploadUrl", "updateUrl", "previewImage", "updateFile", "handleChange", "abortDownload", "handleClickFileList", "handleTriggerClick", "closeRecordPanel", "encryptDialogConfirm", "formatFileSize", "getTipMessage"];
const initState = ({
  api: api2,
  reactive,
  computed,
  inject,
  ref,
  vm,
  props,
  httpRequest,
  service,
  useBreakpoint
}) => {
  const {
    current
  } = useBreakpoint();
  const state = reactive({
    url: "",
    updateId: "",
    currentDownloadFiles: "",
    tempIndex: 1,
    draging: false,
    uploadFiles: [],
    dragOver: false,
    httpRequest,
    form: inject("form", ref({
      default: ""
    })),
    listeners: vm.$listeners,
    docSize: 0,
    // unit(B)
    chunkSize: 0,
    chunkBatchLimit: 5,
    downloadChunkLimit: 5,
    batchQueue: {},
    batchQueueListen: {},
    batchCancelToken: {},
    replayAtoms: {},
    chunkUploadUrl: "",
    largeFileInfo: {},
    headers: {},
    accept: "",
    edmToken: {},
    isSuccess: false,
    singleMaxSize: 200,
    formData: {},
    showPreview: false,
    iframeUrl: "",
    fileWater: false,
    tabUrl: "",
    cacheDocuments: {},
    isEdm: computed(() => !isEmptyObject(props.edm)),
    uploadDisabled: computed(() => api2.computedUploadDisabled()),
    dialogConfigObj: computed(() => api2.getDialogConfigObj()),
    uploadingFiles: [],
    currentUploadingFileUids: [],
    uploadingSize: computed(() => api2.computedUploadingSize()),
    isEntireCheckCode: computed(() => !("isEntireCheckCode" in props.edm && props.edm.isEntireCheckCode !== true)),
    downloadBatchQueue: {},
    downloadBatchQueueListen: {},
    downloadChunkFile: {},
    downloadReplayAtoms: {},
    errorStatusCodes: [0, 401, 429],
    // 0：上传异常 401：没权限（token过期）429：超限
    hasFileInfoInterface: computed(() => service.setting.services.EDM && service.setting.services.EDM.DocumentInfoUrl),
    currentDownloadFile: "",
    isDragover: false,
    downloadCancelToken: {},
    // 取消下载token
    downloadCancelData: {},
    // 取消下载时需要清空的缓存数据
    isHwh5: computed(() => !isEmptyObject(props.hwh5)),
    selected: null,
    types: computed(() => api2.computedSourcetype()),
    triggerClickType: "",
    visible: false,
    downloadParamsWhitelist: ["docId", "wmType", "docVersion"],
    encryptDialogConfig: {
      show: false,
      selectFileMethod: null
    },
    current
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  props,
  constants,
  vm,
  $service,
  t,
  Modal,
  emit
}) => {
  Object.assign(api2, {
    state,
    sliceChunk: sliceChunk({
      state
    }),
    getFormData: getFormData({
      constants,
      props,
      state
    }),
    abort: abort({
      constants,
      vm,
      state
    }),
    handleClick: handleClick({
      constants,
      vm
    }),
    handleFileClick: handleFileClick({
      props,
      emit
    }),
    getFile: getFile(state),
    clearFiles: clearFiles(state),
    watchFileList: watchFileList({
      constants,
      state,
      props,
      api: api2
    }),
    watchListType: watchListType({
      constants,
      state,
      api: api2
    }),
    onBeforeDestroy: onBeforeDestroy(state),
    computedUploadDisabled: computedUploadDisabled({
      props,
      state
    }),
    computedUploadingSize: computedUploadingSize({
      state,
      constants
    }),
    getFileUploadUrl: getFileUploadUrl($service),
    getToken: getToken({
      constants,
      props,
      state,
      t,
      Modal
    }),
    getDialogConfigObj: getDialogConfigObj({
      props,
      state,
      t,
      constants
    }),
    computeDocChunkSize: computeDocChunkSize({
      props,
      state,
      constants
    }),
    updateFile: updateFile({
      constants,
      vm
    }),
    getPreviewUrlSync: getPreviewUrlSync({
      constants,
      props,
      state
    }),
    ordinaryDownload: ordinaryDownload($service),
    clearUploadingFiles: clearUploadingFiles({
      constants,
      state
    }),
    calcUploadingFilesInfo: calcUploadingFilesInfo({
      state,
      constants
    }),
    properFileSize: properFileSize({
      props,
      state,
      api: api2,
      constants,
      Modal,
      t
    }),
    mounted: mounted({
      vm,
      state
    }),
    previewFileSingle: previewFileSingle({
      api: api2,
      state,
      props,
      constants,
      service: $service
    }),
    previewFileBatch: previewFileBatch({
      service: $service,
      props,
      state,
      api: api2
    }),
    previewImageSingle: previewImageSingle({
      state,
      props,
      service: $service
    }),
    previewImageBatch: previewImageBatch({
      service: $service,
      api: api2
    }),
    abortDownload: abortDownload({
      state
    }),
    createDownloadCancelToken: createDownloadCancelToken({
      state,
      service: $service
    }),
    computedSourcetype: computedSourcetype({
      props,
      constants
    }),
    getFileSourceType: getFileSourceType({
      state,
      props,
      constants
    }),
    encryptDialogConfirm: encryptDialogConfirm({
      state
    }),
    getTipMessage: getTipMessage({
      t,
      api: api2,
      constants
    }),
    formatFileSize
  });
};
const mergeApi = ({
  api: api2,
  props,
  $service,
  state,
  constants,
  emit,
  mode,
  Modal,
  t,
  vm,
  CryptoJS,
  Streamsaver
}) => {
  Object.assign(api2, {
    segmentUploadInit: segmentUploadInit({
      api: api2,
      props,
      service: $service,
      state,
      constants
    }),
    segmentUpload: segmentUpload({
      api: api2,
      props,
      service: $service,
      state,
      emit,
      constants,
      CryptoJS
    }),
    addFileToList: addFileToList({
      api: api2,
      constants,
      emit,
      props,
      state,
      mode
    }),
    downloadFile: downloadFile({
      api: api2,
      state
    }),
    downloadFileSingleInner: downloadFileSingleInner({
      props,
      state,
      api: api2,
      constants
    }),
    previewImage: previewImage({
      api: api2,
      props,
      service: $service
    }),
    previewFile: previewFile({
      api: api2,
      props
    }),
    getNewTabPreviewUrl: getNewTabPreviewUrl({
      api: api2
    }),
    submit: submit({
      api: api2,
      constants,
      vm,
      props,
      state
    }),
    handleStart: handleStart({
      api: api2,
      constants,
      props,
      state,
      vm
    }),
    batchSegmentUpload: batchSegmentUpload({
      api: api2,
      constants,
      props,
      vm,
      state
    }),
    largeDocumentUpload: largeDocumentUpload({
      api: api2,
      Modal,
      state,
      emit,
      constants,
      t
    }),
    handleProgress: handleProgress({
      api: api2,
      constants,
      emit,
      state
    }),
    handleSuccess: handleSuccess({
      api: api2,
      constants,
      emit,
      Modal,
      props,
      state,
      t
    }),
    handleError: handleError({
      api: api2,
      constants,
      emit,
      state,
      props
    }),
    handleRemove: handleRemove({
      api: api2,
      emit,
      props,
      state,
      constants
    }),
    handleReUpload: handleReUpload({
      vm,
      constants
    }),
    handleReUploadTotal: handleReUploadTotal(api2),
    updateUrl: updateUrl({
      api: api2,
      props,
      state
    }),
    startUpload: startUpload({
      api: api2,
      state,
      constants,
      vm,
      Modal,
      t
    }),
    beforeUpload: beforeUpload({
      api: api2,
      props,
      Modal,
      constants,
      t,
      state
    }),
    getDownloadFileInfo: getDownloadFileInfo({
      api: api2,
      props,
      state,
      service: $service
    }),
    largeDocumentDownload: largeDocumentDownload({
      api: api2,
      state
    }),
    sliceDownloadChunk: sliceDownloadChunk({
      state
    }),
    batchSegmentDownload: batchSegmentDownload({
      state,
      api: api2
    }),
    downloadFileInner: downloadFileInner({
      api: api2,
      props,
      state
    }),
    setWriterFile: setWriterFile({
      state,
      emit,
      Streamsaver
    }),
    afterDownload: afterDownload({
      api: api2,
      state
    }),
    getFileHash: getFileHash({
      emit,
      Modal,
      constants,
      t,
      CryptoJS,
      state
    }),
    modifyServiceUrlSingle: modifyServiceUrlSingle({
      state,
      props,
      constants
    }),
    getKiaScanTip: getKiaScanTip({
      Modal,
      constants,
      t
    }),
    downloadFileSingle: downloadFileSingle({
      service: $service,
      constants,
      props,
      state,
      api: api2,
      emit
    }),
    downloadFileBatch: downloadFileBatch({
      api: api2,
      service: $service,
      props,
      state,
      emit
    }),
    downloadFileSingleHwh5: downloadFileSingleHwh5({
      state,
      props,
      emit,
      constants
    }),
    downloadAsyncPackage: downloadAsyncPackage({
      state,
      props,
      api: api2,
      constants,
      service: $service
    }),
    validateDownloadStatus: validateDownloadStatus({
      state,
      Modal
    }),
    handleChange: handleChange({
      vm,
      constants
    }),
    handleClickFileList: handleClickFileList({
      state,
      emit
    }),
    handleTriggerClick: handleTriggerClick({
      vm,
      state,
      constants,
      props,
      emit
    }),
    closeRecordPanel: closeRecordPanel({
      vm,
      constants,
      state,
      props
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props,
  $service
}) => {
  watch(() => {
    var _a;
    return (_a = props.edm) == null ? void 0 : _a.upload;
  }, value => value && api2.getToken({
    token: value.token,
    isinit: true
  }), {
    immediate: true,
    deep: true
  });
  watch(() => props.listType, api2.watchListType);
  watch(() => props.fileList, value => api2.watchFileList(value), {
    immediate: true,
    deep: true
  });
  watch(() => props.action, () => {
    if (!props.httpRequest && !state.isEdm) {
      api2.updateUrl();
    }
  }, {
    immediate: true
  });
  watch(() => state.isSuccess, value => value && $service.getSingleUploadUrl().then(url => state.url = url), {
    immediate: true
  });
  watch(() => props.edm, api2.computeDocChunkSize, {
    deep: true,
    immediate: true
  });
};
let getApi = () => ({});
const renderless = (props, {
  computed,
  inject,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  watch,
  onMounted
}, {
  t,
  vm,
  parent,
  emit,
  service,
  mode,
  constants,
  useBreakpoint
}, {
  Modal,
  CryptoJS,
  Streamsaver
}) => {
  let api2 = {};
  const $service = initService({
    props,
    service
  });
  const httpRequest = $service.httpRequest;
  const state = initState({
    reactive,
    computed,
    api: api2,
    inject,
    ref,
    vm,
    props,
    httpRequest,
    service,
    useBreakpoint
  });
  initApi({
    api: api2,
    state,
    props,
    constants,
    vm,
    $service,
    t,
    Modal,
    emit
  });
  mergeApi({
    api: api2,
    props,
    $service,
    state,
    constants,
    emit,
    mode,
    Modal,
    t,
    vm,
    CryptoJS,
    Streamsaver
  });
  getApi = () => api2;
  provide("uploader", parent);
  onMounted(api2.mounted);
  onBeforeUnmount(() => {
    api2.onBeforeDestroy();
    api2 = {};
    vm.$off("drag-over");
  });
  initWatch({
    watch,
    state,
    api: api2,
    props,
    $service
  });
  return api2;
};
export { api, getApi, renderless };