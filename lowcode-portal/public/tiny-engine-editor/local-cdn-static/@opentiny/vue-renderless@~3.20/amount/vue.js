import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { closePopper, popInput, save, reset, inputBlur, emitChange, inputFocus, toggleVisible, addOutSideEvent, handelClick, initText, onInput, getPrecision, getDecimal, innerFormat, getAmountText, initService, watchModelValue, watchCurrency, onInputPreprocess, initAmount, handleClearClick, handleChange, closeDetailEidtor, openDetailEditor, getAmountTextWithoutCurrncy, watchUiMode } from './index.js';
const api = ["t", "popInput", "state", "editorState", "save", "reset", "inputBlur", "init", "toggleVisible", "inputFocus", "closePopper", "onInput", "getAmountText", "handleClearClick", "handleChange", "openDetailEditor", "closeDetailEidtor", "uiMode", "getAmountTextWithoutCurrncy", "watchUiMode"];
const initState = ({
  reactive,
  computed,
  props,
  $service,
  editorState,
  vm,
  api: api2,
  constants,
  parent
}) => {
  const state = reactive({
    visible: false,
    amount: props.modelValue || "",
    currency: props.currency,
    date: props.date,
    overMaxLen: false,
    isFocus: false,
    lock: false,
    amountText: "",
    lastInput: props.modelValue,
    lastCurrency: props.currency,
    lastDate: props.date,
    format: computed(() => {
      return __spreadProps(__spreadValues({}, getPrecision({
        service: $service,
        props,
        currency: editorState.currency
      })), {
        prefix: state.currency
      });
    }),
    disabled: computed(() => props.disabled || (parent.tinyForm || {}).disabled),
    displayOnly: computed(() => props.displayOnly || (parent.tinyForm || {}).displayOnly),
    theme: vm.theme,
    radioVal: "",
    clearValues: false,
    amountValue: computed(() => api2.getAmountText()),
    amountNumberValue: computed(() => api2.getAmountTextWithoutCurrncy()),
    filterMenu: constants.FILTER_OPTION,
    editorPhase: "close"
    // 'close' | 'selection' | 'currency' | 'date',
  });
  return state;
};
const initEditorState = ({
  reactive,
  props
}) => {
  return reactive({
    amount: "",
    date: "",
    currency: props.currency,
    lastInput: props.modelValue
  });
};
const initUiMode = ({
  useBreakpoint
}) => {
  return useBreakpoint().current;
};
const initApi = ({
  api: api2,
  t,
  editorState,
  props,
  state,
  emit,
  vm,
  uiMode,
  isMobileFirstMode
}) => {
  Object.assign(api2, {
    state,
    t,
    editorState,
    uiMode,
    getDecimal: getDecimal(props),
    innerFormat: innerFormat({
      state,
      props
    }),
    getAmountText: getAmountText({
      state,
      props
    }),
    getAmountTextWithoutCurrncy: getAmountTextWithoutCurrncy({
      state
    }),
    initAmount: initAmount({
      props,
      api: api2
    }),
    onInputPreprocess: onInputPreprocess(props),
    onInput: onInput({
      state,
      props,
      api: api2
    }),
    initText: initText({
      state
    }),
    inputFocus: inputFocus({
      state,
      props
    }),
    inputBlur: inputBlur({
      api: api2,
      props,
      state
    }),
    closePopper: closePopper(state),
    emitChange: emitChange({
      emit,
      state,
      props,
      api: api2
    }),
    popInput: popInput({
      editorState,
      api: api2,
      state,
      props
    }),
    save: save({
      api: api2,
      state,
      editorState
    }),
    reset: reset({
      state,
      editorState
    }),
    handelClick: handelClick({
      api: api2,
      vm
    }),
    addOutSideEvent: addOutSideEvent(api2),
    watchModelValue: watchModelValue({
      api: api2,
      state
    }),
    watchCurrency: watchCurrency({
      api: api2,
      state,
      editorState
    }),
    watchUiMode: watchUiMode({
      api: api2,
      isMobileFirstMode
    }),
    toggleVisible: toggleVisible({
      api: api2,
      props,
      state,
      editorState,
      uiMode,
      isMobileFirstMode
    }),
    handleClearClick: handleClearClick({
      state,
      emit,
      editorState
    }),
    handleChange: handleChange({
      state,
      emit
    }),
    openDetailEditor: openDetailEditor({
      state
    }),
    closeDetailEidtor: closeDetailEidtor({
      state,
      props,
      api: api2
    })
  });
};
const initWatch = ({
  watch,
  props,
  state,
  api: api2,
  uiMode
}) => {
  watch(() => props.modelValue, api2.watchModelValue, {
    immediate: true
  });
  watch(() => props.currency, api2.watchCurrency, {
    immediate: true
  });
  watch(() => props.date, value => {
    state.date = value;
    state.lastDate = value;
  }, {
    immediate: true
  });
  watch(() => props.rounding, value => {
    state.format.rounding = value;
  });
  watch(() => props.digits, value => {
    state.format.fraction = value;
  });
  watch(uiMode, api2.watchUiMode);
};
const renderless = (props, {
  onUnmounted,
  computed,
  reactive,
  watch,
  inject
}, {
  t,
  emit,
  vm,
  service,
  parent,
  constants,
  isMobileFirstMode,
  useBreakpoint
}) => {
  var _a;
  const api2 = {};
  const $service = initService(service);
  const editorState = initEditorState({
    reactive,
    props
  });
  const state = initState({
    reactive,
    computed,
    props,
    $service,
    editorState,
    vm,
    api: api2,
    constants,
    parent
  });
  const uiMode = initUiMode({
    useBreakpoint
  });
  initApi({
    api: api2,
    t,
    editorState,
    props,
    state,
    emit,
    vm,
    uiMode,
    isMobileFirstMode
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  (_a = api2 == null ? void 0 : api2.getDecimal) == null ? void 0 : _a.call(api2, 0);
  initWatch({
    watch,
    props,
    state,
    api: api2,
    uiMode
  });
  onUnmounted(() => {
    var _a2;
    return (_a2 = api2 == null ? void 0 : api2.addOutSideEvent) == null ? void 0 : _a2.call(api2, false);
  });
  parent.$on("handle-clear", event => {
    api2.handleClearClick(event);
  });
  return api2;
};
export { api, renderless };