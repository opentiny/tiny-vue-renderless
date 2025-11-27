import "../chunk-G2ADBYYC.js";
import { isDate, nextDate, parseDate, formatDate, modifyDate, modifyTime, nextYear, prevYear, nextMonth, prevMonth, modifyWithTimeString } from './../common/deps/date-util.js';
const calcDefaultValue = defaultVal => {
  if (Array.isArray(defaultVal)) {
    return [new Date(defaultVal[0]), new Date(defaultVal[1])];
  } else if (defaultVal) {
    return [new Date(defaultVal), nextDate(new Date(defaultVal), 1)];
  }
  return [/* @__PURE__ */new Date(), nextDate( /* @__PURE__ */new Date(), 1)];
};
const getMinVisibleDate = ({
  state,
  t
}) => () => {
  if (state.dateUserInput.min !== null) {
    return state.dateUserInput.min;
  }
  if (state.minDate) {
    return formatDate(state.minDate, state.dateFormat, t);
  }
  return "";
};
const getMaxVisibleDate = ({
  state,
  t
}) => () => {
  if (state.dateUserInput.max !== null) {
    return state.dateUserInput.max;
  }
  if (state.maxDate || state.minDate) {
    return formatDate(state.maxDate || state.minDate, state.dateFormat, t);
  }
  return "";
};
const getMinVisibleTime = ({
  state,
  t
}) => () => {
  if (state.timeUserInput.min !== null) {
    return state.timeUserInput.min;
  }
  if (state.minDate) {
    return formatDate(state.minDate, state.timeFormat, t);
  }
  return "";
};
const getMaxVisibleTime = ({
  state,
  t
}) => () => {
  if (state.timeUserInput.max !== null) {
    return state.timeUserInput.max;
  }
  if (state.maxDate || state.minDate) {
    return formatDate(state.maxDate || state.minDate, state.timeFormat, t);
  }
  return "";
};
const getEnableMonthArrow = state => () => {
  const nextMonth2 = (state.leftMonth + 1) % 12;
  const yearOffset = state.leftMonth + 1 >= 12 ? 1 : 0;
  return state.unlinkPanels && new Date(state.leftYear + yearOffset, nextMonth2) < new Date(state.rightYear, state.rightMonth);
};
const watchMinDate = ({
  state,
  t,
  vm
}) => value => {
  state.dateUserInput.min = null;
  state.timeUserInput.min = null;
  const minTimePicker = vm.$refs.minTimePicker;
  if (!minTimePicker) {
    return;
  }
  if (state.maxDate && state.maxDate < state.minDate) {
    const format = "HH:mm:ss";
    minTimePicker.state.selectableRange = [[parseDate(formatDate(state.minDate, format, t), format, t), parseDate("23:59:59", format, t)]];
  }
  if (value) {
    minTimePicker.state.value = value;
  }
};
const watchMaxDate = ({
  state,
  vm
}) => value => {
  state.dateUserInput.max = null;
  state.timeUserInput.max = null;
  const maxTimePicker = vm.$refs.maxTimePicker;
  if (value && maxTimePicker) {
    maxTimePicker.state.value = value;
  }
};
const watchMinTimePickerVisible = ({
  nextTick,
  state,
  vm
}) => value => {
  if (value) {
    nextTick(() => {
      vm.$refs.minTimePicker.state.value = state.minDate;
    });
  }
};
const watchMaxTimePickerVisible = ({
  nextTick,
  state,
  vm
}) => value => {
  if (value) {
    nextTick(() => {
      vm.$refs.maxTimePicker.state.value = state.maxDate;
    });
  }
};
const watchValue = ({
  state
}) => value => {
  if (!value) {
    state.minDate = null;
    state.maxDate = null;
  } else if (Array.isArray(value)) {
    state.minDate = isDate(value[0]) ? new Date(value[0]) : null;
    state.maxDate = isDate(value[1]) ? new Date(value[1]) : null;
    if (state.minDate) {
      state.leftDate = state.minDate;
      if (state.unlinkPanels && state.maxDate) {
        const minDateYear = state.minDate.getFullYear();
        const minDateMonth = state.minDate.getMonth();
        const maxDateYear = state.maxDate.getFullYear();
        const maxDateMonth = state.maxDate.getMonth();
        state.rightDate = minDateYear === maxDateYear && minDateMonth === maxDateMonth ? nextMonth(state.maxDate) : state.maxDate;
      } else {
        state.rightDate = nextMonth(state.leftDate);
      }
    } else {
      state.leftDate = calcDefaultValue(state.defaultValue)[0];
      state.rightDate = nextMonth(state.leftDate);
    }
  }
};
const watchDefault = ({
  state
}) => value => {
  if (!Array.isArray(state.value)) {
    const [left, right] = calcDefaultValue(value);
    state.leftDate = left;
    state.rightDate = value && value[1] && state.unlinkPanels ? right : nextMonth(state.leftDate);
  }
};
const handleClear = ({
  emit,
  state
}) => () => {
  state.minDate = null;
  state.maxDate = null;
  state.leftDate = calcDefaultValue(state.defaultValue)[0];
  state.rightDate = nextMonth(state.leftDate);
  state.rangeState.selecting = false;
  state.rangeState.endDate = null;
  emit("pick", null);
};
const handleChangeRange = state => val => {
  state.minDate = val.minDate;
  state.maxDate = val.maxDate;
  state.rangeState = val.rangeState;
};
const handleDateInput = ({
  state,
  t
}) => (value, type) => {
  state.dateUserInput[type] = value;
  if (value.length !== state.dateFormat.length) {
    return;
  }
  const parsedValue = parseDate(value, state.dateFormat, t);
  if (parsedValue) {
    if (typeof state.disabledDate === "function" && state.disabledDate(new Date(parsedValue))) {
      return;
    }
    if (type === "min") {
      state.minDate = modifyDate(state.minDate || /* @__PURE__ */new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
      state.leftDate = new Date(parsedValue);
      if (!state.unlinkPanels) {
        state.rightDate = nextMonth(state.leftDate);
      }
    } else {
      state.maxDate = modifyDate(state.maxDate || /* @__PURE__ */new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
      state.rightDate = new Date(parsedValue);
      if (!state.unlinkPanels) {
        state.leftDate = prevMonth(parsedValue);
      }
    }
  }
};
const handleDateChange = ({
  state,
  t
}) => (value, type) => {
  const parsedValue = parseDate(value, state.dateFormat, t);
  if (parsedValue) {
    if (type === "min") {
      state.minDate = modifyDate(state.minDate || /* @__PURE__ */new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
      if (state.minDate > state.maxDate) {
        state.maxDate = state.minDate;
      }
    } else {
      state.maxDate = modifyDate(state.maxDate || /* @__PURE__ */new Date(), parsedValue.getFullYear(), parsedValue.getMonth(), parsedValue.getDate());
      if (state.maxDate < state.minDate) {
        state.minDate = state.maxDate;
      }
    }
  }
};
const handleTimeInput = ({
  state,
  t
}) => (value, type) => {
  state.timeUserInput[type] = value;
  if (value.length !== state.timeFormat.length) {
    return;
  }
  const parsedValue = parseDate(value, state.timeFormat, t);
  if (parsedValue) {
    if (type === "min") {
      state.minDate = modifyTime(state.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
    } else {
      state.maxDate = modifyTime(state.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
    }
  }
};
const handleTimeChange = ({
  state,
  t,
  vm
}) => (value, type) => {
  const parsedValue = parseDate(value, state.timeFormat, t);
  if (parsedValue) {
    if (type === "min") {
      state.minDate = modifyTime(state.minDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
      if (state.minDate > state.maxDate) {
        state.maxDate = state.minDate;
      }
      vm.$refs.minTimePicker.state.value = state.minDate;
      state.minTimePickerVisible = false;
    } else {
      state.maxDate = modifyTime(state.maxDate, parsedValue.getHours(), parsedValue.getMinutes(), parsedValue.getSeconds());
      if (state.maxDate < state.minDate) {
        state.minDate = state.maxDate;
      }
      vm.$refs.maxTimePicker.state.value = state.minDate;
      state.maxTimePickerVisible = false;
    }
  }
};
const handleRangePick = ({
  api,
  state,
  t
}) => (val, close = true) => {
  const defaultTime = state.defaultTime || [];
  let minDateVal = val.minDate;
  let maxDateVal = val.maxDate;
  if (state.singleSelect) {
    Object.assign(state.rangeState, {
      selecting: false
    });
    const effectDate = val.minDate || val.maxDate;
    const rangeDate = state.shortcutType === "startFrom" ? state.maxRangeDate : state.minRangeDate;
    minDateVal = rangeDate > effectDate ? effectDate : rangeDate;
    maxDateVal = rangeDate > effectDate ? rangeDate : effectDate;
  }
  const minDate = modifyWithTimeString(minDateVal, defaultTime[0], t);
  const maxDate = modifyWithTimeString(maxDateVal, defaultTime[1], t);
  if (state.maxDate === maxDate && state.minDate === minDate) {
    return;
  }
  state.onPick && state.onPick(val);
  state.maxDate = maxDate;
  state.minDate = minDate;
  setTimeout(() => {
    state.maxDate = maxDate;
    state.minDate = minDate;
  }, 10);
  if (!close || state.showTime) {
    return;
  }
  api.handleConfirm();
};
const handleShortcutClick = (state, api) => shortcut => {
  if (shortcut.type) {
    state.singleSelect = true;
    state.shortcutType = shortcut.type;
    state.shortcutText = shortcut.text;
    if (shortcut.type === "startFrom" && shortcut.endDate && isDate(shortcut.endDate)) {
      state.maxRangeDate = shortcut.endDate;
    }
    if (shortcut.type === "endAt" && shortcut.startDate && isDate(shortcut.startDate)) {
      state.minRangeDate = shortcut.startDate;
    }
    state.value = [];
    return;
  }
  if (shortcut.onClick) {
    const picker = {
      $emit: (type, [start, end]) => {
        api.doPick(start, end);
      }
    };
    shortcut.onClick(picker);
  }
};
const doPick = emit => (start, end) => {
  emit("pick", [start, end], false);
};
const handleMinTimePick = ({
  state
}) => (value, visible, first) => {
  state.minDate = state.minDate || /* @__PURE__ */new Date();
  if (value) {
    state.minDate = modifyTime(state.minDate, value.getHours(), value.getMinutes(), value.getSeconds());
  }
  if (!first) {
    state.minTimePickerVisible = visible;
  }
  if (!state.maxDate || state.maxDate && state.maxDate.getTime() < state.minDate.getTime()) {
    state.maxDate = new Date(state.minDate);
  }
};
const handleMinTimeClose = state => () => state.minTimePickerVisible = false;
const handleMaxTimePick = ({
  state
}) => (value, visible, first) => {
  if (state.maxDate && value) {
    state.maxDate = modifyTime(state.maxDate, value.getHours(), value.getMinutes(), value.getSeconds());
  }
  if (!first) {
    state.maxTimePickerVisible = visible;
  }
  if (state.maxDate && state.minDate && state.minDate.getTime() > state.maxDate.getTime()) {
    state.minDate = new Date(state.maxDate);
  }
};
const handleMaxTimeClose = state => () => state.maxTimePickerVisible = false;
const leftPrevYear = ({
  state
}) => () => {
  state.leftDate = prevYear(state.leftDate);
  if (!state.unlinkPanels) {
    state.rightDate = nextMonth(state.leftDate);
  }
};
const leftPrevMonth = ({
  state
}) => () => {
  state.leftDate = prevMonth(state.leftDate);
  if (!state.unlinkPanels) {
    state.rightDate = nextMonth(state.leftDate);
  }
};
const rightNextYear = ({
  state
}) => () => {
  const {
    leftDate,
    rightDate,
    unlinkPanels
  } = state;
  if (!unlinkPanels) {
    state.leftDate = nextYear(leftDate);
    state.rightDate = nextMonth(state.leftDate);
  } else {
    state.rightDate = nextYear(rightDate);
  }
};
const rightNextMonth = ({
  state
}) => () => {
  if (!state.unlinkPanels) {
    state.leftDate = nextMonth(state.leftDate);
    state.rightDate = nextMonth(state.leftDate);
  } else {
    state.rightDate = nextMonth(state.rightDate);
  }
};
const leftNextYear = ({
  state
}) => () => state.leftDate = nextYear(state.leftDate);
const leftNextMonth = ({
  state
}) => () => state.leftDate = nextMonth(state.leftDate);
const rightPrevYear = ({
  state
}) => () => state.rightDate = prevYear(state.rightDate);
const rightPrevMonth = ({
  state
}) => () => state.rightDate = prevMonth(state.rightDate);
const handleConfirm = ({
  api,
  emit,
  state
}) => (visible = false) => {
  if (api.isValidValue([state.minDate, state.maxDate])) {
    emit("pick", [state.minDate, state.maxDate], visible);
  }
};
const isValidValue = ({
  state
}) => value => Array.isArray(value) && value && value[0] && value[1] && isDate(value[0]) && isDate(value[1]) && value[0].getTime() <= value[1].getTime() && (typeof state.disabledDate === "function" ? !state.disabledDate(value[0]) && !state.disabledDate(value[1]) : true);
const resetView = ({
  state
}) => () => {
  state.minDate = state.value && isDate(state.value[0]) ? new Date(state.value[0]) : null;
  state.maxDate = state.value && isDate(state.value[0]) ? new Date(state.value[1]) : null;
};
const setTimeFormat = ({
  nextTick,
  vm,
  state
}) => () => {
  nextTick(() => {
    vm.$refs.maxTimePicker.state.format = state.timeFormat;
    vm.$refs.minTimePicker.state.format = state.timeFormat;
  });
};
const computerBtnDisabled = ({
  state,
  api
}) => () => !(state.minDate && state.maxDate && !state.selecting && api.isValidValue([state.minDate, state.maxDate]));
const computerLabel = ({
  state,
  t
}) => type => `${state[type].getFullYear()} ${t("ui.datepicker.year")} ${t(`ui.datepicker.month${state[type].getMonth() + 1}`)}`;
const computerEnableYearArrow = state => () => state.unlinkPanels && state.rightYear * 12 + state.rightMonth - (state.leftYear * 12 + state.leftMonth + 1) >= 12;
const watchPickerVisible = ({
  state,
  constants
}) => val => {
  if (!val) {
    state.singleSelect = false;
    state.minRangeDate = constants.startDate;
    state.maxRangeDate = constants.endDate;
  }
};
export { calcDefaultValue, computerBtnDisabled, computerEnableYearArrow, computerLabel, doPick, getEnableMonthArrow, getMaxVisibleDate, getMaxVisibleTime, getMinVisibleDate, getMinVisibleTime, handleChangeRange, handleClear, handleConfirm, handleDateChange, handleDateInput, handleMaxTimeClose, handleMaxTimePick, handleMinTimeClose, handleMinTimePick, handleRangePick, handleShortcutClick, handleTimeChange, handleTimeInput, isValidValue, leftNextMonth, leftNextYear, leftPrevMonth, leftPrevYear, resetView, rightNextMonth, rightNextYear, rightPrevMonth, rightPrevYear, setTimeFormat, watchDefault, watchMaxDate, watchMaxTimePickerVisible, watchMinDate, watchMinTimePickerVisible, watchPickerVisible, watchValue };