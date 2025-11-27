import { __spreadValues } from "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import userPopper from './../common/deps/vue-popper.js';
import { computedGetTitle, computedTreeOp, computedModalWidth, createSearchForm, filterNode, getColumns, getDisplay, getMultiSelectedData, getRadioSelectedData, handleClear, handleConfirm, handleOpen, handleReset, handleCancel, handleBeforeClose, handleSearch, handleSizeChange, initDisplay, openDialog, query, selectedGridSelectAll, selectedGridSelectChange, sourceGridSelectAll, sourceGridSelectChange, treeCheckChange, watchFilterText, handleNumberPageChange, doSearch, doClear, doSuggesst, closeSuggestPanel, getSuggestParam, suggestRadioChange, updateSuggestWidth, handlePager, initSearchOption, mounted, doDestroy, selectedBoxInit, selectedBoxClear, selectedBoxDelete, selectedBoxDrag, radioChangeFn, computedTreeMaxHeight } from './index.js';
const api = ["state", "handleOpen", "openDialog", "handleClear", "handleConfirm", "handleReset", "handleSearch", "handleCancel", "handleBeforeClose", "handleSizeChange", "selectedGridSelectAll", "selectedGridSelectChange", "sourceGridSelectAll", "sourceGridSelectChange", "treeCheckChange", "handleNumberPageChange", "doSearch", "doClear", "doSuggesst", "closeSuggestPanel", "popper", "doSuggesstNow", "suggestRadioChange", "doDestroy", "selectedBoxClear", "selectedBoxDelete", "selectedBoxDrag", "radioChangeFn", "computedTreeMaxHeight"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2,
  constants,
  t,
  parent,
  vm
}) => {
  const state = reactive({
    showContent: false,
    open: false,
    display: "",
    getTitle: computed(() => api2.computedGetTitle({
      constants,
      props,
      t
    })),
    readonly: computed(() => !props.suggest && props.readonly),
    modalWidth: computed(() => api2.computedModalWidth({
      constants,
      props
    })),
    conditions: props.conditions,
    activeName: props.showHistory ? constants.ACTIVE_NAME.history : constants.ACTIVE_NAME.source,
    commitValue: Array.isArray(props.modelValue) ? props.modelValue.slice(0) : props.modelValue,
    currentPage: 1,
    baseColumns: computed(() => getColumns({
      constants,
      props
    })),
    removedNodeId: [],
    selectedDatas: [],
    selectedValues: [],
    sourceGridDataset: [],
    fullGridData: [],
    historyGridDataset: [],
    filterText: "",
    treeOp: computed(() => api2.computedTreeOp(props, state)),
    theme: vm.theme,
    pagerConfig: reactive(__spreadValues({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      layout: "prev,pager,next"
    }, props.gridOp.pagerOp || props.pagerOp || {})),
    loading: false,
    treeSelectList: [],
    radioConfig: props.radioConfig,
    searchOp: {},
    cacheStore: {},
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    disabled: computed(() => props.disabled || state.formDisabled),
    suggestList: [],
    showSuggestPanel: false,
    inputHover: false,
    search: null,
    closeSuggestPanelInvoker: null,
    treeWrapperMaxHeight: "auto"
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  state,
  parent,
  vm,
  emit,
  popper,
  constants,
  nextTick
}) => {
  Object.assign(api2, {
    state,
    popper,
    computedGetTitle,
    computedModalWidth,
    filterNode: filterNode(),
    query: query({
      constants,
      parent,
      props,
      state
    }),
    watchFilterText: watchFilterText(vm),
    treeCheckChange: treeCheckChange({
      constants,
      state,
      props
    }),
    getDisplay: getDisplay({
      constants,
      props,
      state
    }),
    createSearchForm: createSearchForm(props),
    handleCancel: handleCancel({
      props,
      state,
      constants
    }),
    handleBeforeClose: handleBeforeClose({
      props,
      state,
      constants
    }),
    getMultiSelectedData: getMultiSelectedData({
      props,
      state
    }),
    getRadioSelectedData: getRadioSelectedData({
      constants,
      props,
      state,
      vm
    }),
    selectedGridSelectAll: selectedGridSelectAll({
      constants,
      props,
      vm,
      state
    }),
    selectedGridSelectChange: selectedGridSelectChange({
      constants,
      props,
      vm,
      state
    }),
    handleReset: handleReset({
      api: api2,
      state,
      props
    }),
    openDialog: openDialog({
      api: api2,
      emit,
      props,
      state,
      nextTick
    }),
    initDisplay: initDisplay({
      api: api2,
      constants,
      props,
      state,
      nextTick
    }),
    handleSearch: handleSearch({
      api: api2,
      props,
      state,
      vm,
      constants
    }),
    computedTreeOp: computedTreeOp({
      api: api2,
      constants
    }),
    handleSizeChange: handleSizeChange({
      api: api2,
      emit,
      state
    }),
    handleOpen: handleOpen({
      api: api2,
      constants,
      props,
      state
    }),
    handleClear: handleClear({
      constants,
      emit,
      props,
      state
    }),
    handleConfirm: handleConfirm({
      api: api2,
      constants,
      emit,
      props,
      state
    }),
    handleNumberPageChange: handleNumberPageChange({
      api: api2,
      emit,
      state
    }),
    doSearch: doSearch({
      api: api2,
      state,
      props
    }),
    doClear: doClear({
      api: api2,
      state,
      props
    }),
    updateSuggestWidth: updateSuggestWidth({
      vm
    }),
    doSuggesstNow: doSuggesst({
      api: api2,
      state,
      props,
      popper,
      nextTick
    }),
    doSuggesst: debounce(1e3, doSuggesst({
      api: api2,
      state,
      props,
      popper,
      nextTick
    })),
    closeSuggestPanel: closeSuggestPanel({
      api: api2,
      state,
      vm
    }),
    sourceGridSelectChange: sourceGridSelectChange({
      props,
      state,
      api: api2
    }),
    sourceGridSelectAll: sourceGridSelectAll({
      props,
      state,
      api: api2
    }),
    getSuggestParam: getSuggestParam({
      props,
      state,
      api: api2
    }),
    suggestRadioChange: suggestRadioChange({
      api: api2,
      state
    }),
    handlePager: handlePager({
      api: api2,
      props,
      state
    }),
    initSearchOption: initSearchOption({
      api: api2,
      state
    }),
    mounted: mounted({
      api: api2,
      props
    }),
    doDestroy: doDestroy({
      popper
    }),
    selectedBoxInit: selectedBoxInit(vm),
    selectedBoxClear: selectedBoxClear(api2),
    selectedBoxDelete: selectedBoxDelete(api2),
    selectedBoxDrag: selectedBoxDrag({
      props,
      state
    }),
    radioChangeFn: radioChangeFn({
      props,
      api: api2
    }),
    computedTreeMaxHeight: computedTreeMaxHeight({
      vm,
      state
    })
  });
  state.search = api2.createSearchForm(false);
};
const initWatch = ({
  watch,
  props,
  api: api2,
  state,
  popper
}) => {
  watch(() => props.gridOp.data, value => {
    state.fullGridData = value;
    api2.initDisplay(props.modelValue);
  });
  watch(() => state.fullGridData, api2.handlePager);
  watch(() => props.modelValue, api2.initDisplay);
  watch(() => state.filterText, api2.watchFilterText, {
    deep: true
  });
  watch(() => state.showSuggestPanel, value => {
    popper.showPopper.value = value;
  }, {
    immediate: true
  });
  watch(() => props.conditions, api2.initSearchOption, {
    deep: true,
    immediate: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  reactive,
  watch,
  inject,
  toRefs,
  onBeforeUnmount,
  onDeactivated
}, {
  t,
  parent,
  emit,
  constants,
  vm,
  nextTick,
  slots
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2,
    constants,
    t,
    parent,
    vm
  });
  const popper = userPopper({
    emit,
    vm,
    watch,
    onBeforeUnmount,
    props,
    nextTick,
    toRefs,
    slots,
    reactive,
    onDeactivated
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  initApi({
    api: api2,
    props,
    state,
    parent,
    vm,
    emit,
    popper,
    constants,
    nextTick
  });
  initWatch({
    watch,
    props,
    api: api2,
    state,
    popper
  });
  onMounted(api2.mounted);
  onBeforeUnmount(api2.closeSuggestPanel);
  return api2;
};
export { api, renderless };