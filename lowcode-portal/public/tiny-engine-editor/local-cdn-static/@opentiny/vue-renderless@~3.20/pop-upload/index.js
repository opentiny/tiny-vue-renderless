import "../chunk-G2ADBYYC.js";
const computedSetDialogTitle = ({ constants, props, t }) => () => props.dialogTitle || t(constants.DIALOG_TITLE);
const computedUploadSuccess = ({ constants, t }) => () => t(constants.UPLOAD_SUCCESS);
const computedCancel = ({ constants, props, t }) => () => props.cancelButtonText || t(constants.CANCEL_BUTTTON_TEXT);
const computedconfirm = ({ constants, props, t }) => () => props.submitButtonText || t(constants.SAVE_BUTTON_TEXT);
const computedFileName = ({ constants, t }) => () => t(constants.FILE_NAME);
const computedUploadError = ({ constants, t }) => () => t(constants.UPLOAD_ERROR);
const computedFileStatus = ({ constants, t }) => () => t(constants.FILE_STATUS);
const computedFileWords = ({ t }) => () => ({
  operation: t("ui.popupload.operation"),
  waitUpload: t("ui.popupload.waitUpload"),
  success: t("ui.popupload.success"),
  uploadError: t("ui.popupload.uploadError"),
  confirmDeleteTips: t("ui.popupload.confirmDeleteTips"),
  delete: t("ui.popupload.delete")
});
const computedFileSize = ({ constants, t }) => () => t(constants.FILE_SIZE);
const computedErrorSizeTips = ({ constants, t }) => () => t(constants.ERROR_SIZE_TIPS);
const computedErrorNumTips = ({ constants, t }) => () => t(constants.ERROR_NUM_TIPS);
const computedErrorTypeTips = ({ constants, t }) => () => t(constants.ERROR_TYPE_TIPS);
const computedUploadButtonText = ({ constants, props, t }) => () => props.uploadButtonText || t(constants.UPLOAD_BUTTON_TEXT);
const computedUploadsButtonText = ({ constants, t }) => () => t(constants.UPLOADS_BUTTON_TEXT);
const computedTipsTitleText = ({ constants, t }) => () => t(constants.TIPS_TITLE_TEXT);
const computedLimitSizeTips = ({ constants, t }) => () => t(constants.LIMIT_UPLOAD_FILE_SIZE);
const computedLimitTypeTips = ({ constants, t }) => () => t(constants.LIMIT_UPLOAD_FILE_TYPE);
const computedLimitCountTips = ({ constants, t }) => () => t(constants.LIMIT_UPLOAD_FILE_NUMBER);
const fileUploadChange = (state) => (file, fileList) => state.uploadList = fileList || [];
const deleteFile = ({ emit, state, props }) => (file) => {
  let doRemove = () => {
    state.uploadList.splice(state.uploadList.indexOf(file), 1);
    emit("remove", file, state.uploadList);
  };
  if (!props.beforeRemove) {
    doRemove();
  } else if (typeof props.beforeRemove === "function") {
    const before = props.beforeRemove(file);
    if (before && before.then) {
      before.then(doRemove, (e) => e);
    } else if (before !== false) {
      doRemove();
    }
  }
};
const watchWithCredentials = (state) => (value) => state.withCredentials = value;
const uploadSubmit = (refs) => () => refs.upload.submit();
const abort = (refs) => () => refs.upload.abort();
const watchHeaders = (state) => (value) => state.headers = value;
const watchAction = (state) => (value) => state.action = value;
const watchMultiple = (state) => (value) => state.multiple = value;
const watchDisabled = (state) => (value) => state.disabled = value;
const watchAccept = (state) => (value) => state.accept = value;
const closeErrorTips = (state) => () => state.errorTips = [];
const closeSuccessTips = (state) => () => state.successTips = [];
const watchLimit = (state) => (value) => {
  state.limit = value;
  if (value !== void 0 && value > 0) {
    state.tipsTitle[0] = {
      count: value
    };
  } else {
    state.tipsTitle[0] = void 0;
  }
};
const watchUploaFileType = (state) => (value) => {
  if (!Array.isArray(value)) {
    state.tipsTitle[1] = void 0;
    return;
  }
  state.uploadFileType = value;
  state.tipsTitle[1] = {
    type: value.join(",")
  };
};
const watchMaxUploadFileSize = ({ constants, state }) => (value) => {
  state.maxUploadFileSize = value;
  if (value !== void 0 && value !== 0) {
    state.tipsTitle[2] = {
      size: Math.floor(value / 1024) + constants.KB
    };
  } else {
    state.tipsTitle[2] = void 0;
  }
};
const showDialog = (state) => () => {
  state.isShowDialog = true;
  state.uploadList = [];
};
const closeDialog = ({ refs, state }) => () => {
  state.isShowDialog = false;
  state.errorTips = [];
  state.successTips = [];
  refs.upload.clearFiles();
};
const progressEvent = (emit) => (file) => {
  emit("progress", file);
};
const errorEvent = ({ emit, state }) => (file) => {
  state.errorTips.push({ error: file });
  emit("error", file);
};
const handleExceed = ({ emit, state }) => (files, fileList) => {
  state.errorTips.push({ num: files });
  emit("exceed", files, fileList);
};
const handleAvatarSuccess = ({ api, emit, state }) => (res, file) => {
  api.deleteFile(file);
  state.successTips.push(file.name);
  emit("success", res, file);
};
const beforeAvatarUpload = ({ props, state }) => (file) => {
  if (typeof props.beforeUpload === "function") {
    return props.beforeUpload(file);
  }
  let filepath = file.name;
  let isnext = false;
  let isSize = false;
  if (state.uploadFileType && state.uploadFileType.length !== 0) {
    let arr = filepath.split(".");
    let fileend = "." + arr[arr.length - 1];
    isnext = !~state.uploadFileType.indexOf(fileend);
    if (isnext) {
      state.errorTips.push({ type: file.name });
    }
  }
  if (state.maxUploadFileSize && state.maxUploadFileSize !== 0) {
    if (file.size > state.maxUploadFileSize) {
      state.errorTips.push({ size: file.name });
      isSize = true;
    }
  }
  return !isnext && !isSize;
};
export {
  abort,
  beforeAvatarUpload,
  closeDialog,
  closeErrorTips,
  closeSuccessTips,
  computedCancel,
  computedErrorNumTips,
  computedErrorSizeTips,
  computedErrorTypeTips,
  computedFileName,
  computedFileSize,
  computedFileStatus,
  computedFileWords,
  computedLimitCountTips,
  computedLimitSizeTips,
  computedLimitTypeTips,
  computedSetDialogTitle,
  computedTipsTitleText,
  computedUploadButtonText,
  computedUploadError,
  computedUploadSuccess,
  computedUploadsButtonText,
  computedconfirm,
  deleteFile,
  errorEvent,
  fileUploadChange,
  handleAvatarSuccess,
  handleExceed,
  progressEvent,
  showDialog,
  uploadSubmit,
  watchAccept,
  watchAction,
  watchDisabled,
  watchHeaders,
  watchLimit,
  watchMaxUploadFileSize,
  watchMultiple,
  watchUploaFileType,
  watchWithCredentials
};
