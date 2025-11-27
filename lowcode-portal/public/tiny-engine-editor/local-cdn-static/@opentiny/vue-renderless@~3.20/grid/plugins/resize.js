import "../../chunk-G2ADBYYC.js";
import browser from './../../common/browser.js';
import { remove } from './../static/index.js';
let resizeTimeout;
let defaultInterval = 250;
const eventStore = [];
let eventHandle;
const eventListener = () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(eventHandle, defaultInterval);
};
eventHandle = () => {
  if (eventStore.length) {
    eventStore.forEach(item => {
      item.tarList.forEach(el => {
        const {
          target,
          width,
          heighe
        } = el;
        const clientWidth = target.clientWidth;
        const clientHeight = target.clientHeight;
        const rWidth = clientWidth && width !== clientWidth;
        const rHeight = clientHeight && heighe !== clientHeight;
        if (rWidth || rHeight) {
          el.width = clientWidth;
          el.heighe = clientHeight;
          requestAnimationFrame(item.callback);
        }
      });
    });
    eventListener();
  }
};
class ResizeObserverPolyfill {
  constructor(callback, resizeInterval) {
    this.tarList = [];
    this.callback = callback;
    defaultInterval = resizeInterval;
  }
  observe(targetObj) {
    if (targetObj) {
      if (!this.tarList.includes(targetObj)) {
        this.tarList.push({
          target: targetObj,
          width: targetObj.clientWidth,
          heighe: targetObj.clientHeight
        });
      }
      if (!eventStore.length) {
        eventListener();
      }
      if (!eventStore.includes(this)) {
        eventStore.push(this);
      }
    }
  }
  unobserve(target) {
    remove(eventStore, item => ~item.tarList.indexOf(target));
  }
  disconnect() {
    remove(eventStore, item => item === this);
  }
}
const Resize = browser.isDoc ? window.ResizeObserver || ResizeObserverPolyfill : ResizeObserverPolyfill;
var resize_default = Resize;
export { resize_default as default };