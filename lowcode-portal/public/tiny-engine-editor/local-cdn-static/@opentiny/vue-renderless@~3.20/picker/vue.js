import "../chunk-G2ADBYYC.js";
import { getPanel, getType, watchIsRange, parseAsFormatAndType, watchPickerVisible, watchMobileVisible, getValueEmpty, getMode, displayValue, typeValueResolveMap, formatAsFormatAndType, dateFormatter, dateParser, rangeFormatter, rangeParser, parsedValue, firstInputId, secondInputId, focus, blur, parseValue, formatToValue, parseString, formatToString, handleMouseEnter, handleInput, handleChange, handleStartInput, handleEndInput, handleStartChange, handleEndChange, handleClose, handleFocus, handleKeydown, hidePicker, showPicker, emitInput, isValidValue, emitChange, mountPicker, updateOptions, handleClickIcon, handlePick, handleSelectRange, getTimezone, getValueFormat, watchModelValue, computedFormat, computedTriggerClass, computedHaveTrigger, initPopper, initGlobalTimezone, emitDbTime, handleEnterDisplayOnlyContent, handleEnterPickerlabel, setInputPaddingLeft, formatInputValue } from './index.js';
import { dateMobileToggle, timeMobileToggle, dateToTimeArray, timeArrayToDate, timeMobileConfirm } from './mb.js';
import { DATEPICKER } from './../common/index.js';
const api = ["state", "btnClick", "handleEndChange", "handleEndInput", "focus", "handleFocus", "handleStartChange", "handleStartInput", "handleKeydown", "handleClickIcon", "handleMouseEnter", "handleInput", "handleChange", "handleClose", "handlePick", "handleSelectRange", "handleSelectChange", "popperElm", "handleEnterDisplayOnlyContent", "handleEnterPickerlabel", "timeMobileToggle", "timeMobileConfirm", "emitInput", "dateMobileToggle"];
const initState = ({
  api: api2,
  reactive,
  vm,
  computed,
  props,
  utils,
  parent,
  breakpoint
}) => {
  const state = reactive({
    historyValue: [],
    historyInput: [],
    historyUserInput: [],
    historyUserValue: [],
    startStatus: false,
    endStatus: false,
    date: null,
    pickerVisible: false,
    showClose: false,
    userInput: null,
    valueOnOpen: null,
    popperElm: null,
    unwatchPickerOptions: null,
    ranged: computed(() => state.type.includes(DATEPICKER.Range)),
    reference: computed(() => vm.$refs.reference.$el || vm.$refs.reference),
    formDisabled: computed(() => (parent.tinyForm || {}).disabled),
    refInput: computed(() => state.reference ? [].slice.call(state.reference.querySelectorAll("input")) : []),
    valueIsEmpty: computed(() => api2.getValueEmpty()),
    triggerClass: computed(() => api2.computedTriggerClass()),
    selectionMode: computed(() => api2.getMode()),
    haveTrigger: computed(() => api2.computedHaveTrigger()),
    displayValue: computed(() => api2.displayValue()),
    parsedValue: computed(() => api2.parsedValue()),
    oldValue: props.modelValue,
    pickerSize: computed(() => props.size),
    pickerDisabled: computed(() => props.disabled || state.formDisabled || state.isDisplayOnly),
    firstInputId: computed(() => api2.firstInputId()),
    secondInputId: computed(() => api2.secondInputId()),
    type: computed(() => api2.getType()),
    timezone: computed(() => api2.getTimezone()),
    valueFormat: computed(() => getValueFormat({
      props,
      utils
    })),
    format: computed(() => api2.computedFormat()),
    labelTooltip: "",
    displayOnlyTooltip: "",
    isDisplayOnly: computed(() => props.displayOnly || (parent.tinyForm || {}).displayOnly),
    isMobileScreen: computed(() => breakpoint.current.value === "default"),
    dateMobileOption: {
      visible: false,
      type: props.type,
      value: props.modelValue
    },
    timeMobileOption: {
      visible: false,
      type: props.type,
      value: [0, 0, 0],
      defaultValue: [0, 0, 0]
    },
    isDateMobileComponent: computed(() => [DATEPICKER.DateRange, DATEPICKER.DateTimeRange, DATEPICKER.DateTime, DATEPICKER.DatePicker, DATEPICKER.Date, DATEPICKER.Dates].includes(props.type)),
    isTimeMobileComponent: computed(() => [DATEPICKER.Time, DATEPICKER.TimeRange, DATEPICKER.TimeSelect, DATEPICKER.TimePicker].includes(props.type)),
    showSeconds: computed(() => (state.format || props.pickerOptions && props.pickerOptions.format || "ss").includes("ss"))
  });
  return state;
};
const initApi = ({
  api: api2,
  props,
  hooks,
  state,
  vnode,
  others,
  utils,
  parent
}) => {
  const {
    t,
    emit,
    dispatch,
    nextTick,
    vm
  } = vnode;
  const {
    TimePanel,
    TimeRangePanel
  } = others;
  const {
    destroyPopper,
    popperElm,
    updatePopper
  } = initPopper({
    props,
    hooks,
    vnode
  });
  state.popperElm = popperElm;
  state.picker = null;
  Object.assign(api2, {
    destroyPopper,
    emitDbTime: emitDbTime({
      emit,
      state,
      t
    }),
    hidePicker: hidePicker({
      destroyPopper,
      state
    }),
    handleSelectChange: ({
      tz,
      date
    }) => !state.ranged && emit("select-change", {
      tz,
      date
    }),
    getPanel: getPanel(others),
    handleFocus: handleFocus({
      emit,
      vm,
      state,
      api: api2
    }),
    getTimezone: getTimezone({
      props,
      utils
    }),
    emitChange: emitChange({
      api: api2,
      dispatch,
      emit,
      props,
      state
    }),
    parsedValue: parsedValue({
      api: api2,
      props,
      state,
      t
    }),
    parseAsFormatAndType: parseAsFormatAndType({
      api: api2
    }),
    typeValueResolveMap: typeValueResolveMap({
      api: api2,
      props,
      t
    }),
    updateOptions: updateOptions({
      api: api2,
      props,
      state
    }),
    focus: focus({
      api: api2,
      props,
      vm
    }),
    handleInput: handleInput({
      api: api2,
      state,
      props
    }),
    handleChange: handleChange({
      api: api2,
      state
    }),
    isValidValue: isValidValue({
      api: api2,
      state
    }),
    emitInput: emitInput({
      api: api2,
      emit,
      props,
      state
    }),
    handleKeydown: handleKeydown({
      api: api2,
      state
    }),
    handleEndChange: handleEndChange({
      api: api2,
      state
    }),
    handleStartChange: handleStartChange({
      api: api2,
      state
    }),
    handleClickIcon: handleClickIcon({
      api: api2,
      props,
      state
    }),
    showPicker: showPicker({
      api: api2,
      nextTick,
      updatePopper,
      state
    }),
    formatToValue: formatToValue({
      api: api2,
      props,
      state
    }),
    formatAsFormatAndType: formatAsFormatAndType({
      api: api2
    }),
    parseString: parseString({
      api: api2,
      state
    }),
    handleClose: handleClose({
      api: api2,
      props,
      state
    }),
    displayValue: displayValue({
      api: api2,
      props,
      state
    }),
    handlePick: handlePick({
      api: api2,
      state
    }),
    watchPickerVisible: watchPickerVisible({
      api: api2,
      vm,
      dispatch,
      emit,
      props,
      state,
      nextTick
    }),
    watchMobileVisible: watchMobileVisible({
      api: api2,
      props,
      state,
      nextTick
    }),
    formatToString: formatToString({
      api: api2,
      state
    }),
    watchIsRange: watchIsRange({
      api: api2,
      state,
      TimePanel,
      TimeRangePanel
    }),
    mountPicker: mountPicker({
      api: api2,
      vm,
      props,
      state,
      updatePopper
    }),
    watchModelValue: watchModelValue({
      api: api2,
      props,
      state,
      dispatch
    }),
    computedFormat: computedFormat({
      props,
      utils
    }),
    computedTriggerClass: computedTriggerClass({
      props,
      state
    }),
    computedHaveTrigger: computedHaveTrigger({
      props
    }),
    setInputPaddingLeft: setInputPaddingLeft({
      props,
      state,
      vm,
      nextTick
    }),
    formatInputValue: formatInputValue({
      props,
      state
    })
  });
  initApi2({
    api: api2,
    props,
    state,
    t,
    parent
  });
  initMobileApi({
    api: api2,
    props,
    state,
    t,
    parent
  });
};
const initApi2 = ({
  api: api2,
  props,
  state,
  t,
  parent
}) => {
  Object.assign(api2, {
    t,
    state,
    blur: blur(state),
    getMode: getMode({
      state
    }),
    getType: getType({
      props,
      parent
    }),
    dateParser: dateParser({
      t,
      props
    }),
    rangeParser: rangeParser(api2),
    rangeFormatter: rangeFormatter(api2),
    dateFormatter: dateFormatter({
      t
    }),
    getValueEmpty: getValueEmpty(props),
    handleEndInput: handleEndInput({
      state,
      props,
      api: api2
    }),
    handleStartInput: handleStartInput({
      state,
      props,
      api: api2
    }),
    firstInputId: firstInputId({
      props,
      state
    }),
    secondInputId: secondInputId({
      props,
      state
    }),
    handleMouseEnter: handleMouseEnter({
      props,
      state
    }),
    initGlobalTimezone: initGlobalTimezone({
      api: api2,
      state,
      props
    }),
    parseValue: parseValue({
      api: api2,
      props,
      state
    }),
    handleSelectRange: handleSelectRange(state),
    handleEnterPickerlabel: handleEnterPickerlabel({
      state,
      props
    }),
    handleEnterDisplayOnlyContent: handleEnterDisplayOnlyContent({
      state,
      t
    })
  });
};
const initMobileApi = ({
  api: api2,
  props,
  state
}) => {
  Object.assign(api2, {
    dateMobileToggle: dateMobileToggle({
      state,
      props,
      api: api2
    }),
    timeMobileToggle: timeMobileToggle({
      state,
      props,
      api: api2
    }),
    timeMobileConfirm: timeMobileConfirm({
      state,
      props,
      api: api2
    }),
    dateToTimeArray,
    timeArrayToDate: timeArrayToDate({
      state,
      props,
      api: api2
    })
  });
};
const initWatch = ({
  api: api2,
  state,
  props,
  watch,
  markRaw
}) => {
  watch(() => state.type, type => state.panel = markRaw(api2.getPanel(type)), {
    immediate: true
  });
  watch(() => [state.dateMobileOption.visible, state.timeMobileOption.visible], api2.watchMobileVisible);
  watch(() => state.pickerVisible, api2.watchPickerVisible);
  watch(() => props.defaultValue, value => state.picker && (state.picker.state.defaultValue = value));
  watch(() => state.parsedValue, value => state.picker && (state.picker.state.value = value), {
    immediate: true
  });
  watch(() => props.type, api2.mountPicker);
  watch(() => props.isRange, api2.watchIsRange);
  watch(() => props.modelValue, api2.watchModelValue);
  watch(() => props.pickerOptions, api2.updateOptions, {
    deep: true
  });
  watch(() => props.label, api2.setInputPaddingLeft);
};
const renderless = (props, hooks, vnode, others) => {
  const api2 = {};
  const {
    reactive,
    computed,
    watch,
    onBeforeUnmount,
    inject,
    markRaw,
    onMounted
  } = hooks;
  const {
    vm,
    service,
    parent,
    useBreakpoint
  } = vnode;
  const {
    utils = {}
  } = service || {};
  const breakpoint = useBreakpoint();
  const state = initState({
    api: api2,
    reactive,
    vm,
    computed,
    props,
    utils,
    parent,
    inject,
    breakpoint
  });
  parent.tinyForm = parent.tinyForm || inject("form", null);
  initApi({
    api: api2,
    props,
    hooks,
    state,
    vnode,
    others,
    utils,
    parent
  });
  initWatch({
    api: api2,
    state,
    props,
    watch,
    markRaw
  });
  api2.initGlobalTimezone();
  onMounted(() => {
    api2.setInputPaddingLeft();
  });
  parent.$on("handle-clear", event => {
    state.showClose = true;
    api2.handleClickIcon(event);
  });
  onBeforeUnmount(() => {
    api2.destroyPopper("remove");
    state.popperElm = null;
    state.picker = null;
  });
  return api2;
};
export { api, renderless };