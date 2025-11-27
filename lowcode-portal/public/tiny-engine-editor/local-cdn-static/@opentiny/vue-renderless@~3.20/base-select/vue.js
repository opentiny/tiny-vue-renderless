import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { debouncRquest, getChildValue, calcOverFlow, toggleCheckAll, handleCopyClick, showTip, handleComposition, handleQueryChange, scrollToOption, handleMenuEnter, emitChange, directEmitChange, getOption, getSelectedOption, setSelected, handleFocus, focus, blur, handleBlur, handleClearClick, doDestroy, handleClose, toggleLastOptionHitState, deletePrevTag, managePlaceholder, resetInputState, resetInputHeight, resetHoverIndex, resetDatas, handleOptionSelect, setSoftFocus, getValueIndex, toggleMenu, selectOption, deleteSelected, deleteTag, onInputChange, onOptionDestroy, resetInputWidth, handleResize, checkDefaultFirstOption, setOptionHighlight, getValueKey, emptyText, emptyFlag, recycleScrollerHeight, watchValue, watchVisible, watchOptions, navigateOptions, getPluginOption, watchPropsOption, onMouseenterNative, onMouseleaveNative, onCopying, defaultOnQueryChange, queryChange, toVisible, toHide, mounted, unMount, watchHoverIndex, computeOptimizeOpts, watchOptimizeOpts, computeCollapseTags, computeMultipleLimit, handleDropdownClick, handleEnterTag, calcCollapseTags, initValue, watchInputHover, initQuery, updateModelValue, getLabelSlotValue, computedTagsStyle, computedReadonly, computedShowClose, computedCollapseTagSize, computedShowNewOption, computedShowCopy, computedOptionsAllDisabled, computedDisabledTooltipContent, computedSelectDisabled, watchInitValue, watchShowClose, getOptionIndexArr, queryVisibleOptions, computedGetIcon, computedGetTagType, clearSearchText, clearNoMatchValue, handleDebouncedQueryChange, onClickCollapseTag, computedIsExpand, updateSelectedData, hidePanel, computedShowTagText, isTagClosable } from './index.js';
import debounce from './../common/deps/debounce.js';
import { isNumber } from './../common/type.js';
const api = ["state", "toggleCheckAll", "handleCopyClick", "focus", "blur", "showTip", "doDestroy", "getOption", "emitChange", "handleBlur", "toggleMenu", "getValueKey", "handleFocus", "handleClose", "setSoftFocus", "getValueIndex", "scrollToOption", "resetHoverIndex", "onOptionDestroy", "resetInputWidth", "resetInputHeight", "managePlaceholder", "checkDefaultFirstOption", "setOptionHighlight", "toggleLastOptionHitState", "deleteTag", "setSelected", "selectOption", "handleResize", "deletePrevTag", "onInputChange", "deleteSelected", "handleMenuEnter", "resetInputState", "handleClearClick", "handleComposition", "handleQueryChange", "handleOptionSelect", "debouncedOnInputChange", "debouncedQueryChange", "navigateOptions", "onMouseenterNative", "onMouseleaveNative", "onCopying", "handleDropdownClick", "handleEnterTag", "getLabelSlotValue", "updateModelValue", "clearSearchText", "onClickCollapseTag", "updateSelectedData", "hidePanel", "computedShowTagText", "isTagClosable"];
const initState = ({
  reactive,
  computed,
  props,
  api: api2,
  emitter,
  parent,
  constants,
  useBreakpoint,
  vm,
  designConfig
}) => {
  const stateAdd = initStateAdd({
    computed,
    props,
    api: api2,
    parent
  });
  const state = reactive(__spreadProps(__spreadValues({}, stateAdd), {
    selectEmitter: emitter(),
    datas: [],
    initDatas: [],
    query: "",
    magicKey: 0,
    options: [],
    visible: false,
    showCopy: computed(() => api2.computedShowCopy()),
    showWarper: true,
    // 显示下拉外层控制
    selected: props.multiple ? [] : {},
    softFocus: false,
    hover: false,
    triggerSearch: false,
    firstAutoSearch: props.remoteConfig.autoSearch,
    tagsStyle: computed(() => api2.computedTagsStyle()),
    readonly: computed(() => api2.computedReadonly()),
    iconClass: computed(() => state.visible ? "" : constants.CLASS.IsReverse),
    showClose: computed(() => api2.computedShowClose()),
    optionsAllDisabled: computed(() => api2.computedOptionsAllDisabled()),
    collapseTagSize: computed(() => api2.computedCollapseTagSize()),
    showNewOption: computed(() => api2.computedShowNewOption()),
    selectSize: computed(() => props.size || state.formItemSize),
    optimizeOpts: computed(() => api2.computeOptimizeOpts()),
    optimizeStore: {
      valueIndex: 0,
      recycleScrollerHeight: computed(() => api2.recycleScrollerHeight())
    },
    collapseTags: computed(() => api2.computeCollapseTags()),
    multipleLimit: computed(() => api2.computeMultipleLimit()),
    disabledTooltipContent: computed(() => api2.computedDisabledTooltipContent()),
    isExpand: computed(() => api2.computedIsExpand()),
    collapseTagsLength: 0,
    initValue: [],
    key: 0,
    device: "",
    timer: null,
    modelValue: [],
    queryValue: "",
    selectedCopy: [],
    compareValue: null,
    selectedVal: computed(() => state.device === "mb" && props.multiple && state.visible ? state.selectedCopy : state.selected),
    displayOnlyContent: computed(() => props.multiple && Array.isArray(state.selected) ? state.selected.map(item => item.state ? item.state.currentLabel : item.currentLabel).join("; ") : ""),
    breakpoint: useBreakpoint ? useBreakpoint().current : "",
    isSaaSTheme: vm.theme === "saas",
    disabledOptionHover: false,
    hasClearSelection: false,
    // tiny 新增
    getIcon: computed(() => api2.computedGetIcon()),
    getTagType: computed(() => api2.computedGetTagType()),
    isSelectAll: computed(() => state.selectCls === "checked-sur"),
    autoHideDownIcon: (() => {
      if ((designConfig == null ? void 0 : designConfig.state) && "autoHideDownIcon" in designConfig.state) {
        return designConfig.state.autoHideDownIcon;
      }
      return true;
    })()
  }));
  return state;
};
const initStateAdd = ({
  computed,
  props,
  api: api2,
  parent
}) => {
  return {
    selectedTags: [],
    tips: "",
    showTip: false,
    tipHover: false,
    selectHover: false,
    tipTimer: null,
    selectCls: "checked-sur",
    filteredSelectCls: "checked-sur",
    overflow: null,
    completed: false,
    inputWidth: 0,
    inputPaddingRight: 0,
    hoverIndex: -1,
    hoverValue: -1,
    optionsIndex: -1,
    inputLength: 20,
    optionsCount: 0,
    selectFiexd: {},
    createdLabel: null,
    isSilentBlur: false,
    cachedOptions: [],
    selectedLabel: "",
    previousQuery: null,
    inputHovering: false,
    createdSelected: false,
    isOnComposition: false,
    cachedPlaceHolder: props.placeholder,
    inputHeight: 0,
    initialInputHeight: 0,
    currentPlaceholder: props.placeholder,
    filteredOptionsCount: 0,
    remoteData: [],
    currentKey: props.modelValue,
    updateId: "",
    popperElm: null,
    debounce: computed(() => isNumber(props.queryDebounce) ? props.queryDebounce : props.remote ? 300 : 0),
    emptyText: computed(() => api2.emptyText()),
    emptyFlag: computed(() => api2.emptyFlag()),
    formItemSize: computed(() => (parent.formItem || {
      state: {}
    }).state.formItemSize),
    selectDisabled: computed(() => api2.computedSelectDisabled()),
    isDisplayOnly: computed(() => props.displayOnly || (parent.form || {}).displayOnly),
    isDisabled: computed(() => props.disabled || (parent.form || {}).disabled),
    isShowTagText: computed(() => api2.computedShowTagText()),
    searchSingleCopy: computed(() => props.allowCopy && !props.multiple && props.filterable),
    childrenName: computed(() => "children"),
    tooltipContent: {},
    isHidden: false,
    optionIndexArr: [],
    showCollapseTag: false,
    exceedMaxVisibleRow: false,
    // 是否超出默认最大显示行数
    toHideIndex: Infinity
    // 第一个超出被隐藏的索引
  };
};
const initApi = ({
  api: api2,
  props,
  state,
  emit,
  maskState,
  constants,
  parent,
  nextTick,
  dispatch,
  t,
  vm,
  isMobileFirstMode,
  designConfig
}) => {
  Object.assign(api2, {
    state,
    maskState,
    doDestroy: doDestroy(vm),
    blur: blur({
      vm,
      state
    }),
    focus: focus({
      vm,
      state
    }),
    getValueKey: getValueKey(props),
    handleClose: handleClose(state),
    getValueIndex: getValueIndex(props),
    getChildValue: getChildValue(),
    getOption: getOption({
      props,
      state,
      api: api2
    }),
    getSelectedOption: getSelectedOption({
      props,
      state
    }),
    emitChange: emitChange({
      emit,
      props,
      state,
      constants
    }),
    directEmitChange: directEmitChange({
      emit,
      props,
      state,
      constants
    }),
    toggleMenu: toggleMenu({
      vm,
      state,
      props,
      api: api2,
      isMobileFirstMode
    }),
    showTip: showTip({
      props,
      state,
      vm
    }),
    onOptionDestroy: onOptionDestroy(state),
    setSoftFocus: setSoftFocus({
      vm,
      state
    }),
    resetInputWidth: resetInputWidth({
      vm,
      state
    }),
    resetHoverIndex: resetHoverIndex({
      props,
      state
    }),
    resetDatas: resetDatas({
      props,
      state
    }),
    scrollToOption: scrollToOption({
      vm,
      constants
    }),
    handleCopyClick: handleCopyClick({
      parent,
      props,
      state
    }),
    managePlaceholder: managePlaceholder({
      vm,
      state
    }),
    checkDefaultFirstOption: checkDefaultFirstOption(state),
    setOptionHighlight: setOptionHighlight(state),
    handleBlur: handleBlur({
      constants,
      dispatch,
      emit,
      state,
      designConfig
    }),
    toggleLastOptionHitState: toggleLastOptionHitState({
      state
    }),
    emptyText: emptyText({
      I18N: constants.I18N,
      props,
      state,
      t,
      isMobileFirstMode
    }),
    emptyFlag: emptyFlag({
      props,
      state
    }),
    getOptionIndexArr: getOptionIndexArr({
      props,
      state,
      api: api2
    }),
    queryVisibleOptions: queryVisibleOptions({
      props,
      vm,
      isMobileFirstMode
    }),
    recycleScrollerHeight: recycleScrollerHeight({
      state,
      props,
      recycle: constants.RECYCLE
    }),
    watchPropsOption: watchPropsOption({
      constants,
      parent,
      props,
      state
    }),
    onMouseenterNative: onMouseenterNative({
      state
    }),
    onMouseleaveNative: onMouseleaveNative({
      state
    }),
    onCopying: onCopying({
      state,
      vm
    }),
    watchHoverIndex: watchHoverIndex({
      state
    }),
    computeOptimizeOpts: computeOptimizeOpts({
      props,
      designConfig
    }),
    computeCollapseTags: computeCollapseTags(props),
    computeMultipleLimit: computeMultipleLimit({
      props,
      state
    }),
    watchInputHover: watchInputHover({
      vm
    }),
    initQuery: initQuery({
      props,
      state,
      constants,
      vm
    }),
    updateModelValue: updateModelValue({
      props,
      emit,
      state
    }),
    computedTagsStyle: computedTagsStyle({
      props,
      parent,
      state,
      vm
    }),
    computedReadonly: computedReadonly({
      props,
      state
    }),
    computedShowClose: computedShowClose({
      props,
      state
    }),
    computedCollapseTagSize: computedCollapseTagSize(state),
    computedShowNewOption: computedShowNewOption({
      props,
      state
    }),
    computedShowCopy: computedShowCopy({
      props,
      state
    }),
    computedOptionsAllDisabled: computedOptionsAllDisabled(state),
    computedDisabledTooltipContent: computedDisabledTooltipContent(state),
    computedSelectDisabled: computedSelectDisabled({
      props,
      parent
    }),
    computedIsExpand: computedIsExpand({
      props,
      state
    }),
    watchInitValue: watchInitValue({
      props,
      emit
    }),
    watchShowClose: watchShowClose({
      nextTick,
      state,
      parent
    }),
    // tiny 新增
    computedGetIcon: computedGetIcon({
      designConfig,
      props
    }),
    computedGetTagType: computedGetTagType({
      designConfig,
      props
    }),
    clearSearchText: clearSearchText({
      state,
      api: api2
    }),
    clearNoMatchValue: clearNoMatchValue({
      props,
      emit
    }),
    computedShowTagText: computedShowTagText({
      state
    }),
    isTagClosable: isTagClosable(),
    updateSelectedData: updateSelectedData({
      state
    }),
    hidePanel: hidePanel({
      state
    })
  });
  addApi({
    api: api2,
    props,
    state,
    emit,
    constants,
    parent,
    nextTick,
    dispatch,
    vm,
    isMobileFirstMode,
    designConfig
  });
};
const addApi = ({
  api: api2,
  props,
  state,
  emit,
  constants,
  parent,
  nextTick,
  dispatch,
  vm,
  isMobileFirstMode,
  designConfig
}) => {
  Object.assign(api2, {
    resetInputHeight: resetInputHeight({
      api: api2,
      constants,
      nextTick,
      props,
      vm,
      state,
      designConfig
    }),
    calcOverFlow: calcOverFlow({
      vm,
      props,
      state
    }),
    handleFocus: handleFocus({
      api: api2,
      emit,
      props,
      state
    }),
    deleteTag: deleteTag({
      api: api2,
      constants,
      emit,
      props,
      vm,
      nextTick,
      state
    }),
    watchValue: watchValue({
      api: api2,
      constants,
      dispatch,
      props,
      vm,
      state
    }),
    toHide: toHide({
      constants,
      state,
      props,
      vm,
      api: api2
    }),
    toVisible: toVisible({
      constants,
      state,
      props,
      vm,
      api: api2,
      nextTick
    }),
    setSelected: setSelected({
      api: api2,
      constants,
      nextTick,
      props,
      vm,
      state
    }),
    selectOption: selectOption({
      api: api2,
      state,
      props
    }),
    handleResize: handleResize({
      api: api2,
      props,
      state
    }),
    watchOptions: watchOptions({
      api: api2,
      constants,
      nextTick,
      parent,
      props,
      state,
      vm
    }),
    watchVisible: watchVisible({
      api: api2,
      constants,
      emit,
      state,
      vm,
      props,
      isMobileFirstMode
    }),
    deletePrevTag: deletePrevTag({
      api: api2,
      constants,
      props,
      state,
      vm
    }),
    onInputChange: onInputChange({
      api: api2,
      props,
      state,
      constants,
      nextTick
    }),
    deleteSelected: deleteSelected({
      api: api2,
      constants,
      emit,
      props,
      vm,
      state
    }),
    handleMenuEnter: handleMenuEnter({
      api: api2,
      nextTick,
      state,
      props
    }),
    resetInputState: resetInputState({
      api: api2,
      vm,
      state
    }),
    navigateOptions: navigateOptions({
      api: api2,
      state,
      props,
      nextTick
    }),
    handleClearClick: handleClearClick(api2),
    handleComposition: handleComposition({
      api: api2,
      nextTick,
      state
    }),
    handleQueryChange: handleQueryChange({
      api: api2,
      constants,
      nextTick,
      props,
      vm,
      state
    }),
    handleOptionSelect: handleOptionSelect({
      api: api2,
      nextTick,
      props,
      vm,
      state
    }),
    getPluginOption: getPluginOption({
      api: api2,
      props,
      state
    }),
    toggleCheckAll: toggleCheckAll({
      api: api2,
      emit,
      state,
      props
    }),
    handleDebouncedQueryChange: handleDebouncedQueryChange({
      state,
      api: api2
    }),
    debouncedQueryChange: event => {
      const value = props.shape ? event : event.target.value;
      api2.handleDebouncedQueryChange(value);
    },
    debouncedOnInputChange: debounce(state.debounce, () => {
      api2.onInputChange();
    }),
    debouncRquest: debouncRquest({
      api: api2,
      state,
      props
    }),
    defaultOnQueryChange: defaultOnQueryChange({
      props,
      state,
      constants,
      api: api2,
      nextTick,
      vm
    }),
    queryChange: queryChange({
      props,
      state,
      constants,
      api: api2,
      nextTick,
      vm
    }),
    mounted: mounted({
      api: api2,
      parent,
      state,
      props,
      vm,
      designConfig
    }),
    unMount: unMount({
      api: api2,
      parent,
      vm,
      state
    }),
    watchOptimizeOpts: watchOptimizeOpts({
      props,
      state
    }),
    handleDropdownClick: handleDropdownClick({
      props,
      vm,
      state,
      emit
    }),
    handleEnterTag: handleEnterTag({
      state
    }),
    calcCollapseTags: calcCollapseTags({
      state,
      vm,
      props
    }),
    initValue: initValue({
      state
    }),
    getLabelSlotValue: getLabelSlotValue({
      props,
      state
    }),
    onClickCollapseTag: onClickCollapseTag({
      state,
      props,
      nextTick,
      api: api2
    })
  });
};
const initWatch = ({
  watch,
  props,
  api: api2,
  state,
  nextTick
}) => {
  watch(() => state.selectDisabled, () => nextTick(api2.resetInputHeight));
  watch(() => props.placeholder, value => {
    state.cachedPlaceHolder = state.currentPlaceholder = value;
  });
  watch(() => props.modelValue, () => {
    if (props.multiple && Array.isArray(props.modelValue)) {
      state.modelValue = [...props.modelValue];
    } else {
      state.modelValue = props.modelValue;
    }
  }, {
    immediate: true,
    deep: true
  });
  watch(() => state.modelValue, api2.watchValue);
  watch(() => state.selectedLabel, () => {
    if (props.trim) {
      state.selectedLabel = state.selectedLabel.trim();
    }
  });
  watch(() => props.extraQueryParams, () => api2.handleQueryChange(state.previousQuery, true), {
    deep: true
  });
  watch(() => state.breakpoint, val => {
    if (val === "default") {
      state.device = "mb";
    } else {
      state.device = "pc";
    }
  }, {
    immediate: true,
    deep: true
  });
  watch(() => state.device, (newVal, oldVal) => {
    if (oldVal !== "" && state.visible) {
      api2.updateModelValue(state.modelValue, true);
    }
  });
  watch(() => state.visible, api2.watchVisible);
  watch(() => state.initValue, api2.watchInitValue, {
    deep: true
  });
  addWatch({
    watch,
    props,
    api: api2,
    state,
    nextTick
  });
};
const addWatch = ({
  watch,
  props,
  api: api2,
  state,
  nextTick
}) => {
  watch(() => [...state.options], api2.watchOptions);
  watch(() => state.hoverIndex, api2.watchHoverIndex);
  props.options && watch(() => props.options, api2.watchPropsOption, {
    immediate: true,
    deep: true
  });
  props.optimization && watch(() => state.optimizeOpts, api2.watchOptimizeOpts, {
    immediate: true
  });
  watch([() => state.inputHovering, () => state.visible], api2.watchInputHover);
  watch(() => state.showClose, api2.watchShowClose, {
    immediate: true
  });
  watch(() => state.selectHover, () => props.hoverExpand && !props.disabled && !state.isDisplayOnly && nextTick(api2.resetInputHeight));
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
  provide,
  inject
}, {
  vm,
  parent,
  emit,
  constants,
  nextTick,
  dispatch,
  t,
  emitter,
  isMobileFirstMode,
  useBreakpoint,
  designConfig
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    computed,
    props,
    api: api2,
    emitter,
    parent,
    constants,
    useBreakpoint,
    vm,
    designConfig
  });
  const dialog = inject("dialog", null);
  provide("selectEmitter", state.selectEmitter);
  provide("selectVm", vm);
  const maskState = reactive({
    width: "",
    height: "",
    top: ""
  });
  initApi({
    api: api2,
    props,
    state,
    emit,
    maskState,
    constants,
    parent,
    nextTick,
    dispatch,
    t,
    vm,
    isMobileFirstMode,
    designConfig
  });
  parent.$on("handle-clear", event => {
    api2.handleClearClick(event);
  });
  if (props.multiple && !Array.isArray(props.modelValue)) {
    emit("update:modelValue", []);
  }
  if (!props.multiple && Array.isArray(props.modelValue)) {
    emit("update:modelValue", "");
  }
  dialog && dialog.state.emitter.on("handleSelectClose", api2.handleClose);
  state.selectEmitter.on(constants.EVENT_NAME.handleOptionClick, api2.handleOptionSelect);
  state.selectEmitter.on(constants.EVENT_NAME.setSelected, api2.setSelected);
  state.selectEmitter.on(constants.EVENT_NAME.initValue, api2.initValue);
  initWatch({
    watch,
    props,
    api: api2,
    state,
    nextTick
  });
  onMounted(api2.mounted);
  onBeforeUnmount(() => {
    api2.unMount();
    dialog && dialog.state.emitter.off("handleSelectClose", api2.handleClose);
  });
  return api2;
};
export { api, renderless };