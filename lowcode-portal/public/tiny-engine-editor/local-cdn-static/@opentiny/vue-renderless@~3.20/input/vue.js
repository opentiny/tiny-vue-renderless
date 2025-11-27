import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { blur, showBox, watchFormSelect, clear, focus, select, getInput, textLength, handleBlur, handleFocus, handleInput, handleChange, calcIconOffset, resizeTextarea, getSuffixVisible, updateIconOffset, calcTextareaHeight, setNativeInputValue, calculateNodeStyling, handleCompositionEnd, handlePasswordVisible, handleCompositionStart, handleCompositionUpdate, hasSelection, handleEnterDisplayOnlyContent, hiddenPassword, setInputDomValue, getDisplayedMaskValue, inputStyle, handleEnterTextarea, handleLeaveTextarea, getDisplayOnlyText, setShowMoreBtn, handleTextareaMouseDown, handleTextareaMouseUp } from './index.js';
import useStorageBox from './../tall-storage/vue-storage-box.js';
import { on, off } from './../common/deps/dom.js';
const api = ["blur", "showBox", "clear", "focus", "state", "select", "getInput", "handleBlur", "handleInput", "handleFocus", "handleChange", "calcIconOffset", "resizeTextarea", "getSuffixVisible", "updateIconOffset", "calcTextareaHeight", "setNativeInputValue", "calculateNodeStyling", "handleCompositionEnd", "handlePasswordVisible", "handleCompositionStart", "handleCompositionUpdate", "addMemory", "searchMemory", "selectedMemory", "storageData", "isMemoryStorage", "hasSelection", "handleEnterDisplayOnlyContent", "hiddenPassword", "inputStyle", "handleEnterTextarea", "handleLeaveTextarea", "handleTextareaMouseDown", "handleTextareaMouseUp"];
const initState = ({
  reactive,
  computed,
  mode,
  props,
  parent,
  constants,
  api: api2,
  vm,
  designConfig
}) => {
  const state = reactive({
    mode,
    maskSymbol: constants.MASKSYMBOL,
    focused: false,
    hovering: false,
    isComposing: false,
    passwordVisible: false,
    maskValueVisible: false,
    boxVisibility: false,
    textareaCalcStyle: {},
    checkedLabel: "",
    enteredTextarea: false,
    sheetvalue: props.modelValue,
    inputSize: computed(() => props.size || state.formItemSize || (parent.tinyForm || {}).size),
    inputSizeMf: computed(() => props.size || state.formItemSize || (parent.tinyForm || {}).size),
    showClear: computed(() => {
      var _a;
      return props.clearable && !state.inputDisabled && !props.readonly && state.nativeInputValue && (!((_a = designConfig == null ? void 0 : designConfig.options) == null ? void 0 : _a.isCloseIconHide) || state.focused || state.hovering);
    }),
    textareaHeight: vm.theme === "saas" ? "28px" : "30px",
    upperLimit: computed(() => parent.$attrs.maxlength),
    textLength: computed(() => textLength(props.modelValue)),
    inputExceed: computed(() => state.isWordLimitVisible && state.textLength > state.upperLimit),
    formItemSize: computed(() => (parent.formItem || {}).formItemSize),
    validateIcon: computed(() => constants.VALIDATE_ICON[state.validateState]),
    showWordLimit: computed(() => props.showWordLimit && parent.$attrs.maxlength),
    inputDisabled: computed(() => props.disabled || (parent.tinyForm || {}).disabled || state.isDisplayOnly || (parent.tinyForm || {}).displayOnly),
    validateState: computed(() => parent.formItem ? parent.formItem.validateState : ""),
    inputStyle: computed(() => api2.inputStyle()),
    textareaStyle: computed(() => __spreadProps(__spreadValues({}, state.textareaCalcStyle), {
      resize: props.resize,
      textAlign: props.textAlign
    })),
    needStatusIcon: computed(() => parent.tinyForm ? parent.tinyForm.statusIcon : false),
    showPwdVisible: computed(() => props.showPassword && !state.inputDisabled && !props.readonly && (!!state.nativeInputValue || state.focused)),
    nativeInputValue: computed(() => props.modelValue === null || props.modelValue === void 0 ? "" : String(props.modelValue)),
    tooltipConfig: computed(() => parent.tinyForm ? parent.tinyForm.tooltipConfig : {}),
    isWordLimitVisible: computed(() => (props.showWordLimit && parent.$attrs.maxlength || props.counter) && (parent.type === "text" || parent.type === "textarea") && !state.inputDisabled && !props.readonly && !props.showPassword),
    isDisplayOnly: computed(() => (props.displayOnly || (parent.tinyForm || {}).displayOnly) && ["text", "textarea", "password", "number"].includes(props.type)),
    displayOnlyTooltip: "",
    showMoreBtn: false,
    showDisplayOnlyBox: false,
    timer: null,
    hiddenPassword: computed(() => api2.hiddenPassword()),
    displayedMaskValue: computed(() => api2.getDisplayedMaskValue()),
    displayOnlyText: computed(() => api2.getDisplayOnlyText()),
    isDragging: false
  });
  return state;
};
const initApi = ({
  api: api2,
  state,
  dispatch,
  broadcast,
  emit,
  vm,
  props,
  parent,
  nextTick
}) => {
  Object.assign(api2, {
    state,
    dispatch,
    broadcast,
    showBox: showBox(state),
    clear: clear(emit),
    getInput: getInput(vm),
    setShowMoreBtn: setShowMoreBtn({
      state,
      vm
    }),
    handleChange: handleChange(emit),
    watchFormSelect: watchFormSelect({
      emit,
      props,
      state
    }),
    calcIconOffset: calcIconOffset({
      vm,
      parent
    }),
    getSuffixVisible: getSuffixVisible({
      parent,
      props,
      state
    }),
    calculateNodeStyling: calculateNodeStyling(),
    handleCompositionStart: handleCompositionStart(state),
    handleCompositionUpdate: handleCompositionUpdate(state),
    setInputDomValue: setInputDomValue({
      state,
      props,
      nextTick,
      vm
    }),
    getDisplayOnlyText: getDisplayOnlyText({
      parent,
      props,
      state
    }),
    handleEnterTextarea: handleEnterTextarea({
      api: api2,
      state,
      props,
      nextTick
    }),
    handleLeaveTextarea: handleLeaveTextarea({
      api: api2,
      state,
      props,
      nextTick,
      vm
    }),
    inputStyle: inputStyle({
      props
    }),
    handleTextareaMouseDown: handleTextareaMouseDown({
      state
    }),
    handleTextareaMouseUp: handleTextareaMouseUp({
      state,
      api: api2
    })
  });
};
const mergeApi = ({
  storages,
  api: api2,
  componentName,
  props,
  emit,
  eventName,
  nextTick,
  parent,
  state,
  vm,
  mode,
  constants
}) => {
  const {
    storageData,
    isMemoryStorage,
    addMemory,
    searchMemory,
    selectedMemory
  } = storages;
  return Object.assign(api2, {
    addMemory,
    storageData,
    searchMemory,
    selectedMemory,
    isMemoryStorage,
    blur: blur(api2),
    focus: focus(api2),
    select: select(api2),
    handleBlur: handleBlur({
      api: api2,
      componentName,
      emit,
      eventName: eventName.blur,
      props,
      state,
      vm
    }),
    handleFocus: handleFocus({
      api: api2,
      emit,
      state
    }),
    handleInput: handleInput({
      api: api2,
      emit,
      nextTick,
      state
    }),
    resizeTextarea: resizeTextarea({
      api: api2,
      parent,
      vm,
      state,
      props
    }),
    updateIconOffset: updateIconOffset(api2),
    calcTextareaHeight: calcTextareaHeight({
      api: api2,
      hiddenTextarea: null,
      props,
      state,
      mode,
      constants
    }),
    setNativeInputValue: setNativeInputValue({
      api: api2,
      state
    }),
    handleCompositionEnd: handleCompositionEnd({
      api: api2,
      state
    }),
    handlePasswordVisible: handlePasswordVisible({
      api: api2,
      nextTick,
      state
    }),
    hasSelection: hasSelection(api2),
    handleEnterDisplayOnlyContent: handleEnterDisplayOnlyContent({
      state,
      props
    }),
    hiddenPassword: hiddenPassword({
      state,
      props
    }),
    getDisplayedMaskValue: getDisplayedMaskValue({
      state
    })
  });
};
const initWatch = ({
  watch,
  state,
  api: api2,
  props,
  nextTick,
  emit,
  componentName,
  eventName
}) => {
  watch(() => props.modelValue, value => {
    if (state.mode === "mobile") {
      state.sheetvalue = value;
      emit("update:modelValue", value);
    }
    nextTick(api2.resizeTextarea);
    if (props.validateEvent) {
      api2.dispatch(componentName, eventName.change, [value]);
    }
    if (props.type === "textarea" && props.popupMore && state.isDisplayOnly) {
      api2.setShowMoreBtn();
    }
    api2.setInputDomValue();
  });
  watch(() => state.maskValueVisible, api2.setInputDomValue);
  watch(() => state.inputDisabled, api2.setInputDomValue);
  watch(() => props.mask, () => {
    api2.setInputDomValue("mask");
  });
  watch(() => props.size, () => nextTick(api2.resizeTextarea), {
    immediate: true
  });
  watch(() => state.nativeInputValue, () => {
    api2.setNativeInputValue();
  });
  watch(() => props.type, () => {
    nextTick(() => {
      api2.setNativeInputValue();
      api2.resizeTextarea();
      api2.updateIconOffset();
    });
  });
  watch(() => state.isDisplayOnly, () => {
    nextTick(() => {
      api2.setNativeInputValue();
      api2.resizeTextarea();
      api2.updateIconOffset();
    });
  });
  watch(() => state.sheetvalue, value => api2.watchFormSelect(value), {
    immediate: true
  });
};
const renderless = (props, {
  computed,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  reactive,
  toRefs,
  watch,
  inject
}, {
  vm,
  refs,
  parent,
  emit,
  constants,
  nextTick,
  broadcast,
  dispatch,
  mode,
  designConfig
}) => {
  const api2 = {};
  const componentName = constants.COMPONENT_NAME.FormItem;
  const eventName = {
    change: "form.change",
    blur: "form.blur"
  };
  const state = initState({
    reactive,
    computed,
    mode,
    props,
    parent,
    constants,
    api: api2,
    vm,
    designConfig
  });
  initApi({
    api: api2,
    state,
    dispatch,
    broadcast,
    emit,
    refs,
    props,
    parent,
    vm,
    nextTick
  });
  const storages = useStorageBox({
    api: api2,
    props,
    reactive,
    toRefs
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  mergeApi({
    api: api2,
    storages,
    componentName,
    emit,
    eventName,
    props,
    state,
    nextTick,
    parent,
    vm,
    mode,
    constants
  });
  initWatch({
    watch,
    state,
    api: api2,
    props,
    nextTick,
    emit,
    componentName,
    eventName
  });
  onMounted(() => {
    api2.setNativeInputValue();
    api2.resizeTextarea();
    api2.updateIconOffset();
    api2.setInputDomValue();
    dispatch("Select", "input-mounted", vm.$el);
    dispatch("Tooltip", "tooltip-update", vm.$el);
    if (props.type === "textarea" && props.popupMore && state.isDisplayOnly) {
      api2.setShowMoreBtn(true);
      on(window, "resize", api2.setShowMoreBtn);
    }
  });
  onBeforeUnmount(() => {
    if (props.type === "textarea" && props.popupMore && state.isDisplayOnly) {
      off(window, "resize", api2.setShowMoreBtn);
    }
  });
  onUpdated(() => {
    nextTick(api2.updateIconOffset);
  });
  return api2;
};
export { api, renderless };