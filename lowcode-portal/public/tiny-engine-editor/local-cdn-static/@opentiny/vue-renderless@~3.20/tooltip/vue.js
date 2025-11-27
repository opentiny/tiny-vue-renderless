import "../chunk-G2ADBYYC.js";
import { bindEvent, show, hide, handleFocus, handleBlur, removeFocusing, handleShowPopper, handleClosePopper, setExpectedState, destroyed, debounceClose, watchFocusing, bindPopper, focusHandler, observeCallback, handleDocumentClick } from './index.js';
import userPopper from './../common/deps/vue-popper.js';
import { guid } from './../common/string.js';
const api = ["state", "bindEvent", "hide", "show", "doDestroy", "handleFocus", "debounceClose", "handleShowPopper", "handleClosePopper", "setExpectedState", "updatePopper", "focusHandler"];
const initState = ({
  reactive,
  showPopper,
  popperElm,
  referenceElm,
  props,
  inject,
  popperJS,
  currentPlacement
}) => reactive({
  popperJS,
  showPopper,
  popperElm,
  referenceElm,
  currentPlacement,
  timeout: null,
  focusing: false,
  expectedState: void 0,
  tooltipId: guid("tiny-tooltip-", 4),
  tabindex: props.tabindex,
  xPlacement: "bottom",
  showContent: inject("showContent", null),
  tipsMaxWidth: inject("tips-max-width", null)
});
const renderless = (props, {
  watch,
  toRefs,
  reactive,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  onUnmounted,
  inject
}, {
  vm,
  emit,
  slots,
  nextTick,
  parent
}) => {
  const api2 = {};
  const popperVmRef = {};
  const popperParam = {
    emit,
    props,
    nextTick,
    toRefs,
    reactive,
    parent: parent.$parent,
    vm,
    popperVmRef
  };
  Object.assign(popperParam, {
    slots,
    onBeforeUnmount,
    onDeactivated,
    watch
  });
  const {
    showPopper,
    updatePopper,
    popperElm,
    referenceElm,
    doDestroy,
    popperJS,
    currentPlacement
  } = userPopper(popperParam);
  const state = initState({
    reactive,
    showPopper,
    popperElm,
    referenceElm,
    props,
    inject,
    popperJS,
    currentPlacement
  });
  Object.assign(api2, {
    state,
    doDestroy,
    updatePopper,
    show: show({
      api: api2,
      state,
      props
    }),
    hide: hide(api2),
    destroyed: destroyed({
      state,
      api: api2,
      vm
    }),
    bindPopper: bindPopper({
      vm,
      nextTick,
      popperVmRef
    }),
    watchFocusing: watchFocusing(state),
    removeFocusing: removeFocusing({
      api: api2,
      state
    }),
    handleBlur: handleBlur({
      api: api2,
      state
    }),
    handleFocus: handleFocus({
      api: api2,
      state
    }),
    debounceClose: debounceClose({
      api: api2,
      props
    }),
    setExpectedState: setExpectedState({
      state
    }),
    handleShowPopper: handleShowPopper({
      props,
      state
    }),
    handleClosePopper: handleClosePopper({
      api: api2,
      props,
      state
    }),
    bindEvent: bindEvent({
      api: api2,
      state,
      vm
    }),
    focusHandler: focusHandler({
      slots,
      api: api2
    }),
    handleDocumentClick: handleDocumentClick({
      props,
      api: api2,
      state,
      popperVmRef
    }),
    observeCallback: observeCallback({
      state,
      popperVmRef
    })
  });
  watch(() => state.focusing, api2.watchFocusing);
  watch(() => props.modelValue, val => nextTick(() => props.manual && (state.showPopper = val)));
  onMounted(() => {
    api2.bindPopper();
    if (props.genArrowByHtml) {
      const config = {
        attributes: true,
        childList: false,
        subtree: false
      };
      api2.observer = new MutationObserver(api2.observeCallback);
      api2.observer.observe(popperVmRef.popper, config);
    }
  });
  vm.$on("tooltip-update", api2.bindPopper);
  onUnmounted(() => {
    api2.destroyed();
    api2.observer && api2.observer.disconnect();
    vm.$off("tooltip-update");
  });
  return api2;
};
export { api, renderless };