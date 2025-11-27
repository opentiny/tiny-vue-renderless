import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import { merge } from './../object.js';
import PopupManager from './popup-manager.js';
import { addClass } from './dom.js';
let idSeed = 1;
const isServer = typeof window === "undefined";
const setWatchFn = ({
  onMounted,
  onBeforeUnmount,
  watch,
  vm,
  api,
  props,
  state,
  nextTick
}) => {
  onMounted(() => {
    vm._popupId = `popup-${idSeed++}`;
    PopupManager.register(vm._popupId, vm);
  });
  onBeforeUnmount(() => {
    PopupManager.deregister(vm._popupId);
    PopupManager.closeModal(vm._popupId);
  });
  watch(() => props.visible, val => {
    if (val) {
      if (vm._opening) {
        return;
      }
      if (state.rendered) {
        api.open();
      } else {
        state.rendered = true;
        nextTick(() => {
          api.open();
        });
      }
    } else {
      api.close();
    }
  });
};
const openFn = ({
  state,
  vm
}) => options => {
  if (!state.rendered) {
    state.rendered = true;
  }
  const props = merge({}, vm.$props || vm, options);
  if (vm._closeTimer) {
    clearTimeout(vm._closeTimer);
    vm._closeTimer = null;
  }
  clearTimeout(vm._openTimer);
  const doOpen = () => {
    if (isServer || state.opened) {
      return;
    }
    vm._opening = true;
    const dom = vm.$el;
    const modal = props.modal;
    const zIndex = props.zIndex;
    if (zIndex) {
      PopupManager.zIndex = zIndex;
    }
    if (modal) {
      if (vm._closing) {
        PopupManager.closeModal(vm._popupId);
        vm._closing = false;
      }
      PopupManager.openModal(vm._popupId, PopupManager.nextZIndex(), props.modalAppendToBody ? void 0 : dom, props.modalClass, props.modalFade);
      if (props.lockScroll) {
        PopupManager.fixBodyBorder();
        addClass(document.body, PopupManager.popLockClass);
      }
    }
    if (getComputedStyle(dom).position === "static") {
      dom.style.position = "absolute";
    }
    dom.style.zIndex = PopupManager.nextZIndex().toString();
    state.opened = true;
    vm._opening = false;
  };
  const openDelay = Number(props.openDelay);
  if (openDelay > 0) {
    vm._openTimer = setTimeout(() => {
      vm._openTimer = null;
      doOpen();
    }, openDelay);
  } else {
    doOpen();
  }
};
const closeFn = ({
  state,
  vm
}) => () => {
  if (vm._openTimer !== null) {
    clearTimeout(vm._openTimer);
    vm._openTimer = null;
  }
  clearTimeout(vm._closeTimer);
  const doClose = () => {
    vm._closing = true;
    state.opened = false;
    PopupManager.closeModal(vm._popupId);
    vm._closing = false;
  };
  const closeDelay = Number(vm.closeDelay);
  if (closeDelay > 0) {
    vm._closeTimer = setTimeout(() => {
      vm._closeTimer = null;
      doClose();
    }, closeDelay);
  } else {
    doClose();
  }
};
var vue_popup_default = options => {
  const {
    api,
    nextTick,
    onBeforeUnmount,
    onMounted,
    props,
    reactive,
    toRefs,
    vm,
    watch
  } = options;
  const state = reactive({
    opened: false,
    rendered: false
  });
  setWatchFn({
    onMounted,
    onBeforeUnmount,
    watch,
    vm,
    api,
    props,
    state,
    nextTick
  });
  const open = openFn({
    state,
    vm
  });
  const close = closeFn({
    state,
    vm
  });
  return __spreadValues({
    open,
    close,
    PopupManager
  }, toRefs(state));
};
export { vue_popup_default as default };