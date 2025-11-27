import "../chunk-G2ADBYYC.js";
import { xss } from './../common/xss.js';
import { addResizeListener, removeResizeListener } from './../common/deps/resize-event.js';
const parsePercentage = () => val => parseInt(val, 10);
const handleClick = ({
  props,
  api,
  parent
}) => (e, file) => {
  e.preventDefault();
  if (parent.state.isEdm) {
    const {
      downloadFile: downloadFile2
    } = api.getApi();
    props.openDownloadFile && downloadFile2 && downloadFile2(file);
  } else {
    props.openDownloadFile && api.downloadFile(file);
  }
  return props.handlePreview && props.handlePreview(file);
};
const downloadFile = service => file => {
  const data = file && file.response && file.response.data;
  let responseFile;
  if (Array.isArray(data)) {
    responseFile = data[0];
  } else if (data && typeof data === "object") {
    for (let key in data) {
      responseFile = data[key];
      break;
    }
  }
  if (responseFile) {
    service.getFileDownloadUrl().then(url => {
      window.open(xss.filterUrl(url + "&id=" + responseFile.attachmentId + "&type=AttachmentDemo")).opener = null;
    });
  } else if (file.url) {
    window.open(xss.filterUrl(file.url)).opener = null;
  } else {
    throw new Error("[TINY Error][FileUpload]file.url must not be empty");
  }
};
const picturefilePreview = state => index => {
  state.startPostion = index;
  state.shows = true;
};
const getDeleteData = emit => data => {
  emit("remove", data);
};
const showOperatePanel = ({
  state
}) => ({
  file
}) => {
  state.currentFile = file;
  state.showPanel = true;
};
const reUpload = ({
  emit,
  props,
  parent
}) => file => {
  parent.state.isEdm ? emit("start", [file && file.raw], "", true) : props.handleReUpload && props.handleReUpload(file);
};
const addPlayEventListener = ({
  type,
  el
}, fn) => el && el.addEventListener(type, fn);
const removePlayEventListener = ({
  type,
  el
}, fn) => el && el.removeEventListener(type, fn);
const play = ({
  vm,
  api,
  props
}) => ({
  file,
  index,
  type
}) => {
  if (props.isHwh5) {
    return props.triggerPlay(file, type, "play");
  }
  const videoOrAudioEle = vm.$refs[type + (file.uid || index)] && vm.$refs[type + (file.uid || index)][0];
  if (file.isPlay) return api.pause({
    file,
    index,
    type
  });
  if (videoOrAudioEle && videoOrAudioEle.play) {
    file.playEvent = () => {
      if (file) {
        file.isPlay = false;
        removePlayEventListener({
          type: "ended",
          el: videoOrAudioEle
        }, file.playEvent);
      }
    };
    file.el = videoOrAudioEle;
    removePlayEventListener({
      type: "ended",
      el: videoOrAudioEle
    }, file.playEvent);
    addPlayEventListener({
      type: "ended",
      el: videoOrAudioEle
    }, file.playEvent);
    vm.$set(file, "isPlay", true);
    videoOrAudioEle.play();
  }
};
const pause = ({
  vm,
  props
}) => ({
  file,
  index,
  type
}) => {
  if (props.isHwh5) {
    return props.triggerPlay(file, type, "pause");
  }
  const videoOrAudioEle = vm.$refs[type + (file.uid || index)] && vm.$refs[type + (file.uid || index)][0];
  if (videoOrAudioEle && videoOrAudioEle.pause) {
    removePlayEventListener({
      type: "ended",
      el: videoOrAudioEle
    }, file.playEvent);
    file.isPlay = false;
    videoOrAudioEle.pause();
  }
};
const handleLoadedmetadata = ({
  vm
}) => ({
  e,
  file
}) => {
  var _a, _b;
  vm.$set(file, "totalSecond", parseInt((_a = e.target) == null ? void 0 : _a.duration));
  vm.$set(file, "currentSecond", parseInt((_b = e.target) == null ? void 0 : _b.currentTime));
};
const handleTimeupdate = () => ({
  e,
  file
}) => {
  var _a;
  file.currentSecond = parseInt((_a = e.target) == null ? void 0 : _a.currentTime);
};
const getFileType = () => ({
  file
}) => file.name && file.name.split(".")[file.name.split(".").length - 1].toLowerCase();
const getFileIcon = ({
  constants
}) => ({
  type
}) => {
  const {
    EXCEL,
    FILE,
    PDF,
    PICTURE,
    PPT,
    TEXT,
    WORD,
    ZIP,
    VIDEO,
    AUDIO
  } = constants.FILE_TYPE;
  let iconTypes = {
    [EXCEL]: {
      name: "icon-excel-type",
      color: "#09AA71"
    },
    [FILE]: {
      name: "icon-file-type",
      color: "#09AA71"
    },
    [PDF]: {
      name: "icon-pdf-type",
      color: "#E02128"
    },
    [PICTURE]: {
      name: "icon-picture-type",
      color: "#5531EB"
    },
    [PPT]: {
      name: "icon-ppt-type",
      color: "#E02128"
    },
    [TEXT]: {
      name: "icon-text-type",
      color: "#2CB8C9"
    },
    [WORD]: {
      name: "icon-word-type",
      color: "#0067D1"
    },
    [ZIP]: {
      name: "icon-zip-type",
      color: "#2CB8C9"
    },
    [VIDEO]: {
      name: "icon-video-type",
      color: "#0067D1"
    },
    [AUDIO]: {
      name: "icon-audio",
      color: "#5531EB"
    },
    default: {
      name: "icon-other-type",
      color: "#9185F0"
    }
  };
  for (const typeName in iconTypes) {
    if (Object.hasOwnProperty.call(iconTypes, typeName)) {
      const typeValue = iconTypes[typeName];
      delete iconTypes[typeName];
      typeName.split("/").forEach(type2 => iconTypes[type2] = typeValue);
    }
  }
  return iconTypes[type] || iconTypes.default;
};
const remove = ({
  emit
}) => ({
  file
}) => emit("remove", file);
const calcUploadListLiWidth = ({
  vm,
  nextTick,
  props,
  constants
}) => () => {
  const {
    listType
  } = props;
  const {
    LIST_TYPE
  } = constants;
  nextTick(() => {
    const uploadListEle = vm.$refs.uploadList;
    const uploadListLiEle = uploadListEle && uploadListEle.querySelectorAll('[data-tag="tiny-upload-list-item"]');
    if (!uploadListEle || !(uploadListLiEle && uploadListLiEle[0])) return;
    if (listType === LIST_TYPE.TEXT || listType === LIST_TYPE.SAAS) {
      const {
        minWidth
      } = window.getComputedStyle(uploadListLiEle && uploadListLiEle[0]);
      const marginRight = 8;
      const num = Math.floor(uploadListEle.offsetWidth / (parseFloat(minWidth) + marginRight));
      Array.from(uploadListLiEle).forEach((li, index) => {
        if (!((index + 1) % num) || num === 1) {
          li.style.marginRight = 0;
          li.style.width = `${100 / num}%`;
        } else {
          li.style.marginRight = `${marginRight}px`;
          li.style.width = `calc(${100 / num}% - ${marginRight}px)`;
        }
      });
    }
  });
};
const calcVisible = ({
  props,
  constants,
  emit
}) => () => {
  const {
    SUCESS
  } = constants.FILE_STATUS;
  const isAllSuccess = props.files.every(({
    status
  }) => status === SUCESS || !status);
  emit("update:visible", !isAllSuccess);
};
const getNotSuccessFiles = ({
  props,
  constants
}) => () => {
  const {
    SUCESS
  } = constants.FILE_STATUS;
  let files = props.files;
  if (props.mode === constants.MODE.BUBBLE && props.listType === constants.LIST_TYPE.TEXT) {
    files = props.files.filter(({
      status
    }) => status !== SUCESS);
  }
  return files;
};
const chooseFile = ({
  state,
  constants
}) => type => {
  const {
    SOURCE_AUDIO
  } = constants.SOURCE_TYPE;
  if (type === SOURCE_AUDIO) {
    state.showAudioPanel = true;
  } else {
    state.showTriggerPanel = true;
  }
  state.triggerClickType = type;
};
const handleTriggerClick = ({
  state,
  props
}) => ($event, type) => {
  return new Promise(resolve => {
    let res = props.triggerClick($event, state.triggerClickType, type);
    if (res && res.then) {
      res.then(() => {
        state.showTriggerPanel = false;
        resolve();
      }).catch(() => {
        state.showTriggerPanel = false;
        state.showAudioPanel = false;
      });
    } else {
      state.showTriggerPanel = false;
      resolve();
    }
  });
};
const mounted = ({
  api,
  vm
}) => () => {
  const el = vm.$refs.uploadList;
  if (el) {
    addResizeListener(el, api.calcUploadListLiWidth);
    vm._removeResizeListener = () => removeResizeListener(el, api.calcUploadListLiWidth);
  }
};
const destroyed = ({
  props,
  vm
}) => () => {
  if (vm._removeResizeListener) {
    vm._removeResizeListener();
    vm._removeResizeListener = null;
  }
  props.files.forEach(file => {
    removePlayEventListener({
      type: "ended",
      el: file.el
    }, file.playEvent);
    delete file.playEvent;
    delete file.isPlay;
    delete file.el;
  });
};
export { calcUploadListLiWidth, calcVisible, chooseFile, destroyed, downloadFile, getDeleteData, getFileIcon, getFileType, getNotSuccessFiles, handleClick, handleLoadedmetadata, handleTimeupdate, handleTriggerClick, mounted, parsePercentage, pause, picturefilePreview, play, reUpload, remove, showOperatePanel };