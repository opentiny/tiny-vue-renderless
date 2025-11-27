import "../chunk-G2ADBYYC.js";
import { showDialog, computedUploadSuccess, closeSuccessTips, computedUploadError, progressEvent, computedErrorNumTips, beforeAvatarUpload, handleAvatarSuccess, handleExceed, errorEvent, watchWithCredentials, abort, computedErrorSizeTips, computedErrorTypeTips, computedFileName, computedFileStatus, computedFileWords, computedFileSize, computedLimitSizeTips, computedLimitTypeTips, computedLimitCountTips, computedTipsTitleText, closeErrorTips, watchUploaFileType, watchMaxUploadFileSize, watchAccept, computedUploadButtonText, computedUploadsButtonText, watchDisabled, watchMultiple, watchLimit, watchAction, watchHeaders, uploadSubmit, closeDialog, computedSetDialogTitle, computedCancel, computedconfirm, fileUploadChange, deleteFile } from './index.js';
import { formatFileSize } from './../common/string.js';
const api = ["state", "closeSuccessTips", "abort", "beforeAvatarUpload", "beforeRemove", "handleAvatarSuccess", "handleExceed", "errorEvent", "progressEvent", "closeErrorTips", "uploadSubmit", "showDialog", "closeDialog", "fileUploadChange", "formatFileSize", "deleteFile"];
const initState = ({
  reactive,
  props,
  computed,
  api: api2
}) => reactive({
  errorTips: [],
  uploadList: [],
  successTips: [],
  limit: props.limit,
  isShowDialog: false,
  accept: props.accept,
  action: props.action,
  headers: props.headers,
  disabled: props.disabled,
  multiple: props.multiple,
  uploadFileType: props.uploadFileType,
  withCredentials: props.withCredentials,
  maxUploadFileSize: props.maxUploadFileSize,
  tipsTitle: [void 0, void 0, void 0],
  fileSize: computed(() => api2.computedFileSize()),
  fileName: computed(() => api2.computedFileName()),
  fileStatus: computed(() => api2.computedFileStatus()),
  // tiny新增
  fileWords: computed(() => api2.computedFileWords()),
  cancelButtonText: computed(() => api2.computedCancel()),
  submitButtonText: computed(() => api2.computedconfirm()),
  errorNumTips: computed(() => api2.computedErrorNumTips()),
  dialogTitle: computed(() => api2.computedSetDialogTitle()),
  errorSizeTips: computed(() => api2.computedErrorSizeTips()),
  tipsTitleText: computed(() => api2.computedTipsTitleText()),
  limitTypeTips: computed(() => api2.computedLimitTypeTips()),
  uploadErrorTips: computed(() => api2.computedUploadError()),
  errorTypeTips: computed(() => api2.computedErrorTypeTips()),
  limitSizeTips: computed(() => api2.computedLimitSizeTips()),
  limitCountTips: computed(() => api2.computedLimitCountTips()),
  uploadSuccessTips: computed(() => api2.computedUploadSuccess()),
  uploadButtonText: computed(() => api2.computedUploadButtonText()),
  uploadsButtonText: computed(() => api2.computedUploadsButtonText())
});
const initApi = ({
  api: api2,
  state,
  refs,
  emit,
  props,
  constants,
  t
}) => {
  Object.assign(api2, {
    state,
    formatFileSize,
    abort: abort(refs),
    showDialog: showDialog(state),
    watchLimit: watchLimit(state),
    watchAction: watchAction(state),
    uploadSubmit: uploadSubmit(refs),
    watchAccept: watchAccept(state),
    progressEvent: progressEvent(emit),
    watchHeaders: watchHeaders(state),
    watchMultiple: watchMultiple(state),
    watchDisabled: watchDisabled(state),
    closeErrorTips: closeErrorTips(state),
    deleteFile: deleteFile({
      emit,
      state,
      props
    }),
    errorEvent: errorEvent({
      emit,
      state
    }),
    closeSuccessTips: closeSuccessTips(state),
    fileUploadChange: fileUploadChange(state),
    closeDialog: closeDialog({
      refs,
      state
    }),
    handleExceed: handleExceed({
      emit,
      state
    }),
    watchUploaFileType: watchUploaFileType(state),
    beforeAvatarUpload: beforeAvatarUpload({
      props,
      state
    }),
    watchWithCredentials: watchWithCredentials(state),
    computedFileName: computedFileName({
      constants,
      t
    }),
    computedFileSize: computedFileSize({
      constants,
      t
    }),
    computedCancel: computedCancel({
      constants,
      props,
      t
    }),
    computedFileStatus: computedFileStatus({
      constants,
      t
    }),
    computedFileWords: computedFileWords({
      t
    }),
    computedconfirm: computedconfirm({
      constants,
      props,
      t
    }),
    computedUploadError: computedUploadError({
      constants,
      t
    }),
    computedErrorNumTips: computedErrorNumTips({
      constants,
      t
    }),
    handleAvatarSuccess: handleAvatarSuccess({
      api: api2,
      emit,
      state
    }),
    computedErrorTypeTips: computedErrorTypeTips({
      constants,
      t
    }),
    computedErrorSizeTips: computedErrorSizeTips({
      constants,
      t
    }),
    computedLimitSizeTips: computedLimitSizeTips({
      constants,
      t
    }),
    computedLimitTypeTips: computedLimitTypeTips({
      constants,
      t
    }),
    computedTipsTitleText: computedTipsTitleText({
      constants,
      t
    }),
    computedUploadSuccess: computedUploadSuccess({
      constants,
      t
    }),
    computedLimitCountTips: computedLimitCountTips({
      constants,
      t
    }),
    watchMaxUploadFileSize: watchMaxUploadFileSize({
      constants,
      state
    }),
    computedUploadsButtonText: computedUploadsButtonText({
      constants,
      t
    }),
    computedSetDialogTitle: computedSetDialogTitle({
      constants,
      props,
      t
    }),
    computedUploadButtonText: computedUploadButtonText({
      constants,
      props,
      t
    })
  });
};
const initWatch = ({
  watch,
  props,
  api: api2
}) => {
  watch(() => props.withCredentials, api2.watchWithCredentials, {
    immediate: true
  });
  watch(() => props.uploadFileType, api2.watchUploaFileType, {
    immediate: true
  });
  watch(() => props.maxUploadFileSize, api2.watchMaxUploadFileSize, {
    immediate: true
  });
  watch(() => props.accept, api2.watchAccept, {
    immediate: true
  });
  watch(() => props.disabled, api2.watchDisabled, {
    immediate: true
  });
  watch(() => props.multiple, api2.watchMultiple, {
    immediate: true
  });
  watch(() => props.action, api2.watchAction, {
    immediate: true
  });
  watch(() => props.headers, api2.watchHeaders, {
    immediate: true
  });
  watch(() => props.limit, api2.watchLimit, {
    immediate: true
  });
};
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  constants,
  emit,
  refs
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    props,
    computed,
    api: api2
  });
  initApi({
    api: api2,
    state,
    refs,
    emit,
    props,
    constants,
    t
  });
  initWatch({
    watch,
    props,
    api: api2
  });
  return api2;
};
export { api, renderless };