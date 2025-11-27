import "../../../chunk-G2ADBYYC.js";
import staticStrUndefined from './../static/staticStrUndefined.js';
import staticDocument from './../static/staticDocument.js';
import staticWindow from './../static/staticWindow.js';
import assign from './../object/assign.js';
import arrayEach from './../array/arrayEach.js';
function isBrowseStorage(storage) {
  try {
    let testKey = "__tiny_t";
    storage.setItem(testKey, 1);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}
function isBrowseType(type) {
  return navigator.userAgent.includes(type);
}
function browse() {
  let $body, isChrome, isEdge;
  let isMobile = false;
  let result = {
    isNode: false,
    isMobile,
    isPC: false,
    isDoc: !!staticDocument
  };
  if (!staticWindow && typeof process !== staticStrUndefined) {
    result.isNode = true;
  } else {
    isEdge = isBrowseType("Edge");
    isChrome = isBrowseType("Chrome");
    isMobile = /(Android|webOS|iPhone|iPad|iPod|SymbianOS|BlackBerry|Windows Phone)/.test(navigator.userAgent);
    if (result.isDoc) {
      $body = staticDocument.body || staticDocument.documentElement;
      arrayEach(["webkit", "khtml", "moz", "ms", "o"], core => {
        result["-" + core] = !!$body[core + "MatchesSelector"];
      });
    }
    assign(result, {
      edge: isEdge,
      firefox: isBrowseType("Firefox"),
      msie: !isEdge && result["-ms"],
      safari: !isChrome && !isEdge && isBrowseType("Safari"),
      isMobile,
      isPC: !isMobile,
      isLocalStorage: isBrowseStorage(staticWindow.localStorage),
      isSessionStorage: isBrowseStorage(staticWindow.sessionStorage)
    });
  }
  return result;
}
var browse_default = browse;
export { browse_default as default };