import "../../chunk-G2ADBYYC.js";
import browser from './../../common/browser.js';
import { remove } from './../static/index.js';
import { on } from './../../common/deps/dom.js';
const wheelName = browser.isDoc && /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel";
const eventStore = [];
const invoke = ({
  comp,
  type,
  cb
}, event) => {
  if (type === event.type || type === "mousewheel" && event.type === wheelName) {
    cb.call(comp, event);
  }
};
const GlobalEvent = {
  on(comp, type, cb, capture = false) {
    if (cb) {
      eventStore.push({
        comp,
        type,
        cb,
        capture
      });
    }
  },
  off(comp, type, capture = false) {
    remove(eventStore, item => item.comp === comp && item.type === type && item.capture === capture);
  },
  trigger(event) {
    eventStore.filter(item => !item.capture).forEach(item => invoke(item, event));
  },
  capture(event) {
    eventStore.filter(item => item.capture).forEach(item => invoke(item, event));
  }
};
if (browser.isDoc) {
  on(document, "keydown", GlobalEvent.trigger);
  on(document, "contextmenu", GlobalEvent.trigger);
  on(window, "mousedown", GlobalEvent.trigger);
  on(window, "mousedown", GlobalEvent.capture, true);
  on(window, "blur", GlobalEvent.trigger);
  on(window, "resize", GlobalEvent.trigger);
  on(window, wheelName, GlobalEvent.trigger);
}
var event_default = GlobalEvent;
export { event_default as default };