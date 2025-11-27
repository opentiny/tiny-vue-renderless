import "../chunk-G2ADBYYC.js";
import { init, fixServiceData, change, initService, fetchDefaultCurrency, toogleDefaultCurrency, computedSearchConfig, visibleChange } from './index.js';
const api = ["state", "change", "toogleDefaultCurrency", "visibleChange"];
const renderless = (props, {
  watch,
  reactive,
  computed
}, {
  service,
  emit
}) => {
  const api2 = {};
  const $service = initService({
    props,
    service
  });
  const state = reactive({
    options: [],
    selectedValue: props.modelValue,
    defaultCurrency: "",
    searchConfig: computed(() => api2.computedSearchConfig())
  });
  Object.assign(api2, {
    state,
    change: change(emit),
    visibleChange: visibleChange(emit),
    fixServiceData: fixServiceData({
      props,
      service: $service
    }),
    init: init({
      state,
      service: $service,
      api: api2
    }),
    fetchDefaultCurrency: fetchDefaultCurrency({
      state,
      props,
      emit,
      service: $service
    }),
    toogleDefaultCurrency: toogleDefaultCurrency({
      state,
      props,
      service: $service
    }),
    computedSearchConfig: computedSearchConfig({
      props,
      service: $service
    })
  });
  watch(() => props.modelValue, param => {
    state.selectedValue = param;
  }, {
    immediate: true
  });
  api2.init();
  api2.fetchDefaultCurrency();
  return api2;
};
export { api, renderless };