import { __spreadProps, __spreadValues } from "../chunk-G2ADBYYC.js";
import { getWeekData } from './../picker/index.js';
import debounce from './../common/deps/debounce.js';
import { isDate, parseDate, modifyDate, modifyTime, clearTime, prevYear, nextYear, prevMonth, nextMonth, timeWithinRange, clearMilliseconds, modifyWithTimeString, changeYearMonthAndClampDate, formatDate, extractTimeFormat } from './../common/deps/date-util.js';
import { DATEPICKER } from './../common/index.js';
import { on, off } from './../common/deps/dom.js';
import { getDateWithNewTimezone, getLocalTimezone } from './../common/date.js';
import { fillChar } from './../common/string.js';
const getYearLabel = ({
  state,
  t
}) => () => {
  const {
    YearI18n,
    Year,
    PanelYearNum
  } = DATEPICKER;
  const yearTranslation = t(YearI18n);
  if (state.currentView === Year) {
    const startYear = state.startYear;
    if (yearTranslation) {
      return startYear + " " + yearTranslation + " - " + (startYear + PanelYearNum - 1) + " " + yearTranslation;
    }
    return startYear + " - " + (startYear + PanelYearNum - 1);
  }
  return state.year + " " + yearTranslation;
};
const watchValue = ({
  api,
  state
}) => value => {
  if ([DATEPICKER.Dates, DATEPICKER.Years].includes(state.selectionMode) && state.value) {
    return;
  }
  if (isDate(value)) {
    state.date = state.selectionMode === "week" ? getWeekData(value) : new Date(value);
  } else {
    state.date = api.getDefaultValue();
  }
};
const watchDefaultValue = ({
  state
}) => value => {
  if (!isDate(state.value)) {
    state.date = value ? new Date(value) : /* @__PURE__ */new Date();
  }
};
const watchTimePickerVisible = ({
  nextTick,
  vm
}) => value => {
  if (value) {
    nextTick(() => {
      vm.$refs.timepicker.adjustSpinners();
    });
  }
};
const watchSelectionMode = ({
  state
}) => value => {
  if (value === DATEPICKER.Month) {
    if (state.currentView !== DATEPICKER.Year || state.currentView !== DATEPICKER.Month) {
      state.currentView = DATEPICKER.Month;
    }
  } else if (value === DATEPICKER.Dates) {
    state.currentView = DATEPICKER.Date;
  } else if ([DATEPICKER.Year, DATEPICKER.Years, DATEPICKER.YearRange].includes(value)) {
    state.currentView = DATEPICKER.Year;
  }
};
const proxyTimePickerDataProperties = ({
  vm,
  state,
  watch
}) => () => {
  const format = timeFormat => {
    if (vm.$refs.timepicker) {
      vm.$refs.timepicker.state.format = timeFormat;
    }
  };
  const value = value2 => {
    if (vm.$refs.timepicker) {
      vm.$refs.timepicker.state.value = null;
      if (value2) {
        vm.$refs.timepicker.state.value = value2;
      }
    }
  };
  const date = date2 => {
    if (vm.$refs.timepicker) {
      vm.$refs.timepicker.state.date = date2;
    }
  };
  const selectableRange = selectableRange2 => {
    if (vm.$refs.timepicker) {
      vm.$refs.timepicker.state.selectableRange = selectableRange2;
    }
  };
  watch(() => state.value, value);
  watch(() => state.date, date, {
    deep: true
  });
  watch(() => state.selectableRange, selectableRange, {
    deep: true
  });
  format(state.timeFormat);
  value(state.value);
  date(state.date);
  selectableRange(state.selectableRange);
};
const handleClear = ({
  api,
  state,
  emit
}) => () => {
  state.date = api.getDefaultValue();
  emit("pick", null);
};
const cusEmit = ({
  state,
  emit
}) => (value, ...args) => {
  if (!value) {
    emit("pick", value, ...args);
  } else if (Array.isArray(value)) {
    const dates = value.map(date => state.showTime ? clearMilliseconds(date) : clearTime(date));
    emit("pick", dates, ...args);
  } else {
    emit("pick", state.showTime ? clearMilliseconds(value) : clearTime(value), ...args);
  }
  state.userInputDate = null;
  state.userInputTime = null;
};
const showMonthPicker = ({
  state
}) => () => state.currentView = DATEPICKER.Month;
const showYearPicker = ({
  state
}) => () => state.currentView = DATEPICKER.Year;
const cusPrevMonth = ({
  state
}) => () => state.date = prevMonth(state.date);
const cusNextMonth = ({
  state
}) => () => state.date = nextMonth(state.date);
const cusPrevYear = ({
  state
}) => () => {
  if (state.currentView === DATEPICKER.Year) {
    state.startYear = state.startYear - DATEPICKER.PanelYearNum;
  } else {
    state.date = prevYear(state.date);
  }
};
const cusNextYear = ({
  state
}) => () => {
  if (state.currentView === DATEPICKER.Year) {
    state.startYear = state.startYear + DATEPICKER.PanelYearNum;
  } else {
    state.date = nextYear(state.date);
  }
};
const handleShortcutClick = api => shortcut => {
  if (shortcut.onClick) {
    const picker = {
      $emit: (type, start, end) => {
        api.doPick(start, end);
      }
    };
    shortcut.onClick(picker);
  }
};
const doPick = emit => date => {
  emit("pick", date, false);
};
const handleTimePick = ({
  api,
  state,
  t
}) => (value, visible, first) => {
  if (isDate(value)) {
    const newDate = state.value ? modifyTime(state.value, value.getHours(), value.getMinutes(), value.getSeconds()) : modifyWithTimeString(api.getDefaultValue(), state.defaultTime, t);
    state.date = newDate;
    api.cusEmit(state.date, true);
  } else {
    api.cusEmit(value, true);
  }
  if (!first) {
    state.timePickerVisible = visible;
  }
};
const handleTimePickClose = state => () => {
  state.timePickerVisible = false;
};
const handleMonthPick = ({
  api,
  state
}) => month => {
  if (state.selectionMode === DATEPICKER.Month) {
    state.date = modifyDate(state.date, state.year, month, 1);
    api.cusEmit(state.date);
  } else {
    state.date = changeYearMonthAndClampDate(state.date, state.year, month);
    state.currentView = DATEPICKER.Date;
  }
};
const handleDatePick = ({
  api,
  state,
  t
}) => value => {
  if (state.selectionMode === DATEPICKER.Day) {
    let newDate = state.value ? modifyDate(state.value, value.getFullYear(), value.getMonth(), value.getDate()) : modifyWithTimeString(value, state.defaultTime, t);
    if (!api.checkDateWithinRange(newDate)) {
      newDate = modifyDate(state.selectableRange[0][0], value.getFullYear(), value.getMonth(), value.getDate());
    }
    state.date = newDate;
    api.cusEmit(state.date, state.showTime);
  } else if (state.selectionMode === DATEPICKER.Week) {
    api.cusEmit(value.date);
  } else if (state.selectionMode === DATEPICKER.Dates) {
    api.cusEmit(value, true);
  }
};
const handleYearPick = ({
  api,
  state
}) => value => {
  if (state.selectionMode === DATEPICKER.Year) {
    state.date = modifyDate(state.date, value, 0, 2);
    api.cusEmit(state.date);
  } else if ([DATEPICKER.Years].includes(state.selectionMode)) {
    state.date = value.map(year => new Date(year, 0, 2));
    api.cusEmit(state.date, state.selectionMode === DATEPICKER.YearRange ? value.length < 2 : true);
  } else {
    state.date = changeYearMonthAndClampDate(state.date, value, state.month);
    state.currentView = DATEPICKER.Month;
  }
};
const getDisabledNow = ({
  state
}) => () => {
  let disabledDate = state.disabledDate;
  if (!disabledDate) return false;
  return disabledDate( /* @__PURE__ */new Date());
};
const getDisabledConfirm = ({
  state
}) => () => {
  let disabledDate = state.disabledDate;
  if (!disabledDate) return false;
  if (!state.value) return true;
  return disabledDate(state.value);
};
const dateToLocaleStringForIE = (timezone, value) => {
  const localTimezone = getLocalTimezone();
  const offsetTimezone = timezone - localTimezone;
  const offsetTime = new Date(value).getTime() + offsetTimezone * 36e5;
  return new Date(offsetTime);
};
const getNowTime = ({
  props
}) => () => {
  return new Promise(resolve => {
    resolve(props.nowClick());
  }).then(res => {
    return res;
  });
};
const changeToNow = ({
  api,
  state,
  props
}) => async () => {
  let now = /* @__PURE__ */new Date();
  if (props.nowClick !== void 0) {
    now = await api.getNowTime();
  }
  const timezone = state.timezone;
  const isServiceTimezone = timezone.isServiceTimezone;
  let disabledDate = !state.disabledDate;
  if (isServiceTimezone) {
    const date = getDateWithNewTimezone(now, getLocalTimezone(), timezone.to);
    state.date = date;
    disabledDate = disabledDate || !state.disabledDate(date);
  } else {
    disabledDate = disabledDate || !state.disabledDate(now);
  }
  if (disabledDate && api.checkDateWithinRange(now)) {
    if (!isServiceTimezone) {
      if (state.showTimezone && state.selectedTz) {
        state.date = dateToLocaleStringForIE(state.selectedTz.offset, now);
      } else {
        state.date = now;
      }
    }
    api.cusEmit(state.date);
    state.emitDbTime(now);
  }
};
const confirm = ({
  api,
  state,
  t
}) => () => {
  if ([DATEPICKER.Dates, DATEPICKER.Years].includes(state.selectionMode)) {
    api.cusEmit(state.value);
  } else {
    let value = state.value ? state.value : modifyWithTimeString(api.getDefaultValue(), state.defaultTime, t);
    const timezone = state.timezone;
    if (!state.value && timezone.isServiceTimezone) {
      value = state.date = getDateWithNewTimezone(value, getLocalTimezone(), timezone.to);
    } else {
      state.date = new Date(value);
    }
    api.cusEmit(value);
  }
};
const resetView = ({
  state
}) => () => {
  if (state.selectionMode === DATEPICKER.Month) {
    state.currentView = DATEPICKER.Month;
  } else if ([DATEPICKER.Year, DATEPICKER.Years, DATEPICKER.YearRange].includes(state.selectionMode)) {
    state.currentView = DATEPICKER.Year;
  } else {
    state.currentView = DATEPICKER.Date;
  }
};
const handleEnter = api => () => {
  on(document.body, "keydown", api.handleKeydown);
};
const handleLeave = ({
  api,
  emit
}) => () => {
  emit("dodestroy");
  off(document.body, "keydown", api.handleKeydown);
};
const handleKeydown = ({
  api,
  state
}) => event => {
  const keyCode = event.keyCode;
  if (state.visible && !state.timePickerVisible) {
    if (DATEPICKER.List.includes(keyCode)) {
      api.handleKeyControl(keyCode);
      event.stopPropagation();
      event.preventDefault();
    }
    if (keyCode === 13 && state.userInputDate === null && state.userInputTime === null) {
      api.cusEmit(state.date, false);
    }
  }
};
const handleKeyControl = ({
  state,
  emit
}) => keyCode => {
  const mapping = {
    year: __spreadProps(__spreadValues({}, DATEPICKER.YearObj), {
      offset: (date, step) => date.setFullYear(date.getFullYear() + step)
    }),
    month: __spreadProps(__spreadValues({}, DATEPICKER.YearObj), {
      offset: (date, step) => date.setMonth(date.getMonth() + step)
    }),
    week: __spreadProps(__spreadValues({}, DATEPICKER.WeekObj), {
      offset: (date, step) => date.setDate(date.getDate() + step * 7)
    }),
    day: __spreadProps(__spreadValues({}, DATEPICKER.DayObj), {
      offset: (date, step) => date.setDate(date.getDate() + step)
    })
  };
  const mode = state.selectionMode;
  const year = 31536e6;
  const now = state.date.getTime();
  const newDate = new Date(state.date.getTime());
  while (Math.abs(now - newDate.getTime()) <= year) {
    const map = mapping[mode];
    map.offset(newDate, map[keyCode]);
    if (!(typeof state.disabledDate === "function" && state.disabledDate(newDate))) {
      state.date = newDate;
      emit("pick", newDate, true);
      break;
    }
  }
};
const handleVisibleTimeChange = ({
  api,
  vm,
  state,
  t
}) => value => {
  const time = parseDate(value, state.timeFormat, t);
  if (time && api.checkDateWithinRange(time)) {
    state.date = modifyDate(time, state.year, state.month, state.monthDate);
    state.userInputTime = null;
    if (vm.$refs.timepicker) {
      vm.$refs.timepicker.state.value = state.date;
    }
    state.timePickerVisible = false;
    api.cusEmit(state.date, true);
  }
};
const handleVisibleDateChange = ({
  api,
  state,
  t
}) => value => {
  const date = parseDate(value, state.dateFormat, t);
  if (date) {
    if (typeof state.disabledDate === "function" && state.disabledDate(date)) {
      return;
    }
    state.date = modifyTime(date, state.date.getHours(), state.date.getMinutes(), state.date.getSeconds());
    state.userInputDate = null;
    api.resetView();
    api.cusEmit(state.date, true);
  }
};
const isValidValue = ({
  api,
  state
}) => value => value && !isNaN(value) && (typeof state.disabledDate === "function" ? !state.disabledDate(value) : true) && api.checkDateWithinRange(value);
const getDefaultValue = state => () => state.defaultValue ? new Date(state.defaultValue) : /* @__PURE__ */new Date();
const checkDateWithinRange = ({
  state
}) => date => state.selectableRange.length > 0 ? timeWithinRange(date, state.selectableRange, state.format || "HH:mm:ss") : true;
const selectTz = ({
  emit,
  state
}) => tz => {
  if (state.timezone.isServiceTimezone) {
    return;
  }
  state.tz = tz.name;
  state.selectedTz = tz;
  state.showpopup = false;
  state.value = dateToLocaleStringForIE(tz.offset, state.date);
  emit("select-change", {
    tz,
    date: state.value
  });
};
const searchTz = ({
  api,
  state
}) => input => api.debounceChange(state, input);
const debounceChange = debounce(500, (state, input) => {
  if (!input) {
    state.showpopup = false;
    return;
  }
  const tzList = state.renderTzdata.slice();
  let count = 0;
  const filterAry = [];
  state.renderTzdata = tzList.map(tz => {
    if (tz.name.toLowerCase().includes(input)) {
      tz.visible = false;
      filterAry.push(tz);
      count++;
    } else {
      tz.visible = true;
    }
    return tz;
  });
  if (count === 1) {
    state.tz = filterAry[0].name;
    state.showpopup = false;
  } else {
    state.showpopup = true;
  }
});
const toggleTz = state => () => {
  if (state.timezone.isServiceTimezone) {
    return;
  }
  state.renderTzdata = state.renderTzdata && state.renderTzdata.map(item => {
    item.visible = false;
    return item;
  });
  state.showpopup = true;
};
const handleTzPickClose = state => () => state.showpopup = false;
const getRenderTz = ({
  state
}) => value => {
  if (!state.showTimezone || !value) {
    return;
  }
  state.renderTzdata = value[state.lang];
  if (state.renderTzdata) {
    const {
      isServiceTimezone,
      to
    } = state.timezone;
    const selectedTz = state.selectedTz || {};
    const defaultTimezone = selectedTz.tz ? selectedTz.tz : state.defaultTimezone;
    let findTimezoneKey;
    if (to === 0) {
      findTimezoneKey = "";
    } else {
      findTimezoneKey = to > 0 ? "+" : "-";
      findTimezoneKey = findTimezoneKey + fillChar(String(Math.abs(to)), 2) + ":00";
    }
    findTimezoneKey = `(UTC${findTimezoneKey})`;
    state.renderTzdata.some(item => {
      if (~[selectedTz.tz, defaultTimezone].indexOf(item.tz) || isServiceTimezone && ~item.name.indexOf(findTimezoneKey)) {
        state.selectedTz = item;
        state.tz = state.selectedTz.name;
        return true;
      }
      return false;
    }) || (state.selectedTz = void 0);
  }
};
const computerVisibleTime = ({
  state,
  t
}) => () => state.userInputTime !== null ? state.userInputTime : formatDate(state.value || state.defaultValue, state.timeFormat, t);
const computerVisibleDate = ({
  state,
  t
}) => () => state.userInputDate !== null ? state.userInputDate : formatDate(state.value || state.defaultValue, state.dateFormat, t);
const computerTimeFormat = ({
  state
}) => () => state.format ? extractTimeFormat(state.timefmt || state.format) : DATEPICKER.DateFormats.timerange;
const watchVisible = ({
  api,
  state
}) => () => {
  if (state.needChangeTimezoneData) {
    api.getRenderTz(state.timezoneData);
    state.needChangeTimezoneData = false;
  }
};
export { changeToNow, checkDateWithinRange, computerTimeFormat, computerVisibleDate, computerVisibleTime, confirm, cusEmit, cusNextMonth, cusNextYear, cusPrevMonth, cusPrevYear, debounceChange, doPick, getDefaultValue, getDisabledConfirm, getDisabledNow, getNowTime, getRenderTz, getYearLabel, handleClear, handleDatePick, handleEnter, handleKeyControl, handleKeydown, handleLeave, handleMonthPick, handleShortcutClick, handleTimePick, handleTimePickClose, handleTzPickClose, handleVisibleDateChange, handleVisibleTimeChange, handleYearPick, isValidValue, proxyTimePickerDataProperties, resetView, searchTz, selectTz, showMonthPicker, showYearPicker, toggleTz, watchDefaultValue, watchSelectionMode, watchTimePickerVisible, watchValue, watchVisible };