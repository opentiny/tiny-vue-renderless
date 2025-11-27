import "../chunk-G2ADBYYC.js";
const globalConfig = {
  viewportWindow: null
  // 获取真实视口的window，解决在微前端中某些bug
};
const getViewportWindow = () => globalConfig.viewportWindow || window;
var global_default = globalConfig;
export {
  global_default as default,
  getViewportWindow
};
