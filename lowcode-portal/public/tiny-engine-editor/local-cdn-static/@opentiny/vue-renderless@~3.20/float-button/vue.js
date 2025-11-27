import "../chunk-G2ADBYYC.js";
import { handleClick, clearTimer, handleScroll } from './index.js';
const api = ["state", "handleClick"];
const watchVariable = ({
  watch,
  props,
  state,
  nextTick,
  vm,
  emit
}) => {
  watch(() => props.disabled, value => {
    state.disabled = value;
  }, {
    immediate: true
  });
  watch(() => props.open, value => {
    state.open = value;
  }, {
    immediate: true
  });
  watch(() => state.open, value => {
    if (value) {
      let beforeRootDom = vm.$refs.tinyFloatButton;
      let beforeRootDomStyle = (beforeRootDom == null ? void 0 : beforeRootDom.getClientRects()[0]) || 0;
      nextTick(() => {
        if (!beforeRootDomStyle) {
          beforeRootDom = vm.$refs.tinyFloatButton;
          beforeRootDomStyle = beforeRootDom.getClientRects()[0];
        }
        const dom = vm.$refs.tinyFloatButtonOpen;
        const style = `left:0px;bottom:${beforeRootDomStyle.height + 4 + "px"};`;
        dom == null ? void 0 : dom.setAttribute("style", style);
      });
    }
  }, {
    immediate: true
  });
  watch(() => props.trigger, value => {
    if (value === "hover" && !state.hasEvent) {
      nextTick(() => {
        const dom = vm.$refs.tinyFloatButton;
        dom.addEventListener("mouseover", event => {
          state.open = true;
          emit("mouseover", event);
        });
        dom.addEventListener("mouseout", event => {
          state.open = false;
          emit("mouseout", event);
        });
        state.hasEvent = true;
      });
    }
  }, {
    immediate: true
  });
  watch(() => props.backTop, value => {
    if (value) {
      handleScroll({
        props,
        vm,
        state
      });
    }
  }, {
    immediate: true
  });
  watch(() => props.element, () => {
    if (props.backTop) {
      handleScroll({
        props,
        vm,
        state
      });
    }
  });
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  reactive,
  watch,
  inject,
  nextTick
}, {
  emit,
  parent,
  vm
}) => {
  parent.tinyForm = parent.tinyForm || inject("form", null);
  const state = reactive({
    timer: 0,
    disabled: props.disabled,
    open: props.open,
    hasEvent: false,
    show: true,
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    buttonDisabled: computed(() => props.disabled || state.disabled || (parent.buttonGroup || {}).disabled || state.formDisabled)
  });
  watchVariable({
    props,
    vm,
    watch,
    state,
    nextTick,
    emit
  });
  const api2 = {
    state,
    clearTimer: clearTimer(state),
    handleClick: handleClick({
      emit,
      props,
      state
    })
  };
  onBeforeUnmount(api2.clearTimer);
  return api2;
};
export { api, renderless };