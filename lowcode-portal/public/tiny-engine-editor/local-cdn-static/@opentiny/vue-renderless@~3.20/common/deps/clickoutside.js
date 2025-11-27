import "../../chunk-G2ADBYYC.js";
import { on } from './dom.js';
const isServer = typeof window === "undefined";
const nodeList = [];
const nameSpace = "@@clickoutsideContext";
let startClick;
let seed = 0;
if (!isServer) {
  on(document, "mousedown", event => {
    startClick = event;
    nodeList.filter(node => node[nameSpace].mousedownTrigger).forEach(node => node[nameSpace].documentHandler(event, startClick));
  });
  on(document, "mouseup", event => {
    nodeList.filter(node => !node[nameSpace].mousedownTrigger).forEach(node => {
      var _a;
      return node[nameSpace].documentHandler(event, ((_a = node[nameSpace]) == null ? void 0 : _a.mouseupTrigger) ? event : startClick);
    });
    startClick = null;
  });
}
const createDocumentHandler = (el, binding, vnode) => function (mouseup = {}, mousedown = {}) {
  let popperElm = vnode.context.popperElm || vnode.context.state && vnode.context.state.popperElm;
  if (!(mouseup == null ? void 0 : mouseup.target) || !(mousedown == null ? void 0 : mousedown.target) || el.contains(mouseup.target) || el.contains(mousedown.target) || el === mouseup.target || popperElm && (popperElm.contains(mouseup.target) || popperElm.contains(mousedown.target))) {
    return;
  }
  if (binding.expression && el[nameSpace].methodName && vnode.context[el[nameSpace].methodName]) {
    vnode.context[el[nameSpace].methodName]();
  } else {
    el[nameSpace].bindingFn && el[nameSpace].bindingFn();
  }
};
var clickoutside_default = {
  bind: (el, binding, vnode) => {
    nodeList.push(el);
    const id = seed++;
    const {
      modifiers,
      expression,
      value
    } = binding;
    const {
      mousedown = false,
      mouseup = false
    } = modifiers || {};
    el[nameSpace] = {
      id,
      documentHandler: createDocumentHandler(el, binding, vnode),
      methodName: expression,
      bindingFn: value,
      mousedownTrigger: mousedown,
      mouseupTrigger: mouseup
    };
  },
  update: (el, binding, vnode) => {
    const {
      modifiers,
      expression,
      value
    } = binding;
    const {
      mousedown = false,
      mouseup = false
    } = modifiers || {};
    el[nameSpace].documentHandler = createDocumentHandler(el, binding, vnode);
    el[nameSpace].methodName = expression;
    el[nameSpace].bindingFn = value;
    el[nameSpace].mousedownTrigger = mousedown;
    el[nameSpace].mouseupTrigger = mouseup;
  },
  unbind: el => {
    if (el.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    let len = nodeList.length;
    for (let i = 0; i < len; i++) {
      if (nodeList[i][nameSpace].id === el[nameSpace].id) {
        nodeList.splice(i, 1);
        break;
      }
    }
    if (nodeList.length === 0 && startClick) {
      startClick = null;
    }
    delete el[nameSpace];
  }
};
export { clickoutside_default as default };