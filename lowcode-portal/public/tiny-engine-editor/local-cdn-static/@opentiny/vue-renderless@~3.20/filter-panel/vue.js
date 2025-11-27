import "../chunk-G2ADBYYC.js";
import { doDestroy, show, hide, popoverShow, popoverHide, handleClear, handleDocumentClick, togglePanel } from './index.js';
import { on, off } from './../common/deps/dom.js';
const api = ["state", "doDestroy", "show", "hide", "popoverShow", "popoverHide", "handleClear", "togglePanel"];
const renderless = (props, {
  reactive,
  onMounted,
  onBeforeUnmount
}, {
  vm,
  emit
}) => {
  const state = reactive({
    visible: false
  });
  const api2 = {};
  Object.assign(api2, {
    state,
    show: show({
      state
    }),
    hide: hide({
      state
    }),
    togglePanel: togglePanel({
      props,
      state
    }),
    popoverShow: popoverShow({
      state,
      emit
    }),
    popoverHide: popoverHide({
      state,
      emit
    }),
    handleClear: handleClear({
      emit
    }),
    doDestroy: doDestroy({
      vm
    }),
    handleDocumentClick: handleDocumentClick({
      vm,
      state
    })
  });
  handleDocumentClick;
  onMounted(() => {
    on(document, "click", api2.handleDocumentClick);
  });
  onBeforeUnmount(() => {
    off(document, "click", api2.handleDocumentClick);
  });
  return api2;
};
export { api, renderless };