import "../chunk-G2ADBYYC.js";
import { close, watchVisible, selectOption, confirm, searchMethod, searchSelectHandler, searchBoxToggle, watchModelValue, isSelected, setLevel, created, loadData, getNodeConfig, initTreeStore, renderSearchOption, computedNavListHandler, disabledNavOption, syncCheckStatus } from './index.js';
const api = ["state", "close", "selectOption", "confirm", "searchMethod", "searchSelectHandler", "searchBoxToggle", "setLevel", "loadData", "renderSearchOption", "disabledNavOption", "isSelected"];
const renderless = (props, {
  computed,
  reactive,
  watch
}, {
  emit,
  constants
}) => {
  const api2 = {};
  const state = reactive({
    toggle: false,
    loading: false,
    root: null,
    store: null,
    navList: [],
    rootData: [],
    level: 0,
    isLeaf: false,
    search: {
      show: false,
      input: "",
      options: [],
      filterOptions: []
    },
    options: computed(() => {
      let arr;
      let list = [state.rootData];
      state.navList.forEach(option => {
        arr = option.childNodes;
        arr && arr.length && list.push(arr);
      });
      return list;
    }),
    checkIds: computed(() => state.navList.map(option => option.data[props.valueField])),
    checkLabels: computed(() => state.navList.map(option => option.data[props.textField])),
    waitLoadList: computed(() => state.navList.filter(option => option.selfWaitLoad).map(option => option.data[props.valueField])),
    computedNavList: computed(() => api2.computedNavListHandler()),
    showButton: computed(() => {
      const len = state.navList.length;
      if (!props.nodeConfig.checkStrictly) {
        if (state.level < len - 1) {
          return false;
        }
      }
      return len && (props.nodeConfig.checkStrictly || state.navList[len - 1].isLeaf);
    })
  });
  Object.assign(api2, {
    state,
    confirm: confirm({
      state,
      emit,
      props,
      api: api2
    }),
    selectOption: selectOption({
      state,
      emit,
      props,
      api: api2
    }),
    close: close({
      state,
      emit
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
    syncCheckStatus: syncCheckStatus({
      state,
      props,
      api: api2
    }),
    setLevel: setLevel({
      state,
      api: api2
    }),
    created: created({
      api: api2
    }),
    loadData: loadData({
      state,
      props
    }),
    getNodeConfig: getNodeConfig({
      state,
      constants,
      props
    }),
    initTreeStore: initTreeStore({
      props,
      state,
      api: api2
    }),
    renderSearchOption: renderSearchOption({
      props,
      state,
      api: api2
    }),
    computedNavListHandler: computedNavListHandler({
      props,
      state,
      api: api2
    }),
    disabledNavOption: disabledNavOption({
      state
    }),
    isSelected: isSelected({
      state,
      api: api2,
      props
    })
  });
  api2.created();
  api2.syncCheckStatus();
  watch(() => props.visible, api2.watchVisible);
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true,
    deep: true
  });
  watch(() => props.data, api2.loadData, {
    deep: true
  });
  return api2;
};
export { api, renderless };