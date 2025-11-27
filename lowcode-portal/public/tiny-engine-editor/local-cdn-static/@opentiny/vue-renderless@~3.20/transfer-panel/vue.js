import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { getStrictData, sizesChange, getTreeCheckableData, getFilterTreeData, getFilterData, getCheckableData, checkedEvent, watchData, getCheckedSummary, getDeteminate, watchChecked, watchDefaultCheckded, updateAllChecked, handleAllCheckedChange, clearQuery, setPosition, selectChange, handlePageChange, setExpandCache } from './index.js';
const api = ["markRaw", "toRaw", "state", "check", "sizesChange", "clearQuery", "handleAllCheckedChange", "checkedEvent", "setPosition", "selectChange", "handlePageChange"];
const initState = ({
  reactive,
  props,
  parent,
  computed,
  api: api2,
  slots,
  designConfig
}) => {
  var _a;
  const state = reactive({
    query: "",
    checked: [],
    allChecked: false,
    internalPage: props.pagerOp.pageVO.currentPage || 1,
    pagerTotal: 0,
    pageChangeData: parent.state.isToLeft,
    currentPage: props.pagerOp.pageVO.currentPage || 1,
    sizes: props.pagerOp && props.pagerOp.pageVO.pageSize,
    render: {},
    checkChangeByUser: true,
    filteredData: computed(() => api2.getFilterData()),
    checkableData: computed(() => api2.getCheckableData()),
    checkedSummary: computed(() => api2.getCheckedSummary()),
    isIndeterminate: computed(() => api2.getDeteminate()),
    hasNoMatch: computed(() => state.query.length > 0 && state.filteredData.length === 0),
    labelProp: computed(() => props.props.label || "label"),
    keyProp: computed(() => props.props.key || "key"),
    disabledProp: computed(() => props.props.disabled || "disabled"),
    childrenProp: computed(() => props.treeOp && props.treeOp.props && props.treeOp.props.childern || "children"),
    hasFooter: computed(() => (!!parent.slots["left-footer"] || !!parent.slots["right-footer"]) && !!slots.default),
    renderType: computed(() => props.render && props.render.plugin.name),
    expanded: [],
    inputBoxType: (designConfig == null ? void 0 : designConfig.inputBoxType) || "underline",
    showInputSearch: (_a = designConfig == null ? void 0 : designConfig.showInputSearch) != null ? _a : true
  });
  return state;
};
const initStateRender = ({
  reactive,
  state,
  props,
  api: api2
}) => reactive(__spreadProps(__spreadValues({
  keys: state.keyProp,
  data: [],
  defaultChecked: state.checked,
  defaultExpandedKeys: state.expanded,
  columns: props.columns
}, props.treeOp), {
  on: {
    "checked-change": (selected, isAll) => {
      api2.selectChange(selected, isAll);
    },
    check: (data, {
      checkedKeys
    }) => {
      state.checked = checkedKeys;
    },
    "node-expand": node => api2.setExpandCache(node, true),
    "node-collapse": node => api2.setExpandCache(node, false)
  }
}));
const initWatcher = ({
  watch,
  state,
  api: api2,
  props,
  Table
}) => {
  watch(() => state.checked, (value, oldvalue) => api2.watchChecked({
    value,
    oldvalue
  }));
  watch(() => props.pagerOp.pageVO.currentPage, value => {
    state.currentPage = value;
  }, {
    deep: true,
    immediate: true
  });
  watch(() => props.data, api2.watchData, {
    immediate: true
  });
  watch(() => state.checkableData, api2.updateAllChecked);
  watch(() => props.defaultChecked, (value, oldvalue) => api2.watchDefaultCheckded({
    value,
    oldvalue
  }), {
    immediate: true
  });
  watch(() => props.isToLeft, () => {
    if (state.renderType === Table) {
      state.internalPage = 1;
      state.currentPage = 1;
      state.render.data = state.filteredData;
    }
  });
};
const renderless = (props, {
  computed,
  reactive,
  watch,
  toRaw
}, {
  $prefix,
  emit,
  parent,
  vm,
  slots,
  designConfig
}) => {
  const api2 = {};
  const Table = $prefix + "Table";
  const Tree = $prefix + "Tree";
  const state = initState({
    reactive,
    props,
    parent,
    computed,
    api: api2,
    slots,
    designConfig
  });
  Object.assign(api2, {
    state,
    toRaw,
    sizesChange: sizesChange(state),
    setPosition: setPosition({
      parent,
      state
    }),
    selectChange: selectChange(state),
    handlePageChange: handlePageChange(state),
    clearQuery: clearQuery(state),
    checkedEvent: checkedEvent(state),
    getDeteminate: getDeteminate(state),
    updateAllChecked: updateAllChecked({
      state,
      Table,
      Tree
    }),
    handleAllCheckedChange: handleAllCheckedChange({
      state,
      Table,
      Tree,
      vm
    }),
    getCheckedSummary: getCheckedSummary({
      props,
      state,
      Tree
    }),
    getFilterTreeData: getFilterTreeData({
      props,
      state
    }),
    getTreeCheckableData: getTreeCheckableData(state),
    getStrictData: getStrictData({
      props,
      state
    }),
    setExpandCache: setExpandCache(state),
    getCheckableData: getCheckableData({
      api: api2,
      state,
      Tree
    }),
    getFilterData: getFilterData({
      api: api2,
      props,
      state,
      Table,
      Tree
    }),
    watchData: watchData({
      api: api2,
      props,
      state,
      Tree
    }),
    watchDefaultCheckded: watchDefaultCheckded({
      api: api2,
      props,
      state,
      Tree
    }),
    watchChecked: watchChecked({
      api: api2,
      emit,
      state
    })
  });
  state.render = initStateRender({
    reactive,
    state,
    props,
    api: api2
  });
  initWatcher({
    watch,
    state,
    api: api2,
    props,
    Table
  });
  return api2;
};
export { api, renderless };