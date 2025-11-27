import { __spreadValues } from "../../chunk-G2ADBYYC.js";
import PopupManager from './popup-manager.js';
import PopperJS from './popper.js';
import { on, off, isDisplayNone } from './dom.js';
const stop = e => e.stopPropagation();
const isServer = typeof window === "undefined";
const getReference = ({
  state,
  props,
  vm,
  slots
}) => {
  let reference = state.referenceElm || props.reference || vm.$refs.reference && vm.$refs.reference.$el || vm.$refs.reference;
  if (!reference && slots.reference && slots.reference()[0]) {
    state.referenceElm = slots.reference()[0].elm || slots.reference()[0].el;
    reference = state.referenceElm;
  }
  return reference;
};
const getReferMaxZIndex = reference => {
  if (!reference || !reference.nodeType) return;
  let getZIndex = dom => parseInt(window.getComputedStyle(dom).zIndex, 10) || 0;
  let max = getZIndex(reference);
  let z;
  do {
    reference = reference.parentNode;
    if (reference) {
      z = getZIndex(reference);
    } else {
      break;
    }
    max = z > max ? z : max;
  } while (reference !== document.body);
  return max + 1 + "";
};
var vue_popper_default = options => {
  const {
    parent,
    emit,
    nextTick,
    onBeforeUnmount,
    onDeactivated,
    props,
    watch,
    reactive,
    vm,
    slots,
    toRefs,
    popperVmRef
  } = options;
  const state = reactive({
    popperJS: null,
    appended: false,
    // arrow 是否添加
    popperElm: null,
    showPopper: props.manual ? Boolean(props.modelValue) : false,
    referenceElm: null,
    currentPlacement: ""
  });
  const appendArrow = el => {
    if (state.appended) {
      return;
    }
    state.appended = true;
    const div = document.createElement("div");
    div.setAttribute("x-arrow", "");
    div.className = "popper__arrow";
    el.appendChild(div);
  };
  const followHide = popperInstance => {
    const {
      followReferenceHide = true
    } = (props == null ? void 0 : props.popperOptions) || {};
    const {
      _popper: popper,
      _reference: reference
    } = popperInstance;
    if (followReferenceHide && isDisplayNone(reference)) {
      popper.style.display = "none";
    }
  };
  const nextZIndex = reference => {
    return props.zIndex === "relative" ? getReferMaxZIndex(reference) : PopupManager.nextZIndex();
  };
  const createPopper = dom => {
    if (isServer) {
      return;
    }
    state.currentPlacement = state.currentPlacement || props.placement;
    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(state.currentPlacement)) {
      return;
    }
    const options2 = props.popperOptions || {
      gpuAcceleration: false
    };
    state.popperElm = state.popperElm || props.popper || vm.$refs.popper || popperVmRef.popper || dom;
    const popper = state.popperElm;
    let reference = getReference({
      state,
      props,
      vm,
      slots
    });
    if (!popper || !reference || reference.nodeType !== Node.ELEMENT_NODE) {
      return;
    }
    if (props.visibleArrow) {
      appendArrow(popper);
    }
    if (props.appendToBody || props.popperAppendToBody) {
      document.body.appendChild(state.popperElm);
    } else {
      parent && parent.$el && parent.$el.appendChild(state.popperElm);
      options2.forceAbsolute = true;
    }
    options2.placement = state.currentPlacement;
    options2.offset = props.offset || 0;
    options2.arrowOffset = props.arrowOffset || 0;
    options2.adjustArrow = props.adjustArrow || false;
    options2.appendToBody = props.appendToBody || props.popperAppendToBody;
    state.popperJS = new PopperJS(reference, popper, options2);
    emit("created", state);
    if (typeof options2.onUpdate === "function") {
      state.popperJS.onUpdate(options2.onUpdate);
    }
    state.popperJS._popper.style.zIndex = nextZIndex(state.popperJS._reference);
    followHide(state.popperJS);
    on(state.popperElm, "click", stop);
  };
  const updatePopper = popperElmOrTrue => {
    if (popperElmOrTrue && popperElmOrTrue !== true) {
      state.popperElm = popperElmOrTrue;
    }
    const popperJS = state.popperJS;
    if (popperJS) {
      popperJS._reference = getReference({
        state,
        props,
        vm,
        slots
      });
      popperJS.update();
      if (popperJS._popper && popperElmOrTrue !== true) {
        popperJS._popper.style.zIndex = nextZIndex(popperJS._reference);
        followHide(state.popperJS);
      }
    } else {
      createPopper(popperElmOrTrue && popperElmOrTrue !== true ? popperElmOrTrue : void 0);
    }
  };
  const doDestroy = forceDestroy => {
    if (!state.popperJS || state.showPopper && !forceDestroy) {
      return;
    }
    state.popperJS.destroy();
    state.popperJS = null;
  };
  const destroyPopper = remove => {
    if (remove) {
      if (state.popperElm && state.popperElm.parentNode === document.body) {
        off(state.popperElm, "click", stop);
        state.popperElm.remove();
      }
    }
  };
  watch(() => state.showPopper, val => {
    if (props.disabled) {
      return;
    }
    if (val) {
      nextTick(updatePopper);
    }
    props.trigger === "manual" && emit("update:modelValue", val);
  });
  onBeforeUnmount(() => {
    nextTick(() => {
      doDestroy(true);
      if (props.appendToBody || props.popperAppendToBody) {
        destroyPopper("remove");
      }
    });
  });
  onDeactivated(() => {
    doDestroy(true);
    if (props.appendToBody || props.popperAppendToBody) {
      destroyPopper("remove");
    }
  });
  return __spreadValues({
    updatePopper,
    destroyPopper,
    doDestroy
  }, toRefs(state));
};
export { vue_popper_default as default };