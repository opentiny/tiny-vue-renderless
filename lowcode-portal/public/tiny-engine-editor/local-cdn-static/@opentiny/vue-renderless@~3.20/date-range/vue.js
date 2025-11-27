import { __spreadValues } from "../chunk-G2ADBYYC.js";
import { getMinVisibleDate, watchValue, resetView, isValidValue, handleConfirm, rightPrevMonth, rightPrevYear, leftNextMonth, leftNextYear, rightNextMonth, rightNextYear, leftPrevMonth, leftPrevYear, handleMaxTimeClose, handleMaxTimePick, handleMinTimeClose, handleMinTimePick, handleShortcutClick, handleRangePick, handleTimeChange, handleTimeInput, handleDateChange, handleDateInput, handleChangeRange, watchDefault, handleClear, getMaxVisibleDate, watchMaxTimePickerVisible, watchMinTimePickerVisible, watchMaxDate, watchMinDate, getMinVisibleTime, getEnableMonthArrow, getMaxVisibleTime, doPick, setTimeFormat, computerBtnDisabled, computerLabel, computerEnableYearArrow, watchPickerVisible } from './index.js';
import { nextMonth, extractDateFormat, extractTimeFormat } from './../common/deps/date-util.js';
const api = ["state", "handleShortcutClick", "handleConfirm", "handleClear", "handleChangeRange", "rightNextMonth", "rightNextYear", "rightPrevMonth", "rightPrevYear", "handleRangePick", "leftNextMonth", "leftNextYear", "leftPrevMonth", "leftPrevYear", "handleMaxTimePick", "handleDateInput", "handleMinTimePick", "handleTimeChange", "handleTimeInput", "handleMinTimeClose", "handleDateChange", "handleMaxTimeClose", "isValidValue"];
const initState = ({
  reactive,
  computed,
  api: api2,
  constants,
  designConfig
}) => {
  var _a;
  const state = reactive({
    popperElm: null,
    popperClass: "",
    value: [],
    defaultValue: null,
    defaultTime: null,
    minDate: "",
    maxDate: "",
    shortcutType: "",
    shortcutText: "",
    singleSelect: false,
    minRangeDate: constants.startDate,
    maxRangeDate: constants.endDate,
    leftDate: /* @__PURE__ */new Date(),
    rightDate: nextMonth( /* @__PURE__ */new Date()),
    rangeState: {
      endDate: null,
      selecting: false,
      row: null,
      column: null
    },
    showTime: false,
    format: "",
    arrowControl: false,
    unlinkPanels: false,
    firstDayOfWeek: 7,
    minTimePickerVisible: false,
    maxTimePickerVisible: false,
    shortcuts: "",
    visible: "",
    disabledDate: "",
    cellClassName: "",
    dateUserInput: {
      min: null,
      max: null
    },
    timeUserInput: {
      min: null,
      max: null
    },
    btnDisabled: computed(() => api2.computerBtnDisabled()),
    leftLabel: computed(() => api2.computerLabel("leftDate")),
    rightLabel: computed(() => api2.computerLabel("rightDate")),
    leftYear: computed(() => state.leftDate.getFullYear()),
    leftMonth: computed(() => state.leftDate.getMonth()),
    leftMonthDate: computed(() => state.leftDate.getDate()),
    rightYear: computed(() => state.rightDate.getFullYear()),
    rightMonth: computed(() => state.rightDate.getMonth()),
    rightMonthDate: computed(() => state.rightDate.getDate()),
    minVisibleDate: computed(() => api2.getMinVisibleDate()),
    maxVisibleDate: computed(() => api2.getMaxVisibleDate()),
    minVisibleTime: computed(() => api2.getMinVisibleTime()),
    maxVisibleTime: computed(() => api2.getMaxVisibleTime()),
    timeFormat: computed(() => state.format ? extractTimeFormat(state.format) : "HH:mm:ss"),
    dateFormat: computed(() => state.format ? extractDateFormat(state.format) : "yyyy-MM-dd"),
    enableMonthArrow: computed(() => api2.getEnableMonthArrow()),
    enableYearArrow: computed(() => api2.computerEnableYearArrow()),
    // tiny 新增
    confirmButtonProps: __spreadValues({
      plain: true,
      type: "default"
    }, (_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.confirmButtonProps)
  });
  return state;
};
const initWatch = ({
  watch,
  state,
  api: api2
}) => {
  watch(() => state.minDate, api2.watchMinDate);
  watch(() => state.maxDate, api2.watchMaxDate);
  watch(() => state.minTimePickerVisible, api2.watchMinTimePickerVisible);
  watch(() => state.maxTimePickerVisible, api2.watchMaxTimePickerVisible);
  watch(() => state.value, api2.watchValue);
  watch(() => state.defaultValue, api2.watchDefault);
  watch(() => state.showTime, api2.setTimeFormat);
  watch(() => state.visible, api2.watchPickerVisible);
};
const initApi = ({
  api: api2,
  state,
  t,
  vm,
  nextTick,
  emit,
  constants
}) => {
  Object.assign(api2, {
    t,
    state,
    computerLabel: computerLabel({
      state,
      t
    }),
    resetView: resetView({
      state
    }),
    watchMaxDate: watchMaxDate({
      state,
      vm
    }),
    handleChangeRange: handleChangeRange(state),
    handleMaxTimeClose: handleMaxTimeClose(state),
    handleMinTimeClose: handleMinTimeClose(state),
    isValidValue: isValidValue({
      state
    }),
    leftNextYear: leftNextYear({
      state
    }),
    getEnableMonthArrow: getEnableMonthArrow(state),
    leftNextMonth: leftNextMonth({
      state
    }),
    rightPrevYear: rightPrevYear({
      state
    }),
    rightPrevMonth: rightPrevMonth({
      state
    }),
    rightNextMonth: rightNextMonth({
      state
    }),
    leftPrevYear: leftPrevYear({
      state
    }),
    handleMaxTimePick: handleMaxTimePick({
      state
    }),
    handleMinTimePick: handleMinTimePick({
      state
    }),
    getMaxVisibleTime: getMaxVisibleTime({
      state,
      t
    }),
    getMinVisibleTime: getMinVisibleTime({
      state,
      t
    }),
    getMaxVisibleDate: getMaxVisibleDate({
      state,
      t
    }),
    getMinVisibleDate: getMinVisibleDate({
      state,
      t
    }),
    rightNextYear: rightNextYear({
      state
    }),
    leftPrevMonth: leftPrevMonth({
      state
    }),
    handleDateChange: handleDateChange({
      state,
      t
    }),
    handleTimeChange: handleTimeChange({
      state,
      t,
      vm
    }),
    watchMinDate: watchMinDate({
      state,
      t,
      vm
    }),
    handleTimeInput: handleTimeInput({
      state,
      t
    }),
    watchMaxTimePickerVisible: watchMaxTimePickerVisible({
      nextTick,
      state,
      vm
    }),
    watchMinTimePickerVisible: watchMinTimePickerVisible({
      nextTick,
      state,
      vm
    }),
    handleDateInput: handleDateInput({
      state,
      t
    }),
    doPick: doPick(emit),
    watchValue: watchValue({
      state
    }),
    watchDefault: watchDefault({
      state
    }),
    handleClear: handleClear({
      emit,
      state
    }),
    setTimeFormat: setTimeFormat({
      nextTick,
      vm,
      state
    }),
    handleConfirm: handleConfirm({
      api: api2,
      emit,
      state
    }),
    handleRangePick: handleRangePick({
      api: api2,
      state,
      t
    }),
    handleShortcutClick: handleShortcutClick(state, api2),
    computerBtnDisabled: computerBtnDisabled({
      state,
      api: api2
    }),
    computerEnableYearArrow: computerEnableYearArrow(state),
    watchPickerVisible: watchPickerVisible({
      state,
      constants
    })
  });
};
const renderless = (props, {
  computed,
  reactive,
  watch,
  nextTick
}, {
  t,
  emit: $emit,
  vm,
  constants,
  designConfig
}) => {
  const api2 = {};
  const emit = props.emitter ? props.emitter.emit : $emit;
  const state = initState({
    reactive,
    computed,
    api: api2,
    constants,
    designConfig
  });
  initApi({
    api: api2,
    state,
    t,
    vm,
    nextTick,
    emit,
    constants
  });
  initWatch({
    watch,
    state,
    api: api2
  });
  return api2;
};
export { api, renderless };