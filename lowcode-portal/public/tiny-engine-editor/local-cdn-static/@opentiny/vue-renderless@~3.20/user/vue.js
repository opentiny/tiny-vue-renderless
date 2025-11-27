import "../chunk-G2ADBYYC.js";
import { initUser, handleBlur, updateOptions, useSortable, userChange, suggestUser, autoSelect, searchMethod, setSelected, getUsers, updateCache, saveCache, cacheUser, visibleChange, initService, filter, computedTextField, computedValueField, syncCacheIds } from './index.js';
const api = ["state", "handleBlur", "searchMethod", "userChange", "visibleChange", "useSortable", "filter"];
const renderless = (props, {
  reactive,
  watch,
  computed,
  provide
}, {
  emit,
  nextTick,
  vm,
  service,
  constants,
  dispatch
}) => {
  const api2 = {};
  const $service = initService({
    props,
    service
  });
  const state = reactive({
    loading: false,
    options: [],
    hisOptions: [],
    user: props.multiple ? [] : "",
    selected: [],
    visible: false,
    lastValue: null,
    type: props.valueField,
    sortable: null,
    overflow: false,
    addevnet: false,
    batch: props.batch === false ? false : props.batch || $service.batch,
    textField: computed(() => api2.computedTextField()),
    valueField: computed(() => api2.computedValueField())
  });
  Object.assign(api2, {
    state,
    fetchW3Accounts: $service.fetchW3Accounts,
    fetchSuggestUser: $service.fetchSuggestUser,
    fetchUserByUserId: $service.fetchUserByUserId,
    visibleChange: visibleChange({
      state,
      emit
    }),
    saveCache: saveCache({
      props
    }),
    updateCache: updateCache({
      props,
      state
    }),
    autoSelect: autoSelect({
      props,
      state,
      nextTick
    }),
    updateOptions: updateOptions({
      props,
      state,
      nextTick
    }),
    handleBlur: handleBlur({
      constants,
      dispatch,
      state,
      emit
    }),
    filter: filter({
      props,
      state
    }),
    suggestUser: suggestUser(api2),
    cacheUser: cacheUser({
      api: api2,
      props,
      service: $service,
      state
    }),
    initUser: initUser({
      api: api2,
      props,
      state
    }),
    getUsers: getUsers({
      api: api2,
      props,
      state
    }),
    setSelected: setSelected({
      api: api2,
      props,
      state
    }),
    searchMethod: searchMethod({
      api: api2,
      props,
      state,
      emit
    }),
    userChange: userChange({
      api: api2,
      emit,
      props,
      state,
      dispatch,
      constants
    }),
    useSortable: useSortable({
      api: api2,
      props,
      state,
      vm
    }),
    computedTextField: computedTextField({
      service: $service,
      props
    }),
    computedValueField: computedValueField({
      service: $service,
      props
    }),
    syncCacheIds: syncCacheIds({
      props,
      state
    })
  });
  props.cache && api2.updateCache();
  watch(() => props.modelValue, api2.initUser, {
    immediate: true
  });
  provide("showContent", props.showTips);
  provide("tips-max-width", props.maxWidth);
  return api2;
};
export { api, renderless };