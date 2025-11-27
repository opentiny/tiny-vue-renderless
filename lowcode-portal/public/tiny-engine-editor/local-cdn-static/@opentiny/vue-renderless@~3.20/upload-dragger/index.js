import "../chunk-G2ADBYYC.js";
const onDragOver = ({ props, state }) => () => !props.disabled && (state.dragover = true);
const onDrop = ({ emit, props, state }) => (event) => {
  var _a;
  if (props.disabled || !state.uploader) {
    return;
  }
  const accept = state.uploader.accept;
  state.dragover = false;
  const files = (_a = event.dataTransfer) == null ? void 0 : _a.files;
  if (!accept) {
    emit("file", files);
    return;
  }
  const notAcceptedFiles = [];
  if (files) {
    Array.from(files).filter((file) => {
      const { type, name } = file;
      const extension = name.includes(".") ? `.${name.split(".").pop()}` : "";
      const baseType = type.replace(/\/.*$/, "");
      let isValid = accept.split(",").map((type2) => type2.trim()).filter((type2) => type2).some((type2) => {
        if (/\..+$/.test(type2)) {
          return extension === type2;
        }
        if (/\/\*$/.test(type2)) {
          return baseType === type2.replace(/\/\*$/, "");
        }
        if (/^[^/]+\/[^/]+$/.test(type2)) {
          return true;
        }
        return false;
      });
      !isValid && notAcceptedFiles.push(file);
      return isValid;
    });
    notAcceptedFiles.length && state.uploader.$emit("drop-error", notAcceptedFiles);
  }
  emit("file", files);
};
const watchDragover = ({ state, constants }) => () => {
  state.uploader.$refs[constants.FILE_UPLOAD_INNER_TEMPLATE].$emit("drag-over", state.dragover);
};
export {
  onDragOver,
  onDrop,
  watchDragover
};
