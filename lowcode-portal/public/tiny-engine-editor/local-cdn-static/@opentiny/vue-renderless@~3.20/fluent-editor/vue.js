import "../chunk-G2ADBYYC.js";
import { beforeUnmount, computePreviewOptions, stringToJson, doPreview, fileHandler, fileOperationToSev, getFileUploadUrl, handleDblclick, handlers, handleUploadFile, handleUploadImage, imageHandler, init, initContent, inputFileHandler, insertFileToEditor, insertImageToEditor, lineheightHandler, mounted, redoHandler, selectionChange, textChange, undoHandler, uploaderDflsHandler, uploadImageToSev, setToolbarTips, getOuterHTML, setToolbarTitle, addFullscreenchange, removeFullscreenchange, keyDownHandler, computeZIndex, handleComposition, handleCompositionstart, handleCompositionend, removeHandleComposition, checkTableISEndElement } from './index.js';
import { defaultOption, iconOption, iconOptionMobileFirst, simpleToolbar } from './options.js';
const api = ["state", "init", "initContent", "selectionChange", "textChange", "doPreview", "handleDblclick"];
const initState = ({
  api: api2,
  reactive,
  computed,
  props
}) => {
  const state = reactive({
    promises: [],
    promisesData: [],
    cbNum: 0,
    innerOptions: {},
    innerContent: "",
    fileUploadUrl: props.fileUpload && props.fileUpload.url || "",
    quill: null,
    fileInput: null,
    previewOptions: computed(() => api2.computePreviewOptions()),
    previewImgUrl: "",
    showPreview: false,
    content: props.modelValue || props.content,
    isFullscreen: false,
    zIndex: computed(() => api2.computeZIndex()),
    icons: ["IconEditorAlignCenter", "IconEditorAlignLeft", "IconEditorAlignRight", "IconEditorBackground", "IconEditorBold", "IconEditorCode", "IconEditorDeleteline", "IconEditorEraser", "IconEditorItalic", "IconEditorLeftBorder", "IconEditorList", "IconEditorListDot", "IconEditorListNum", "IconEditorMenuLeft", "IconEditorMenuRight", "IconEditorQuote", "IconEditorRedo", "IconEditorRightBorder", "IconEditorSub", "IconEditorSubtitle", "IconEditorSuper", "IconEditorTable", "IconEditorTextcolor", "IconEditorTitle", "IconEditorUnderline", "IconEditorUndo", "IconEditorVideo", "IconLink", "IconPicture", "IconCloudUpload", "IconFullscreen"]
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  service,
  emit,
  props,
  nextTick,
  FluentEditor,
  UploaderDfls,
  Delta,
  vm,
  t,
  mode
}) => {
  Object.assign(api2, {
    state,
    getFileUploadUrl: getFileUploadUrl({
      service
    }),
    selectionChange: selectionChange({
      emit,
      state
    }),
    fileOperationToSev: fileOperationToSev({
      state
    }),
    undoHandler: undoHandler({
      state
    }),
    redoHandler: redoHandler({
      state
    }),
    lineheightHandler: lineheightHandler({
      state,
      FluentEditor
    }),
    inputFileHandler: inputFileHandler({
      state,
      UploaderDfls
    }),
    insertFileToEditor: insertFileToEditor({
      state,
      FluentEditor,
      Delta
    }),
    insertImageToEditor: insertImageToEditor({
      state,
      FluentEditor,
      Delta
    }),
    uploadImageToSev: uploadImageToSev({
      state
    }),
    doPreview: doPreview({
      props,
      state,
      nextTick
    }),
    stringToJson: stringToJson({
      props
    }),
    setToolbarTips: setToolbarTips({
      api: api2,
      vm,
      FluentEditor,
      iconOption: mode === "mobile-first" ? iconOptionMobileFirst : iconOption
    }),
    getOuterHTML: getOuterHTML(),
    setToolbarTitle: setToolbarTitle({
      state,
      t
    })
  });
};
const mergeApi = args => {
  let {
    api: api2,
    state,
    service,
    emit,
    props,
    vm,
    i18n,
    watch,
    nextTick,
    useBreakpoint
  } = args;
  let {
    constants,
    FluentEditor,
    UploaderDfls,
    Delta,
    defaultOptions
  } = args;
  Object.assign(api2, {
    init: init({
      api: api2,
      emit,
      props,
      service,
      state,
      FluentEditor,
      UploaderDfls,
      defaultOptions,
      vm,
      useBreakpoint,
      simpleToolbar
    }),
    initContent: initContent({
      state,
      props,
      api: api2,
      nextTick
    }),
    fileHandler: fileHandler({
      api: api2,
      state
    }),
    imageHandler: imageHandler({
      api: api2,
      state
    }),
    uploaderDflsHandler: uploaderDflsHandler({
      api: api2,
      modules: defaultOptions.modules
    }),
    handleUploadFile: handleUploadFile({
      api: api2,
      UploaderDfls
    }),
    handleUploadImage: handleUploadImage({
      state,
      api: api2,
      FluentEditor,
      Delta,
      UploaderDfls
    }),
    handlers: handlers({
      api: api2
    }),
    mounted: mounted({
      api: api2,
      props,
      state,
      i18n,
      watch
    }),
    beforeUnmount: beforeUnmount({
      api: api2,
      state,
      vm
    }),
    computePreviewOptions: computePreviewOptions({
      props,
      state,
      constants,
      api: api2
    }),
    handleDblclick: handleDblclick({
      props,
      api: api2
    }),
    textChange: textChange({
      emit,
      vm,
      state,
      props,
      api: api2
    }),
    keyDownHandler: keyDownHandler({
      state
    }),
    computeZIndex: computeZIndex({
      constants,
      props
    }),
    addFullscreenchange: addFullscreenchange({
      api: api2
    }),
    removeFullscreenchange: removeFullscreenchange({
      api: api2
    }),
    handleComposition: handleComposition({
      state,
      api: api2
    }),
    handleCompositionstart: handleCompositionstart({
      state
    }),
    handleCompositionend: handleCompositionend({
      state
    }),
    removeHandleComposition: removeHandleComposition({
      state,
      api: api2
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props,
  vm
}) => {
  watch(() => props.modelValue, value => {
    if (checkTableISEndElement(vm.$refs.editor.children[0])) {
      state.content = value + "<p><br></p><p><br></p>";
    } else {
      state.content = value;
    }
    api2.initContent();
  });
  watch(() => props.content, value => {
    state.content = value;
    api2.initContent();
  });
  watch(() => props.disabled, value => {
    if (state.quill) {
      state.quill.enable(!value);
    }
  });
};
const renderless = (props, {
  reactive,
  watch,
  onMounted,
  onBeforeUnmount,
  computed
}, {
  service,
  emit,
  i18n,
  constants,
  nextTick,
  vm,
  t,
  useBreakpoint,
  mode
}, {
  FluentEditor
}) => {
  const api2 = {};
  const {
    DEFAULTS: UploaderDfls
  } = FluentEditor.imports["modules/uploader"];
  const Delta = FluentEditor.imports["delta"];
  const state = initState({
    reactive,
    computed,
    api: api2,
    props
  });
  const defaultOptions = defaultOption({
    FluentEditor,
    state,
    mentionObj: props.mentionObj
  });
  initApi({
    api: api2,
    state,
    service,
    emit,
    props,
    nextTick,
    FluentEditor,
    UploaderDfls,
    Delta,
    vm,
    t,
    mode
  });
  const args = {
    api: api2,
    state,
    service,
    emit,
    props,
    vm,
    i18n,
    watch,
    nextTick,
    useBreakpoint
  };
  Object.assign(args, {
    constants,
    FluentEditor,
    UploaderDfls,
    Delta,
    defaultOptions
  });
  mergeApi(args);
  initWatch({
    watch,
    state,
    api: api2,
    props,
    vm
  });
  onMounted(api2.mounted);
  onBeforeUnmount(() => {
    UploaderDfls.handler = null;
    UploaderDfls.imagePasteFailCallback = null;
    api2.beforeUnmount();
  });
  return api2;
};
export { api, renderless };