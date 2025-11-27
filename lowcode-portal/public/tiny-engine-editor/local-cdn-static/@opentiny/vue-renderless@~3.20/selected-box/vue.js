import "../chunk-G2ADBYYC.js";
import { init, submitSelection, getSelection, i18nSelected, computedShowAuxi, textPrimary, textAuxi, handleMouseenter, handleMouseleave, handleClear, handleDelete, emitChange, keyOption, keyType, initDrag, unmount, arrayMinus, batchSubmit, getParams, coverSubmit, computedShowClear } from './index.js';
const api = ["state", "init", "submitSelection", "getSelection", "i18nSelected", "textPrimary", "textAuxi", "handleMouseenter", "handleMouseleave", "handleClear", "handleDelete", "keyOption", "keyType", "batchSubmit", "coverSubmit"];
const renderless = (props, {
  reactive,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  watch,
  markRaw
}, {
  emit,
  t,
  vm
}) => {
  const state = reactive({
    inverse: false,
    total: 0,
    select: [],
    refresh: 0,
    optionSelector: '[data-tag="tiny-selected-box-item"]',
    dragAnimation: 100,
    showAuxi: computed(() => api2.computedShowAuxi()),
    popoverVisible: false,
    popoverContent: "",
    dragInstance: null,
    slotParams: computed(() => ({
      inverse: state.inverse,
      total: state.total,
      select: state.select
    })),
    showClear: computed(() => api2.computedShowClear()),
    theme: vm.theme
  });
  const api2 = {
    state,
    init: init({
      props,
      state
    }),
    i18nSelected: i18nSelected({
      state,
      t
    }),
    computedShowAuxi: computedShowAuxi(props),
    textPrimary: textPrimary(props),
    textAuxi: textAuxi(props),
    handleMouseenter: handleMouseenter({
      state,
      vm
    }),
    handleMouseleave: handleMouseleave(state),
    keyType: keyType(props),
    unmount: unmount(state),
    getParams: getParams(state),
    computedShowClear: computedShowClear(state)
  };
  Object.assign(api2, {
    submitSelection: submitSelection({
      api: api2,
      state
    }),
    handleClear: handleClear({
      api: api2,
      emit,
      props,
      state
    }),
    handleDelete: handleDelete({
      api: api2,
      emit,
      state
    }),
    emitChange: emitChange({
      api: api2,
      emit
    }),
    initDrag: initDrag({
      api: api2,
      emit,
      markRaw,
      props,
      state,
      vm
    }),
    arrayMinus: arrayMinus(api2),
    batchSubmit: batchSubmit({
      api: api2,
      state
    }),
    getSelection: getSelection({
      api: api2,
      state
    }),
    coverSubmit: coverSubmit({
      api: api2,
      props,
      state
    }),
    keyOption: keyOption({
      api: api2,
      props
    })
  });
  onBeforeMount(() => {
    api2.init();
  });
  onMounted(() => {
    api2.initDrag();
  });
  onBeforeUnmount(() => {
    api2.unmount();
  });
  watch(() => props.inverse, () => api2.init());
  return api2;
};
export { api, renderless };