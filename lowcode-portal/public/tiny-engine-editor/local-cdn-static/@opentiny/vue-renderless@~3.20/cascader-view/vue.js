import "../chunk-G2ADBYYC.js";
import { close, confirm, watchVisible, selectOption, searchMethod, searchSelectHandler, loopSearchOption, searchBoxToggle, filterOptionsHandler, watchModelValue, setLevel, created, clean, loadData, isSelected, getNodeConfig, initTreeStore, disabledNavOption, renderSearchOption, computedNavListHandler, computedSelectedListHandler, nodeExpand, inputKeyword, removeOption, getCheckedNodes, toggleCheckList, syncCheckStatus } from './index.js';
const api = ["state", "close", "clean", "confirm", "setLevel", "loadData", "nodeExpand", "selectOption", "searchMethod", "searchBoxToggle", "searchSelectHandler", "renderSearchOption", "disabledNavOption", "toggleCheckList", "inputKeyword", "removeOption", "getCheckedNodes", "isSelected"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  t,
  emit,
  constants
}) => {
  const api2 = {};
  const state = reactive({
    toggle: false,
    loading: false,
    root: null,
    store: null,
    checkList: [],
    level: 0,
    rootData: [],
    navList: [],
    waitLoadCheckList: [],
    search: {
      loaded: false,
      show: false,
      input: "",
      filterOptions: [],
      options: []
    },
    selected: {
      removeList: [],
      options: [],
      show: false,
      waitLoadList: []
    },
    options: computed(() => {
      let data;
      let list = [state.rootData];
      state.navList.map(option => {
        data = option.childNodes;
        data && data.length && list.push(data);
      });
      return list;
    }),
    computedNavList: computed(() => api2.computedNavListHandler()),
    computedCheckList: computed(() => [...state.waitLoadCheckList, ...state.checkList]),
    computedSelectedList: computed(() => api2.computedSelectedListHandler()),
    checkIds: computed(() => state.computedSelectedList.map(option => option.data[props.valueField])),
    checkLabels: computed(() => state.computedSelectedList.map(option => option.data[props.textField]))
  });
  Object.assign(api2, {
    state,
    created: created({
      api: api2
    }),
    close: close({
      state,
      emit
    }),
    clean: clean({
      state,
      props
    }),
    setLevel: setLevel({
      state,
      api: api2
    }),
    loadData: loadData({
      state,
      props
    }),
    confirm: confirm({
      state,
      emit,
      props,
      api: api2
    }),
    selectOption: selectOption({
      emit,
      state,
      api: api2
    }),
    searchMethod: searchMethod({
      state,
      props,
      api: api2
    }),
    initTreeStore: initTreeStore({
      props,
      state,
      api: api2
    }),
    searchBoxToggle: searchBoxToggle({
      state,
      props,
      api: api2
    }),
    syncCheckStatus: syncCheckStatus({
      state,
      props,
      api: api2
    }),
    getNodeConfig: getNodeConfig({
      state,
      constants,
      props
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
    loopSearchOption: loopSearchOption({
      state,
      api: api2,
      props
    }),
    filterOptionsHandler: filterOptionsHandler({
      state,
      props
    }),
    searchSelectHandler: searchSelectHandler({
      state,
      emit,
      api: api2,
      props
    }),
    renderSearchOption: renderSearchOption({
      props,
      state,
      api: api2
    }),
    computedNavListHandler: computedNavListHandler({
      props,
      state,
      api: api2,
      t
    }),
    computedSelectedListHandler: computedSelectedListHandler({
      state
    }),
    disabledNavOption: disabledNavOption({
      state
    }),
    inputKeyword: inputKeyword({
      state,
      api: api2
    }),
    removeOption: removeOption({
      state,
      api: api2
    }),
    isSelected: isSelected({
      state,
      api: api2,
      props
    }),
    nodeExpand: nodeExpand({
      emit,
      state,
      props,
      api: api2
    }),
    toggleCheckList: toggleCheckList({
      state,
      props,
      api: api2
    }),
    getCheckedNodes: getCheckedNodes({
      state,
      api: api2
    })
  });
  api2.created();
  watch(() => props.data, api2.loadData, {
    deep: true
  });
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true,
    deep: true
  });
  watch(() => props.visible, api2.watchVisible);
  return api2;
};
export { api, renderless };