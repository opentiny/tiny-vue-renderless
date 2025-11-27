import "../../chunk-G2ADBYYC.js";
import { hasOwn, isNull } from './../type.js';
import globalConfig from './../global.js';
const isServer = typeof window === "undefined";
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const camelCase = name => name.replace(SPECIAL_CHARS_REGEXP, (_, separator, letter, offset) => offset ? letter.toUpperCase() : letter).replace(MOZ_HACK_REGEXP, "Moz$1");
const on = (el, event, handler, options = false) => {
  if (el && event && handler) {
    el.addEventListener(event, handler, options);
  }
};
const off = (el, event, handler, options = false) => {
  if (el && event) {
    el.removeEventListener(event, handler, options);
  }
};
const once = (el, event, fn) => {
  const listener = function () {
    if (fn) {
      fn.apply(this, arguments);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};
const hasClass = (el, clazz) => {
  if (!el || !clazz) {
    return false;
  }
  if (clazz.includes(" ")) {
    throw new Error("className should not contain space.");
  }
  if (el.classList) {
    return el.classList.contains(clazz);
  }
};
const addClass = (el, clazz = "") => {
  if (!el) {
    return;
  }
  const classes = clazz.split(" ").filter(name => name);
  classes.forEach(clsName => el.classList.add(clsName));
};
const removeClass = (el, clazz) => {
  if (!el || !clazz) {
    return;
  }
  const classes = clazz.split(" ").filter(name => name);
  classes.forEach(clsName => el.classList.remove(clsName));
};
const getStyle = (el, styleName) => {
  if (isServer) {
    return;
  }
  if (!el || !styleName) {
    return null;
  }
  styleName = camelCase(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  try {
    if (el.style[styleName]) {
      return el.style[styleName];
    }
    const computed = window.getComputedStyle(el);
    return computed ? computed[styleName] : null;
  } catch (e) {
    return el.style[styleName];
  }
};
const setStyle = (el, name, value) => {
  if (!el || !name) {
    return;
  }
  if (typeof name === "object") {
    for (const prop in name) {
      if (hasOwn.call(name, prop)) {
        setStyle(el, prop, name[prop]);
      }
    }
  } else {
    name = camelCase(name);
    el.style[name] = value;
  }
};
const isScroll = (el, vertical) => {
  if (isServer) {
    return;
  }
  const determinedDirection = !isNull(vertical);
  let overflow;
  if (determinedDirection) {
    overflow = vertical ? getStyle(el, "overflow-y") : getStyle(el, "overflow-x");
  } else {
    overflow = getStyle(el, "overflow");
  }
  return overflow.match(/(scroll|auto)/);
};
const getScrollContainer = (el, vertical) => {
  if (isServer) {
    return;
  }
  let parent = el;
  while (parent) {
    if (~[window, document, document.documentElement].indexOf(parent)) {
      return window;
    }
    if (isScroll(parent, vertical)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return parent;
};
const isInContainer = (el, container) => {
  if (isServer || !el || !container) {
    return false;
  }
  const elRect = el.getBoundingClientRect();
  let containerRect;
  if (~[window, document, document.documentElement].indexOf(container) || isNull(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }
  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};
const getDomNode = () => {
  const viewportWindow = globalConfig.viewportWindow || window;
  let documentElement = viewportWindow.document.documentElement;
  let bodyElem = viewportWindow.document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
};
const getScrollTop = el => {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
};
const stopPropagation = event => event.stopPropagation();
const preventDefault = (event, isStopPropagation) => {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
};
const overflowScrollReg = /scroll|auto|overlay/i;
const defaultRoot = isServer ? void 0 : window;
const isElement = node => node.tagName !== "HTML" && node.tagName !== "BODY" && node.nodeType === 1;
const getScrollParent = (el, root = defaultRoot) => {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const {
      overflowY
    } = window.getComputedStyle(node);
    if (overflowScrollReg.test(overflowY)) {
      return node;
    }
    node = node.parentNode;
  }
  return root;
};
const useScrollParent = ({
  onMounted,
  ref,
  watch
}) => (elRef, root = defaultRoot) => {
  const scrollParent = ref();
  const setScrollParent = () => scrollParent.value = getScrollParent(elRef.value, root);
  watch(elRef, setScrollParent);
  onMounted(() => elRef.value && setScrollParent());
  return scrollParent;
};
const isDisplayNone = elm => {
  if (isServer) return false;
  if (elm) {
    const computedStyle = getComputedStyle(elm);
    if (computedStyle.getPropertyValue("position") === "fixed") {
      if (computedStyle.getPropertyValue("display") === "none") {
        return true;
      } else if (elm.parentNode !== document.body) {
        return isDisplayNone(elm.parentNode);
      }
    } else {
      return elm.offsetParent === null;
    }
  }
  return false;
};
export { addClass, getDomNode, getScrollContainer, getScrollParent, getScrollTop, getStyle, hasClass, isDisplayNone, isInContainer, isScroll, isServer, off, on, once, preventDefault, removeClass, setStyle, stopPropagation, useScrollParent };