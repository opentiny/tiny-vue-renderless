import "../chunk-G2ADBYYC.js";
import { extend } from './../common/object.js';
import { isNull } from './../common/type.js';
import { xss } from './../common/xss.js';
import { set } from './../chart-core/deps/utils.js';
import { on, off } from './../common/deps/dom.js';
import PopupManager from './../common/deps/popup-manager.js';
const init = ({
  api,
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
}) => () => {
  UploaderDfls.enableMultiUpload = {
    file: true,
    image: true
  };
  UploaderDfls.handler = api.uploaderDflsHandler;
  UploaderDfls.imagePasteFailCallback = props.imagePasteFailCallback;
  defaultOptions.modules.toolbar.handlers = api.handlers();
  state.innerOptions = extend(true, {}, defaultOptions, props.globalOptions, props.options);
  if (props.imageUpload) {
    state.innerOptions.imageUpload = props.imageUpload;
  } else {
    state.innerOptions.uploadOption.imageUploadToServer = false;
  }
  if (props.fileUpload) {
    state.innerOptions.fileUpload = extend(true, {}, {
      httpRequest: service && service.network.request
    }, props.fileUpload, {
      url: xss.filterUrl(state.fileUploadUrl)
    });
  }
  api.setToolbarTips();
  const {
    current
  } = useBreakpoint();
  if (current.value === "default") {
    state.innerOptions.modules.toolbar = simpleToolbar;
  }
  const quill = new FluentEditor(vm.$refs.editor, state.innerOptions);
  quill.emitter.on("file-change", api.fileOperationToSev);
  state.quill = Object.freeze(quill);
  setTimeout(api.setToolbarTitle);
  let insertTableButton = vm.$el.querySelector(".ql-better-table");
  const tableModule = state.quill.getModule("better-table");
  insertTableButton && (insertTableButton.onclick = (event, row = 3, col = 3) => {
    tableModule.insertTable(row, col);
  });
  let fullscreenButton = vm.$el.querySelector(".ql-fullscreen");
  fullscreenButton && (fullscreenButton.onclick = api.keyDownHandler);
  state.quill.enable(false);
  state.quill.on("selection-change", api.selectionChange);
  state.quill.on("text-change", api.textChange);
  if (state.content) {
    if (props.dataType) {
      state.quill.setContents(api.stringToJson(state.content));
    } else {
      let temp = xss.filterHtml(state.content);
      state.quill.clipboard.dangerouslyPasteHTML(temp);
    }
    api.textChange();
  }
  if (!props.disabled) {
    state.quill.enable(true);
  }
  api.handleComposition();
  emit("ready", state.quill);
};
const checkTableISEndElement = element => {
  if (element.children.length > 1) {
    return checkTableISEndElement(element.children[element.children.length - 1]);
  } else {
    return element.children[0] instanceof HTMLTableElement;
  }
};
const isSvg = str => {
  return str.trim().startsWith("<svg");
};
const setIcons = ({
  api,
  vm,
  iconOption,
  FluentEditor,
  keys = []
}) => {
  var _a;
  for (const key in iconOption) {
    if (Object.hasOwnProperty.call(iconOption, key)) {
      const option = iconOption[key];
      if (typeof option === "object") {
        setIcons({
          api,
          vm,
          iconOption: option,
          FluentEditor,
          keys: [...keys, key]
        });
      } else {
        const outerHtml = isSvg(option) ? option : api.getOuterHTML((_a = vm.$refs[option]) == null ? void 0 : _a[0]);
        if (option && outerHtml) {
          const k = keys.length ? [...keys, key].join(".") : key;
          set(FluentEditor.imports["ui/icons"], k.replace(/default/, ""), outerHtml);
        }
      }
    }
  }
};
const setToolbarTips = ({
  api,
  vm,
  FluentEditor,
  iconOption
}) => () => {
  setIcons({
    api,
    vm,
    iconOption,
    FluentEditor
  });
};
const getOuterHTML = () => el => el && el.outerHTML;
const keyDownHandler = ({
  state
}) => e => {
  if (e.keyCode) {
    if (e.keyCode === 27 && state.isFullscreen) {
      state.isFullscreen = !state.isFullscreen;
    }
  } else {
    state.isFullscreen = !state.isFullscreen;
  }
};
const addFullscreenchange = ({
  api
}) => () => {
  on(document, "keydown", api.keyDownHandler);
};
const removeFullscreenchange = ({
  api
}) => () => {
  off(document, "keydown", api.keyDownHandler);
  api.keyDownHandler = null;
};
const handleComposition = ({
  state,
  api
}) => () => {
  on(state.quill.root, "compositionstart", api.handleCompositionstart);
  on(state.quill.root, "compositionend", api.handleCompositionend);
};
const removeHandleComposition = ({
  state,
  api
}) => () => {
  off(state.quill.root, "compositionstart", api.handleCompositionstart);
  off(state.quill.root, "compositionend", api.handleCompositionend);
};
const handleCompositionstart = ({
  state
}) => () => {
  state.quill.root.classList.remove("ql-blank");
};
const handleCompositionend = ({
  state
}) => event => {
  if (state.quill.editor.isBlank()) {
    if (state.quill.getLength() > 0 && event.data.length > 0) {
      let data = event.data;
      state.quill.setContents([{
        insert: data
      }]);
      state.quill.setSelection(data.length);
      state.quill.root.classList.remove("ql-blank");
    } else {
      state.quill.root.classList.add("ql-blank");
    }
  } else {
    let data = state.quill.container.innerHTML,
      range = state.quill.getSelection(true);
    const [mentionItem, offset] = state.quill.getLeaf(range.index);
    if (mentionItem.statics.blotName === "break" || mentionItem.statics.blotName === "text" && offset === 0) {
      state.quill.clipboard.dangerouslyPasteHTML(data);
    }
    if (mentionItem.statics.blotName === "break") {
      state.quill.setSelection(range.index + event.data.length);
    } else {
      let pattern = /[\u4E00-\u9FA5\uf900-\ufa2d]/,
        flag;
      if (pattern.test(event.data)) {
        flag = true;
      }
      if (flag) {
        state.quill.setSelection(range.index);
      } else {
        if (offset !== 0) {
          state.quill.setSelection(range.index);
        } else {
          if (event.data.length > 1) {
            state.quill.setSelection(range.index + 1);
          } else {
            state.quill.setSelection(range.index);
          }
        }
      }
    }
    state.quill.root.classList.remove("ql-blank");
  }
};
const undoHandler = ({
  state
}) => () => {
  const betterTableModule = state.quill.getModule("better-table");
  if (betterTableModule && betterTableModule.table) {
    betterTableModule.hideTableTools();
  }
  state.quill.history.undo();
};
const redoHandler = ({
  state
}) => () => {
  const betterTableModule = state.quill.getModule("better-table");
  if (betterTableModule && betterTableModule.table) {
    betterTableModule.hideTableTools();
  }
  state.quill.history.redo();
};
const lineheightHandler = ({
  state,
  FluentEditor
}) => value => {
  state.quill.format("lineheight", value, FluentEditor.sources.USER);
};
const fileHandler = ({
  api,
  state
}) => () => {
  const option = state.quill.options.uploadOption;
  const accept = option && option.fileAccept;
  api.inputFileHandler("file", accept);
};
const imageHandler = ({
  api,
  state
}) => () => {
  const option = state.quill.options.uploadOption;
  const accept = option && option.imageAccept;
  api.inputFileHandler("image", accept);
};
const inputFileHandler = ({
  state,
  UploaderDfls
}) => (type, accept) => {
  const defaultMIMETypes = state.quill.uploader.options[type].join(", ");
  const mimeTypes = accept || defaultMIMETypes;
  const betterToolbar = state.quill.getModule("toolbar");
  let fileInput = betterToolbar.container.querySelector(`input.ql-${type}[type=file]`);
  if (isNull(fileInput)) {
    fileInput = document.createElement("input");
    fileInput.classList.add(`ql-${type}`);
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", mimeTypes);
    if (UploaderDfls.enableMultiUpload["file"] && type === "file" || UploaderDfls.enableMultiUpload["image"] && type === "image") {
      fileInput.setAttribute("multiple", "");
    }
    fileInput.onchange = () => {
      const range = state.quill.getSelection(true);
      state.quill.uploader.upload(range, fileInput.files, type === "file");
      fileInput.value = "";
    };
    betterToolbar.container.appendChild(fileInput);
  }
  fileInput.click();
};
const uploaderDflsHandler = ({
  api,
  modules
}) => (range, files, fileFlags, rejectFlags) => {
  const fileArr = [];
  const imgArr = [];
  files.forEach((file, index) => fileFlags[index] ? fileArr.push(file) : imgArr.push(file));
  if (modules.file && (fileArr.length || rejectFlags.file)) {
    api.handleUploadFile(range, fileArr, rejectFlags.file);
  }
  if (imgArr.length || rejectFlags.image) {
    api.handleUploadImage(range, {
      file: imgArr[0],
      files: imgArr
    }, rejectFlags.image);
  }
};
const handleUploadFile = ({
  api,
  UploaderDfls
}) => (range, files, hasRejectedFile) => {
  const fileEnableMultiUpload = UploaderDfls.enableMultiUpload === true || UploaderDfls.enableMultiUpload["file"];
  api.fileOperationToSev({
    operation: "upload",
    data: fileEnableMultiUpload ? {
      files
    } : {
      file: files[0]
    },
    hasRejectedFile,
    callback: res => {
      if (!res) {
        return;
      }
      if (fileEnableMultiUpload && Array.isArray(res)) {
        res.forEach((value, index) => api.insertFileToEditor(range, files[index], value));
      } else {
        api.insertFileToEditor(range, files[0], res);
      }
    }
  });
};
const getOption = (url, headers, method, fd, callbackOK, callbackKO, callback) => {
  url = xss.filterUrl(url);
  return {
    url,
    headers,
    method,
    data: fd,
    onSuccess(res) {
      res = res.data;
      let resData = {};
      for (let key in res) {
        resData = res[key];
        break;
      }
      callbackOK(res, ({
        name,
        url: url2
      }) => {
        callback({
          data: {
            id: resData.attachmentId,
            size: resData.fileSize,
            title: name,
            src: url2
          }
        });
      });
    },
    onError(error) {
      callbackKO(error);
    }
  };
};
const getOnloadOfFileOperToSev = ({
  xmlhr,
  callbackOK,
  callback,
  callbackKO
}) => () => {
  if (xmlhr.status === 200) {
    let res = JSON.parse(xmlhr.responseText);
    let resData = {};
    for (let key in res) {
      resData = res[key];
      break;
    }
    callbackOK(res, ({
      name,
      url
    }) => {
      callback({
        data: {
          id: resData.attachmentId,
          size: resData.fileSize,
          title: name,
          src: url
        }
      });
    });
  } else {
    callbackKO({
      code: xmlhr.status,
      type: xmlhr.statusText,
      body: xmlhr.responseText
    });
  }
};
const fileOperationToSev = ({
  state
}) => event => {
  const {
    operation,
    hasRejectedFile,
    callback
  } = event;
  const {
    files,
    fileDownloadUrl
  } = event.data;
  switch (operation) {
    case "upload":
      {
        if (hasRejectedFile || !files || !files.length) {
          return;
        }
        const options = state.innerOptions.fileUpload;
        let {
          url,
          method = "POST",
          name = "file",
          headers = {}
        } = options;
        let {
          success: callbackOK,
          fail: callbackKO
        } = options;
        url = xss.filterUrl(url);
        if (!url) {
          return;
        }
        let fd = new FormData();
        fd.append(name, files[0], files[0].name);
        options.csrf && fd.append(options.csrf.token, options.csrf.hash);
        if (options.httpRequest) {
          let reqOptions = getOption(url, headers, method, fd, callbackOK, callbackKO, callback);
          let req = options.httpRequest(reqOptions);
          req && req.then && req.then(reqOptions.onSuccess, reqOptions.onError);
        } else {
          let xmlhr = new XMLHttpRequest();
          xmlhr.withCredentials = options.withCredentials !== false;
          xmlhr.open(method, url, true);
          for (let index in headers) {
            xmlhr.setRequestHeader(index, headers[index]);
          }
          xmlhr.onload = getOnloadOfFileOperToSev({
            xmlhr,
            callbackOK,
            callback,
            callbackKO
          });
          xmlhr.send(fd);
        }
        break;
      }
    case "download":
      window.open(xss.filterUrl(fileDownloadUrl)).opener = null;
      break;
    default:
      {
        break;
      }
  }
};
const handleUploadImage = ({
  state,
  api,
  FluentEditor,
  Delta,
  UploaderDfls
}) => (range, {
  file,
  files
}, hasRejectedImage) => {
  if (state.quill.options.uploadOption.imageUploadToServer) {
    const index = state.promisesData.length;
    const imageEnableMultiUpload = UploaderDfls.enableMultiUpload["image"];
    const result = {
      file,
      data: {
        files: [file]
      },
      hasRejectedImage,
      callback: res => {
        if (!res) {
          return;
        }
        state.cbNum += 1;
        state.promisesData[index].range = range;
        state.promisesData[index].imgUrlData = res;
        if (state.cbNum === state.promises.length) {
          Promise.all(state.promises).then(arr => {
            arr.forEach((data, index2) => {
              const {
                imageEnableMultiUpload: imageEnableMultiUpload2,
                imgUrlData,
                range: range2
              } = state.promisesData[index2];
              if (imgUrlData) {
                if (imageEnableMultiUpload2 && Array.isArray(imgUrlData)) {
                  imgUrlData.forEach(function (value) {
                    return api.insertImageToEditor(range2, value);
                  });
                } else {
                  api.insertImageToEditor(range2, imgUrlData);
                }
              }
            });
            state.promises = [];
            state.promisesData = [];
            state.cbNum = 0;
          });
        }
      }
    };
    if (imageEnableMultiUpload) {
      result["data"] = {
        files
      };
    }
    state.promisesData.push({
      imageEnableMultiUpload
    });
    state.promises.push(api.uploadImageToSev(result));
  } else {
    const promises = files.map(fileItem => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(fileItem);
      });
    });
    Promise.all(promises).then(images => {
      const update = images.reduce((delta, image) => {
        return delta.insert({
          image
        });
      }, new Delta().retain(range.index).delete(range.length));
      state.quill.updateContents(update, FluentEditor.sources.USER);
      state.quill.setSelection(range.index + images.length, FluentEditor.sources.SILENT);
    });
  }
};
const insertFileToEditor = ({
  state,
  FluentEditor,
  Delta
}) => (range, file, {
  data
}) => {
  const oldContent = new Delta().retain(range.index).delete(range.length);
  const videoFlag = state.quill.options.uploadOption && state.quill.options.uploadOption.isVideoPlay && /^video\/[-\w.]+$/.test(file.type);
  const insertObj = videoFlag ? {
    video: data
  } : {
    file: data
  };
  const currentContent = new Delta([{
    insert: insertObj
  }]);
  const newContent = oldContent.concat(currentContent);
  state.quill.updateContents(newContent, FluentEditor.sources.USER);
};
const insertImageToEditor = ({
  state,
  FluentEditor,
  Delta
}) => (range, {
  data
}) => {
  const {
    imageId,
    imageUrl
  } = data;
  const oldContent = new Delta().retain(range.index).delete(range.length);
  const currentContent = new Delta([{
    insert: {
      image: xss.filterUrl(imageUrl)
    },
    attributes: {
      "image-id": imageId
    }
  }]);
  const newContent = oldContent.concat(currentContent);
  state.quill.updateContents(newContent, FluentEditor.sources.USER);
};
const uploadImageToSev = ({
  state
}) => event => {
  const {
    file,
    hasRejectedImage,
    callback
  } = event;
  const {
    files
  } = event.data;
  if (hasRejectedImage) {
    return;
  }
  if (!files || !files.length) {
    return;
  }
  const options = state.innerOptions.imageUpload;
  let {
    url,
    method = "POST",
    name = "image",
    headers = {}
  } = options;
  let {
    success: callbackOK,
    fail: callbackKO
  } = options;
  url = xss.filterUrl(url);
  if (!url) {
    return;
  }
  let {
    fd = new FormData(),
    xhr = new XMLHttpRequest()
  } = {};
  fd.append(name, file, file.name);
  options.csrf && fd.append(options.csrf.token, options.csrf.hash);
  xhr.withCredentials = options.withCredentials !== false;
  xhr.open(method, url, true);
  for (let index in headers) {
    xhr.setRequestHeader(index, headers[index]);
  }
  xhr.onload = () => {
    if (xhr.status === 200) {
      let {
        res = JSON.parse(xhr.responseText),
        resData = {}
      } = {};
      for (let key in res) {
        resData = res[key];
        break;
      }
      callbackOK(res, imageUrl => {
        callback({
          data: {
            imageId: resData.attachmentId,
            imageUrl
          }
        });
      });
    } else {
      callbackKO({
        code: xhr.status,
        type: xhr.statusText,
        body: xhr.responseText
      });
    }
  };
  xhr.send(fd);
};
const handlers = ({
  api
}) => () => {
  return {
    undo: api.undoHandler,
    redo: api.redoHandler,
    lineheight: api.lineheightHandler,
    file: api.fileHandler,
    image: api.imageHandler,
    inputFile: api.inputFileHandler
  };
};
const getFileUploadUrl = ({
  service
}) => () => {
  return service ? service.common.getFileUploadUrl() : Promise.resolve("");
};
const selectionChange = ({
  state,
  emit
}) => range => {
  if (!range) {
    emit("blur", state.quill);
  } else {
    emit("focus", state.quill);
  }
};
const stringToJson = () => str => {
  let contents = "";
  try {
    contents = JSON.parse(str);
  } catch (e) {
    contents = {};
  }
  return contents;
};
const initContent = ({
  state,
  props,
  api,
  nextTick
}) => () => {
  if (state.quill) {
    const flag = state.quill.selection.hasFocus();
    if (state.content && state.content !== state.innerContent) {
      state.innerContent = state.content;
      if (props.dataType) {
        state.quill.setContents(api.stringToJson(state.content));
      } else {
        state.quill.clipboard.dangerouslyPasteHTML(xss.filterHtml(state.content));
      }
    } else if (!state.content) {
      state.quill.setText("");
    }
    nextTick(() => {
      if (!props.disabled) {
        state.quill.enable(true);
      }
      flag ? state.quill.selection.focus() : state.quill.blur();
    });
  }
};
const textChange = ({
  emit,
  vm,
  state,
  props
}) => () => {
  let contents = "";
  const quill = state.quill;
  const text = state.quill.getText();
  if (props.dataType || props.dataUpgrade) {
    contents = JSON.stringify(state.quill.getContents());
    if (contents === '{"ops":[{"insert":"\\n"}]}') {
      contents = "";
    }
  } else {
    contents = xss.filterHtml(vm.$refs.editor.children[0].innerHTML);
    if (contents === "<p><br></p>" || contents === "<p><img></p>") {
      contents = "";
    }
  }
  state.innerContent = contents;
  emit("update:modelValue", contents);
  emit("change", {
    contents,
    text,
    quill
  });
};
const mounted = ({
  api,
  props,
  state
}) => () => {
  if (props.fileUpload && !props.fileUpload.url) {
    api.getFileUploadUrl().then(url => {
      url = xss.filterUrl(url);
      state.fileUploadUrl = url;
      api.init();
    });
  } else {
    api.init();
  }
  api.addFullscreenchange();
};
const beforeUnmount = ({
  state,
  api,
  vm
}) => () => {
  const toolbar = state.quill.getModule("toolbar");
  state.quill.uploader.options && (state.quill.uploader.options.handler = null);
  state.quill.uploader.options && (state.quill.uploader.options.imagePasteFailCallback = null);
  toolbar.options && (toolbar.options.handlers = null);
  toolbar.handlers = null;
  state.quill.emitter.off("file-change", api.fileOperationToSev);
  if (state.quill.options.imageUpload) {
    state.quill.options.imageUpload.fail = null;
    state.quill.options.imageUpload.success = null;
  }
  if (state.quill.options.fileUpload) {
    state.quill.options.fileUpload.fail = null;
    state.quill.options.fileUpload.success = null;
  }
  const fileInput = toolbar.container.querySelector(`input.ql-file[type=file]`);
  const imageInput = toolbar.container.querySelector(`input.ql-image[type=file]`);
  let insertTableButton = vm.$el.querySelector(".ql-better-table");
  let fullscreenButton = vm.$el.querySelector(".ql-fullscreen");
  fileInput && (fileInput.onchange = null);
  imageInput && (imageInput.onchange = null);
  insertTableButton && (insertTableButton.onclick = null);
  fullscreenButton && (fullscreenButton.onclick = null);
  api.removeFullscreenchange();
  api.removeHandleComposition();
  state.quill.off("selection-change", api.selectionChange);
  state.quill.off("text-change", api.textChange);
  state.quill = null;
  delete state.quill;
};
const computePreviewOptions = ({
  props,
  state,
  constants,
  api
}) => () => {
  if (props.picPreview && state.previewImgUrl) {
    let previewOptions = typeof props.picPreview === "boolean" ? constants.PIC_PREVIEW_OPTIONS : props.picPreview;
    previewOptions = extend(true, {}, previewOptions, {
      urlList: [state.previewImgUrl]
    });
    let onClose = previewOptions.onClose;
    if (typeof onClose !== "function") {
      previewOptions.onClose = () => {
        api.doPreview();
      };
    } else {
      previewOptions.onClose = (...args) => {
        onClose(...args);
        api.doPreview();
      };
    }
    return previewOptions;
  }
  return {};
};
const doPreview = ({
  props,
  state,
  nextTick
}) => elem => {
  state.showPreview = false;
  state.previewImgUrl = elem && elem.nodeType ? elem.dataset.image || elem.src : "";
  state.previewImgUrl = /^data:image\/.{2,8};base64,\//.test(state.previewImgUrl) ? state.previewImgUrl : xss.filterUrl(state.previewImgUrl);
  if (props.picPreview && state.previewImgUrl) {
    nextTick(() => {
      state.showPreview = true;
    });
  }
};
const handleDblclick = ({
  props,
  api
}) => e => {
  if (props.picPreview && e && e.type === "dblclick" && [...e.target.classList].indexOf("blot-formatter__overlay") > -1 && e.target.dataset.image) {
    api.doPreview(e.target);
  }
};
const getToolbarTitle = t => {
  return [{
    selector: ".ql-undo",
    title: t("ui.fluentEditor.undo")
  }, {
    selector: ".ql-redo",
    title: t("ui.fluentEditor.redo")
  }, {
    selector: ".ql-clean",
    title: t("ui.richText.clean")
  }, {
    selector: ".ql-font",
    title: t("ui.richText.font")
  }, {
    selector: ".ql-size",
    title: t("ui.richText.size")
  }, {
    selector: ".ql-lineheight",
    title: t("ui.fluentEditor.lineheight")
  }, {
    selector: ".ql-header.ql-picker",
    title: t("ui.richText.pickerLabel")
  }, {
    selector: '.ql-header .ql-picker-item[data-value="1"]',
    title: t("ui.richText.headerPicker1")
  }, {
    selector: '.ql-header .ql-picker-item[data-value="2"]',
    title: t("ui.richText.headerPicker2")
  }, {
    selector: '.ql-header .ql-picker-item[data-value="3"]',
    title: t("ui.richText.headerPicker3")
  }, {
    selector: '.ql-header .ql-picker-item[data-value="4"]',
    title: t("ui.richText.headerPicker4")
  }, {
    selector: '.ql-header .ql-picker-item[data-value="5"]',
    title: t("ui.richText.headerPicker5")
  }, {
    selector: '.ql-header .ql-picker-item[data-value="6"]',
    title: t("ui.richText.headerPicker6")
  }, {
    selector: ".ql-header .ql-picker-item:not([data-value])",
    title: t("ui.richText.normal")
  }, {
    selector: ".ql-bold",
    title: t("ui.richText.bold")
  }, {
    selector: ".ql-italic",
    title: t("ui.richText.italic")
  }, {
    selector: ".ql-underline",
    title: t("ui.richText.underline")
  }, {
    selector: ".ql-strike",
    title: t("ui.richText.strike")
  }, {
    selector: ".ql-blockquote",
    title: t("ui.richText.blockquote")
  }, {
    selector: ".ql-code-block",
    title: t("ui.richText.codeBlock")
  }, {
    selector: '.ql-header[value="1"]',
    title: t("ui.richText.header1")
  }, {
    selector: '.ql-header[value="2"]',
    title: t("ui.richText.header2")
  }, {
    selector: '.ql-list[value="ordered"]',
    title: t("ui.richText.listOrdered")
  }, {
    selector: '.ql-list[value="bullet"]',
    title: t("ui.richText.listBullet")
  }, {
    selector: '.ql-script[value="sub"]',
    title: t("ui.richText.subScript")
  }, {
    selector: '.ql-script[value="super"]',
    title: t("ui.richText.superScript")
  }, {
    selector: '.ql-indent[value="-1"]',
    title: t("ui.richText.indent1")
  }, {
    selector: '.ql-indent[value="+1"]',
    title: t("ui.richText.indent2")
  }, {
    selector: '.ql-direction[value="rtl"]',
    title: t("ui.richText.directionRTL")
  }, {
    selector: ".ql-color",
    title: t("ui.richText.color")
  }, {
    selector: ".ql-background",
    title: t("ui.richText.background")
  }, {
    selector: ".ql-align",
    title: t("ui.richText.align")
  }, {
    selector: ".ql-align .ql-picker-item",
    title: t("ui.richText.alignPicker1")
  }, {
    selector: '.ql-align .ql-picker-item[data-value="center"]',
    title: t("ui.richText.alignPicker2")
  }, {
    selector: '.ql-align .ql-picker-item[data-value="right"]',
    title: t("ui.richText.alignPicker3")
  }, {
    selector: ".ql-link",
    title: t("ui.richText.link")
  }, {
    selector: ".ql-image",
    title: t("ui.richText.image")
  }, {
    selector: ".ql-video",
    title: t("ui.richText.video")
  }, {
    selector: ".ql-file",
    title: t("ui.richText.file")
  }, {
    selector: ".ql-better-table",
    title: t("ui.richText.betterTable")
  }, {
    selector: ".ql-fullscreen",
    title: t("ui.richText.fullscreen")
  }];
};
const setToolbarTitle = ({
  state,
  t
}) => () => {
  const tips = getToolbarTitle(t);
  const container = state.quill.container.parentNode;
  for (let i = 0, l = tips.length; i < l; i++) {
    const targetDom = container.querySelector(`.ql-formats ${tips[i].selector}`);
    targetDom && targetDom.setAttribute("title", tips[i].title);
  }
};
const computeZIndex = ({
  constants,
  props
}) => () => props.zIndex === constants.EDITOR_FULLSCREEN_OPTIONS || props.zIndex < 1 ? PopupManager.nextZIndex() : props.zIndex;
export { addFullscreenchange, beforeUnmount, checkTableISEndElement, computePreviewOptions, computeZIndex, doPreview, fileHandler, fileOperationToSev, getFileUploadUrl, getOuterHTML, handleComposition, handleCompositionend, handleCompositionstart, handleDblclick, handleUploadFile, handleUploadImage, handlers, imageHandler, init, initContent, inputFileHandler, insertFileToEditor, insertImageToEditor, keyDownHandler, lineheightHandler, mounted, redoHandler, removeFullscreenchange, removeHandleComposition, selectionChange, setToolbarTips, setToolbarTitle, stringToJson, textChange, undoHandler, uploadImageToSev, uploaderDflsHandler };