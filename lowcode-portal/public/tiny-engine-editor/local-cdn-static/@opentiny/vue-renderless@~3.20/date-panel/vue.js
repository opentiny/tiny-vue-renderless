import "../chunk-G2ADBYYC.js";
import { proxyTimePickerDataProperties, getRenderTz, toggleTz, handleTzPickClose, debounceChange, searchTz, selectTz, handleYearPick, cusPrevYear, cusNextYear, cusPrevMonth, cusNextMonth, handleTimePickClose, handleMonthPick, handleDatePick, changeToNow, confirm, resetView, handleKeydown, handleLeave, handleEnter, getYearLabel, showYearPicker, showMonthPicker, handleTimePick, checkDateWithinRange, cusEmit, getDefaultValue, isValidValue, handleVisibleDateChange, handleVisibleTimeChange, handleKeyControl, handleShortcutClick, watchValue, watchDefaultValue, watchSelectionMode, watchTimePickerVisible, handleClear, doPick, computerVisibleTime, computerVisibleDate, computerTimeFormat, watchVisible, getDisabledNow, getDisabledConfirm, getNowTime } from './index.js';
import { getWeekNumber, extractDateFormat } from './../common/deps/date-util.js';
import { DATEPICKER, DATE } from './../common/index.js';
const api = ["state", "isValidValue", "handleTzPickClose", "toggleTz", "searchTz", "selectTz", "confirm", "cusPrevYear", "cusNextYear", "cusPrevMonth", "cusNextMonth", "changeToNow", "handleMonthPick", "handleYearPick", "handleDatePick", "showMonthPicker", "showYearPicker", "handleTimePick", "handleEnter", "handleVisibleTimeChange", "handleVisibleDateChange", "handleLeave", "handleShortcutClick", "handleTimePickClose", "getNowTime"];
const initState = ({
  reactive,
  computed,
  api: api2,
  i18n,
  designConfig
}) => {
  var _a, _b;
  const state = reactive({
    popperClass: "",
    date: /* @__PURE__ */new Date(),
    value: "",
    defaultValue: null,
    defaultTime: null,
    showTime: false,
    selectionMode: DATEPICKER.Day,
    shortcuts: "",
    visible: false,
    currentView: DATEPICKER.Date,
    disabledDate: "",
    cellClassName: "",
    selectableRange: [],
    firstDayOfWeek: 7,
    showWeekNumber: false,
    timePickerVisible: false,
    format: "",
    timeFmt: "",
    timezone: {},
    arrowControl: false,
    userInputDate: null,
    userInputTime: null,
    showTimezone: false,
    showpopup: false,
    tz: "",
    selectedTz: null,
    animationName: "",
    startYear: Math.floor(( /* @__PURE__ */new Date()).getFullYear() / 10) * 10,
    disabledNow: computed(() => api2.getDisabledNow()),
    disabledConfirm: computed(() => api2.getDisabledConfirm()),
    year: computed(() => !Array.isArray(state.date) && state.date.getFullYear()),
    month: computed(() => !Array.isArray(state.date) && state.date.getMonth()),
    week: computed(() => getWeekNumber(state.date)),
    monthDate: computed(() => state.date.getDate()),
    footerVisible: computed(() => state.showTime || [DATEPICKER.Dates, DATEPICKER.Years].includes(state.selectionMode)),
    visibleTime: computed(() => api2.computerVisibleTime()),
    visibleDate: computed(() => api2.computerVisibleDate()),
    yearLabel: computed(() => api2.getYearLabel()),
    timeFormat: computed(() => api2.computerTimeFormat()),
    dateFormat: computed(() => state.format ? extractDateFormat(state.format.replace(state.timefmt, "")) : DATE.Date),
    lang: computed(() => i18n ? i18n.locale.replace(/_/g, "-") : "zh-CN"),
    isShowTz: computed(() => state.showTimezone && state.showTime),
    isShowFooter: computed(() => state.footerVisible && [DATEPICKER.Date, DATEPICKER.Year].includes(state.currentView)),
    buttonType: ((_a = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _a.buttonType) || "default",
    buttonSize: ((_b = designConfig == null ? void 0 : designConfig.state) == null ? void 0 : _b.buttonSize) || ""
  });
  state.needChangeTimezoneData = true;
  return state;
};
const initWatch = ({
  watch,
  state,
  api: api2,
  nextTick
}) => {
  watch(() => state.isShowTz, () => {
    setTimeout(() => state.fnUpdatePopper && state.fnUpdatePopper());
  });
  watch(() => state.isShowFooter, () => {
    setTimeout(() => state.fnUpdatePopper && state.fnUpdatePopper());
  });
  watch(() => state.lang, () => state.needChangeTimezoneData = true);
  watch(() => state.defaultValue, api2.watchDefaultValue);
  watch(() => state.value, api2.watchValue);
  watch(() => state.timePickerVisible, api2.watchTimePickerVisible);
  watch(() => state.selectionMode, api2.watchSelectionMode);
  watch(() => state.timePickerVisible, () => nextTick(api2.proxyTimePickerDataProperties));
  watch(() => state.visible, api2.watchVisible);
};
const initApi = ({
  api: api2,
  state,
  t,
  emit,
  nextTick,
  vm,
  watch,
  props
}) => {
  Object.assign(api2, {
    t,
    state,
    debounceChange,
    toggleTz: toggleTz(state),
    watchVisible: watchVisible({
      api: api2,
      state
    }),
    getRenderTz: getRenderTz({
      state
    }),
    selectTz: selectTz({
      emit,
      state
    }),
    handleTzPickClose: handleTzPickClose(state),
    getDefaultValue: getDefaultValue(state),
    showYearPicker: showYearPicker({
      state
    }),
    handleTimePickClose: handleTimePickClose(state),
    cusNextMonth: cusNextMonth({
      state
    }),
    cusPrevMonth: cusPrevMonth({
      state
    }),
    resetView: resetView({
      state
    }),
    showMonthPicker: showMonthPicker({
      state
    }),
    cusNextYear: cusNextYear({
      state
    }),
    cusPrevYear: cusPrevYear({
      state
    }),
    watchDefaultValue: watchDefaultValue({
      state
    }),
    getYearLabel: getYearLabel({
      state,
      t
    }),
    cusEmit: cusEmit({
      state,
      emit
    }),
    watchTimePickerVisible: watchTimePickerVisible({
      nextTick,
      vm
    }),
    checkDateWithinRange: checkDateWithinRange({
      state
    }),
    watchSelectionMode: watchSelectionMode({
      state
    }),
    proxyTimePickerDataProperties: proxyTimePickerDataProperties({
      vm,
      state,
      watch
    }),
    handleKeyControl: handleKeyControl({
      state,
      emit
    }),
    doPick: doPick(emit),
    searchTz: searchTz({
      api: api2,
      state
    }),
    handleEnter: handleEnter(api2),
    handleLeave: handleLeave({
      api: api2,
      emit
    }),
    changeToNow: changeToNow({
      api: api2,
      state,
      props
    }),
    isValidValue: isValidValue({
      api: api2,
      state
    }),
    handleClear: handleClear({
      api: api2,
      state,
      emit
    }),
    watchValue: watchValue({
      api: api2,
      state
    }),
    handleKeydown: handleKeydown({
      api: api2,
      state
    }),
    confirm: confirm({
      api: api2,
      state,
      t
    }),
    handleMonthPick: handleMonthPick({
      api: api2,
      state
    }),
    handleVisibleDateChange: handleVisibleDateChange({
      api: api2,
      state,
      t
    }),
    handleTimePick: handleTimePick({
      api: api2,
      state,
      t
    }),
    handleYearPick: handleYearPick({
      api: api2,
      state
    }),
    handleDatePick: handleDatePick({
      api: api2,
      state,
      t
    }),
    computerVisibleTime: computerVisibleTime({
      state,
      t
    }),
    handleShortcutClick: handleShortcutClick(api2),
    computerVisibleDate: computerVisibleDate({
      state,
      t
    }),
    handleVisibleTimeChange: handleVisibleTimeChange({
      api: api2,
      vm,
      state,
      t
    }),
    computerTimeFormat: computerTimeFormat({
      state
    }),
    getDisabledNow: getDisabledNow({
      state
    }),
    getDisabledConfirm: getDisabledConfirm({
      state
    }),
    getNowTime: getNowTime({
      props
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
  i18n,
  designConfig
}) => {
  const api2 = {};
  const emit = props.emitter ? props.emitter.emit : $emit;
  const state = initState({
    reactive,
    computed,
    api: api2,
    i18n,
    designConfig
  });
  initApi({
    api: api2,
    state,
    t,
    emit,
    nextTick,
    vm,
    watch,
    props
  });
  initWatch({
    watch,
    state,
    api: api2,
    nextTick
  });
  return api2;
};
export { api, renderless };