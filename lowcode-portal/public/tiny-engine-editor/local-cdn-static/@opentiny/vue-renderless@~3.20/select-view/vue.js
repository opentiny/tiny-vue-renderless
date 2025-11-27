import "../chunk-G2ADBYYC.js";
import { close, watchVisible, confirm, searchMethod, searchSelectHandler, searchBoxToggle, watchModelValue, includeOptionIndex, allCheckHandler, toggleCheckList, clean, load, selectedOptionHandler } from './index.js';
const api = ["state", "allCheckHandler", "close", "confirm", "searchMethod", "searchSelectHandler", "searchBoxToggle", "includeOptionIndex", "clean", "load", "selectedOptionHandler", "toggleCheckList"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  emit,
  vm
}) => {
  const api2 = {};
  const state = reactive({
    toggle: false,
    checkList: [],
    selected: {
      show: false,
      options: []
    },
    search: {
      filterOptions: [],
      input: "",
      options: props.menus || [],
      loading: false
    },
    checkIds: computed(() => state.checkList.map(option => option[props.valueField])),
    lazy: computed(() => !props.infiniteScroll.disabled && typeof props.infiniteScroll.load === "function")
  });
  Object.assign(api2, {
    state,
    confirm: confirm({
      state,
      emit,
      props,
      api: api2
    }),
    close: close({
      state,
      emit,
      vm
    }),
    watchVisible: watchVisible({
      emit,
      state,
      props,
      api: api2
    }),
    watchModelValue: watchModelValue({
      props,
      state,
      emit
    }),
    searchMethod: searchMethod({
      state,
      props,
      api: api2
    }),
    searchSelectHandler: searchSelectHandler({
      state,
      emit,
      api: api2,
      props
    }),
    searchBoxToggle: searchBoxToggle({
      state,
      props,
      api: api2
    }),
    allCheckHandler: allCheckHandler({
      state,
      props
    }),
    toggleCheckList: toggleCheckList({
      state
    }),
    clean: clean({
      state,
      props
    }),
    load: load({
      state,
      props,
      api: api2
    }),
    selectedOptionHandler: selectedOptionHandler({
      state,
      api: api2
    }),
    includeOptionIndex: includeOptionIndex(props)
  });
  watch(() => props.visible, api2.watchVisible, {
    immediate: true
  });
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true
  });
  watch(() => props.menus, value => {
    state.search.options = value;
    api2.searchMethod();
  });
  return api2;
};
export { api, renderless };