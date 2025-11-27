import "../../chunk-G2ADBYYC.js";
import ResizeObserver from './ResizeObserver.js';
const isServer = typeof window === "undefined";
const cacheKey = "__resizeListeners__";
const resizeHandler = entries => {
  entries.forEach(entry => {
    const listeners = entry.target[cacheKey] || [];
    if (listeners.length) {
      listeners.forEach(fn => {
        fn();
      });
    }
  });
};
const addResizeListener = (el, fn) => {
  if (isServer) {
    return;
  }
  if (!el[cacheKey]) {
    el[cacheKey] = [];
    el.__ro__ = new ResizeObserver(resizeHandler);
    el.__ro__.observe(el);
  }
  el[cacheKey].push(fn);
};
const removeResizeListener = (el, fn) => {
  if (!el || !el[cacheKey]) {
    return;
  }
  el[cacheKey].splice(el[cacheKey].indexOf(fn), 1);
  if (!el[cacheKey].length) {
    el.__ro__.disconnect();
    delete el.__ro__;
  }
};
export { addResizeListener, removeResizeListener };