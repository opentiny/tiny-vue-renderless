import "../../../chunk-G2ADBYYC.js";
import { extend } from './../../object.js';
import { on, off } from './../dom.js';
import screenfull from './screenfull.js';
const defaults = {
  callback: () => void 0,
  fullscreenClass: "fullscreen",
  pageOnly: false,
  teleport: false
};
let token;
let parentNode;
const setStyle = (element, style) => {
  element.style.position = style.position;
  element.style.left = style.left;
  element.style.top = style.top;
  element.style.width = style.width;
  element.style.height = style.height;
  element.style.zIndex = style.zIndex;
};
const resetElement = api2 => {
  const targetEle = api2.targetElement;
  if (targetEle) {
    targetEle.classList.remove(api2.opts.fullscreenClass);
    if (api2.opts.teleport || api2.opts.pageOnly) {
      if (api2.opts.teleport && parentNode) {
        parentNode.insertBefore(targetEle, token);
        parentNode.removeChild(token);
      }
      if (targetEle.__styleCache) {
        setStyle(targetEle, targetEle.__styleCache);
      }
    }
  }
};
const setTargetStyle = (target, options) => {
  const {
    position,
    left,
    top,
    width,
    height,
    zIndex
  } = target.style;
  target.classList.add(options.fullscreenClass);
  if (options.teleport || options.pageOnly) {
    const style = {
      position: "fixed",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%"
    };
    target.__styleCache = {
      position,
      left,
      top,
      width,
      height,
      zIndex
    };
    options.zIndex && (style.zIndex = options.zIndex);
    setStyle(target, style);
  }
};
const getOptions = (screenfull2, options, target) => {
  options = extend({}, defaults, options);
  if (target === document.body) {
    options.teleport = false;
  }
  if (!screenfull2.isEnabled) {
    options.pageOnly = true;
  }
  return options;
};
const api = {
  targetElement: null,
  opts: null,
  isEnabled: screenfull.isEnabled,
  isFullscreen: false,
  toggle(target, options, force) {
    if (force === void 0) {
      return !this.isFullscreen ? this.request(target, options) : this.exit();
    }
    return force ? this.request(target, options) : this.exit();
  },
  request(targetEle, options) {
    if (this.isFullscreen) {
      return Promise.resolve();
    }
    if (!targetEle) {
      targetEle = document.body;
    }
    this.opts = getOptions(screenfull, options, targetEle);
    setTargetStyle(targetEle, this.opts);
    if (this.opts.teleport) {
      parentNode = targetEle.parentNode;
      if (parentNode) {
        token = document.createComment("fullscreen-token");
        parentNode.insertBefore(token, targetEle);
        document.body.appendChild(targetEle);
      }
    }
    if (this.opts.pageOnly) {
      const keypressCallback = e => {
        if (e.key === "Escape") {
          off(document, "keyup", keypressCallback);
          this.exit();
        }
      };
      this.isFullscreen = true;
      this.targetElement = targetEle;
      off(document, "keyup", keypressCallback);
      on(document, "keyup", keypressCallback);
      if (this.opts.callback) {
        this.opts.callback(this.isFullscreen);
      }
      return Promise.resolve();
    } else {
      const fullScreenCallback = () => {
        if (!screenfull.isFullscreen) {
          screenfull.off("change", fullScreenCallback);
          resetElement(this);
        }
        this.isFullscreen = screenfull.isFullscreen;
        this.targetElement = !this.opts.teleport ? screenfull.targetElement : targetEle || null;
        if (this.opts.callback) {
          this.opts.callback(screenfull.isFullscreen);
        }
      };
      screenfull.on("change", fullScreenCallback);
      return screenfull.request(this.opts.teleport ? document.body : targetEle);
    }
  },
  exit() {
    if (!this.isFullscreen) {
      return Promise.resolve();
    }
    if (this.opts.pageOnly) {
      resetElement(this);
      this.isFullscreen = false;
      this.targetElement = null;
      if (this.opts.callback) {
        this.opts.callback(this.isFullscreen);
      }
      return Promise.resolve();
    }
    return screenfull.exit();
  }
};
api.support = api.isEnabled;
api.getState = () => api.isFullscreen;
api.enter = api.request;
var apis_default = api;
export { apis_default as default };