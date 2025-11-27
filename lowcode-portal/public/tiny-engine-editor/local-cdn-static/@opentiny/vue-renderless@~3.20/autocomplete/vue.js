import "../chunk-G2ADBYYC.js";
import debounce from './../common/deps/debounce.js';
import userPopper from './../common/deps/vue-popper.js';
import { guid } from './../common/string.js';
import { computedVisible, watchVisible, mounted, getData, handleChange, handleFocus, handleBlur, handleClear, close, open, handleKeyEnter, select, highlight } from './index.js';
const api = ["state", "suggestionState", "getInput", "handleChange", "close", "open", "handleFocus", "handleBlur", "handleClear", "handleKeyEnter", "highlight", "select", "doDestroy"];
const initState = ({
  reactive,
  $prefix,
  computed,
  props,
  inject
}) => {
  var _a;
  const state = reactive({
    showAutoWidth: inject("showAutoWidth", null),
    popperElm: null,
    activated: false,
    suggestions: [],
    loading: false,
    highlightedIndex: -1,
    suggestionDisabled: false,
    id: $prefix + "-" + guid(),
    suggestionVisible: computed(() => computedVisible(state)),
    // props.validateEvent优先级大于inject，都没有配置默认为true
    validateEvent: (_a = props.validateEvent) != null ? _a : inject("validateEvent", true)
  });
  return state;
};
const initSuggestionState = ({
  reactive,
  parent,
  showPopper,
  popperElm,
  referenceElm
}) => {
  return reactive({
    parent,
    dropdownWidth: "",
    showPopper,
    popperElm,
    referenceElm
  });
};
const initApi = ({
  api: api2,
  state,
  doDestroy,
  suggestionState,
  emit,
  vm,
  props,
  updatePopper,
  nextTick,
  constants,
  dispatch
}) => {
  api2.getData = getData({
    props,
    state,
    updatePopper,
    nextTick
  });
  Object.assign(api2, {
    state,
    doDestroy,
    suggestionState,
    close: close(state),
    open: open(api2),
    handleBlur: handleBlur({
      emit,
      state,
      dispatch,
      props
    }),
    mounted: mounted({
      vm,
      state,
      suggestionState
    }),
    highlight: highlight({
      constants,
      vm,
      state
    }),
    handleClear: handleClear({
      emit,
      state
    }),
    select: select({
      emit,
      nextTick,
      props,
      state,
      dispatch
    }),
    watchVisible: watchVisible({
      suggestionState,
      vm
    }),
    handleChange: handleChange({
      api: api2,
      emit,
      state,
      props,
      dispatch
    }),
    handleFocus: handleFocus({
      api: api2,
      emit,
      props,
      state
    }),
    handleKeyEnter: handleKeyEnter({
      api: api2,
      emit,
      nextTick,
      props,
      state
    }),
    debouncedGetData: debounce(props.debounce, api2.getData)
  });
};
const renderless = (props, {
  computed,
  onBeforeUnmount,
  onMounted,
  reactive,
  watch,
  toRefs,
  onDeactivated,
  inject
}, {
  $prefix,
  vm,
  parent,
  emit,
  constants,
  nextTick,
  slots,
  dispatch
}) => {
  const api2 = {};
  const state = initState({
    reactive,
    $prefix,
    computed,
    props,
    inject
  });
  const {
    showPopper,
    popperElm,
    referenceElm,
    doDestroy,
    updatePopper
  } = userPopper({
    reactive,
    watch,
    vm,
    emit,
    slots,
    nextTick,
    props,
    onBeforeUnmount,
    toRefs,
    onDeactivated
  });
  const suggestionState = initSuggestionState({
    reactive,
    parent,
    showPopper,
    popperElm,
    referenceElm
  });
  initApi({
    api: api2,
    state,
    doDestroy,
    suggestionState,
    emit,
    vm,
    props,
    updatePopper,
    nextTick,
    constants,
    dispatch
  });
  watch(() => state.suggestionVisible, api2.watchVisible);
  onMounted(api2.mounted);
  return api2;
};
export { api, initSuggestionState, renderless };