import "../chunk-G2ADBYYC.js";
import { getFormData, isImage, handleChange, uploadFiles, handlePaste, upload, abort, post, handleClick, handleKeydown, handleUpdate, mounted, onBeforeDestroy } from './index.js';
const api = ["state", "isImage", "handleChange", "handlePaste", "uploadFiles", "upload", "abort", "post", "handleClick", "handleKeydown", "handleUpdate"];
const renderless = (props, {
  computed,
  inject,
  reactive,
  onMounted,
  onBeforeUnmount
}, {
  refs,
  service,
  t,
  useBreakpoint
}, {
  Modal
}) => {
  const api2 = {};
  const uploader = inject("uploader");
  const constants = uploader.$constants;
  const {
    current
  } = useBreakpoint();
  const state = reactive({
    currentBreakpoint: current,
    mouseover: false,
    reqs: {},
    uploader,
    accecpt: "",
    uploadInner: computed(() => state.uploader.$refs[constants.FILE_UPLOAD_INNER_TEMPLATE]),
    isEdm: computed(() => state.uploadInner.state.isEdm),
    openEdmDownload: computed(() => state.uploadInner.edm.download),
    headers: computed(() => {
      if (state.isEdm) {
        return {
          [constants.EDM.EDMTOKEN]: props.edmToken.edmToken || "",
          [constants.EDM.TRACEID]: props.edmToken.traceId || ""
        };
      }
    }),
    formData: {},
    cancelToken: {},
    updateId: "",
    updateInput: null,
    isStopPropagation: false
  });
  Object.assign(api2, {
    state,
    isImage,
    abort: abort({
      state,
      props,
      constants
    }),
    getFormData: getFormData({
      state,
      constants,
      props
    }),
    handleClick: handleClick({
      props,
      refs,
      state
    }),
    onBeforeDestroy: onBeforeDestroy(state),
    handleUpdate: handleUpdate({
      state,
      props
    }),
    uploadFiles: uploadFiles({
      constants,
      Modal,
      props,
      state,
      t
    }),
    post: post({
      api: api2,
      constants,
      props,
      state,
      service
    }),
    handleChange: handleChange(api2),
    handlePaste: handlePaste({
      api: api2,
      props
    }),
    handleKeydown: handleKeydown(api2),
    upload: upload({
      api: api2,
      props,
      refs
    }),
    mounted: mounted({
      state,
      props,
      api: api2
    })
  });
  onMounted(api2.mounted);
  onBeforeUnmount(api2.onBeforeDestroy);
  return api2;
};
export { api, renderless };