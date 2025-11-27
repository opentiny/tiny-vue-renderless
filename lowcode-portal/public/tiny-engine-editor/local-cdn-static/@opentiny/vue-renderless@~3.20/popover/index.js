import "../chunk-G2ADBYYC.js";
import { on, off, addClass, removeClass } from './../common/deps/dom.js';
import { guid } from './../common/string.js';
import { KEY_CODE } from './../common/index.js';
const processTrigger = ({
  api,
  state,
  props,
  nextTick
}) => {
  const {
    referenceElm,
    popperElm
  } = state;
  if (props.trigger === "click") {
    on(referenceElm, "click", api.doToggle);
    on(document, "click", api.handleDocumentClick);
  } else if (props.trigger === "hover") {
    on(referenceElm, "mouseenter", api.handleMouseEnter);
    on(popperElm, "mouseenter", api.handleMouseEnter);
    on(referenceElm, "mouseleave", api.handleMouseLeave);
    on(popperElm, "mouseleave", api.handleMouseLeave);
  } else if (props.trigger === "focus") {
    if (referenceElm.querySelector("input, textarea")) {
      on(referenceElm, "focusin", api.doShow);
      on(referenceElm, "focusout", api.doClose);
    } else {
      on(referenceElm, "mousedown", api.doShow);
      on(referenceElm, "mouseup", api.doClose);
    }
  } else if (props.trigger === "manual") {
    if (props.modelValue) {
      nextTick(api.doShow);
    }
  }
};
const mounted = ({
  api,
  state,
  constants,
  props,
  nextTick,
  mode
}) => () => {
  state.mounted = true;
  const {
    referenceElm,
    popperElm,
    tooltipId
  } = state;
  if (referenceElm) {
    if (mode !== "mobile-first") {
      addClass(referenceElm, `${constants.IDPREFIX}__reference`);
    }
    referenceElm.setAttribute("aria-describedby", tooltipId);
    referenceElm.setAttribute("tabindex", props.tabindex.toString());
    popperElm.setAttribute("tabindex", 0);
    if (props.trigger !== "click") {
      on(referenceElm, "focusin", () => {
        api.handleFocus();
        const instance = referenceElm.__vue__;
        if (instance && typeof instance.focus === "function") {
          instance.focus();
        }
      });
      on(popperElm, "focusin", api.handleFocus);
      on(referenceElm, "focusout", api.handleBlur);
      on(popperElm, "focusout", api.handleBlur);
    }
    on(referenceElm, "keydown", api.handleKeydown);
    on(referenceElm, "click", api.handleClick);
  }
  processTrigger({
    api,
    state,
    props,
    nextTick
  });
};
const doToggle = state => () => {
  state.showPopper = !state.showPopper;
};
const doShow = state => () => {
  state.showPopper = true;
};
const doClose = state => () => {
  state.showPopper = false;
};
const handleFocus = ({
  props,
  state
}) => () => {
  addClass(state.referenceElm, "focusing");
  if (props.trigger === "click" || props.trigger === "focus") {
    state.showPopper = true;
  }
};
const handleClick = state => event => {
  const popperElm = state.popperElm;
  if ((event == null ? void 0 : event.target) && popperElm) {
    state.webCompEventTarget = event.target;
  }
  removeClass(state.referenceElm, "focusing");
};
const handleBlur = ({
  props,
  state
}) => () => {
  removeClass(state.referenceElm, "focusing");
  if (props.trigger === "click" || props.trigger === "focus") {
    state.showPopper = false;
  }
};
const handleMouseEnter = ({
  props,
  state
}) => () => {
  clearTimeout(state.timer);
  if (props.openDelay) {
    state.timer = window.setTimeout(() => {
      state.showPopper = true;
    }, props.openDelay);
  } else {
    state.showPopper = true;
  }
};
const handleKeydown = ({
  api,
  props
}) => event => {
  if (event.keyCode === KEY_CODE.Escape && props.trigger !== "manual") {
    api.doClose();
  }
};
const handleMouseLeave = ({
  props,
  state
}) => () => {
  clearTimeout(state.timer);
  if (props.closeDelay) {
    state.timer = window.setTimeout(() => {
      state.showPopper = false;
    }, props.closeDelay);
  } else {
    state.showPopper = false;
  }
};
const handleDocumentClick = ({
  vm,
  state
}) => event => {
  const reference = state.referenceElm;
  const popperElm = state.popperElm;
  const $el = vm.$refs.root;
  let target = event.target;
  if ((target == null ? void 0 : target.shadowRoot) && popperElm) {
    target = state.webCompEventTarget;
  }
  if (!$el || !reference || $el.contains(target) || reference.contains(target) || !popperElm || popperElm.contains(target)) {
    return false;
  } else {
    state.showPopper = false;
    return true;
  }
  state.showPopper = false;
};
const handleAfterEnter = emit => () => {
  emit("after-enter");
};
const handleAfterLeave = emit => () => {
  emit("after-leave");
};
const handleItemClick = ({
  emit,
  state
}) => item => {
  state.showPopper = false;
  emit("item-click", item);
};
const cleanup = ({
  props,
  state
}) => () => {
  if (props.openDelay) {
    clearTimeout(state.timer);
  }
};
const destroyed = ({
  state,
  api
}) => () => {
  const {
    referenceElm,
    popperElm
  } = state;
  off(referenceElm, "click", api.doToggle);
  off(referenceElm, "mouseup", api.doClose);
  off(referenceElm, "mousedown", api.doShow);
  off(referenceElm, "focusin", api.doShow);
  off(referenceElm, "focusout", api.doClose);
  off(referenceElm, "mouseleave", api.handleMouseLeave);
  off(referenceElm, "mouseenter", api.handleMouseEnter);
  off(document, "click", api.handleDocumentClick);
  off(popperElm, "focusin", api.handleFocus);
  off(popperElm, "focusout", api.handleBlur);
  off(popperElm, "mouseenter", api.handleMouseEnter);
  off(popperElm, "mouseleave", api.handleMouseLeave);
  off(referenceElm, "click", api.handleClick);
  off(referenceElm, "focusout", api.handleBlur);
  off(referenceElm, "keydown", api.handleKeydown);
};
const computedTooltipId = constants => () => `${constants.IDPREFIX}-${guid("", 4)}`;
const wrapMounted = ({
  api,
  props,
  vm,
  state
}) => () => {
  const {
    reference,
    popper,
    wrapper
  } = vm.$refs;
  const referenceElm = state.referenceElm = props.reference || reference;
  state.popperElm = state.popperElm || popper;
  if (!referenceElm && wrapper.children) {
    state.referenceElm = wrapper.children[0] || wrapper;
  }
  state.referenceElm && api.mounted();
};
const observeCallback = ({
  state,
  vm
}) => mutationsList => {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "x-placement") {
      state.xPlacement = vm.$refs.popper.getAttribute("x-placement") || "bottom";
    }
  }
};
export { cleanup, computedTooltipId, destroyed, doClose, doShow, doToggle, handleAfterEnter, handleAfterLeave, handleBlur, handleClick, handleDocumentClick, handleFocus, handleItemClick, handleKeydown, handleMouseEnter, handleMouseLeave, mounted, observeCallback, wrapMounted };