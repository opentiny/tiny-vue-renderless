import "../chunk-G2ADBYYC.js";
import { computedGridColumns, queryGridData, multiGridSelectAll, multiGridSelectChange, selectedBoxInit, selectedBoxClear, selectedBoxDelete, selectedBoxDrag, doMultiTreeFilter, multiTreeAfterLoad, multiTreeFilterNode, multiTreeFilterPlain, multiTreeLeavePlain, multiTreeCheck, emitChange, onFooterCancel, onFooterConfirm, emitClose, setChecked, computedConfig, doAutoLookup, multiTreeRadio, multiGridRadioChange, watchMulti, clearStatus, setGridSelection, setTreeSelection, setSelection, getSelection } from './index.js';
const api = ["state", "queryGridData", "multiGridSelectAll", "multiGridSelectChange", "selectedBoxClear", "selectedBoxDelete", "selectedBoxDrag", "doMultiTreeFilter", "multiTreeAfterLoad", "multiTreeFilterNode", "multiTreeFilterPlain", "multiTreeLeavePlain", "multiTreeCheck", "emitChange", "onFooterCancel", "onFooterConfirm", "multiTreeRadio", "multiGridRadioChange", "clearStatus", "setSelection", "getSelection"];
const renderless = (props, {
  reactive,
  computed,
  watch
}, {
  vm,
  nextTick,
  emit,
  constants,
  designConfig
}) => {
  const state = reactive({
    splitValue: 0,
    gridColumns: computed(() => api2.computedGridColumns()),
    selectedChanged: false,
    selectedDatas: [],
    selectedValues: [],
    multiGridStore: {
      selectConfig: computed(() => api2.computedConfig("select")),
      radioConfig: computed(() => api2.computedConfig("radio")),
      inited: false,
      loading: false
    },
    multiTreeStore: {
      viewType: "tree",
      expandedKeys: [],
      checkedKeys: [],
      highlight: null,
      filterText: "",
      inited: false
    },
    lookupStore: {
      datas: []
    },
    theme: vm.theme,
    isBorder: computed(() => {
      if (typeof props.gridOp.border === "boolean") {
        return props.gridOp.border;
      } else {
        return vm.theme !== "saas";
      }
    }),
    constants: (designConfig == null ? void 0 : designConfig.constants) || constants
  });
  state.temporary = {};
  const api2 = {
    state,
    computedGridColumns: computedGridColumns(props),
    selectedBoxInit: selectedBoxInit({
      props,
      vm,
      nextTick
    }),
    selectedBoxClear: selectedBoxClear({
      props,
      state,
      vm
    }),
    selectedBoxDelete: selectedBoxDelete({
      props,
      state,
      vm
    }),
    selectedBoxDrag: selectedBoxDrag({
      props,
      state
    }),
    doMultiTreeFilter: doMultiTreeFilter({
      props,
      state,
      nextTick,
      vm
    }),
    multiTreeFilterNode: multiTreeFilterNode(props),
    multiTreeLeavePlain: multiTreeLeavePlain({
      props,
      state
    }),
    emitChange: emitChange({
      props,
      state,
      emit
    }),
    emitClose: emitClose(emit),
    computedConfig: computedConfig({
      props,
      state
    }),
    doAutoLookup: doAutoLookup({
      props,
      state,
      emit
    }),
    multiGridRadioChange: multiGridRadioChange({
      props,
      state
    })
  };
  Object.assign(api2, {
    multiGridSelectAll: multiGridSelectAll({
      api: api2,
      props,
      state
    }),
    multiGridSelectChange: multiGridSelectChange({
      api: api2,
      props,
      state,
      vm
    }),
    multiTreeAfterLoad: multiTreeAfterLoad({
      api: api2,
      props,
      state,
      vm
    }),
    multiTreeCheck: multiTreeCheck({
      api: api2,
      props,
      state,
      vm,
      nextTick
    }),
    multiTreeFilterPlain: multiTreeFilterPlain({
      api: api2,
      props,
      state
    }),
    onFooterCancel: onFooterCancel({
      api: api2,
      props
    }),
    onFooterConfirm: onFooterConfirm({
      api: api2,
      props
    }),
    queryGridData: queryGridData({
      api: api2,
      props,
      state
    }),
    setChecked: setChecked({
      api: api2,
      props,
      state
    }),
    multiTreeRadio: multiTreeRadio({
      api: api2,
      props
    }),
    watchMulti: watchMulti({
      api: api2,
      state,
      props
    }),
    clearStatus: clearStatus(api2),
    setSelection: setSelection({
      api: api2,
      props
    }),
    getSelection: getSelection({
      state
    }),
    setTreeSelection: setTreeSelection({
      api: api2,
      state,
      vm,
      props
    }),
    setGridSelection: setGridSelection({
      api: api2,
      state,
      vm
    })
  });
  watch(() => props.visible, value => {
    if (value && !state.multiGridStore.inited) {
      api2.queryGridData();
    }
  });
  watch(() => props.multi, () => api2.watchMulti(), {
    immediate: true
  });
  return api2;
};
export { api, renderless };