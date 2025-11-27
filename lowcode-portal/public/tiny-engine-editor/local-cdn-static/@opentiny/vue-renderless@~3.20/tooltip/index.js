import "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import { on, off, addClass, removeClass } from './../common/deps/dom.js';
const show = ({
  api,
  state,
  props
}) => event => {
  const defaultDelay = 200;
  const delay = event && event.type === "mouseenter" ? defaultDelay : 0;
  if (props.visible === "auto") {
    const {
      clientWidth,
      scrollWidth
    } = state.referenceElm;
    if (scrollWidth <= clientWidth) {
      return;
    }
  }
  api.setExpectedState(true);
  api.handleShowPopper(delay);
};
const hide = api => () => {
  api.setExpectedState(false);
  api.debounceClose();
};
const handleFocus = ({
  api,
  state
}) => () => {
  state.focusing = true;
  api.show();
};
const handleBlur = ({
  api,
  state
}) => () => {
  state.focusing = false;
  api.hide();
};
const removeFocusing = ({
  api,
  state
}) => () => {
  state.focusing = false;
  api.show();
};
const handleShowPopper = ({
  props,
  state
}) => delay => {
  if (!state.expectedState || props.manual) {
    return;
  }
  clearTimeout(state.timeout);
  state.timeout = window.setTimeout(() => {
    state.showPopper = true;
  }, props.openDelay || delay);
  if (props.hideAfter > 0) {
    state.timeoutPending = window.setTimeout(() => {
      state.showPopper = false;
    }, props.hideAfter);
  }
};
const handleClosePopper = ({
  api,
  props,
  state
}) => () => {
  if (props.enterable && state.expectedState || props.manual) {
    return;
  }
  clearTimeout(state.timeout);
  if (state.timeoutPending) {
    clearTimeout(state.timeoutPending);
  }
  state.showPopper = false;
  if (props.disabled) {
    api.doDestroy();
  }
};
const handleDocumentClick = ({
  props,
  api,
  state,
  popperVmRef
}) => event => {
  if (props.manual) return;
  const reference = state.referenceElm;
  const $el = popperVmRef.popper;
  if (!$el || !reference || $el.contains(event.target) || reference.contains(event.target)) {
    return;
  }
  if (state.showPopper) {
    api.setExpectedState(false);
    api.debounceClose();
  }
};
const setExpectedState = ({
  state
}) => value => {
  if (state.expectedState === false) {
    clearTimeout(state.timeoutPending);
  }
  state.expectedState = value;
};
const destroyed = ({
  state,
  api,
  vm
}) => () => {
  const reference = state.referenceElm;
  state.showPopper = false;
  if (reference && reference.nodeType === 1) {
    off(document, "click", api.handleDocumentClick);
    off(reference, "mouseenter", api.show);
    off(reference, "mouseleave", api.hide);
    off(reference, "focus", api.focusHandler);
    off(reference, "blur", api.handleBlur);
    off(reference, "click", api.removeFocusing);
  }
  if (vm.popperVM) {
    typeof vm.popperVM.$destroy === "function" && vm.popperVM.$destroy();
    vm.popperVM = null;
  }
};
const debounceClose = ({
  api,
  props
}) => debounce(props.closeDelay, () => {
  api.handleClosePopper();
});
const watchFocusing = state => value => {
  if (value) {
    addClass(state.referenceElm, "focusing");
  } else {
    removeClass(state.referenceElm, "focusing");
  }
};
const focusHandler = ({
  slots,
  api
}) => () => {
  if (!slots.default || !slots.default().length) {
    api.handleFocus();
    return;
  }
  let instance = slots.default()[0];
  instance = instance.elm || instance.el;
  if (instance && instance.focus) {
    instance.focus();
  } else {
    api.handleFocus();
  }
};
const bindEvent = ({
  api,
  state,
  vm
}) => reference => {
  let referenceElm = null;
  if (vm.$el.nodeType === 8) {
    referenceElm = reference;
  } else if (vm.$el.nodeType === 1) {
    referenceElm = vm.$el;
  }
  if (!referenceElm || referenceElm.nodeType === 8 || state.referenceElm) {
    return;
  }
  state.referenceElm = referenceElm;
  referenceElm.setAttribute("aria-describedby", state.tooltipId);
  referenceElm.setAttribute("tabindex", state.tabindex.toString());
  on(document, "click", api.handleDocumentClick);
  on(referenceElm, "mouseenter", api.show);
  on(referenceElm, "mouseleave", api.hide);
  on(referenceElm, "focus", api.focusHandler);
  on(referenceElm, "blur", api.handleBlur);
  on(referenceElm, "click", api.removeFocusing);
};
const observeCallback = ({
  state,
  popperVmRef
}) => mutationsList => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "x-placement") {
      state.xPlacement = popperVmRef.popper.getAttribute("x-placement") || "bottom";
    }
  }
};
const bindPopper = ({
  vm,
  nextTick,
  popperVmRef
}) => el => {
  nextTick(() => vm.bindEvent(el));
  let popperVM = vm.popperVM;
  if (!vm.$refs.popper) {
    popperVmRef.popper = popperVM.$el;
  } else {
    popperVmRef.popper = vm.$refs.popper;
  }
  nextTick(() => {
    if (vm.modelValue) {
      vm.updatePopper();
    }
  });
};
export { bindEvent, bindPopper, debounceClose, destroyed, focusHandler, handleBlur, handleClosePopper, handleDocumentClick, handleFocus, handleShowPopper, hide, observeCallback, removeFocusing, setExpectedState, show, watchFocusing };